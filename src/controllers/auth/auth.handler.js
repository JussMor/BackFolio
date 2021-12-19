const admin = require("firebase-admin");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/token.helpers");

const {
  user,
  Sequelize: { ValidationError },
} = require("../../../db/postgres/models");
const client = require("../../../db/redis/redis");

class AuthHandler {
  static async signup(req, res, next) {
    // let userId;
    const {firstName, lastName, email, password} = req.body;

    if (!req.body.email) {
      return next(createError(400, "email must be provided."));
    }

    if (!req.body.password) {
      return next(createError(400, "password must be provided."));
    }

    const user  = await admin.auth().createUser({
      displayName: `${firstName} ${lastName}`,
      email,
      password,
    });

    return res.send(user);
      // // buscar usuario si ya existe
      // user
      // .findOne({ where: { email: req.body.email } })
      // .then((user) => {
      //   if (user) {
      //     throw createError(401, "Email ya existe.", {
      //       reason: "Email found.",
      //     });
      //   }
      // })
      // .catch((err) => next(createError(500, err)));


      //  //crear usuario
      // user
      //   .create(req.body, {
      //     fields: ["firstName", "lastName", "email", "password"],
      //   })
      //   .then((user) => user.toJSON())
      //   .then((user) => {
      //     delete user.password;

      //     userId = user.id;
      //     console.log(userId)

      //     const accessToken = signAccessToken(userId);
      //     const refreshToken = signRefreshToken(userId);

      //     res.status(201).json({
      //       status: "success",
      //       data:{accessToken,refreshToken, user },
      //     });
      //   })
      //   .catch((err) => {
      //     if (err instanceof ValidationError) {
      //       return next(createError(400, err));
      //     }
      //     next(createError(500, err));
      //   });

  }

  static signin(req, res, next) {
    let userId;

    if (!req.body.email) {
      return next(createError(400, "email must be provided."));
    }

    if (!req.body.password) {
      return next(createError(400, "password must be provided."));
    }

    user
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          throw createError(401, "Invalid credentials.", {
            reason: "Email not found.",
          });
        }

        userId = user.id;
        console.log(userId)

        return user.validatePassword(req.body.password);
      })
      .then(async (isValidPassword) => {
        if (!isValidPassword) {
          throw createError(401, "Invalid credentials.", {
            reason: "Invalid password.",
          });
        }
        const accessToken = await signAccessToken(userId);
        const refreshToken = await signRefreshToken(userId);

        res.status(200).json({
          status: "success",
          data: { accessToken, refreshToken },
        });
      })
      .catch((err) => next(createError(500, err)));
  }
  static async  refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return next(createError(400, "Token must be provided."));
      }
      const userId  = await verifyRefreshToken(refreshToken) 
      console.log(userId)

      const accessToken = await signAccessToken(userId)
      const newRefreshToken = await signRefreshToken(userId)

      res.send({accessToken, refreshToken: newRefreshToken})
    } catch(error) {
      next(createError(500, error))
    } 
  }

  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.body

      if (!req.body.refreshToken) {
        return next(createError.BadRequest());
      }

      const userId  = await verifyRefreshToken(refreshToken) 

      client.del(userId,(err, result)=>{
        if(err){
          console.log(err.message);
          return next(new createError.InternalServerError());
        }

        console.log(result);

        res.sendStatus(204);
      })

      
    } catch (error) {
      next(createError(500, error))
    }
  }
}

module.exports = AuthHandler;

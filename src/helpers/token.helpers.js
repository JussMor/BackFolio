require("dotenv").config();
const client = require("../../db/redis/redis")
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return next(new createError.Unauthorized());

  const authHeader = req.headers["authorization"];

  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];


  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(new createError.Unauthorized(message));
    }

    // console.log(payload.aud)
    req.userId = payload.aud;

    next();
  });

};



const signAccessToken = async (userId) => {
  try {
    payload = {}
    const options = {
      expiresIn: "1y",
      issuer: "fazt.dev",
      audience: String(userId),
    };
  
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options)
  
    return token;
  }catch(e) {
    return  new createError.InternalServerError()
  } 
};


const signRefreshToken = async (userId) => {
    try {
      payload = {}
      const options = {
        expiresIn: "1y",
        issuer: "fazt.dev",
        audience: String(userId),
      };
    
      const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options)
      
      //Guardar la clave - valor en redis
      client.set(userId,token,"EX",365 * 24 * 60 * 60,(err)=>{
        if (err){
          console.log(err.message)
          return new createError.InternalServerError()
        }
      })

      return token;

    }catch(e) {
      return  new createError.InternalServerError()
    } 
}

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // const message =
        //   err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        // return reject(new createError.Unauthorized(message));
        return reject(new createError.Unauthorized());
      }

      const userId = payload.aud;

      client.get(userId, (err, result) => {
        if (err) {
          console.log(err.message);
          return reject(new createError.InternalServerError());
        }

        if (result === refreshToken) return resolve(userId);

        reject(new createError.Unauthorized());
      });
    });
  });
} 

module.exports = {  signAccessToken, verifyAccessToken, signRefreshToken , verifyRefreshToken } ;

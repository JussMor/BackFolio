
const createError = require("http-errors");
const {
  user,
  Sequelize: { ValidationError },
} = require("../../../db/postgres/models");

class UserHandler {
  static getAll(req, res, next) {
    user
      .findAll({
        attributes: {
          exclude: ["password"],
        },
      })
      .then((users) => {
        res.status(200).json({
          status: "success",
          data: users,
        });
      })
      .catch((err) => next(createError(500, err)));
  }

  static getUserById(req, res, next) {
    user
      .findByPk(req.params.id, {
        attributes: {
          exclude: ["password"],
        },
      })
      .then((user) => {
        res.status(200).json({
          status: "success",
          data: user,
        });
      })
      .catch((err) => next(createError(500, err)));
  }

  static createUser(req, res, next) {

    user
      .create(req.body, {
        fields: ["firstName", "lastName", "email", "password"],
      })
      .then((user) => user.toJSON())
      .then((user) => {
        delete user.password;

        res.status(201).json({
          status: "success",
          data: user,
        });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return next(createError(400, err));
        }

        next(createError(500, err));
      });
  }

  static updateUserById(req, res, next) {
    user
      .findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          throw createError(404, "User not found.");
        }

        return user.update(req.body, {
          fields: ["firstName", "lastName", "password"],
        });
      })
      .then((user) => user.toJSON())
      .then((user) => {
        delete user.password;

        res.status(200).json({
          status: "success",
          data: user,
        });
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          return next(createError(400, err));
        }

        next(createError(500, err));
      });
  }

  static deleteUserById(req, res, next) {
    user
      .destroy({
        where: { id: req.params.id },
      })
      .then((result) => {
        res.status(200).json({
          status: "success",
          data: result,
        });
      })
      .catch((err) => next(createError(500, err)));
  }
}

module.exports = UserHandler;

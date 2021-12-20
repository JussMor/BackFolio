'use strict';
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
const { ADMIN_TYPE, USER_TYPE } = require("../../../constants/user-types");

const hashPassword = async (user) => {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
};

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  const props = {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM([ADMIN_TYPE, USER_TYPE]),
      allowNull: false,
      defaultValue: USER_TYPE,
    },
  }

  const options = {
    sequelize,
    modelName: "user",
    hooks: {
      beforeCreate(user) {
        return hashPassword(user);
      },
      beforeUpdate(user) {
        return hashPassword(user);
      },
    },

  }

  user.init(props, options)
  
  return user;
};
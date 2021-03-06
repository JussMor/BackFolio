"use strict";
const { ADMIN_TYPE, USER_TYPE } = require("../../../constants/user-types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [
      {
        firstName: "Isaac",
        lastName: "Ramirez",
        email: "iramirez@example.com",
        password:
          "$2b$10$TQstkLKOn61tXGE3cinjv.vjzH1mIplBFjWM5.H2OZNZZJ9mO52EW",
        userType: ADMIN_TYPE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Ragnar",
        lastName: "Lothbrok",
        email: "ragnar@example.com",
        password:
          "$2b$10$nbPukuIgYh9lA2n/MuBT4evbUDbrlorFl2WQIewJS7Pc4RlRG/hvy",
        userType: USER_TYPE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const options = {};

    await queryInterface.bulkInsert("users", users, options);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};

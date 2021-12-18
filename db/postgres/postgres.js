require("dotenv").config();

const config = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
  seederStorage: "sequelize",
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<< YOU NEED THIS
    }
  },
};

module.exports = {
  development: { ...config },
  test: { ...config },
  production: { ...config },
};
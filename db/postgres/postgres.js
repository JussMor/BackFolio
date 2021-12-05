require("dotenv").config();

const config = {
  username: process.env.PG_USER || "root",
  password: process.env.PG_PASSWORD || "9135lp",
  database: process.env.PG_DATABASE || "todo_app",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  dialect: "postgres",
  seederStorage: "sequelize",
};

module.exports = {
  development: { ...config },
  test: { ...config },
  production: { ...config },
};
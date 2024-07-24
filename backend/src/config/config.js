require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.APP_PORT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbNameCloud: process.env.DB_NAMECLOUD,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,

};

module.exports = config;

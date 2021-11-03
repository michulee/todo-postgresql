const Pool = require("pg").Pool;
require("dotenv").config();
// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
// })
// const devConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// };

const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

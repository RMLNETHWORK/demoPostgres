// 1. import the 'pg' library
const { Pool } = require("pg");

// 2. load /server/.env variables
require("dotenv").config();

// 3. create connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

module.exports = pool;
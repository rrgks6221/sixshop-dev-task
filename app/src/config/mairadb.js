'use strict';

const db = require('mariadb');

const mariadb = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3307,
  connectionLimit: 5,
});

module.exports = mariadb;

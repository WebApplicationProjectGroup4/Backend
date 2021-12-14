const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

// create a connection to the db
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;
const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

// create a connection to the db
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the db connection
connection.connect(error => {
  if (error) throw error;

  console.log("connected to mysql");
});

module.exports = connection;
const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'awa'
});

connection.query('SELECT * FROM restaurant', function (err, rows, fields) {
  if (err) throw err

  console.log(rows)

});

module.exports = connection;

//connection.connect()
//connection.end()
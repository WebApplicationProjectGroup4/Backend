var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'awa'
})

// module.exports = connection; // jos on mysql pool
// const connection = mysql.createPool({

connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//  if (err) throw err

//  console.log('The solution is: ', rows[0].solution)
// })

//connection.end()
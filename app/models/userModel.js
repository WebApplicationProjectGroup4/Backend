const sql = require("./db.js");

// constructor
const User = function(user) {
  //this.idUser = user.idUser;
  this.name = user.name;
  this.password = user.password;
  this.adminAccount = user.adminAccount;
};

// remember to post with JSON data in postman :-)
User.create = (newUser, result) => {

    sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user");
      result(null, { id: res.insertId, ...newUser });
    });
  };

User.findById = (id, result) => {
    sql.query(`SELECT * FROM Users WHERE idUser = ${id}`, (err, res) => {
    if (err) throw err; // select error

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // user not found by ID
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (userName, result) => {
  let query = "SELECT * FROM Users";

  if (userName) {
    query += ` WHERE Name LIKE '%${userName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) throw err; // select error

    console.log("user: ", res);
    result(null, res);
  });
};

module.exports = User;
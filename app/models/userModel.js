const sql = require("./db.js");
const bcrypt = require('bcrypt');

// constructor
const User = function(user) {
  this.name = user.name;
  this.password = user.password;
  this.adminAccount = user.adminAccount;
};

// remember to post with JSON data in postman :-)
User.create = (newUser, result) => {

  const salt = bcrypt.genSaltSync(6);
  newUser.password = bcrypt.hashSync(newUser.password, salt);
  // encrypt new password

  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) throw err; // insert error
  
    console.log("created user");
    result(null, { id: res.insertId, ...newUser });
  });
};

module.exports = User;
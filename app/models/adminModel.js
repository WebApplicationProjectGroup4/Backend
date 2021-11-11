const sql = require("./db.js");

// constructor
const Admin = function(admin) {
  //this.idAdmin = admin.idCustomer;
  this.name = admin.name;
  this.password = admin.password;
};

// remember to post with JSON data in postman :-)
Admin.create = (newAdmin, result) => {

    sql.query("INSERT INTO Admin SET ?", newAdmin, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created admin");
      result(null, { id: res.insertId, ...newCustomer });
    });
  };

  Admin.findById = (id, result) => {
    sql.query(`SELECT * FROM Admin WHERE idAdmin = ${id}`, (err, res) => {
    if (err) throw err; // select error

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found by ID
    result({ kind: "not_found" }, null);
  });
};

Admin.getAll = (adminName, result) => {
  let query = "SELECT * FROM Admin";

  if (adminName) {
    query += ` WHERE name LIKE '%${adminName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) throw err; // select error

    console.log("admin: ", res);
    result(null, res);
  });
};

Admin.updateById = (id, admin, result) => {
  sql.query(
    "UPDATE Admin SET Name = ?, Password = ? WHERE idAdmin = ?",
    [admin.name, admin.password, id],
    (err, res) => {
      if (err) throw err; // update error

      if (res.affectedRows == 0) {
        // not found by ID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated admin: ", admin.name + " " + admin.password + " " + id);
      result(null, res);
    }
  );
};

Admin.remove = (id, result) => {
  sql.query("DELETE FROM Admin WHERE idAdmin = ?", id, (err, res) => {
    if (err) throw err; // delete error

    if (res.affectedRows == 0) {
      // not found by ID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted admin with id: ", id);
    result(null, res);
  });
};

module.exports = Admin;
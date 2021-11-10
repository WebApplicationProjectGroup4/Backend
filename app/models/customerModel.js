const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  //this.idCustomer = customer.idCustomer;
  this.name = customer.name;
  this.password = customer.password;
};

// doesn't work
// "name cannot be null"
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer");
      result(null, { id: res.insertId, ...newCustomer });
    });
  };

/*
// original create function
Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};
*/

Customer.findById = (id, result) => {
    sql.query(`SELECT * FROM customer WHERE idCustomer = ${id}`, (err, res) => {
    if (err) throw err; // select error

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // customer not found by ID
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = (customerName, result) => {
  let query = "SELECT * FROM customer";

  if (customerName) {
    query += ` WHERE name LIKE '%${customerName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) throw err; // select error

    console.log("customer: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customer SET name = ?, password = ? WHERE id = ?",
    [customer.name, customer.password, id],
    (err, res) => {
      if (err) throw err; // update error

      if (res.affectedRows == 0) {
        // customer not found by ID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", customer.name + " " + customer.password + " " + id);
      result(null, res);
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customer WHERE idCustomer = ?", id, (err, res) => {
    if (err) throw err; // delete error

    if (res.affectedRows == 0) {
      // customer not found by ID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

module.exports = Customer;
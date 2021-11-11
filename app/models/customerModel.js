const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  //this.idCustomer = customer.idCustomer;
  this.name = customer.name;
  this.password = customer.password;
};

// remember to post with JSON data in postman :-)
Customer.create = (newCustomer, result) => {
  console.log(newCustomer);
    sql.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer");
      result(null, { id: res.insertId, ...newCustomer });
    });
  };

Customer.findById = (id, result) => {
    sql.query(`SELECT * FROM Customer WHERE idCustomer = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM Customer";

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
    "UPDATE Customer SET Name = ?, Password = ? WHERE idCustomer = ?",
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
  sql.query("DELETE FROM Customer WHERE idCustomer = ?", id, (err, res) => {
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
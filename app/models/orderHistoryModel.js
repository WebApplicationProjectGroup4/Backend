const sql = require("./db.js");

// constructor
const OrderHistory = function(orderHistory) {
  //this.idOrderHistory = customer.idOrderHistory;
  this.price = orderHistory.price;
  this.idCustomer = orderHistory.idCustomer;
  this.idRestaurant = orderHistory.idRestaurant;
};

OrderHistory.create = (newOH, result) => {

    // INSERT INTO OrderHistory SET Price = 25, Date = current_date, Customer_idCustomer = 18, Restaurant_idRestaurant = 1",
    // works when hardcoded

    let date = "current_date";

    console.log(newOH);
    sql.query("INSERT INTO OrderHistory SET Price = ?, Date = ?, Customer_idCustomer = ?, Restaurant_idRestaurant = ?",
    newOH.price, date, newOH.idCustomer, newOH.idRestaurant, (err, res) => {

      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created order history");
      result(null, { id: res.insertId, ...newOH });
    });
};

OrderHistory.findById = (id, result) => {
    sql.query(`SELECT * FROM OrderHistory WHERE Customer_idCustomer = ${id}`, (err, res) => {
    if (err) throw err; // select error

    if (res.length) {
        console.log("found orderhistory: ", res);
        result(null, res[0]);
        return;
    }
    // not found by ID
    result({ kind: "not_found" }, null);
  });
};

OrderHistory.getAll = (idCustomer, result) => {
    let query = "SELECT * FROM OrderHistory";
  
    if (idCustomer) {
      query += ` WHERE Customer_idCustomer LIKE '%${idCustomer}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) throw err; // select error
    
        console.log("OrderHistory: ", res);
        result(null, res);
    });
};

module.exports = OrderHistory;
const sql = require("./db.js");

// constructor
const OrderHistory = function(orderHistory) {
  //this.idOrderHistory = customer.idOrderHistory;
  this.price = orderHistory.price;
  this.idCustomer = orderHistory.idCustomer;
  this.idRestaurant = orderHistory.idRestaurant;
};

OrderHistory.create = (newOH, result) => {

    let procQuery = `CALL CreateOrderHistory(?,?,?)`;
    sql.query(procQuery, [newOH.price, newOH.idCustomer, newOH.idRestaurant], (err, res) => {

      if (err) {
        console.log("error: ", err);
        return;
      }

      console.log("created order history");
      result(null, { id: res.insertId, ...newOH });
    });
};

OrderHistory.getAll = (idCustomer, result) => {
    let query = "SELECT * FROM OrderHistory"; // get all
  
    if (idCustomer)
      query += ` WHERE Customer_idCustomer LIKE '%${idCustomer}%'`;
      // if idCustomer exists, add this to sql.query

    sql.query(query, (err, res) => {
        if (err) throw err; // select error
    
        if (res.length) {
          console.log("found orderhistory: ", res);
          result(null, res);
          return;
      }
    });
};

module.exports = OrderHistory;
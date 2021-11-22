const sql = require("./db.js");

// constructor
const OrderHistory = function(orderHistory) {
  //this.idOrderHistory = customer.idOrderHistory;
  this.price = orderHistory.price;
  this.idUser = orderHistory.idUser;
  this.idRestaurant = orderHistory.idRestaurant;
};

OrderHistory.create = (newOH, result) => {

    let procQuery = `CALL CreateOrderHistory(?,?,?)`;
    sql.query(procQuery, [newOH.price, newOH.idUser, newOH.idRestaurant], (err, res) => {

      if (err) {
        console.log("error: ", err);
        return;
      }

      console.log("created order history");
      result(null, { id: res.insertId, ...newOH });
    });
};

OrderHistory.getAll = (idUser, result) => {
    let query = "SELECT * FROM OrderHistory"; // get all
  
    if (idUser)
      query += ` WHERE User_idUser LIKE '%${idUser}%'`;
      // if idUser exists, add this to sql.query

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

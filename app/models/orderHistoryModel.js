const sql = require("./db.js");

// constructor
const OrderHistory = function(orderHistory) {
  this.orderedItems = orderHistory.orderedItems;
  this.price = orderHistory.price;
  this.idUser = orderHistory.idUser;
  this.idRestaurant = orderHistory.idRestaurant;
};

OrderHistory.create = (newOH, result) => {

  let procQuery = `CALL CreateOrderHistory(?,?,?,?)`;
  sql.query(procQuery, [newOH.orderedItems, newOH.price, newOH.idUser, newOH.idRestaurant], (err, res) => {

    if (err) throw err;

    console.log("created order history");
    result(null, { id: res.insertId, ...newOH });
  });
};

OrderHistory.getAll = (idUser, result) => {

  if (idUser === undefined || isNaN(idUser) || idUser === 0) throw "idUser is undefined, NaN or 0!";
  
  let query = `SELECT * FROM OrderHistory WHERE Users_idUser = ${idUser}`;
  // get all orders by this user

    sql.query(query, (err, res) => {
        if (err) throw err; // select error
    
        if (res.length)
          result(null, res);
        else
          result(null, "No orders by this account!");
    });
};

module.exports = OrderHistory;

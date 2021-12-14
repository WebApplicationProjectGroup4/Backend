const sql = require("./db.js");

// constructor
const OrderHistory = function(orderHistory) {
  this.price = orderHistory.price;
  this.date = orderHistory.date;
  this.idUser = orderHistory.idUser;
  this.idRestaurant = orderHistory.idRestaurant;
  this.orderedItems = orderHistory.orderedItems;
};

OrderHistory.create = (newOH, result) => {

  sql.query(`INSERT INTO OrderHistory VALUES(0,?,current_date,?,?,?) `,
  [newOH.price, newOH.idUser, newOH.idRestaurant, newOH.orderedItems], (err, res) => {

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

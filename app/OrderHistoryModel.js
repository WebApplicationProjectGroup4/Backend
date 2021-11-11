const sql = require("./db.js");

// constructor
const OrderHistory = function(orderHistory) {
  //this.idOrderHistory = customer.idOrderHistory;
  this.idOrder = orderHistory.idOrder;
  this.price = orderHistory.price;
  this.customerId = orderHistory.customerId;
  this.restaurantId = orderHistory.restaurantId;
};
    // remember to post with JSON data in postman q:D
    // find alliin muutos eli customer id tietokantakyselyyn
    OrderHistory.create = (newOrderHistory, result) => {

    sql.query("INSERT INTO OrderHistory SET ?", newOrderHistory, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created order history");
      result(null, { id: res.insertId, ...newCustomer });
    });
  };

  OrderHistory.findById = (id, result) => {
    sql.query(`SELECT * FROM OrderHistory WHERE orderHistory_customerId = ${id}`, (err, res) => {
    if (err) throw err; // select error

    if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
}
    // not found by ID
    result({ kind: "not_found" }, null);
  });
};

OrderHistory.getAll = (OrderHistoryName, result) => {
    let query = "SELECT * FROM OrderHistory";
  
    if (orderHistoryIdOrder) {
      query += ` WHERE name LIKE '%${orderHistoryIdOrder}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) throw err; // select error
    
        console.log("OrderHistory: ", res);
        result(null, res);
    });
};

      OrderHistory.updateById = (id, orderHistory, result) => {
        sql.query(
          "UPDATE OrderHistory SET idOrder = ?, Price = ?, customerId = ? WHERE restaurantId = ?",
          [orderHistory.idOrder, orderHistory.price, orderHistory.customerId, id],
          (err, res) => {
            if (err) throw err; // update error
      
            if (res.affectedRows == 0) {
              // not found by ID
              result({ kind: "not_found" }, null);
              return;
            }

            console.log("updated order history: ", orderHistory.idOrder + " " + orderHistory.price + " "
            + orderHistory.customerId + + orderHistory.restaurantId + " " + id);
            result(null, res);
          }
        );
      };
      
      OrderHistory.remove = (id, result) => {
        sql.query("DELETE FROM OrderHistory WHERE idOrder = ?", id, (err, res) => {
          if (err) throw err; // delete error
      
          if (res.affectedRows == 0) {
            // not found by ID
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted order with id: ", id);
          result(null, res);
        });
      };
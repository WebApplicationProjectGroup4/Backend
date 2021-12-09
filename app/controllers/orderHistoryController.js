const OrderHistory = require("../models/orderHistoryModel.js");
const userID = require("../models/currentUserID.js");

// create and save a new order to db
exports.create = (req, res) => {

  // validate post request
  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty"
    });
  }
  
  // create an order (post)
  const orderHistory = new OrderHistory({
    date: req.body.date,
    price: req.body.price,
    idUser: req.body.idUser,
    idRestaurant: req.body.idRestaurant,
    orderedItems: req.body.orderedItems
  });

  // save order in the db
  OrderHistory.create(orderHistory, (err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || "db insert error"
        });
    else res.send(data);
  });
};

// retrieve all orders from the database (with body condition).
exports.findAll = (req, res) => {

  const idUser = userID();
  // get the last idUser
  
  OrderHistory.getAll(idUser, (err, data) => {
    if (err)
      res.status(500).send({
          message: err.message || "db retrieval error"
      });
    else res.send(data);
  });
};
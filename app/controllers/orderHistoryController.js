const OrderHistory = require("../models/orderHistoryModel.js");

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
      //id: req.body.id,
      price: req.body.price,
      idCustomer: req.body.idCustomer,
      idRestaurant: req.body.idRestaurant
    });

     // save order in the db
     OrderHistory.create(orderHistory, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "some error occurred while creating an order history."
          });
        else res.send(data);
      });
    };

// retrieve all orders from the database (with body condition).
exports.findAll = (req, res) => {

    const idCustomer = req.body.idCustomer;

    // GET: http://localhost:8080/orderhistory
    // body - raw - json
    // { "idCustomer": "19" }
    // gets all orders by customer id 19
  
    OrderHistory.getAll(idCustomer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
};
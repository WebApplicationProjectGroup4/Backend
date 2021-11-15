const OrderHistory = require("../models/orderHistoryModel.js");

// create and save a new order history to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create an order history (post)
    const orderHistory = new OrderHistory({
      //id: req.body.id,
      price: req.body.price,
      idCustomer: req.body.idCustomer,
      idRestaurant: req.body.idRestaurant
    });

     // save order history in the db
     OrderHistory.create(orderHistory, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "some error occurred while creating an order history."
          });
        else res.send(data);
      });
    };

// retrieve all historical orders from the database (with condition).
exports.findAll = (req, res) => {

    const name = req.query.name;
  
    OrderHistory.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
  };

// find a single order history with its respective order id.
exports.findOne = (req, res) => {

    OrderHistory.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error retrieving order with id: " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

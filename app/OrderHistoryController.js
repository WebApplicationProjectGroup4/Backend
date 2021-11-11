const OrderHistory = require("../models/OrderHistoryModel.js");

// create and save a new order history to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create an order history (post)
    const orderHistory = new orderHistory({
      //id: req.body.id,
      idOrder: req.body.idOrder,
      price: req.body.price,
      customerId: req.body.customerId,
      restaurantId: req.body.restaurantId
    });

     // save order history in the db
     OrderHistory.create(OrderHistory, (err, data) => {
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

  // update an order identified by the id in the request
exports.update = (req, res) => {

    // validate update request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    console.log(req.body);
  
    OrderHistory.updateById(
      req.params.id,
      new orderHistory(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `didn't find order with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
                message: `couldn't update order with id ${req.params.id}. missing db rights?`
            });
          }
        } else res.send(data);
      }
    );
  };

  // delete an order with the specified id in the request
exports.delete = (req, res) => {

    OrderHistory.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `couldn't delete order with id ${req.params.id}. missing db rights?`
          });
        }
      } else res.send({ message: `order was deleted successfully` });
    });
  };



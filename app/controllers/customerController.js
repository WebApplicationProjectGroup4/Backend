const Customer = require("../models/customerModel.js");

// create and save a new customer to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create a customer
    const customer = new Customer({
      name: req.body.name,
      password: req.body.password
    });
  
    // save Customer in the db
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "some error occurred while creating a new customer."
        });
      else res.send(data);
    });
  };

// retrieve all customers from the database (with condition).
exports.findAll = (req, res) => {

    const name = req.query.name;
  
    Customer.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
  };

// find a single customer with a id
exports.findOne = (req, res) => {

    Customer.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error retrieving customer with id: " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// update a customer identified by the id in the request
exports.update = (req, res) => {

    // validate update request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    console.log(req.body);
  
    Customer.updateById(
      req.params.id,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `didn't find customer with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
                message: `couldn't update customer with id ${req.params.id}. missing db rights?`
            });
          }
        } else res.send(data);
      }
    );
  };

// delete a customer with the specified id in the request
exports.delete = (req, res) => {

    Customer.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `couldn't delete customer with id ${req.params.id}. missing db rights?`
          });
        }
      } else res.send({ message: `customer was deleted successfully` });
    });
  };
const Customer = require("../models/customerModel.js");

// create and save a new customer to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create a customer (post)
    const customer = new Customer({
      //id: req.body.id,
      name: req.body.name,
      password: req.body.password
    });
  
    // save customer in the db
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
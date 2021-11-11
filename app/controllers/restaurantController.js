const Restaurant = require("../models/restaurantModel.js");

// create and save a new restaurant to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create a restaurant (post)
    const restaurant = new Restaurant({
      //id: req.body.id,
      name: req.body.name,
      foodtype: req.body.foodtype,
      price: req.body.price
    });
  
    // save restaurant in the db
    Restaurant.create(restaurant, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "some error occurred while creating a new restaurant."
        });
      else res.send(data);
    });
  };

// retrieve all restaurants from the database (with condition).
exports.findAll = (req, res) => {

    const name = req.query.name;
  
    Restaurant.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
  };

// find a single restaurant with a id
exports.findOne = (req, res) => {

    Restaurant.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find restaurant with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error retrieving restaurant with id: " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// update a restaurant identified by the id in the request
exports.update = (req, res) => {

    // validate update request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    console.log(req.body);
  
    Restaurant.updateById(
      req.params.id,
      new Restaurant(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `didn't find restaurant with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
                message: `couldn't update restaurant with id ${req.params.id}. missing db rights?`
            });
          }
        } else res.send(data);
      }
    );
  };

// delete a restaurant with the specified id in the request
exports.delete = (req, res) => {

    Restaurant.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find restaurant with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `couldn't delete restaurant with id ${req.params.id}. missing db rights?`
          });
        }
      } else res.send({ message: `restaurant was deleted successfully` });
    });
  };
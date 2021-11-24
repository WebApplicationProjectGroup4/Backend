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
      address: req.body.address,
      priceLevel: req.body.priceLevel,
      operatingHours: req.body.operatingHours,
      foods:  req.body.foods
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
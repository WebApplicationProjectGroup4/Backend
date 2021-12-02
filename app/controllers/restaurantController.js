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
    name: req.body.name,
    address: req.body.address,
    priceLevel: req.body.priceLevel,
    operatingHours: req.body.operatingHours,
    foods: req.body.foods,
    foodsPrices: req.body.foodsPrices
  });
  
  // save restaurant in the db
  Restaurant.create(restaurant, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "db insert error"
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
        message: err.message || "db retrieval error"
      });
    else res.send(data);
  });
};
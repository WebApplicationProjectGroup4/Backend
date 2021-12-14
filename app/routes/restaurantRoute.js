module.exports = app => {
    const restaurant = require("../controllers/restaurantController.js");
  
    var router = require("express").Router();
  
    // create a new restaurant
    router.post("/", restaurant.create);
  
    // retrieve all restaurants
    router.get("/", restaurant.findAll);
  
    app.use('/restaurants', router);
  };
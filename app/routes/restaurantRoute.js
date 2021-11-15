module.exports = app => {
    const restaurant = require("../controllers/restaurantController.js");
  
    var router = require("express").Router();
  
    // create a new customer
    router.post("/", restaurant.create);
  
    // retrieve all customer
    router.get("/", restaurant.findAll);
  
    // retrieve a single customer with id
    router.get("/:id", restaurant.findOne);
  
    app.use('/restaurants', router);
  };
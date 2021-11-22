module.exports = app => {
    const restaurant = require("../controllers/restaurantController.js");
  
    var router = require("express").Router();
  
    // create a new restaurant
    router.post("/", restaurant.create);
  
    // retrieve all restaurant
    router.get("/", restaurant.findAll);
  
    // retrieve a single restaurant with id
    router.get("/:id", restaurant.findOne);
  
    app.use('/restaurants', router);
  };
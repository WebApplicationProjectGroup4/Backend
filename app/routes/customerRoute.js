module.exports = app => {
    const customer = require("../controllers/customerController.js");
  
    var router = require("express").Router();
  
    // create a new customer
    router.post("/", customer.create);
  
    // retrieve all customer
    router.get("/", customer.findAll);
  
    // retrieve a single customer with id
    router.get("/:id", customer.findOne);
  
    app.use('/customers', router);
  };
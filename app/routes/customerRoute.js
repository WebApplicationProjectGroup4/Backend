module.exports = app => {
    const customer = require("../controllers/customerController.js");
  
    var router = require("express").Router();
  
    // create a new customer
    router.post("/", customer.create);
  
    // retrieve all customer
    router.get("/", customer.findAll);
  
    // retrieve a single customer with id
    router.get("/:id", customer.findOne);
  
    // update a customer with id
    router.put("/:id", customer.update);
  
    // delete a customer with id
    router.delete("/:id", customer.delete);

    app.use('/customers', router);
  };
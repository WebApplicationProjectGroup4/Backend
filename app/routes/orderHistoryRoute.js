module.exports = app => {
    const orderHistory = require("../controllers/orderHistoryController.js");
  
    var router = require("express").Router();
  
    // create a new customer
    router.post("/", orderHistory.create);
  
    // retrieve all customer
    router.get("/", orderHistory.findAll);
  
    // retrieve a single customer with id
    router.get("/:id", orderHistory.findOne);
  
    // update a customer with id
    router.put("/:id", orderHistory.update);
  
    // delete a customer with id
    router.delete("/:id", orderHistory.delete);

    app.use('/orderhistory', router);
  };
module.exports = app => {
    const orderHistory = require("../controllers/orderHistoryController.js");
  
    var router = require("express").Router();
  
    // create a new order
    router.post("/", orderHistory.create);
  
    // retrieve all orders, with idUser condition
    router.get("/", orderHistory.findAll);
  
    app.use('/orderhistory', router);
};
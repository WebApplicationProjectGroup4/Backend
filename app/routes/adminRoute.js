module.exports = app => {
    const admin = require("../controllers/adminController.js");
  
    var router = require("express").Router();
  
    // create a new customer
    router.post("/", admin.create);
  
    // retrieve all customer
    router.get("/", admin.findAll);
  
    // retrieve a single customer with id
    router.get("/:id", admin.findOne);
  
    // update a customer with id
    router.put("/:id", admin.update);
  
    // delete a customer with id
    router.delete("/:id", admin.delete);

    app.use('/admins', router);
  };
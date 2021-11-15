module.exports = app => {
    const admin = require("../controllers/adminController.js");
  
    var router = require("express").Router();
  
    // create a new admin
    router.post("/", admin.create);
  
    // retrieve all admins
    router.get("/", admin.findAll);
  
    // retrieve a single admin with id
    router.get("/:id", admin.findOne);

    app.use('/admins', router);
  };
module.exports = app => {
    const user = require("../controllers/userController.js");
  
    var router = require("express").Router();
  
    // create a new user
    router.post("/", user.create);
  
    // retrieve all users
    router.get("/", user.findAll);
  
    // retrieve a single user with id
    router.get("/:id", user.findOne);
  
    app.use('/users', router);
  };
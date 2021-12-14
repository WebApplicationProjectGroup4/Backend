module.exports = app => {
    const user = require("../controllers/userController.js");
  
    var router = require("express").Router();
  
    // create a new user
    router.post("/", user.create);
  
    app.use('/users', router);
};
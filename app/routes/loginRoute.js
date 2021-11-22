module.exports = app => {
    const login = require("../controllers/loginController.js");
  
    var router = require("express").Router();
  
    // retrieve all users, with idUser condition
    router.get("/", login.findAll);
  
    app.use('/login', router);
};
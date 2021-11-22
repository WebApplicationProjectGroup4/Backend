const Login = require("../models/loginModel.js");

// retrieve all restaurants from the database (with condition).
exports.findAll = (req, res) => {
  
    const login = new Login({
        name: req.query.name,
        password: req.query.password
      });

    Login.getAll(login, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
};
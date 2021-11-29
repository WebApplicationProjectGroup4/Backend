const User = require("../models/userModel.js");

// create and save a new user to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create a user (post)
    const user = new User({
      //id: req.body.id,
      name: req.body.name,
      password: req.body.password,
      adminAccount: req.body.adminAccount
    });
  
    // save user in the db
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "some error occurred while creating a new user."
        });
      else res.send(data);
    });
};

// retrieve all users from the database (with condition).
exports.findAll = (req, res) => {

    const name = req.body.name;
  
    User.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
};

// find a single user with a id
exports.findOne = (req, res) => {

    User.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error retrieving user with id: " + req.params.id
          });
        }
      } else res.send(data);
    });
};
const Admin = require("../models/adminModel.js");

// create and save a new admin to db
exports.create = (req, res) => {

    // validate post request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    // create a admin (post)
    const admin = new Admin({
      //id: req.body.id,
      name: req.body.name,
      password: req.body.password
    });
  
    // save admin in the db
    Admin.create(admin, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "some error occurred while creating a new admin."
        });
      else res.send(data);
    });
};

// retrieve all admins from the database (with condition).
exports.findAll = (req, res) => {

    const name = req.query.name;
  
    Admin.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "database retrieval error"
        });
      else res.send(data);
    });
};

// find a single admin with a id
exports.findOne = (req, res) => {

    Admin.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find admin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error retrieving admin with id: " + req.params.id
          });
        }
      } else res.send(data);
    });
};
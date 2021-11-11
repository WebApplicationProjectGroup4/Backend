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

// update a admin identified by the id in the request
exports.update = (req, res) => {

    // validate update request
    if (!req.body) {
      res.status(400).send({
        message: "content can not be empty"
      });
    }
  
    console.log(req.body);
  
    Admin.updateById(
      req.params.id,
      new Admin(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `didn't find admin with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
                message: `couldn't update admin with id ${req.params.id}. missing db rights?`
            });
          }
        } else res.send(data);
      }
    );
  };

// delete admin with the specified id in the request
exports.delete = (req, res) => {

    Admin.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `didn't find admin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `couldn't delete admin with id ${req.params.id}. missing db rights?`
          });
        }
      } else res.send({ message: `admin was deleted successfully` });
    });
  };
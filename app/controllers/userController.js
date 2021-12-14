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
    name: req.body.name,
    password: req.body.password,
    adminAccount: req.body.adminAccount
  });
  
  // save user in the db
  User.create(user, (err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || "db insert error"
        });
      else res.send(data);
    });
};
const express = require('express');
const router = express.Router();
const restaurant = require('../models/orderhistory_model');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    account.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  } else {
    account.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

module.exports = router;
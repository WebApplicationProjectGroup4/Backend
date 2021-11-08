const db = require('../database');

const customer = {
  getById: function(id, callback) {
    return db.query('select * from restaurant where idRestaurant=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from restaurant', callback);
  }
};

module.exports = customer;
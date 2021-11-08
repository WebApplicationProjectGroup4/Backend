const db = require('../database');

const restaurants = {
  getById: function(id, callback) {
    return db.query('select * from restaurant where idRestaurant=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from restaurant', callback);
  }
};

module.exports = restaurants;
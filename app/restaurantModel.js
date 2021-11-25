const sql = require("./db.js");

// constructor
const Restaurant = function(restaurant) {
  this.name = restaurant.name;
  this.priceLevel = restaurant.priceLevel;
  this.address = restaurant.address;
  this.operatingHours = restaurant.operatingHours;
  this.foods = restaurant.foods;
  this.foodsPrices = restaurant.foodsPrices;
};

// remember to post with JSON data in postman :-)
Restaurant.create = (newRestaurant, result) => {

    sql.query("INSERT INTO Restaurants SET ?", newRestaurant, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created restaurant");
      result(null, { id: res.insertId, ...newRestaurant });
    });
  };

Restaurant.findById = (id, result) => {
    sql.query(`SELECT * FROM Restaurants WHERE idRestaurant = ${id}`, (err, res) => {
    if (err) throw err; // select error

    if (res.length) {
      console.log("found restaurant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found by ID
    result({ kind: "not_found" }, null);
  });
};

Restaurant.getAll = (restaurantName, result) => {
  let query = "SELECT * FROM Restaurants";

  if (restaurantName) {
    query += ` WHERE Name LIKE '%${restaurantName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) throw err; // select error

    console.log("restaurant: ", res);
    result(null, res);
  });
};

module.exports = Restaurant;
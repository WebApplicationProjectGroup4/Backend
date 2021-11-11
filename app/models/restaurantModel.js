const sql = require("./db.js");

// constructor
const Restaurant = function(restaurant) {
  //this.idRestaurant = restaurant.idRestaurant;
  this.name = restaurant.name;
  this.foodtype = restaurant.foodtype;
  this.price = restaurant.price;
};

// remember to post with JSON data in postman :-)
Restaurant.create = (newRestaurant, result) => {

    sql.query("INSERT INTO Restaurant SET ?", newRestaurant, (err, res) => {
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
    sql.query(`SELECT * FROM Restaurant WHERE idRestaurant = ${id}`, (err, res) => {
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
  let query = "SELECT * FROM Restaurant";

  if (restaurantName) {
    query += ` WHERE name LIKE '%${restaurantName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) throw err; // select error

    console.log("restaurant: ", res);
    result(null, res);
  });
};

Restaurant.updateById = (id, restaurant, result) => {
  sql.query(
    "UPDATE Restaurant SET Name = ?, FoodType = ?, Price = ? WHERE idRestaurant = ?",
    [restaurant.name, restaurant.foodtype, restaurant.price, id],
    (err, res) => {
      if (err) throw err; // update error

      if (res.affectedRows == 0) {
        // not found by ID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated restaurant: ", restaurant.name + " " + restaurant.foodtype + " "
      + restaurant.price + " " + id);
      result(null, res);
    }
  );
};

Restaurant.remove = (id, result) => {
  sql.query("DELETE FROM Restaurant WHERE idRestaurant = ?", id, (err, res) => {
    if (err) throw err; // delete error

    if (res.affectedRows == 0) {
      // not found by ID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted restaurant with id: ", id);
    result(null, res);
  });
};

module.exports = Restaurant;
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
console.log("cors is running on " + corsOptions.origin);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to group 4's backend index site" });
});

require("./app/routes/customerRoute.js")(app);
require("./app/routes/adminRoute.js")(app);
require("./app/routes/restaurantRoute.js")(app);
require("./app/routes/orderHistoryRoute.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
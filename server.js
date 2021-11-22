const express = require("express");
const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 3001;

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/test", (req, res) => {
  res.json({ message: "welcome to group 4's backend index site" });
});

require("./app/routes/userRoute.js")(app);
require("./app/routes/restaurantRoute.js")(app);
require("./app/routes/orderHistoryRoute.js")(app);
require("./app/routes/loginRoute.js")(app);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
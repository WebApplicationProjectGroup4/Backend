const express = require("express");
const app = express();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const sql = require("./app/models/db.js");
const cors = require("cors")
var logout = require('express-passport-logout');

// set port, listen for requests
const PORT = process.env.PORT || 3001;

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  next(); // handler -> next() -> function/route we want to use
});

passport.use(new BasicStrategy(
  
  function(username, password, done) {

    console.log('username: ' + username);
    console.log('password: ' + password);

    let query = `SELECT * FROM Users WHERE Name = '${username}'`; // get this user from DB

      sql.query(query, (err, res) => {
        if (err) throw err; // select error
  
        if (res.length > 0) {
          if (res[0].Name === username) {
            console.log("Match found!");
  
            //if match is found, compare the passwords
            if (res[0].Name === username) {
  
              //if passwords match, then proceed to route handler (the protected resource)
              if(res[0].Password === password)
                done(null, username);
                
              else 
                done(null, false);
            }
          }
        } 
          //reject the request
          else done(null, false);
      })
  }
));

app.get('/login', passport.authenticate('basic', { session: false}), (req, res) => {
  console.log("Your credentials matched");
  res.send("Login was successful");
})


app.get('/authorizationsite', passport.authenticate('basic', { session: false}), function(req, res) {
  console.log("Access granted");
  res.send("Access granted");
})

// simple test route
app.get("/test", (req, res) => {
  res.json({ message: "welcome to group 4's backend index site" });
});

require("./app/routes/userRoute.js")(app);
require("./app/routes/restaurantRoute.js")(app);
require("./app/routes/orderHistoryRoute.js")(app);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
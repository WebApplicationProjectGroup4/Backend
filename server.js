const express = require("express");
const app = express();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const sql = require("./app/models/db.js");
const cors = require("cors");
const bcrypt = require("bcrypt");

// set port, listen for requests
const PORT = process.env.PORT || 3001;

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// cors middleware => cross origin policy for easier data transfers across 3001 <-> 3000
app.use(cors());

app.use((req, res, next) => {
  next(); // handler -> next() -> function/route we want to use
});

let adminAcc = 0; // we'll use this to let frontend know that this is admin
let idUser = 0;

passport.use(new BasicStrategy(
  
  function(username, password, done) {

    console.log('username: ' + username);
    console.log('password: ' + password);

    let query = `SELECT * FROM Users WHERE Name = '${username}'`; // get this user from DB

      sql.query(query, (err, res) => {
        if (err) throw err; // select error
        if (res.length > 0) {
          if (res[0].Name === username) {
 
            (async () => {

              // compare input password to crypted password from db
              const result = await bcrypt.compare(password, res[0].Password); 

              // check admin field from db
              const admin = (res[0].AdminAccount == 1);

              if(result == true) {
                console.log("Admin check: ", admin);

                if (admin == true)
                  adminAcc = 1;
                
                else
                  adminAcc = 0;

                idUser = res[0].idUser;  
                done(null, username);
              }
                
              
              else
                done(null, false);
            }) ();

          }
        }
        //reject the request (no such user)
        else done(null, false);
      })
  }
));

app.get('/login', passport.authenticate('basic', { session: false}), (req, res) => {
  console.log("Login ok");
  console.log("id: ",idUser);
  
  if (adminAcc == 0) 
    res.send(`Login ok - user - id: ${idUser}`);
  
  else
    res.send(`Login ok - admin - id: ${idUser}`);
  
})


app.get('/authorizationsite', passport.authenticate('basic', { session: false}), function(req, res) {
  console.log("Access granted");
  res.send("Access granted");
})

require("./app/routes/userRoute.js")(app);
require("./app/routes/restaurantRoute.js")(app);
require("./app/routes/orderHistoryRoute.js")(app);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
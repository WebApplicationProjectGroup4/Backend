const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const sql = require("./app/models/db.js");
const cors = require("cors");
const userID = require("./app/models/currentUserID.js");
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'pictures/' });
const express = require("express");
//const fs = require('file-system');
const fs = require('fs');

const app = express();

// set port
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

let adminAcc = 0; // let frontend know that this is admin
let idUser = 0; // let frontend know userid from db

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
                userID(idUser); // pass this to currentUserID.js
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
  console.log("User id: ", idUser);
  
  if (adminAcc == 0) 
    res.send(`Login ok - user - id: ${idUser}`);
  
  else
    res.send(`Login ok - admin - id: ${idUser}`);
})

// post: http://localhost:3001/upload
// body - form-data
// 1st key 'img', value 'yourimage.jpg'.
// 2nd key 'text', value 'imagename'.

app.post('/upload', upload.single('img'), function (req, res, next) {
  // req.file is the 'img' file
  // req.body will hold the text fields, if there were any
  console.log("req.file: ", req.file);
  console.log("req.body: ", req.body.text);


  // req.file.filename gets renamed to whatever you had in the post body as key 'text'.
  // jpg is added automatically so instead of pepe.jpg you can just type pepe as the value
  fs.rename(`pictures/${req.file.filename}`, `pictures/${req.body.text}.jpg`, function(err) {
    if (err) throw err;
  });

  res.sendStatus(201);
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
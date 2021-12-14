const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const sql = require("./app/models/db.js");
const cors = require("cors");
const userID = require("./app/models/currentUserID.js");
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'pictures/' });
const cloudinary = require('cloudinary').v2;
const express = require("express");
const fs = require('fs');

const app = express();

cloudinary.config({ 
  cloud_name: 'vatuapi', 
  api_key: '554931322664969', 
  api_secret: '5LPaYLgSBvVNAt9YrmYy8IZEKJE',
});

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

                if (admin == true)
                  adminAcc = 1;
                
                else
                  adminAcc = 0;

                idUser = res[0].idUser;
                userID(idUser); // pass current user to currentUserID.js
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
  console.log("login ok - user id: ", idUser);
  
  if (adminAcc == 0) 
    res.send(`USR/${idUser}`);
  
  else
    res.send(`ADM/${idUser}`);
})

app.post('/upload', upload.single('img'), function (req, res, next) {

  var file = req.file.filename;
  var text = req.body.text.toLowerCase().replace(/'/g, "");
  req.body.text = req.body.text.replace(/'/g, "");

  console.log("filename: ", file, ", replaced with: ", text);

  fs.rename(`pictures/${file}`, `pictures/${text}.jpg`, function(err) {
      if (err) throw err;
    });

  cloudinary.uploader
    .upload(`pictures/${text}.jpg`, {
      resource_type: "image",
      public_id: `pictures/${text}`
  })
  
  .then((result) => {
    console.log(`${text}.jpg posted to cloudinary`);

    sql.query(`UPDATE Restaurants SET ImageURL = '${result.url}' WHERE Name = '${req.body.text}'`, (err, res) => {
      if (err) throw err; // update error
    
        console.log("added url to imageurl field");
      });

    fs.rm(`pictures/${text}.jpg`, { force:true }, (err) => {
      if(err) {
        console.error(err.message);
        return;
      }
      console.log(`${text}.jpg deleted from /pictures`);
    });
  })

  .catch((error) => {
    console.log(JSON.stringify(error, null, 2));
  });
    
  res.send("restaurant + image post ok");
});

app.use(express.static('build'));

require("./app/routes/userRoute.js")(app);
require("./app/routes/restaurantRoute.js")(app);
require("./app/routes/orderHistoryRoute.js")(app);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
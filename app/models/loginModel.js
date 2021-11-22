const sql = require("./db.js");

// constructor
const Login = function(login) {
  this.name = login.name;
  this.password = login.password;
};

Login.getAll = (login, result) => {
    let query = "SELECT * FROM Users"; // get all

    var localUser = login.name;
    var localPW = login.password;

    let adminLoginOK;
    let userLoginOK;
  
    sql.query(query, (err, res) => {
        if (err) throw err; // select error

        if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
          
                    if (res[i].Name === localUser && res[i].Password === localPW ) {
                        console.log("found user/pw match from DB = ", localUser, ";", localPW, 
                        "on index response[", i, "]; and database idUser index", res[i].idUser);
          
                        if (res[i].AdminAccount === 1) {
                            adminLoginOK = "Login ok - Admin";
                            result(null, adminLoginOK);
                        }
                        else {
                            userLoginOK = "Login ok - User";
                            result(null, userLoginOK);
                        }
                    } 
                }
        }

        if (adminLoginOK == null && userLoginOK == null)
            result(null, "Wrong username or password!");
    });
};

module.exports = Login;
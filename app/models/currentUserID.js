var savedUserID = 0;
console.log("Current saved user id in global var: ", savedUserID);

const userID = idUser => {

    if (idUser) {
        console.log("Current parameter user id in global userID function: ", idUser);
        savedUserID = idUser; // save it
    }
      
    return savedUserID;
    // when this gets called without params this is the only executed row
    // which is the last userID that went through this function
}

module.exports = userID;
// export this to server.js & orderHistoryController.js
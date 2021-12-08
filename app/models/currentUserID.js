var savedUserID = 0;

const userID = idUser => {

    if (idUser) // if idUser exists
        savedUserID = idUser; // save it
      
    return savedUserID;
    // when this gets called without params this is the only executed row
    // which is the last userID that went through this function
}

module.exports = userID;
// export this to server.js & orderHistoryController.js
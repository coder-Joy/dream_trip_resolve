const { connections } = require('../configs/dbConnection');
const { stm, T, SimpleToastMessages } = require('simple-toast-messages');
//Will be used to check if a user is an admin and then give them access to some routes

const adminUser = [];
const admin = connections.query(`
SELECT * FROM dream_users WHERE isAdmin = true`,
(err, results) => {
    if(err){ 
        console.log(err);
    }else if(results.length == 0){
        console.log('There are no admins other than you');
    }else{
        adminUser= [...results]
        return adminUser;
    }
});

//To check if username passed in is an admin
function isAdmin(username){
    return adminUser.filter(adm => adm == username);
}


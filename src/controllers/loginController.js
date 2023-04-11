const { connections } = require('../configs/dbConnection');
const crypto = require('crypto');

//helper function to check if a user is valid
function validUser(psword, salt, hash){
    const verifyHash = crypto.pbkdf2Sync(psword, salt, 1000, 50, "sha512").toString('hex');
// console.log(`This is the verifiedHash that was generated ${verifyHash}`);
    return verifyHash === hash;
}

//used to verify before confirming the login
function verifycallback(username, password, done){
    connections.query("SELECT * FROM dream_users WHERE username = ?", [username],
    (err, result)=>{
        if(err) return done(err);
        if(result.length == 0) return done(null, false);

    const isVAlid = validUser(password, result[0].salt, result[0].hash);
    // console.log(`This is the original hash that is being generated ${result[0].hash}`);
    user = {
        id: result[0].id,
        idNumb: result[0].idNumber,
        phoneNumb: result[0].phoneNumber,
        salt: result[0].salt,
        hash: result[0].hash
    }
    if(isVAlid){
          return done(null, user);
    }else{
        console.log('It is not valid')
        return done(null, false);
    }
    })
};

module.exports = {
    validUser,
    verifycallback
}
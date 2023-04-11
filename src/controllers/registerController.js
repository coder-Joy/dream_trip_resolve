const crypto = require('crypto');
const { connections } = require('../configs/dbConnection')
/////////////////////////////////done

//Check if the user exits before registering them
function userExits(req, res, next){
    connections.query("SELECT * FROM dream_users WHERE username = ?", [req.body.username],
    (err, results, fields) => {
        if(err){
            console.error(err);
        }else if(results.length > 0){
            console.log("This user already exist");
            res.redirect('/register');
        }else{
            next();
        }
    })    
}

//Generate a user hash and salt
function generatePassword(passwd){
    const genSalt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(passwd, genSalt, 1000, 60, "sha512").toString('hex');
    
    return {salt: genSalt, hash: genHash};
}

module.exports = {
    userExits,
    generatePassword
}
const express = require('express');

const registrationRoute = express.Router();
const { connections } = require('../configs/dbConnection');
const { userExits, generatePassword } = require('../controllers/registerController')

registrationRoute.get('/register', (req, res, next)=>{
    res.render('register');
    console.log("You are now in the registration route");
})

registrationRoute.post('/register', userExits, (req, res, next)=>{
    const credentials = generatePassword(req.body.psword);
    console.log(credentials);
    connections.query("INSERT INTO dream_users(username, phone_number, id_number, is_admin, hash, salt) VALUES(?, ?, ?, false, ?, ?)",
    [req.body.username, req.body.phone_number, req.body.id_number, credentials.hash, credentials.salt],
    (err, results)=>{
        console.log(`This is the signin page: ${credentials.salt} and ${credentials.hash}`)
        if(err){
            console.log(`The error is ${err}`);
            res.redirect('/register');
            }else{
                res.redirect('/home');
            }
    })
})

module.exports = { registrationRoute };
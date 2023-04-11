const express = require('express');

const passport = require('passport');
const loginRoute = express.Router();

loginRoute.get('/login', (req, res, next)=>{
    console.log(`The user ${req.user}`);
    res.render('login');
});

loginRoute.post('/login', passport.authenticate('localLogin',{
    // successRedirect: '/home',
    failureRedirect: '/register',
    failureMessage: true
}), (req, res) => {
    res.redirect('/home');
    console.log(`user set to ${req.user}`);
});

module.exports = { loginRoute }
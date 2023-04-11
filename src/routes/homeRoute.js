const express = require('express');

const homeRoute = express.Router();

const createHome = false;
homeRoute.get('/home', (req, res, next) => {
    // console.log(`hello the user ${req.user.username}`);
    // this.createHome = true;
        res.render('home');
})

module.exports = { homeRoute }
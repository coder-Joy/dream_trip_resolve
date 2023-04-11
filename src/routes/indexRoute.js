const express = require('express');

const indexRoute = express.Router();

indexRoute.get('/', (req, res, next)=>{
    // if(req.isAuthenticated){
        // fres.render('home');
        console.log('You are not authenticated')
    // }else{
        res.render('index');
    // }
});

module.exports = { indexRoute }
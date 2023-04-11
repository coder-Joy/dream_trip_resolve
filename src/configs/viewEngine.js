const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

//sets all the basic settings
const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname,"..", "views"))
    app.use(express.static(path.join(__dirname,"..", "public")));
    app.use(favicon(path.join(__dirname, "..", "public", "assets", "favicon.ico")))
}
    
module.exports = { configViewEngine }
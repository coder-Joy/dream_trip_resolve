const { connections } = require('../configs/dbConnection');
const express = require('express');

availableticketsRoute = express.Router();

availableticketsRoute.get('/available-tickets', (req, res, next) => {
    const tickets = connections.query(`SELECT * FROM available_tickets`);
    res.render('availableTickets');
})

module.exports = {
    availableticketsRoute
}
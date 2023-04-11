const express = require('express');
const { connections } = require('../configs/dbConnection');
const { generateTicketId } = require('../controllers/ticketController')
//Will work on it later

const bookTicketRoute = express.Router();

bookTicketRoute.get('/book-ticket', (req, res, next) =>{
    res.render('bookTicket', {
        username: req.username
    });    
})

bookTicketRoute.post('/book-ticket', (req, res, next) => {
    connections.query(`INSERT INTO tickets(ticket_id, ticket_owner, from_destination,
        to_destination, departure_date, number_of_passengers) VALUES(?, ?, ?, ?, ?, ?)`,
        [/*req.body.ticket_id*/ generateTicketId().id.toString(), req.body.ticket_owner, req.body.from_destination, 
            req.body.to_destination, req.body.departure_date, parseInt(req.body.passenger_numb)],
            (err, results) => {
                console.log(`This is the ticket_id ${generateTicketId().id}`);
                if(err){
                    console.error(err.stack);
                    res.redirect('/book-ticket');
                }else{
                    console.log(results);
                    res.redirect('/available-tickets');
                }
            }
        )
});

module.exports = {
    bookTicketRoute
}
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const bodyParser = require('body-parser');

const PORT = 3040;
const app = express();
    
//route importation
const { indexRoute } = require('./routes/indexRoute');
const { homeRoute } = require('./routes/homeRoute');
const { loginRoute } = require('./routes/loginRoute');
const { registrationRoute } = require('./routes/registrationRoute');
const { bookTicketRoute } = require('./routes/bookTicketRoute');
const { availableticketsRoute } = require('./routes/availableticketsRoute');

//config importation
const { verifycallback } = require('./controllers/loginController');
const { connections, dbOptions } = require('./configs/dbConnection');
const { configViewEngine } = require('./configs/viewEngine')

const sessionStore = new MYSQLStore(dbOptions);
// console.log(createHome);

//configuring the routes
configViewEngine(app);

app.use(session({
    key: "Dream_trip",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    secret: 'none',
    cookie: {
        maxAge: 1000 * 24 * 60 * 60
    }
}))

const fields = {
    usernameField: 'username',
    // emailField: 'email',
    phoneField: 'phone_number',
    idField: 'id_number',
    passwordField: 'psword'
}

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const strategy = new LocalStrategy(fields, verifycallback);
passport.use('localLogin', strategy);

passport.serializeUser((user, callback) =>{
    // console.log(user.phoneNumber);
    // done(null, user.id);
    return callback(null, {
        id: user.id,
        username: user.username,
    });
});
passport.deserializeUser((userId, done) => {
    connections.query("SELECT * FROM dream_users WHERE id = ?", [userId],
    (err, result) => {
        if(err){
            console.error(err);
        }else{
            console.log(`The results ${result}`);
            done(null, result)
        }
    })
})


// the routes
app.use('/', homeRoute);
app.use('/', indexRoute);
app.use('/', loginRoute);
app.use('/', registrationRoute);
app.use('/', bookTicketRoute);
app.use('/', availableticketsRoute);

app.listen(PORT, () =>{
    console.log(`The app runs on http://localhost:${PORT}`);
})
const passport = require('passport');

const isRegistered = (req, res, next) => {
    req.user.username

    //Now check if the token exist
    if(token) {
        passport
    }else{
        res.redirect('/login');
        next();
    }
}
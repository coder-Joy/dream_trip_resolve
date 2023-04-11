
//will be used to check if user can have access to this route
function isAuth(req, res, next){
    if(req.isAthenticated){
        next()
    }else{
        console.log("It didn't work, try refreshing");
        res.redirect('/register');
    }
}

module.exports = { isAuth }
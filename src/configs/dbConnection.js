const mysql = require('mysql');
///////////////////////////////done
const dbOptions = {
        // database: process.env.database,
        // host: process.env.host,
        // password: process.env.password,
        // user: process.env.user
        user: 'root',
        database: 'dream_trip_resolve',
        host: 'localhost',
        password:'',
};

const connections = mysql.createConnection(dbOptions);

connections.connect((err, res)=>{
    if(err){
        console.log(err);
    }else{
        console.log("The connection was successful");
    }
})

module.exports = {
    dbOptions,
    connections
}
function generateTicketId(){
    const id = Math.random().toPrecision(4) * 100;
    return {id};
}

//Here we will be doing 2 things:
//1-> generate a random ticket id 
//2-> Get the user name, check it in the database, and save in the db
module.exports = {
    generateTicketId
}
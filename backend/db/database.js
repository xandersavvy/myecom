const mongoose = require('mongoose');


const db_uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`; 
// Connect to the database
const connnectDatabase = () => mongoose.connect(db_uri, 
        {useNewUrlParser:true,useUnifiedTopology:true})
        .then((data) => console.log('Database connection successful'+ data.connection.host))
        .catch((err) => console.log(err));


module.exports = connnectDatabase;
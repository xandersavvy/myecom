require('dotenv').config({ path: './.env' }); //give environement variables to the server

const app = require('express')();  //create an express app
const connectDatabase = require('./db/database'); //connect to the database


module.exports = app; //export the app
const port = process.env.PORT || 3000; //set the port
const error = require('./middleware/error'); //import the error middleware

//handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err.message, err.stack);
    process.exit(1);
});




//function to call
connectDatabase(); //connect to the database

app.use(require('express').json()); //use json
app.use("/", require('./routes/productRoute')); //use the product route
app.use("/", require('./routes/userRoute')); //use the user route


app.use(error); //use the error middleware




app.get('/', (req, res) => { //get the root
    res.send(`Hello World!`);
});

app.post('/', (req, res) => { //post the root
    res.send('Hello World');
});



//server code 
const server = app.listen(port, () => { //listen to the port
    console.log(`Server started on port ${port}`);
});

//unhandled promise rejection
process.on('unhandledRejection', (err, promise) => { //if there is an unhandled promise rejection
    console.log(`Error: ${err.message}`); //log the error
    //close the server
    server.close(() => {
        process.exit(1); //exit the process
    }
    );
}); //end of unhandled promise rejection
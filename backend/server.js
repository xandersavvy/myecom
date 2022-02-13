require('dotenv').config({ path: './.env' }); //give environement variables to the server

const app = require('express')();  //create an express app
require('./db/database')(); //connect to the database

const port = process.env.PORT || 3000; //set the port




// cloudinary configuration

require('cloudinary').config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



//handle uncaught exceptions


process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err.message, err.stack);
    process.exit(1);
});




//function to call

app.use(require('express').json()); //use json
app.use(require('cookie-parser')()); //use cookie parser
app.use(require('cors')()); //use cors
app.use(require('body-parser').urlencoded({ extended: true })); //use body parser
app.use("/", require('./routes/productRoute')); //use the product route
app.use("/user", require('./routes/userRoute')); //use the user route
app.use("/order", require('./routes/orderRoute')); //use the order route
app.use("/payment", require('./routes/paymentRoute')); //use the payment route




app.use(require('./middleware/error')); //use the error middleware





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




module.exports = app; //export the app
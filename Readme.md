# MYECOM

This is a simple Nodejs starter backend for an ecommerce application.

This is my personal project to use with various frontend frameworks for testing. 

#### How to start?

* Install **[NodeJS](https://nodejs.org/en/download/)** and NPM(Node Package Manager) .
* Install [**MongoDb**](https://www.mongodb.com/try/download/community) (I have used this for the database). You may also install Mongodb Compass for the GUI .
* You may install [**POSTMAN**](https://www.postman.com/) or **[THUNDER CLIENT](https://www.thunderclient.com/)**  or similar services for testing the API's.
* Install GIT and clone the repo : https://github.com/xandersavvy/myecom.git . you can run   ``git clone https://github.com/xandersavvy/myecom.git `` in your terminal.
* Now open the folder in your favorite text editor or IDE . I reccommend VSCODE.
* In the Backend folder create / update a file named ``.env`` Here, includes this variables(IN Brackets those are instructions please omit all of them).

  ```
  PORT=3000[Port number you want to run your app on ,If 3000 is not free or will be used on other app change accordingly]
  DB_HOST=localhost[this is database host url if you're not using mongo locally change "localhost" accordingly]
  DB_PORT=27017[Default Database PORT number , if mongo is running on another port change this]
  DB_NAME=myecom[Enter the Database name where you want to store the rndom data]
  JWT_SECRET= 9019019[random strings for encode]
  JWT_EXPIRY= 3d
  JWT_COOKIE_EXPIRY=2 
  EMAIL_HOST=smtp.gmail.com[The sender email host for password use the host of the email service you're going to use]
  EMAIL_PORT=587[default gmail port, enter your own wmail service port]
  EMAIL_SERVICE=gmail
  EMAIL_USER=[enter email user name]
  EMAIL_PASS=[enter email id password]
  EMAIL_FROM=[enter email id]
  STRIPE_SECRET_KEY=[Self explanatory]
  STRIPE_PUBLISHABLE_KEY=[Self explanatory]
  CLOUDINARY_NAME=[Self explanatory]
  CLOUDINARY_API_KEY=[Self explanatory]
  CLOUDINARY_API_SECRET=[Self explanatory]
  ```
* Now open the terminal inside the ``backend`` folder and run ``npm i``
* After that run ``npm run dev``.

#### Packages used :

* [bcryptjs](https://github.com/kelektiv/node.bcrypt.js#Usage) -  To encrypt and decrypt the secret datas using Hashes (passwords) .
* body-parser - for parsing the body.
* [cloudinary](https://github.com/cloudinary/cloudinary_npm#usage) - image management service .
* cookie-parser - for parsing cookies .
* dotenv - for the ``.env`` files.
* [express](https://expressjs.com/en/starter/hello-world.html) - As a middleware in the app.
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#usage) - For authentication and authorization using JWT.
* [mongoose](https://mongoosejs.com/docs/index.html) - For working with mongodb.
* [nodemailer](https://nodemailer.com/usage/) - for sending emails from server.
* [nodemon](https://github.com/remy/nodemon#usage) - For live reloading of app after changes.
* [stripe ](https://github.com/stripe/stripe-node/#usage) - for payment handling.
* [validator]() - to validate emails.

#### Please Note :

* I have used ``require(''package-name'')`` directly in many cases , it is same as using a variable to store this and call the variable. i.e.

  ```
  const express = require('express')
  express();
  ```
  is same as ``require('express')()``
* The code might break .
* And I am available for being  hired.

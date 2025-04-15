//external Handler
const path = require('path'); // Import the 'path' module for handling file paths 
const express = require('express');
const dotenv = require('dotenv'); 
const mongoose = require('mongoose'); 
const cookiesparser = require('cookie-parser'); 
const loginRouter = require('./router/loginRouter'); // Import the login router
const usersRouter = require('./router/usersRouter'); // Import the users router
const inboxRouter = require('./router/inboxRouter'); // Import the inbox router


//internal handler
const {notFoundHandler, errorHandler} = require("./middlewares/common/errorHandler");

const app = express();  
dotenv.config(); // Load environment variables from .env file

//database connection
 mongoose.connect(process.env.MONGO_CONNECTION_STRING, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
     })
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB connection error:', err));

 //request body parsing middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({
    extended: true
})); // Parse URL-encoded request bodies

//set view engine

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));  // Set EJS as the view engine

//set static files directory
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory   

//parser cokies
app.use(cookiesparser(process.env.COOKIE_SECRET)); // Parse cookies from the request headers


app.use('/', loginRouter); // Use the login routes defined in loginRoutes.js
app.use('/users',usersRouter); 
app.use('/inbox',inboxRouter); 

//error handling middleware

//404 error handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler); 



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running in port ${port}`);
}); 


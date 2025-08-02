// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

// internal imports
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// set comment as app locals
app.locals.moment = moment;

// database connection with better error handling
const connectDB = async () => {
  try {
    if (process.env.MONGO_CONNECTION_STRING) {
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful!");
    } else {
      console.log("MongoDB connection string not provided");
    }
  } catch (err) {
    console.log("Database connection error:", err.message);
  }
};

// Connect to database
connectDB();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies with fallback
app.use(cookieParser(process.env.COOKIE_SECRET || "default-secret"));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
  });
}

// For Vercel serverless
module.exports = app;
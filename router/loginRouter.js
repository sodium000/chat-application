// external imports
const express = require("express");
const mongoose = require("mongoose");

// internal imports
const { getLogin, login, logout, getRegister, register } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
  doRegisterValidators,
  doRegisterValidationHandler,
} = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

// set page title
const page_title = "Login";

// health check route for debugging
router.get("/health", (req, res) => {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING ? 'set' : 'not set',
    COOKIE_SECRET: process.env.COOKIE_SECRET ? 'set' : 'not set',
    JWT_SECRET: process.env.JWT_SECRET ? 'set' : 'not set',
    COOKIE_NAME: process.env.COOKIE_NAME || 'token'
  };
  
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    environmentVariables: envVars,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// registration page
router.get("/register", decorateHtmlResponse("Register"), redirectLoggedIn, getRegister);

// process registration
router.post(
  "/register",
  decorateHtmlResponse("Register"),
  doRegisterValidators,
  doRegisterValidationHandler,
  register
);

// logout
router.delete("/", logout);

module.exports = router;
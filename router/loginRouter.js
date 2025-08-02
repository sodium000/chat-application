// external imports
const express = require("express");

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
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
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
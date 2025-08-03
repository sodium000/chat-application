// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// get login page
function getLogin(req, res, next) {
  res.render("index"
, {
    data: {
    },
    errors: {},
  });     
  
}

// get registration page
function getRegister(req, res, next) {
  res.render("register", {
    data: {},
    errors: {},
  });
}

// do registration
async function register(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
    });

    const result = await newUser.save();

    res.render("index", {
      data: {
        username: req.body.email,
      },
      errors: {
        common: {
          msg: "Registration successful! Please login.",
        },
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      res.render("register", {
        data: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
        },
        errors: {
          common: {
            msg: "Email or mobile number already exists!",
          },
        },
      });
    } else {
      res.render("register", {
        data: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
        },
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  }
}

// do login
async function login(req, res, next) {
  try {
    // find a user who has this email/username with timeout handling
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    }).maxTimeMS(8000); // 8 second timeout for the query

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: 3600 * 1000, // 1 hour
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: 3600 * 1000, // 1 hour
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err.message);
    
    // Handle specific database timeout errors
    if (err.message.includes('timed out') || err.message.includes('buffering')) {
      res.render("index", {
        data: {
          username: req.body.username,
        },
        errors: {
          common: {
            msg: "Database connection timeout. Please try again.",
          },
        },
      });
    } else {
      res.render("index", {
        data: {
          username: req.body.username,
        },
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
  getRegister,
  register,
};
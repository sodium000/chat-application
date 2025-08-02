const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Mobile number or email is required"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

const doRegisterValidators = [
  check("name")
    .isLength({
      min: 1,
    })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .isLength({
      min: 2,
      max: 50,
    })
    .withMessage("Name length must be 2-50 characters"),
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Please provide a valid Bangladeshi mobile number"),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
  check("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];

const doRegisterValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("register", {
      data: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
  doRegisterValidators,
  doRegisterValidationHandler,
};
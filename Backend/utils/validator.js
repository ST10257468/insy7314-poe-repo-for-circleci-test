const { body } = require("express-validator");

const passwordStrength = body("password")
    .isString()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Za-z]/).withMessage("Password must include a letter")
    .matches(/\d/).withMessage("Password needs to have a number");

const emailField = body("email")
    .isEmail().withMessage("Email must be valid")
    .normalizeEmail();

const usernameField = body("username")
    .optional()
    .isLength({ min: 3, max: 40 }).withMessage("Username must be 3-40 characters")
    .isAlphanumeric().withMessage("Username must be alphanumeric");


//register rules
const registerRules = [emailField, usernameField, passwordStrength];

//login rules
const loginRules = [
    //emailField,
    // doesnt work - $or: [{ email }, { username }], - can only be used in mongo
    body().custom((_, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new Error("Either email or username is required");
    }
    return true;
  }),
    body("password").isString().notEmpty().withMessage("Password is required"),
];

//employee login
const loginEmployeeRules = [
  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = {registerRules, loginRules, loginEmployeeRules};
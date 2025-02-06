const { body, validationResult } = require("express-validator");

const alphaNumericErr = "must be either letters or numbers.";
const lengthErr = "must be between 3 and 20 characters long.";

const validateUserName = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username " + alphaNumericErr)
    .isLength({ min: 3, max: 20 })
    .withMessage("Username " + lengthErr),
];

exports.newGet = (req, res) => {
  const title = "Create a new user";
  res.render("pages/new", { title });
};

exports.newPost = [
  validateUserName,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400);
    }

    const { username } = req.body;
    console.log(`Username: ${username}`);
    res.send(200);
  },
];

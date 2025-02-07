const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

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

exports.getUsernames = async (req, res) => {
  const usernames = await db.getAllUsernames();
  const title = "All users";
  res.render("pages/index", { usernames, title });
};

exports.createUsernameGet = async (req, res) => {
  const title = "Create a new user";
  res.render("pages/new", { title });
};

exports.createUsernamePost = [
  validateUserName,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400);
    }

    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
  },
];

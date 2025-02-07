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

exports.searchUsernamesGet = [
  validateUserName,
  async (req, res) => {
    const searchItem = req.query.username;
    const usernames = await db.findUsername(searchItem);
    const title = "Found Result";
    console.dir(usernames);
    res.render("pages/searchResult", { usernames, title });
  },
];

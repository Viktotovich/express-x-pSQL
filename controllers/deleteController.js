const db = require("../db/queries");

exports.deleteAll = async (req, res) => {
  await db.clearTable();
  res.redirect("/");
};

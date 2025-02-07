const pool = require("./pool");

async function getAllUsernames() {
  try {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function insertUsername(username) {
  try {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [
      username,
    ]);
    console.dir(username);
    console.dir(await pool.query("SELECT * FROM usernames"));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllUsernames,
  insertUsername,
};

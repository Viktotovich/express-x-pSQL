const pool = require("./pool");
require("dotenv").config();

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

async function findUsername(searchItem) {
  try {
    console.log(searchItem);
    const { rows } = await pool.query(
      "SELECT * FROM usernames WHERE username = $1",
      [searchItem]
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function clearTable() {
  await pool.query(`TRUNCATE usernames RESTART IDENTITY CASCADE`);
}

module.exports = {
  getAllUsernames,
  insertUsername,
  findUsername,
  clearTable,
};

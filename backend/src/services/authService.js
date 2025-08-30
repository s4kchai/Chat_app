const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function findUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  if (rows.length === 0) return null;
  return rows[0];
}

async function createUser(username, password, email, displayname) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    "INSERT INTO users (username,password,email,displayname) VALUES ($1 ,$2,$3, $4) RETURNING username",
    [username, hashedPassword, email, displayname]
  );

  return rows[0];
}

async function loginUser(username, password) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  const user = rows[0];
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  const { password: hashedPassword, ...safeUser } = user;
  return safeUser;
}

module.exports = { createUser, loginUser, findUsername };

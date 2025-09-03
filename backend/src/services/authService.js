const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function findUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  if (rows.length === 0) return null;
  return rows[0];
}

async function createUser(username, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    "INSERT INTO users (username,password,email) VALUES ($1 ,$2,$3) RETURNING username",
    [username, hashedPassword, email]
  );

  return rows[0];
}

async function loginUser(email, password) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
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

async function checkRefreshToken(refreshToken) {
  const { rows } = await pool.query(
    "SELECT * FROM auth_token WHERE refresh_token = $1 AND token_status = 1 AND token_expired > NOW()",
    [refreshToken]
  );
  return rows[0] || null;
}

async function createRefreshToken(userId, refreshToken) {
  const { rows } = await pool.query(
    `INSERT INTO auth_token (token_uid, refresh_token, token_status, token_expired) 
     VALUES ($1, $2, 1, NOW() + INTERVAL '7 days') RETURNING *`,
    [userId, refreshToken]
  );
  return rows[0];
}

module.exports = { createUser, loginUser, findUsername, checkRefreshToken, createRefreshToken };

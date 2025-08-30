const pool = require("../config/db");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM .users");
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return rows[0];
}

async function createUser({ name, email }) {
  const { rows } = await pool.query("INSERT INTO users(name, email) VALUES($1, $2) RETURNING *", [name, email]);
  return rows[0];
}

async function updateUser(id, { name, email }) {
  const { rows } = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, id]);
  return rows[0];
}

async function deleteUser(id) {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };

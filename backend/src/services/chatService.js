const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function createRoom(uid, text) {
  const { rows } = await pool.query("INSERT INTO chat VALUES ($1 ,$2,$3, $4) RETURNING * ", [uid, text]);
  return rows[0];
}

async function createRoom(uid, text) {
  const { rows } = await pool.query("INSERT INTO chat VALUES ($1 ,$2,$3, $4) RETURNING * ", [uid, text]);
  return rows[0];
}

async function createRoom(uid, text) {
  const { rows } = await pool.query("INSERT INTO chat VALUES ($1 ,$2,$3, $4) RETURNING * ", [uid, text]);
  return rows[0];
}

module.exports = { createRoom };

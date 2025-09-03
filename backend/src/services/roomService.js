const pool = require("../config/db");
const crypto = require("crypto");

function generateRoomCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

async function createRoom(userId) {
  const MAX_RETRY = 5;

  for (let i = 0; i < MAX_RETRY; i++) {
    const roomNumber = generateRoomCode();

    const existing = await searchRoomNumber(roomNumber);
    if (existing) continue;

    try {
      const { rows } = await pool.query(
        "INSERT INTO rooms (room_number, room_created_id) VALUES ($1, $2) RETURNING *",
        [roomNumber, userId]
      );
      return rows[0];
    } catch (err) {
      if (err.code === "23505") continue;
      throw err;
    }
  }

  throw new Error("Cannot generate unique room number after retries");
}

async function searchRoomNumber(roomNumber) {
  const { rows } = await pool.query("SELECT * FROM rooms WHERE room_number = $1 ", [roomNumber]);
  return rows[0] || null;
}

module.exports = { generateRoomCode, createRoom, searchRoomNumber };

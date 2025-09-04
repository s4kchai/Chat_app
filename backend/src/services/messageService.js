const pool = require("../config/db");

async function createMessage(roomId, userId, text, type = "text") {
  const { rows } = await pool.query(
    `INSERT INTO messages (msg_room_id, msg_uid, msg_text, msg_type) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [roomId, userId, text, type]
  );
  return rows[0];
}

async function getMessagesByRoom(roomId) {
  const { rows } = await pool.query(
    `SELECT m.msg_id, m.msg_text, m.msg_type, m.is_deleted, 
            m.msg_created_at, m.msg_updated_at, u.username
     FROM messages m
     JOIN users u ON m.msg_uid = u.id
     WHERE m.msg_room_id = $1 AND is_deleted = false
     ORDER BY m.msg_created_at ASC`,
    [roomId]
  );
  return rows;
}

async function updateMessage(messageId, userId, newText) {
  const { rows } = await pool.query(
    `UPDATE messages 
     SET msg_text = $1, msg_updated_at = NOW() 
     WHERE msg_id = $2 AND msg_uid = $3 AND is_deleted = false
     RETURNING *`,
    [newText, messageId, userId]
  );
  return rows[0] || null;
}

async function softDeleteMessage(messageId, userId) {
  const { rows } = await pool.query(
    `UPDATE messages 
     SET is_deleted = true, msg_updated_at = NOW() 
     WHERE msg_id = $1 AND msg_uid = $2
     RETURNING *`,
    [messageId, userId]
  );
  return rows[0] || null;
}

module.exports = { createMessage, getMessagesByRoom, updateMessage, softDeleteMessage };

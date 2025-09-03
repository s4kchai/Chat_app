const roomService = require("../services/roomService");
const { StatusCodes } = require("http-status-codes");

async function create(req, res) {
  try {
    const userId = req.user.id;
    const room = await roomService.createRoom(userId);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Room created successfully",
      room,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: err.message,
    });
  }
}

async function getRoombyId(req, res) {
  try {
    const { roomNumber } = req.body;
    const room = await roomService.searchRoomNumber(roomNumber);
    if (!room) {
      return res.status(404).json({
        success: false,
        msg: "Room not found",
      });
    }

    return res.json({
      success: true,
      room,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: err.message,
    });
  }
}

module.exports = { create, getRoombyId };

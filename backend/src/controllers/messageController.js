const messageService = require("../services/messageService");
const { StatusCodes } = require("http-status-codes");

async function create(req, res) {
  try {
    const { roomId, text, type } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "Message text cannot be empty",
      });
    }

    const message = await messageService.createMessage(roomId, userId, text, type);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Message sent successfully",
      data: message,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: err.message,
    });
  }
}

async function getByRoom(req, res) {
  try {
    const { roomId } = req.params;
    console.log(req.params);
    const messages = await messageService.getMessagesByRoom(roomId);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: messages,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: err.message,
    });
  }
}

async function update(req, res) {
  try {
    const { messageId } = req.params;
    const { newText } = req.body;
    const userId = req.user.id;

    const updated = await messageService.updateMessage(messageId, userId, newText);
    if (!updated) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "Message not found or unauthorized",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Message updated successfully",
      data: updated,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: err.message,
    });
  }
}

async function remove(req, res) {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const deleted = await messageService.softDeleteMessage(messageId, userId);
    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "Message not found or unauthorized",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      msg: "Message deleted successfully",
      data: deleted,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: err.message,
    });
  }
}

module.exports = { create, getByRoom, update, remove };

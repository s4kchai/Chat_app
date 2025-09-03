const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");
const { createUserSchema, loginSchema } = require("../schema/userSchema");

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(StatusCodes.OK).json({ succes: true, data: users });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "User not found" });
    res.status(StatusCodes.OK).json({ success: true, data: user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, data: newUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(StatusCodes.OK).json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await userService.deleteUser(req.params.id);
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message });
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };

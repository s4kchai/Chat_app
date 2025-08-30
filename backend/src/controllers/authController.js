const authService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");
const { loginSchema, createUserSchema } = require("../schema/userSchema");

async function register(req, res, next) {
  try {
    const { username, password, email, displayname } = req.body;

    const existingUser = await authService.findUsername(username);
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ msg: "Username already exists" });
    }

    const user = await authService.createUser(username, password, email, displayname);

    if (user) {
      return res.status(StatusCodes.CREATED).json({ msg: "User created", data: user });
    } else {
      return res.status(StatusCodes.CONFLICT).json({ msg: "Cannot create user" });
    }
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUser(username, password);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials" });
    }
    return res.status(StatusCodes.OK).json({ msg: "Login successful", data: user });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
}

module.exports = { register, login };

const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/usersModel");

exports.addUser = async (request, response) => {
  const { username, name, password } = request.body;
  if (!password) {
    return response.status(400).json({ error: "Password is required" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    if (
      error.name === "MongoServerError" &&
      error.message.includes("E11000 duplicate key error")
    ) {
      return response
        .status(400)
        .json({ error: "expected `username` to be unique" });
    }

    response.status(500).json({ message: "Server Error" });
  }
};

exports.getUsers = async (reqest, response) => {
  try {
    const users = await User.find()
      .populate("expenses")
      .populate("incomes")
      .sort({ createdAt: -1 });
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

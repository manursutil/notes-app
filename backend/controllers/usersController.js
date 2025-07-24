const bcrypt = require("bcrypt");
const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("notes", {
      title: 1,
      content: 1,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all users" });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    if (!password || password.length < 3) {
      return res
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to create new user" });
  }
};

module.exports = { getAllUsers, createNewUser };

const express = require("express");
const {
  getAllUsers,
  createNewUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createNewUser);

module.exports = router;

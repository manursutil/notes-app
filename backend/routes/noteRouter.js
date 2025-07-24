const express = require("express");
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
  getNoteById,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNewNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

module.exports = router;

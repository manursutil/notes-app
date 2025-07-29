const express = require("express");
const {
  getAllNotes,
  createNewNote,
  deleteNote,
  updateNote,
  getNoteById,
} = require("../controllers/notesController");

const { userExtractor } = require("../middleware/middleware");

const router = express.Router();

router.get("/", userExtractor, getAllNotes);
router.post("/", userExtractor, createNewNote);
router.get("/:id", userExtractor, getNoteById);
router.put("/:id", userExtractor, updateNote);
router.delete("/:id", userExtractor, deleteNote);

module.exports = router;

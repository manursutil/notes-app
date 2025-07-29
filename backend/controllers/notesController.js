const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).populate("user", {
      username: 1,
      name: 1,
    });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch notes" });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user) {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch note" });
  }
};

const createNewNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Missing title or content" });
  }

  try {
    const user = await User.findById(req.user);

    const newNote = new Note({
      title,
      content,
      user: user._id,
    });

    const savedNote = await newNote.save();

    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    return res.status(201).json(savedNote);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create new note" });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user) {
      return res.status(403).json({ error: "Access denied" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();

    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update note" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.user.toString() !== req.user) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Note.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete note" });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateNote,
  deleteNote,
};

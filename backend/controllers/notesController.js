const mongoose = require("mongoose");
const Note = require("../models/note");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch all notes" });
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
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
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
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

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
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

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

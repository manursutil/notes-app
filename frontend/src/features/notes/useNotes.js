import { useState } from "react";
import notesService from "./notesService";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const allNotes = await notesService.getAll();
      setNotes(allNotes);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  const addNote = async ({ title, content }) => {
    try {
      const newNote = await notesService.create({ title, content });
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesService.remove(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const editNote = async (id, updatedFields) => {
    try {
      const updatedNote = await notesService.update(id, updatedFields);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note))
      );
    } catch (err) {
      console.error("Failed to edit note", err);
    }
  };

  return { notes, addNote, fetchNotes, deleteNote, editNote };
};

import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload;
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    removeNote(state, action) {
      return state.filter((note) => note.id !== action.payload);
    },
    updateNote(state, action) {
      const updatedNote = action.payload;
      const index = state.findIndex((note) => note.id === updatedNote.id);

      if (index !== -1) {
        state[index] = updatedNote;
      }
    },
  },
});

export const { setNotes, appendNote, removeNote, updateNote } =
  noteSlice.actions;
export default noteSlice.reducer;

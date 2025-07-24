import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});

export default store;

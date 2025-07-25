import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer,
  },
});

export default store;

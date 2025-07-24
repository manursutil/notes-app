import { useState } from "react";
import NotesList from "./components/NotesList";

const App = () => {
  const [notes, setNotes] = useState([]);

  return (
    <div>
      <h1>Notes</h1>
      <NotesList notes={notes} />
    </div>
  );
};

export default App;

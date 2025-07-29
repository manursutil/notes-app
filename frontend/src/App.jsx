import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuth } from "./features/auth/useAuth";
import { useNotes } from "./features/notes/useNotes";

import LoginForm from "./components/LoginForm";
import AddNoteForm from "./components/AddNoteForm";
import NotesList from "./features/notes/NotesList";
import NoteDetail from "./components/NoteDetail";
import NavBar from "./components/NavBar";

const App = () => {
  const { user, login, logout } = useAuth();
  const { notes, addNote, deleteNote, editNote } = useNotes();
  const navigate = useNavigate();

  if (!user) {
    return <LoginForm handleLogin={login} />;
  }

  return (
    <div>
      <NavBar onLogout={logout} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddNoteForm onAddNote={addNote} />
              <NotesList notes={notes} onSelectNote={(id) => navigate(`/notes/${id}`)} />
            </>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <NoteDetail
              notes={notes}
              onBack={() => navigate("/")}
              onDeleteNote={deleteNote}
              onEditNote={editNote}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

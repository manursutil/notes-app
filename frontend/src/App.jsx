import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuth } from "./features/auth/useAuth";
import { useNotes } from "./features/notes/useNotes";
import usersService from "./services/userService";

import LoginForm from "./components/LoginForm";
import AddNoteForm from "./components/AddNoteForm";
import NotesList from "./features/notes/NotesList";
import NoteDetail from "./components/NoteDetail";
import NavBar from "./components/NavBar";
import SignupForm from "./components/SignUpForm";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  const { user, login, logout } = useAuth();
  const { notes, addNote, deleteNote, editNote } = useNotes();
  const navigate = useNavigate();

  const handleSignup = async ({ name, username, password }) => {
    try {
      await usersService.create({ name, username, password });
      navigate("/");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };


  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LoginForm handleLogin={login} />} />
        <Route path="/signup" element={<SignupForm handleSignup={handleSignup} />} />
      </Routes>
    );
  }

  return (
    <div>
      <NavBar onLogout={logout} />

      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth user={user}>
              <>
                <AddNoteForm onAddNote={addNote} />
                <NotesList notes={notes} onSelectNote={(id) => navigate(`/notes/${id}`)} />
              </>
            </RequireAuth>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <RequireAuth user={user}>
              <NoteDetail
                notes={notes}
                onBack={() => navigate("/")}
                onDeleteNote={deleteNote}
                onEditNote={editNote}
              />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

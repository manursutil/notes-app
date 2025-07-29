import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "./features/auth/useAuth";
import { useNotes } from "./features/notes/useNotes";
import usersService from "./services/userService";
import notesService from "./features/notes/notesService";

import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";
import AddNoteForm from "./components/AddNoteForm";
import NotesList from "./features/notes/NotesList";
import NoteDetail from "./components/NoteDetail";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  const { user, login, logout } = useAuth();
  const { notes, addNote, deleteNote, editNote, fetchNotes } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      notesService.setToken(user.token);
    }
  }, [user?.token]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user, fetchNotes]);

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
    <div className="mx-auto p-4">
      <NavBar onLogout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth user={user}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/2">
                  <AddNoteForm onAddNote={addNote} />
                </div>
                <div className="lg:w-1/2">
                  <NotesList notes={notes} onSelectNote={(id) => navigate(`/notes/${id}`)} />
                </div>
              </div>
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

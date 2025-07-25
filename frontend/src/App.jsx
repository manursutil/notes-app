import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./reducers/userReducer";
import { setNotes } from "./reducers/noteReducer";

import notesService from "./services/notes";
import usersService from "./services/users";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNotesUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      notesService.setToken(user.token);
      usersService.setToken(user.token);
      notesService.getAll().then((notes) => dispatch(setNotes(notes)));
    }
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedNotesUser", JSON.stringify(user));
      notesService.setToken(user.token);
      usersService.setToken(user.token);

      const notes = await notesService.getAll();
      dispatch(setNotes(notes));
    } catch (error) {
      console.log("Error Login in:", error);
    }
  };

  if (user === null) {
    return (
      <div>
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((blog) => {
        return (
          <p>{blog.title}</p>
        );
      })}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import notesService from "../notes/notesService";
import loginService from "./loginService";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedNotesUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      notesService.setToken(parsedUser.token);
    }
  }, []);

  const login = async ({ username, password }) => {
    try {
      const userData = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNotesUser", JSON.stringify(userData));
      notesService.setToken(userData.token);
      setUser(userData);
    } catch (error) {
      console.error("login failed:", error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNotesUser");
    setUser(null);
  };

  return { user, login, logout };
};

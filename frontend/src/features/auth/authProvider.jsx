import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initial aus localStorage laden (so bleibt Login nach Refresh erhalten)
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(() => localStorage.getItem("username") || null);

  useEffect(() => {
    // Sync zwischen Tabs (optional)
    const onStorage = (e) => {
      if (e.key === "token") setToken(e.newValue);
      if (e.key === "username") setUsername(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = (newToken, user) => {
    localStorage.setItem("token", newToken);
    if (user) localStorage.setItem("username", user);
    setToken(newToken);
    if (user) setUsername(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    navigate("/"); // zurück zur Login-Seite
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

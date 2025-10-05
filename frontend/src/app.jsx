import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/navbar";
import System from "./features/system/systemPage";
import Container from "./features/containers/containerPage";
import Vm from "./features/vms/vm";
import Shares from "./features/shares/shares";
import Header from "./layout/header";
import PrivateRoute from "./features/auth/privateroute";
import Login from "./features/auth/login";
import { useAuth } from "./features/auth/authProvider";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pb-16 bg-gray-800 text-amber-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/system"
            element={
              <PrivateRoute>
                <System />
              </PrivateRoute>
            }
          />
          <Route
            path="/container"
            element={
              <PrivateRoute>
                <Container />
              </PrivateRoute>
            }
          />
          <Route
            path="/vm"
            element={
              <PrivateRoute>
                <Vm />
              </PrivateRoute>
            }
          />
          <Route
            path="/shares"
            element={
              <PrivateRoute>
                <Shares />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* Navbar nur, wenn eingeloggt */}
      {isAuthenticated && <Navbar />}
    </div>
  );
}

export default App;

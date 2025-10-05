import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://192.168.178.10:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.access_token, username);
      navigate("/system");
    } else {
      alert("Login fehlgeschlagen");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-6">
          Anmelden
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Dein Benutzername"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg shadow hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Kein Account?{" "}
          <span className="text-amber-400 cursor-pointer hover:underline">
            Registrieren
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

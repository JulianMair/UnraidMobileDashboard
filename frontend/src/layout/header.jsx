import React, { useState } from "react";
import { useAuth } from "../features/auth/authProvider";


function Header() {
  const [open, setOpen] = useState(false);
  const { username, logout } = useAuth();

  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <header className="relative flex items-center justify-between px-6 py-3 bg-gray-700 text-amber-50 shadow-md">
      <h1 className="text-xl font-bold">Unraid Mobile Dashboard</h1>

      {/* Avatar Button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-gray-900 font-bold hover:opacity-90 focus:outline-none"
        >
          {initial}
        </button>

        {/* Dropdown Menü */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-amber-50 rounded-lg shadow-lg border border-gray-600">
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                Profil
              </li>
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-red-600 cursor-pointer rounded-b-lg"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

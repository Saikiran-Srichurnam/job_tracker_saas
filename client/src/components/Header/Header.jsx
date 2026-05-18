import React from "react";
import { logoutUser } from "../../services/userApi.js";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";

function Header({ setViewProfile }) {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // handle logout btn
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };
  return (
    <header className="border-b border-white/20 backdrop-blur-md  bg-white/5 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 sm:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
            JobTrack Pro
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Premium Job Tracking SaaS
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-slate-900 rounded-lg font-medium hover:scale-105 duration-300"
            onClick={() => {
              setViewProfile(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Profile
          </button>

          <button
            className="px-4 py-2 border border-black/30 hover:bg-black/10 dark:border-white/30 rounded-lg dark:hover:bg-white/10 duration-300 hover:scale-105"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 border border-black/30 hover:bg-black/10 dark:border-white/30 rounded-lg dark:hover:bg-white/10 duration-300 hover:scale-105"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import { logoutUser } from "../../services/userApi.js";
import { useNavigate } from "react-router-dom";

function Header({ viewProfile, setViewProfile }) {
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
    <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">JobTrack Pro</h1>
          <p className="text-sm text-gray-300">Premium Job Tracking SaaS</p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium hover:scale-105 duration-300"
            onClick={() => {
              setViewProfile(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Profile
          </button>

          <button
            className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 duration-300"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

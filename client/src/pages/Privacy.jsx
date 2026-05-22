import React from "react";
import { useNavigate } from "react-router-dom";

function Privacy() {
  const navigate = useNavigate();
  const handleCloseBtn = () => {
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-screen dark:bg-gray-800 flex justify-center items-center text-gray-800 dark:text-white">
      <div className="max-w-4xl w-full mx-auto px-6 py-12 ">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          JobTrack Pro respects your privacy and is committed to protecting your
          personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          Information We Collect
        </h2>

        <p className="mb-4">
          We may collect account details, job application data, and usage
          information to improve your experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">How We Use Data</h2>

        <p className="mb-4">
          Your data is used only for managing your job tracking experience and
          improving platform features.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Data Security</h2>

        <p>
          We implement reasonable security measures to protect your personal
          information.
        </p>
        <div className="space-y-3 pt-6 border-t border-white/10">
          <button
            onClick={() => handleCloseBtn()}
            className="w-full bg-red-500/20 hover:bg-red-500/80 text-red-600 dark:text-white transition-all duration-300 py-3 rounded-xl font-medium hover:scale-[1.02]"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Privacy;

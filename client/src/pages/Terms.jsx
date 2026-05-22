import React from "react";
import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();
  const handleCloseBtn = () => {
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-screen dark:bg-gray-800 flex justify-center items-center text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

        <p className="mb-4">
          By using JobTrack Pro, you agree to follow these terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          User Responsibilities
        </h2>

        <p className="mb-4">
          Users are responsible for maintaining accurate information and
          securing their account credentials.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Acceptable Usage</h2>

        <p className="mb-4">
          You agree not to misuse the platform or attempt unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Changes to Terms</h2>

        <p>
          We may update these terms periodically. Continued use of the platform
          indicates acceptance of updated terms.
        </p>
        <div className="space-y-3 pt-6 border-t border-white/10">
          <button
            onClick={() => handleCloseBtn()}
            className="w-full bg-red-500/20 hover:bg-red-500/80 text-white transition-all duration-300 py-3 rounded-xl font-medium hover:scale-[1.02]"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Terms;

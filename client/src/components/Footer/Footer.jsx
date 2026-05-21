import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-3 text-gray-600 dark:text-gray-300">
        <p>© 2026 JobTrack Pro. Built for modern job seekers.</p>
        <div className="flex gap-5">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/support">Support</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

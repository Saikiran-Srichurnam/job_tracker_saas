import React, { useState } from "react";
import InputBox from "../components/InputBox.jsx";
import PasswordBox from "../components/PasswordBox.jsx";
import LoginButton from "../components/LoginButton.jsx";
import Register from "./Register.jsx";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm =(e) => {
    e.preventdefault()
  }
  return (
    <form className="w-80 border border-white/30 min-h-32 p-8 flex justify-center flex-col items-center gap-5" onSubmit={handleLoginForm}>
      <input
        type="email"
        placeholder="Enter your email"
        className="px-3 py-2 w-60 border-none outline-none bg-black rounded-sm shadow-2xl"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="px-3 py-2 w-60 border-none outline-none bg-black rounded-sm shadow-2xl"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {}
      <button className="px-3 py-2 w-60 border-none outline-none bg-white text-black text-lg font-medium rounded-sm shadow-2xl">
        LOGIN
      </button>
      {}
      <p className="text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-white/80">
          Register
        </Link>
      </p>
    </form>
  );
}

export default Login;

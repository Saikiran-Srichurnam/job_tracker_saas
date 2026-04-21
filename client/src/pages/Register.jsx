import React, { useState } from "react";
import Username from "../components/Username.jsx";
import InputBox from "../components/InputBox.jsx";
import PasswordBox from "../components/PasswordBox.jsx";
import LoginButton from "../components/LoginButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userApi.js";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        username,
        email,
        password,
      });

      console.log(res);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form
      className="w-80 border border-white/30 min-h-32 p-8 flex justify-center flex-col items-center gap-5"
      onSubmit={handleRegisterForm}
    >
      <input
        type="text"
        placeholder="Enter your Username"
        className="px-3 py-2 w-60 border-none outline-none bg-black rounded-sm shadow-2xl"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button className="px-3 py-2 w-60 border-none outline-none bg-white text-black text-lg font-medium rounded-sm shadow-2xl">
        Register
      </button>
      <p className="text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-white/80">
          Login
        </Link>
      </p>
    </form>
  );
}

export default Register;

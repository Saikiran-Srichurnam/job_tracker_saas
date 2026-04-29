import React, { useState } from "react";
import Register from "./Register.jsx";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/userApi.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email,
        password,
      });

      console.log(res);
      navigate("/register");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white/40 p-8 rounded-lg shadow-lg flex justify-center items-center h-screen duration-300">
      <div className="bg-black/80  p-10 rounded-md border-none">
        <form
          className="w-80 border border-white/40 min-h-32 p-8 flex justify-center flex-col items-center gap-5 text-white shadow-2xl"
          onSubmit={handleLoginForm}
        >
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
      </div>
    </div>
  );
}

export default Login;

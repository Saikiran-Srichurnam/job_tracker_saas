import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userApi.js";
import toast from "react-hot-toast";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Registration Failed");
    }
  };
  return (
    <div className="bg-white/40 p-8 rounded-lg shadow-lg flex justify-center items-center h-screen duration-300">
      <div className="bg-white dark:bg-black/80 p-6 sm:p-10 w-full max-w-md rounded-md border-none">
        <form
          className="w-full border border-black/20 min-h-32 p-8 flex justify-center flex-col items-center gap-5 text-black dark:text-white shadow-2xl rounded-lg"
          onSubmit={handleRegisterForm}
        >
          <input
            type="text"
            placeholder="Enter your Username"
            className="px-3 py-2 w-full border-none outline-none bg-black text-white rounded-sm shadow-2xl"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 w-full border-none outline-none bg-black text-white rounded-sm shadow-2xl"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="px-3 py-2 w-full border-none outline-none bg-black rounded-sm shadow-2xl"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="relative overflow-hidden px-3 py-2 w-full border border-black/10 outline-none bg-white text-black text-lg font-medium rounded-sm tracking-wider hover:shadow-md group">
            <span
              className="
                  absolute inset-0 bg-black/5 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
            ></span>
            <span className="relative z-10">REGISTER</span>
          </button>
          <p className="text-black/40 dark:text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black/80 dark:text-white/80">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

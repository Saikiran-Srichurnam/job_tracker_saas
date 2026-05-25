// 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/userApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { Eye, EyeOff, BriefcaseBusiness } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await loginUser({
        email,
        password,
      });

      await login();

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message || "Login Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-black transition-all duration-300">
      
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 bg-black text-white flex-col justify-center items-center p-16 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 opacity-95" />

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <BriefcaseBusiness size={40} />
            <h1 className="text-4xl font-bold tracking-wide">
              JobTracker
            </h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Welcome back.
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Continue managing your job applications, interviews,
            and offers from one powerful dashboard.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Track Applications Easily</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Secure Authentication System</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Analytics & Status Insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 justify-center items-center px-6 py-10">
        <div className="w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-zinc-800">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Login
            </h2>

            <p className="text-gray-500 mt-2">
              Access your JobTracker dashboard.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleLoginForm}
          >
            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* REGISTER LINK */}
            <p className="text-center text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-black dark:text-white font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
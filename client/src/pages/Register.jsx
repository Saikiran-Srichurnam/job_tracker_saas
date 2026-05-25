// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/userApi.js";
// import toast from "react-hot-toast";

// function Register() {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const navigate = useNavigate();

//   const handleRegisterForm = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await registerUser({
//         name,
//         email,
//         password,
//       });

//       console.log(res);
//       toast.success("Registration Successful");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.message || "Registration Failed");
//     }
//   };
//   return (
//     <div className="bg-white/40 p-8 rounded-lg shadow-lg flex justify-center items-center h-screen duration-300">
//       <div className="bg-white dark:bg-black/80 p-6 sm:p-10 w-full max-w-md rounded-md border-none">
//         <form
//           className="w-full border border-black/20 min-h-32 p-8 flex justify-center flex-col items-center gap-5 text-black dark:text-white shadow-2xl rounded-lg"
//           onSubmit={handleRegisterForm}
//         >
//           <input
//             type="text"
//             placeholder="Enter your Username"
//             className="px-3 py-2 w-full border-none outline-none bg-black text-white rounded-sm shadow-2xl"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-3 py-2 w-full border-none outline-none bg-black text-white rounded-sm shadow-2xl"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="px-3 py-2 w-full border-none outline-none bg-black text-white rounded-sm shadow-2xl"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="relative overflow-hidden px-3 py-2 w-full border border-black/10 outline-none bg-white text-black text-lg font-medium rounded-sm tracking-wider hover:shadow-md group">
//             <span
//               className="
//                   absolute inset-0 bg-black/5 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
//             ></span>
//             <span className="relative z-10">REGISTER</span>
//           </button>
//           <p className="text-black/40 dark:text-gray-500">
//             Already have an account?{" "}
//             <Link to="/login" className="text-black/80 dark:text-white/80">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userApi.js";
import toast from "react-hot-toast";
import { Eye, EyeOff, BriefcaseBusiness } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Registration Failed",
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
            Track your job applications smarter.
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Organize applications, monitor progress, and manage
            your career journey with a modern SaaS platform.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Secure JWT Authentication</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Analytics Dashboard</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Track Interviews & Offers</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 justify-center items-center px-6 py-10">
        <div className="w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-zinc-800">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Start managing your job applications efficiently.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleRegisterForm}
          >
            {/* NAME */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black dark:text-white font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
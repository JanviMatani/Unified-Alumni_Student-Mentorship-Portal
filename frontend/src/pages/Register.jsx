import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineAcademicCap } from "react-icons/hi";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://unified-alumni-student-mentorship-portal.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // alert("Registration successful! Please login.");
        navigate("/profile");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* LEFT SIDE - CLEAN BACKGROUND & QUOTE */}
      <div className="hidden md:flex w-1/2 bg-sky-600 relative overflow-hidden flex-col justify-center items-center text-white">
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold font-serif mb-4">Join the Network</h1>
          <p className="text-lg font-light max-w-md mx-auto leading-relaxed">
            "Your career journey starts here. Connect, mentor, and grow with your alumni community."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="w-full max-w-md space-y-6">
          
          <div className="text-center">
            <h2 className="text-4xl font-bold text-sky-600">Create Account</h2>
            <p className="text-gray-500 mt-2">Join your alumni mentorship network</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 mt-6">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            {/* Name Input */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-sky-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineUser size={20} />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1">College Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-sky-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="student@college.edu"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-sky-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineLockClosed size={20} />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1">I am a...</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-sky-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineAcademicCap size={20} />
                </div>
                <select
                  name="role"
                  className="w-full px-3 py-3 outline-none text-gray-700 bg-white"
                  onChange={handleChange}
                  value={form.role}
                >
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition duration-200 shadow-md hover:shadow-lg mt-4">
              REGISTER
            </button>
          </form>

          {/* Social Login & Footer */}
          <div className="text-center">
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <FcGoogle size={24} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-blue-600">
                <FaFacebookF size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-sky-600 font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        
        {/* Decorative Monument Bottom Right */}
        <div className="absolute bottom-0 right-0 w-full h-12 bg-sky-100 opacity-50 hidden lg:block pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Register;
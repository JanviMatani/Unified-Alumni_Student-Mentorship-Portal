import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role); // Store role for redirection
        navigate(data.role === "admin" ? "/admin-dashboard" : "/profile");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* LEFT SIDE - IMAGE & QUOTE */}
      <div className="hidden md:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-center items-center text-white">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-multiply"></div>
        
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold font-serif mb-4">Alumni Connect</h1>
          <p className="text-lg font-light max-w-md mx-auto leading-relaxed">
            "Connecting the past with the future. Empowering students through alumni wisdom."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center">
            <h2 className="text-4xl font-bold text-sky-600">Welcome</h2>
            <p className="text-gray-500 mt-2">Login with Email</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            {/* Email Input */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1">Email Id</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-sky-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="student@college.edu"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" class="text-xs text-gray-500 hover:text-sky-600">
                Forgot your password?
              </Link>
            </div>

            <button className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition duration-200 shadow-md hover:shadow-lg">
              LOGIN
            </button>
          </form>

          {/* Social Login & Footer */}
          <div className="text-center">
            <div className="relative flex py-5 items-center">
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
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-black">
                <FaApple size={24} />
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-sky-600 font-bold hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Monument Bottom Right (Simulated with simple shapes/CSS or SVG) */}
        <div className="absolute bottom-0 right-0 w-full h-12 bg-sky-100 opacity-50 clip-path-monuments hidden lg:block pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Login;
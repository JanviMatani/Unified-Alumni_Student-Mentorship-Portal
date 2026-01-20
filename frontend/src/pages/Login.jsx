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
    localStorage.clear();
    setError(""); 

    try {
      // 1. API Call to your Backend (which checks MongoDB)
      const res = await fetch("https://unified-alumni-student-mentorship-portal.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Token aur Role ko localStorage mein save karo (Session maintain karne ke liye)
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role); 

        // 3. ROLE-BASED NAVIGATION (MongoDB se aaye hue role ke hisab se)
        // Tune schema mein "student", "alumni", "admin" rakha hai
        if (data.role === "alumni") {
          navigate("/alumni-dashboard");
        } else if (data.role === "student") {
          navigate("/dashboard");
        } else if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          // Default case agar role match na kare
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed. Check credentials.");
      }
    } catch (err) {
      setError("Server error. Please make sure your backend is running.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      {/* LEFT SIDE - IMAGE & QUOTE */}
      <div className="hidden md:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-center items-center text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-multiply"></div>
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Alumni Connect</h1>
          <p className="text-lg font-light max-w-md mx-auto leading-relaxed">
            "Connecting the past with the future. Empowering students through alumni wisdom."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-black text-sky-600">Welcome</h2>
            <p className="text-gray-500 mt-2 font-medium tracking-wide">Login with Email</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm py-3 px-4 rounded-xl border border-red-100 text-center font-bold">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1 font-bold">Email Id</label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-sky-500 transition-all shadow-sm">
                <div className="pl-3 text-gray-400">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="student@college.edu"
                  className="w-full px-3 py-4 outline-none text-gray-700 bg-transparent font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="text-xs text-sky-600 absolute -top-2.5 left-3 bg-white px-1 font-bold">Password</label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-sky-500 transition-all shadow-sm">
                <div className="pl-3 text-gray-400">
                  <HiOutlineLockClosed size={20} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-4 outline-none text-gray-700 bg-transparent font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" title="Reset" className="text-xs font-bold text-gray-400 hover:text-sky-600 transition-colors uppercase tracking-tighter">
                Forgot password?
              </Link>
            </div>

            <button className="w-full bg-sky-500 text-white font-black py-4 rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 active:scale-95">
              LOGIN
            </button>
          </form>

          {/* Social Login & Footer */}
          <div className="text-center pt-4">
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <SocialButton icon={<FcGoogle size={24} />} />
              <SocialButton icon={<FaFacebookF size={20} className="text-blue-600" />} />
              <SocialButton icon={<FaApple size={24} className="text-black" />} />
            </div>

            <p className="text-sm text-gray-600 font-medium">
              Don’t have an account?{" "}
              <Link to="/register" className="text-sky-600 font-black hover:underline underline-offset-4 transition-all">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Social Buttons
const SocialButton = ({ icon }) => (
  <button className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-sky-200 hover:shadow-md transition-all active:scale-90">
    {icon}
  </button>
);

export default Login;
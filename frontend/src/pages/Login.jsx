import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
            <div className="bg-[#111827] p-8 rounded-xl border border-white/10 w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Alumni Login</h2>

                {error && <p className="text-red-400 bg-red-900/20 p-3 rounded mb-4 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-[#1F2937] border border-gray-700 p-3 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-[#1F2937] border border-gray-700 p-3 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded text-white font-bold transition-all shadow-lg shadow-blue-900/20">
                        Login
                    </button>
                </form>

                <p className="text-gray-500 text-center mt-6 text-sm">
                    Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

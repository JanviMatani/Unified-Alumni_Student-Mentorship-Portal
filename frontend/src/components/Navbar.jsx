import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-[#111827] border-b border-white/10 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Career Visualizer
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="bg-[#2563EB]/10 text-blue-400 border border-blue-500/50 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#2563EB]/20 transition-all">
                        Explore Paths
                    </Link>
                </div>
            </div>
        </nav>
    );
}

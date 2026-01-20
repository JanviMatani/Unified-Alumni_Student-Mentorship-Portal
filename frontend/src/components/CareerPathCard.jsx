import { useState } from "react";
import CareerPathModal from "./CareerPathModal";
import { ArrowRightLeft, Building2, User, Gauge } from "lucide-react";

export default function CareerPathCard({ path, isSelected, onToggleCompare, onEdit }) {
    const [open, setOpen] = useState(false);
    const role = localStorage.getItem("role");

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case 'Easy': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'Hard': return 'bg-red-500/20 text-red-300 border-red-500/30';
            default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        }
    }

    return (
        <>
            <div
                className={`relative bg-[#111827] p-5 border rounded-xl transition-all cursor-pointer group hover:shadow-2xl hover:-translate-y-1 ${isSelected ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-900/10' : 'border-white/10 hover:border-blue-500/50'}`}
                onClick={() => setOpen(true)}
            >
                {/* Compare Checkbox */}
                <div
                    className="absolute top-4 right-4 z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleCompare(path)}
                        className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700 cursor-pointer"
                    />
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3 pr-8">
                    <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getDifficultyColor(path.difficulty)}`}>
                        <Gauge size={12} /> {path.difficulty}
                    </span>
                    {path.isSwitchPath && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            <ArrowRightLeft size={12} /> Switch Friendly
                        </span>
                    )}
                </div>

                <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors pr-6">{path.title}</h3>

                {/* Visual Mini Timeline (Winning Flow) */}
                <div className="my-4 pl-1 border-l-2 border-gray-700 space-y-2 group-hover:border-cyan-500/50 transition-colors">
                    {path.stages.map((stage, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                            <span className="truncate">{stage.title}</span>
                        </div>
                    ))}
                </div>

                <p className="text-sm text-[#9CA3AF] flex items-center gap-2 border-t border-white/5 pt-3 mt-auto">
                    <span>⏱ {path.avgTime}</span>
                    <span className="text-gray-600">•</span>
                    <span>👥 {path.alumniCount} alumni</span>
                </p>

                {role === "alumni" && (
                    <button
                        className="w-full mt-2 py-1.5 text-sm font-medium bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded transition-all mb-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(path);
                        }}
                    >
                        ✏️ Edit Path
                    </button>
                )}

                <button
                    className="w-full mt-2 py-2 text-sm font-medium bg-[#1F2937] hover:bg-blue-600 text-cyan-400 hover:text-white rounded transition-all flex items-center justify-center gap-2 group-hover/btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                    }}
                >
                    View Full Roadmap →
                </button>
            </div>

            {open && <CareerPathModal path={path} close={() => setOpen(false)} />}
        </>
    );
}

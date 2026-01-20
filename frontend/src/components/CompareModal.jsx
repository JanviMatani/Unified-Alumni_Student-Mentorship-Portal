import { X, Gauge } from "lucide-react";

export default function CompareModal({ paths, close }) {
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#111827] w-full max-w-6xl rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111827] rounded-t-2xl">
                    <div>
                        <h3 className="text-2xl font-bold text-white">Compare Career Paths</h3>
                        <p className="text-sm text-gray-400">Comparing {paths.length} different journeys side-by-side</p>
                    </div>
                    <button onClick={close} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-x-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[800px]">
                        {paths.map(path => (
                            <div key={path._id} className="bg-[#1F2937]/50 rounded-xl border border-white/5 p-6 hover:border-cyan-500/30 transition-colors">
                                <h4 className="text-xl font-bold text-cyan-400 mb-2">{path.title}</h4>
                                <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-200 text-xs">{path.branch}</span>
                                    {path.isSwitchPath && <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-xs">Switch Path</span>}
                                </p>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Time</p>
                                            <p className="text-white font-medium text-lg">{path.avgTime}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Difficulty</p>
                                            <p className={`font-bold flex items-center gap-1 ${path.difficulty === 'Hard' ? 'text-red-400' :
                                                    path.difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                <Gauge size={14} /> {path.difficulty}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Environment</p>
                                        <p className="text-white font-medium">{path.companyType} - {path.entryLevel} Entry</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-3">Roadmap Breakdown</p>
                                        <ul className="space-y-4">
                                            {path.stages.map((s, i) => (
                                                <li key={i} className="relative pl-4 border-l-2 border-gray-700">
                                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500"></div>
                                                    <p className="text-sm font-semibold text-gray-200">{s.title}</p>
                                                    <p className="text-xs text-gray-500">{s.skills.length} core skills</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
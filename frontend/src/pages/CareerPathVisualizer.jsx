import { useState, useEffect } from "react";
import { fetchCareerPaths } from "../services/careerPathAPI";
import CareerPathCard from "../components/CareerPathCard";
import CompareModal from "../components/CompareModal";
import CareerPathForm from "../components/CareerPathForm"; // Import Form
import { Filter, X, Plus } from "lucide-react"; // Import Plus

export default function CareerPathVisualizer() {
    const [filters, setFilters] = useState({
        branch: "",
        entryLevel: "",
        companyType: ""
    });

    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(false);

    // Auth & Form State
    const role = localStorage.getItem("role");
    const [showForm, setShowForm] = useState(false);
    const [editingPath, setEditingPath] = useState(null);

    // Comparison State
    const [compareList, setCompareList] = useState([]);
    const [showCompareModal, setShowCompareModal] = useState(false);

    const visualize = async () => {
        setLoading(true);
        try {
            const data = await fetchCareerPaths(filters);
            setPaths(data);
        } catch (error) {
            console.error("Failed to fetch paths", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCompare = (path) => {
        setCompareList(prev => {
            const exists = prev.find(p => p._id === path._id);
            if (exists) {
                return prev.filter(p => p._id !== path._id);
            } else {
                if (prev.length >= 3) {
                    alert("You can compare up to 3 paths.");
                    return prev;
                }
                return [...prev, path];
            }
        });
    };

    // Handlers for Add/Edit
    const handleAddPath = () => {
        setEditingPath(null);
        setShowForm(true);
    };

    const handleEditPath = (path) => {
        setEditingPath(path);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingPath(null);
        visualize(); // Refresh list
    };

    // Clear compare list when branch changes
    useEffect(() => {
        setCompareList([]);
    }, [filters.branch]);

    return (
        <div className="min-h-screen bg-[#0B1220] p-6 text-[#E5E7EB] font-sans pb-32">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">CAREER PATH VISUALIZER</h2>
                        <p className="text-[#9CA3AF] mt-2 text-lg">
                            See real career journeys followed by alumni from your branch
                        </p>
                    </div>
                    {/* Alumni Add Button */}
                    {role === "alumni" && (
                        <button
                            onClick={handleAddPath}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all active:scale-95"
                        >
                            <Plus size={20} /> Add Path
                        </button>
                    )}
                </div>

                {/* Filters Section */}
                <div className="bg-[#111827] p-5 rounded-xl border border-white/5 shadow-lg mb-8 mt-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">

                        {/* Branch */}
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Branch</label>
                            <select
                                className="w-full bg-[#1F2937] border border-white/10 p-2.5 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                                value={filters.branch}
                            >
                                <option value="">All Branches</option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                            </select>
                        </div>

                        {/* Entry Level */}
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Starting Level</label>
                            <select
                                className="w-full bg-[#1F2937] border border-white/10 p-2.5 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={(e) => setFilters({ ...filters, entryLevel: e.target.value })}
                                value={filters.entryLevel}
                            >
                                <option value="">Any Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Average">Average</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Company Type */}
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Type</label>
                            <select
                                className="w-full bg-[#1F2937] border border-white/10 p-2.5 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={(e) => setFilters({ ...filters, companyType: e.target.value })}
                                value={filters.companyType}
                            >
                                <option value="">All Types</option>
                                <option value="Startup">Startup</option>
                                <option value="MNC">MNC</option>
                                <option value="Product-based">Product Based</option>
                            </select>
                        </div>

                        <button
                            onClick={visualize}
                            disabled={loading}
                            className="w-full md:w-auto bg-[#2563EB] px-8 py-2.5 rounded text-white font-medium hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors shadow-lg shadow-blue-900/20"
                        >
                            {loading ? "Searching..." : "Visualize Paths →"}
                        </button>
                    </div>
                </div>

                {/* Result Summary Bar */}
                {paths.length > 0 && (
                    <div className="mb-8 p-4 bg-gradient-to-r from-blue-900/40 to-cyan-900/20 rounded-lg border-l-4 border-blue-500 flex flex-col sm:flex-row items-center justify-between animate-fade-in gap-2">
                        <div className="text-gray-300">
                            Showing <span className="text-white font-bold text-lg mx-1">{paths.length}</span> career paths
                            {filters.branch && <> for <span className="text-white font-semibold">{filters.branch}</span></>}
                            {filters.entryLevel && <> • <span className="text-white font-semibold">{filters.entryLevel}</span></>}
                            {filters.companyType && <> • <span className="text-white font-semibold">{filters.companyType}</span></>}
                        </div>
                        <div className="text-sm text-gray-500 italic">
                            Select paths to compare differences
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paths.map((path) => (
                        <CareerPathCard
                            key={path._id}
                            path={path}
                            isSelected={compareList.some(p => p._id === path._id)}
                            onToggleCompare={toggleCompare}
                            onEdit={handleEditPath}
                        />
                    ))}
                </div>

                {paths.length === 0 && !loading && (
                    <div className="text-center text-gray-500 mt-20 py-10 bg-[#111827]/30 rounded-lg dashed-border border-2 border-dashed border-gray-800">
                        <Filter className="mx-auto mb-3 opacity-50" size={40} />
                        <p>
                            {filters.branch || filters.entryLevel || filters.companyType
                                ? "No paths found for these filters. Try broader criteria."
                                : "Select filters and click visualize to see results."
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Sticky Comparison Bar */}
            {compareList.length > 0 && (
                <div className="fixed bottom-6 left-0 right-0 mx-auto w-full max-w-3xl bg-[#111827] border border-blue-500/30 shadow-2xl rounded-2xl p-4 flex items-center justify-between z-40 animate-slide-up backdrop-blur-lg ring-1 ring-white/10">
                    <div className="flex items-center gap-5 pl-2">
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-sm uppercase tracking-wider text-blue-400">Comparing</span>
                            <span className="text-xs text-gray-400">{compareList.length} of 3 selected</span>
                        </div>
                        <div className="flex -space-x-3">
                            {compareList.map(p => (
                                <div key={p._id} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white border-2 border-[#111827] shadow-lg" title={p.title}>
                                    {p.title.charAt(0)}
                                </div>
                            ))}
                            {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#111827] border-dashed flex items-center justify-center">
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCompareList([])}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                        >
                            Clear
                        </button>
                        <button
                            onClick={() => setShowCompareModal(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                        >
                            Compare Now →
                        </button>
                    </div>
                </div>
            )}

            {/* Compare Modal */}
            {showCompareModal && (
                <CompareModal
                    paths={compareList}
                    close={() => setShowCompareModal(false)}
                />
            )}

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-md z-50 p-4">
                    <div className="w-full max-w-2xl">
                        <CareerPathForm
                            initialData={editingPath}
                            onSuccess={handleFormSuccess}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

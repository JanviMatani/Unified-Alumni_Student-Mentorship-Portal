import { useState, useEffect } from "react";
import { Plus, Trash, Save, X } from "lucide-react";
import { createPath, updatePath } from "../services/careerPathAPI";

export default function CareerPathForm({ initialData = null, onSuccess, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        branch: "CSE",
        entryLevel: "Average",
        companyType: "Product-based",
        difficulty: "Medium",
        avgTime: "",
        isSwitchPath: false,
        switchFrom: "",
        stages: [
            { title: "", year: "", skills: [{ name: "", weight: 5 }] }
        ]
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Stage Management
    const addStage = () => {
        setFormData(prev => ({
            ...prev,
            stages: [...prev.stages, { title: "", year: "", skills: [{ name: "", weight: 5 }] }]
        }));
    };

    const removeStage = (index) => {
        setFormData(prev => ({
            ...prev,
            stages: prev.stages.filter((_, i) => i !== index)
        }));
    };

    const handleStageChange = (index, field, value) => {
        const newStages = [...formData.stages];
        newStages[index][field] = value;
        setFormData({ ...formData, stages: newStages });
    };

    // Skill Management within State
    const addSkill = (stageIndex) => {
        const newStages = [...formData.stages];
        newStages[stageIndex].skills.push({ name: "", weight: 5 });
        setFormData({ ...formData, stages: newStages });
    };

    const removeSkill = (stageIndex, skillIndex) => {
        const newStages = [...formData.stages];
        newStages[stageIndex].skills = newStages[stageIndex].skills.filter((_, i) => i !== skillIndex);
        setFormData({ ...formData, stages: newStages });
    };

    const handleSkillChange = (stageIndex, skillIndex, field, value) => {
        const newStages = [...formData.stages];
        newStages[stageIndex].skills[skillIndex][field] = value;
        setFormData({ ...formData, stages: newStages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = JSON.parse(localStorage.getItem("user")).token;
            if (initialData && initialData._id) {
                await updatePath(token, initialData._id, formData);
            } else {
                await createPath(token, formData);
            }
            onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#1F2937] p-6 rounded-xl border border-white/10 animate-fade-in max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    {initialData ? "Edit Career Path" : "Create New Career Path"}
                </h2>
                <button onClick={onCancel} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>

            {error && <div className="bg-red-900/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Path Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#111827] border border-gray-700 p-2 rounded text-white" placeholder="e.g. Senior Backend Engineer" required />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Avg Time to Reach</label>
                        <input name="avgTime" value={formData.avgTime} onChange={handleChange} className="w-full bg-[#111827] border border-gray-700 p-2 rounded text-white" placeholder="e.g. 3-4 Years" required />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Branch</label>
                        <select name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-[#111827] border border-gray-700 p-2 rounded text-white">
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Entry Level</label>
                        <select name="entryLevel" value={formData.entryLevel} onChange={handleChange} className="w-full bg-[#111827] border border-gray-700 p-2 rounded text-white">
                            <option value="Beginner">Beginner</option>
                            <option value="Average">Average</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Company Type</label>
                        <select name="companyType" value={formData.companyType} onChange={handleChange} className="w-full bg-[#111827] border border-gray-700 p-2 rounded text-white">
                            <option value="Startup">Startup</option>
                            <option value="MNC">MNC</option>
                            <option value="Product-based">Product Based</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Difficulty</label>
                        <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full bg-[#111827] border border-gray-700 p-2 rounded text-white">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* Switch Path Toggle */}
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="isSwitchPath" checked={formData.isSwitchPath} onChange={handleChange} id="switch" className="w-4 h-4" />
                    <label htmlFor="switch" className="text-gray-300 text-sm">Is this a Switch Path?</label>
                    {formData.isSwitchPath && (
                        <input name="switchFrom" value={formData.switchFrom} onChange={handleChange} className="ml-2 bg-[#111827] border border-gray-700 p-1 px-2 rounded text-white text-sm" placeholder="Switched from..." />
                    )}
                </div>

                {/* Stages Builder */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-400 text-xs uppercase font-bold">Career Stages (Roadmap)</label>
                        <button type="button" onClick={addStage} className="text-blue-400 text-xs hover:text-white flex items-center gap-1">+ Add Stage</button>
                    </div>

                    <div className="space-y-4">
                        {formData.stages.map((stage, sIndex) => (
                            <div key={sIndex} className="bg-[#111827] p-4 rounded border border-gray-700 relative">
                                {formData.stages.length > 1 && (
                                    <button type="button" onClick={() => removeStage(sIndex)} className="absolute top-2 right-2 text-red-400 hover:text-red-300"><Trash size={16} /></button>
                                )}

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input
                                        value={stage.title}
                                        onChange={(e) => handleStageChange(sIndex, "title", e.target.value)}
                                        className="bg-[#1F2937] p-2 rounded text-white text-sm border border-gray-600"
                                        placeholder="Stage Title (e.g. Intern)"
                                        required
                                    />
                                    <input
                                        value={stage.year}
                                        onChange={(e) => handleStageChange(sIndex, "year", e.target.value)}
                                        className="bg-[#1F2937] p-2 rounded text-white text-sm border border-gray-600"
                                        placeholder="Timeline (e.g. Year 1)"
                                        required
                                    />
                                </div>

                                {/* Skills for Stage */}
                                <div className="pl-2 border-l-2 border-gray-600">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-gray-500">Top Skills</span>
                                        <button type="button" onClick={() => addSkill(sIndex)} className="text-blue-400 text-[10px] hover:text-white">+ Add Skill</button>
                                    </div>
                                    {stage.skills.map((skill, kIndex) => (
                                        <div key={kIndex} className="flex gap-2 mb-1">
                                            <input
                                                value={skill.name}
                                                onChange={(e) => handleSkillChange(sIndex, kIndex, "name", e.target.value)}
                                                className="flex-1 bg-[#1F2937] p-1 px-2 rounded text-white text-xs border border-gray-600"
                                                placeholder="Skill Name"
                                            />
                                            <input
                                                type="number"
                                                min="1" max="10"
                                                value={skill.weight}
                                                onChange={(e) => handleSkillChange(sIndex, kIndex, "weight", e.target.value)}
                                                className="w-12 bg-[#1F2937] p-1 rounded text-white text-xs border border-gray-600"
                                                placeholder="1-10"
                                            />
                                            {stage.skills.length > 1 && (
                                                <button type="button" onClick={() => removeSkill(sIndex, kIndex)} className="text-red-400"><X size={14} /></button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2">
                    <Save size={20} /> {loading ? "Saving..." : (initialData ? "Update Career Path" : "Publish Career Path")}
                </button>
            </form>
        </div>
    );
}

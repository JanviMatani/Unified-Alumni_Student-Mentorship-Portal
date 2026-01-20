import { X, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function CareerPathModal({ path, close }) {
    // Store acquired topics as "SkillName:TopicName" strings
    const [acquiredTopics, setAcquiredTopics] = useState(() => {
        const saved = localStorage.getItem("myTopics");
        return saved ? JSON.parse(saved) : [];
    });

    // Expanded state for accordion-style skill details
    const [expandedSkill, setExpandedSkill] = useState(null);

    useEffect(() => {
        localStorage.setItem("myTopics", JSON.stringify(acquiredTopics));
    }, [acquiredTopics]);

    const toggleTopic = (skillName, topicName) => {
        const id = `${skillName}:${topicName}`;
        setAcquiredTopics(prev =>
            prev.includes(id)
                ? prev.filter(t => t !== id)
                : [...prev, id]
        );
    };

    // Calculate Readiness Score considering Topics
    const allSkills = path.stages.flatMap(s => s.skills);

    let totalPotentialScore = 0;
    let currentScore = 0;

    allSkills.forEach(skill => {
        const weight = skill.weight || 0;
        totalPotentialScore += weight; // Max score possible for this skill

        if (skill.topics && skill.topics.length > 0) {
            // If has topics, calculate % completed
            const completedTopics = skill.topics.filter(t => acquiredTopics.includes(`${skill.name}:${t}`)).length;
            const percentage = completedTopics / skill.topics.length;
            currentScore += (weight * percentage);
        } else {
            // Fallback for legacy data without topics (treat whole skill as one topic)
            const isAcquired = acquiredTopics.includes(`${skill.name}:Whole`);
            currentScore += isAcquired ? weight : 0;
        }
    });

    const readiness = Math.round(totalPotentialScore > 0 ? (currentScore / totalPotentialScore) * 100 : 0);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-md z-50 p-4 animate-fade-in">
            <div className="bg-[#111827] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#111827] z-10 rounded-t-2xl">
                    <div>
                        <h3 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                            {path.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-400">⏱ {path.avgTime}</span>
                        </div>
                    </div>
                    <button onClick={close} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Readiness Score Bar */}
                <div className="bg-blue-900/20 px-6 py-3 border-b border-blue-500/20">
                    <div className="flex justify-between items-center mb-1 text-sm font-medium text-blue-300">
                        <span>🚀 Role Readiness</span>
                        <span>{readiness}% Ready</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                            style={{ width: `${readiness}%` }}
                        />
                    </div>
                    <p className="text-xs text-blue-400/70 mt-1 text-center">Click topics inside skills to boost your score!</p>
                </div>

                {/* Timeline Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="relative border-l-2 border-blue-500/30 ml-3 space-y-10 pb-2">
                        {path.stages.map((stage, i) => {
                            const isLast = i === path.stages.length - 1;

                            return (
                                <div key={i} className="relative pl-8 group">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-1 w-5 h-5 rounded-full border-4 border-[#111827] ${isLast ? "bg-green-500" : "bg-blue-500"} shadow-[0_0_10px_rgba(59,130,246,0.5)]`}>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-[#1F2937]/50 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all hover:bg-[#1F2937] hover:shadow-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className={`font-bold text-lg ${isLast ? "text-green-400" : "text-blue-400"}`}>
                                                    {stage.title}
                                                </h4>
                                                {stage.salary && (
                                                    <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded mt-1 inline-block border border-yellow-400/20">
                                                        💰 {stage.salary}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded">
                                                {stage.year}
                                            </span>
                                        </div>

                                        {/* Interactive Skills with Topics */}
                                        <div className="space-y-4 mt-4">
                                            {stage.skills.map((skill, idx) => {
                                                const hasTopics = skill.topics && skill.topics.length > 0;

                                                // Calculate progress for this single skill
                                                const completedCount = hasTopics
                                                    ? skill.topics.filter(t => acquiredTopics.includes(`${skill.name}:${t}`)).length
                                                    : (acquiredTopics.includes(`${skill.name}:Whole`) ? 1 : 0);

                                                const totalCount = hasTopics ? skill.topics.length : 1;
                                                const progressPercent = (completedCount / totalCount) * 100;

                                                const isExpanded = expandedSkill === skill.name;

                                                return (
                                                    <div key={idx} className="rounded-lg border border-white/5 bg-black/20 overflow-hidden">
                                                        {/* Skill Header */}
                                                        <div
                                                            onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                                                            className="p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                                                        >
                                                            <div className="flex-1">
                                                                <div className="flex justify-between items-center text-sm mb-1">
                                                                    <span className="text-gray-200 font-medium flex items-center gap-2">
                                                                        {skill.name}
                                                                        {progressPercent === 100 && <CheckCircle size={14} className="text-green-400" />}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {completedCount}/{totalCount}
                                                                    </span>
                                                                </div>
                                                                {/* Mini Progress Bar */}
                                                                <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full transition-all duration-500 ${progressPercent === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                                        style={{ width: `${progressPercent}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="ml-3 text-gray-400">
                                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                            </div>
                                                        </div>

                                                        {/* Expandable Topics Area */}
                                                        {isExpanded && (
                                                            <div className="px-3 pb-3 bg-black/40 border-t border-white/5 space-y-2 animate-fade-in pt-2">
                                                                {hasTopics ? (
                                                                    skill.topics.map((topic, tIdx) => {
                                                                        const isChecked = acquiredTopics.includes(`${skill.name}:${topic}`);
                                                                        return (
                                                                            <div
                                                                                key={tIdx}
                                                                                onClick={() => toggleTopic(skill.name, topic)}
                                                                                className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer group"
                                                                            >
                                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? "bg-blue-500 border-blue-500" : "border-gray-600 group-hover:border-blue-400"}`}>
                                                                                    {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-sm" />}
                                                                                </div>
                                                                                <span className={`text-sm ${isChecked ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300"}`}>
                                                                                    {topic}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    })
                                                                ) : (
                                                                    <div
                                                                        onClick={() => toggleTopic(skill.name, "Whole")}
                                                                        className="text-xs text-gray-400 italic p-2 hover:text-white cursor-pointer"
                                                                    >
                                                                        Click to mark complete skill as acquired.
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer actions */}
                <div className="p-4 border-t border-white/10 bg-[#111827] rounded-b-2xl">
                    <button onClick={close} className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]">
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}
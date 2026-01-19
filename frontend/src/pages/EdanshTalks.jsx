import React, { useState } from "react";
import { Mic, History, BookOpen, Star, PlayCircle, Clock, ChevronLeft, X, Youtube, Share2, Calendar, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EdanshTalks() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedSummary, setSelectedSummary] = useState(null);
  const navigate = useNavigate();

  const tabs = [
    { id: "upcoming", label: "Upcoming Talks", icon: <Clock size={18} /> },
    { id: "previous", label: "Previous Talks", icon: <History size={18} /> },
    { id: "famous", label: "Famous Tech Talks", icon: <Star size={18} /> },
    { id: "summaries", label: "Summaries", icon: <BookOpen size={18} /> },
  ];

  const summaries = [
    { 
      id: 271, 
      title: "AI vs Web3 - The Future of Internet", 
      date: "Jan 18, 2026", 
      content: "In this talk, alumni discussed how AI is centralizing power while Web3 aims to decentralize it. Key takeaways include the rise of AI agents and the role of blockchain in verifying authentic human content in an AI-driven world...",
      author: "Sneha Kapoor (SDE @Meta)"
    },
    { 
      id: 270, 
      title: "Cracking HFT Interviews", 
      date: "Jan 10, 2026", 
      content: "High-Frequency Trading firms look for extreme proficiency in C++ and Low-latency systems. Focus on memory management, networking protocols (UDP), and advanced data structures...",
      author: "Rahul Varma (Quant @Tower Research)"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8 relative selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 mb-8 hover:text-blue-400 transition font-medium group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-500/20">
            Exclusive Community Content
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            EDANSH TALKS
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">Knowledge exchange between our brightest alumni and ambitious students.</p>
        </div>

        {/* Navbar */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/40 p-1.5 rounded-2xl flex flex-wrap justify-center gap-2 border border-slate-700/50 backdrop-blur-md shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105" 
                  : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="min-h-[400px]">
          
          {/* 1. UPCOMING TALKS */}
          {activeTab === "upcoming" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div> Live & Upcoming
                </h2>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95">
                  Propose a Talk +
                </button>
              </div>
              <div className="grid gap-6">
                <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-700/50 flex flex-col md:flex-row items-center justify-between group hover:bg-slate-800/50 transition-all border-dashed">
                  <div className="flex gap-6 items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center font-black text-3xl shadow-2xl">HM</div>
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors tracking-tight">Building Scalable Systems</h3>
                      <p className="text-slate-400 flex items-center gap-2 mt-1 italic">
                        By Harsh Madhani • <Calendar size={14}/> Jan 24, 8:00 PM IST
                      </p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto bg-white text-[#0F172A] px-10 py-4 rounded-2xl font-black hover:bg-blue-500 hover:text-white transition-all shadow-xl uppercase tracking-tighter">
                    SET REMINDER
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. PREVIOUS TALKS (YouTube Style) */}
          {activeTab === "previous" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {[1, 2, 3].map((talk) => (
                <div key={talk} className="group cursor-pointer">
                  <div className="relative aspect-video bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 mb-4 shadow-lg group-hover:border-blue-500/50 transition-all">
                    <img 
                      src={`https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                      alt="talk" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <PlayCircle size={32} fill="white" />
                       </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">14:20</div>
                  </div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors tracking-tight">"How I transitioned from Web2 to AI Research"</h3>
                  <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
                    <span>Shweta Pathak</span> • <span>1.2k views</span> • <span>2 days ago</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. FAMOUS TECH TALKS (Theatre Style) */}
          {activeTab === "famous" && (
            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
              <div>
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 tracking-widest text-blue-400 uppercase">
                  <Zap size={20} className="fill-blue-400" /> The AI Revolution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Generative AI Future", speaker: "Sam Altman", platform: "OpenAI", takeaways: ["LLM Power", "AI Agents", "Ethics"] },
                    { title: "Building a Brain", speaker: "Andrej Karpathy", platform: "Tesla", takeaways: ["Neural Nets", "Vision AI", "Automation"] },
                    { title: "Conscious AI", speaker: "Demis Hassabis", platform: "DeepMind", takeaways: ["AGI Path", "Bio-Tech", "Compute"] }
                  ].map((talk, i) => (
                    <div key={i} className="group relative bg-slate-800/20 rounded-[2.5rem] overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all hover:-translate-y-2">
                      <div className="aspect-video bg-slate-900 relative">
                         <img src={`https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`} className="w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity" alt="talk" />
                         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/10 backdrop-blur-sm">
                            <p className="text-xs font-black uppercase tracking-widest mb-4 text-blue-400 underline underline-offset-4">Key Insights</p>
                            <ul className="space-y-2 text-center">
                              {talk.takeaways.map((t, idx) => (
                                <li key={idx} className="text-xs font-bold text-white flex items-center gap-2 justify-center italic">
                                  <Star size={10} className="fill-white"/> {t}
                                </li>
                              ))}
                            </ul>
                         </div>
                         <div className="absolute bottom-3 left-3 bg-blue-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                           {talk.platform}
                         </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-base leading-tight group-hover:text-blue-400 transition-colors tracking-tight">{talk.title}</h4>
                        <p className="text-slate-500 text-[11px] mt-2 font-medium italic">Speaker: {talk.speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Startup Horizontal Scroll Row */}
              <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-10 rounded-[3rem] border border-blue-500/10">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3 tracking-widest text-purple-400 uppercase">
                  <Star size={20} className="fill-purple-400" /> Iconic Startup Stories
                </h3>
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                  {[
                    { title: "Airbnb's First Pitch", year: "2008", color: "text-red-400" },
                    { title: "Steve Jobs: iPhone", year: "2007", color: "text-blue-400" },
                    { title: "The Uber Vision", year: "2010", color: "text-green-400" },
                    { title: "Netflix Evolution", year: "2012", color: "text-orange-400" }
                  ].map((item, i) => (
                    <div key={i} className="min-w-[280px] bg-slate-900/80 p-8 rounded-[2.5rem] border border-slate-700/50 flex flex-col justify-between hover:bg-slate-800 transition-all cursor-pointer group hover:border-purple-500/50">
                      <Youtube size={32} className="text-red-500 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className={`text-[10px] font-black mb-1 uppercase tracking-widest ${item.color}`}>{item.year} REWIND</p>
                        <h4 className="font-black text-xl italic tracking-tighter leading-none">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. SUMMARIES */}
          {activeTab === "summaries" && (
            <div className="grid gap-4 animate-in fade-in duration-500">
              {summaries.map((summary) => (
                <div key={summary.id} className="p-6 bg-slate-800/20 border border-slate-700/50 rounded-[2.5rem] hover:bg-slate-800/40 transition-all flex justify-between items-center group">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">#{summary.id} Summary</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-500 text-xs">{summary.date}</span>
                    </div>
                    <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors tracking-tight">{summary.title}</h3>
                  </div>
                  <button onClick={() => setSelectedSummary(summary)} className="flex items-center gap-2 text-blue-400 font-bold text-sm hover:underline p-2 group">
                    Read Full <BookOpen size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* --- SUMMARY MODAL --- */}
      {selectedSummary && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-2xl rounded-[3.5rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedSummary(null)} className="absolute top-8 right-8 p-3 bg-slate-800 rounded-full hover:bg-red-500 transition-colors z-10"><X size={20} /></button>
            <div className="p-12">
              <div className="flex items-center gap-3 mb-6 text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                <BookOpen size={16} /> Talk Summary #{selectedSummary.id}
              </div>
              <h2 className="text-4xl font-black mb-4 leading-[0.9] tracking-tighter italic">{selectedSummary.title}</h2>
              <p className="text-slate-500 text-sm mb-10 flex items-center gap-2">Presented by <span className="text-slate-200 font-bold underline decoration-blue-500 decoration-2 underline-offset-4">{selectedSummary.author}</span></p>
              <div className="bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-700 text-slate-300 leading-relaxed italic text-lg shadow-inner">"{selectedSummary.content}"</div>
              <div className="mt-10 flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-5 rounded-3xl font-black uppercase tracking-tighter hover:bg-blue-700 transition shadow-xl shadow-blue-600/20">Watch Recording</button>
                <button className="p-5 bg-slate-800 rounded-3xl hover:bg-slate-700 transition shadow-xl"><Share2 size={24} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
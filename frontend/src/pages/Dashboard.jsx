import React from 'react';
// Maine Mic icon add kiya hai Talks ke liye
import { LayoutDashboard, Users, Calendar, MessageSquare, Bell, ChevronRight, PlayCircle, FileText, Search, Mic, Zap } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse font-semibold text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-bold">Please login to continue</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* --- 1. SIDEBAR (Modified with Edansh Talks) --- */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white font-bold shadow-lg shadow-blue-100">ED</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">EDANSH</h1>
        </div>
        
        <div className="flex flex-col items-center mb-10 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <img src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`} className="w-16 h-16 rounded-full border-2 border-white shadow-sm mb-2" alt="profile" />
          <h3 className="font-bold text-sm text-slate-800">{user.name}</h3>
          <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{user.role}</p>
        </div>

        <nav className="space-y-1 flex-1">
          <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </Link>
          
          <Link to="/explore-mentors" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/explore-mentors' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Users size={18} /> <span>Mentors</span>
          </Link>

          {/* NEW: Edansh Talks Sidebar Option */}
          <Link to="/edansh-talks" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/edansh-talks' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 group'}`}>
            <Mic size={18} className="group-hover:text-blue-600" /> 
            <span>Edansh Talks</span>
            <span className="ml-auto bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
          </Link>

          <Link to="/bookings" className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
            <Calendar size={18} /> <span>Schedule</span>
          </Link>

          <Link to="/messages" className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
            <MessageSquare size={18} /> <span>Messages</span>
          </Link>
        </nav>
      </div>

      {/* --- 2. MAIN CONTENT --- */}
      <div className="flex-1 ml-64 p-8">
        
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="w-full bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400 transition" placeholder="Search mentors or talks..." />
          </div>
          <div className="flex gap-4 items-center">
            <button className="bg-white p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"><Bell size={18}/></button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="w-9 h-9 rounded-full border border-slate-200" alt="avatar" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          <div className="col-span-8 space-y-6">
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex justify-between items-center overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Find your perfect Mentor</h2>
                <p className="text-blue-50 text-sm mb-6 opacity-90 font-medium">Unlock your potential with 1-on-1 alumni guidance.</p>
                <Link to="/explore-mentors" className="bg-white text-blue-700 px-8 py-3 rounded-2xl text-xs font-black hover:bg-blue-50 transition shadow-lg uppercase tracking-wider inline-block">
                  Explore Now
                </Link>
              </div>
              <div className="hidden md:block opacity-10 absolute -right-4 -bottom-4 transform rotate-12"><Users size={200} /></div>
            </div>

            {/* NEW: Community Highlights Widget (Edansh Talks Integration) */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={16} className="text-orange-500 fill-orange-500" /> Community Highlights
                  </h3>
                  <Link to="/edansh-talks" className="text-blue-600 text-xs font-bold hover:underline">View All Talks</Link>
               </div>
               <div className="flex gap-4">
                  <div className="flex-1 bg-slate-900 rounded-3xl p-5 text-white flex items-center gap-4 group cursor-pointer hover:scale-[1.02] transition-transform">
                     <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Mic size={20}/></div>
                     <div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Live Talk Today</p>
                        <p className="text-sm font-bold truncate">System Design with Harsh M.</p>
                     </div>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-3xl p-5 border border-blue-100 flex items-center gap-4 group cursor-pointer hover:scale-[1.02] transition-transform">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm"><FileText size={20}/></div>
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Summary</p>
                        <p className="text-sm font-bold text-slate-800">AI vs Web3 CatchUp</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Career Visualizer */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Your Career Journey</h3>
              <div className="flex justify-between items-center px-4 relative">
                <div className="text-center group cursor-pointer z-10">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-blue-100 transition-all">S</div>
                  <p className="font-bold text-xs">Student</p>
                </div>
                <div className="h-[2px] flex-1 bg-blue-100 mx-4 relative top-[-10px]"></div>
                <div className="text-center group cursor-pointer z-10">
                  <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-dashed border-slate-300 group-hover:border-blue-400 group-hover:text-blue-600 transition-all">Jr</div>
                  <p className="font-bold text-xs text-slate-400">Junior Dev</p>
                </div>
                <div className="h-[2px] flex-1 bg-slate-100 mx-4 relative top-[-10px]"></div>
                <div className="text-center group cursor-pointer opacity-40 z-10">
                  <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-slate-200">Sr</div>
                  <p className="font-bold text-xs text-slate-400">Senior Dev</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-blue-600/40"></div>
              <h3 className="font-bold mb-4 flex items-center gap-2 tracking-wide text-sm">
                <Zap size={16} className="text-blue-400 fill-blue-400" /> AI Career Guide
              </h3>
              <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">Personalized roadmap based on your current skills.</p>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-[11px] text-slate-300 hover:bg-white/10 cursor-pointer transition-all hover:translate-x-1">How to crack Microsoft?</div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-[11px] text-slate-300 hover:bg-white/10 cursor-pointer transition-all hover:translate-x-1">Prepare for UX interview...</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Top Resources</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition"><FileText size={18}/></div>
                  <span className="text-xs font-bold text-slate-700">Resume Guide 2026</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition">
                  <div className="bg-red-50 p-2.5 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition"><PlayCircle size={18}/></div>
                  <span className="text-xs font-bold text-slate-700">System Design Basics</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { LayoutDashboard, Users, Calendar, MessageSquare, Bell, ChevronRight, PlayCircle, FileText, Search } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'; // Import Link

export default function Dashboard() {
  const { user, loading } = useAuth();

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
      
      {/* --- 1. SIDEBAR (Left Side) --- */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white font-bold">ED</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">EDANSH</h1>
        </div>
        
        <div className="flex flex-col items-center mb-10 bg-slate-50 p-4 rounded-2xl">
          <img src="https://i.pravatar.cc/150?u=hardik" className="w-16 h-16 rounded-full border-2 border-white shadow-sm mb-2" alt="profile" />
          <h3 className="font-bold text-sm text-slate-800">{user.name}</h3>
          <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{user.role}</p>
        </div>

        <nav className="space-y-1 flex-1">
<<<<<<< HEAD
          <Link to="/dashboard" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl cursor-pointer font-semibold">
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
            <MessageSquare size={18} /> <span>Messages</span>
          </div>
          {/* Mentors link in sidebar */}
          <Link to="/explore-mentors" className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
=======
          <Link to="/dashboard"><div className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl cursor-pointer font-semibold">
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </div></Link>
          <Link to="/repositories"><div className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
            <MessageSquare size={18} /> <span>Messages</span>
          </div></Link>
          <div className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
>>>>>>> 333c824b892715b3c04b5846f62aa9d06a02b9b1
            <Users size={18} /> <span>Mentors</span>
          </Link>
          <Link to="/bookings">
            <div className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
              <Calendar size={18} /> <span>Schedule</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* --- 2. MAIN CONTENT (Right Side) --- */}
      <div className="flex-1 ml-64 p-8">
        
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="w-full bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400 transition" placeholder="Search mentors..." />
          </div>
          <div className="flex gap-4 items-center">
            <button className="bg-white p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"><Bell size={18}/></button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <img src="https://i.pravatar.cc/100" className="w-9 h-9 rounded-full border border-slate-200" alt="avatar" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          <div className="col-span-8 space-y-6">
            {/* Banner Section - Updated with Link */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 rounded-[2.5rem] text-white shadow-lg shadow-blue-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Find your perfect Mentor</h2>
                <p className="text-blue-50 text-sm mb-6 opacity-90">Unlock your potential with 1-on-1 guidance.</p>
                {/* Fixed Button to Link */}
                <Link 
                  to="/explore-mentors" 
                  className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-blue-50 transition shadow-md uppercase tracking-wider inline-block text-center"
                >
                  Explore Now
                </Link>
              </div>
              <div className="hidden md:block opacity-20"><Users size={120} /></div>
            </div>

            {/* Career Visualizer */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Career Path Visualizer</h3>
              <div className="flex justify-between items-center px-4">
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all">S</div>
                  <p className="font-bold text-xs">Student</p>
                </div>
                <div className="h-[2px] flex-1 bg-slate-100 mx-4"></div>
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-dashed border-slate-300 group-hover:border-blue-400 group-hover:text-blue-600 transition-all">Jr</div>
                  <p className="font-bold text-xs text-slate-400">Junior Dev</p>
                </div>
                <div className="h-[2px] flex-1 bg-slate-100 mx-4"></div>
                <div className="text-center group cursor-pointer opacity-40">
                  <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-slate-200">Sr</div>
                  <p className="font-bold text-xs text-slate-400">Senior Dev</p>
                </div>
              </div>
            </div>

            {/* Recommended Mentors - Updated "See All" */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Recommended Mentors</h3>
                <Link to="/explore-mentors" className="text-blue-600 text-xs font-bold hover:underline transition">See All</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Muskan Agarwal", role: "Product Designer @Google", match: "98" },
                  { name: "Karan Grover", role: "SDE-2 @Amazon", match: "92" }
                ].map((m, i) => (
                  <Link to="/explore-mentors" key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-12 h-12 rounded-2xl border border-slate-100" alt="mentor" />
                      <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-lg tracking-tighter">{m.match}% MATCH</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition">{m.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{m.role}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (AI & Resources) */}
          <div className="col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2 tracking-wide text-sm underline decoration-blue-500 decoration-2">✨ AI Career Guide</h3>
              <p className="text-[11px] text-slate-400 mb-6">Ask me anything about your career roadmap.</p>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-[11px] text-slate-300 hover:bg-white/10 cursor-pointer transition mb-2">How to crack Microsoft?</div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-[11px] text-slate-300 hover:bg-white/10 cursor-pointer transition">Prepare for UX interview...</div>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-widest">Top Resources</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition"><FileText size={18}/></div>
                  <span className="text-xs font-semibold text-slate-700">Resume Guide 2024</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="bg-red-50 p-2.5 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition"><PlayCircle size={18}/></div>
                  <span className="text-xs font-semibold text-slate-700">System Design Basics</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
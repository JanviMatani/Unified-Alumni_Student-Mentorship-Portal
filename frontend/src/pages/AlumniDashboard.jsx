import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, MessageSquare, Calendar, 
  FileText, Mic, Settings, Search, Bell, Plus, X, 
  ChevronRight, Upload, Zap, CheckCircle2, Trophy
} from 'lucide-react';

export default function AlumniDashboard() {
  const [showTalkModal, setShowTalkModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  // Mahek Matani ka data display karne ke liye
  const user = { name: "Mahek Matani", role: "Senior Software Engineer" };

  return (
    <div className="flex min-h-screen bg-[#F0F7FF] font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <div className="w-66 bg-[#0A192F] p-6 flex flex-col fixed h-full shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-500 p-2 rounded-xl text-white font-bold shadow-lg shadow-blue-500/30">ED</div>
          <h1 className="text-xl font-black tracking-widest text-white">EDANSH</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={19}/>} label="Dashboard" active />
          <NavItem icon={<Calendar size={19}/>} label="Appointments" />
          <NavItem icon={<MessageSquare size={19}/>} label="Messages" />
          <NavItem icon={<FileText size={19}/>} label="Resource Hub" />
          <NavItem icon={<Mic size={19}/>} label="My Talks" />
          <div className="pt-10 border-t border-white/5">
            <NavItem icon={<Settings size={19}/>} label="Settings" />
          </div>
        </nav>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 ml-64 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            <input className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Search for students..." />
          </div>
          <div className="flex gap-4 items-center">
            <button className="p-3 bg-white rounded-2xl text-slate-400 border border-slate-100 hover:text-blue-500 transition-all"><Bell size={20}/></button>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-5 rounded-2xl border border-slate-100 shadow-sm">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=0A192F&color=fff`} className="w-10 h-10 rounded-xl" alt="avatar" />
                <div>
                    <p className="text-xs font-black text-[#0A192F]">{user.name}</p>
                    <p className="text-[10px] font-bold text-blue-500 uppercase">Online</p>
                </div>
            </div>
          </div>
        </header>

        <h2 className="text-3xl font-black text-[#0A192F] mb-10">Alumni Dashboard</h2>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="col-span-8 grid grid-cols-2 gap-6">
            
            {/* 1. Incoming Requests */}
            <div className="bg-white p-8 rounded-[3rem] border border-blue-50 shadow-xl shadow-blue-900/5 flex flex-col justify-between border-t-8 border-t-blue-400">
                <div>
                 <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-4">Mentorship Requests</h3>
                 <div className="flex items-baseline gap-2 mb-6">
                     <span className="text-5xl font-black text-[#0A192F]">04</span>
                     <span className="text-xs font-bold text-slate-400 italic">Pending</span>
                 </div>
                 <div className="space-y-4">
                    <StudentCard name="Anjali S." topic="System Design" color="bg-blue-50" />
                    <StudentCard name="Rahul K." topic="Career Advice" color="bg-slate-50" />
                 </div>
                </div>
                <button className="w-full mt-8 py-4 bg-[#0A192F] text-white rounded-2xl font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20">VIEW APPOINTMENTS</button>
            </div>

            {/* 2. Share Knowledge */}
            <div className="bg-gradient-to-br from-[#112240] to-[#0A192F] p-8 rounded-[3rem] text-white shadow-2xl flex flex-col justify-between">
                <div>
                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-500/20"><Mic size={28}/></div>
                    <h3 className="text-2xl font-bold mb-2">Share Knowledge</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">Create a webinar or host a live talk for the student community.</p>
                </div>
                <button onClick={() => setShowTalkModal(true)} className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">SCHEDULE TALK</button>
            </div>

            {/* 3. Resource Hub */}
            <div className="bg-white p-8 rounded-[3rem] border border-emerald-50 shadow-xl shadow-blue-900/5 flex flex-col justify-between border-t-8 border-t-emerald-400">
                <div>
                    <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-widest mb-4">Resource Hub</h3>
                    <p className="text-sm text-slate-500 font-medium mb-8">Manage shared resumes and repositories for your mentees.</p>
                    <div className="p-5 bg-emerald-50 rounded-[2rem] flex items-center gap-4 mb-4 border border-emerald-100/50">
                        <FileText className="text-emerald-500" size={24}/>
                        <div className="flex-1">
                            <p className="text-xs font-black text-slate-800">Software_Eng_Resume.pdf</p>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase">Publicly Shared</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowResumeModal(true)} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/10">UPDATE REPOSITORY</button>
            </div>

            {/* 4. Profile Progress */}
            <div className="bg-white p-8 rounded-[3rem] border border-purple-50 shadow-xl shadow-blue-900/5 border-t-8 border-t-purple-400">
                <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-widest mb-4">Profile & Skills</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                    {["System Design", "React", "AWS", "AI/ML", "Leadership"].map(s => (
                        <span key={s} className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-[10px] font-black uppercase border border-purple-100">{s}</span>
                    ))}
                </div>
                <div className="p-5 bg-slate-900 rounded-2xl text-white">
                    <div className="flex justify-between text-[10px] font-bold mb-2">
                        <span>Profile Strength</span>
                        <span>85%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-400 h-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5">
                <h3 className="text-sm font-black text-[#0A192F] mb-6 flex items-center gap-2 italic uppercase tracking-wider">
                    <Zap size={18} className="text-yellow-500 fill-yellow-500"/> Recent Activity
                </h3>
                <div className="space-y-6">
                    <ActivityItem user="Anjali S." action="sent you a message" time="2m ago" />
                    <ActivityItem user="New Talk" action="'AI Future' is now live" time="1h ago" />
                    <ActivityItem user="Rahul K." action="booked a session" time="4h ago" />
                </div>
            </div>

            <div className="bg-[#0A192F] p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10"><Trophy size={120}/></div>
                <h3 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <Zap size={18} className="text-blue-400"/> Your Impact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-2xl font-black text-blue-400">12</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Sessions</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-2xl font-black text-emerald-400">03</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Referrals</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS (Simple conditional rendering) */}
      {showTalkModal && <TalkModal onClose={() => setShowTalkModal(false)} />}
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
    </div>
  );
}

// Sub-components
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-[1.2rem] cursor-pointer font-bold text-sm transition-all group ${
      active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}>
      <span className={active ? 'text-white' : 'text-blue-500 group-hover:text-blue-400'}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function StudentCard({ name, topic, color }) {
    return (
        <div className={`flex items-center justify-between p-4 ${color} rounded-2xl border border-black/5 group cursor-pointer hover:border-blue-400`}>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center font-black text-[10px] text-[#0A192F] uppercase">{name[0]}</div>
                <div>
                    <p className="text-xs font-black text-slate-800">{name}</p>
                    <p className="text-[10px] font-bold text-blue-500">{topic}</p>
                </div>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
        </div>
    );
}

function ActivityItem({ user, action, time }) {
    return (
        <div className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
            <div className="flex-1">
                <p className="text-xs text-slate-600 font-medium">
                    <span className="font-black text-[#0A192F]">{user}</span> {action}
                </p>
                <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase">{time}</p>
            </div>
        </div>
    );
}

function TalkModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative border border-blue-100">
                <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-red-500"><X size={24}/></button>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6"><Mic size={32}/></div>
                <h2 className="text-3xl font-black mb-2 text-[#0A192F]">Schedule Talk</h2>
                <div className="space-y-4 mt-8">
                    <input type="text" placeholder="Title of the talk" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none" />
                    <textarea placeholder="Description" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none h-32" />
                    <button className="w-full py-4 bg-[#0A192F] text-white font-black rounded-2xl shadow-xl">BROADCAST SESSION</button>
                </div>
            </div>
        </div>
    );
}

function ResumeModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-red-500"><X size={24}/></button>
                <h2 className="text-3xl font-black mb-10 text-blue-600">Resource Repository</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3">
                        <Upload size={40} className="text-slate-300" />
                        <span className="text-xs font-black text-slate-400 uppercase">Upload Resume</span>
                    </div>
                    <div className="p-8 border-2 border-blue-50 bg-blue-50/50 rounded-[2.5rem] flex flex-col items-center justify-center gap-3">
                        <FileText size={40} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-600 uppercase">Current_Template.pdf</span>
                    </div>
                </div>
                <button className="w-full mt-10 py-5 bg-[#0A192F] text-white font-black rounded-2xl">SAVE CHANGES</button>
            </div>
        </div>
    );
}
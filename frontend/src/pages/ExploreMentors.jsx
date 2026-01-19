import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, Star, GraduationCap, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExploreMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        // FIXED: Using 'Authorization: Bearer' to match your authMiddleware
        const res = await axios.get("http://localhost:5001/mentor/find-mentors", {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });

        console.log("Frontend debug - Response Data:", res.data);

        if (res.data.success && res.data.matchedMentors) {
          setMentors(res.data.matchedMentors);
        }
      } catch (err) {
        // 401 Error handles automatically here
        console.error("Error fetching mentors:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [navigate]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC]">
      <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
      <p className="text-slate-500 font-medium italic">Finding your best alumni matches...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={() => navigate("/dashboard")} 
          className="flex items-center gap-2 text-slate-500 mb-6 hover:text-blue-600 transition font-medium group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>

        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Smart Matches ✨</h1>
          <p className="text-slate-500 mt-2 text-lg">Alumni recommendations handpicked for your career path.</p>
        </header>

        {(!mentors || mentors.length === 0) ? (
          <div className="bg-white p-16 rounded-[3rem] text-center border border-dashed border-slate-200 shadow-sm">
             <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
               <AlertCircle size={40} />
             </div>
            <h3 className="text-2xl font-bold text-slate-800">No Mentors Found Yet</h3>
            <p className="text-slate-500 mt-3 max-w-md mx-auto text-base">
              We couldn't find an exact match for your current skills. Try updating your profile or checking back later as more alumni join!
            </p>
            <button 
              onClick={() => navigate("/profile")}
              className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Update My Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentors.map((item) => (
              <div key={item.mentor._id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute top-8 right-8 bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-xs font-black border border-green-100 flex items-center gap-1">
                   <CheckCircle size={14} /> {item.matchPercentage}% MATCH
                </div>

                <div className="flex gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-400 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-blue-100 transform group-hover:rotate-3 transition-transform">
                    {item.mentor.name?.charAt(0) || "M"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.mentor.name}</h2>
                    <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mt-1">
                      {item.mentor.profile?.currentRole || "Industry Expert"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <Star size={18} className="text-amber-400 fill-amber-400" /> 
                    <span className="font-semibold">{item.mentor.profile?.industry || "Professional"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <GraduationCap size={18} className="text-blue-500" /> 
                    <span className="font-semibold">Class of {item.mentor.profile?.graduationYear || "Alumni"}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Why you should connect:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.reasons?.map((reason, idx) => (
                      <span key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Your mentorship request has been sent to ${item.mentor.name}!`)} 
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 active:scale-95"
                >
                  Request 1-on-1 Mentorship
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
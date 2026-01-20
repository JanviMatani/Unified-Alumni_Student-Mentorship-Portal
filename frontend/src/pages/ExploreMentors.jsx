import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  ChevronLeft,
  Star,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Loader2,
  LayoutDashboard,
  Users,
  Search,
  Mic,
  Bell,
  Route,
  MessageSquare,
  Calendar as CalendarMenu
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // <-- useLocation add kiya

export default function ExploreMentors() {
  // 1. loading ko rename kiya conflict bachane ke liye
  const { user, loading: authLoading } = useAuth(); 
  const location = useLocation(); // <-- location define kiya taaki sidebar chale
  const [mentors, setMentors] = useState([]);
  const [apiLoading, setApiLoading] = useState(true); // <-- iska naam badal diya
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  const handleRateMentor = async (mentorId, rating) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login first");

      setRatings((prev) => ({ ...prev, [mentorId]: rating }));

      await axios.post(
        "https://unified-alumni-student-mentorship-portal.onrender.com/api/mentors/rate",
        { mentorId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Rating submitted!");
    } catch (err) {
      console.error("Axios error:", err.response || err);
      if (err.response) {
        alert(`Failed to submit rating: ${err.response.data.message || err.response.status}`);
      } else {
        alert("Failed to submit rating: Network error");
      }
    }
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setApiLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setApiLoading(false);
          return;
        }

        const res = await axios.get(
          "https://unified-alumni-student-mentorship-portal.onrender.com/api/mentors/find-mentors",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.data.success && res.data.matchedMentors) {
          setMentors(res.data.matchedMentors);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/");
        }
      } finally {
        setApiLoading(false);
      }
    };

    fetchMentors();
  }, [navigate]);

  // 2. Auth Loading check
  if (authLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC]">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium italic">Verifying session...</p>
      </div>
    );
  }

  // 3. API Loading check
  if (apiLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC]">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium italic">
          Finding your best alumni matches...
        </p>
      </div>
    );

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-bold">Please login to continue</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white font-bold">
            ED
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            EDANSH
          </h1>
        </div>

        <div className="flex flex-col items-center mb-10 bg-slate-50 p-4 rounded-2xl">
          <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="w-16 h-16 rounded-full border-2 border-white shadow-sm mb-2" alt="profile" />
          <h3 className="font-bold text-sm text-slate-800">{user.name}</h3>
          <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">{user.role}</p>
        </div>

        <nav className="space-y-1 flex-1">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-xl transition ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/repositories"
            className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl"
          >
            <MessageSquare size={18} />
            <span>Messages</span>
          </Link>

          <Link to="/explore-mentors" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/explore-mentors' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Users size={18} /> <span>Mentors</span>
          </Link>

          <Link to="/edansh-talks" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/edansh-talks' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 group'}`}>
            <Mic size={18} className="group-hover:text-blue-600" />
            <span>Edansh Talks</span>
            <span className="ml-auto bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
          </Link>

          <Link
            to="/bookings"
            className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl"
          >
            <CalendarMenu size={18} />
            <span>Schedule</span>
          </Link>

          <Link to="/path" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-semibold">
            <Route size={18} /> <span>Path Visualizer</span>
          </Link>
        </nav>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="w-full bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400 transition" placeholder="Search mentors..." />
          </div>
          <div className="flex gap-4 items-center">
            <button className="bg-white p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"><Bell size={18}/></button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <img src={`https://ui-avatars.com/api/?name=${user.name}`} className="w-9 h-9 rounded-full border border-slate-200" alt="avatar" />
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
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
                  <div className="mt-4 flex items-center gap-2 mb-6">
                    <p className="text-sm font-semibold text-slate-600">Rate this mentor:</p>
                    <ReactStars
                      count={5}
                      value={ratings[item.mentor._id] || 0}
                      onChange={(newRating) => handleRateMentor(item.mentor._id, newRating)}
                      size={28}
                      isHalf={false}
                      edit={true}
                      char="★"
                      activeColor="#facc15"
                      color="#e5e7eb"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate("/bookings", { state: { mentorId: item.mentor._id, mentorName: item.mentor.name } })}
                      className="flex-1 bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 active:scale-95"
                    >
                      Request 1-on-1 Mentorship
                    </button>
                    <button
                      onClick={() => navigate(`/chat/${item.mentor._id}`, { state: { mentorName: item.mentor.name } })}
                      className="flex-1 bg-blue-50 text-blue-700 py-5 rounded-[1.5rem] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-md hover:shadow-blue-200 active:scale-95"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
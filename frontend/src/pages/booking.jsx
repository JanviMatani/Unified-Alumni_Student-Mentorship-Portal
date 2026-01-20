import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useAuth } from "../context/AuthContext";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Info,
  LayoutDashboard,
  Users,
  Route,
  Mic,
  MessageSquare,
  Calendar as CalendarMenu
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ScheduleAppointment() {

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


  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableMentors, setAvailableMentors] = useState([]);
  const userId = user._id;

  // 🔹 Fetch available mentors for a given date
  const fetchAvailableMentors = async (date) => {
    try {
      const token = localStorage.getItem("token");

const res = await fetch(
  `http://localhost:5001/api/mentors/available?date=${date.toISOString()}`,
  { headers: { Authorization: `Bearer ${token}` } }
);



      const data = await res.json();
      setAvailableMentors(data);
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5001/api/bookings/my/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => setBookings(data))
    .catch(err => console.error(err));
}, [userId]);


  useEffect(() => {
    fetchAvailableMentors(selectedDate);
  }, [selectedDate]);

  const handleBook = async (mentorId) => {
    const startTime = selectedDate;
    const endTime = new Date(selectedDate.getTime() + 60 * 60 * 1000);

    try {
      const token = localStorage.getItem("token");
console.log("TOKEN:", localStorage.getItem("token"));

const res = await fetch("http://localhost:5001/api/bookings/book", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mentorId, studentId: userId, startTime, endTime })
});

      const data = await res.json();
      if (res.ok) {
        alert("Slot booked!");
        setBookings(prev => [...prev, data.booking]);
        setAvailableMentors(prev => prev.filter(m => m._id !== mentorId));
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed due to network error");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">

      {/* ---------- SIDEBAR (COPIED FROM DASHBOARD) ---------- */}
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
          <Link to="/dashboard" className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl">
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </Link>

          <Link to="/repositories" className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl">
            <MessageSquare size={18} /> <span>Messages</span>
          </Link>

          <Link to="/explore-mentors" className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl">
            <Users size={18} /> <span>Mentors</span>
          </Link>

          {/* NEW: Edansh Talks Sidebar Option */}
                    <Link to="/edansh-talks" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/edansh-talks' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 group'}`}>
                      <Mic size={18} className="group-hover:text-blue-600" />
                      <span>Edansh Talks</span>
                      <span className="ml-auto bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                    </Link>

          {/* ACTIVE PAGE */}
          <Link to="/bookings" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-semibold">
            <CalendarMenu size={18} /> <span>Schedule</span>
          </Link>

          <Link to="/path" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-semibold">
            <Route size={18} /> <span>Path Visualizer</span>
          </Link>
        </nav>
      </div>

      {/* ---------- MAIN CONTENT (YOUR ORIGINAL CODE) ---------- */}
      <div className="flex-1 ml-64">
        <div className="min-h-screen bg-slate-50 text-slate-900">

          {/* --- Top Header Section --- */}
          <header className="bg-white border-b border-blue-100 py-8 px-8 mb-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                Mentor <span className="text-blue-600">Connect</span>
              </h1>
              <p className="text-slate-500 mt-2">
                Manage your sessions and find expert guidance.
              </p>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-8 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- Left Column: Calendar & Selection --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-50">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <CalendarIcon size={20} className="text-blue-600" />
                Select Date
              </h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="border-none w-full"
              />
            </div>
            <div className="bg-blue-600 p-6 rounded-3xl shadow-lg text-white">
              <h4 className="font-bold text-xl mb-2">Need Help?</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                Sessions are 60 minutes long. Make sure to check your timezone settings before booking.
              </p>
            </div>
          </div>

          {/* --- Right Column: Mentor List --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-slate-800">
                Available Mentors
                <span className="ml-3 text-sm font-normal text-slate-400">
                  {selectedDate.toDateString()}
                </span>
              </h3>
            </div>

            {availableMentors.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-blue-100 rounded-3xl p-12 text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="text-blue-400" />
                </div>
                <p className="text-slate-500 font-medium">No mentors available for this specific date.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableMentors.map(mentor => (
                  <div key={mentor._id} className="bg-white p-5 rounded-2xl border border-blue-50 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">
                          {mentor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{mentor.name}</p>
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Expert Mentor</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs font-medium bg-green-50 text-green-600 px-3 py-1 rounded-full">Available</span>
                      <button
                        onClick={() => handleBook(mentor._id)}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-xl font-bold text-sm transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Bottom Section: My Bookings --- */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-800">My Upcoming Sessions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.length === 0 && <p className="text-slate-400 col-span-full italic">No sessions booked yet.</p>}
            {bookings.map(b => (
              <div key={b._id} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                    <Clock size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase bg-blue-50 px-2 py-1 rounded">Confirmed</span>
                </div>
                <p className="text-lg font-bold text-slate-800 mb-1">{b.mentor.name}</p>
                <p className="text-sm text-slate-500 mb-4">
                  {new Date(b.startTime).toLocaleString("en-IN", { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            ))}
          </div>
        </section>
          </main>

        </div>
      </div>
    </div>
  );
}

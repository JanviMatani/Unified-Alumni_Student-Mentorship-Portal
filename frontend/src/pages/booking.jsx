import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalendarIcon, Clock, CheckCircle, Info } from "lucide-react";

export default function ScheduleAppointment() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableMentors, setAvailableMentors] = useState([]);
  const userId = "696d3bbf30ecce2424c540f5";

  // 🔹 Fetch available mentors for a given date
  const fetchAvailableMentors = async (date) => {
    try {
      const res = await fetch(`http://localhost:5001/api/mentors/available?date=${date.toISOString()}`);
      const data = await res.json();
      setAvailableMentors(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch user bookings
  useEffect(() => {
    fetch(`http://localhost:5001/api/bookings/my/${userId}`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Fetch available mentors whenever the date changes
  useEffect(() => {
    fetchAvailableMentors(selectedDate);
  }, [selectedDate]);

  // 🔹 Handle booking a mentor
  const handleBook = async (mentorId) => {
    const startTime = selectedDate;
    const endTime = new Date(selectedDate.getTime() + 60 * 60 * 1000);

    try {
      const res = await fetch("http://localhost:5001/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorId, studentId: userId, startTime, endTime })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Slot booked!");
        setBookings(prev => [...prev, data.booking]);

        // 🔹 Optimistic UI: remove booked mentor immediately
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* --- Top Header Section --- */}
      <header className="bg-white border-b border-blue-100 py-8 px-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            Mentor <span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-slate-500 mt-2">Manage your sessions and find expert guidance.</p>
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
  );
}

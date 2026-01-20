import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://unified-alumni-student-mentorship-portal.onrender.com/api/mentors/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.leaderboard);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Leaderboard fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-blue-600 font-bold tracking-widest animate-pulse uppercase text-sm">Curating Excellence...</div>
      </div>
    );
  }

  const topThree = data.slice(0, 3);
  const remainder = data.slice(3);

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
      {/* Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-200/30 blur-[100px] animate-bounce [animation-duration:10s]"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-blue-100/50 blur-[80px]"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-16 px-4">

        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-100/50 backdrop-blur-sm rounded-full border border-blue-200/50">
            Performance Metrics
          </span>
          <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Mentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Leaderboard</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
            Celebrating the top-rated mentors driving student success this month.
          </p>
        </div>

        {/* Podium Section */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-20">
          {topThree.map((mentor, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const order = isFirst ? "order-1 md:order-2" : isSecond ? "order-2 md:order-1" : "order-3 md:order-3";

            return (
              <div
                key={mentor._id}
                className={`flex flex-col items-center w-full md:w-1/3 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 group ${order} ${
                  isFirst
                  ? "bg-slate-900 text-white md:h-[380px] shadow-[0_30px_60px_-15px_rgba(30,41,59,0.4)] z-20 scale-105"
                  : "bg-white/70 backdrop-blur-md text-slate-800 md:h-[300px] shadow-xl border border-white/50 z-10"
                }`}
              >
                <div className="text-4xl mb-4 transform transition-transform group-hover:scale-125 duration-300">
                  {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
                </div>

                <h3 className="text-xl font-bold text-center mb-1 leading-tight">{mentor.name}</h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-6 ${isFirst ? "text-blue-400" : "text-slate-400"}`}>
                  {isFirst ? "Top Performer" : "Elite Mentor"}
                </p>

                <div className="mt-auto flex flex-col items-center">
                  <div className="text-5xl font-black tracking-tighter italic">
                    {mentor.avgRating.toFixed(1)}
                  </div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60`}>
                    Average Rating
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The List Container */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden border border-white/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pl-10 pr-6 py-8 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">Rank</th>
                  <th className="px-6 py-8 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">Mentor</th>
                  <th className="px-6 py-8 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-center">Rating</th>
                  <th className="pr-10 pl-6 py-8 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">Reviews</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {remainder.map((mentor, index) => (
                  <tr key={mentor._id} className="hover:bg-white/60 transition-all group">
                    <td className="pl-10 pr-6 py-6">
                      <span className="font-mono text-sm font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
                        {(index + 4).toString().padStart(2, '0')}
                      </span>
                    </td>
                    <td className="px-6 py-6 font-bold text-slate-800">
                      {mentor.name}
                      <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Verified Mentor</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-black text-xs border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        ★ {mentor.avgRating.toFixed(1)}
                      </div>
                    </td>
                    <td className="pr-10 pl-6 py-6 text-right font-bold text-slate-500 text-sm">
                      {mentor.totalRatings} <span className="font-normal opacity-50 ml-1">ratings</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <div className="text-center py-24 italic text-slate-400">
              Awaiting this month's results...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-30">
          <div className="h-px w-8 bg-slate-400"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Secure Leaderboard Data</p>
          <div className="h-px w-8 bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}
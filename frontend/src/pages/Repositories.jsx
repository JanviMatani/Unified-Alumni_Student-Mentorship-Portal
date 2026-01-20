import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Bell,
  FileText,
  Search,
  Mic,
  Route,
  Plus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Repositories() {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  /* ---------------- FETCH ALL POSTS ---------------- */
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:5001/repository", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, [token]);

  /* ---------------- CREATE POST (ALUMNI ONLY) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setSubmitting(true);

    const res = await fetch("http://localhost:5001/repository", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (res.ok) {
      setPosts(prev => [data.post, ...prev]);
      setTitle("");
      setContent("");
    } else {
      alert(data.message || "Failed to post");
    }

    setSubmitting(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white font-bold">
            ED
          </div>
          <h1 className="text-xl font-bold text-slate-800">EDANSH</h1>
        </div>

        <div className="flex flex-col items-center mb-10 bg-slate-50 p-4 rounded-2xl">
          <img
            src="https://i.pravatar.cc/150?u=hardik"
            className="w-16 h-16 rounded-full mb-2"
          />
          <h3 className="font-bold text-sm">{user.name}</h3>
          <p className="text-blue-600 text-[10px] font-bold uppercase">
            {user.role}
          </p>
        </div>

        <nav className="space-y-1 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-500">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/repositories" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-600 font-semibold">
            <FileText size={18} /> Repository
          </Link>
          <Link to="/explore-mentors"><div className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
                      <Users size={18} /> <span>Mentors</span>
            </div></Link>
            {/* NEW: Edansh Talks Sidebar Option */}
                      <Link to="/edansh-talks" className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-semibold transition ${location.pathname === '/edansh-talks' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 group'}`}>
                        <Mic size={18} className="group-hover:text-blue-600" /> 
                        <span>Edansh Talks</span>
                        <span className="ml-auto bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                      </Link>
          <Link to="/bookings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-500">
            <Calendar size={18} /> Schedule
          </Link>

          <Link to="/path" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-semibold">
            <div className="flex items-center gap-3 text-slate-500 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
                      <Route size={18} /> <span>Path Visualizer</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 ml-64 p-8">

        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              className="w-full bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm"
              placeholder="Search posts..."
            />
          </div>
          <button className="bg-white p-2 rounded-full border">
            <Bell size={18} />
          </button>
        </header>

        {/* ================= ALUMNI POST FORM ================= */}
        {user.role === "alumni" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">
              Share Knowledge
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="w-full border rounded-xl px-4 py-2 text-sm"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your advice or experience..."
                rows={4}
                className="w-full border rounded-xl px-4 py-2 text-sm resize-none"
              />
              <button
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2"
              >
                <Plus size={14} />
                {submitting ? "Posting..." : "Publish"}
              </button>
            </form>
          </div>
        )}

        {/* ================= POSTS LIST ================= */}
        <div className="space-y-6">
          {posts.map(post => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-slate-800">
                  {post.title}
                </h3>
                <span className="text-xs text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="text-xs font-semibold text-blue-600">
                — {post.createdBy?.name} (Alumni)
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-slate-400 italic">
              No resources posted yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

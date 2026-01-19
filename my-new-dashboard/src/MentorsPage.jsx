import React, { useEffect, useState } from 'react';
import { ArrowLeft, Star, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem('token'); // Check if token exists
        
        const response = await fetch('http://localhost:5000/api/mentor/find-mentors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Backend auth check ke liye
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mentors. Are you logged in?');
        }

        const data = await response.json();
        setMentors(data.matchedMentors || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-blue-600">Finding your matches...</div>;
  
  if (error) return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p className="text-red-500 font-bold">Error: {error}</p>
      <Link to="/" className="text-blue-600 underline">Back to Dashboard</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition mb-4 font-medium">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-800">Your AI-Matched Mentors</h1>
        <p className="text-slate-500 mt-2">Based on your skills, industry, and graduation year.</p>
      </div>

      {/* Mentors Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.length > 0 ? mentors.map((item, index) => (
          <div key={index} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-6">
              <img 
                src={`https://i.pravatar.cc/150?u=${item.mentor._id}`} 
                className="w-16 h-16 rounded-2xl border-2 border-slate-50" 
                alt="mentor"
              />
              <span className="bg-blue-50 text-blue-600 text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
                {item.score * 20}% Match
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">{item.mentor.name}</h3>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Briefcase size={16} className="text-blue-400" />
                <span>{item.mentor.profile.industry}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <GraduationCap size={16} className="text-blue-400" />
                <span>Class of {item.mentor.profile.graduationYear}</span>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {item.mentor.profile.skills.map((skill, i) => (
                <span key={i} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">
                  {skill}
                </span>
              ))}
            </div>

            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Request Mentorship
            </button>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
             <p className="text-slate-500 font-medium">No mentors found matching your profile yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
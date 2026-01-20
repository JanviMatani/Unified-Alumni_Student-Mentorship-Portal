import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineLightBulb, HiOutlineCalendar, HiOutlineUserCircle } from "react-icons/hi";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [profile, setProfile] = useState({
    department: "",
    skills: "",
    careerInterest: "",
    graduationYear: "",
  });

  // --- 1. FETCH EXISTING PROFILE (GET) ---
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        // Assuming your route is mounted at /api/profile
        const res = await fetch("https://unified-alumni-student-mentorship-portal.onrender.com/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          // Your backend returns: { _id: "...", role: "...", profile: { department: "..." } }
          if (data.profile) {
            setProfile({
              department: data.profile.department || "",
              careerInterest: data.profile.careerInterest || "",
              graduationYear: data.profile.graduationYear || "",
              // Join array back to string for the input field
              skills: data.profile.skills ? data.profile.skills.join(", ") : "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  // --- 2. UPDATE PROFILE (POST) ---
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://unified-alumni-student-mentorship-portal.onrender.com/profile", {
        method: "POST", // Changed to POST to match your backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          // Convert string "React, Node" -> Array ["React", "Node"]
          skills: profile.skills.split(",").map(skill => skill.trim()), 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // alert("Profile updated successfully!");
        // Optional: Redirect to dashboard after save
        navigate("/dashboard"); 
      } else {
        alert(data.message || "Error saving profile");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center mt-20">Loading profile...</div>;

  return (
    <div className="flex h-screen w-full bg-white">
      {/* LEFT SIDE - VISUALS */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 relative overflow-hidden flex-col justify-center items-center text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-multiply"></div>
        
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold font-serif mb-4">Your Persona</h1>
          <p className="text-lg font-light max-w-md mx-auto leading-relaxed">
            "Your profile is your handshake. Make it memorable so mentors can find you."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="w-full max-w-lg space-y-6">
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Edit Profile</h2>
            <p className="text-gray-500 mt-2">Update your professional details</p>
          </div>

          <form onSubmit={handleSave} className="space-y-5 mt-6">
            
            {/* Department Input */}
            <div className="relative group">
              <label className="text-xs text-indigo-600 absolute -top-2.5 left-3 bg-white px-1">Department / Major</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineAcademicCap size={20} />
                </div>
                <input
                  name="department"
                  value={profile.department}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Skills Input */}
            <div className="relative group">
              <label className="text-xs text-indigo-600 absolute -top-2.5 left-3 bg-white px-1">Skills (comma separated)</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineLightBulb size={20} />
                </div>
                <input
                  name="skills"
                  value={profile.skills}
                  placeholder="e.g. React, Python, Public Speaking"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Career Interest Input */}
            <div className="relative group">
              <label className="text-xs text-indigo-600 absolute -top-2.5 left-3 bg-white px-1">Career Goal / Industry</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineBriefcase size={20} />
                </div>
                <input
                  name="careerInterest"
                  value={profile.careerInterest}
                  placeholder="e.g. Software Engineer, Finance"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Graduation Year Input */}
            <div className="relative group">
              <label className="text-xs text-indigo-600 absolute -top-2.5 left-3 bg-white px-1">Graduation Year</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition">
                <div className="pl-3 text-gray-400">
                  <HiOutlineCalendar size={20} />
                </div>
                <input
                  name="graduationYear"
                  type="number"
                  value={profile.graduationYear}
                  placeholder="e.g. 2026"
                  className="w-full px-3 py-3 outline-none text-gray-700"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg mt-4 disabled:bg-gray-400">
              {loading ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </form>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-full h-12 bg-indigo-50 opacity-50 hidden lg:block pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Profile;
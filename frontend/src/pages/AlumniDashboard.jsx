import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import CareerPathForm from "../components/CareerPathForm";
import CareerPathCard from "../components/CareerPathCard";
import { Plus } from "lucide-react";

export default function AlumniDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [myPaths, setMyPaths] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            navigate("/login");
        } else {
            setUser(currentUser);
            fetchMyPaths(currentUser.token);
        }
    }, [navigate, refresh]);

    const fetchMyPaths = async (token) => {
        try {
            const res = await fetch("http://localhost:5002/api/career-paths/my-paths", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setMyPaths(data);
        } catch (err) {
            console.error("Failed to fetch my paths");
        }
    };

    const handleSuccess = () => {
        setShowForm(false);
        setRefresh(prev => prev + 1); // Trigger re-fetch
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0B1220] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
                        <p className="text-gray-400">Manage your shared career paths here.</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 transition-all"
                        >
                            <Plus size={20} /> Share New Path
                        </button>
                    )}
                </div>

                {showForm ? (
                    <div className="mb-10">
                        <CareerPathForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
                    </div>
                ) : (
                    <>
                        {myPaths.length === 0 ? (
                            <div className="mt-8 border border-white/10 rounded-xl p-16 text-center text-gray-500 bg-[#111827]/50 border-dashed">
                                <p className="text-lg mb-4">You haven't shared any career paths yet.</p>
                                <button onClick={() => setShowForm(true)} className="text-blue-400 hover:underline">Share your first path</button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myPaths.map(path => (
                                    <div key={path._id} className="relative group">
                                        <CareerPathCard path={path} isSelected={false} onToggleCompare={() => { }} />
                                        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Author View
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

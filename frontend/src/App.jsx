import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/booking";
import Repositories from "./pages/Repositories";
import ExploreMentors from "./pages/ExploreMentors";
import ChatPage from "./pages/ChatPage";
import EdanshTalks from "./pages/EdanshTalks";
<<<<<<< HEAD
import Leaderboard from "./pages/leaderboard";
=======
import AlumniDashboard from "./pages/AlumniDashboard";

// --- SECURITY WRAPPER ---
// Ye component check karega ki token hai ya nahi har request pe
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};
>>>>>>> origin/main

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD

        {/* Main App Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/explore-mentors" element={<ExploreMentors />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
=======
        
        {/* --- PROTECTED ROUTES (Login ke baad hi load honge) --- */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute><Dashboard /></PrivateRoute>} 
        />
        
        <Route 
          path="/alumni-dashboard" 
          element={<PrivateRoute><AlumniDashboard /></PrivateRoute>} 
        />

        {/* --- COMMON ROUTES --- */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><Booking /></PrivateRoute>} />
        <Route path="/explore-mentors" element={<PrivateRoute><ExploreMentors /></PrivateRoute>} />
        <Route path="/repositories" element={<PrivateRoute><Repositories /></PrivateRoute>} />

>>>>>>> origin/main
        {/* Messaging & Community Features */}
        <Route path="/chat/:mentorId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/edansh-talks" element={<PrivateRoute><EdanshTalks /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
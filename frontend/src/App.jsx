import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/booking";
import Repositories from "./pages/Repositories";
import ExploreMentors from "./pages/ExploreMentors";
import ChatPage from "./pages/ChatPage"; 
import EdanshTalks from "./pages/EdanshTalks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main App Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/explore-mentors" element={<ExploreMentors />} />
        <Route path="/repositories" element={<Repositories />} />

        {/* Messaging & Community Features */}
        <Route path="/chat/:mentorId" element={<ChatPage />} />
        <Route path="/edansh-talks" element={<EdanshTalks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
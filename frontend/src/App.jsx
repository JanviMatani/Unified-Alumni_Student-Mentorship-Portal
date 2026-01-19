import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/booking";
<<<<<<< HEAD
// 1. ExploreMentors ko yahan import karo
import ExploreMentors from "./pages/ExploreMentors"; 

=======
import Repositories from "./pages/Repositories";
>>>>>>> 333c824b892715b3c04b5846f62aa9d06a02b9b1
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Booking />} />
<<<<<<< HEAD
        
        {/* 2. Ye naya route yahan add karo */}
        <Route path="/explore-mentors" element={<ExploreMentors />} />
        
=======
        <Route path="/repositories" element={<Repositories />} />
>>>>>>> 333c824b892715b3c04b5846f62aa9d06a02b9b1
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CareerPathVisualizer from "./pages/CareerPathVisualizer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AlumniDashboard from "./pages/AlumniDashboard";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <div className="bg-[#0B1220] min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<CareerPathVisualizer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<AlumniDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

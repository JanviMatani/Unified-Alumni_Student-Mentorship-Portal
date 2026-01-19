import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import mentorRoutes from "./routes/mentor.js";
<<<<<<< HEAD
=======
import repositoryRoutes from "./routes/repository.routes.js";
dotenv.config();
>>>>>>> 333c824b892715b3c04b5846f62aa9d06a02b9b1

dotenv.config();
const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Only need this once

// Route Definitions
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
<<<<<<< HEAD
app.use("/mentor", mentorRoutes); // This makes the URL: /mentor/find-mentors
=======
app.use("/mentor", mentorRoutes);
app.use("/repository", repositoryRoutes);

app.use(express.json());
// app.use("/api/bookings", bookingRoutes);
>>>>>>> 333c824b892715b3c04b5846f62aa9d06a02b9b1

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
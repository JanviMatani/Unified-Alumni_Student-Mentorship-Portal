import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import bookingRoutes from "./routes/bookingroutes.js";
import mentorRoutes from "./routes/mentor.js";
import repositoryRoutes from "./routes/repository.routes.js";
dotenv.config();

const app = express();




connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/mentor", mentorRoutes);
app.use("/repository", repositoryRoutes);

app.use(express.json());
// app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

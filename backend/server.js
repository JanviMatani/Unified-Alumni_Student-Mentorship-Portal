import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import mentorRoutes from "./routes/mentor.js";
import repositoryRoutes from "./routes/repository.routes.js";
import bookingRoutes from "./routes/bookingroutes.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

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
app.use("/mentor", mentorRoutes);
app.use("/repository", repositoryRoutes);

app.use(express.json());
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});
// --- Setup HTTP server + Socket.io ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // adjust if you have frontend URL
});

// Socket.io real-time logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a room (e.g., mentor-student pair)
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ room, message, sender }) => {
    const msgData = { message, sender, createdAt: new Date() };
    // Broadcast to room
    io.to(room).emit("receiveMessage", msgData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
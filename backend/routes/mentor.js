import express from "express";
import User from "../models/User.js";
import Booking from "../models/booking.js";

const router = express.Router();

// GET /api/mentors/available?date=2026-01-19T00:00:00.000Z
router.get("/available", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const mentors = await User.find({ role: "alumni" });

    const bookedMentors = await Booking.find({
  startTime: { $lt: dayEnd },
  endTime: { $gt: dayStart },
  status: "booked"
}).distinct("mentor");

const availableMentors = mentors.filter(
  m => !bookedMentors.includes(m._id.toString())
);


    res.json(availableMentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch available mentors" });
  }
});

export default router;

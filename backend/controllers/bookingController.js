import Booking from "../models/booking.js";
import User from "../models/User.js";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// 🔹 Setup Google Service Account auth
const auth = new google.auth.GoogleAuth({
  keyFile: "config/google-service.json", // path to your downloaded JSON key
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });

// 🔹 Helper to create calendar event
async function createCalendarEvent({ startTime, endTime, mentor, student }) {
  try {
    const event = {
      summary: `Mentorship: ${student.name} → ${mentor.name}`,
      description: `1-on-1 mentorship session\nMentor: ${mentor.name}\nStudent: ${student.name}`,
      start: { dateTime: new Date(startTime).toISOString() },
      end: { dateTime: new Date(endTime).toISOString() },
    };

    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID, // your calendar ID
      requestBody: event,
    });

    return res.data.htmlLink; // real Google Calendar event link
  } catch (err) {
    console.error("Google Calendar event creation failed:", err);
    return null;
  }
}

// 🔹 Book a mentor slot
export const bookSlot = async (req, res) => {
  try {
    const { mentorId, studentId, startTime, endTime } = req.body;

    const mentor = await User.findOne({ _id: mentorId, role: "alumni" });
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const student = await User.findOne({ _id: studentId, role: "student" });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const conflict = await Booking.findOne({
      mentor: mentorId,
      status: "booked",
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (conflict) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    // 🔹 Create Google Calendar event FIRST
    const calendarEventLink = await createCalendarEvent({
      startTime,
      endTime,
      mentor,
      student,
    });

    if (!calendarEventLink) {
      return res.status(500).json({ message: "Calendar event creation failed" });
    }

    // 🔹 Save booking only if calendar worked
    const booking = new Booking({
      mentor: mentorId,
      student: studentId,
      startTime,
      endTime,
      calendarEventLink,
    });

    await booking.save();

    res.status(201).json({
      message: "Slot booked successfully",
      booking,
      calendarEventLink,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};


// 🔹 Get bookings for a user
export const getMyBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const query = user.role === "student" ? { student: userId } : user.role === "alumni" ? { mentor: userId } : null;
    if (!query) return res.status(403).json({ message: "Access denied" });

    const bookings = await Booking.find(query)
      .populate("mentor", "name email")
      .populate("student", "name email")
      .sort({ startTime: 1 });

    res.json(bookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

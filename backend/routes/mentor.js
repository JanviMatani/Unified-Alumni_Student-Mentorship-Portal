import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";
import Booking from "../models/booking.js";

const router = express.Router();

/* =============== FIND MENTORS (Smart Matching) =============== */
router.get("/find-mentors", authMiddleware, async (req, res) => {
  try {
    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    if (student.role !== "student") {
      return res.status(403).json({ message: "Only students can access this feature." });
    }

    // Saare verified alumni le aao
    const alumni = await User.find({ role: "alumni", isVerified: true });

    const matchedMentors = alumni.map(mentor => {
      let score = 0;
      let reasons = [];

      // Skills nikalne ka sahi tarika (Based on your User.js Model)
      const sSkills = (student.profile && student.profile.skills) ? student.profile.skills : [];
      const mSkills = (mentor.profile && mentor.profile.skills) ? mentor.profile.skills : [];

      console.log(`Matching ${student.name} with ${mentor.name}`);
      console.log("Student Skills:", sSkills);
      console.log("Mentor Skills:", mSkills);

      // Case-insensitive skill matching
      const matchingSkills = mSkills.filter(mSkill =>
        sSkills.some(sSkill => sSkill.toLowerCase() === mSkill.toLowerCase())
      );

      if (matchingSkills.length > 0) {
        score += (matchingSkills.length * 10); // Points badha diye hain
        reasons.push(`${matchingSkills.length} matching skills: ${matchingSkills.join(", ")}`);
      }

      // Industry Match
      const sInd = student.profile?.industry;
      const mInd = mentor.profile?.industry;
      if (mInd && sInd && mInd.toLowerCase() === sInd.toLowerCase()) {
        score += 15;
        reasons.push("Same industry focus");
      }

      // Department Match
      const sDept = student.profile?.department;
      const mDept = mentor.profile?.department;
      if (mDept && sDept && mDept.toLowerCase() === sDept.toLowerCase()) {
        score += 5;
        reasons.push("Same college department");
      }

      // Match Percentage Calculation
      const matchPercentage = Math.min(Math.round((score / 50) * 100), 100);

      return {
        mentor: {
          _id: mentor._id,
          name: mentor.name,
          email: mentor.email,
          profile: mentor.profile || {}
        },
        score,
        matchPercentage,
        reasons
      };
    })
    // AGAR ABHI BHI BLANK AA RAHA HAI, TOH IS .filter KO COMMENT KAR DENA
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);

    console.log("Matched Mentors Count:", matchedMentors.length);

    res.json({
      success: true,
      count: matchedMentors.length,
      matchedMentors
    });

  } catch (err) {
    console.error("Matching Error:", err);
    res.status(500).json({ message: "Server error in matching algorithm" });
  }
});


// =============== GET AVAILABLE MENTORS FOR A DATE ===============  */

// GET /api/mentors/available?date=2026-01-19T00:00:00.000Z
router.get("/available", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // All verified mentors
    const mentors = await User.find({ role: "alumni", isVerified: true });

    // Mentors already booked on that day
    const bookedMentors = await Booking.find({
      startTime: { $lt: dayEnd },
      endTime: { $gt: dayStart },
      status: "booked"
    }).distinct("mentor");

    // Filter available mentors
    const availableMentors = mentors.filter(
      m => !bookedMentors.includes(m._id.toString())
    );

    res.json(availableMentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch available mentors" });
  }
});
// Rate a mentor
router.post("/rate", authMiddleware, async (req, res) => {
  console.log("POST /rate hit", req.body, req.user); // <-- add this
  const { mentorId, rating } = req.body;
  const studentId = req.user.id;

  try {
    const mentor = await User.findById(mentorId);
    if (!mentor) return res.status(404).json({ success: false, message: "Mentor not found" });

    if (!mentor.ratings) mentor.ratings = [];

    const existing = mentor.ratings.find(r => r.student.toString() === studentId);
    if (existing) existing.rating = rating;
    else mentor.ratings.push({ student: studentId, rating });

    await mentor.save();
    res.json({ success: true, message: "Rating submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/mentors/leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const mentors = await User.find({ role: "alumni", isVerified: true });

    const leaderboard = mentors.map((mentor) => {
      const ratings = mentor.ratings || [];
      const avgRating = ratings.length
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : 0;

      return {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        profile: mentor.profile || {},
        avgRating,
        totalRatings: ratings.length
      };
    });

    // Sort descending by average rating
    leaderboard.sort((a, b) => b.avgRating - a.avgRating);

    res.json({ success: true, leaderboard });
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



export default router;
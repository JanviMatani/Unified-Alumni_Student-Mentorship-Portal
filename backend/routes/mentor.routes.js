import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* =============== FIND MENTORS =============== */
router.get("/find-mentors", authMiddleware, async (req, res) => {
  try {
    console.log("Student ID from token:", req.user.id);
    const student = await User.findById(req.user.id);

    // Check if role is student
    if (student.role !== "student") {
      return res.status(403).json({ message: "Only students can find mentors" });
    }

    // Fetch all verified alumni
    const alumni = await User.find({ role: "alumni", isVerified: true });

    // Simple matching algorithm
    const matchedMentors = alumni
      .map(a => {
        let score = 0;

        // Skills match
        score += a.profile.skills.filter(s => student.profile.skills.includes(s)).length;

        // Industry match
        if (a.profile.industry === student.profile.industry) score += 1;

        // Graduation year difference bonus (alumni should be senior)
        if (student.profile.graduationYear - a.profile.graduationYear >= 2) score += 1;

        return { mentor: a, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // top 5 mentors

    res.json({ matchedMentors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

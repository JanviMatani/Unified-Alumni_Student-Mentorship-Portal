import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* =============== FIND MENTORS (Smart Matching) =============== */
router.get("/find-mentors", authMiddleware, async (req, res) => {
  try {
    // 1. Student ka data fetch karo
    // Note: Check if your token has 'id' or '_id'
    const studentId = req.user.id || req.user._id; 
    const student = await User.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    if (student.role !== "student") {
      return res.status(403).json({ message: "Only students can access this feature." });
    }

    // 2. Verified Alumni fetch karo
    const alumni = await User.find({ role: "alumni", isVerified: true });

    // 3. Smart Matching Logic
    const matchedMentors = alumni.map(mentor => {
      let score = 0;
      let reasons = [];

      // --- A. Skills Match ---
      const sSkills = student.profile?.skills || student.skills || [];
      const mSkills = mentor.skills || mentor.profile?.skills || [];
      
      const matchingSkills = mSkills.filter(mSkill => 
        sSkills.some(sSkill => sSkill.toLowerCase().trim() === mSkill.toLowerCase().trim())
      );
      
      if (matchingSkills.length > 0) {
        score += (matchingSkills.length * 10);
        reasons.push(`${matchingSkills.length} matching skills: ${matchingSkills.join(", ")}`);
      }

      // --- B. Industry Match ---
      const sInd = (student.profile?.industry || student.industry || "").toLowerCase().trim();
      const mInd = (mentor.industry || mentor.profile?.industry || "").toLowerCase().trim();
      
      if (sInd && mInd && sInd === mInd) {
        score += 15;
        reasons.push("Same industry focus");
      }

      // --- C. Department Match ---
      const sDept = (student.profile?.department || student.department || "").toLowerCase().trim();
      const mDept = (mentor.profile?.department || mentor.department || "").toLowerCase().trim();
      
      if (sDept && mDept && sDept === mDept) {
        score += 5;
        reasons.push("Same college department");
      }

      // --- D. Seniority Bonus ---
      const sYear = student.profile?.graduationYear || student.graduationYear;
      const mYear = mentor.profile?.graduationYear || mentor.graduationYear;
      if (sYear && mYear && (sYear - mYear >= 2)) {
        score += 5;
        reasons.push("Experienced Senior");
      }

      // Force 1 point so alumni always show up
      if (score === 0) score = 1;

      const matchPercentage = Math.min(Math.round((score / 50) * 100), 100);

      return {
        mentor: {
          _id: mentor._id,
          name: mentor.name,
          email: mentor.email,
          profile: {
            department: mentor.profile?.department || mentor.department,
            industry: mentor.industry || mentor.profile?.industry,
            currentRole: mentor.currentRole || mentor.profile?.currentRole || "Senior Alumni",
            graduationYear: mentor.graduationYear || mentor.profile?.graduationYear,
            skills: mSkills 
          }
        },
        score,
        matchPercentage,
        reasons: reasons.length > 0 ? reasons : ["Alumni from your college"]
      };
    })
    .sort((a, b) => b.score - a.score);

    res.json({ 
      success: true, 
      count: matchedMentors.length, 
      matchedMentors 
    });

  } catch (err) {
    console.error("Backend Matching Error:", err);
    res.status(500).json({ message: "Server error in matching algorithm" });
  }
});

export default router;
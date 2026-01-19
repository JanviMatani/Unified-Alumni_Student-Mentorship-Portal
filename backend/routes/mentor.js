import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

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

export default router;
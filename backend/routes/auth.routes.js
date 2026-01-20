import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Institutional email check
    if (!email.endsWith("@college.edu")) {
      return res.status(400).json({
        message: "Only institutional emails allowed"
      });
    }

    // 2. User exists?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered"
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Verification rule: Students are auto-verified, Alumni need Admin check
    const verified = role === "student";

    // 5. Save user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: verified
    });

    res.status(201).json({
      message: "Registration successful",
      user: { id: newUser._id, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check if account is verified
    // Mahek Matani ke case mein isVerified: true hai, toh ye pass ho jayega
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Account pending verification. Please wait for admin approval."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // JWT Sign
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret", // Fallback agar env na ho
      { expiresIn: "1d" }
    );

    // --- MAIN FIX START ---
    // Yahan role bhej rahe hain taaki Frontend redirection kar sake
    res.json({ 
      token, 
      role: user.role, 
      name: user.name 
    });
    // --- MAIN FIX END ---

  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ================= ADMIN VERIFY ================= */
router.post("/verify/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isVerified: true
    });
    res.json({ message: "Alumni verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
});

export default router;
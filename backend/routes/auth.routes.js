import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

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

  // 4. Verification rule
  const verified = role === "student";

  // 5. Save user
  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isVerified: verified
  });

  res.status(201).json({
    message: "Registration successful"
  });
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

const verified = true;  // ab student aur alumni dono verified

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Account pending verification"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

/* ================= ADMIN VERIFY ================= */
router.post("/verify/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    isVerified: true
  });

  res.json({ message: "Alumni verified successfully" });
});

export default router;

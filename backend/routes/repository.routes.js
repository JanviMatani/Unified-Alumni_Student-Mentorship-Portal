import express from "express";
import Repository from "../models/Repository.js";
import authMiddleware from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

const router = express.Router();

/* ================= CREATE POST (ALUMNI ONLY) ================= */
router.post(
  "/",
  authMiddleware,
  allowRoles("alumni"),
  async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const post = await Repository.create({
      title,
      content,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });
  }
);

/* ================= GET ALL POSTS (ALL USERS) ================= */
router.get("/", authMiddleware, async (req, res) => {
  const posts = await Repository.find()
    .populate("createdBy", "name role")
    .sort({ createdAt: -1 });

  res.json(posts);
});

export default router;

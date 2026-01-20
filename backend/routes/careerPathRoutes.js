const express = require("express");
const router = express.Router();
const {
    getCareerPaths,
    getMyPaths,
    createPath,
    updatePath,
    deletePath
} = require("../controllers/careerPathController");
const { protect, alumniOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getCareerPaths);

// Protected routes
router.get("/my-paths", protect, getMyPaths);
router.post("/", protect, alumniOnly, createPath);
router.put("/:id", protect, alumniOnly, updatePath);
router.delete("/:id", protect, alumniOnly, deletePath);

module.exports = router;

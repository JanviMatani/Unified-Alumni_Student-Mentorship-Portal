import express from "express";

import {
    getCareerPaths,
    getMyPaths,
    createPath,
    updatePath,
    deletePath
} from "../controllers/careerPathController.js";

import {
    protect,
    alumniOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getCareerPaths);

// Protected routes
router.get("/my-paths", protect, getMyPaths);
router.post("/", protect, alumniOnly, createPath);
router.put("/:id", protect, alumniOnly, updatePath);
router.delete("/:id", protect, alumniOnly, deletePath);

export default router;

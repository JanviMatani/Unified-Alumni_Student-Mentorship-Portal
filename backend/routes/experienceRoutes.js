const express = require("express");
const {
    createExperience,
    getExperiences,
    upvoteExperience,
} = require("../controllers/experienceController");

const router = express.Router();

router.post("/post", createExperience);
router.get("/", getExperiences);
router.put("/upvote/:id", upvoteExperience);

module.exports = router;

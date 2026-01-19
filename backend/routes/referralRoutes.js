const express = require("express");
const {
    createReferral,
    getActiveReferrals,
} = require("../controllers/referralController");

const router = express.Router();

router.post("/post", createReferral); // Alumni
router.get("/", getActiveReferrals);  // Students

module.exports = router;

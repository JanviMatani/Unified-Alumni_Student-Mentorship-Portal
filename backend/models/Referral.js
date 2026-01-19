const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        role: { type: String, required: true },
        expiryDate: { type: Date, required: true },
        postedBy: { type: String, default: "Verified Alumni" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);

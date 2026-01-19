const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        role: { type: String },
        content: { type: String, required: true },
        upvotes: { type: Number, default: 0 },
        postedBy: { type: String, default: "Verified Alumni" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);

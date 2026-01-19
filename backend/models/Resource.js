const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ["Resume", "Interview", "Study", "Company"],
            required: true,
        },

        company: String,

        description: String,

        resourceLink: String,

        // 🔥 NEW FIELDS
        tags: [String], // ["DSA", "Core", "Aptitude"]

        result: {
            type: String,
            enum: ["Selected", "Rejected"],
        },

        uploadedBy: {
            type: String,
            default: "Verified Alumni",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);

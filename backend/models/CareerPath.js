const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
    title: String,
    skills: [
        {
            name: String,
            weight: Number
        }
    ],
    year: String,
    salary: String // e.g. "6-10 LPA"
});

const careerPathSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false // Set to true after migration or if strict
    },
    branch: String,
    title: String,
    avgTime: String,
    alumniCount: Number,
    entryLevel: {
        type: String,
        enum: ["Beginner", "Average", "Advanced"],
        default: "Average"
    },
    companyType: {
        type: String,
        enum: ["Startup", "MNC", "Product-based"],
        default: "Product-based"
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    },
    isSwitchPath: {
        type: Boolean,
        default: false
    },
    switchFrom: String,
    stages: [stageSchema]
});

module.exports = mongoose.model("CareerPath", careerPathSchema);

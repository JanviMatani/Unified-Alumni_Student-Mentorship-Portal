const Experience = require("../models/Experience");

// Create experience (alumni / student both)
exports.createExperience = async (req, res) => {
    try {
        const exp = await Experience.create(req.body);
        res.status(201).json(exp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all experiences (sorted by upvotes)
exports.getExperiences = async (req, res) => {
    try {
        const exps = await Experience.find().sort({ upvotes: -1, createdAt: -1 });
        res.json(exps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Upvote experience
exports.upvoteExperience = async (req, res) => {
    try {
        const exp = await Experience.findByIdAndUpdate(
            req.params.id,
            { $inc: { upvotes: 1 } },
            { new: true }
        );
        res.json(exp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const Referral = require("../models/Referral");

// Alumni posts referral
exports.createReferral = async (req, res) => {
    try {
        const referral = await Referral.create(req.body);
        res.status(201).json(referral);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Students view active referrals only
exports.getActiveReferrals = async (req, res) => {
    try {
        const today = new Date();
        const referrals = await Referral.find({
            expiryDate: { $gte: today },
        }).sort({ createdAt: -1 });

        res.json(referrals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

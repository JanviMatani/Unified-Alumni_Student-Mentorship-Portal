const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/career-paths", require("./routes/careerPathRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5002;

const seedIfEmpty = async () => {
    try {
        const CareerPath = require("./models/CareerPath");
        const count = await CareerPath.countDocuments();
        if (count === 0) {
            console.log("⚠️ DB Empty! Seeding now...");
            const branches = ["CSE", "IT"];
            const levels = ["Beginner", "Average", "Advanced"];
            const types = ["Startup", "MNC", "Product-based"];

            let paths = [];
            branches.forEach(b => levels.forEach(l => types.forEach(t => {
                paths.push({
                    branch: b, entryLevel: l, companyType: t,
                    title: `${l} ${b} Role @ ${t}`,
                    avgTime: "2 Yrs",
                    stages: [{ title: "Start", year: "Yr 1", skills: [{ name: "Java", weight: 5 }] }],
                    creatorId: null // Public path
                });
            })));
            await CareerPath.insertMany(paths);
            console.log("✅ Auto-Seeded 18 Paths!");
        } else {
            console.log(`✅ DB has ${count} paths.`);
        }
    } catch (e) { console.error("Auto-Seed Error:", e); }
};

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await seedIfEmpty();
});

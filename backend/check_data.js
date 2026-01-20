import mongoose from "mongoose";
import CareerPath from "./models/CareerPath.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("✅ Connected to DB");

        const count = await CareerPath.countDocuments();
        console.log(`📊 Total Documents: ${count}`);

        const specific = await CareerPath.find({
            branch: "CSE",
            entryLevel: "Beginner",
            companyType: "Startup"
        });

        console.log(`🔍 Query (CSE/Beginner/Startup) found: ${specific.length} paths`);

        if (specific.length === 0) {
            console.log("❌ CRITICAL: Data missing for this combination!");
        } else {
            console.log("✅ Data exists:", specific[0].title);
        }

        process.exit();
    })
    .catch(err => console.error(err));
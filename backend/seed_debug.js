import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import CareerPath from "./models/CareerPath.js";

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE = path.join(__dirname, "debug_log.txt");

function log(msg) {
    fs.appendFileSync(LOG_FILE, msg + "\n");
}

log("--- STARTED SEED DEBUG ---");

dotenv.config();

log(
    "Env Loaded. URI Length: " +
        (process.env.MONGO_URI ? process.env.MONGO_URI.length : "NULL")
);

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        log("✅ MongoDB Connected");

        await CareerPath.deleteMany();
        log("🗑️ Cleared DB");

        const branches = ["CSE", "IT"];
        const levels = ["Beginner", "Average", "Advanced"];
        const types = ["Startup", "MNC", "Product-based"];

        const allPaths = [];

        branches.forEach(branch => {
            levels.forEach(level => {
                types.forEach(type => {
                    allPaths.push({
                        branch,
                        entryLevel: level,
                        companyType: type,
                        title: `${level} ${branch} Role at ${type}`,
                        avgTime: "2 Years",
                        difficulty: "Medium",
                        stages: [
                            {
                                title: "Starter",
                                year: "Year 1",
                                skills: [{ name: "Java", weight: 5 }]
                            }
                        ]
                    });
                });
            });
        });

        const docs = await CareerPath.insertMany(allPaths);
        log(`🔥 Inserted ${docs.length} paths`);
        log("DONE");

        process.exit(0);
    } catch (err) {
        log("❌ Error: " + err.message);
        process.exit(1);
    }
}

seedDB();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "debug_log.txt");

function log(msg) {
    fs.appendFileSync(LOG_FILE, msg + "\n");
}

log("--- STARTED SEED DEBUG ---");

try {
    const CareerPath = require("./models/CareerPath");
    dotenv.config();

    log("Env Loaded. URI Length: " + (process.env.MONGO_URI ? process.env.MONGO_URI.length : "NULL"));

    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            log("✅ MongoDB Connected");

            try {
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
                                stages: [{ title: "Starter", year: "Year 1", skills: [{ name: "Java", weight: 5 }] }]
                            });
                        });
                    });
                });

                const docs = await CareerPath.insertMany(allPaths);
                log(`🔥 Inserted ${docs.length} paths`);
                log("DONE");
                process.exit();
            } catch (err) {
                log("❌ Insert Error: " + err.message);
                process.exit(1);
            }
        })
        .catch(err => {
            log("❌ Connect Error: " + err.message);
            process.exit(1);
        });

} catch (e) {
    log("❌ Fatal Error: " + e.message);
}

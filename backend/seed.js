import mongoose from "mongoose";
import dotenv from "dotenv";

import CareerPath from "./models/CareerPath.js";
import connectDB from "./config/db.js";

dotenv.config();

const branches = ["CSE", "IT"];
const levels = ["Beginner", "Average", "Advanced"];
const types = ["Startup", "MNC", "Product-based"];

const generateTitle = (branch, level, type) => {
    const roles = {
        CSE: [
            "Full Stack Dev",
            "AI Engineer",
            "Software Architect",
            "Backend Dev",
            "Frontend Lead"
        ],
        IT: [
            "Cloud Engineer",
            "System Admin",
            "Cyber Security Analyst",
            "DevOps Engineer",
            "IT Consultant"
        ]
    };

    const base =
        roles[branch][Math.floor(Math.random() * roles[branch].length)];

    return `${level} ${base} at ${type}`;
};

const generateStages = level => {
    if (level === "Beginner") {
        return [
            {
                title: "Intern",
                skills: [{ name: "Basics", weight: 7 }],
                year: "Month 1-6",
                salary: "15-25k/mo"
            },
            {
                title: "Junior Role",
                skills: [{ name: "Core Skills", weight: 8 }],
                year: "Year 1",
                salary: "6-9 LPA"
            }
        ];
    }

    if (level === "Average") {
        return [
            {
                title: "Junior Dev",
                skills: [{ name: "Development", weight: 7 }],
                year: "Year 1",
                salary: "5-8 LPA"
            },
            {
                title: "Senior Dev",
                skills: [{ name: "Architecture", weight: 8 }],
                year: "Year 3",
                salary: "12-18 LPA"
            }
        ];
    }

    return [
        {
            title: "Lead Engineer",
            skills: [{ name: "Leadership", weight: 9 }],
            year: "Year 4",
            salary: "25-35 LPA"
        },
        {
            title: "Principal Architect",
            skills: [{ name: "Strategy", weight: 10 }],
            year: "Year 6+",
            salary: "40-60 LPA"
        }
    ];
};

const seedData = async () => {
    try {
        await connectDB();

        // Optional small delay to ensure stable connection
        await new Promise(resolve => setTimeout(resolve, 1000));

        await CareerPath.deleteMany();
        console.log("🗑️ Cleared DB");

        const allPaths = [];

        // 2 × 3 × 3 = 18 paths
        branches.forEach(branch => {
            levels.forEach(level => {
                types.forEach(type => {
                    allPaths.push({
                        branch,
                        entryLevel: level,
                        companyType: type,
                        title: generateTitle(branch, level, type),
                        avgTime:
                            level === "Beginner"
                                ? "1 Year"
                                : level === "Advanced"
                                ? "5+ Years"
                                : "2-3 Years",
                        alumniCount: Math.floor(Math.random() * 200) + 20,
                        difficulty:
                            level === "Advanced"
                                ? "Hard"
                                : level === "Beginner"
                                ? "Easy"
                                : "Medium",
                        isSwitchPath: Math.random() > 0.8,
                        stages: generateStages(level)
                    });
                });
            });
        });

        const inserted = await CareerPath.insertMany(allPaths);

        console.log(`🔥 GENERATED & INSERTED ${inserted.length} PATHS!`);
        console.log("✅ Every single filter combination now has data.");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

seedData();

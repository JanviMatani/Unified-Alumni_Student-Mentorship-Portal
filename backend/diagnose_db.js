import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("👉 URI:", process.env.MONGO_URI);

const diagnose = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        console.log("✅ MongoDB Connected Successfully!");

        const count = await mongoose.connection.db.collection("careerpaths").countDocuments();
        console.log(`📊 Current Docs in 'careerpaths': ${count}`);

        process.exit();
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
        process.exit(1);
    }
};

diagnose();
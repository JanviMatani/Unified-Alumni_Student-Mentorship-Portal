import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "alumni", "admin"]
  },
  isVerified: Boolean,

  profile: {
    department: String,
    skills: [String],
    careerInterest: String,
    industry: String,
    currentRole: String,
    graduationYear: Number,
    availability: [String]
  }
});

export default mongoose.model("User", userSchema);

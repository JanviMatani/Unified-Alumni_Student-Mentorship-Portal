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
  },
  ratings: [
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 }
  }
]

});
export default mongoose.model("User", userSchema);



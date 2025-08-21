import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    gender: { type: String, enum: ["Male", "Female", "other"] },
    dob: Date,
    address: String,
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    // Doctor-specific fields (only used if role === "doctor")
    specialization: { type: String },
    department: { type: String },
    experienceYears: { type: Number },
    qualifications: { type: [String] },
    licenseNumber: { type: String },

    // Patient-specific fields (only used if role === "patient")
    bloodGroup: { type: String },
    emergencyContact: { type: String },
    profilePicture: { type: String }, // URL to the profile picture
    bio: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

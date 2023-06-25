import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    universityID: {
      type: Number,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 1001,
    },
    profileImage: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    notes: {
      type: Array,
      default: [],
    },
    reservedCases: {
      type: Array,
      default: [],
    },
    gender: String,
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);

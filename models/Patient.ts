import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneId: {
      type: Number,
      required: true,
    },
    state: {
      type: Object,
      default: {},
    },
    clinics: {
      type: Array,
      default: ["التشخيص"],
    },
    xRay: {
      type: String,
      default: "",
    },
    occupation: String,
    smoker: {
      type: Boolean,
      default: false,
    },
    gender: String,
    age: String,
    reserved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;

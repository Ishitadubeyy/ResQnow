import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "citizen" }
  },
  { timestamps: true }
);

export default mongoose.model("Citizen", citizenSchema);

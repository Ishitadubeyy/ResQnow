import mongoose from "mongoose";

const witnessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const emergencySchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },
    responderId: { type: mongoose.Schema.Types.ObjectId, ref: "Responder" },
    location: { type: String, required: true },
    timeOfIncident: { type: Date, required: true },
    severity: { type: String, enum: ["Low", "Medium", "High"], required: true },
    description: { type: String, required: true },
    injuries: { type: String },
    witnesses: { type: [witnessSchema], default: [] },
    photos: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Active", "In-Progress", "Resolved"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Emergency", emergencySchema);

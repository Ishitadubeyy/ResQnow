import mongoose from "mongoose";

const responderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: "responder", required: true },
  certificationType: { type: String, required: true },
  certificationNumber: { type: String, required: true },
  field: { type: String },           
  experience: { type: Number, default: 0 }, 
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Responder", responderSchema);

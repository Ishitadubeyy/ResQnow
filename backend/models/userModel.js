import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'responder'], required: true },
  certificationType: { type: String },
  certificationNumber: { type: String }
});

export default mongoose.model('User', userSchema);

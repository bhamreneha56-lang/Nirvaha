import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  email: { type: String },
  passwordHash: { type: String },
  role: { type: String, enum: ['individual', 'ngo', 'pri', 'ulb', 'govt_agency'], default: 'individual' },
  name: { type: String },
  district: { type: String },
  block: { type: String },
  panchayat: { type: String },
  preferredLanguage: { type: String, default: 'EN' },
  karmaTotal: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

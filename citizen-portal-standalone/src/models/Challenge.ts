import mongoose, { Schema, Document } from "mongoose";
const ChallengeSchema = new Schema({
  pid: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { district: String, block: String, village: String },
  affectedPopulation: { type: Number, required: true },
  duration: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, default: 'Submitted' },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);
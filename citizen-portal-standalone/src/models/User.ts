import mongoose, { Schema, Document } from "mongoose";
const UserSchema = new Schema({
  fullName: { type: String, required: true },
  mobile: { type: String },
  email: { type: String },
  userType: { type: String, required: true },
  district: { type: String },
  block: { type: String },
  village: { type: String },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.User || mongoose.model("User", UserSchema);
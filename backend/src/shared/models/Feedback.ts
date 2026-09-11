import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  isPostDeployment: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);

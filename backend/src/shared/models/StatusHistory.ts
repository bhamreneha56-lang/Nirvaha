import mongoose from 'mongoose';

const statusHistorySchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromStatus: { type: String },
  toStatus: { type: String, required: true },
  note: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('StatusHistory', statusHistorySchema);

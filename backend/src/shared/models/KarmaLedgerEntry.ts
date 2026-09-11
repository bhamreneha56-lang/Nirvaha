import mongoose from 'mongoose';

const karmaLedgerEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  reason: { type: String, required: true },
  relatedProblem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('KarmaLedgerEntry', karmaLedgerEntrySchema);

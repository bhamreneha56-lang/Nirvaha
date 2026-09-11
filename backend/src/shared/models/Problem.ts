import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  problemIdReadable: { type: String, unique: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  affectedPopulationEstimate: { type: Number },
  durationOrFrequency: { type: String },
  priorAttempts: { type: String },
  media: [{ 
    type: { type: String, enum: ['photo', 'video', 'document', 'audio'] }, 
    url: String 
  }],
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  status: { type: String, enum: ['submitted', 'verified', 'assigned', 'in_progress', 'deployed', 'closed'], default: 'submitted' },
  duplicateOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  validationCount: { type: Number, default: 0 }
}, { timestamps: true });

problemSchema.index({ location: '2dsphere' });

export default mongoose.model('Problem', problemSchema);

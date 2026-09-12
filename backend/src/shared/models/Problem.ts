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
  district: { type: String },
  block: { type: String },
  panchayat: { type: String },
  village: { type: String },
  state: { type: String },
  ward: { type: String },
  locality: { type: String },
  landmark: { type: String },
  pinCode: { type: String },
  locationConfidence: { type: String },
  
  // Step 1 additions
  startDate: { type: String },
  frequency: { type: String },
  typicalOccurrenceTime: { type: String },
  
  // Step 3 Impact additions
  affectedGroups: [{ type: String }],
  impactAreas: [{ type: String }],
  impactDescription: { type: String },
  severity: { type: String },
  emergencyFlag: { type: Boolean },
  
  // Step 5 Previous Action
  previousComplaintReported: { type: Boolean },
  previousComplaintWhere: { type: String },
  previousComplaintReference: { type: String },
  previousComplaintDate: { type: String },
  previousComplaintStatus: { type: String },
  previousComplaintAuthority: { type: String },
  
  // Step 6 Community & Solution
  reportingOnBehalfOf: { type: String },
  organisationName: { type: String },
  solutionTypeNeeded: [{ type: String }],
  suggestedSolution: { type: String },
  existingAttempts: { type: String },
  requiredExpertise: [{ type: String }],
  supportRequired: [{ type: String }],
  
  // Step 7 Privacy
  visibility: { type: String, default: 'public' },
  showName: { type: Boolean, default: true },

  isAnonymous: { type: Boolean, default: false },
  citizenType: { type: String },
  aiCategory: { type: String },
  aiPriority: { type: String },
  aiConfidence: { type: Number },
  aiSummary: { type: String },
  aiRoutingDept: { type: String },
  status: { type: String, enum: ['submitted', 'verified', 'assigned', 'in_progress', 'deployed', 'closed'], default: 'submitted' },
  duplicateOf: { type: String }, 
  validationCount: { type: Number, default: 0 }
}, { timestamps: true });

problemSchema.index({ location: '2dsphere' });

export default mongoose.model('Problem', problemSchema);

import os

base_path = "backend/src/shared/models"
os.makedirs(base_path, exist_ok=True)

models = {
    "User.ts": """import mongoose from 'mongoose';

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
""",
    "Problem.ts": """import mongoose from 'mongoose';

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
""",
    "StatusHistory.ts": """import mongoose from 'mongoose';

const statusHistorySchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromStatus: { type: String },
  toStatus: { type: String, required: true },
  note: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('StatusHistory', statusHistorySchema);
""",
    "Feedback.ts": """import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  isPostDeployment: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
""",
    "KarmaLedgerEntry.ts": """import mongoose from 'mongoose';

const karmaLedgerEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  reason: { type: String, required: true },
  relatedProblem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('KarmaLedgerEntry', karmaLedgerEntrySchema);
""",
    "Notification.ts": """import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  relatedProblem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
"""
}

for filename, content in models.items():
    with open(os.path.join(base_path, filename), "w") as f:
        f.write(content)

print("Models generated.")

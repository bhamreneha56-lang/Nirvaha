// shared/types.ts

export interface User {
  _id: string;
  phone: string;
  email?: string;
  role: 'individual' | 'ngo' | 'pri' | 'ulb' | 'govt_agency';
  name?: string;
  district?: string;
  block?: string;
  panchayat?: string;
  preferredLanguage: string;
  karmaTotal: number;
  isVerified: boolean;
}

export interface Problem {
  _id: string;
  problemIdReadable: string;
  submittedBy?: User | string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  affectedPopulationEstimate?: number;
  durationOrFrequency?: string;
  priorAttempts?: string;
  media: { type: 'photo' | 'video' | 'document' | 'audio'; url: string }[];
  location: { type: 'Point'; coordinates: [number, number] }; // [lng, lat]
  status: 'submitted' | 'verified' | 'assigned' | 'in_progress' | 'deployed' | 'closed';
  validationCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface StatusHistory {
  _id: string;
  problem: string;
  changedBy?: User | string;
  fromStatus?: string;
  toStatus: string;
  note?: string;
  timestamp: string;
}

export interface Feedback {
  _id: string;
  problem: string;
  user: string;
  rating?: number;
  comment?: string;
  isPostDeployment: boolean;
  createdAt: string;
}

export interface KarmaLedgerEntry {
  _id: string;
  user: string;
  points: number;
  reason: string;
  relatedProblem?: string;
  timestamp: string;
}

export interface Notification {
  _id: string;
  user: string;
  type: string;
  message: string;
  relatedProblem?: string;
  isRead: boolean;
  createdAt: string;
}

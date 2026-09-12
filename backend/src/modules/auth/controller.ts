import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../shared/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-sih-2026';

// Stub for OTP generation
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// In-memory store for OTPs (replace with Redis in production)
const otpStore: Record<string, string> = {};

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const otp = generateOTP();
    otpStore[phone] = otp;
    
    // In a real app, send OTP via SMS here
    console.log(`Sending OTP ${otp} to phone ${phone}`);
    
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    if (otpStore[phone] !== otp && otp !== '123456') { // 123456 as a backdoor for testing
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    delete otpStore[phone];

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    // Don't allow updating sensitive fields
    delete updates.phone;
    delete updates.role;
    delete updates.passwordHash;
    delete updates.karmaTotal;

    const user = await User.findByIdAndUpdate((req as any).user.id, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Register with email/password + citizen type
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, citizenType, district, block } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone is required' });

    let user = await User.findOne({ phone });
    if (user) return res.status(409).json({ error: 'User already exists with this phone' });

    user = await User.create({
      phone,
      email: email || '',
      name: name || 'Citizen',
      passwordHash: password || '',
      role: citizenType || 'individual',
      district: district || '',
      block: block || '',
      karmaTotal: 10 // Welcome bonus
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Login with phone/email + password
export const loginWithPassword = async (req: Request, res: Response) => {
  try {
    const { phone, email, password } = req.body;

    let user = phone
      ? await User.findOne({ phone })
      : await User.findOne({ email });

    // Auto-create default test citizen if first time
    if (!user && (email === 'neha@nirvaha.in' || phone === '+919876543210')) {
      user = await User.create({
        phone: phone || '+919876543210',
        email: 'neha@nirvaha.in',
        name: 'Neha Dilip Bhamare',
        passwordHash: 'password123',
        role: 'individual',
        district: 'Ranchi',
        block: 'Ward 14',
        karmaTotal: 450
      });
    }

    if (!user) return res.status(401).json({ error: 'User not found. Please register first.' });
    // For prototype: accept any password OR matching passwordHash
    // In production, use bcrypt
    if (user.passwordHash && user.passwordHash !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Anonymous / guest login
export const anonymousLogin = async (req: Request, res: Response) => {
  try {
    const anonId = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const user = await User.create({
      phone: anonId,
      name: 'Anonymous Citizen',
      email: '',
      passwordHash: '',
      role: 'individual',
      isVerified: false,
      karmaTotal: 0
    });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user, anonymous: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

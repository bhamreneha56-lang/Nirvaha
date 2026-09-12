import mongoose from 'mongoose';
import User from './src/shared/models/User';
import KarmaLedgerEntry from './src/shared/models/KarmaLedgerEntry';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/nirvaha');
  console.log('Connected');
  
  let neha = await User.findOne({ name: 'Neha Dilip Bhamare' });
  if (!neha) {
    neha = await User.create({
      name: 'Neha Dilip Bhamare',
      phone: '9876543210',
      role: 'individual',
      karmaTotal: 450
    });
  } else {
    neha.karmaTotal = 450;
    await neha.save();
  }

  await KarmaLedgerEntry.deleteMany({ user: neha._id, reason: 'Validated a problem' });
  for (let i = 0; i < 14; i++) {
    await KarmaLedgerEntry.create({
      user: neha._id,
      points: 2,
      reason: 'Validated a problem'
    });
  }

  console.log('Added Neha with 14 validations and 450 karma.');
  process.exit(0);
}
run();

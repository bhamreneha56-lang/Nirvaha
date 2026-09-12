import mongoose from 'mongoose';
import User from './src/shared/models/User';
import KarmaLedgerEntry from './src/shared/models/KarmaLedgerEntry';

async function run() {
  await mongoose.connect('mongodb://localhost:27017/nirvaha');
  let neha = await User.findOne({ name: 'Neha Dilip Bhamare' });
  if (neha) {
    neha.karmaTotal = 500;
    await neha.save();
    
    await KarmaLedgerEntry.create({
      user: neha._id,
      points: 2,
      reason: 'Validated a problem'
    });
    console.log('Updated Neha to 15 validations and 500 karma.');
  }
  process.exit(0);
}
run();

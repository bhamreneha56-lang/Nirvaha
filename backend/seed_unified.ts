import mongoose from 'mongoose';
import Problem from './src/shared/models/Problem';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/nirvaha');
  console.log('Connected to DB for seeding unified dataset...');
  
  const rawData = fs.readFileSync(path.join(__dirname, '../frontend/src/data/unified_dataset.json'), 'utf-8');
  const unifiedData = JSON.parse(rawData);
  
  await Problem.deleteMany({});
  
  const problemsToInsert = unifiedData.problems.map((p: any) => ({
    problemIdReadable: p.id,
    title: p.title || p.description.substring(0, 50),
    description: p.description,
    category: p.domainAI || 'Other',
    status: p.status === 'university_assigned' ? 'assigned' :
            p.status === 'in_progress' ? 'in_progress' :
            p.status === 'resolved' ? 'deployed' : 'submitted',
    location: {
      type: 'Point',
      coordinates: [85.3, 23.3] // default Ranchi coords
    },
    validationCount: Math.floor(Math.random() * 50)
  }));
  
  await Problem.insertMany(problemsToInsert);
  console.log(`Inserted ${problemsToInsert.length} problems from unified dataset!`);
  
  process.exit(0);
}
seed().catch(console.error);

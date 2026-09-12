import { Router } from 'express';
import { analyzeProblem, analyzeImage, chatbot } from './controller';
const router = Router();
router.post('/analyze', analyzeProblem);
router.post('/image', analyzeImage);
router.post('/chat', chatbot);
export default router;

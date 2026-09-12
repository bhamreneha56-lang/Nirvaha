import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import Problem from '../../shared/models/Problem';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeProblem = async (req: Request, res: Response) => {
  try {
    const { title, description, category, district } = req.body;
    const allProblems = await Problem.find({}, 'title problemIdReadable description category district').lean();

    const existing = allProblems.slice(0, 30).map((p: any) =>
      `- [${p.problemIdReadable}] ${p.title} (${p.category}, ${p.district || ''})`
    ).join('\n');

    const prompt = `You are an AI assistant for NIRVAHA, a civic problem-reporting platform for Jharkhand, India.
A citizen submitted:
Title: "${title}"
Description: "${description}"
Category: "${category}"
District: "${district || 'Not specified'}"
Existing problems (for duplicate detection):
${existing}
Respond ONLY with valid JSON (no markdown):
{"aiCategory":"Water|Roads|Health|Education|Sanitation|Electricity|Environment|Agriculture|Governance|Safety|Other","aiSubcategory":"specific sub-type","aiPriority":"Critical|High|Medium|Low","aiConfidence":0.92,"aiSummary":"2-sentence summary","aiRoutingDept":"government department","aiSuggestedActions":["action1","action2","action3"],"duplicateDetected":false,"duplicateProblemId":null,"duplicateSimilarityScore":0.0,"duplicateReason":null}`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (err: any) {
    console.error('AI analyze error:', err.message);
    res.json({
      aiCategory: req.body.category || 'Other',
      aiSubcategory: '',
      aiPriority: 'Medium',
      aiConfidence: 0.5,
      aiSummary: (req.body.description || '').slice(0, 100),
      aiRoutingDept: 'District Administration',
      aiSuggestedActions: ['File with local authority', 'Escalate to district officer'],
      duplicateDetected: false,
      duplicateProblemId: null,
      duplicateSimilarityScore: 0,
      duplicateReason: null
    });
  }
};

export const analyzeImage = async (req: Request, res: Response) => {
  try {
    const { base64, mimeType } = req.body;
    if (!base64 || !mimeType) return res.status(400).json({ error: 'base64 and mimeType required' });
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType, data: base64 } },
          { text: 'Analyze this citizen-submitted image for NIRVAHA civic platform in Jharkhand India. Identify the civic problem. Respond ONLY valid JSON: {"problemDescription":"...","suggestedCategory":"Water|Roads|Health|Education|Sanitation|Electricity|Environment|Agriculture|Governance|Safety|Other","severity":"Critical|High|Medium|Low","tags":["tag1","tag2"],"hasValidContent":true}' }
        ]
      }]
    });
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    res.json(JSON.parse(cleaned));
  } catch (err: any) {
    console.error('Image error:', err.message);
    res.status(500).json({ error: 'Image analysis failed', details: err.message });
  }
};

export const chatbot = async (req: Request, res: Response) => {
  try {
    const { message, history = [], userContext = {} } = req.body;
    const systemPrompt = `You are NIRVA, the friendly AI assistant for NIRVAHA, a civic platform for Jharkhand, India. Help citizens report problems (water, roads, health, education, sanitation, electricity, environment), understand platform features, and check problem status. Be empathetic, concise, use occasional Hindi words like Namaskar or Ji. Citizen name: ${userContext.name || 'Citizen'}, District: ${userContext.district || 'Not specified'}. Keep responses under 3 short paragraphs.`;
    const contents = [
      ...history.map((h: any) => ({ role: h.role as 'user' | 'model', parts: [{ text: h.text }] })),
      { role: 'user' as const, parts: [{ text: message }] }
    ];
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: { systemInstruction: systemPrompt }
    });
    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || 'I am having trouble responding. Please try again.';
    res.json({ reply });
  } catch (err: any) {
    console.error('Chatbot error:', err.message);
    res.status(500).json({ reply: 'I am having trouble connecting right now.', error: err.message });
  }
};

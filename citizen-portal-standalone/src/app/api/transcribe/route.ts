import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
export async function POST(req: Request) {
  try {
    const { audioBase64, mimeType } = await req.json();
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [
            { inlineData: { data: audioBase64, mimeType: mimeType || 'audio/webm' } },
            { text: "Transcribe audio and output JSON with title, description, category." }
        ]}]
    });
    let resultText = (response.text || "{}").replace(/\x60\x60\x60json\n/g, '').replace(/\x60\x60\x60/g, '');
    return NextResponse.json(JSON.parse(resultText), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to transcribe" }, { status: 500 });
  }
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Report() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  
  const handleRecord = async () => {
    alert("Imagine recording voice here. In reality we use MediaRecorder, base64 encode it, and send to /api/transcribe.");
    // Simulate Gemini API response
    setTitle("Water supply issue");
    setDesc("We have no water since yesterday.");
  };

  const submit = () => {
    alert("Submitted! PID: NIR-2026-000100");
    router.push("/dashboard");
  };

  return (
    <div className="p-8 max-w-lg mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Report a Challenge</h1>
      <button onClick={handleRecord} className="w-full bg-blue-100 text-blue-700 py-4 rounded mb-4 font-bold border border-blue-300">
        🎙️ Tap to Speak (Simulate Gemini Flash Voice API)
      </button>
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded mb-4" />
      <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border p-2 rounded mb-4" />
      <button onClick={submit} className="w-full bg-green-600 text-white py-2 rounded">Submit Challenge</button>
    </div>
  );
}
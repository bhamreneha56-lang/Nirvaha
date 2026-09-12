"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Track() {
  const [pid, setPid] = useState("");
  const router = useRouter();
  return (
    <div className="p-8 text-center text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Track a Problem</h1>
      <input type="text" placeholder="PID (e.g. NIR-2026-000100)" onChange={e => setPid(e.target.value)} className="border p-2 rounded mr-2" />
      <button onClick={() => router.push('/track/' + pid)} className="bg-blue-600 text-white px-4 py-2 rounded">Track</button>
    </div>
  );
}
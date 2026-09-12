"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Dashboard() {
  const [name, setName] = useState("Citizen");
  useEffect(() => setName(localStorage.getItem("userName") || "Citizen"), []);
  return (
    <div className="p-8 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Good Morning, {name}</h1>
      <Link href="/report" className="bg-green-600 text-white px-4 py-2 rounded inline-block mb-4">Report a Societal Challenge</Link>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow border">My Challenges: 0</div>
        <div className="bg-white p-4 rounded shadow border">Under Review: 0</div>
      </div>
    </div>
  );
}
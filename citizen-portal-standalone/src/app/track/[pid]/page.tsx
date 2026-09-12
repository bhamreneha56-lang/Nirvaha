"use client";
import { useParams } from "next/navigation";
export default function TrackDetail() {
  const { pid } = useParams();
  return (
    <div className="p-8 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Problem Journey: {pid}</h1>
      <ul className="list-disc pl-5">
        <li className="text-green-600">Submitted - Complete</li>
        <li className="text-blue-600">University Assigned - Current</li>
        <li className="text-gray-400">Deployment - Upcoming</li>
      </ul>
    </div>
  );
}
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen p-8 text-center bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">NIRVAHA Citizen Portal</h1>
      <p className="mb-8">Your Problem. Our Collective Solution.</p>
      <div className="space-x-4">
        <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
        <Link href="/report" className="bg-green-600 text-white px-4 py-2 rounded">Report a Challenge</Link>
        <Link href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded">Dashboard</Link>
        <Link href="/track" className="bg-gray-800 text-white px-4 py-2 rounded">Track PID</Link>
      </div>
    </div>
  );
}
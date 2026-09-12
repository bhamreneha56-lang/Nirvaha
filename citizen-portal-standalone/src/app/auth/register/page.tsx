"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const register = () => {
    localStorage.setItem("userName", name);
    alert("Simulated Registration & OTP successful!");
    router.push("/dashboard");
  };
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Register</h1>
      <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} className="w-full border p-2 rounded mb-4" />
      <button onClick={register} className="w-full bg-blue-600 text-white py-2 rounded">Register & Go to Dashboard</button>
    </div>
  );
}
import Sidebar from "@/components/university/Sidebar";
import type { ReactNode } from "react";

export default function UniversityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0 overflow-x-hidden">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

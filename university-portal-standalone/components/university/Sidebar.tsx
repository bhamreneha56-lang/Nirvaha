"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, ListChecks, Users, FileText, KanbanSquare, BarChart3, User, Menu, X, Zap, ChevronRight } from "lucide-react";
import { university } from "@/lib/mockData";

const navItems = [
  { href: "/university/dashboard",    label: "Dashboard",     icon: LayoutDashboard },
  { href: "/university/challenges",   label: "Challenges",    icon: ListChecks },
  { href: "/university/team-builder", label: "Team Builder",  icon: Users },
  { href: "/university/proposals/new",label: "New Proposal",  icon: FileText },
  { href: "/university/projects",     label: "Projects",      icon: KanbanSquare },
  { href: "/university/analytics",    label: "Analytics",     icon: BarChart3 },
  { href: "/university/profile",      label: "Profile",       icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex-1 py-4 space-y-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link key={href} href={href} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all group ${active ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
            <Icon size={18} className={active ? "text-white" : "text-slate-400 group-hover:text-slate-600"} />
            {label}
            {active && <ChevronRight size={14} className="ml-auto text-indigo-300" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">BIT</div>
          <span className="font-bold text-slate-800 text-sm">NIRVAHA Portal</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-slate-100">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)}>
          <div className="w-72 h-full bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black">BIT</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-tight">BIT Mesra</p>
                  <p className="text-xs text-slate-500">Ranchi, Jharkhand</p>
                </div>
              </div>
            </div>
            <NavLinks />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-slate-200 shadow-sm">
        {/* Logo */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">BIT</div>
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">BIT Mesra</p>
              <p className="text-xs text-slate-500">Ranchi · Deemed University</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 w-fit">
            <Zap size={10} className="fill-green-500 text-green-500" />
            <span className="font-semibold">Verified Institution</span>
          </div>
        </div>

        <NavLinks />

        {/* Sidebar footer stats */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Stats</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Active", value: university.activeProjects },
              { label: "Done", value: university.problemsCompleted },
              { label: "Success", value: `${university.successRate}%` },
              { label: "Rating", value: `⭐ ${university.rating}` },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-sm font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

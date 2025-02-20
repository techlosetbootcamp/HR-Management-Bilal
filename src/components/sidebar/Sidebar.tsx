"use client";

import Link from "next/link";
import { Home, Users, Calendar, ClipboardList, Settings } from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Leaves", href: "/leaves", icon: Calendar },
  { name: "Attendance", href: "/attendance", icon: ClipboardList },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ activePath }: { activePath: string }) {
  return (
    <div className="w-64 text-white h-screen p-4">
      {/* Logo */}
      <div className="text-xl font-bold text-center py-4">HR Dashboard</div>
      
      {/* Navigation */}
      <nav className="mt-4">
        {navLinks.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center px-4 py-2 my-2 rounded-lg transition-colors ${
              activePath === href ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

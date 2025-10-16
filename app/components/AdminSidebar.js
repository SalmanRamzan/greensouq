"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

export default function AdminSidebar({ activeSection, setActiveSection, setFormMode }) {
  const links = [
    { name: "Dashboard" },
    { name: "Analytics" },
    { name: "Categories" },
    { name: "Products" },
    { name: "Users" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-5 pt-10 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <Link href="http://localhost:3000/" target="_blank">
          <Eye className="w-6 h-6 text-gray-600 hover:text-green-600 transition" />
        </Link>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              setActiveSection(link.name);
              setFormMode(null); // reset any open form
            }}
            className={`cursor-pointer text-left px-4 py-2 rounded-lg font-medium transition ${
              activeSection === link.name
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-green-100"
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}

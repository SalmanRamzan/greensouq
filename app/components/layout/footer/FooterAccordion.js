"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function FooterAccordion({ title, links = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-green-600 transition"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden border-t border-gray-300 dark:border-gray-700 py-2">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center text-left font-semibold text-lg"
        >
          {title}
          <ChevronDown
            size={20}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <ul className="mt-2 pl-2 space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-green-600 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

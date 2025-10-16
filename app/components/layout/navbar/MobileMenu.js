// app/components/layout/navbar/MobileMenu.js
"use client";

import { useState } from "react";
import { Menu, X, Search, User, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function MobileMenu({ links = [] }) {
  const [open, setOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState(null); // track expanded dropdown

  const toggleSubLinks = (name) => {
    setExpandedLink(expandedLink === name ? null : name);
  };

  return (
    <>
      {/* Mobile: Menu + Search icons */}
      <div className="flex items-center gap-2 md:hidden">
        <button onClick={() => setOpen(true)} className="text-gray-700 dark:text-gray-300">
          <Menu size={22} />
        </button>
        <button className="text-gray-700 dark:text-gray-300">
          <Search size={22} />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Slide menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with User icon */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <User size={24} className="text-gray-600 dark:text-gray-400" />
          <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-400">
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col p-4 gap-2">
          {links.map((link) => (
            <li key={link.name}>
              {link.subLinks ? (
                <>
                  <button
                    onClick={() => toggleSubLinks(link.name)}
                    className="flex justify-between items-center w-full text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
                  >
                    {link.name}
                    {expandedLink === link.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expandedLink === link.name && (
                    <ul className="flex flex-col ml-4 mt-1 gap-1">
                      {link.subLinks.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className="block text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                            onClick={() => setOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

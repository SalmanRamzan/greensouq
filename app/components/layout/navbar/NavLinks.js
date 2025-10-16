"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function NavLinks({ links = [] }) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <ul
      className={`flex gap-3 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-5 pointer-events-none"
      }`}
    >
      {links.map((link) => (
        <li key={link.name} className="relative group">
          {/* Main link */}
          <Link
            href={link.href}
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium flex items-center gap-1 transition-colors"
          >
            {link.name}
            {link.subLinks && (
              <ChevronDown
                size={16}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            )}
          </Link>

          {/* Sublinks Dropdown */}
          {link.subLinks && (
            <ul className="absolute left-0 top-full mt-3 w-52 bg-white dark:bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out rounded-md z-50">
              {link.subLinks.map((sub) => (
                <li key={sub.name}>
                  <Link
                    href={sub.href}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

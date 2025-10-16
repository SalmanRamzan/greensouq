"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function FooterSocials() {
  const socials = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Youtube, href: "https://youtube.com" },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map(({ icon: Icon, href }, i) => (
        <Link
          key={i}
          href={href}
          className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <Icon size={20} className="text-black dark:text-white" />
        </Link>
      ))}
    </div>
  );
}

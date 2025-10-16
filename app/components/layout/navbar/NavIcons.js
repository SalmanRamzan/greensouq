// app/components/layout/navbar/NavIcons.js
"use client";

import { ShoppingCart, User } from "lucide-react";

export default function NavIcons({ mobile = false }) {
  return (
    <div className={`flex items-center ${mobile ? "gap-4" : "gap-6"}`}>
      {!mobile && (
        <button>
          <User size={24} className="cursor-pointer text-gray-700 dark:text-gray-200" />
        </button>
      )}
      <button className="relative">
        <ShoppingCart size={24} className="cursor-pointer text-gray-700 dark:text-gray-200" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          2
        </span>
      </button>
    </div>
  );
}

// app/components/layout/navbar/NavSearch.js
"use client";

import { Search } from "lucide-react";

export default function NavSearch({ categories = ["All Categories"], placeholder = "What are you looking for?" }) {
  return (
    <div className="relative w-full max-w-xl flex justify-center mx-auto right-36">
      <select className="border border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500">
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-4 py-2 bg-white border-t border-b border-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-white"
      />
      <button className="cursor-pointer bg-black hover:bg-gray-800 px-4 flex items-center justify-center">
        <Search className="text-white" size={20} />
      </button>
    </div>
  );
}

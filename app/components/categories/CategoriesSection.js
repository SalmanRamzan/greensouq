"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // 🔹 Skeleton Loader Component
  const Skeleton = () => (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gray-200 dark:bg-gray-700 mb-3"></div>
      <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-[5%] dark:text-white">
        Top Categories This Week
      </h2>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 px-6">
        {loading ? (
          // 🟢 Show skeletons while loading
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
        ) : categories.length === 0 ? (
          // 🔴 No categories found
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">
            No categories found.
          </p>
        ) : (
          // 🟢 Render real categories
          categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-32 h-32 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-md transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={category.image || "/placeholder.jpg"}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-gray-800 dark:text-gray-300 font-medium text-sm sm:text-base">
                {category.name}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

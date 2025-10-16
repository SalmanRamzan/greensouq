"use client";

import Link from "next/link";

export default function HeroCta() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto">
        <Link href="/shop">Shop Now</Link>
      </button>
      <button className="cursor-pointer border-2 border-green-600 hover:bg-green-600 hover:text-white text-green-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto">
      <Link href="/learn-more">Learn More</Link>
      </button>
    </div>
  );
}

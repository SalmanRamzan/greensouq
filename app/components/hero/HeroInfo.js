"use client";

import HeroCta from "./HeroCta";

export default function HeroInfo() {
  return (
    <div className="flex flex-col justify-center text-center md:text-left space-y-6">
      {/* Gradient caption */}
      <p className="uppercase text-sm font-semibold bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent tracking-wide">
        Freshness Delivered
      </p>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
        Bring Nature’s Touch to Your Home
      </h1>

      {/* Paragraph */}
      <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
        Discover premium indoor plants, pots, and gardening essentials — carefully curated to make your space alive and refreshing.
      </p>

      {/* CTA Buttons */}
      <HeroCta />
    </div>
  );
}

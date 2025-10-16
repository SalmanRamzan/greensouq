"use client";

import HeroInfo from "./HeroInfo";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-lime-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 lg:py-60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left content */}
        <HeroInfo />

        {/* Right image */}
        <HeroImage />
      </div>
    </section>
  );
}

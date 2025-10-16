"use client";

import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="flex justify-center md:justify-end items-center">
      <div className="relative w-[90%] sm:w-[400px] md:w-[550px] lg:w-[700px] xl:w-[850px] h-auto">
        <Image
          src="/hero-plant.jpg" // place your hero image in public folder
          alt="Hero Plant"
          width={1000}
          height={700}
          className="object-contain rounded-2xl drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

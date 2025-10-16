"use client";

import Image from "next/image";
import Link from "next/link";

export default function PromoCard({ image, name, price, link }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group">
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        width={500}
        height={400}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

      {/* Price - top right */}
      <div className="absolute top-3 right-3 text-lime-600 text-4xl font-semibold px-3 py-1">
        {price}
      </div>

      {/* Bottom Left Content */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-base font-semibold mb-3">{name}</h3>
        <Link
          href={link}
          className="bg-black text-white text-base font-medium px-4 py-2 hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageGallery({ images = [], inStock = true, productName = "" }) {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images.length) {
    return (
      <div className="flex items-center justify-center bg-gray-100 h-[400px] rounded-2xl">
        <p className="text-gray-400">No image available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative w-full">
      {/* Breadcrumbs */}
      <div className="w-full mb-4 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-green-600 transition">
          Home
        </Link>
        <span><ChevronRight size={15} /></span>
        <span className="text-gray-700 font-medium truncate">{productName}</span>
      </div>

      

      {/* Main Image */}
      <div
        className="w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full h-[400px] md:h-[500px] group">
          <Image
            src={images[current]}
            alt="Product image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Chevron buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2"
            >
              <ChevronLeft size={25} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2"
            >
              <ChevronRight size={25} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 gap-3 overflow-x-auto scrollbar-hide">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative w-20 h-20 rounded-xl border-2 cursor-pointer ${
              i === current ? "border-green-600" : "border-transparent"
            }`}
            onClick={() => setCurrent(i)}
          >
            <Image
              src={img}
              alt="Thumbnail"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Popup Image Carousel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300"
          >
            <X size={28} />
          </button>

          <div className="relative w-[90%] md:w-[90%] h-[90vh]">
            <Image
              src={images[current]}
              alt="Large view"
              fill
              className="object-contain"
            />

            {/* Carousel Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 hover:text-gray-300"
                >
                  <ChevronLeft size={60} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-gray-300"
                >
                  <ChevronRight size={60} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

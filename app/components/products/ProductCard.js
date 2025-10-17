"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product, onQuickShop }) {
  const [hovered, setHovered] = useState(false);

  const inStock = product?.inStock;
  const hasVariants =
    (product?.heightOptions?.length ?? 0) > 0 ||
    (product?.potOptions?.length ?? 0) > 0 ||
    (product?.soilCoverOptions?.length ?? 0) > 0;

  const badgeLabel = inStock ? "Sale" : "Sold Out";

  return (
    <div className="relative group rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-md transition-all duration-300 w-full h-[450px] flex flex-col justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative flex-shrink-0">
        <Image
          src={product?.images?.[0] || "/placeholder.png"}
          alt={product?.name || "Product Image"}
          width={400}
          height={400}
          className="object-cover w-full h-64 md:h-64 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge */}
        <span
          className={`absolute bottom-2 lg:bottom-0 left-0 px-3 py-1 text-xs font-semibold ${
            inStock ? "bg-black text-white" : "bg-red-500 text-white"
          }`}
        >
          {badgeLabel}
        </span>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-base font-medium mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-500">
            AED {product.discountPrice ?? product.price}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              AED {product.price}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={`flex flex-col md:flex-row justify-center gap-2 p-4 bg-white md:bg-opacity-90 transition-all duration-300 ${
          hovered ? "md:translate-y-0" : "md:translate-y-full"
        } md:group-hover:translate-y-0`}
      >
        <button
          onClick={onQuickShop}
          className="bg-black text-white text-sm font-medium px-3 py-1 w-full cursor-pointer"
        >
          Quick Shop
        </button>
        <button className="bg-black text-white text-sm font-medium px-3 py-1 w-full cursor-pointer">
          {hasVariants ? "Choose Options" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

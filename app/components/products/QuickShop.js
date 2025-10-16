"use client";

import { useState } from "react";
import Image from "next/image";

export default function QuickShop({ product, onClose }) {
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedPot, setSelectedPot] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [quantity, setQuantity] = useState(1);

  const inStock = product?.inStock;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left: Image */}
          <div className="flex justify-center items-center">
            <Image
              src={product?.images?.[0] || "/placeholder.png"}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-xl object-cover shadow-md"
            />
          </div>

          {/* Right: Info */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              {product.name}
            </h2>

            {/* Badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                inStock ? "bg-green-600 text-white" : "bg-red-500 text-white"
              }`}
            >
              {inStock ? "Sale" : "Sold Out"}
            </span>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                Rs {product.discountPrice ?? product.price}
              </span>
              {product.discountPrice && (
                <span className="text-gray-500 line-through text-lg">
                  Rs {product.price}
                </span>
              )}
            </div>

            {/* Variants */}
            {product.heightOptions?.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Height
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedHeight}
                  onChange={(e) => setSelectedHeight(e.target.value)}
                >
                  <option value="">Select height</option>
                  {product.heightOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.potOptions?.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Pot
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedPot}
                  onChange={(e) => setSelectedPot(e.target.value)}
                >
                  <option value="">Select pot</option>
                  {product.potOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.soilCoverOptions?.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Soil Cover
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={selectedSoil}
                  onChange={(e) => setSelectedSoil(e.target.value)}
                >
                  <option value="">Select soil cover</option>
                  {product.soilCoverOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <div className="flex items-center border rounded-lg w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-lg font-bold"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button className="bg-black text-white py-2 rounded-lg w-full cursor-pointer">
                Add to Cart
              </button>
              <button className="bg-gray-900 text-white py-2 rounded-lg w-full cursor-pointer">
                Buy Now
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm pt-4 border-t">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

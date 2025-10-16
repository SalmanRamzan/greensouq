"use client";

import { Gift } from "lucide-react";
import { useState } from "react";

export default function ProductInfo({ product }) {
  const [height, setHeight] = useState("");
  const [pot, setPot] = useState("");
  const [soil, setSoil] = useState("");
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="space-y-6">
      {/* Name + Badge */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{product.name}</h1>
        {!product.inStock ? (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1">
            Sold Out
          </span>
        ) : (
          <span className="bg-black text-white text-xs font-bold px-3 py-1">
            Sale
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-lime-600">
          AED {product.discountPrice || product.price}
        </span>
        {product.discountPrice && (
          <span className="text-gray-500 line-through text-sm">
            AED {product.price}
          </span>
        )}
      </div>

      {/* Dropdowns for variants */}
      <div className="space-y-4">
        <select
          className="w-full border rounded px-3 py-2"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        >
          <option value="">Select Height</option>
          {product.heightOptions?.map((h) => (
            <option key={h}>{h}</option>
          ))}
        </select>

        <select
          className="w-full border rounded px-3 py-2"
          value={pot}
          onChange={(e) => setPot(e.target.value)}
        >
          <option value="">Select Pot</option>
          {product.potOptions?.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          className="w-full border rounded px-3 py-2"
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
        >
          <option value="">Select Soil Cover</option>
          {product.soilCoverOptions?.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Quantity + Add to Cart */}
      <p className="text-base font-bold">Quantity</p>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center border">
          <button
            onClick={decreaseQty}
            className="px-3 py-1 text-lg font-semibold border-r hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 text-lg font-medium">{quantity}</span>
          <button
            onClick={increaseQty}
            className="px-3 py-1 text-lg font-semibold border-l hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          disabled={!product.inStock}
          className={`px-5 py-2 w-full text-white font-medium transition ${
            product.inStock
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      </div>

      {/* Buy Now */}
      <button
        disabled={!product.inStock}
        className={`w-full bg-black text-white py-3 text-lg font-medium hover:bg-green-700 transition ${
          !product.inStock && "opacity-60 cursor-not-allowed"
        }`}
      >
        Buy Now
      </button>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Promotional Message */}
      <div className="border-t pt-4 text-sm text-gray-600">
        <Gift />
        <p className="font-medium">Free returns on all eligible orders</p>
        <p>You have 7 days to request a return. All sale items are final sale.</p>
      </div>
    </div>
  );
}

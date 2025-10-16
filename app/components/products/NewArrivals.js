"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import QuickShop from "./QuickShop";
import Link from "next/link";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setProducts(sorted);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-[5%] dark:text-white">
        New Arrivals
      </h2>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 place-items-center">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickShop={() => setSelectedProduct(product)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        )}
      </div>

      {/* Shop Collection Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/shop"
          className="bg-black text-white px-4 py-2 text-sm md:text-base font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Shop Collection
        </Link>
      </div>

      {/* Quick Shop Modal */}
      {selectedProduct && (
        <QuickShop
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

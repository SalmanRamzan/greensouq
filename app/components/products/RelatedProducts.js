"use client";

import ProductCard from "./ProductCard";

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section>
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

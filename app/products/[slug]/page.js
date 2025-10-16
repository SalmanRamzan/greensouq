// app/products/[slug]/page.js
"use client";

import { use, useEffect, useState } from "react";
import ImageGallery from "../../components/products/ImageGallery";
import ProductInfo from "../../components/products/ProductInfo";
import RelatedProducts from "../../components/products/RelatedProducts";

export default function ProductPage({ params }) {
  const { slug } = use(params); // ✅ modern Next.js unwrapping

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // 🔹 Fetch specific product by slug
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);

        // 🔹 Fetch related products (same category)
        const relatedRes = await fetch(`/api/products?categoryId=${data.categoryId}`);
        const relatedData = await relatedRes.json();

        // Exclude the current product from related list
        setRelated(relatedData.filter((p) => p.id !== data.id));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();
  }, [slug]);

  // 🟡 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading product...</p>
      </div>
    );
  }

  // 🔴 No product found
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );
  }

  // 🟢 Main UI
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 lg:py-60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ImageGallery images={product.images} inStock={product.inStock} productName={product.name} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-16">
        <RelatedProducts products={related} />
      </div>
    </section>
  );
}

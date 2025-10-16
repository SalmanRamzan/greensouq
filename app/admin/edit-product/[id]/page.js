"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch single product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        const p = data.find((item) => item.id === id);
        setProduct(p);
      } catch (err) {
        console.error(err);
        showToast("❌ Failed to fetch product", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update product");
      showToast("✅ Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to update product", "error");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6 text-red-600">Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" defaultValue={product.name} placeholder="Name" className="input" />
          <input type="text" name="slug" defaultValue={product.slug} placeholder="Slug" className="input" />
          <input type="text" name="categoryId" defaultValue={product.categoryId} placeholder="Category ID" className="input" />
          <input type="number" name="price" defaultValue={product.price} placeholder="Price" className="input" />
          <input type="number" name="discountPrice" defaultValue={product.discountPrice || ""} placeholder="Discount Price" className="input" />
          <select name="inStock" defaultValue={product.inStock.toString()} className="input">
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        <textarea name="description" defaultValue={product.description} placeholder="Description" className="input w-full" />

        <input type="text" name="heightOptions" defaultValue={product.heightOptions?.join(", ")} placeholder="Height Options (comma separated)" className="input w-full" />
        <input type="text" name="potOptions" defaultValue={product.potOptions?.join(", ")} placeholder="Pot Options (comma separated)" className="input w-full" />
        <input type="text" name="soilCoverOptions" defaultValue={product.soilCoverOptions?.join(", ")} placeholder="Soil Cover Options (comma separated)" className="input w-full" />
        <textarea name="variants" defaultValue={product.variants ? JSON.stringify(product.variants) : ""} placeholder="Variants (JSON)" className="input w-full" />
        <input type="file" name="images" multiple className="input w-full" />

        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Update Product
        </button>
      </form>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-5 py-3 rounded-xl shadow-lg text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {toast.message}
          </div>
        </div>
      )}

      <style jsx>{`
        .input {
          border: 1px solid #ddd;
          padding: 8px 12px;
          border-radius: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

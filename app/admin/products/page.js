"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Delete product API call
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      showToast("Product deleted successfully");
      fetchProducts(); // Refresh table
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to delete product", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🌿 Products Management</h1>
        {/* <Link
          href="/admin/add-product"
          className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
        >
          Add New Product
        </Link> */}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 rounded-t-xl">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Images</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Discount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Height Options</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pot Options</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Soil Cover Options</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Variants</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Stock</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created At</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p, index) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>

                  {/* Images */}
                  <td className="px-4 py-2">
                    {p.images?.length > 0 ? (
                      <div className="flex -space-x-6">
                        {p.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${p.name}-${idx}`}
                            className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-sm"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </td>

                  {/* Name & Category */}
                  <td className="px-4 py-2 text-sm text-gray-800">{p.name}</td>
                  <td className="px-4 py-2 text-sm text-sky-600 font-medium">
                    <Link href="/admin/categories">{p.category?.name || "-"}</Link>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-2 w-80 text-sm text-gray-600">{p.description}</td>

                  {/* Price & Discount */}
                  <td className="px-4 py-2 text-sm text-gray-800">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm text-green-600">
                    {p.discountPrice ? `$${p.discountPrice.toFixed(2)}` : "-"}
                  </td>

                  {/* Options */}
                  <td className="px-4 py-2 w-36 text-sm text-gray-800">{p.heightOptions?.join(", ") || "-"}</td>
                  <td className="px-4 py-2 w-36 text-sm text-gray-800">{p.potOptions?.join(", ") || "-"}</td>
                  <td className="px-4 py-2 w-36 text-sm text-gray-800">{p.soilCoverOptions?.join(", ") || "-"}</td>

                  {/* Variants */}
                  <td className="px-4 py-2 w-36 text-sm text-gray-800">{p.variants ? JSON.stringify(p.variants) : "-"}</td>

                  {/* Stock */}
                  <td className="px-4 py-2">
                    {p.inStock ? (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  {/* Created At */}
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}{" at "}
                    {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/admin/edit-product/${p.id}`}
                      className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-5 py-3 rounded-xl shadow-lg text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } animate-slide-up`}
            role="status"
          >
            {toast.message}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.28s ease-out;
        }
      `}</style>
    </div>
  );
}

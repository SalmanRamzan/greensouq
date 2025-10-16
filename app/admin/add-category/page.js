"use client";
import { useState } from "react";
import Link from "next/link";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 🧩 Generate slug automatically
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setSlug(value.toLowerCase().replace(/\s+/g, "-"));
  };

  // 🖼️ Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // 🚀 Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      if (image) formData.append("image", image);

      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create category");

      const data = await res.json();

      showToast(`Category "${data.name}" added successfully!`, "success");

      // Reset form
      setName("");
      setSlug("");
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      showToast("❌ Failed to create category", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 flex flex-col items-center relative">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Indoor Plants"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            />
          </div>

          {/* Slug (auto-generated) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 cursor-not-allowed"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded-lg w-full h-48 object-cover border"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full py-2.5 rounded-lg font-semibold text-white flex justify-center items-center gap-2 ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Adding..." : "Add Category"}
          </button>

          {/* ➕ View All Categories Button */}
          {/* <Link
            href="/admin/categories"
            className="block w-full mt-3 text-center py-2.5 rounded-lg font-semibold border border-green-600 text-green-600 hover:bg-green-50 transition-colors duration-200"
          >
            View All Categories
          </Link> */}
        </form>
      </div>

      {/* ✅ Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-5 py-3 rounded-xl shadow-lg text-white z-50 animate-slide-up ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ✨ Custom Animation */}
      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

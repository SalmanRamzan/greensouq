"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [toast, setToast] = useState(null);

  // ✅ Show toast message
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        showToast("Category deleted successfully!");
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setDeleting(null);
    }
  };

  // Open Edit Modal
  const handleEdit = (category) => {
    setEditingCategory({ ...category });
    setPreviewImage(category.image);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dzdxloz04/image/upload", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      setEditingCategory((prev) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  // Save updated category
  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("name", editingCategory.name);
    formData.append("slug", editingCategory.slug);
    formData.append("image", editingCategory.image);

    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        setCategories((prev) =>
          prev.map((cat) => (cat.id === updated.id ? updated : cat))
        );
        setEditingCategory(null);
        showToast("Category has been updated!");
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading categories...</p>;

  return (
    <div className="p-6 relative">
      {/* 🔹 Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🌿 Categories Management</h1>

        {/* <Link
          href="/admin/add-category"
          className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
        >
          Add New Category
        </Link> */}
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200 bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Slug</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 text-sm">
              {categories.map((category, index) => (
                <tr
                  key={category.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{category.name}</td>
                  <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="cursor-pointer px-4 py-1.5 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={deleting === category.id}
                      className={`cursor-pointer px-4 py-1.5 rounded-lg text-white text-sm font-medium transition ${
                        deleting === category.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deleting === category.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Edit Category
            </h2>

            {/* Image Preview */}
            <div className="flex justify-center mb-4">
              <div className="w-full h-60 relative rounded-lg overflow-hidden border border-gray-200">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <p className="text-sm text-gray-400 flex items-center justify-center h-full">
                    No image
                  </p>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <label className="block mb-3">
              <span className="text-gray-700 text-sm">Upload New Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 cursor-pointer"
              />
              {uploading && (
                <p className="text-blue-500 text-sm mt-1">Uploading...</p>
              )}
            </label>

            {/* Name Input */}
            <label className="block mb-3">
              <span className="text-gray-700 text-sm">Category Name</span>
              <input
                type="text"
                name="name"
                value={editingCategory.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </label>

            {/* Slug Input */}
            <label className="block mb-4">
              <span className="text-gray-700 text-sm">Slug</span>
              <input
                type="text"
                name="slug"
                value={editingCategory.slug}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </label>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setEditingCategory(null)}
                className="cursor-pointer px-4 py-2 text-sm font-medium bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading || saving}
                className="cursor-pointer px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:bg-green-400 flex items-center justify-center"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

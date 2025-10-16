"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * AddProductPage
 * - Fetches categories
 * - Shows form to add product matching Product schema
 * - No external toast lib; custom toast implemented here
 */
export default function AddProductPage() {
  const [categories, setCategories] = useState([]);
  const [fetchingCats, setFetchingCats] = useState(true);

  const [name, setName] = useState("Aglaonema Pattaya Beauty");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("Aglaonema is commonly used indoor plant in interior landscape. Commonly called as \"Chinese Evergreen plant\". Pattaya Beauty is easy to care and great for use in an office or home. Aglaonema, Pattaya Beauty is tolerant of lower light levels, often found in the home or office.");
  const [price, setPrice] = useState("75");
  const [discountPrice, setDiscountPrice] = useState("50");
  const [inStock, setInStock] = useState(true);

  const [heightOptions, setHeightOptions] = useState("30-40cm, 50-60cm");
  const [potOptions, setPotOptions] = useState("Default Plastic Pot, White Ceramic Pot");
  const [soilCoverOptions, setSoilCoverOptions] = useState("White Pebbles, Pine Mulch, Clay Stones");

  // Optional JSON mapping for variant -> price (string input)
  // Example: {"Small":1000,"Medium":1500}
  const [variantsJson, setVariantsJson] = useState('{"30-40cm": 50, "50-60cm": 95, "Default Plastic Pot": 50, "White Ceramic Pot": 90}');

  // Multiple images (File objects) + preview URLs
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

  // Fetch categories once
  useEffect(() => {
    let mounted = true;
    async function loadCats() {
      setFetchingCats(true);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        if (mounted) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        showToast("❌ Failed to load categories", "error");
      } finally {
        if (mounted) setFetchingCats(false);
      }
    }
    loadCats();
    return () => {
      mounted = false;
      // revoke object URLs
      imagePreviews.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-generate slug from name (but keep editable)
  useEffect(() => {
    if (!name) return setSlug("");
    const auto = name
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(auto);
  }, [name]);

  // Handle file selection (multiple)
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // append new files
    const nextFiles = [...imageFiles, ...files];
    setImageFiles(nextFiles);

    // create previews for new files
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove a selected image by index
  const removeImageAt = (index) => {
    setImageFiles((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
    setImagePreviews((prev) => {
      const copy = [...prev];
      // revoke URL to avoid memory leak
      URL.revokeObjectURL(copy[index]);
      copy.splice(index, 1);
      return copy;
    });
  };

  // Show toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Validate variants JSON (optional) before sending
  const parseVariants = () => {
    if (!variantsJson.trim()) return null;
    try {
      const parsed = JSON.parse(variantsJson);
      // ensure it's object or array
      if (typeof parsed === "object") return JSON.stringify(parsed);
      throw new Error("variants must be a JSON object");
    } catch (err) {
      throw new Error("Variants JSON is invalid: " + err.message);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // basic validation
      if (!name.trim() || !slug.trim() || !description.trim() || !price || !e.target.categoryId.value) {
        showToast("Please fill required fields", "error");
        setLoading(false);
        return;
      }

      // prepare FormData
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("slug", slug.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      if (discountPrice) formData.append("discountPrice", discountPrice);
      formData.append("inStock", inStock ? "true" : "false");

      // send comma-separated strings - backend will split into arrays
      formData.append("heightOptions", heightOptions.trim());
      formData.append("potOptions", potOptions.trim());
      formData.append("soilCoverOptions", soilCoverOptions.trim());

      // variants as JSON string if present
      try {
        const v = parseVariants();
        if (v) formData.append("variants", v);
      } catch (err) {
        showToast(err.message, "error");
        setLoading(false);
        return;
      }

      formData.append("categoryId", e.target.categoryId.value);

      // append multiple images under name "images"
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => formData.append("images", file));
      }

      // Send request
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.error("create product failed:", errBody);
        showToast(errBody?.error || "Failed to create product", "error");
        setLoading(false);
        return;
      }

      const created = await res.json();
      showToast("Product added successfully!", "success");

      // reset form (and revoke object URLs)
      imagePreviews.forEach((u) => URL.revokeObjectURL(u));
      setImageFiles([]);
      setImagePreviews([]);
      setName("");
      setSlug("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setInStock(true);
      setHeightOptions("");
      setPotOptions("");
      setSoilCoverOptions("");
      setVariantsJson("");
      // Optionally navigate to product list or show created.id

    } catch (err) {
      console.error(err);
      showToast("❌ Unexpected error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Fill details, upload images, and define variants. Variants can be comma-separated strings.
                </p>
            </div>
            <Link
                href="/admin/products"
                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow transition flex"
                >
                View All Products
            </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* row: name, slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Snake Plant"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated from name, editable"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* price + discount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (required) *</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g. 1500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (optional)</label>
              <input
                type="number"
                step="0.01"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g. 1299"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <div
                className="flex items-center gap-3"
                title={inStock ? "In stock" : "Out of stock"}
              >
                <span className="text-sm text-gray-600">Out</span>
                <button
                  type="button"
                  onClick={() => setInStock((s) => !s)}
                  className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
                    inStock ? "bg-green-600" : "bg-gray-300"
                  }`}
                  aria-pressed={inStock}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                      inStock ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">In</span>
              </div>
            </div>
          </div>

          {/* variants - comma separated */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height Options (comma)</label>
              <input
                value={heightOptions}
                onChange={(e) => setHeightOptions(e.target.value)}
                placeholder="Small,Medium,Large"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pot Options (comma)</label>
              <input
                value={potOptions}
                onChange={(e) => setPotOptions(e.target.value)}
                placeholder="Plastic,Ceramic,Clay"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soil Cover Options (comma)</label>
              <input
                value={soilCoverOptions}
                onChange={(e) => setSoilCoverOptions(e.target.value)}
                placeholder="Pebbles,Moss"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* optional variants JSON mapping */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Variants Price Mapping (optional JSON)</label>
            <textarea
              value={variantsJson}
              onChange={(e) => setVariantsJson(e.target.value)}
              placeholder='e.g. {"Small":1200,"Medium":1500,"Large":1800} (optional)'
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* category + image uploader */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="categoryId"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                defaultValue=""
              >
                <option value="" disabled>
                  {fetchingCats ? "Loading categories..." : "Select category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images (multiple)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">You can upload multiple images. Preview shown below; you can remove before uploading.</p>

              {/* previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative w-full h-24 rounded overflow-hidden border">
                      <img src={src} alt={`preview-${i}`} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={() => removeImageAt(i)}
                        className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* submit */}
          <div className="pt-2">
            <button
              className={`w-full inline-flex justify-center items-center gap-2 py-3 rounded-lg text-white font-semibold transition-colors cursor-pointer ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>

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

      {/* animations */}
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

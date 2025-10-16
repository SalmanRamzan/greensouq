"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0, // optional
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);

        // Fetch products and categories only (users optional)
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setStats({
          totalProducts: productsData.length,
          totalCategories: categoriesData.length,
          totalUsers: 0, // Set 0 if users API not implemented
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-10 w-10 text-green-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center py-10">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <h2 className="text-sm font-medium text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
        </div>

        {/* Total Categories */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <h2 className="text-sm font-medium text-gray-500">Total Categories</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalCategories}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
          <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Other info section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Products</h2>
          <p className="text-gray-500 text-sm">Quick overview of the latest added products.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Categories</h2>
          <p className="text-gray-500 text-sm">Quick overview of the latest added categories.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend,
  ResponsiveContainer
} from "recharts";

export default function AdminAnalyticsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF4C4C"];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center py-10">Loading analytics...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  // --- Data Transformations ---

  // Products per Category
  const productsPerCategory = categories.map((cat) => ({
    name: cat.name,
    count: products.filter((p) => p.category?.id === cat.id).length,
  }));

  // Stock Status
  const inStockCount = products.filter((p) => p.inStock).length;
  const outStockCount = products.length - inStockCount;
  const stockData = [
    { name: "In Stock", value: inStockCount },
    { name: "Out of Stock", value: outStockCount },
  ];

  // Top 5 expensive products
  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .map((p) => ({ name: p.name, price: p.price }));

  // Price distribution (ranges)
  const priceRanges = [
    { range: "$0-$50", count: products.filter((p) => p.price <= 50).length },
    { range: "$51-$100", count: products.filter((p) => p.price > 50 && p.price <= 100).length },
    { range: "$101-$200", count: products.filter((p) => p.price > 100 && p.price <= 200).length },
    { range: "$201-$500", count: products.filter((p) => p.price > 200 && p.price <= 500).length },
    { range: "$500+", count: products.filter((p) => p.price > 500).length },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Products per Category */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Products per Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productsPerCategory}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Status */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stockData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top 5 Expensive Products</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ left: 30, right: 30 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="price" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Price Distribution */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Price Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priceRanges}>
              <XAxis dataKey="range" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

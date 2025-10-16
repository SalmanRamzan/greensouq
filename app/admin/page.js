"use client";

import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminProductsPage from "./products/page";
import AdminCategoriesPage from "./categories/page";
import AddProductForm from "./add-product/page";
import AddCategoryForm from "./add-category/page";
import AdminDashboardPage from "./dashboard/page";
import AdminAnalyticsPage from "./analytics/page"; // ✅ Import analytics

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [formMode, setFormMode] = useState(null); // "add-product" | "add-category" | null

  const links = [
    { name: "Dashboard" },
    { name: "Analytics" },
    { name: "Categories" },
    { name: "Products" },
    { name: "Users" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen py-32">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setFormMode={setFormMode}
      />

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Dashboard */}
        {activeSection === "Dashboard" && <AdminDashboardPage />}

        {/* Analytics */}
        {activeSection === "Analytics" && <AdminAnalyticsPage />}

        {/* Categories */}
        {activeSection === "Categories" && (
          <>
            {formMode === "add-category" ? (
              <AddCategoryForm onCancel={() => setFormMode(null)} />
            ) : (
              <>
                <button
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => setFormMode("add-category")}
                >
                  Add New Category
                </button>
                <AdminCategoriesPage />
              </>
            )}
          </>
        )}

        {/* Products */}
        {activeSection === "Products" && (
          <>
            {formMode === "add-product" ? (
              <AddProductForm onCancel={() => setFormMode(null)} />
            ) : (
              <>
                <button
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => setFormMode("add-product")}
                >
                  Add New Product
                </button>
                <AdminProductsPage />
              </>
            )}
          </>
        )}

        {/* Users */}
        {activeSection === "Users" && (
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Users Section</h1>
        )}
      </main>
    </div>
  );
}

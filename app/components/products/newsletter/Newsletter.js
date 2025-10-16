"use client";

export default function Newsletter() {
  return (
    <section className="py-12 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get the latest updates, exclusive offers, and new arrivals directly in your inbox.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition w-full lg:w-auto"
          >
            Signup
          </button>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function Back2Top() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile screen
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    // Show button after scrolling
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("resize", checkScreen);
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <>
      {/* Desktop View */}
      {!isMobile && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 bg-white shadow-lg border hover:bg-gray-100 transition-all p-3 z-50"
          aria-label="Back to Top"
        >
          <ChevronUp size={22} className="text-gray-800" />
        </button>
      )}

      {/* Mobile View */}
      {isMobile && (
        <button
          onClick={scrollToTop}
          className="sticky cursor-pointer bottom-0 w-full bg-white shadow-md border-t border-gray-200 text-gray-800 py-3 flex items-center justify-center gap-2 font-medium z-50"
        >
          <ChevronUp size={18} className="text-gray-800" />
          Back To Top
        </button>
      )}
    </>
  );
}

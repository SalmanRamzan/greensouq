"use client";

import { MessageCircle } from "lucide-react";

export default function Whatsapp() {
  const phoneNumber = "03043754421"; // your WhatsApp number
  const message =
    "Hi! 👋 I’d like to know more about your products."; // default message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed cursor-pointer bottom-20 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-8" />
    </button>
  );
}

"use client";

import Image from "next/image";

export default function Copyright() {
  return (
    <div className="w-full border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Copyright Text */}
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center md:text-left">
          © {new Date().getFullYear()} Green Souq. All Rights Reserved.
          <br />
          <span className="text-xs">Made by Engineer Salman Ramzan.</span>
        </p>

        {/* Right: Payment Method Icons */}
        <div className="flex items-center gap-3">
          <Image
            src="/amex.png"
            alt="American Express"
            width={40}
            height={20}
            className="object-contain"
          />
          <Image
            src="/mastercard.png"
            alt="MasterCard"
            width={40}
            height={25}
            className="object-contain"
          />
          <Image
            src="/visa.png"
            alt="Visa"
            width={40}
            height={25}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

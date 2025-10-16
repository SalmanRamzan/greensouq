"use client";

import PromoCard from "./PromoCard";

const promoData = [
  {
    image: "/promo-plant1.webp",
    name: "Peace Lily",
    price: "AED 89",
    link: "/product/peace-lily",
  },
  {
    image: "/promo-plant2.webp",
    name: "Snake Plant",
    price: "AED 99",
    link: "/product/snake-plant",
  },
  {
    image: "/promo-plant3.webp",
    name: "Areca Palm",
    price: "AED 129",
    link: "/product/areca-palm",
  },
];

export default function PromotionalCards() {
  return (
    <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoData.map((item, index) => (
          <PromoCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

// app/components/layout/navbar/Navbar.js
"use client";

import Brand from "./Brand";
import NavSearch from "./NavSearch";
import NavInfo from "./NavInfo";
import NavIcons from "./NavIcons";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const links = [
    {
      name: "Indoor Plants",
      href: "/indoor-plants",
      subLinks: [
        { name: "Air Purifying Plants", href: "/indoor-plants/air-purifying" },
        { name: "Low Light Plants", href: "/indoor-plants/low-light" },
        { name: "Succulents & Cacti", href: "/indoor-plants/succulents-cacti" },
        { name: "Flowering Indoor Plants", href: "/indoor-plants/flowering" },
        { name: "Office Plants", href: "/indoor-plants/office" },
        { name: "Hanging Plants", href: "/indoor-plants/hanging" },
        { name: "Mini Table Plants", href: "/indoor-plants/mini-table" },
        { name: "Lucky Bamboo", href: "/indoor-plants/lucky-bamboo" },
      ],
    },
    {
      name: "Outdoor Plants",
      href: "/outdoor-plants",
      subLinks: [
        { name: "Flowering Plants", href: "/outdoor-plants/flowering" },
        { name: "Fruit Plants", href: "/outdoor-plants/fruit" },
        { name: "Shade Plants", href: "/outdoor-plants/shade" },
        { name: "Climbers & Creepers", href: "/outdoor-plants/climbers" },
        { name: "Herbal Plants", href: "/outdoor-plants/herbal" },
        { name: "Seasonal Plants", href: "/outdoor-plants/seasonal" },
        { name: "Ground Covers", href: "/outdoor-plants/ground-covers" },
        { name: "Shrubs & Bushes", href: "/outdoor-plants/shrubs" },
      ],
    },
    {
      name: "Soil & Stones",
      href: "/soil-stones",
      subLinks: [
        { name: "Potting Mix", href: "/soil-stones/potting-mix" },
        { name: "Organic Soil", href: "/soil-stones/organic" },
        { name: "Coco Peat", href: "/soil-stones/coco-peat" },
        { name: "Perlite", href: "/soil-stones/perlite" },
        { name: "Vermiculite", href: "/soil-stones/vermiculite" },
        { name: "Gravel Stones", href: "/soil-stones/gravel" },
        { name: "Pebbles", href: "/soil-stones/pebbles" },
        { name: "Decorative Rocks", href: "/soil-stones/decorative-rocks" },
      ],
    },
    {
      name: "Fertilizer & Pesticides",
      href: "/fertilizer-pesticides",
      subLinks: [
        { name: "Organic Fertilizers", href: "/fertilizer-pesticides/organic" },
        { name: "Compost", href: "/fertilizer-pesticides/compost" },
        { name: "Liquid Fertilizers", href: "/fertilizer-pesticides/liquid" },
        { name: "NPK Fertilizers", href: "/fertilizer-pesticides/npk" },
        { name: "Bio Pesticides", href: "/fertilizer-pesticides/bio" },
        { name: "Insecticides", href: "/fertilizer-pesticides/insecticides" },
        { name: "Fungicides", href: "/fertilizer-pesticides/fungicides" },
        { name: "Plant Growth Boosters", href: "/fertilizer-pesticides/boosters" },
      ],
    },
    {
      name: "Pots & Planters",
      href: "/pots-planters",
      subLinks: [
        { name: "Ceramic Pots", href: "/pots-planters/ceramic" },
        { name: "Plastic Pots", href: "/pots-planters/plastic" },
        { name: "Terracotta Pots", href: "/pots-planters/terracotta" },
        { name: "Hanging Planters", href: "/pots-planters/hanging" },
        { name: "Self-Watering Pots", href: "/pots-planters/self-watering" },
        { name: "Metal Planters", href: "/pots-planters/metal" },
        { name: "Wooden Planters", href: "/pots-planters/wooden" },
        { name: "Decorative Planters", href: "/pots-planters/decorative" },
      ],
    },
    {
      name: "Seeds",
      href: "/seeds",
      subLinks: [
        { name: "Flower Seeds", href: "/seeds/flower" },
        { name: "Vegetable Seeds", href: "/seeds/vegetable" },
        { name: "Fruit Seeds", href: "/seeds/fruit" },
        { name: "Herb Seeds", href: "/seeds/herb" },
        { name: "Grass Seeds", href: "/seeds/grass" },
        { name: "Organic Seeds", href: "/seeds/organic" },
        { name: "Hybrid Seeds", href: "/seeds/hybrid" },
        { name: "Exotic Seeds", href: "/seeds/exotic" },
      ],
    },
    {
      name: "Hydroponics",
      href: "/hydroponics",
      subLinks: [
        { name: "Hydroponic Kits", href: "/hydroponics/kits" },
        { name: "Nutrient Solutions", href: "/hydroponics/nutrients" },
        { name: "Grow Lights", href: "/hydroponics/grow-lights" },
        { name: "pH & EC Meters", href: "/hydroponics/ph-ec-meters" },
        { name: "Net Pots", href: "/hydroponics/net-pots" },
        { name: "Growing Media", href: "/hydroponics/media" },
        { name: "Hydroponic Seeds", href: "/hydroponics/seeds" },
        { name: "Accessories", href: "/hydroponics/accessories" },
      ],
    },
    {
      name: "Garden Services",
      href: "/garden-services",
      subLinks: [
        { name: "Lawn Maintenance", href: "/garden-services/lawn-maintenance" },
        { name: "Landscape Design", href: "/garden-services/landscape-design" },
        { name: "Plant Care", href: "/garden-services/plant-care" },
        { name: "Pest Control", href: "/garden-services/pest-control" },
        { name: "Irrigation Setup", href: "/garden-services/irrigation" },
        { name: "Vertical Gardens", href: "/garden-services/vertical-gardens" },
        { name: "Balcony Gardens", href: "/garden-services/balcony-gardens" },
        { name: "Garden Renovation", href: "/garden-services/renovation" },
      ],
    },
    {
      name: "Plant Talk",
      href: "/plant-talk",
      subLinks: [
        { name: "Gardening Tips", href: "/plant-talk/tips" },
        { name: "Plant Care Guides", href: "/plant-talk/care-guides" },
        { name: "DIY Garden Ideas", href: "/plant-talk/diy" },
        { name: "Beginner’s Corner", href: "/plant-talk/beginners" },
        { name: "Indoor Decor Ideas", href: "/plant-talk/indoor-decor" },
        { name: "Plant Disease Solutions", href: "/plant-talk/disease-solutions" },
        { name: "Fertilizing Schedule", href: "/plant-talk/fertilizing-schedule" },
        { name: "Watering Guide", href: "/plant-talk/watering-guide" },
      ],
    },
  ];  

  return (
    <>
      <nav className="w-full bg-lime-400 dark:bg-gray-900 shadow-md fixed z-50 p-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile: Menu icon */}
            <div className="flex items-center md:hidden">
              <MobileMenu links={links} />
            </div>

            {/* Center: Logo */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Brand />
            </div>

            {/* Desktop: Search bar */}
            <div className="hidden md:flex flex-1 justify-center">
              <NavSearch categories={["All Categories", "Plants", "Pots", "Soil"]} />
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              {/* Desktop: NavInfo + icons */}
              <div className="hidden md:flex items-center gap-6">
                <NavInfo />
                <NavIcons />
              </div>
              {/* Mobile: Cart icon only */}
              <div className="md:hidden">
                <NavIcons mobile />
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex justify-center py-2">
            <NavLinks links={links} />
          </div>
        </div>
      </nav>

      {/* NavInfo for mobile below navbar */}
      <div className="md:hidden bg-white dark:bg-gray-900 shadow px-4 py-2 flex justify-center items-center gap-1">
        <NavInfo />
      </div>
    </>
  );
}

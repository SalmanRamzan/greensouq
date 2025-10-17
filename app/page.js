import CategoriesSection from "./components/categories/CategoriesSection";
import Hero from "./components/hero/Hero";
import IndoorPlants from "./components/products/IndoorPlants";
import OutdoorPlants from "./components/products/OutdoorPlants";
import NewArrivals from "./components/products/NewArrivals";
import Newsletter from "./components/products/newsletter/Newsletter";
import PromotionalCards from "./components/promotions/PromotionalCards";


export default function Home() {
  return (
    <>
      <Hero />
      <PromotionalCards />
      <CategoriesSection />
      <IndoorPlants />
      <OutdoorPlants />
      <NewArrivals />
      <Newsletter />
    </>
  );
}

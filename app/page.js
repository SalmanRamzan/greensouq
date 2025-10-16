import CategoriesSection from "./components/categories/CategoriesSection";
import Hero from "./components/hero/Hero";
import NewArrivals from "./components/products/NewArrivals";
import Newsletter from "./components/products/newsletter/Newsletter";
import PromotionalCards from "./components/promotions/PromotionalCards";


export default function Home() {
  return (
    <>
      <Hero />
      <PromotionalCards />
      <CategoriesSection />
      <NewArrivals />
      <Newsletter />
    </>
  );
}

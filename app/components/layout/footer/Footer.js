"use client";

import FooterSocials from "./FooterSocials";
// import FooterColumn from "./FooterColumn";
import FooterAccordion from "./FooterAccordion";
import FooterContact from "./FooterContact";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <>
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <FooterSocials />
          </div>

          {/* Find It Fast */}
          <FooterAccordion
            title="Find It Fast"
            links={[
              { name: "Latest Blogs", href: "/blogs" },
              { name: "FAQs", href: "/faqs" },
            ]}
          />

          {/* Important Links */}
          <FooterAccordion
            title="Important Links"
            links={[
              { name: "About Us", href: "/about" },
              { name: "Contact Us", href: "/contact" },
              { name: "Shipping Charges", href: "/shipping" },
              { name: "Terms & Conditions", href: "/terms" },
            ]}
          />

          {/* Hot Links */}
          <FooterAccordion
            title="Hot Links"
            links={[
              { name: "My Account", href: "/account" },
              { name: "Checkout", href: "/checkout" },
              { name: "Your Cart", href: "/cart" },
              { name: "Privacy Policy", href: "/privacy" },
            ]}
          />

          {/* Contact Info */}
          <FooterContact
            info={{
              Mobile: "+971 58 512 1105",
              Email: "info@greensouq.ae",
            }}
          />
        </div>
      </div>
    </footer>

    <Copyright />
    </>
  );
}

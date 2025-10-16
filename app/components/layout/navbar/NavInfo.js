// app/components/layout/navbar/NavInfo.js
"use client";

import { Phone, Mail } from "lucide-react";

export default function NavInfo({ phone = "+971 58 512 1105", email = "info@greensouq.ae" }) {
  return (
    <div className="flex lg:flex-col flex-row text-sm text-gray-700 dark:text-gray-300 gap-3 lg:gap-0">
      <div className="flex items-center gap-1">
        <Phone size={16} />
        <span>{phone}</span>
      </div>
      <div className="flex items-center gap-1">
        <Mail size={16} />
        <span>{email}</span>
      </div>
    </div>
  );
}

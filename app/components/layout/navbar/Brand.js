"use client";

import Image from "next/image";
import Link from "next/link";

export default function Brand({
  logoText = "Green Souq",
  logoUrl = "/",
  logoSrc = "/logo.png", // image in public folder
}) {
  const hasLogo = logoSrc && logoSrc.trim() !== "";

  return (
    <Link
      href={logoUrl}
      className="flex items-center gap-2 text-2xl font-bold dark:text-white"
    >
      {hasLogo ? (
        <Image
          src={logoSrc}
          alt={logoText}
          width={220}
          height={220}
          className="size-40 lg:size-60 object-contain"
          priority
        />
      ) : (
        <span>{logoText}</span>
      )}
    </Link>
  );
}

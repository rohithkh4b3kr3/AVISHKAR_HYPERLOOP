"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";

// Navbar has a default export: `export default function Navbar() { ... }`
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

// Cursor is a NAMED export: `export function Cursor() { ... }` or `export const Cursor = ...`
const Cursor = dynamic(
  () => import("@/components/Cursor").then((mod) => mod.Cursor),
  {
    ssr: false,
  }
);

export default function RootComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen">
      <Cursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

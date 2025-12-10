"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/image.png";
import { NAV_ITEMS } from "../Constants";

const orderedLabels = [
  "Home",
  "Media",
  "Pod",
  "Partners",
  "Infrastructure",
  "Blog",
  "Contact Us",
];

// FIXED: Removed backdropFilter from animation (Framer Motion v11 does not allow)
const menuVariants: Variants = {
  open: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const containerVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.25 }
  }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const navItems = orderedLabels
    .map((label) => NAV_ITEMS.find((item) => item.label === label))
    .filter(Boolean) as { label: string; href: string }[];

  // FIXED cleanup return type
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="relative font-tech">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logo}
            width={48}
            height={48}
            alt="Logo"
            className="object-contain rounded-md transition-transform duration-300 group-hover:scale-110"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-semibold tracking-[0.18em] text-white">
              AVISHKAR
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] text-white/50 group-hover:text-green-500 transition-colors">
              HYPERLOOP
            </span>
          </div>
        </Link>

        {/* MENU BUTTON */}
        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={() => setOpen((prev) => !prev)}
          className="w-12 h-12 rounded-md bg-white/5 border border-white/10 text-3xl text-green-400 hover:text-white hover:border-green-400/40 flex items-center justify-center transition-all duration-300"
        >
          {open ? "✕" : "☰"}
        </motion.button>
      </header>

      {/* FULLSCREEN MENU */}
      <motion.aside
        animate={open ? "open" : "closed"}
        variants={menuVariants}
        className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-xl z-40 flex justify-center items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="closed"
          animate={open ? "open" : "closed"}
          className="flex flex-col gap-6 text-center"
        >
          {navItems.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <Link
                href={item.href}
                onClick={() => {
                  setActive(item.label);
                  setOpen(false);
                }}
                className={`group uppercase tracking-[0.22em] text-2xl sm:text-3xl md:text-4xl transition-all duration-500 relative overflow-visible ${
                  active === item.label ? "text-white" : "text-green-400/80 hover:text-white"
                }`}
              >
                <span className="relative inline-block glitch-text" data-text={item.label}>
                  {item.label}
                </span>

                <span className="absolute left-1/2 -bottom-2 w-0 h-[2px] bg-green-500 group-hover:w-full transition-all duration-500 -translate-x-1/2"></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.aside>
    </div>
  );
}

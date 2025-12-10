"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const [heroStyle, setHeroStyle] = useState({
    opacity: 1,
    transform: "translateY(0px)",
  });

  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const newOpacity = Math.max(0, 1 - scrollY / 500);
        const newTranslateY = -scrollY * 0.25; // slightly reduced factor

        setHeroStyle({
          opacity: newOpacity,
          transform: `translateY(${newTranslateY}px)`,
        });

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative z-10">
      <section className="h-screen w-full flex items-center relative px-6 md:px-12 lg:px-24 overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source
              src="https://avishkarhyperloop.com/videos/VfxVideo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* Content */}
        <div
          className="text-left space-y-6 z-10 max-w-2xl mt-12 md:mt-0 will-change-transform pointer-events-none relative"
          style={heroStyle}
        >
          <div className="flex items-center gap-4">
            <span className="text-green-500 text-[10px] md:text-xs font-tech tracking-[0.4em] uppercase opacity-90 animate-pulse">
              Welcome to the Future
            </span>
          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-green-500 to-green-300 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-tech tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
            HYPERLOOP
            <br />
            <span className="font-light">
              FOR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-400 to-green-600">
                INDIA
              </span>
            </span>
          </h1>

          <p className="max-w-md text-gray-300 font-light text-sm md:text-base leading-relaxed pt-4 border-l-2 border-green-500/50 pl-6 backdrop-blur-sm bg-black/10">
            Pioneering the fifth mode of transport. Avishkar Hyperloop is
            building a sustainable, high-speed future for global connectivity.
          </p>

          <div className="pt-6 pointer-events-auto">
            <button className="group relative px-8 py-4 bg-green-600/10 border border-green-500 text-white font-bold font-tech text-sm tracking-widest overflow-hidden transition-all hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                DISCOVER OUR POD
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

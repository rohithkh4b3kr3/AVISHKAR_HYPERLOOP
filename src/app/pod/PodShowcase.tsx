"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Gauge, Weight, Zap } from "lucide-react";
import { POD_MODELS } from "@/Constants";

// Lazy-load 3D model ONLY on desktop + in-view
const PodModelCanvas = dynamic(() => import("./PodModel"), { ssr: false });

/* ============================================================================
   TYPES
============================================================================ */

interface PodStats {
  maxSpeed: string;
  weight: string;
  propulsion: string;
  levitation: string;
}

interface PodItem {
  id: number;
  name: string;
  modelUrl?: string;
  image?: string;
  description: string;
  stats: PodStats;
}

interface SectionProps {
  pod: PodItem;
  index: number;
  total: number;
}

/* ============================================================================
   FIXED & SAFE useInView HOOK — 100% Vercel-Compatible
============================================================================ */

function useInView(ref: React.RefObject<HTMLDivElement>, threshold = 0.25) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

/* ============================================================================
   MAIN SHOWCASE WRAPPER
============================================================================ */

export default function PodShowcase() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="bg-[#050505]">
      {POD_MODELS.map((pod, index) => (
        <HorizontalParallaxSection
          key={pod.id}
          pod={pod}
          index={index}
          total={POD_MODELS.length}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

/* ============================================================================
   SECTION COMPONENT
============================================================================ */

interface SectionWithMobileProps extends SectionProps {
  isMobile: boolean;
}

function HorizontalParallaxSection({
  pod,
  index,
  total,
  isMobile,
}: SectionWithMobileProps) {
  // FIXED ref (null! avoids TS errors)
  const ref = useRef<HTMLDivElement>(null!);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const modelX = useTransform(scrollYProgress, [0, 0.5, 1], ["-160px", "0px", "60px"]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ["160px", "0px", "-40px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0]);

  // Only load 3D when section is visible
  const isInView = useInView(ref, 0.35);
  const show3D = !isMobile && isInView && !!pod.modelUrl;

  return (
    <section
      ref={ref}
      className="relative h-[160vh] w-full bg-[#050505] overflow-hidden"
    >
      <motion.div
        style={{ opacity }}
        className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-16"
      >
        {/* Section Label */}
        <div className="absolute top-10 left-6 md:left-10 text-[10px] md:text-xs text-gray-500 font-tech tracking-[0.4em] uppercase">
          POD {index + 1} / {total}
        </div>

        <div className="relative w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT SIDE — Model / Image */}
          <motion.div
            style={{ x: modelX }}
            className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl"
          >
            {show3D ? (
              <PodModelCanvas url={pod.modelUrl!} />
            ) : (
              <img
                src={pod.image || "/fallback-pod.jpg"}
                className="w-full h-full object-cover"
                alt={pod.name}
              />
            )}
          </motion.div>

          {/* RIGHT SIDE — TEXT */}
          <motion.div
            style={{ x: textX }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <div>
              <p className="text-green-500 font-tech tracking-[0.4em] text-[10px] md:text-xs uppercase mb-1">
                Engineering Fleet
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-tech font-bold text-white leading-tight">
                {pod.name}
              </h2>
            </div>

            <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl">
              {pod.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Spec title="Max Speed" icon={<Gauge size={18} />} value={pod.stats.maxSpeed} />
              <Spec title="Weight" icon={<Weight size={18} />} value={pod.stats.weight} />

              <div className="col-span-2 bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Zap size={18} />
                  <span className="text-[10px] md:text-xs font-tech tracking-widest uppercase">
                    Propulsion
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg md:text-2xl font-tech font-bold text-white">
                    {pod.stats.propulsion}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 tracking-wide uppercase">
                    {pod.stats.levitation}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================================
   SPEC COMPONENT
============================================================================ */

function Spec({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl">
      <div className="flex items-center gap-3 text-gray-400 mb-1">
        {icon}
        <span className="text-[10px] md:text-xs font-tech tracking-widest uppercase">
          {title}
        </span>
      </div>
      <div className="text-white font-tech font-bold text-lg md:text-2xl">
        {value}
      </div>
    </div>
  );
}

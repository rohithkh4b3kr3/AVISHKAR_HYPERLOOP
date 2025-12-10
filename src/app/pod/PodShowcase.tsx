"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Gauge, Weight, Zap } from "lucide-react";
import { POD_MODELS } from "@/Constants";

const PodModelCanvas = dynamic(() => import("./PodModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/70">
      Loading 3D Model…
    </div>
  ),
});

// -----------------------------
// TYPES
// -----------------------------
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
  isMobile: boolean;
}

// -----------------------------
// SAFE useInView
// -----------------------------
function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.3) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

// -----------------------------
// MAIN COMPONENT
// -----------------------------
export default function PodShowcase() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="bg-black">
      {POD_MODELS.map((pod, index) => (
        <HorizontalSection
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

// -----------------------------
// SINGLE SECTION
// -----------------------------
function HorizontalSection({ pod, index, total, isMobile }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Framer Scroll Tracking (used only for desktop styling)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const modelX = useTransform(scrollYProgress, [0, 0.5, 1], ["-120px", "0px", "60px"]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], ["120px", "0px", "-40px"]);

  const isInView = useInView(ref, 0.4);

  // Mobile → always show static image
  // Desktop → show model only when in view
  const show3D = !isMobile && isInView && !!pod.modelUrl;

  return (
    <section
      ref={ref}
      className={`relative w-full bg-black ${
        isMobile ? "min-h-screen py-24 px-6" : "h-[160vh]"
      }`}
    >
      <motion.div
        // On mobile: no parallax opacity, just normal
        style={isMobile ? undefined : { opacity }}
        className={`${
          isMobile ? "h-full" : "sticky top-0 h-screen"
        } flex items-center justify-center px-0 md:px-20`}
      >
        {/* Section Marker */}
        <div className="absolute top-10 left-6 md:left-10 text-[10px] text-gray-500 font-tech tracking-[0.4em] uppercase pointer-events-none">
          POD {index + 1} / {total}
        </div>

        <div className="relative w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* MODEL / IMAGE */}
          <motion.div
            style={isMobile ? undefined : { x: modelX }}
            className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-xl"
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

          {/* TEXT */}
          <motion.div
            style={isMobile ? undefined : { x: textX }}
            className="flex flex-col gap-5 md:gap-8"
          >
            <div>
              <p className="text-green-500 font-tech tracking-[0.4em] text-[10px] uppercase mb-2">
                Engineering Fleet
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-tech font-bold text-white leading-tight">
                {pod.name}
              </h2>
            </div>

            <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl">
              {pod.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Spec title="Max Speed" icon={<Gauge size={18} />} value={pod.stats.maxSpeed} />
              <Spec title="Weight" icon={<Weight size={18} />} value={pod.stats.weight} />

              <div className="col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Zap size={18} />
                  <span className="text-[10px] font-tech tracking-widest uppercase">
                    Propulsion
                  </span>
                </div>
                <div className="flex justify-between items-end gap-4">
                  <div className="text-lg md:text-2xl text-white font-tech font-bold">
                    {pod.stats.propulsion}
                  </div>
                  <div className="text-[10px] text-gray-500 tracking-wider uppercase text-right">
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

// -----------------------------
// SPEC CARD
// -----------------------------
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
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
      <div className="flex items-center gap-3 text-gray-400 mb-1">
        {icon}
        <span className="text-[10px] font-tech tracking-widest uppercase">{title}</span>
      </div>
      <div className="text-white font-tech font-bold text-base md:text-2xl">{value}</div>
    </div>
  );
}

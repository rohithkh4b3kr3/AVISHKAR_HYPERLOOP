"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Gauge, Weight, Zap } from "lucide-react";
import { POD_MODELS } from "@/Constants";

const PodModelCanvas = dynamic(() => import("./PodModel"), { ssr: false });

export default function PodShowcase() {
  return (
    <div className="bg-[#050505]">
      {POD_MODELS.map((pod, index) => (
        <HorizontalParallaxSection
          key={pod.id}
          pod={pod}
          index={index}
          total={POD_MODELS.length}
        />
      ))}
    </div>
  );
}

function HorizontalParallaxSection({ pod, index, total }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // -----------------------------
  // HORIZONTAL SLIDE + PARALLAX
  // -----------------------------
  const modelX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-300px", "0px", "100px"] // left → center → slight drift right
  );

  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["300px", "0px", "-80px"] // right → center → slight drift left
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative h-[180vh] w-full bg-[#050505]"
    >
      <motion.div
        style={{ opacity }}
        className="sticky top-0 h-screen flex items-center justify-center px-8 md:px-20"
      >
        {/* Section index */}
        <div className="absolute top-10 left-10 text-xs text-gray-500 font-tech tracking-[0.4em] uppercase pointer-events-none">
          POD {index + 1} / {total}
        </div>

        <div className="relative w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* MODEL - moves left ➔ center ➔ right drift */}
          <motion.div
            style={{ x: modelX }}
            className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl"
          >
            {pod.modelUrl ? (
              <PodModelCanvas url={pod.modelUrl} />
            ) : (
              <img src={pod.image} className="w-full h-full object-cover" />
            )}
          </motion.div>

          {/* TEXT - moves right ➔ center ➔ left drift */}
          <motion.div style={{ x: textX }} className="flex flex-col gap-8">
            <div>
              <p className="text-green-500 font-tech tracking-[0.4em] text-xs uppercase">
                Engineering Fleet
              </p>
              <h2 className="text-5xl md:text-7xl font-tech font-bold text-white leading-tight">
                {pod.name}
              </h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {pod.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              <Spec title="Max Speed" icon={<Gauge size={18} />} value={pod.stats.maxSpeed} />
              <Spec title="Weight" icon={<Weight size={18} />} value={pod.stats.weight} />

              <div className="col-span-2 bg-white/5 border border-white/10 p-5 rounded-xl">
                <div className="flex items-center gap-3 text-gray-400 mb-2">
                  <Zap size={18} />
                  <span className="text-xs font-tech tracking-widest uppercase">
                    Propulsion
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xl md:text-2xl text-white font-tech font-bold">
                    {pod.stats.propulsion}
                  </div>
                  <div className="text-xs text-gray-500 tracking-wider uppercase">
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

function Spec({ title, icon, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
      <div className="flex items-center gap-3 text-gray-400 mb-1">
        {icon}
        <span className="text-xs font-tech tracking-widest uppercase">{title}</span>
      </div>
      <div className="text-white font-tech font-bold text-2xl">{value}</div>
    </div>
  );
}

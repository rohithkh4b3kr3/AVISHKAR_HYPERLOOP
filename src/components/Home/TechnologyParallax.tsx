"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Zap, Magnet, Wind, Cpu } from "lucide-react";

/* ======================================================
   TEXT DATA
====================================================== */
const TECH_DATA = [
  {
    id: "propulsion",
    title: "LINEAR INDUCTION DRIVE",
    subtitle: "CONTACTLESS HIGH-THRUST PROPULSION",
    description:
      "Garuda’s DSLIM propulsion system induces eddy currents in the aluminium rail to generate thrust without mechanical contact. This enables high reliability and highly efficient acceleration.",
    icon: Zap,
  },
  {
    id: "levitation",
    title: "MAGNETIC LEVITATION & GUIDANCE",
    subtitle: "ELECTROMAGNETIC SUSPENSION ARCHITECTURE",
    description:
      "EMS actuators generate lift and lateral stability, keeping the pod centred in the tube at all speeds.",
    icon: Magnet,
  },
  {
    id: "vacuum",
    title: "LOW-PRESSURE TUBE",
    subtitle: "NEAR-VACUUM TEST ENVIRONMENT",
    description:
      "The dedicated Hyperloop vacuum tube reduces aerodynamic drag by orders of magnitude, enabling realistic high-speed system validation.",
    icon: Wind,
  },
  {
    id: "ai",
    title: "AUTONOMOUS CONTROL SYSTEM",
    subtitle: "REAL-TIME DECISION ENGINE",
    description:
      "A distributed embedded control layer oversees propulsion, levitation, braking, and telemetry under a real-time OS for maximum stability.",
    icon: Cpu,
  },
];

/* ======================================================
   ULTRA-SMOOTH ROTATING POD
   (Always 60FPS, No Lag)
====================================================== */

function PodModel() {
  const { scene } = useGLTF("/models/pod-v2.glb");
  const ref = useRef<THREE.Object3D>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Constant smooth rotation — NO LAG
    ref.current.rotation.y += delta * 0.6; // 0.6 rad/sec

    // Gentle breathing motion
    ref.current.position.z = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Slight side float (premium effect)
    ref.current.position.x =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.05;

    // Pod always faces clean forward axis
    ref.current.rotation.x = 0;
  });

  return <primitive ref={ref} object={scene} scale={0.7} />;
}

useGLTF.preload("/models/pod-v2.glb");

/* ======================================================
   TEXT SLIDE
====================================================== */

function TechSlide({
  item,
  index,
  total,
  progress,
}: {
  item: any;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = start + segment;

  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const x = useTransform(progress, [start, mid, end], ["15%", "0%", "-10%"]);

  const Icon = item.icon;

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 flex items-center"
    >
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Icon size={18} />
          </div>
          <span className="text-emerald-400 font-tech text-[10px] uppercase tracking-[0.3em]">
            {item.subtitle}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-tech font-bold text-white leading-tight mb-4">
          {item.title}
        </h2>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed border-l-2 border-emerald-500/40 pl-4 py-3 bg-black/25 backdrop-blur-sm">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ======================================================
   MAIN COMPONENT — LAG FREE VERSION
====================================================== */

export function TechnologyParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = TECH_DATA.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${total * 120}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative max-w-6xl mx-auto h-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10">

          {/* LEFT — Rotating Pod */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(34,197,94,0.25),transparent_70%)] blur-2xl opacity-60" />

            <Canvas camera={{ position: [0, 0.4, 3], fov: 20 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[2, 3, 3]} intensity={1.0} />

              <React.Suspense fallback={null}>
                <PodModel />
              </React.Suspense>
            </Canvas>
          </div>

          {/* RIGHT — Sliding Text */}
          <div className="relative w-full md:w-1/2 h-[320px] md:h-[360px]">
            {TECH_DATA.map((item, i) => (
              <TechSlide
                key={item.id}
                item={item}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-tech tracking-[0.35em]">
          SCROLL TO EXPLORE • POD ROTATES SMOOTHLY
        </div>
      </div>
    </section>
  );
}

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
      "Garuda’s custom DSLIM motor induces eddy currents in aluminium rails to generate thrust without mechanical contact. This eliminates wheel-slip, improves reliability, and ensures high-efficiency acceleration.",
    icon: Zap,
  },
  {
    id: "levitation",
    title: "MAGNETIC LEVITATION & GUIDANCE",
    subtitle: "ELECTROMAGNETIC SUSPENSION ARCHITECTURE",
    description:
      "EMS actuators provide both lift and lateral centering. The pod levitates while maintaining precise guidance, enabling scalable Hyperloop networks.",
    icon: Magnet,
  },
  {
    id: "vacuum",
    title: "LOW-PRESSURE HYPERLOOP TUBE",
    subtitle: "NEAR-VACUUM TEST CORRIDOR",
    description:
      "A dedicated low-pressure tube at IIT Madras significantly reduces aerodynamic drag. Pod 2 is engineered to operate in this extreme environment for realistic high-speed validation.",
    icon: Wind,
  },
  {
    id: "ai",
    title: "AUTONOMOUS POD CONTROL",
    subtitle: "REAL-TIME SENSE, DECIDE, ACT",
    description:
      "An advanced distributed control stack handles propulsion, levitation, braking, and failsafe systems. Telemetry feeds a real-time OS to continuously refine performance margins.",
    icon: Cpu,
  },
];

/* ======================================================
   POD THAT ALWAYS FACES THE USER + SMOOTH INTERACTION
====================================================== */

function PodModel({ scrollZ }: { scrollZ: MotionValue<number> }) {
  const { scene } = useGLTF("/models/pod-v2.glb");
  const ref = useRef<THREE.Object3D>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slight mouse-parallax (premium effect, tiny movement)
    const targetX = state.mouse.x * 0.2;
    const targetY = -state.mouse.y * 0.1;

    // Lerp for smooth motion
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetX,
      0.08
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      targetY,
      0.08
    );

    // Scroll-based forward motion (train coming at viewer)
    ref.current.position.z = scrollZ.get();

    // ALWAYS face user (no rotation away)
    ref.current.rotation.set(-0, 1, 0.2);
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
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
}) {
  const segment = 1 / total;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = start + segment;

  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const x = useTransform(progress, [start, mid, end], ["0%", "0%", "-10%"]);

  const Icon = item.icon;

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 flex items-center"
    >
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 flex items-center justify-center">
            <Icon size={20} />
          </div>
          <span className="text-emerald-400 font-tech text-[10px] uppercase tracking-[0.3em]">
            {item.subtitle}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-tech font-bold text-white leading-tight mb-4">
          {item.title}
        </h2>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed border-l-2 border-emerald-400/40 pl-4 py-3 bg-black/30 backdrop-blur-sm">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ======================================================
   MAIN COMPONENT — OPTIMIZED
====================================================== */

export function TechnologyParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pod moves forward -5 → -1 on scroll
  const scrollZ = useTransform(scrollYProgress, [0, 1], [-5, -1]);

  const total = TECH_DATA.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${total * 120}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-10 gap-10">

          {/* LEFT: POD */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] flex justify-center items-center">
            {/* clean glow */}
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(34,197,94,0.25),transparent_70%)] blur-2xl opacity-60" />

            <Canvas camera={{ position: [0, 0.2, 4], fov: 42 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[2, 3, 3]} intensity={1.1} />

              <React.Suspense fallback={null}>
                <PodModel scrollZ={scrollZ} />
              </React.Suspense>
            </Canvas>
          </div>

          {/* RIGHT: TEXT */}
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

        {/* SCROLL LABEL */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-tech tracking-[0.35em]">
          SCROLL TO EXPLORE • POD FOLLOWS YOUR CURSOR
        </div>
      </div>
    </section>
  );
}

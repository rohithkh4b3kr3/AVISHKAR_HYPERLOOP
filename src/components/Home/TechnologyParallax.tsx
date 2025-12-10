'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Zap, Magnet, Wind, Cpu } from 'lucide-react';

type TechItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
};

const TECH_DATA: TechItem[] = [
  {
    id: 'propulsion',
    title: 'LINEAR INDUCTION DRIVE',
    subtitle: 'CONTACTLESS HIGH-THRUST PROPULSION',
    description:
      'Garuda, Avishkar’s latest pod, uses a custom Double-Sided Linear Induction Motor (DSLIM) designed in-house. The stator runs along the pod and induces eddy currents in the aluminium track to generate thrust, eliminating wheel–rail slip and cutting mechanical losses for clean, repeatable acceleration.',
    icon: Zap,
  },
  {
    id: 'levitation',
    title: 'MAGNETIC LEVITATION & GUIDANCE',
    subtitle: 'ELECTROMAGNETIC SUSPENSION ARCHITECTURE',
    description:
      'Electromagnetic Suspension (EMS) units generate both lift and lateral guidance. Vertical actuators lift the pod off the rail, while lateral modules keep it centred. The magnetic track beneath is engineered to carry strong flux efficiently, making the levitation system practical to scale to longer Hyperloop corridors.',
    icon: Magnet,
  },
  {
    id: 'vacuum',
    title: 'LOW-PRESSURE HYPERLOOP TUBE',
    subtitle: 'NEAR-VACUUM TEST CORRIDOR',
    description:
      'At IIT Madras’ Discovery Campus, Avishkar helps operate a dedicated low-pressure tube and long test track. This corridor dramatically reduces aerodynamic drag compared to open air, allowing propulsion, levitation and braking systems to be tested under conditions far closer to a real Hyperloop route.',
    icon: Wind,
  },
  {
    id: 'ai',
    title: 'AUTONOMOUS POD CONTROL',
    subtitle: 'REAL-TIME SENSE, DECIDE, ACT',
    description:
      'Garuda’s embedded stack uses distributed controllers, a real-time operating system and dense sensor feedback. The control layer manages propulsion, levitation and braking while logging rich telemetry, so each run improves stability, safety margins and overall system efficiency for the next iteration.',
    icon: Cpu,
  },
];

/* ---------- 3D BACKGROUND WITH pod-v2.glb ---------- */

function PodMesh() {
  const { scene } = useGLTF('/models/pod-v1.glb');
  return (
    <primitive
      object={scene}
      scale={1.1}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 6, 0]}
    />
  );
}
useGLTF.preload('/models/pod-v3.glb');

function PodBackground3D({ progress }: { progress: MotionValue<number> }) {
  // Parallax drift of the whole canvas as you scroll
  const bgX = useTransform(progress, [0, 1], ['-6%', '6%']);

  return (
    <motion.div
      style={{ x: bgX }}
      className="absolute inset-0 pointer-events-none"
    >
      <Canvas
        camera={{ position: [2, 1, 4.0], fov: 45 }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.1} />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} />

        <React.Suspense
          fallback={
            <Html center>
              <div className="text-white text-xs font-tech tracking-[0.3em] uppercase">
                Loading pod…
              </div>
            </Html>
          }
        >
          <PodMesh />
        </React.Suspense>

        {/* Slow auto-rotation for background feel */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>

      {/* Overlays to keep text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
    </motion.div>
  );
}

/* ---------- TEXT SLIDES (PARALLAX) ---------- */

function TechSlide({
  item,
  index,
  total,
  progress,
}: {
  item: TechItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  // Slide in from right → center → slight drift left, with blur and fade
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const x = useTransform(progress, [start, mid, end], ['18%', '0%', '-8%']);
  const blur = useTransform(progress, [start, mid, end], [10, 0, 10]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  const Icon = item.icon;

  return (
    <motion.div
      style={{ opacity, x, filter: blurFilter }}
      className="absolute left-0 top-1/2 -translate-y-1/2 w-full"
    >
      <div className="max-w-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full border border-green-500/40 bg-green-900/20 text-green-400 flex items-center justify-center">
            <Icon size={20} />
          </div>
          <span className="text-green-400 font-tech tracking-[0.25em] text-[10px] md:text-xs uppercase">
            {item.subtitle}
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-tech font-bold text-white leading-tight mb-4">
          {item.title}
        </h2>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed border-l-2 border-white/10 pl-4 py-2  backdrop-blur-sm">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- MAIN EXPORT ---------- */

export const TechnologyParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = TECH_DATA.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which slide is roughly active for the right-side indicator
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(
      total - 1,
      Math.max(0, Math.floor(v * total))
    );
    setActiveIndex(idx);
  });

  return (
    <section
      ref={containerRef}
      id="infrastructure"
      className="relative min-h-[380vh] bg-black"
    >
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* 3D pod background with parallax drift */}
        <PodBackground3D progress={scrollYProgress} />

        {/* Foreground content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex items-center h-full">
          {/* Section label */}
          <div className="hidden md:block absolute top-10 left-8 md:left-16 text-[10px] tracking-[0.35em] text-white/40 font-tech uppercase">
            AVISHKAR HYPERLOOP · CORE SYSTEMS
          </div>

          {/* Text slides */}
          <div className="relative w-full">
            {TECH_DATA.map((item, index) => (
              <TechSlide
                key={item.id}
                item={item}
                index={index}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* Right-side indicator (visual only, based on scroll) */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5">
            {TECH_DATA.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                <span
                  className={`font-tech text-[10px] tracking-widest text-white transition-opacity duration-300 ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  0{index + 1}
                </span>
                <div
                  className={`w-1 rounded-full transition-all duration-400 ${
                    activeIndex === index
                      ? 'bg-green-500 h-14 shadow-[0_0_12px_rgba(34,197,94,0.8)]'
                      : 'bg-white/25 h-10'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/45 text-[10px] md:text-xs font-tech tracking-[0.35em]">
          SCROLL TO EXPLORE TECHNOLOGY
        </div>
      </div>
    </section>
  );
};

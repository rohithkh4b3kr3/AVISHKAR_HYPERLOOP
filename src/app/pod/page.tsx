"use client";

import React, { useEffect } from "react";
import PodShowcase from "./PodShowcase";

import {
  Cpu,
  Shield,
  Activity,
  Battery,
  Server,
  Radio,
  Database,
  Layers,
} from "lucide-react";

export default function Podpage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specs = [
    { icon: Cpu, label: "Avionics", value: "Triple Redundant" },
    { icon: Battery, label: "Power", value: "Li-Po High Discharge" },
    { icon: Shield, label: "Chassis", value: "Carbon Fiber Monocoque" },
    { icon: Activity, label: "Telemetry", value: "Real-time 5GHz" },
    { icon: Radio, label: "Comms", value: "Low Latency Mesh" },
    { icon: Server, label: "Processing", value: "Edge AI Units" },
    { icon: Database, label: "Logging", value: "Blackbox Grade" },
    { icon: Layers, label: "Braking", value: "Pneumatic Friction" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#050505] pt-20">
      {/* Hangar Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581093588401-fbb0736d9438?q=80&w=2500&auto=format&fit=crop"
            alt="Hangar Background"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <div className="flex flex-col items-center">
            <div className="px-4 py-1 border border-green-500/30 bg-green-900/10 rounded-full mb-6 backdrop-blur-md">
              <span className="text-green-400 font-tech tracking-[0.5em] text-[10px] uppercase">
                Restricted Access // Level 5
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-tech font-bold text-white tracking-tighter mb-4">
              THE HANGAR
            </h1>
            <p className="text-gray-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Step inside our engineering facility. Explore the evolution of our
              pod prototypes, from initial proof-of-concept to our latest Mach
              1.0 designs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pod Showcase (with 3D model inside PodShowcase) */}
      <PodShowcase />

      {/* Technical Specifications Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="mb-12 border-l-4 border-green-500 pl-6">
          <span className="text-green-500 font-tech tracking-[0.3em] text-sm uppercase block mb-2">
            Internal Systems
          </span>
          <h2 className="text-4xl md:text-5xl font-tech font-bold text-white">
            SYSTEM ARCHITECTURE
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-gray-400 group-hover:text-green-400 group-hover:border-green-500/50 transition-all mb-4">
                <spec.icon size={20} />
              </div>
              <span className="text-gray-500 text-xs font-tech tracking-widest uppercase block mb-1">
                {spec.label}
              </span>
              <span className="text-white font-tech font-bold text-lg">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";
import React, { useEffect } from 'react';
import { Layers, Thermometer, Wind, Zap, Activity, Construction, ArrowDown } from 'lucide-react';
import { INFRASTRUCTURE_DATA } from '@/Constants';

export default function InfrastructurePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?q=80&w=2500&auto=format&fit=crop" 
            alt="Tube Infrastructure" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-in fade-in zoom-in duration-1000">
           <span className="text-green-500 font-tech tracking-[0.5em] text-xs uppercase block mb-4">Civil Engineering</span>
           <h1 className="text-5xl md:text-8xl font-tech font-bold tracking-tighter mb-6">
             THE VEIN OF<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">THE FUTURE</span>
           </h1>
           <p className="text-gray-400 font-light text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
             A low-pressure vacuum tube network designed for Mach 1.0 speeds. Our infrastructure minimizes land use, eliminates weather dependency, and connects cities in minutes.
           </p>
        </div>

        <div className="absolute bottom-10 animate-bounce text-white/20">
            <ArrowDown size={24} />
        </div>
      </section>

      {/* Interactive Schematic Section (Stylized) */}
      <section className="py-24 px-6 md:px-12 bg-neutral-900/30 border-y border-white/5 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Text */}
            <div className="flex-1 space-y-8">
               <h2 className="text-4xl md:text-5xl font-tech font-bold text-white">TUBE ANATOMY</h2>
               <p className="text-gray-400 leading-relaxed">
                  The hyperloop tube is a marvel of structural engineering. It creates a near-vacuum environment (0.001 atm) allowing pods to travel with minimal air resistance. The structure is elevated on pylons to protect against ground movements and wildlife.
               </p>
               
               <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                     <Layers className="text-green-500" />
                     <div>
                        <h4 className="font-tech font-bold text-white">Steel Shell</h4>
                        <span className="text-xs text-gray-500 uppercase">20mm Reinforced Steel</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                     <Wind className="text-green-500" />
                     <div>
                        <h4 className="font-tech font-bold text-white">Vacuum Seal</h4>
                        <span className="text-xs text-gray-500 uppercase">Industrial Grade Sealant</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Abstract Cross-Section Visualization */}
            <div className="flex-1 w-full flex justify-center">
               <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-[20px] border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                     {/* Inner Tube */}
                     <div className="w-[85%] h-[85%] rounded-full border-[2px] border-green-500/20 bg-black flex items-center justify-center relative overflow-hidden">
                        {/* Track / Rail */}
                        <div className="absolute bottom-10 w-32 h-2 bg-green-900/50"></div>
                        <div className="absolute bottom-12 w-24 h-4 bg-green-500 box-shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
                        
                        {/* Atmosphere Particles */}
                        <div className="absolute inset-0 opacity-20">
                           <div className="w-1 h-1 bg-white absolute top-10 left-10 animate-pulse"></div>
                           <div className="w-1 h-1 bg-white absolute top-20 right-20 animate-pulse delay-75"></div>
                           <div className="w-1 h-1 bg-white absolute bottom-10 left-1/2 animate-pulse delay-150"></div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-green-500 text-[10px] font-tech tracking-widest uppercase">Outer Shell</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-green-500 text-[10px] font-tech tracking-widest uppercase">Maglev Track</div>
               </div>
            </div>
         </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
         <div className="mb-16 text-center">
            <span className="text-green-500 font-tech tracking-[0.3em] text-sm uppercase">Components</span>
            <h2 className="text-4xl md:text-5xl font-tech font-bold mt-2">NETWORK SYSTEMS</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INFRASTRUCTURE_DATA.map((item) => (
               <div key={item.id} className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 rounded-2xl group hover:border-green-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-black rounded-lg border border-white/20 flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-black transition-colors">
                     {item.id === 1 && <Wind size={24} />}
                     {item.id === 2 && <Thermometer size={24} />}
                     {item.id === 3 && <Construction size={24} />}
                     {item.id === 4 && <Zap size={24} />}
                  </div>
                  <h3 className="text-xl font-tech font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20">
                     {item.description}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                     <span className="text-green-400 font-tech text-lg font-bold">{item.stats}</span>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Timeline / Roadmap */}
      <section className="py-24 bg-neutral-900/20 px-6">
         <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-tech font-bold text-center mb-16">CONSTRUCTION TIMELINE</h2>
             
             <div className="relative border-l-2 border-white/10 ml-6 md:ml-0 md:pl-0 space-y-12">
                {[
                   { year: '2023', title: 'Route Planning', desc: 'Feasibility studies completed for the Madras-Bangalore corridor.' },
                   { year: '2024', title: 'Land Acquisition', desc: 'Partnership with government bodies for pylon placement.' },
                   { year: '2025', title: 'Vacuum Test Track', desc: '500m prototype tube construction begins at discovery campus.' },
                   { year: '2028', title: 'Cargo Operations', desc: 'Initial freight tests at subsonic speeds.' },
                ].map((item, i) => (
                   <div key={i} className="relative pl-12 md:pl-0 md:flex md:items-center md:gap-12 group">
                      <div className="md:w-1/2 md:text-right">
                         <span className="text-green-500 font-bold font-tech text-xl">{item.year}</span>
                         <h4 className="text-white text-xl font-bold">{item.title}</h4>
                      </div>
                      <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-[5px] w-3 h-3 rounded-full bg-neutral-800 border-2 border-white/30 group-hover:border-green-500 group-hover:bg-green-500 transition-all z-10"></div>
                      <div className="md:w-1/2 text-gray-400 text-sm">
                         {item.desc}
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

   
    </div>
  );
};

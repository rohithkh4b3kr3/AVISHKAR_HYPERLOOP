"use client";
import React, { useEffect } from 'react';

import { RESEARCH_AREAS, PUBLICATIONS, LAB_FACILITIES } from '../../Constants';
import { Download, ChevronRight, FlaskConical, ArrowDown } from 'lucide-react';

export default function ResearchPage ()  {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#050505_1px,transparent_1px),linear-gradient(to_bottom,#050505_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
           <img 
             src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2500&auto=format&fit=crop" 
             alt="Research Data" 
             className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-in fade-in zoom-in duration-1000">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-green-900/10 border border-green-500/30 flex items-center justify-center text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <FlaskConical size={32} />
              </div>
           </div>
           <span className="text-green-500 font-tech tracking-[0.5em] text-xs uppercase block mb-4">R&D Division</span>
           <h1 className="text-5xl md:text-8xl font-tech font-bold text-white tracking-tighter mb-6">
             INNOVATION<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-700">LABS</span>
           </h1>
           <p className="text-gray-400 font-light text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
             Pushing the boundaries of physics and engineering. Our research focuses on optimizing hyperloop subsystems for safety, efficiency, and scalability.
           </p>
        </div>
      </section>

      {/* Research Areas Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
         <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-tech font-bold text-white mb-2">KEY RESEARCH DOMAINS</h2>
            <div className="w-20 h-1 bg-green-500"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESEARCH_AREAS.map((area) => (
               <div key={area.id} className="group relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                     <area.icon size={120} className="text-green-500" />
                  </div>
                  
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-black rounded-lg border border-white/20 flex items-center justify-center mb-6 text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">
                        <area.icon size={24} />
                     </div>
                     <h3 className="text-2xl font-tech font-bold text-white mb-4">{area.title}</h3>
                     <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                        {area.description}
                     </p>
                     <button className="text-green-500 font-tech tracking-widest text-sm uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                        Read More <ChevronRight size={14} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Publications List */}
      <section className="py-24 bg-neutral-900/30 border-y border-white/5">
         <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div>
                  <span className="text-green-500 font-tech tracking-[0.5em] text-xs uppercase block mb-2">Whitepapers</span>
                  <h2 className="text-4xl md:text-5xl font-tech font-bold text-white">PUBLICATIONS</h2>
               </div>
               <p className="text-gray-400 text-sm max-w-xs text-right mt-4 md:mt-0">
                  Peer-reviewed papers presented at international conferences.
               </p>
            </div>

            <div className="space-y-4">
               {PUBLICATIONS.map((pub) => (
                  <div key={pub.id} className="group bg-black/40 border border-white/10 p-6 md:p-8 rounded-xl hover:bg-green-900/10 hover:border-green-500/30 transition-all cursor-pointer">
                     <div className="flex flex-col md:flex-row gap-6 justify-between">
                        <div className="space-y-2">
                           <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-tech text-white uppercase tracking-wider">{pub.year}</span>
                              <span className="text-green-500 text-xs font-tech tracking-widest uppercase">Technical Paper</span>
                           </div>
                           <h3 className="text-xl md:text-2xl font-tech font-bold text-white group-hover:text-green-400 transition-colors">
                              {pub.title}
                           </h3>
                           <p className="text-gray-400 text-sm max-w-2xl">
                              {pub.abstract}
                           </p>
                        </div>
                        <div className="flex items-center">
                           <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500 transition-all">
                              <Download size={20} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Lab Facilities Tour */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
         <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-tech font-bold text-white">FACILITIES TOUR</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LAB_FACILITIES.map((lab, idx) => (
               <div key={lab.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                  <img 
                     src={lab.image} 
                     alt={lab.name} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <span className="text-green-500 font-tech text-xs tracking-[0.2em] uppercase mb-2 block">Lab 0{idx + 1}</span>
                     <h3 className="text-3xl font-tech font-bold text-white mb-2">{lab.name}</h3>
                     <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {lab.description}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </section>

     
    </div>
  );
};

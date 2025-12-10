
import React, { useRef, useEffect, useState } from 'react';
import { Play, ChevronRight, MapPin } from 'lucide-react';

export const ParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height - windowHeight;
      
      let scrollProgress = -rect.top / totalHeight;
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[250vh] w-full bg-black">
      
      {/* Sticky Background Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Image with Zoom Effect */}
        <div 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ 
            transform: `scale(${1 + progress * 0.2})`, // Zoom increases by 20%
            transition: 'transform 0.1s linear' // Smooth out update jitter
          }} 
        >
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2506&auto=format&fit=crop" 
            alt="Avishkar Station Render" 
            className="w-full h-full object-cover"
          />
          {/* Cinematic Grading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#051a05]/80 via-transparent to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-90" />
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-between py-24 pointer-events-none">
          
          {/* Top Section: Floating Video Card (Right) */}
          <div className="flex justify-end pt-12">
            <div 
              className="w-80 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-lg hover:bg-black/60 transition-colors group cursor-pointer pointer-events-auto"
              style={{ 
                opacity: 1 - progress * 2, // Fade out quickly
                transform: `translateY(${-progress * 100}px)` 
              }} 
            >
              <div className="relative aspect-video rounded overflow-hidden mb-3">
                <img src="https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                  <Play size={24} className="fill-white text-white" />
                </div>
                <div className="absolute top-2 right-2 text-[10px] font-bold bg-green-500 text-black px-2 py-0.5 rounded-full font-tech tracking-wider">
                  LIVE FEED
                </div>
              </div>
              <div className="px-3 pb-3">
                <div className="text-green-400 text-xs font-tech tracking-widest mb-1 flex items-center gap-2">
                   <Play size={10} className="fill-green-400"/> WATCH TOUR
                </div>
                <h4 className="text-white font-tech text-lg leading-tight">Station Terminal Alpha</h4>
                <p className="text-gray-400 text-xs mt-1">Southern Test Facility, India</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Text Content (Left) */}
          <div 
            className="max-w-2xl pointer-events-auto"
            style={{ 
              opacity: 1 - Math.max(0, (progress - 0.5) * 4) // Fade out near the very end
            }}
          >
            {/* Phase 1 Content: Visible initially */}
            <div 
              className="transition-all duration-500"
              style={{
                transform: `translateY(${-progress * 50}px)`,
                opacity: 1 - progress * 1.5
              }}
            >
              <h2 className="text-5xl md:text-7xl font-tech font-bold text-white mb-6 leading-[0.9]">
                YOUR GATEWAY <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  TO THE FUTURE
                </span>
              </h2>
              <div className="h-1 w-20 bg-white/20 mb-8">
                <div className="h-full bg-green-500" style={{ width: `${progress * 100}%` }}></div>
              </div>
            </div>

            {/* Phase 2 Content: Slides up and fades in */}
            <div 
              className="absolute bottom-24 transition-all duration-500"
              style={{
                opacity: (progress - 0.2) * 3, // Starts appearing at 20% scroll
                transform: `translateY(${Math.max(0, 100 - (progress * 200))}px)`
              }}
            >
               <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-8 backdrop-blur-sm">
                Located in the high-altitude deserts, the Alpha Terminal represents the world's first purpose-built commercial hyperloop station. Designed for seamless passenger flow and zero-emission operations.
              </p>
              
              <div className="flex gap-4">
                 <button className="px-8 py-3 border border-white text-white font-tech hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                   EXPERIENCE STATION <ChevronRight size={16} />
                 </button>
                 <button className="px-8 py-3 border border-transparent text-white font-tech hover:text-green-400 transition-colors flex items-center gap-2">
                   <MapPin size={16} /> VIEW MAP
                 </button>
              </div>
            </div>
          </div>

          {/* Vertical Decoration - Left Side */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-[10px] text-white/30 font-tech tracking-widest hidden md:flex">
             <div className="h-24 w-[1px] bg-gradient-to-b from-transparent to-white/30"></div>
             <span className="vertical-text -rotate-180" style={{ writingMode: 'vertical-rl' }}>LATEST MILESTONES</span>
             <div className="h-24 w-[1px] bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>

        </div>
      </div>
    </div>
  );
};
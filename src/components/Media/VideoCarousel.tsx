import React, { useRef, useEffect, useState } from 'react';
import { VIDEO_STACK } from '@/Constants';
import { Play } from 'lucide-react';

export default function VideoCarousel ()  {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollDistance = height - windowHeight;
      
      // Calculate progress (0 to 1)
      let prog = -top / totalScrollDistance;
      prog = Math.max(0, Math.min(1, prog));
      
      setProgress(prog);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-neutral-950">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Background Parallax Title */}
        <div 
          className="absolute top-1/4 left-0 w-full whitespace-nowrap pointer-events-none select-none z-0"
          style={{ transform: `translateX(${20 - progress * 40}%)` }} 
        >
          <h1 className="text-[20vh] font-tech font-bold text-white/5 tracking-tighter">
            MISSION LOGS — HYPERLOOP ARCHIVES — MISSION LOGS
          </h1>
        </div>

        {/* Section Header */}
        <div 
          className="absolute top-12 left-6 md:left-24 z-20 transition-opacity duration-300"
          style={{ opacity: 1 - progress * 4 }} 
        >
          <span className="text-green-500 font-tech tracking-[0.3em] text-xs uppercase block mb-2">Media Center</span>
          <h2 className="text-4xl md:text-6xl font-tech font-bold text-white">VIDEO ARCHIVES</h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div 
          className="flex gap-8 md:gap-16 px-[10vw] relative z-10 will-change-transform items-center"
          style={{ 
            transform: `translateX(${-progress * 75}%)` 
          }}
        >
          {VIDEO_STACK.map((video, index) => (
            <div 
              key={video.id}
              className="relative shrink-0 w-[80vw] md:w-[600px] aspect-[16/9] group cursor-pointer"
            >
              {/* Card Container */}
              <div className="w-full h-full rounded-none md:rounded-2xl overflow-hidden relative border border-white/10 bg-neutral-900">
                
                {/* Parallax Image Inside Card */}
                <div 
                  className="absolute inset-[-20%] w-[140%] h-[140%]"
                  style={{ 
                    transform: `translateX(${(progress * 20) - (index * 5)}%) scale(1.1)` 
                  }}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                
                {/* Overlay & Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-green-500 group-hover:border-green-400 transition-all duration-300">
                      <Play className="fill-white text-white ml-1" size={24} />
                   </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/50 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <div className="flex justify-between items-end">
                      <div>
                         <span className="text-green-400 font-tech text-[10px] tracking-widest uppercase mb-1 block">{video.category}</span>
                         <h3 className="text-white font-tech text-2xl md:text-3xl font-bold leading-none">{video.title}</h3>
                      </div>
                      <span className="font-tech text-white/50 text-sm tracking-wider">{video.duration}</span>
                   </div>
                </div>
              </div>
              
              {/* Reflection / Shadow */}
              <div className="absolute -bottom-8 left-4 right-4 h-4 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            </div>
          ))}

          {/* End Card */}
          <div className="shrink-0 w-[40vw] md:w-[300px] h-[300px] flex items-center justify-center border-l border-white/10 ml-8">
             <div className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-white/20 mx-auto flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-colors">
                  <Play size={24} />
                </div>
                <span className="text-white font-tech tracking-widest text-sm uppercase">View All</span>
             </div>
          </div>
        </div>

        {/* Progress Bar Bottom */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
           <div 
             className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" 
             style={{ width: `${progress * 100}%` }}
           ></div>
        </div>

      </div>
    </section>
  );
};
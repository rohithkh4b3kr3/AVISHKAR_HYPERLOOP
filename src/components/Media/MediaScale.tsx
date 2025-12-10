import React, { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

export default function MediaScale(){
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const [borderRadius, setBorderRadius] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the screen
      const distanceFromCenter = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
      
      const newScale = Math.max(0.7, Math.min(1.0, 1.0 - Math.abs(distanceFromCenter) * 0.4));
      const newRadius = Math.max(0, Math.min(24, Math.abs(distanceFromCenter) * 100));

      setScale(newScale);
      setBorderRadius(newRadius);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="w-full h-[80vh] flex items-center justify-center overflow-hidden py-10 bg-[#050505]">
      <div 
        className="relative overflow-hidden transition-transform duration-100 ease-out shadow-2xl"
        style={{ 
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          borderRadius: `${borderRadius}px`
        }}
      >
        {/* Video/Image Placeholder */}
        <div className="absolute inset-0 bg-neutral-900">
          <img 
            src="https://images.unsplash.com/photo-1552084117-56a9876679b6?q=80&w=2560&auto=format&fit=crop" 
            alt="Hyperloop Reel" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 group cursor-pointer">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 group-hover:border-green-400">
            <Play size={32} className="text-white fill-white ml-1" />
          </div>
          <h2 className="mt-8 text-5xl md:text-8xl font-tech font-bold text-white tracking-widest uppercase opacity-90 mix-blend-overlay">
            PLAY REEL
          </h2>
        </div>
      </div>
    </section>
  );
};
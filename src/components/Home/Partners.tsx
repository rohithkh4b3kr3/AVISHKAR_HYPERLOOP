
import React from 'react';
import { PARTNER_LOGOS } from '../../Constants';

export const Partners: React.FC = () => {
  return (
    <section id="partners" className="w-full py-24 bg-black border-t border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-green-500 font-tech tracking-[0.5em] text-xs uppercase block mb-4">Supported By</span>
        <h2 className="text-4xl md:text-5xl font-tech font-bold text-white">OUR PARTNERS</h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 py-12">
          {/* First set of logos */}
          {PARTNER_LOGOS.map((partner) => (
            <div key={partner.id} className="w-32 md:w-48 h-16 relative grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100">
              <img 
                src={partner.url} 
                alt={partner.name} 
                className="w-full h-full object-contain"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {PARTNER_LOGOS.map((partner) => (
            <div key={`dup-${partner.id}`} className="w-32 md:w-48 h-16 relative grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100">
              <img 
                src={partner.url} 
                alt={partner.name} 
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient fades for edges */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

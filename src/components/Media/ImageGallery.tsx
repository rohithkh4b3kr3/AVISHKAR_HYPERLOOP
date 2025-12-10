import React from 'react';
import { GALLERY_IMAGES } from '@/Constants';
import { Plus } from 'lucide-react';

export default function ImageGallery (){
  return (
    <section id="gallery" className="w-full py-24 px-6 bg-[#050505] flex justify-center">
      <div className="max-w-[1600px] w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
          <div>
            <span className="text-green-500 font-tech tracking-widest text-sm uppercase mb-2 block">Our World</span>
            <h2 className="text-4xl md:text-6xl font-tech font-bold text-white">LATEST CAPTURES</h2>
          </div>
          <p className="text-gray-400 max-w-sm text-right mt-4 md:mt-0 text-sm">
            Exploring the boundaries of physics and engineering through the lens of our research facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={img.id}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 cursor-pointer
                ${idx === 0 ? 'lg:col-span-8' : ''}
                ${idx === 1 ? 'lg:col-span-4' : ''}
                ${idx === 2 ? 'lg:col-span-4' : ''}
                ${idx === 3 ? 'lg:col-span-8' : ''}
              `}
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div>
                  <span className="text-green-400 text-xs font-tech tracking-wider uppercase">{img.category}</span>
                  <h3 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">{img.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-black">
                  <Plus size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
"use client";
import React, { useState } from 'react';
import { ArrowUp, Mail, MapPin, Linkedin, Twitter, Instagram, Github, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5">

      {/* Background Grid Effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 80%)',
        }}
      ></div>

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <span className="text-green-500 font-tech tracking-[0.5em] text-xs uppercase block mb-4 animate-pulse">
              Stay Updated
            </span>
            <h2 className="text-5xl md:text-7xl font-tech font-bold text-white leading-[0.9] tracking-tighter">
              JOIN THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                REVOLUTION
              </span>
            </h2>
          </div>

          <div className="lg:pl-12">
            <p className="text-gray-400 mb-6 max-w-md">
              Subscribe to our newsletter for the latest updates on tests, pod reveals, and recruitment drives.
            </p>
            <div className="flex gap-2 max-w-md relative group">
              <div className="absolute inset-0 bg-green-500/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-green-500 transition-colors relative z-10 font-tech tracking-wider"
              />
              <button className="bg-green-600 text-black px-6 py-4 rounded-lg font-bold hover:bg-green-500 transition-colors relative z-10">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <h3 className="text-3xl font-tech font-bold text-white tracking-widest">AVISHKAR</h3>
              <span className="text-[10px] font-tech tracking-[0.6em] text-green-500 uppercase">
                Hyperloop
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Center for Innovation<br />
              IIT Madras, Chennai<br />
              Tamil Nadu, India - 600036
            </p>
            <a
              href="mailto:contact@avishkarhyperloop.com"
              className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors text-sm"
            >
              <Mail size={16} /> contact@avishkarhyperloop.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-tech font-bold text-lg mb-6">EXPLORE</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-tech tracking-wider">
              {['Home', 'Pod', 'Infrastructure', 'Media', 'Team', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-400 hover:translate-x-2 transition-all block relative group">
                    <span className="absolute left-[-10px] opacity-0 group-hover:opacity-100 text-green-500 transition-opacity">
                      ›
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white font-tech font-bold text-lg mb-6">CONNECT</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-green-500 hover:border-green-500/50 hover:bg-green-500/10 hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-neutral-900/50 rounded-2xl border border-white/10 p-1 relative overflow-hidden h-48 group">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              style={{ border: 0 }}
              className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.814259559289!2d80.2337!3d12.9915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d433d0b72b%3A0x1fee99889fa7f0c9!2sIIT%20Madras!5e0!3m2!1sen!2sin!4v1704885200000"
            ></iframe>

            <div className="absolute top-2 right-4 z-10">
              <div className="flex items-center gap-2 text-green-600 font-bold font-tech">
                <MapPin size={16} className="text-green-500 fill-green-500 animate-bounce" />
                IIT MADRAS
              </div>
            </div>

            <div className="absolute top-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-[scan_3s_linear_infinite]"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-600 text-xs font-tech tracking-widest uppercase mb-4 md:mb-0">
            © 2026 Avishkar Hyperloop. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-600 text-xs hover:text-white transition-colors uppercase font-tech tracking-widest">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 text-xs hover:text-white transition-colors uppercase font-tech tracking-widest">
              Terms of Use
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-green-600 text-black flex items-center justify-center hover:bg-white transition-colors hover:scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </footer>
  );
};

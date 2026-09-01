'use client';

import React, { useState } from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { X, ArrowUpRight } from 'lucide-react';
import { sounds } from '@/components/audio/SoundManager';

interface MenuItem {
  title: string;
  subtitle: string;
  sceneTarget: number;
}

const MENU_ITEMS: MenuItem[] = [
  { title: 'PRODUCT', subtitle: 'AERODYNAMIC SILHOUETTE // OVERVIEW', sceneTarget: 1 },
  { title: 'MATERIALS', subtitle: 'ENGINEERED AEROMESH & WEAVE', sceneTarget: 2 },
  { title: 'EXPLODED VIEW', subtitle: '7 MODULAR ENGINEERED LAYERS', sceneTarget: 3 },
  { title: 'INTERNAL CORE', subtitle: 'SUPERCRITICAL FOAM CELL MATRIX', sceneTarget: 4 },
  { title: 'ENERGY SYSTEM', subtitle: 'IMPACT · COMPRESSION · REBOUND', sceneTarget: 5 },
  { title: 'PROPULSION', subtitle: 'SPEED ACCELERATION TUNNEL', sceneTarget: 6 },
  { title: 'CUSTOMIZE', subtitle: 'REAL-TIME 3D CONFIGURATOR', sceneTarget: 9 },
  { title: 'ORDER NOW', subtitle: 'EDITION LAUNCH // $249 USD', sceneTarget: 10 },
];

export const MenuOverlay: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, scrollToScene } = useExperience();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!isMenuOpen) return null;

  const handleSelect = (scene: number) => {
    sounds.playClick();
    scrollToScene(scene);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-tighter text-white">NOVA</span>
          <span className="text-xs font-mono text-accent tracking-widest">// NAVIGATION ARCHIVE</span>
        </div>
        <button
          onClick={() => {
            sounds.playClick();
            setIsMenuOpen(false);
          }}
          className="group flex items-center space-x-2 text-xs font-mono text-white/60 hover:text-white transition-colors p-2"
        >
          <span>CLOSE</span>
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10">
            <X size={16} />
          </div>
        </button>
      </div>

      {/* Main Large Typography List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto py-8">
        <div className="md:col-span-8 flex flex-col space-y-2 md:space-y-4">
          {MENU_ITEMS.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <button
                key={item.title}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  sounds.playClick();
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSelect(item.sceneTarget)}
                className="group flex items-baseline justify-between text-left focus:outline-none py-1"
              >
                <div className="flex items-baseline space-x-4 md:space-x-8">
                  <span className="font-mono text-xs md:text-sm text-[#52525b] group-hover:text-accent transition-colors">
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter transition-all duration-300 ${
                      isHovered ? 'text-accent translate-x-4' : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-3 text-xs font-mono text-[#8A8A8A] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{item.subtitle}</span>
                  <ArrowUpRight size={16} className="text-accent" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Info Box */}
        <div className="hidden md:flex md:col-span-4 flex-col justify-between border-l border-white/10 pl-8 font-mono text-xs text-[#8A8A8A]">
          <div>
            <div className="text-white text-sm font-bold tracking-wider mb-2">NOVA X SPECS</div>
            <div className="space-y-2 leading-relaxed">
              <p>PROPULSION: Dual-plane Carbon Plate</p>
              <p>WEIGHT: 218g (US 10.5)</p>
              <p>CUSHIONING: Supercritical Nova Foam</p>
              <p>RETURN: 87% Verified Efficiency</p>
            </div>
          </div>

          <div className="space-y-2 text-[11px] text-[#52525b]">
            <p>DESIGNED FOR HYPER-EFFICIENT KINETICS</p>
            <p>© 2026 NOVA PERFORMANCE LABS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Footer */}
      <div className="flex justify-between items-center text-xs font-mono text-[#52525b] pt-6 border-t border-white/10">
        <div>SCROLL INTERACTION ENABLED</div>
        <div className="flex space-x-6">
          <span className="hover:text-white cursor-pointer">INSTAGRAM</span>
          <span className="hover:text-white cursor-pointer">LABS</span>
          <span className="hover:text-white cursor-pointer">CONTACT</span>
        </div>
      </div>
    </div>
  );
};

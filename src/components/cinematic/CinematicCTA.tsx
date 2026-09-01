'use client';

import React from 'react';
import { sounds } from '@/components/audio/SoundManager';
import { useExperience } from '@/context/ExperienceContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CinematicCTA: React.FC = () => {
  const { scrollToCollection } = useExperience();

  const handleExplore = () => {
    sounds.playClick();
    scrollToCollection();
  };

  return (
    <section className="relative w-full bg-[#ECECE9] text-[#111111] py-32 px-6 overflow-hidden border-t border-[#DCDCD8] select-none">
      {/* Background Architectural Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="text-[28vw] font-black tracking-tighter uppercase font-mono">
          NOVA
        </span>
      </div>

      <div className="w-full max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/10 backdrop-blur-md font-mono text-xs font-bold text-emerald-800 shadow-sm">
          <Sparkles size={14} className="text-emerald-600" />
          <span>SCENE 06 // CONTINUOUS MANIFESTO</span>
        </div>

        {/* Monumental Typography */}
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#111111] leading-[0.88] uppercase">
          MOVE. <br />
          PLAY. <br />
          RUN. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-[#111111] to-emerald-600">
            REPEAT.
          </span>
        </h2>

        <p className="text-sm sm:text-base font-mono text-[#6B6B6B] max-w-lg mx-auto leading-relaxed pt-2">
          Experience the pinnacle of kinetic engineering. Designed for athletes pushing past boundaries every single day.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleExplore}
            className="group px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03] flex items-center space-x-3"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

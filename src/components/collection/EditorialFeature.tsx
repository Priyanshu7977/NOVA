'use client';

import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Zap } from 'lucide-react';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';

export const EditorialFeature: React.FC = () => {
  const { scrollToScene } = useExperience();

  const handleExploreTech = () => {
    sounds.playClick();
    scrollToScene(3);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 my-20">
      <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm relative overflow-hidden">
        {/* Left Editorial Text */}
        <div className="space-y-6 max-w-xl z-10">
          <span className="text-[11px] font-mono tracking-mega text-[#6B6B6B] uppercase font-bold">
            ARCHITECTURE // KINETIC BREAKTHROUGH
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#111111] uppercase leading-[0.9]">
            ENGINEERED <br />
            FOR MOTION.
          </h2>

          <p className="text-sm md:text-base font-mono text-[#6B6B6B] leading-relaxed">
            Every NOVA X is built around a performance architecture designed to disappear beneath your stride. Dual-plane carbon dynamics harmonized with nitrogen supercritical cushioning.
          </p>

          {/* Three Key Pillars */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#F0F0ED]">
            <div className="space-y-1">
              <Zap size={16} className="text-[#a855f7]" />
              <div className="font-mono text-xs font-bold text-[#111111]">87% RETURN</div>
              <div className="text-[10px] font-mono text-[#6B6B6B]">Mechanical yield</div>
            </div>
            <div className="space-y-1">
              <Compass size={16} className="text-[#00f0ff]" />
              <div className="font-mono text-xs font-bold text-[#111111]">8MM OFFSET</div>
              <div className="text-[10px] font-mono text-[#6B6B6B]">Forward vector</div>
            </div>
            <div className="space-y-1">
              <ShieldCheck size={16} className="text-[#111111]" />
              <div className="font-mono text-xs font-bold text-[#111111]">218G SPEC</div>
              <div className="text-[10px] font-mono text-[#6B6B6B]">Sub-marathon</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleExploreTech}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#111111] hover:text-accent uppercase transition-colors"
            >
              <span>EXPLORE TECHNOLOGY</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Large Featured Silhouette */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="w-full max-w-[420px] aspect-[16/10] drop-shadow-xl">
            <svg viewBox="0 0 400 240" fill="none" className="w-full h-full">
              <path d="M 30 190 Q 180 205 370 170 Q 380 185 360 200 Q 180 215 35 195 Z" fill="#e2e8f0" />
              <path d="M 40 195 Q 180 212 360 190 Q 365 202 345 208 Q 180 220 42 200 Z" fill="#18181b" />
              <path d="M 35 175 Q 180 190 375 155 Q 380 170 370 175 Q 180 205 30 190 Z" fill="#ffffff" />
              <path d="M 50 180 Q 180 195 360 162" stroke="#00f0ff" strokeWidth="6" strokeLinecap="round" />
              <path d="M 45 175 Q 35 130 65 85 Q 110 60 160 100 Q 240 105 320 140 Q 375 150 375 158 Q 180 190 45 175 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M 70 85 Q 110 50 145 95 Q 125 125 75 120 Z" fill="#f1f5f9" />
              <path d="M 120 95 L 140 120 M 135 90 L 160 115 M 150 85 L 180 110 M 170 80 L 205 105" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 55 90 Q 45 65 60 70" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

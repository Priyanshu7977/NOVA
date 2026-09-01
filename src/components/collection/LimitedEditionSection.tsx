'use client';

import React from 'react';
import { PRODUCTS } from '@/data/products';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import { ArrowRight } from 'lucide-react';
import { NikeShoeGraphic } from '@/components/ui/NikeShoeGraphic';

export const LimitedEditionSection: React.FC = () => {
  const { setSelectedProductForModal } = useExperience();
  const limitedProduct = PRODUCTS.find((p) => p.id === 'nova-x-limited-eclipse') || PRODUCTS[PRODUCTS.length - 1];

  const handleOpenDetail = () => {
    sounds.playClick();
    setSelectedProductForModal(limitedProduct);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 my-20">
      <div className="bg-[#18181B] text-white rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden border border-white/10">
        {/* Subtle Ambient Studio Light in the dark card */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Left Information */}
        <div className="space-y-6 max-w-lg z-10">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold tracking-mega text-amber-400 uppercase">
              LIMITED RUN // 500 PAIRS WORLDWIDE
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[9px] font-bold">
              SERIALIZED NEXT%
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9]">
            NOVA X <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#f59e0b]">
              NEXT% ECLIPSE.
            </span>
          </h2>

          <p className="text-sm font-mono text-[#A1A1AA] leading-relaxed">
            Serialized world-record marathon prototype. Matte blackout Atomknit weave with gold leaf foil accents, exposed carbon Flyplate, and dual pressurized Zoom Air capsules.
          </p>

          <div className="flex items-baseline space-x-4 border-t border-white/10 pt-4 font-mono">
            <span className="text-3xl font-bold text-white">₹24,999</span>
            <span className="text-xs text-[#A1A1AA]">INCLUDES BESPOKE ALUMINUM RACING CASE</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleOpenDetail}
              className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-xl bg-white hover:bg-amber-300 text-black font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-md"
            >
              <span>EXPLORE LIMITED RUN</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Limited Edition Silhouette */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="w-full max-w-[440px] aspect-[16/10] drop-shadow-2xl">
            <NikeShoeGraphic colorway={limitedProduct.defaultColorway} />
          </div>
        </div>
      </div>
    </div>
  );
};

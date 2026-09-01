'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import { ArrowRight } from 'lucide-react';
import { NikeShoeGraphic } from '@/components/ui/NikeShoeGraphic';

export const ColorSystemSection: React.FC = () => {
  const { setSelectedProductForModal } = useExperience();
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);

  const handleSelectProduct = (prod: Product) => {
    sounds.playClick();
    setActiveProduct(prod);
  };

  const handleOpenDetail = (prod: Product) => {
    sounds.playClick();
    setSelectedProductForModal(prod);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 my-20">
      <div className="space-y-3 mb-10">
        <span className="text-[11px] font-mono tracking-mega text-[#6B6B6B] uppercase font-bold">
          CHROMATIC SERIES // 2026 PALETTE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#111111] uppercase leading-none">
          THE COLOR SYSTEM
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#6B6B6B] max-w-lg">
          Precision-calibrated colorways designed to reflect distinct kinetic states from stealth carbon to high-visibility volt.
        </p>
      </div>

      {/* Large Featured Shoe + Surrounding Product Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Large Featured Showcase Hero Card */}
        <div
          onClick={() => handleOpenDetail(activeProduct)}
          className="lg:col-span-8 bg-[#FFFFFF] border border-[#E5E5E2] rounded-3xl p-8 md:p-12 flex flex-col justify-between cursor-pointer group shadow-sm hover:border-[#111111]/40 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                {activeProduct.number} // FEATURED PALETTE
              </span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] mt-1">
                {activeProduct.name}
              </h3>
              <p className="text-sm font-mono text-[#6B6B6B] mt-0.5">
                {activeProduct.defaultColorway.name} · ₹{activeProduct.price.toLocaleString('en-IN')}
              </p>
            </div>
            {activeProduct.badge && (
              <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[#111111] text-white uppercase">
                {activeProduct.badge}
              </span>
            )}
          </div>

          {/* Large Stylized Visual */}
          <div className="my-8 flex items-center justify-center py-4">
            <div className="w-full max-w-[480px] aspect-[16/10] group-hover:scale-105 transition-transform duration-500">
              <NikeShoeGraphic colorway={activeProduct.defaultColorway} />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#F0F0ED]">
            <span className="text-xs font-mono text-[#6B6B6B]">
              "{activeProduct.tagline}"
            </span>
            <div className="text-xs font-mono font-bold text-[#111111] group-hover:text-accent flex items-center space-x-1 uppercase tracking-wider">
              <span>INSPECT IN 3D</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Right Palette Selector Strip */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
          {PRODUCTS.map((prod) => {
            const isCurrent = activeProduct.id === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isCurrent
                    ? 'bg-[#FFFFFF] border-[#111111] shadow-md scale-[1.02]'
                    : 'bg-[#F7F7F5] border-[#E5E5E2] hover:bg-[#FFFFFF] hover:border-[#DCDCD8]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-5 h-5 rounded-full border border-black/20 shadow-inner"
                    style={{ backgroundColor: prod.defaultColorway.hex }}
                  />
                  <div>
                    <div className="font-bold text-xs text-[#111111]">
                      {prod.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#6B6B6B]">
                      {prod.tagline}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#111111]">
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

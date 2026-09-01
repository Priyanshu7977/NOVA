'use client';

import React, { useState } from 'react';
import { Product, ProductColorway } from '@/data/products';
import { ArrowRight, Star } from 'lucide-react';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import { NikeShoeGraphic } from '@/components/ui/NikeShoeGraphic';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProductForModal } = useExperience();
  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(product.defaultColorway);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    sounds.playClick();
    setSelectedProductForModal(product);
  };

  const handleColorSelect = (e: React.MouseEvent, colorway: ProductColorway) => {
    e.stopPropagation();
    sounds.playShimmer();
    setSelectedColorway(colorway);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col justify-between bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E5E2] hover:border-[#111111]/40 transition-all duration-500 hover:shadow-lg relative select-none"
    >
      {/* 1. Subtle Editorial Numbering & Category Tag */}
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs font-bold text-[#6B6B6B]">
          {product.number} / {product.name}
        </span>
        {product.badge && (
          <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#111111] text-white uppercase">
            {product.badge}
          </span>
        )}
      </div>

      {/* 2. Large Centered Nike-Style Product Visualization */}
      <div className="my-6 py-4 flex items-center justify-center relative overflow-hidden">
        <div
          className={`w-full max-w-[280px] aspect-[16/10] transition-all duration-500 ease-out flex items-center justify-center relative z-10 ${
            isHovered ? 'scale-[1.05] -translate-y-1.5' : 'scale-100'
          }`}
        >
          <NikeShoeGraphic colorway={selectedColorway} />
        </div>
      </div>

      {/* 3. Product Information & Swatches */}
      <div className={`space-y-3 pt-3 border-t border-[#F0F0ED] transition-transform duration-300 ${isHovered ? '-translate-y-0.5' : ''}`}>
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-lg font-black tracking-tight text-[#111111]">
              {product.name}
            </h3>
            <p className="text-xs font-mono text-[#6B6B6B]">
              {selectedColorway.name}
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-base font-bold text-[#111111]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Reviews Rating */}
        <div className="flex items-center space-x-1.5 text-xs text-[#6B6B6B]">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
          <span className="font-mono text-[11px]">({product.reviewsCount})</span>
        </div>

        {/* Live Interactive Color Swatches */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {product.colorways.map((cw) => {
              const isSelected = selectedColorway.id === cw.id;
              return (
                <button
                  key={cw.id}
                  onClick={(e) => handleColorSelect(e, cw)}
                  className={`w-5 h-5 rounded-full border transition-all ${
                    isSelected
                      ? 'ring-2 ring-[#111111] ring-offset-1 scale-110'
                      : 'hover:scale-105 border-black/10'
                  }`}
                  style={{ backgroundColor: cw.hex }}
                  title={cw.name}
                  aria-label={`Select ${cw.name} colorway`}
                />
              );
            })}
          </div>

          <div className="text-[11px] font-mono font-bold tracking-wider text-[#111111] group-hover:text-accent transition-colors flex items-center space-x-1">
            <span>VIEW PRODUCT</span>
            <ArrowRight size={13} className="translate-x-0 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { sounds } from '@/components/audio/SoundManager';
import { Search, SlidersHorizontal } from 'lucide-react';

interface CollectionHeroProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalProductsCount: number;
}

const CATEGORIES = [
  { id: 'ALL', label: 'ALL FOOTWEAR' },
  { id: 'RUNNING', label: 'RUNNING' },
  { id: 'FOOTBALL', label: 'FOOTBALL' },
  { id: 'BASKETBALL', label: 'BASKETBALL' },
  { id: 'BADMINTON', label: 'BADMINTON & COURT' },
  { id: 'TRAINING', label: 'TRAINING' },
  { id: 'LIFESTYLE', label: 'LIFESTYLE' },
  { id: 'TENNIS', label: 'TENNIS' },
  { id: 'MENS', label: "MEN'S" },
  { id: 'WOMENS', label: "WOMEN'S" },
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'MOST POPULAR' },
  { id: 'newest', label: 'NEW RELEASES' },
  { id: 'price-asc', label: 'PRICE: LOW → HIGH' },
  { id: 'price-desc', label: 'PRICE: HIGH → LOW' },
  { id: 'rating', label: 'HIGHEST RATED' },
];

export const CollectionHero: React.FC<CollectionHeroProps> = ({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  totalProductsCount,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-10 pb-8 select-none">
      {/* 1. High-Fashion Editorial Introduction */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[11px] font-mono tracking-mega text-emerald-700 font-bold uppercase block">
            SCENE 05 // THE NIKE FOOTWEAR SHOP
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#111111] uppercase leading-[0.92]">
            NIKE FOOTWEAR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-emerald-700 to-[#111111]">
              CURATED BY NOVA.
            </span>
          </h2>
          <p className="text-sm font-mono text-[#6B6B6B] leading-relaxed max-w-xl pt-1">
            Performance & lifestyle footwear curated from official Nike specifications. Engineered for velocity, power, friction and everyday athletic agility.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="w-full lg:w-80 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Nike footwear..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E5E2] focus:border-[#111111] rounded-2xl text-xs font-mono text-[#111111] placeholder:text-[#A1A1AA] focus:outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      {/* 2. Controls: Sport Filter Pills & Sort Dropdown */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E5E5E2] gap-6">
        {/* Category Pills Scroll Strip */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#111111] text-white font-bold shadow-md scale-[1.02]'
                    : 'bg-[#FFFFFF] hover:bg-[#EAEAE7] text-[#6B6B6B] hover:text-[#111111] border border-[#E5E5E2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Sort Dropdown */}
        <div className="flex items-center justify-between lg:justify-end space-x-4 font-mono text-xs text-[#6B6B6B] flex-shrink-0">
          <span className="font-bold text-[#111111]">
            ({totalProductsCount} {totalProductsCount === 1 ? 'PRODUCT' : 'PRODUCTS'})
          </span>

          <div className="flex items-center space-x-2">
            <SlidersHorizontal size={14} className="text-[#111111]" />
            <select
              value={sortBy}
              onChange={(e) => {
                sounds.playClick();
                setSortBy(e.target.value);
              }}
              className="bg-white border border-[#E5E5E2] rounded-xl px-3 py-2 text-[#111111] font-mono text-xs font-bold focus:outline-none focus:border-[#111111] cursor-pointer shadow-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import { ShoppingBag } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isDarkText, setIsDarkText] = useState(false);
  const { cartItems, setIsCartOpen } = useExperience();
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Monitor scroll position to adapt logo colors between Act 01 (dark theme) and Act 02 (light theme)
  useEffect(() => {
    const handleScroll = () => {
      const collectionEl = document.getElementById('nova-collection');
      if (collectionEl) {
        const rect = collectionEl.getBoundingClientRect();
        if (rect.top <= 80) {
          setIsDarkText(true);
        } else {
          setIsDarkText(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCart = () => {
    sounds.playClick();
    setIsCartOpen(true);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-7 flex justify-between items-center pointer-events-none transition-colors duration-500 select-none ${
        isDarkText ? 'text-[#111111]' : 'text-white'
      }`}
    >
      {/* Brand Logo (Top-Left) */}
      <div className="pointer-events-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl md:text-3xl font-black tracking-tighter hover:opacity-80 transition-opacity focus:outline-none"
        >
          NOVA
        </button>
      </div>

      {/* Bag / Cart Trigger (Top-Right) */}
      <div className="pointer-events-auto flex items-center space-x-3">
        <button
          onClick={handleOpenCart}
          className={`px-4 py-2 rounded-full font-mono text-xs font-bold flex items-center space-x-2 transition-all shadow-md hover:scale-105 ${
            isDarkText
              ? 'bg-[#111111] text-white hover:bg-black'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md'
          }`}
          aria-label="Open Shopping Bag"
        >
          <ShoppingBag size={14} />
          <span>BAG</span>
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-[#111111] font-black text-[10px] flex items-center justify-center">
            {totalCartCount}
          </span>
        </button>
      </div>
    </header>
  );
};

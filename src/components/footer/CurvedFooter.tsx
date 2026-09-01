'use client';

import React from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import { ArrowUpRight, Instagram, Twitter, Youtube, ShieldCheck } from 'lucide-react';

export const CurvedFooter: React.FC = () => {
  const { scrollToCollection } = useExperience();

  const handleCategoryClick = () => {
    sounds.playClick();
    scrollToCollection();
  };

  return (
    <footer className="relative w-full bg-[#FFFFFF] text-[#111111] pt-20 pb-12 px-6 border-t border-[#E5E5E2] select-none">
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Top Brand Statement */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 border-b border-[#F0F0ED] gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-[#111111]">
              NOVA
            </span>
            <p className="text-sm font-mono text-[#6B6B6B] tracking-widest uppercase font-semibold">
              MOVE WITHOUT LIMITS.
            </p>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs text-[#6B6B6B]">
            <span>INDIN CURATED EDITION // 2026</span>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h5 className="font-bold text-[#111111] uppercase tracking-wider">
              SHOP FOOTWEAR
            </h5>
            <ul className="space-y-2.5 text-[#6B6B6B]">
              {['Running', 'Basketball', 'Football', 'Training', 'Lifestyle', 'Tennis'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={handleCategoryClick}
                    className="hover:text-[#111111] transition-colors flex items-center space-x-1"
                  >
                    <span>{cat}</span>
                    <ArrowUpRight size={12} className="opacity-40" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-4">
            <h5 className="font-bold text-[#111111] uppercase tracking-wider">
              CUSTOMER CARE
            </h5>
            <ul className="space-y-2.5 text-[#6B6B6B]">
              {['Shipping & Delivery', 'Returns & Exchanges', 'Size Guide', 'Track Order', 'Contact Us'].map((item) => (
                <li key={item}>
                  <span className="hover:text-[#111111] transition-colors cursor-pointer block">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Privacy */}
          <div className="space-y-4">
            <h5 className="font-bold text-[#111111] uppercase tracking-wider">
              LEGAL & ETHICS
            </h5>
            <ul className="space-y-2.5 text-[#6B6B6B]">
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Security Protocol'].map((item) => (
                <li key={item}>
                  <span className="hover:text-[#111111] transition-colors cursor-pointer block">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Channels */}
          <div className="space-y-4">
            <h5 className="font-bold text-[#111111] uppercase tracking-wider">
              CONNECT
            </h5>
            <div className="flex items-center space-x-3 text-[#6B6B6B]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#E5E5E2] hover:border-[#111111] hover:text-[#111111] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#E5E5E2] hover:border-[#111111] hover:text-[#111111] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#E5E5E2] hover:border-[#111111] hover:text-[#111111] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box & Copyright */}
        <div className="pt-8 border-t border-[#F0F0ED] space-y-4 font-mono text-[11px] text-[#8A8A8A]">
          <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E2] flex items-start space-x-3">
            <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#111111]">INDEPENDENT CONCEPT NOTICE:</strong> NOVA is an independent cinematic sports footwear showcase. All product trademarks, model names, and references belong to Nike Inc. This experience does not claim affiliation, partnership, sponsorship, or official authorization by Nike.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
            <span>© 2026 NOVA SPORTS. ALL RIGHTS RESERVED.</span>
            <span>BUILT FOR WHAT'S NEXT.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

'use client';

import React, { useState } from 'react';
import { Check, ExternalLink, ArrowRight, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

interface OutroSectionProps {
  onNavigateToUniverse: (index: number) => void;
}

export const OutroSection: React.FC<OutroSectionProps> = ({ onNavigateToUniverse }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white/95 border border-black/10 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl pointer-events-auto text-left shadow-2xl space-y-8 animate-fade-in my-auto text-[#111111]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-black/10 bg-white shadow-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#111111] uppercase font-bold">
                ROOM 07 / NOVA INNOVATION LAB
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#111111] leading-none">
              JOIN THE NOVA INNER CIRCLE.
            </h2>
          </div>

          <a
            href="https://nova-x.com/member"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 font-sans text-xs tracking-wider text-[#666666] hover:text-[#111111] uppercase font-bold"
          >
            <span>@NOVAINNOVATION</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl border border-black/10 bg-white shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#0284c7]">
              <Trophy className="w-4 h-4" />
            </div>
            <h4 className="font-display text-xl font-black text-[#111111] uppercase tracking-tight">MEMBER EXCLUSIVES</h4>
            <p className="font-sans text-xs text-[#666666] leading-relaxed font-medium">
              First access to prototype drops, limited laboratory colorways, and athlete collaboration gear.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-black/10 bg-white shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#f7fee7] flex items-center justify-center text-[#65a30d]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-display text-xl font-black text-[#111111] uppercase tracking-tight">NOVA TRAINING</h4>
            <p className="font-sans text-xs text-[#666666] leading-relaxed font-medium">
              Guided training journeys, marathon pacing telemetry, and elite coaching blueprints.
            </p>
          </div>

          <div className="p-5 rounded-3xl border border-black/10 bg-white shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-full bg-[#fff1f2] flex items-center justify-center text-[#e11d48]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-display text-xl font-black text-[#111111] uppercase tracking-tight">NOVA FIELD TESTING</h4>
            <p className="font-sans text-xs text-[#666666] leading-relaxed font-medium">
              Participate in biomechanical product beta tests and shape the future of sport.
            </p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="p-6 sm:p-8 rounded-3xl border border-black/10 bg-[#f8fafc] space-y-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#0284c7] uppercase block font-bold">
              STAY INFORMED
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-[#111111] uppercase mt-1 leading-tight">
              Receive exclusive innovation dispatches from Nova World Headquarters.
            </h3>
          </div>

          {isSubmitted ? (
            <div className="flex items-center space-x-2 text-sm text-[#65a30d] font-sans font-bold">
              <Check className="w-5 h-5" />
              <span>ACCESS CONFIRMED. WELCOME TO THE NOVA LAB COMMUNITY.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL FOR MEMBER ACCESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full border border-black/20 bg-white text-xs font-sans font-medium text-[#111111] placeholder-[#888888] focus:outline-none focus:border-[#111111]"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#111111] text-white font-sans font-bold text-xs tracking-widest uppercase hover:bg-black transition-transform active:scale-95 shadow-md"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>

        {/* Innovation Archives */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 text-xs font-sans font-bold text-[#666666]">
          <div className="flex items-center space-x-4">
            <span className="text-[#111111] uppercase">INNOVATION ARCHIVES:</span>
            <a
              href="https://nova-x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0284c7] hover:underline"
            >
              2023 SUMMIT
            </a>
            <span>/</span>
            <a
              href="https://nova-x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0284c7] hover:underline"
            >
              2024 SUMMIT
            </a>
            <span>/</span>
            <span className="text-[#65a30d]">2025/2026 ACTIVE</span>
          </div>

          <button
            onClick={() => onNavigateToUniverse(0)}
            className="flex items-center space-x-2 text-[#111111] hover:text-[#0284c7] transition-colors"
          >
            <span>REPLAY SHOWCASE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

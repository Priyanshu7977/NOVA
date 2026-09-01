'use client';

import React, { useState } from 'react';
import { X, ExternalLink, Activity, Sparkles } from 'lucide-react';
import { NikeUniverseData, NikeProductColorway } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';

interface InnovationModalProps {
  universe: NikeUniverseData | null;
  onClose: () => void;
}

export const InnovationModal: React.FC<InnovationModalProps> = ({ universe, onClose }) => {
  if (!universe) return null;

  const [selectedColorway, setSelectedColorway] = useState<NikeProductColorway>(
    universe.colorways[0]
  );
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [turntableRotation, setTurntableRotation] = useState<number>(0);
  const [isCrazyFlipping, setIsCrazyFlipping] = useState<boolean>(false);

  const handleRotate = () => {
    audio.playSonicBlast();
    setIsCrazyFlipping(true);
    setTurntableRotation((prev) => prev + 360);
    setTimeout(() => setIsCrazyFlipping(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl p-4 sm:p-8 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#faf9f6] border border-black/10 rounded-3xl overflow-hidden shadow-2xl my-auto text-[#111111] flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 bg-white/80">
          <div className="flex items-center space-x-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: universe.accentColor }}
            />
            <span className="font-mono text-xs tracking-[0.2em] text-[#666666] uppercase font-bold">
              ROOM 0{universe.index} / {universe.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 overflow-y-auto">
          {/* Left Column (5 Cols): Real Product Visualizer & Exploded Layers */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Interactive Real Shoe Turntable Card with Sonic Blast */}
            <div
              onClick={handleRotate}
              className="relative h-72 sm:h-80 rounded-3xl border border-black/10 bg-white shadow-sm flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
            >
              {/* Real Nike Shoe Image */}
              <div
                className={`relative w-64 sm:w-72 h-44 flex items-center justify-center transition-all duration-700 ${
                  isCrazyFlipping ? 'scale-110 rotate-12' : 'hover:scale-105'
                }`}
                style={{
                  transform: `rotateY(${turntableRotation}deg)`,
                }}
              >
                <img
                  src={universe.realImageUrl}
                  alt={universe.productName}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Sonic Pulse Halo on Click */}
              {isCrazyFlipping && (
                <div className="absolute inset-0 border-2 border-[#0284c7]/40 rounded-3xl animate-ping pointer-events-none" />
              )}

              {/* 360 Rotation Action Button */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-sans font-bold tracking-wider uppercase transition-colors shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>360° SONIC FLIP</span>
              </div>

              <span className="absolute top-4 left-4 text-[10px] font-mono text-[#888888] tracking-wider uppercase font-bold">
                AUTHENTIC PRODUCT TELEMETRY
              </span>
            </div>

            {/* Colorway Switcher */}
            <div>
              <span className="font-sans text-xs text-[#666666] uppercase tracking-wider block mb-3 font-bold">
                AVAILABLE COLORWAYS
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {universe.colorways.map((cw) => (
                  <button
                    key={cw.id}
                    onClick={() => {
                      setSelectedColorway(cw);
                      audio.playChime(580, 'sine', 0.1);
                    }}
                    className={`flex flex-col p-2.5 rounded-2xl border text-left transition-all ${
                      selectedColorway.id === cw.id
                        ? 'border-[#111111] bg-white shadow-md'
                        : 'border-black/10 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: cw.hex }}
                      />
                      <span className="font-sans text-[10px] text-[#111111] font-bold truncate">
                        {cw.name.split(' / ')[0]}
                      </span>
                    </div>
                    <span className="font-sans text-[9px] text-[#666666] truncate font-medium">
                      {cw.tagline}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exploded Engineering Layers */}
            <div>
              <span className="font-sans text-xs text-[#666666] uppercase tracking-wider block mb-3 font-bold">
                EXPLODED CHASSIS LAYERS ({universe.explodedLayers.length})
              </span>
              <div className="space-y-2">
                {universe.explodedLayers.map((layer, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedLayerIndex(idx);
                      audio.playExplode();
                    }}
                    className={`w-full flex items-start space-x-3 p-3 rounded-2xl border text-left transition-all ${
                      selectedLayerIndex === idx
                        ? 'border-[#0284c7] bg-[#f0f9ff] shadow-sm'
                        : 'border-black/10 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-[#0284c7] mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="font-sans text-xs font-bold text-[#111111] block">
                        {layer.name}
                      </span>
                      <span className="font-sans text-[11px] text-[#555555] leading-relaxed block mt-0.5 font-medium">
                        {layer.description}
                      </span>
                      <span className="font-mono text-[10px] text-[#888888] block mt-1 font-semibold">
                        Material: {layer.material}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Engineering Deep-Dive & Purchase CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] mb-2 leading-none">
                  {universe.productName}
                </h3>
                <p className="font-sans text-xs text-[#0284c7] uppercase tracking-wider font-bold">
                  {universe.highlightTitle}
                </p>
              </div>

              <p className="font-sans text-sm text-[#333333] font-medium leading-relaxed">
                {universe.highlightDescription}
              </p>

              {/* Know-How & Biomechanics Section */}
              <div className="p-5 rounded-3xl border border-black/10 bg-white shadow-sm space-y-3">
                <div className="flex items-center space-x-2 font-mono text-xs text-[#0284c7] uppercase tracking-wider font-bold">
                  <Activity className="w-4 h-4" />
                  <span>{universe.knowHowTitle}</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed font-medium">
                  {universe.knowHowDescription}
                </p>
                {universe.knowHowDescription2 && (
                  <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed font-medium">
                    {universe.knowHowDescription2}
                  </p>
                )}
              </div>

              {/* Athlete Telemetry Quote */}
              {universe.specs.athleteTestimonial && (
                <div className="p-4 rounded-2xl border border-black/10 bg-[#f8fafc]">
                  <p className="font-sans text-xs italic text-[#222222] leading-relaxed font-semibold">
                    {universe.specs.athleteTestimonial}
                  </p>
                </div>
              )}

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl border border-black/10 bg-white shadow-sm">
                  <span className="font-mono text-[10px] text-[#777777] uppercase block font-bold">
                    WEIGHT
                  </span>
                  <span className="font-sans text-xs font-bold text-[#111111] mt-1 block">
                    {universe.specs.weight}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl border border-black/10 bg-white shadow-sm">
                  <span className="font-mono text-[10px] text-[#777777] uppercase block font-bold">
                    ENERGY RETURN
                  </span>
                  <span className="font-sans text-xs font-bold text-[#65a30d] mt-1 block">
                    {universe.specs.energyReturn}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl border border-black/10 bg-white shadow-sm">
                  <span className="font-mono text-[10px] text-[#777777] uppercase block font-bold">
                    OFFSET / DROP
                  </span>
                  <span className="font-sans text-xs font-bold text-[#111111] mt-1 block">
                    {universe.specs.drop || '8mm'}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-3 p-3.5 rounded-2xl border border-black/10 bg-white shadow-sm">
                  <span className="font-mono text-[10px] text-[#777777] uppercase block font-bold">
                    CUSHIONING ARCHITECTURE
                  </span>
                  <span className="font-sans text-xs font-bold text-[#111111] mt-1 block">
                    {universe.specs.cushioning}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Official Nike India E-Commerce Buy CTA */}
            <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block font-bold">
                  OFFICIAL PRICE (INCL. TAXES)
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-sans text-2xl font-black text-[#111111]">
                    ₹{universe.priceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="font-sans text-xs font-bold text-[#777777]">
                    / ${universe.priceUSD}
                  </span>
                </div>
              </div>

              <a
                href={universe.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playChime(880, 'sine', 0.2)}
                className="w-full sm:w-auto flex items-center justify-center space-x-3 px-9 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                <span>ACQUIRE ON NIKE.IN</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

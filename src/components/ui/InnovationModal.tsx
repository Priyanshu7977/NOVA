'use client';

import React, { useState } from 'react';
import { X, ExternalLink, Activity, Sparkles, ShoppingBag, Zap, Truck, ShieldCheck } from 'lucide-react';
import { NikeUniverseData, NikeProductColorway } from '@/data/nikeUniverses';
import { audio } from '@/components/audio/NikeAudioEngine';
import { MiniSneakerCanvas } from './MiniSneakerCanvas';
import { useExperience } from '@/context/ExperienceContext';
import { PRODUCTS } from '@/data/products';

interface InnovationModalProps {
  universe: NikeUniverseData | null;
  onClose: () => void;
}

export const InnovationModal: React.FC<InnovationModalProps> = ({ universe, onClose }) => {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useExperience();

  if (!universe) return null;

  const [selectedColorway, setSelectedColorway] = useState<NikeProductColorway>(
    universe.colorways[0]
  );
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('UK 9');

  const handleAddToCart = () => {
    audio.playSonicBlast();
    const product = PRODUCTS.find((p) => p.id === universe.id) || {
      id: universe.id,
      name: universe.productName,
      tagline: universe.subtitle,
      price: universe.priceINR,
      category: universe.category,
      description: universe.highlightDescription,
      defaultColorway: selectedColorway,
      colorways: universe.colorways,
      specs: {
        weight: universe.specs.weight,
        drop: universe.specs.drop || '10mm',
        stackHeight: universe.specs.stackHeight || '36mm',
        energyReturn: universe.specs.energyReturn,
        cushioning: universe.specs.cushioning,
        stability: 'Neutral / High Dynamic Response',
        surface: 'Road / Track / Field',
      },
      features: [universe.highlightTitle, universe.knowHowTitle],
      technologyBadge: universe.highlightTitle,
    };

    addToCart(product as any, selectedColorway, selectedSize);
    onClose();
    setIsCartOpen(true);
  };

  const handleInstantCheckout = () => {
    audio.playSonicBlast();
    const product = PRODUCTS.find((p) => p.id === universe.id) || {
      id: universe.id,
      name: universe.productName,
      tagline: universe.subtitle,
      price: universe.priceINR,
      category: universe.category,
      description: universe.highlightDescription,
      defaultColorway: selectedColorway,
      colorways: universe.colorways,
      specs: {
        weight: universe.specs.weight,
        drop: universe.specs.drop || '10mm',
        stackHeight: universe.specs.stackHeight || '36mm',
        energyReturn: universe.specs.energyReturn,
        cushioning: universe.specs.cushioning,
        stability: 'Neutral / High Dynamic Response',
        surface: 'Road / Track / Field',
      },
      features: [universe.highlightTitle, universe.knowHowTitle],
      technologyBadge: universe.highlightTitle,
    };

    addToCart(product as any, selectedColorway, selectedSize);
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl p-4 sm:p-8 animate-fade-in overflow-y-auto select-none">
      <div className="relative w-full max-w-6xl bg-[#faf9f6] border border-black/10 rounded-[2.5rem] overflow-hidden shadow-2xl my-auto text-[#111111] flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/10 bg-white/90 sticky top-0 z-20">
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
            className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#111111] transition-all hover:scale-105 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 overflow-y-auto bg-[#fafafa]">
          {/* Left Column (5 Cols): Live 3D Sneaker Visualizer & Exploded Chassis Layers */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Interactive Real 3D Sneaker Canvas */}
            <div
              className="relative h-72 sm:h-80 rounded-3xl border border-black/10 bg-white shadow-sm flex flex-col items-center justify-center overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${universe.accentColor}12 0%, #ffffff 100%)`,
              }}
            >
              {/* Exact 3D Sneaker Model Canvas */}
              <div className="w-full h-full flex items-center justify-center">
                <MiniSneakerCanvas universe={universe} heightClass="h-72 sm:h-80" />
              </div>

              {/* 360 Rotation Action Badge */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-sans font-bold tracking-wider uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>3D TURNTABLE ACTIVE</span>
              </div>

              <span className="absolute top-4 left-4 text-[10px] font-mono text-[#888888] tracking-wider uppercase font-bold">
                AUTHENTIC PRODUCT 3D TELEMETRY
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
                        ? 'border-[#111111] bg-white shadow-md scale-[1.02]'
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
                    className={`w-full flex items-start space-x-3 p-3.5 rounded-2xl border text-left transition-all ${
                      selectedLayerIndex === idx
                        ? 'border-[#0284c7] bg-[#f0f9ff] shadow-sm'
                        : 'border-black/10 bg-white hover:bg-gray-50'
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

          {/* Right Column (7 Cols): Engineering Deep-Dive & Direct Add to Cart / Checkout */}
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

            {/* Price & Direct Purchase Action Panel */}
            <div className="pt-6 border-t border-black/10 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block font-bold">
                    OFFICIAL PRICE (INCL. TAXES)
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-sans text-3xl font-black text-[#111111]">
                      ₹{universe.priceINR.toLocaleString('en-IN')}
                    </span>
                    <span className="font-sans text-xs font-bold text-[#777777]">
                      / ${universe.priceUSD} USD
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-emerald-700 text-xs font-mono font-bold">
                  <Truck className="w-4 h-4" />
                  <span>FREE MEMBER DELIVERY</span>
                </div>
              </div>

              {/* Dual Purchase Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2 active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  onClick={handleInstantCheckout}
                  className="w-full py-4 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2 active:scale-98"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>BUY NOW • CHECKOUT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

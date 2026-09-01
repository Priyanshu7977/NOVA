'use client';

import React, { useState } from 'react';
import { X, Activity, Sparkles, ShoppingBag, Zap, Truck, ShieldCheck, Check } from 'lucide-react';
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
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    audio.playSonicBlast();
    setIsAdded(true);
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
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl p-3 sm:p-6 animate-fade-in overflow-y-auto select-none">
      <div className="relative w-full max-w-5xl bg-[#ffffff] border border-black/10 rounded-[2.5rem] overflow-hidden shadow-2xl my-auto text-[#111111] flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-black/10 bg-white/95 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: universe.accentColor }}
            />
            <span className="font-mono text-xs tracking-[0.2em] text-[#666666] uppercase font-bold">
              ROOM 0{universe.index} • {universe.category}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 overflow-y-auto bg-[#fafafa]">
          {/* Left Column (5 Cols): Live 3D Sneaker Canvas & Colorway Selection */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Live 3D Sneaker Showcase */}
            <div
              className="relative h-64 sm:h-72 rounded-3xl border border-black/10 bg-white shadow-sm flex flex-col items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${universe.accentColor}12 0%, #ffffff 100%)`,
              }}
            >
              <MiniSneakerCanvas universe={universe} heightClass="h-64 sm:h-72" />

              <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-[10px] font-sans font-bold tracking-wider uppercase shadow-md">
                <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                <span>3D MODEL ACTIVE</span>
              </div>
            </div>

            {/* Colorway Selection */}
            <div>
              <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-2 font-bold">
                COLORWAYS ({universe.colorways.length})
              </span>
              <div className="grid grid-cols-3 gap-2">
                {universe.colorways.map((cw) => (
                  <button
                    key={cw.id}
                    onClick={() => {
                      setSelectedColorway(cw);
                      audio.playChime(580, 'sine', 0.08);
                    }}
                    className={`flex items-center space-x-2 p-2 rounded-xl border text-left transition-all ${
                      selectedColorway.id === cw.id
                        ? 'border-[#111111] bg-white shadow-sm ring-1 ring-black'
                        : 'border-black/10 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                      style={{ backgroundColor: cw.hex }}
                    />
                    <span className="font-sans text-[10px] text-[#111111] font-bold truncate">
                      {cw.name.split(' / ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exploded Engineering Layers (Concise 1-liner chips) */}
            <div>
              <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider block mb-2 font-bold">
                CHASSIS LAYERS ({universe.explodedLayers.length})
              </span>
              <div className="space-y-1.5">
                {universe.explodedLayers.map((layer, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedLayerIndex(idx);
                      audio.playExplode();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                      selectedLayerIndex === idx
                        ? 'border-[#0284c7] bg-[#f0f9ff] shadow-xs'
                        : 'border-black/10 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-[#0284c7]">
                        0{idx + 1}
                      </span>
                      <span className="font-sans text-xs font-bold text-[#111111] truncate">
                        {layer.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 truncate ml-2">
                      {layer.material.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Bite-Sized Performance Specs & Instant E-Commerce CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111] leading-none">
                  {universe.productName}
                </h3>
                <span className="font-sans text-xs font-bold uppercase text-[#0284c7] block mt-1">
                  {universe.subtitle}
                </span>
              </div>

              {/* Punchy Key Innovation Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl border border-black/10 bg-white shadow-xs">
                  <div className="flex items-center space-x-1.5 font-mono text-[10px] font-bold uppercase text-[#0284c7] mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>{universe.highlightTitle}</span>
                  </div>
                  <p className="font-sans text-xs text-[#444444] font-medium leading-snug">
                    {universe.highlightDescription}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-black/10 bg-white shadow-xs">
                  <div className="flex items-center space-x-1.5 font-mono text-[10px] font-bold uppercase text-[#65a30d] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{universe.knowHowTitle}</span>
                  </div>
                  <p className="font-sans text-xs text-[#444444] font-medium leading-snug">
                    {universe.knowHowDescription}
                  </p>
                </div>
              </div>

              {/* Technical Performance Specs Badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-2xl border border-black/10 bg-white">
                  <span className="font-mono text-[9px] text-gray-500 uppercase block font-bold">
                    WEIGHT
                  </span>
                  <span className="font-sans text-xs font-black text-[#111111] mt-0.5 block">
                    {universe.specs.weight}
                  </span>
                </div>
                <div className="p-3 rounded-2xl border border-black/10 bg-white">
                  <span className="font-mono text-[9px] text-gray-500 uppercase block font-bold">
                    ENERGY RETURN
                  </span>
                  <span className="font-sans text-xs font-black text-[#65a30d] mt-0.5 block">
                    {universe.specs.energyReturn}
                  </span>
                </div>
                <div className="p-3 rounded-2xl border border-black/10 bg-white">
                  <span className="font-mono text-[9px] text-gray-500 uppercase block font-bold">
                    OFFSET / DROP
                  </span>
                  <span className="font-sans text-xs font-black text-[#111111] mt-0.5 block">
                    {universe.specs.drop || '10mm'}
                  </span>
                </div>
              </div>

              {/* Cushioning Breakdown Chip */}
              <div className="p-3 rounded-2xl border border-black/10 bg-white flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-500 uppercase font-bold">
                  CUSHIONING ARCHITECTURE
                </span>
                <span className="font-sans text-xs font-bold text-[#111111]">
                  {universe.specs.cushioning}
                </span>
              </div>
            </div>

            {/* Price & Purchase Actions */}
            <div className="pt-4 border-t border-black/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block font-bold">
                    OFFICIAL PRICE (INCL. GST)
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-sans text-2xl sm:text-3xl font-black text-[#111111]">
                      ₹{universe.priceINR.toLocaleString('en-IN')}
                    </span>
                    <span className="font-sans text-xs font-bold text-gray-500">
                      / ${universe.priceUSD}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-mono font-bold">
                  <Truck className="w-4 h-4" />
                  <span>FREE DELIVERY</span>
                </div>
              </div>

              {/* Dual Purchase Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center space-x-2 active:scale-98"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleInstantCheckout}
                  className="w-full py-3.5 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center space-x-2 active:scale-98"
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

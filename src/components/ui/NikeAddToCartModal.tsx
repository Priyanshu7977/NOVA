'use client';

import React, { useState } from 'react';
import { NikeUniverseData } from '@/data/nikeUniverses';
import { useExperience } from '@/context/ExperienceContext';
import { PRODUCTS } from '@/data/products';
import { X, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Check, Sparkles } from 'lucide-react';
import { MiniSneakerCanvas } from './MiniSneakerCanvas';
import { audio } from '@/components/audio/NikeAudioEngine';

interface NikeAddToCartModalProps {
  universe: NikeUniverseData | null;
  onClose: () => void;
}

const AVAILABLE_SIZES = [
  { uk: 'UK 6', eu: 'EU 40', us: 'US 7', stock: 'In Stock' },
  { uk: 'UK 6.5', eu: 'EU 40.5', us: 'US 7.5', stock: 'In Stock' },
  { uk: 'UK 7', eu: 'EU 41', us: 'US 8', stock: 'In Stock' },
  { uk: 'UK 7.5', eu: 'EU 42', us: 'US 8.5', stock: 'Low Stock' },
  { uk: 'UK 8', eu: 'EU 42.5', us: 'US 9', stock: 'In Stock' },
  { uk: 'UK 8.5', eu: 'EU 43', us: 'US 9.5', stock: 'In Stock' },
  { uk: 'UK 9', eu: 'EU 44', us: 'US 10', stock: 'Most Popular' },
  { uk: 'UK 9.5', eu: 'EU 44.5', us: 'US 10.5', stock: 'In Stock' },
  { uk: 'UK 10', eu: 'EU 45', us: 'US 11', stock: 'In Stock' },
  { uk: 'UK 10.5', eu: 'EU 45.5', us: 'US 11.5', stock: 'Low Stock' },
  { uk: 'UK 11', eu: 'EU 46', us: 'US 12', stock: 'In Stock' },
  { uk: 'UK 12', eu: 'EU 47.5', us: 'US 13', stock: 'In Stock' },
];

export const NikeAddToCartModal: React.FC<NikeAddToCartModalProps> = ({ universe, onClose }) => {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useExperience();
  const [selectedSize, setSelectedSize] = useState('UK 9');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!universe) return null;

  const activeColorway = universe.colorways[selectedColorIndex] || universe.colorways[0];

  const handleAddToCart = () => {
    audio.playSonicBlast();
    setIsAdded(true);

    // Map universe to product format
    const product = PRODUCTS.find((p) => p.id === universe.id) || {
      id: universe.id,
      name: universe.productName,
      tagline: universe.subtitle,
      price: universe.priceINR,
      category: universe.category,
      description: universe.highlightDescription,
      defaultColorway: activeColorway,
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

    addToCart(product as any, activeColorway, selectedSize);

    setTimeout(() => {
      setIsAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 600);
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
      defaultColorway: activeColorway,
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

    addToCart(product as any, activeColorway, selectedSize);
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fade-in"
    >
      {/* Frosted Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Main Modal Card (Official Nova.in Architecture) */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#ffffff] text-[#111111] rounded-[2.5rem] shadow-2xl border border-[#e5e5e5] flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#111111] transition-all hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: 3D Interactive Sneaker Showcase */}
        <div
          className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${universe.accentColor}12 0%, #f8fafc 100%)`,
          }}
        >
          {/* Top Pill Badges */}
          <div className="w-full flex items-center justify-between z-10">
            <span
              className="px-3.5 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase border"
              style={{
                backgroundColor: `${universe.accentColor}15`,
                borderColor: `${universe.accentColor}40`,
                color: universe.accentColor,
              }}
            >
              {universe.highlightTitle}
            </span>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">
              AUTHENTIC NOVA.IN
            </span>
          </div>

          {/* Large Hero 3D Sneaker Canvas */}
          <div className="w-full h-64 sm:h-72 my-2 flex items-center justify-center relative">
            <MiniSneakerCanvas universe={universe} heightClass="h-72" />
          </div>

          {/* 3D Interaction Telemetry Prompt */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-black/5">
            <span className="flex items-center space-x-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>3D STUDIO GLTF MODEL</span>
            </span>
            <span className="font-bold text-emerald-600">IN STOCK & READY TO SHIP</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Official Nova Purchase & Size Selector */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          {/* Title, Category & Pricing */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-500 uppercase mb-1">
              <span>{universe.category}</span>
              <span>•</span>
              <span style={{ color: universe.accentColor }}>{universe.subtitle}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none text-[#111111]">
              {universe.productName}
            </h2>

            <div className="flex items-baseline space-x-3 mt-3">
              <span className="font-sans text-2xl font-black text-[#111111]">
                ₹{universe.priceINR.toLocaleString('en-IN')}
              </span>
              <span className="font-mono text-sm font-bold text-gray-400">
                ${universe.priceUSD} USD
              </span>
              <span className="text-[11px] font-mono text-gray-500">incl. of all taxes</span>
            </div>
          </div>

          {/* Colorway Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                SELECT COLORWAY:
              </span>
              <span className="text-xs font-mono font-bold text-gray-500">
                {activeColorway.name}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {universe.colorways.map((col, idx) => (
                <button
                  key={col.id}
                  onClick={() => {
                    audio.playChime(600 + idx * 50, 'sine', 0.08);
                    setSelectedColorIndex(idx);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-2xl border transition-all ${
                    selectedColorIndex === idx
                      ? 'border-black bg-black/5 shadow-sm scale-105'
                      : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-xs font-sans font-bold text-[#111111]">
                    {col.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Picker (Official UK Sizes) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                SELECT SIZE (UK):
              </span>
              <button
                onClick={() => audio.playChime(500, 'sine', 0.08)}
                className="text-[11px] font-mono font-bold text-gray-500 hover:text-black underline uppercase"
              >
                SIZE GUIDE
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_SIZES.map((sz) => {
                const isSelected = selectedSize === sz.uk;
                return (
                  <button
                    key={sz.uk}
                    onClick={() => {
                      audio.playChime(580, 'sine', 0.06);
                      setSelectedSize(sz.uk);
                    }}
                    className={`py-2.5 px-1 rounded-xl text-center font-sans font-bold text-xs transition-all ${
                      isSelected
                        ? 'bg-[#111111] text-white shadow-md scale-[1.02]'
                        : 'bg-[#f4f4f5] text-[#111111] hover:bg-[#e4e4e7] border border-transparent'
                    }`}
                  >
                    <span className="block leading-none">{sz.uk}</span>
                    <span
                      className={`text-[9px] font-mono block mt-0.5 ${
                        isSelected ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {sz.eu}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Add to Bag & Buy Now */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2 active:scale-98 hover:scale-[1.01]"
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
              onClick={handleInstantCheckout}
              className="w-full py-3.5 rounded-2xl border-2 border-[#111111] hover:bg-black hover:text-white text-[#111111] font-sans font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2 active:scale-98"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>BUY NOW • 1-CLICK CHECKOUT</span>
            </button>
          </div>

          {/* Trust Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-[10px] font-mono font-bold text-gray-700">FREE DELIVERY</span>
              <span className="text-[9px] font-mono text-gray-400">For Nova Members</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-blue-600 mb-1" />
              <span className="text-[10px] font-mono font-bold text-gray-700">30-DAY RETURN</span>
              <span className="text-[9px] font-mono text-gray-400">Hassle-free</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-amber-600 mb-1" />
              <span className="text-[10px] font-mono font-bold text-gray-700">100% ORIGINAL</span>
              <span className="text-[9px] font-mono text-gray-400">Direct from Nova</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

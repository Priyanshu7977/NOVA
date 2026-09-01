'use client';

import React, { useState } from 'react';
import { Product, ProductColorway, PRODUCTS } from '@/data/products';
import { StudioViewer3D } from './StudioViewer3D';
import { SizeGuideModal } from './SizeGuideModal';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  Ruler,
  Check,
  ShoppingBag,
  Zap,
  Compass,
  Layers,
} from 'lucide-react';
import { NikeShoeGraphic } from '@/components/ui/NikeShoeGraphic';
import Link from 'next/link';

interface ProductShowroomProps {
  product: Product;
  onBack?: () => void;
}

const UK_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

export const ProductShowroom: React.FC<ProductShowroomProps> = ({ product, onBack }) => {
  const { addToCart, setIsCartOpen, setPreset } = useExperience();

  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(product.defaultColorway);
  const [selectedSize, setSelectedSize] = useState<string>('UK 9');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Recommendations: 3 products excluding current
  const recommendations = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleColorwayChange = (cw: ProductColorway) => {
    sounds.playShimmer();
    setSelectedColorway(cw);

    // Map colorway ID to 3D model preset
    if (cw.id === 'arctic') setPreset('ARCTIC');
    else if (cw.id === 'obsidian') setPreset('OBSIDIAN');
    else if (cw.id === 'volt') setPreset('VOLT');
    else if (cw.id === 'ultraviolet') setPreset('ULTRAVIOLET');
    else if (cw.id === 'carbon') setPreset('CARBON');
    else if (cw.id === 'solar') setPreset('SOLAR');
  };

  const handleSizeSelect = (sz: string) => {
    sounds.playClick();
    setSelectedSize(sz);
    setValidationError(null);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setValidationError('Please select a UK shoe size');
      return;
    }

    sounds.playClick();
    setIsAdding(true);

    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedColorway, selectedSize);
      }
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2200);
    }, 350);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Please select a UK shoe size');
      return;
    }

    sounds.playClick();
    addToCart(product, selectedColorway, selectedSize);
    setIsCartOpen(true);
  };

  return (
    <div className="w-full bg-[#F7F7F5] text-[#111111] min-h-screen pt-24 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* 1. Top Navigation: Back to Collection */}
        <div className="mb-8">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#6B6B6B] hover:text-[#111111] uppercase transition-colors"
            >
              <ArrowLeft size={16} />
              <span>BACK TO COLLECTION</span>
            </button>
          ) : (
            <Link
              href="/#nova-collection"
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#6B6B6B] hover:text-[#111111] uppercase transition-colors"
            >
              <ArrowLeft size={16} />
              <span>BACK TO COLLECTION</span>
            </Link>
          )}
        </div>

        {/* 2. Hero Section: Two-Column Studio Showroom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left: 3D Interactive Studio Viewer */}
          <div className="lg:col-span-7 space-y-6">
            <StudioViewer3D colorway={selectedColorway} />

            {/* Spec Highlights Below 3D Viewer */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-[#FFFFFF] rounded-2xl border border-[#E5E5E2] font-mono text-center shadow-sm">
              <div>
                <div className="text-sm font-bold text-[#111111]">{product.specs.energyReturn}</div>
                <div className="text-[10px] text-[#6B6B6B] uppercase">ENERGY RETURN</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#111111]">{product.specs.weight}</div>
                <div className="text-[10px] text-[#6B6B6B] uppercase">WEIGHT</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#111111]">{product.specs.drop}</div>
                <div className="text-[10px] text-[#6B6B6B] uppercase">HEEL DROP</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#111111]">DUAL-PLANE</div>
                <div className="text-[10px] text-[#6B6B6B] uppercase">CARBON SPOON</div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Product Configurator & Purchasing Details */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-8 md:p-10 rounded-3xl border border-[#E5E5E2] space-y-6 shadow-sm">
            {/* Header, Badges & Price */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#6B6B6B] uppercase">
                  {product.number} // {product.category}
                </span>
                {product.badge && (
                  <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#111111] text-white uppercase">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#111111] uppercase leading-none">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-3 font-mono">
                <span className="text-3xl font-black text-[#111111]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-[#6B6B6B] font-medium">{selectedColorway.name}</span>
              </div>

              {/* Verified Star Rating */}
              <div className="flex items-center space-x-2 text-xs text-[#6B6B6B] pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="font-mono font-bold text-[#111111]">5.0</span>
                <span className="font-mono">({product.reviewsCount} verified reviews)</span>
              </div>

              <p className="text-xs sm:text-sm font-mono text-[#6B6B6B] leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Colorway Selection */}
            <div className="space-y-3 pt-4 border-t border-[#F0F0ED]">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-[#6B6B6B] uppercase">COLORWAY:</span>
                <span className="text-[#111111]">{selectedColorway.name}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                {product.colorways.map((cw) => {
                  const isSelected = selectedColorway.id === cw.id;
                  return (
                    <button
                      key={cw.id}
                      onClick={() => handleColorwayChange(cw)}
                      className={`w-8 h-8 rounded-full border transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#111111] ring-offset-2 scale-110'
                          : 'hover:scale-105 border-black/20'
                      }`}
                      style={{ backgroundColor: cw.hex }}
                      title={cw.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* UK Size Selection */}
            <div className="space-y-3 pt-4 border-t border-[#F0F0ED]">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-[#6B6B6B] uppercase">SELECT SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center space-x-1 text-[#111111] hover:underline text-[11px]"
                >
                  <Ruler size={13} />
                  <span>SIZE GUIDE</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {UK_SIZES.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => handleSizeSelect(sz)}
                      className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                          : 'bg-[#FFFFFF] text-[#111111] border-[#E5E5E2] hover:border-[#111111]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {validationError && (
                <div className="text-xs font-mono text-red-600 animate-in fade-in">
                  {validationError}
                </div>
              )}
            </div>

            {/* Quantity Controller */}
            <div className="flex justify-between items-center pt-4 border-t border-[#F0F0ED]">
              <span className="text-xs font-mono font-bold text-[#6B6B6B] uppercase">QUANTITY:</span>
              <div className="flex items-center space-x-4 bg-[#F7F7F5] px-3.5 py-1.5 rounded-xl border border-[#E5E5E2]">
                <button
                  onClick={() => {
                    sounds.playClick();
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                  className="text-base font-bold text-[#6B6B6B] hover:text-[#111111]"
                >
                  −
                </button>
                <span className="font-mono text-xs font-bold text-[#111111] px-2">{quantity}</span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setQuantity(quantity + 1);
                  }}
                  className="text-base font-bold text-[#6B6B6B] hover:text-[#111111]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Purchasing Action Buttons with Micro-Interactions */}
            <div className="space-y-3 pt-6 border-t border-[#E5E5E2]">
              {/* Dominant ADD TO BAG Button */}
              <button
                onClick={handleAddToBag}
                disabled={isAdding}
                className={`w-full py-4 rounded-2xl font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center space-x-3 nova-btn-primary ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#111111] hover:bg-black text-white hover:scale-[1.01]'
                }`}
              >
                {isAdding ? (
                  <span>ADDING TO BAG...</span>
                ) : isAdded ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO BAG ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO BAG</span>
                    <ArrowRight size={16} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Secondary BUY NOW Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl border-2 border-[#111111] bg-transparent hover:bg-[#111111] text-[#111111] hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2"
              >
                <span>BUY NOW</span>
                <ArrowRight size={14} />
              </button>

              {/* Trust Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#6B6B6B] pt-2">
                <span className="flex items-center space-x-1.5">
                  <Truck size={13} className="text-emerald-600" />
                  <span>Free Express Delivery</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck size={13} className="text-[#111111]" />
                  <span>30-Day Free Returns</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Architecture Editorial Section */}
        <div className="my-28 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-mono tracking-mega text-[#6B6B6B] uppercase font-bold">
              THE ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-[#111111] uppercase leading-none">
              BUILT FROM <br />
              THE GROUND UP.
            </h2>
            <p className="text-sm font-mono text-[#6B6B6B]">
              Every component calibrated in high-velocity harmonic resonance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#E5E5E2] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-black tracking-tight uppercase">NOVA FOAM</h3>
              <p className="text-xs font-mono text-[#6B6B6B] leading-relaxed">
                Responsive supercritical foam designed to compress under impact and return 87% kinetic strain energy through the stride.
              </p>
            </div>

            <div className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#E5E5E2] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <Zap size={20} className="text-[#a855f7]" />
              </div>
              <h3 className="text-lg font-black tracking-tight uppercase">CARBON DYNAMICS</h3>
              <p className="text-xs font-mono text-[#6B6B6B] leading-relaxed">
                Dual-plane carbon spoon blade engineered for torsional rigidity, multi-axis stabilization, and explosive forward propulsion.
              </p>
            </div>

            <div className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#E5E5E2] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <Compass size={20} className="text-[#00f0ff]" />
              </div>
              <h3 className="text-lg font-black tracking-tight uppercase">AEROMESH</h3>
              <p className="text-xs font-mono text-[#6B6B6B] leading-relaxed">
                Technical multi-density knit upper engineered with micro-perforations for zero-drag breathability and locked-in midfoot containment.
              </p>
            </div>

            <div className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#E5E5E2] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-black tracking-tight uppercase">NOVA TRACTION</h3>
              <p className="text-xs font-mono text-[#6B6B6B] leading-relaxed">
                Directional diamond micro-lug outsole designed for frictionless cornering and high-abrasion grip on wet road and track surfaces.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Product Detail Visual Breakdowns */}
        <div className="my-28 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E5E5E2] space-y-3 shadow-sm text-center">
              <span className="text-xs font-mono font-bold text-[#6B6B6B]">01 / UPPER</span>
              <h4 className="text-xl font-black uppercase">DYNAMIC AEROMESH</h4>
              <p className="text-xs font-mono text-[#6B6B6B]">
                Engineered warp knitting ensures anatomical toe-box flexibility and zero heat build-up.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E5E5E2] space-y-3 shadow-sm text-center">
              <span className="text-xs font-mono font-bold text-[#6B6B6B]">02 / MIDSOLE</span>
              <h4 className="text-xl font-black uppercase">SUPERCRITICAL CORE</h4>
              <p className="text-xs font-mono text-[#6B6B6B]">
                Nitrogen-injected elastomer foam eliminates impact shock within 12 milliseconds.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E5E5E2] space-y-3 shadow-sm text-center">
              <span className="text-xs font-mono font-bold text-[#6B6B6B]">03 / TRACTION</span>
              <h4 className="text-xl font-black uppercase">ZONED GRIP MATRIX</h4>
              <p className="text-xs font-mono text-[#6B6B6B]">
                Segmented rubber pods ensure continuous contact across transitions and curves.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Recommendations: YOU MAY ALSO LIKE */}
        <div className="my-28 pt-12 border-t border-[#E5E5E2] space-y-8">
          <div className="flex justify-between items-baseline">
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-mega text-[#6B6B6B] uppercase font-bold">
                CURATED RECOMMENDATIONS
              </span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111111] uppercase">
                YOU MAY ALSO LIKE
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/product/${rec.id}`}
                className="group p-6 bg-[#FFFFFF] rounded-2xl border border-[#E5E5E2] hover:border-[#111111]/40 transition-all shadow-sm hover:shadow-md block space-y-4"
              >
                <div className="flex justify-between items-center text-xs font-mono text-[#6B6B6B]">
                  <span>{rec.number} / {rec.name}</span>
                  <span className="font-bold text-[#111111]">₹{rec.price.toLocaleString('en-IN')}</span>
                </div>

                <div className="h-28 flex items-center justify-center">
                  <div className="w-44 aspect-[16/10] group-hover:scale-105 transition-transform">
                    <NikeShoeGraphic colorway={rec.defaultColorway} />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#F0F0ED]">
                  <span className="text-xs font-mono text-[#6B6B6B]">{rec.tagline}</span>
                  <div className="text-[11px] font-mono font-bold text-[#111111] group-hover:text-accent flex items-center space-x-1">
                    <span>VIEW</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onSelectSize={handleSizeSelect}
        selectedSize={selectedSize}
      />
    </div>
  );
};

'use client';

import React from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { X, Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { audio } from '@/components/audio/NikeAudioEngine';
import { MiniSneakerCanvas } from './MiniSneakerCanvas';
import { NIKE_UNIVERSES } from '@/data/nikeUniverses';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setIsCheckoutOpen,
  } = useExperience();

  if (!isCartOpen) return null;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleClose = () => {
    audio.playClick();
    setIsCartOpen(false);
  };

  const handleProceedToCheckout = () => {
    audio.playSonicBlast();
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none animate-fade-in"
    >
      {/* Dark Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Right Drawer Panel (480px on desktop, full-width on mobile) */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FFFFFF] text-[#111111] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#E5E5E2]">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-[#E5E5E2] flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-[#111111]" />
              <div>
                <h2 id="cart-drawer-title" className="font-display text-2xl font-black tracking-tight text-[#111111] uppercase leading-none">
                  YOUR BAG ({totalItemsCount})
                </h2>
                <span className="text-[10px] font-mono text-gray-500 font-bold">
                  FREE MEMBER SHIPPING ELIGIBLE
                </span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-[#F4F4F5] hover:bg-[#E4E4E7] flex items-center justify-center text-[#111111] transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-16">
                <div className="w-20 h-20 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#A1A1AA] border border-[#E5E5E2]">
                  <ShoppingBag size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-black tracking-tight text-[#111111] uppercase">
                    YOUR BAG IS EMPTY.
                  </h3>
                  <p className="text-xs font-mono text-[#6B6B6B] max-w-[260px] mx-auto">
                    Explore the 2026 collection and add your precision performance footwear.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-md inline-flex items-center space-x-2"
                >
                  <span>EXPLORE SHOWCASE</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const matchedUniverse =
                  NIKE_UNIVERSES.find((u) => u.id === item.id.split('-')[0]) || NIKE_UNIVERSES[0];

                return (
                  <div
                    key={item.id}
                    className="flex space-x-4 p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E2] relative animate-in fade-in duration-200"
                  >
                    {/* Live 3D Sneaker Thumbnail */}
                    <div className="w-24 h-24 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 shadow-inner bg-white overflow-hidden">
                      <MiniSneakerCanvas universe={matchedUniverse} heightClass="h-24" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-base font-black text-[#111111] truncate uppercase">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => {
                            audio.playClick();
                            removeFromCart(item.id);
                          }}
                          className="text-[#A1A1AA] hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="text-xs font-mono text-[#6B6B6B]">
                        {item.subtitle} · <span className="font-bold text-[#111111]">{item.size}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2 font-mono">
                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-2 bg-white px-2.5 py-1 rounded-lg border border-[#E5E5E2]">
                          <button
                            onClick={() => {
                              audio.playClick();
                              updateQuantity(item.id, -1);
                            }}
                            className="text-xs font-bold text-[#6B6B6B] hover:text-[#111111] px-1"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold text-[#111111] px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => {
                              audio.playClick();
                              updateQuantity(item.id, 1);
                            }}
                            className="text-xs font-bold text-[#6B6B6B] hover:text-[#111111] px-1"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm font-black text-[#111111]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sticky Footer Summary & Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-6 md:p-8 border-t border-[#E5E5E2] space-y-4 bg-[#FFFFFF] sticky bottom-0 z-10 shadow-lg">
              {/* Delivery Banner */}
              <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3.5 py-2.5 rounded-xl border border-emerald-200 font-bold">
                <Truck size={15} className="text-emerald-700" />
                <span>FREE NOVA EXPRESS DELIVERY UNLOCKED</span>
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-2 font-mono text-xs border-b border-[#F0F0ED] pb-3">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-[#111111]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>ESTIMATED DELIVERY</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#111111] pt-1 font-sans">
                  <span>TOTAL</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-98"
                >
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>MEMBER CHECKOUT</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 text-[#6B6B6B] hover:text-[#111111] font-mono text-xs font-bold tracking-widest uppercase transition-colors"
                >
                  CONTINUE BROWSING
                </button>
              </div>

              {/* Supported Payment Logos */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>256-BIT ENCRYPTED</span>
                </div>
                <div className="flex items-center space-x-1.5 font-bold">
                  <span className="text-blue-600">GPay</span>
                  <span>•</span>
                  <span className="text-indigo-600">PhonePe</span>
                  <span>•</span>
                  <span className="text-blue-800">VISA</span>
                  <span>•</span>
                  <span className="text-red-600">Mastercard</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

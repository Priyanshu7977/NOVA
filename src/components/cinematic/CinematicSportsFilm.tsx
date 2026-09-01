'use client';

import React, { useRef } from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { NikeShoeGraphic } from '@/components/ui/NikeShoeGraphic';
import { PRODUCTS } from '@/data/products';
import { sounds } from '@/components/audio/SoundManager';
import { ArrowRight, ShoppingBag, Eye, Zap, Shield, Flame } from 'lucide-react';

interface CinematicSportsFilmProps {
  scrollProgress: number; // 0 to 1 across the film sequence
}

export const CinematicSportsFilm: React.FC<CinematicSportsFilmProps> = ({ scrollProgress }) => {
  const { setSelectedProductForModal, addToCart } = useExperience();

  // ----------------------------------------------------
  // SCENE TIMINGS (0.0 to 1.0)
  // Scene 1 (Opening / Football Kick): 0.00 to 0.28
  // Scene 2 (Badminton Court & Shoe):  0.28 to 0.56
  // Scene 3 (Runner & Kinetic Speed):  0.56 to 0.82
  // Scene 4 (Product Reveal Hero):     0.82 to 1.00
  // ----------------------------------------------------

  // Scene 1 Progress (0 to 1)
  const p1 = Math.max(0, Math.min(1, scrollProgress / 0.28));
  // Scene 2 Progress (0 to 1)
  const p2 = Math.max(0, Math.min(1, (scrollProgress - 0.28) / 0.28));
  // Scene 3 Progress (0 to 1)
  const p3 = Math.max(0, Math.min(1, (scrollProgress - 0.56) / 0.26));
  // Scene 4 Progress (0 to 1)
  const p4 = Math.max(0, Math.min(1, (scrollProgress - 0.82) / 0.18));

  // Scene 1: Ball scale, position & kick
  const ballScale = 1 + p1 * 0.45;
  const ballRot = p1 * 720;
  const kickTime = Math.max(0, (p1 - 0.5) / 0.5); // kicks between 0.5 and 1.0 of Scene 1
  const bootTranslateX = (1 - kickTime) * 350;
  const bootTranslateY = (1 - kickTime) * 120;
  const ballLaunchX = kickTime * 650;
  const ballLaunchY = -kickTime * 280;

  // Scene 2: Badminton Athlete & Shuttlecock
  const athleteLunge = p2 < 0.5 ? p2 * 2 : 1;
  const smashTime = Math.max(0, (p2 - 0.45) / 0.55);
  const shuttleX = smashTime * 800;
  const shuttleY = smashTime * 350;

  // Scene 3: Runner Launch & Parallax
  const runAcceleration = Math.min(1, p3 * 1.4);
  const groundOffset = (p3 * 1200) % 300;

  // Featured Products for Scene 4 Reveal
  const heroProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="relative w-full h-full bg-[#F7F7F5] text-[#111111] overflow-hidden select-none">
      {/* Background Clean Architectural Atmosphere & Diffused Ambient Grid */}
      <div className="absolute inset-0 bg-radial-gradient-light opacity-80 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ==================================================== */}
      {/* SCENE 1 — OPENING / SUSPENDED BALL & NIKE KICK      */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          scrollProgress < 0.32 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Clean Center Typography */}
        <div
          className="absolute text-center z-10 transition-transform duration-300"
          style={{
            transform: `translateY(${-p1 * 120}px) scale(${1 - p1 * 0.2})`,
            opacity: Math.max(0, 1 - p1 * 1.8),
          }}
        >
          <span className="text-[11px] font-mono font-bold tracking-mega text-[#6B6B6B] uppercase block mb-2">
            CHAPTER 01 // KINETIC ORIGIN
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#111111] leading-none uppercase">
            NOVA
          </h1>
          <p className="text-sm sm:text-base font-mono font-semibold tracking-widest text-[#6B6B6B] uppercase mt-3">
            MOVE WITHOUT LIMITS.
          </p>
        </div>

        {/* Suspended Ball (Interactive Physics & Rotation) */}
        <div
          className="relative z-20 flex items-center justify-center"
          style={{
            transform: `translate(${ballLaunchX}px, ${ballLaunchY}px) scale(${ballScale}) rotate(${ballRot}deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {/* Realistic 3D Shaded Sports Ball */}
          <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8] shadow-2xl relative overflow-hidden border border-black/5 flex items-center justify-center">
            {/* Ball Seam Patterns */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#1e293b" strokeWidth="2" />
              <path d="M 15 50 Q 50 15 85 50" fill="none" stroke="#1e293b" strokeWidth="2.5" />
              <path d="M 15 50 Q 50 85 85 50" fill="none" stroke="#1e293b" strokeWidth="2.5" />
              <path d="M 50 15 Q 15 50 50 85" fill="none" stroke="#1e293b" strokeWidth="2.5" />
              <path d="M 50 15 Q 85 50 50 85" fill="none" stroke="#1e293b" strokeWidth="2.5" />
            </svg>
            {/* Highlight Reflex */}
            <div className="absolute top-4 left-6 w-12 h-8 rounded-full bg-white/60 blur-sm" />
          </div>

          {/* Dynamic Ground Shadow */}
          <div
            className="absolute -bottom-16 w-44 h-8 rounded-full bg-black/10 blur-md pointer-events-none"
            style={{
              transform: `scale(${Math.max(0.2, 1 - kickTime * 0.8)})`,
              opacity: Math.max(0, 1 - kickTime),
            }}
          />
        </div>

        {/* Incoming Nike Mercurial Football Boot */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            transform: `translate(${bootTranslateX - 120}px, ${bootTranslateY + 40}px) rotate(${-25 + kickTime * 35}deg) scale(1.15)`,
            opacity: p1 > 0.15 ? Math.min(1, (p1 - 0.15) / 0.25) : 0,
            transition: 'transform 0.05s linear',
          }}
        >
          <div className="w-72 h-44 drop-shadow-2xl">
            <NikeShoeGraphic product={PRODUCTS[1]} />
          </div>
        </div>

        {/* Shockwave Particle Ring on Impact */}
        {kickTime > 0.1 && (
          <div
            className="absolute z-10 w-72 h-72 rounded-full border-2 border-emerald-500/40 pointer-events-none"
            style={{
              transform: `scale(${kickTime * 3.5})`,
              opacity: Math.max(0, 1 - kickTime * 1.5),
            }}
          />
        )}
      </div>

      {/* ==================================================== */}
      {/* SCENE 2 — BADMINTON / COURT & FOOTWEAR FOCUS        */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          scrollProgress >= 0.25 && scrollProgress < 0.60 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Court Boundary Lines (Architectural Floor Markings) */}
        <div className="absolute inset-x-12 bottom-16 h-48 border-t-2 border-x-2 border-black/10 rounded-t-3xl flex justify-between pointer-events-none">
          <div className="w-1/3 border-r border-black/5" />
          <div className="w-1/3 border-r border-black/5" />
        </div>

        {/* Editorial Scene Title */}
        <div
          className="absolute top-24 text-center z-10"
          style={{
            transform: `translateY(${p2 * 20}px)`,
            opacity: Math.min(1, p2 * 2.5),
          }}
        >
          <span className="text-[11px] font-mono font-bold tracking-mega text-blue-600 uppercase block mb-1">
            CHAPTER 02 // COURT FRICTION & DYNAMICS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase">
            EXPLOSIVE CUTS
          </h2>
          <p className="text-xs font-mono text-[#6B6B6B] max-w-md mx-auto mt-2">
            Instantaneous directional change with Nike Court Air Zoom Vapor Pro 2 lateral stabilization.
          </p>
        </div>

        {/* Center Stage: Court Shoe in Sharp Macro Focus */}
        <div
          className="relative z-20 flex flex-col items-center justify-center"
          style={{
            transform: `translateY(${(1 - p2) * 80}px) scale(${0.85 + p2 * 0.3})`,
            transition: 'transform 0.05s linear',
          }}
        >
          <div className="w-80 sm:w-96 aspect-[16/10] drop-shadow-2xl">
            <NikeShoeGraphic product={PRODUCTS[2]} />
          </div>

          {/* Technical Shoe Callout Badge */}
          <div className="mt-4 px-4 py-2 rounded-full bg-white/90 border border-black/10 shadow-sm backdrop-blur-md flex items-center space-x-3">
            <Shield size={14} className="text-blue-600" />
            <span className="text-xs font-mono font-bold text-[#111111]">
              NIKE COURT AIR ZOOM VAPOR PRO 2 // ₹10,795
            </span>
          </div>
        </div>

        {/* Flying Shuttlecock with Kinetic Trajectory Streak */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            transform: `translate(${shuttleX - 300}px, ${-shuttleY + 150}px) rotate(${45 + smashTime * 90}deg)`,
            opacity: smashTime > 0 ? Math.min(1, smashTime * 3) : 0,
          }}
        >
          <div className="w-14 h-14 bg-white/95 rounded-full border border-black/20 shadow-lg flex items-center justify-center">
            <span className="text-xs font-mono font-bold">🏸</span>
          </div>
          {/* Motion Blur Streak */}
          <div className="w-36 h-1 bg-gradient-to-r from-blue-500/60 to-transparent -translate-x-36 -translate-y-6" />
        </div>
      </div>

      {/* ==================================================== */}
      {/* SCENE 3 — RUNNER / KINETIC SPEED & GROUND PARALLAX  */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          scrollProgress >= 0.52 && scrollProgress < 0.85 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Kinetic Parallax Track Ground Surface */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#E2E8F0]/80 to-transparent border-t border-black/10 overflow-hidden pointer-events-none">
          <div
            className="w-[200%] h-full flex"
            style={{
              transform: `translateX(${-groundOffset}px)`,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-32 h-full border-r border-dashed border-black/10 flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Editorial Scene Title */}
        <div
          className="absolute top-20 text-center z-10"
          style={{
            transform: `translateY(${p3 * 15}px)`,
            opacity: Math.min(1, p3 * 2.5),
          }}
        >
          <span className="text-[11px] font-mono font-bold tracking-mega text-emerald-600 uppercase block mb-1">
            CHAPTER 03 // MARATHON VELOCITY
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase">
            CONTINUOUS DRIVE
          </h2>
          <p className="text-xs font-mono text-[#6B6B6B] max-w-md mx-auto mt-2">
            Nike Alphafly 3 dual Zoom Air pods and S-curved Flyplate carbon dynamics.
          </p>
        </div>

        {/* Dynamic Running Footwear in Action */}
        <div
          className="relative z-20 flex flex-col items-center justify-center"
          style={{
            transform: `translateX(${(p3 - 0.5) * 120}px) scale(${0.9 + runAcceleration * 0.25}) rotate(${Math.sin(p3 * 25) * 4}deg)`,
            transition: 'transform 0.05s linear',
          }}
        >
          <div className="w-88 sm:w-[420px] aspect-[16/10] drop-shadow-2xl">
            <NikeShoeGraphic product={PRODUCTS[0]} />
          </div>

          {/* Running Speed Metric Callouts */}
          <div className="mt-4 flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-sm flex items-center space-x-2 font-mono text-xs">
              <Zap size={14} className="text-emerald-600" />
              <span className="font-bold">89.4% ENERGY RETURN</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-sm flex items-center space-x-2 font-mono text-xs">
              <Flame size={14} className="text-amber-500" />
              <span className="font-bold">218G MARATHON WEIGHT</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* SCENE 4 — PRODUCT REVEAL (FEATURED HERO LINEUP)     */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-0 flex flex-col justify-center px-6 max-w-7xl mx-auto z-40 transition-opacity duration-500 ${
          scrollProgress >= 0.80 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center mb-8 space-y-1">
          <span className="text-[11px] font-mono font-bold tracking-mega text-[#6B6B6B] uppercase">
            FEATURED PERFORMANCE LINEUP
          </span>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111] uppercase">
            THE HERO SPECIFICATIONS
          </h3>
        </div>

        {/* 3 Featured Cinematic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {heroProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                sounds.playClick();
                setSelectedProductForModal(prod);
              }}
              className="bg-white p-6 rounded-3xl border border-[#E5E5E2] hover:border-black/40 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                    {prod.number} // {prod.sport}
                  </span>
                  {prod.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[9px] font-mono font-bold uppercase">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-black tracking-tight text-[#111111] mt-2 group-hover:text-emerald-700 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-xs font-mono text-[#6B6B6B] mt-0.5">{prod.tagline}</p>
              </div>

              {/* Large Product Graphic */}
              <div className="my-6 py-2 flex items-center justify-center">
                <div className="w-full max-w-[240px] aspect-[16/10] group-hover:scale-105 transition-transform duration-500">
                  <NikeShoeGraphic product={prod} />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0F0ED] space-y-3">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-xs text-[#6B6B6B]">PRICE</span>
                  <span className="text-base font-bold text-[#111111]">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      setSelectedProductForModal(prod);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-black/10 hover:border-black text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye size={13} />
                    <span>VIEW 3D</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      addToCart(prod, prod.defaultColorway, 'UK 9');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-mono font-bold uppercase transition-all shadow-sm flex items-center justify-center space-x-1"
                  >
                    <ShoppingBag size={13} />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

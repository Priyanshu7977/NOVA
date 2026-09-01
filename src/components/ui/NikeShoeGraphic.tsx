'use client';

import React from 'react';
import { ProductColorway, Product } from '@/data/products';

interface NikeShoeGraphicProps {
  colorway?: ProductColorway;
  product?: Product;
  className?: string;
  category?: string;
}

export const NikeShoeGraphic: React.FC<NikeShoeGraphicProps> = ({
  colorway,
  product,
  className = 'w-full h-full',
  category,
}) => {
  const effectiveColorway = colorway || product?.defaultColorway || {
    id: 'default',
    name: 'Default',
    hex: '#16a34a',
    upperColor: '#16a34a',
    soleColor: '#ffffff',
    accentColor: '#22c55e',
    tagline: 'Velocity',
  };

  const effectiveCategory = category || product?.category || 'RUNNING';

  const upper = effectiveColorway.upperColor || '#16a34a';
  const sole = effectiveColorway.soleColor || '#ffffff';
  const accent = effectiveColorway.accentColor || '#22c55e';

  const isDarkSole = sole === '#09090b' || sole === '#18181b' || sole === '#111827';
  const soleFill = isDarkSole ? '#1e293b' : '#ffffff';
  const soleShadow = isDarkSole ? '#09090b' : '#e2e8f0';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-lg transition-transform duration-500 hover:scale-[1.03]"
      >
        {/* Soft Ambient Ground Contact Shadow */}
        <ellipse cx="250" cy="265" rx="190" ry="12" fill="rgba(0,0,0,0.08)" filter="blur(6px)" />
        <ellipse cx="250" cy="262" rx="140" ry="6" fill="rgba(0,0,0,0.12)" filter="blur(3px)" />

        {/* ==================================================== */}
        {/* FOOTBALL BOOT VARIANT (Mercurial Superfly)          */}
        {/* ==================================================== */}
        {effectiveCategory === 'FOOTBALL' ? (
          <g name="MERCURIAL_SUPERFLY">
            {/* FG Cleat Studs */}
            <path d="M 80,240 L 90,260 L 100,240 Z" fill="#0ea5e9" />
            <path d="M 130,240 L 140,260 L 150,240 Z" fill="#0ea5e9" />
            <path d="M 330,230 L 340,256 L 350,230 Z" fill="#0ea5e9" />
            <path d="M 390,215 L 400,248 L 410,215 Z" fill="#0ea5e9" />

            {/* Aerodynamic Speed Soleplate */}
            <path
              d="M 50,235 Q 160,245 445,190 Q 455,200 440,215 Q 360,235 280,238 Q 180,245 55,245 Q 40,245 50,235 Z"
              fill="#0f172a"
            />

            {/* High-Cut Dynamic Fit Collar */}
            <path
              d="M 55,215 Q 45,130 90,60 Q 125,50 145,95 Q 130,135 75,130 Z"
              fill="#0f172a"
            />

            {/* Sleek Gripknit Upper */}
            <path
              d="M 55,215 Q 45,130 90,60 Q 130,70 170,110 Q 260,115 380,145 Q 450,175 450,185 Q 260,230 55,215 Z"
              fill={upper}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1.5"
            />

            {/* Dynamic Speed Swoosh */}
            <path
              d="M 110,130 Q 230,140 410,165 Q 270,195 140,180 Q 220,155 110,130 Z"
              fill={accent}
            />

            {/* Micro Grip Texture Lines */}
            <path d="M 180,120 Q 260,130 350,150" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 190,135 Q 270,145 360,165" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : effectiveCategory === 'BADMINTON' || effectiveCategory === 'TENNIS' || effectiveCategory === 'BASKETBALL' ? (
          /* ==================================================== */
          /* COURT / BADMINTON / BASKETBALL VARIANT (Vapor Pro 2) */
          /* ==================================================== */
          <g name="COURT_VAPOR_PRO">
            {/* Non-Marking Indoor Rubber Outsole */}
            <path d="M 45,238 L 445,238 Q 455,238 450,225 L 45,225 Q 38,238 45,238 Z" fill="#0284c7" />

            {/* Low-Profile Court Midsole with Lateral Outrigger */}
            <path
              d="M 40,225 L 450,225 Q 460,205 445,195 Q 360,205 280,210 Q 180,218 50,220 Q 35,215 40,225 Z"
              fill={soleFill}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />

            {/* Lateral Stability Cage (Protects during lunges & cuts) */}
            <path d="M 280,210 Q 360,205 380,180 Q 340,195 280,210 Z" fill={accent} />

            {/* Breathable Court Mesh Upper */}
            <path
              d="M 45,200 Q 38,135 85,90 Q 125,65 170,105 Q 260,110 380,140 Q 445,160 445,195 Q 260,215 45,200 Z"
              fill={upper}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />

            {/* Nike Court Swoosh */}
            <path
              d="M 120,135 Q 240,145 390,165 Q 260,190 150,175 Q 110,165 80,125 Q 100,120 120,135 Z"
              fill={accent}
            />

            {/* Reinforced Drag Toe Guard */}
            <path d="M 380,150 Q 440,160 445,195 L 410,195 Q 380,175 380,150 Z" fill="rgba(0,0,0,0.15)" />

            {/* Court Laces */}
            <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
              <line x1="170" y1="105" x2="200" y2="130" />
              <line x1="200" y1="100" x2="230" y2="125" />
              <line x1="230" y1="95" x2="260" y2="120" />
            </g>
          </g>
        ) : (
          /* ==================================================== */
          /* RUNNING VARIANT (Alphafly 3 / Vaporfly 3 / Pegasus)  */
          /* ==================================================== */
          <g name="NIKE_ALPHAFLY_RUNNING">
            {/* Outsole Grip Pads */}
            <path d="M 60,230 Q 140,242 220,225 L 230,235 Q 140,250 55,238 Z" fill="#09090b" />
            <path d="M 280,215 Q 380,185 450,150 L 458,160 Q 380,200 280,228 Z" fill="#09090b" />

            {/* ZoomX Sculpted High-Stack Foam Midsole */}
            <path
              d="M 45,215 Q 160,235 455,145 Q 465,160 445,178 Q 360,220 280,228 Q 180,238 60,248 Q 35,238 45,215 Z"
              fill={soleShadow}
            />
            <path
              d="M 40,205 Q 160,228 455,140 Q 462,152 445,168 Q 360,210 280,218 Q 180,228 55,235 Q 32,225 40,205 Z"
              fill={soleFill}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />

            {/* Carbon Flyplate Midsole Window */}
            <path
              d="M 120,215 Q 260,210 380,175 Q 375,185 260,220 Q 130,225 120,215 Z"
              fill="#09090b"
            />
            <path d="M 140,217 Q 260,212 360,180" stroke="#44403c" strokeWidth="2" strokeDasharray="4 3" />

            {/* Dual Pressurized Zoom Air Pods */}
            <g>
              <rect x="290" y="178" width="55" height="32" rx="12" fill={accent} fillOpacity="0.9" stroke={accent} strokeWidth="2" />
              <line x1="305" y1="184" x2="305" y2="204" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="318" y1="184" x2="318" y2="204" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="330" y1="184" x2="330" y2="204" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

              <rect x="355" y="158" width="50" height="30" rx="12" fill={accent} fillOpacity="0.9" stroke={accent} strokeWidth="2" />
              <line x1="370" y1="164" x2="370" y2="182" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="382" y1="164" x2="382" y2="182" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Atomknit / Flyknit Breathable Upper */}
            <path
              d="M 45,205 Q 35,130 80,85 Q 120,55 170,105 Q 260,110 380,140 Q 460,140 460,145 Q 260,215 45,205 Z"
              fill={upper}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />

            {/* Nike Speed Swoop */}
            <path
              d="M 100,120 Q 220,130 380,150 Q 240,175 120,170 Q 200,145 100,120 Z"
              fill={accent}
            />

            {/* Collar & Laces */}
            <path d="M 80,85 Q 120,55 155,95 Q 135,125 85,115 Z" fill="#09090b" />
            <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
              <line x1="140" y1="100" x2="165" y2="125" />
              <line x1="160" y1="95" x2="190" y2="120" />
              <line x1="180" y1="90" x2="215" y2="115" />
              <line x1="205" y1="85" x2="245" y2="110" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

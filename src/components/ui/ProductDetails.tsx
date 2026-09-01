'use client';

import React from 'react';
import { Cpu, Zap, Compass, Wind, ShieldCheck, Gauge } from 'lucide-react';

const SPECS = [
  { label: 'WEIGHT', value: '218g', detail: 'Ultralight sub-marathon spec', icon: Wind },
  { label: 'DROP', value: '8mm', detail: 'Dynamic forward propulsion geometry', icon: Compass },
  { label: 'ENERGY RETURN', value: '87%', detail: 'Lab verified mechanical efficiency', icon: Zap },
  { label: 'PLATE', value: 'Carbon composite', detail: 'Dual-plane spoon stiffness matrix', icon: Cpu },
  { label: 'CUSHION', value: 'NOVA FOAM', detail: 'Supercritical nitrogen infusion', icon: Gauge },
  { label: 'GRIP', value: 'NOVA TRACTION', detail: 'Directional wet/dry micro-lug rubber', icon: ShieldCheck },
];

export const ProductDetails: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8 pointer-events-auto">
      {/* Title & Price Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white">
            NOVA <span className="text-accent">X</span>
          </h3>
          <p className="text-xs md:text-sm font-mono text-[#8A8A8A] tracking-wider uppercase mt-1">
            PERFORMANCE RUNNING SYSTEM // SERIAL 001-X
          </p>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-right">
          <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">$249</span>
          <span className="text-xs text-[#8A8A8A] ml-2 uppercase">USD / COMPLIMENTARY EXPEDITED SHIPPING</span>
        </div>
      </div>

      {/* Editorial Specification Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {SPECS.map((spec) => {
          const Icon = spec.icon;
          return (
            <div
              key={spec.label}
              className="flex flex-col justify-between p-4 border-l border-white/10 hover:border-accent transition-colors duration-300 group"
            >
              <div>
                <div className="flex items-center space-x-2 text-[#8A8A8A] group-hover:text-accent transition-colors mb-2">
                  <Icon size={14} />
                  <span className="text-[11px] font-mono tracking-wider">{spec.label}</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {spec.value}
                </div>
              </div>
              <div className="text-[10px] font-mono text-[#52525b] mt-3 group-hover:text-[#8A8A8A] transition-colors leading-tight">
                {spec.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

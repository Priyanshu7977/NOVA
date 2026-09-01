'use client';

import React, { useState, useEffect } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { sounds } from '@/components/audio/SoundManager';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
  selectedSize?: string;
}

interface SizeRow {
  uk: string;
  us: string;
  eu: string;
  cm: string;
}

const SIZE_DATA: SizeRow[] = [
  { uk: 'UK 6', us: 'US 7', eu: 'EU 40', cm: '25.0 cm' },
  { uk: 'UK 6.5', us: 'US 7.5', eu: 'EU 40.5', cm: '25.5 cm' },
  { uk: 'UK 7', us: 'US 8', eu: 'EU 41', cm: '26.0 cm' },
  { uk: 'UK 7.5', us: 'US 8.5', eu: 'EU 42', cm: '26.5 cm' },
  { uk: 'UK 8', us: 'US 9', eu: 'EU 42.5', cm: '27.0 cm' },
  { uk: 'UK 8.5', us: 'US 9.5', eu: 'EU 43', cm: '27.5 cm' },
  { uk: 'UK 9', us: 'US 10', eu: 'EU 44', cm: '28.0 cm' },
  { uk: 'UK 9.5', us: 'US 10.5', eu: 'EU 44.5', cm: '28.5 cm' },
  { uk: 'UK 10', us: 'US 11', eu: 'EU 45', cm: '29.0 cm' },
  { uk: 'UK 10.5', us: 'US 11.5', eu: 'EU 45.5', cm: '29.5 cm' },
  { uk: 'UK 11', us: 'US 12', eu: 'EU 46', cm: '30.0 cm' },
  { uk: 'UK 12', us: 'US 13', eu: 'EU 47.5', cm: '31.0 cm' },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
  selectedSize,
}) => {
  const [activeTab, setActiveTab] = useState<'UK' | 'US' | 'EU'>('UK');

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 pointer-events-auto select-none"
    >
      {/* Backdrop Click Dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#FFFFFF] text-[#111111] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#E5E5E2] animate-in fade-in zoom-in-95 duration-200 z-10">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E2]">
          <div className="flex items-center space-x-2">
            <Ruler size={18} className="text-[#111111]" />
            <h3 id="size-guide-title" className="text-lg font-black tracking-tight uppercase">
              NOVA SIZE GUIDE & CONVERSIONS
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#F4F4F5] hover:bg-[#E4E4E7] flex items-center justify-center text-[#111111] transition-colors"
            aria-label="Close size guide"
          >
            <X size={16} />
          </button>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center space-x-2 my-4">
          {(['UK', 'US', 'EU'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab);
              }}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#6B6B6B]'
              }`}
            >
              {tab} SIZING
            </button>
          ))}
        </div>

        {/* Conversion Table */}
        <div className="max-h-[340px] overflow-y-auto border border-[#E5E5E2] rounded-2xl">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#F7F7F5] border-b border-[#E5E5E2] sticky top-0 text-[#6B6B6B]">
              <tr>
                <th className="py-2.5 px-4 font-bold">UK</th>
                <th className="py-2.5 px-4 font-bold">US</th>
                <th className="py-2.5 px-4 font-bold">EU</th>
                <th className="py-2.5 px-4 font-bold">FOOT LENGTH</th>
                <th className="py-2.5 px-4 font-bold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0ED]">
              {SIZE_DATA.map((row) => {
                const isSelected = selectedSize === row.uk;
                return (
                  <tr
                    key={row.uk}
                    className={`hover:bg-[#F7F7F5] transition-colors ${
                      isSelected ? 'bg-purple-50/50 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 text-[#111111]">{row.uk}</td>
                    <td className="py-2.5 px-4 text-[#6B6B6B]">{row.us}</td>
                    <td className="py-2.5 px-4 text-[#6B6B6B]">{row.eu}</td>
                    <td className="py-2.5 px-4 text-[#6B6B6B]">{row.cm}</td>
                    <td className="py-2.5 px-4 text-right">
                      {onSelectSize && (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onSelectSize(row.uk);
                            onClose();
                          }}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-[#111111] text-white'
                              : 'bg-[#F4F4F5] hover:bg-[#111111] text-[#111111] hover:text-white'
                          }`}
                        >
                          {isSelected ? 'SELECTED' : 'CHOOSE'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Fit Advice */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E5E5E2] font-mono text-[11px] text-[#6B6B6B] space-y-1">
          <span className="font-bold text-[#111111] block">FIT & SIZING RECOMMENDATION:</span>
          <p>
            NOVA X fits true to standard UK performance running sizing. For high-volume feet or wider toe-splay during ultra-marathons, we recommend taking a half-size up.
          </p>
        </div>
      </div>
    </div>
  );
};

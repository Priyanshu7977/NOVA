'use client';

import React, { useState, useEffect } from 'react';
import { useExperience } from '@/context/ExperienceContext';

const STEPS = [8, 24, 51, 76, 100];

export const LoadingScreen: React.FC = () => {
  const { isLoaded, setIsLoaded } = useExperience();
  const [stepIndex, setStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsLoaded(true);
            }, 800);
          }, 400);
          return prev;
        }
      });
    }, 240);

    return () => clearInterval(interval);
  }, [isLoaded, setIsLoaded]);

  if (isLoaded) return null;

  const currentPercent = STEPS[stepIndex];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-[#050505] transition-opacity duration-700 pointer-events-auto select-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Meta Line */}
      <div className="flex justify-between items-center text-xs tracking-widest text-[#8A8A8A] font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>ACT 01 // KINETIC INITIALIZATION</span>
        </div>
        <div>NOVA LABS 2026</div>
      </div>

      {/* Center Cinematic Intro */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white">
          NOVA <span className="text-accent">X</span>
        </h1>
        <p className="text-xs sm:text-sm tracking-mega text-[#8A8A8A] uppercase font-mono">
          INITIALIZING EXPERIENCE
        </p>

        {/* Minimal High-Precision Progress Bar */}
        <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden my-4">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent via-[#00f0ff] to-white transition-all duration-300 ease-out"
            style={{ width: `${currentPercent}%` }}
          />
        </div>

        <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tighter text-white">
          {currentPercent < 10 ? `0${currentPercent}` : currentPercent}%
        </div>
      </div>

      {/* Bottom Technical Status */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[#52525b] uppercase tracking-wider">
        <div>3D CORE: ACCELERATED</div>
        <div>SHADERS: COMPILED</div>
        <div>CALIBRATION: 100%</div>
      </div>
    </div>
  );
};

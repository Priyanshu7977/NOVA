'use client';

import React, { useRef, useEffect } from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { PRODUCTS } from '@/data/products';
import { sounds } from '@/components/audio/SoundManager';
import { Eye, ShoppingBag, Zap, Shield, Flame, Activity } from 'lucide-react';

interface CinematicMasterCanvasProps {
  scrollProgress: number; // 0 to 1 across the 4 cinematic scenes
}

export const CinematicMasterCanvas: React.FC<CinematicMasterCanvasProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setSelectedProductForModal, addToCart } = useExperience();

  // Draw the entire physical multi-scene sports animation onto high-DPI Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clean bright studio background
      ctx.fillStyle = '#F7F7F5';
      ctx.fillRect(0, 0, width, height);

      // Studio ambient grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const isMobile = width < 768;

      // =========================================================================
      // SCENE 1: BALL → NIKE MERCURIAL FOOTBALL SHOE KICK (Scroll 0.00 to 0.28)
      // =========================================================================
      if (scrollProgress < 0.30) {
        const s1 = Math.min(1, scrollProgress / 0.26); // 0 to 1 within Scene 1

        // Camera dolly effect (scale of whole scene)
        const cameraScale = 1 + s1 * 0.45;
        const ballRot = s1 * Math.PI * 4;

        // Kick timing: boot enters between 0.35 and 0.70, kicks at 0.70, ball flies 0.70 - 1.00
        const bootEntry = Math.max(0, Math.min(1, (s1 - 0.2) / 0.45));
        const kickMoment = Math.max(0, (s1 - 0.65) / 0.35);

        // Positions
        const ballX = centerX + (kickMoment > 0 ? kickMoment * width * 0.85 : 0);
        const ballY = centerY - (kickMoment > 0 ? kickMoment * height * 0.35 : 0);
        const ballRadius = isMobile ? 48 : 70;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(cameraScale, cameraScale);
        ctx.translate(-centerX, -centerY);

        // 1. Ball Ground Shadow
        ctx.beginPath();
        const shadowWidth = (ballRadius * 1.5) * (1 - kickMoment * 0.7);
        const shadowHeight = 16 * (1 - kickMoment * 0.7);
        ctx.ellipse(ballX, centerY + ballRadius + 18, Math.max(0, shadowWidth), Math.max(0, shadowHeight), 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, 0.14 * (1 - kickMoment))})`;
        ctx.fill();

        // 2. Suspended 3D Football
        ctx.save();
        ctx.translate(ballX, ballY);
        ctx.rotate(ballRot + kickMoment * 8);

        // Ball Base sphere with 3D gradient
        const ballGrad = ctx.createRadialGradient(
          -ballRadius * 0.35,
          -ballRadius * 0.35,
          ballRadius * 0.1,
          0,
          0,
          ballRadius
        );
        ballGrad.addColorStop(0, '#FFFFFF');
        ballGrad.addColorStop(0.5, '#E2E8F0');
        ballGrad.addColorStop(1, '#94A3B8');

        ctx.beginPath();
        ctx.arc(0, 0, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Hexagonal & Curved Football Seams
        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-ballRadius * 0.6, 0);
        ctx.bezierCurveTo(-ballRadius * 0.3, -ballRadius * 0.7, ballRadius * 0.3, -ballRadius * 0.7, ballRadius * 0.6, 0);
        ctx.bezierCurveTo(ballRadius * 0.3, ballRadius * 0.7, -ballRadius * 0.3, ballRadius * 0.7, -ballRadius * 0.6, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -ballRadius * 0.6);
        ctx.bezierCurveTo(-ballRadius * 0.7, -ballRadius * 0.3, -ballRadius * 0.7, ballRadius * 0.3, 0, ballRadius * 0.6);
        ctx.bezierCurveTo(ballRadius * 0.7, ballRadius * 0.3, ballRadius * 0.7, -ballRadius * 0.3, 0, -ballRadius * 0.6);
        ctx.stroke();

        // Specular Glint
        ctx.beginPath();
        ctx.arc(-ballRadius * 0.32, -ballRadius * 0.32, ballRadius * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();

        ctx.restore(); // restore ball translate

        // 3. Nike Mercurial Football Boot (Sweeps in & Kicks)
        if (bootEntry > 0) {
          ctx.save();
          // Boot trajectory: starts top-left/behind, accelerates into ball contact
          const bootStartX = centerX - width * 0.45;
          const bootStartY = centerY + height * 0.25;
          const bootTargetX = ballX - ballRadius * 0.8;
          const bootTargetY = ballY + ballRadius * 0.2;

          const currentBootX = bootStartX + (bootTargetX - bootStartX) * bootEntry;
          const currentBootY = bootStartY + (bootTargetY - bootStartY) * bootEntry;
          const bootAngle = -0.4 + bootEntry * 0.6 + kickMoment * 0.4;

          ctx.translate(currentBootX, currentBootY);
          ctx.rotate(bootAngle);
          const shoeScale = isMobile ? 0.65 : 1.0;
          ctx.scale(shoeScale, shoeScale);

          // Draw Photorealistic Nike Mercurial Boot
          drawNikeMercurialBoot(ctx);

          ctx.restore();
        }

        // 4. Kinetic Impact Shockwave & Particle Burst
        if (kickMoment > 0.05 && kickMoment < 0.6) {
          const waveRadius = kickMoment * (isMobile ? 160 : 280);
          ctx.beginPath();
          ctx.arc(ballX - 40, ballY, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(14, 165, 233, ${Math.max(0, 0.8 - kickMoment * 1.5)})`;
          ctx.lineWidth = 4;
          ctx.stroke();

          // Spark particles
          for (let p = 0; p < 12; p++) {
            const angle = (p / 12) * Math.PI * 2;
            const dist = waveRadius * (0.6 + (p % 3) * 0.2);
            ctx.fillStyle = p % 2 === 0 ? '#0ea5e9' : '#22c55e';
            ctx.beginPath();
            ctx.arc(ballX - 40 + Math.cos(angle) * dist, ballY + Math.sin(angle) * dist, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore(); // restore cameraScale
      }

      // =========================================================================
      // SCENE 2: FOOTBALL → BADMINTON ATHLETE & SMASH (Scroll 0.26 to 0.54)
      // =========================================================================
      if (scrollProgress >= 0.25 && scrollProgress < 0.56) {
        const s2 = Math.max(0, Math.min(1, (scrollProgress - 0.26) / 0.27)); // 0 to 1 within Scene 2

        // Court Transformation (lines morphing from the kick)
        const courtAlpha = Math.min(1, s2 * 2.5);
        ctx.save();
        ctx.globalAlpha = courtAlpha;

        // Badminton Court Floor
        ctx.fillStyle = 'rgba(235, 238, 235, 0.7)';
        const courtTop = height * 0.35;
        const courtBottom = height * 0.85;
        ctx.fillRect(width * 0.08, courtTop, width * 0.84, courtBottom - courtTop);

        // Court White Boundary Lines
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
        ctx.lineWidth = 3;
        ctx.strokeRect(width * 0.08, courtTop, width * 0.84, courtBottom - courtTop);

        // Center Net Line
        ctx.beginPath();
        ctx.moveTo(centerX, courtTop);
        ctx.lineTo(centerX, courtBottom);
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.6)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Athlete Jump Smash Animation Cycle (0 to 1)
        // 0.0 - 0.35: Athlete crouch & leap into air
        // 0.35 - 0.65: Racket smash & high apex
        // 0.65 - 1.00: Foot landing with friction & recovery
        const jumpProgress = s2;
        const athleteX = isMobile ? centerX - 30 : centerX - 120;
        const jumpElevation = Math.sin(jumpProgress * Math.PI) * (isMobile ? 100 : 180);
        const athleteY = courtBottom - 60 - jumpElevation;

        // Shadow on court floor
        ctx.beginPath();
        ctx.ellipse(athleteX, courtBottom - 20, 60 * (1 - jumpElevation / 250), 16 * (1 - jumpElevation / 250), 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.fill();

        // Draw Articulated Badminton Athlete with Nike Vapor Pro 2 Court Shoes
        drawBadmintonAthlete(ctx, athleteX, athleteY, jumpProgress, isMobile);

        // Shuttlecock Motion
        const smashHit = Math.max(0, (jumpProgress - 0.45) / 0.55);
        if (smashHit > 0) {
          const shuttleX = athleteX + 60 + smashHit * (width * 0.55);
          const shuttleY = athleteY - 40 + smashHit * (height * 0.4);

          ctx.save();
          ctx.translate(shuttleX, shuttleY);
          ctx.rotate(0.6);

          // Shuttlecock Cone & Cork
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.strokeStyle = '#1e293b';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-6, -6);
          ctx.lineTo(-24, -14);
          ctx.lineTo(-24, 14);
          ctx.lineTo(-6, 6);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(0,0,0,0.2)';
          ctx.stroke();

          // Motion streak trail
          ctx.beginPath();
          ctx.moveTo(-24, 0);
          ctx.lineTo(-120, -10);
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.5)';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.restore();
        }

        ctx.restore(); // restore court
      }

      // =========================================================================
      // SCENE 3: BADMINTON → KINETIC RUNNER & TRACK (Scroll 0.52 to 0.78)
      // =========================================================================
      if (scrollProgress >= 0.50 && scrollProgress < 0.82) {
        const s3 = Math.max(0, Math.min(1, (scrollProgress - 0.52) / 0.26)); // 0 to 1 within Scene 3

        ctx.save();
        ctx.globalAlpha = Math.min(1, s3 * 3);

        // Running Track Parallax Surface
        const trackY = height * 0.65;
        const trackGrad = ctx.createLinearGradient(0, trackY, 0, height);
        trackGrad.addColorStop(0, '#E2E8F0');
        trackGrad.addColorStop(1, '#CBD5E1');

        ctx.fillStyle = trackGrad;
        ctx.fillRect(0, trackY, width, height - trackY);

        // Moving Track Lane Stripes (Parallax)
        const stripeOffset = (s3 * 1800) % 160;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 6;
        ctx.setLineDash([80, 80]);
        ctx.lineDashOffset = -stripeOffset;

        ctx.beginPath();
        ctx.moveTo(0, trackY + 45);
        ctx.lineTo(width, trackY + 45);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, trackY + 95);
        ctx.lineTo(width, trackY + 95);
        ctx.stroke();
        ctx.setLineDash([]);

        // Runner Camera Macro Progression:
        // 0% - 25%: Runner preparing in starting stance
        // 25% - 60%: Low camera tracking Nike Alphafly 3 running shoe
        // 60% - 100%: Full dynamic sprinting stride with foam compression & arm pump
        const runnerX = isMobile ? centerX : centerX - 60;
        const runnerY = trackY + 30;

        drawKineticRunner(ctx, runnerX, runnerY, s3, isMobile);

        ctx.restore();
      }

      ctx.restore();
    };

    render();

    // Re-render when scrollProgress updates
    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollProgress]);

  // Scene 4 Hero Products
  const heroProducts = PRODUCTS.slice(0, 3);
  const showProductReveal = scrollProgress >= 0.78;

  return (
    <div className="relative w-full h-full bg-[#F7F7F5] select-none overflow-hidden">
      {/* 1. Master High-Resolution Sports Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ==================================================== */}
      {/* SCENE 1 EDITORIAL OVERLAY (0.00 to 0.26)            */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-start pt-24 sm:pt-32 text-center pointer-events-none transition-all duration-500 ${
          scrollProgress < 0.26 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="px-3.5 py-1 rounded-full bg-black/5 text-[10px] sm:text-xs font-mono font-bold tracking-mega text-[#6B6B6B] uppercase mb-3">
          SCENE 01 // KINETIC FOOTBALL IMPACT
        </span>
        <h1 className="text-5xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#111111] uppercase leading-none">
          NOVA
        </h1>
        <p className="text-xs sm:text-sm font-mono font-semibold tracking-widest text-[#6B6B6B] uppercase mt-2">
          MOVE WITHOUT LIMITS.
        </p>
        <span className="text-[11px] font-mono text-emerald-600 font-bold mt-4 animate-bounce">
          ↓ SCROLL TO STRIKE
        </span>
      </div>

      {/* ==================================================== */}
      {/* SCENE 2 EDITORIAL OVERLAY (0.26 to 0.52)            */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-x-6 top-20 sm:top-24 flex flex-col items-center text-center pointer-events-none transition-all duration-500 ${
          scrollProgress >= 0.26 && scrollProgress < 0.52
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="px-3 py-1 rounded-full bg-blue-50 text-[10px] sm:text-xs font-mono font-bold tracking-mega text-blue-700 uppercase mb-2 border border-blue-200">
          SCENE 02 // BADMINTON COURT FRICTION & SMASH
        </span>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase">
          EXPLOSIVE LATERAL CUTS
        </h2>
        <p className="text-xs font-mono text-[#6B6B6B] max-w-md mt-1">
          Nike Court Air Zoom Vapor Pro 2 // Lateral Outrigger Stabilizer
        </p>
      </div>

      {/* ==================================================== */}
      {/* SCENE 3 EDITORIAL OVERLAY (0.52 to 0.78)            */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-x-6 top-20 sm:top-24 flex flex-col items-center text-center pointer-events-none transition-all duration-500 ${
          scrollProgress >= 0.52 && scrollProgress < 0.78
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] sm:text-xs font-mono font-bold tracking-mega text-emerald-700 uppercase mb-2 border border-emerald-200">
          SCENE 03 // MARATHON VELOCITY & FOAM ENERGY
        </span>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#111111] uppercase">
          CONTINUOUS STRIDE DRIVE
        </h2>
        <p className="text-xs font-mono text-[#6B6B6B] max-w-md mt-1">
          Nike Alphafly 3 // Dual Air Zoom Pods & Full Carbon Flyplate
        </p>
      </div>

      {/* ==================================================== */}
      {/* SCENE 4: HERO PRODUCT REVEAL (0.78 to 1.00)         */}
      {/* ==================================================== */}
      <div
        className={`absolute inset-0 flex flex-col justify-center px-6 max-w-7xl mx-auto z-40 transition-all duration-500 ${
          showProductReveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="text-center mb-8 space-y-1">
          <span className="text-[11px] font-mono font-bold tracking-mega text-[#6B6B6B] uppercase">
            SCENE 04 // FEATURED HERO LINEUP
          </span>
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111] uppercase">
            THE PERFORMANCE SPECIFICATIONS
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

              {/* Price and Action Buttons */}
              <div className="pt-8 border-t border-[#F0F0ED] space-y-3">
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-xs text-[#6B6B6B]">NIKE INDIA MRP</span>
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

// =============================================================================
// HELPER: Draw Detailed Nike Mercurial Superfly 10 Boot
// =============================================================================
function drawNikeMercurialBoot(ctx: CanvasRenderingContext2D) {
  // Cleats Studs
  ctx.fillStyle = '#0ea5e9';
  ctx.beginPath();
  ctx.moveTo(-100, 50);
  ctx.lineTo(-85, 75);
  ctx.lineTo(-70, 50);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(70, 45);
  ctx.lineTo(85, 70);
  ctx.lineTo(100, 45);
  ctx.fill();

  // Speed Soleplate
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-120, 45);
  ctx.quadraticCurveTo(0, 55, 140, 35);
  ctx.lineTo(135, 48);
  ctx.quadraticCurveTo(0, 65, -115, 52);
  ctx.closePath();
  ctx.fill();

  // High-Cut Dynamic Fit Ankle Collar
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-100, 20);
  ctx.quadraticCurveTo(-110, -60, -70, -100);
  ctx.lineTo(-30, -90);
  ctx.quadraticCurveTo(-45, -40, -40, 20);
  ctx.closePath();
  ctx.fill();

  // Aerodynamic Gripknit Upper
  ctx.fillStyle = '#0ea5e9';
  ctx.beginPath();
  ctx.moveTo(-115, 45);
  ctx.quadraticCurveTo(-110, -50, -60, -70);
  ctx.quadraticCurveTo(40, -50, 140, 35);
  ctx.quadraticCurveTo(0, 55, -115, 45);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Electric Volt Nike Speed Swoosh
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.moveTo(-60, -20);
  ctx.quadraticCurveTo(40, -15, 120, 20);
  ctx.quadraticCurveTo(30, 25, -40, 15);
  ctx.quadraticCurveTo(0, 0, -60, -20);
  ctx.closePath();
  ctx.fill();
}

// =============================================================================
// HELPER: Draw Articulated Badminton Athlete
// =============================================================================
function drawBadmintonAthlete(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number,
  isMobile: boolean
) {
  const scale = isMobile ? 0.7 : 1.0;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Arm & Racket Angle based on smash progress (0 to 1)
  const racketAngle = -1.2 + progress * 2.8;

  // 1. Athlete Legs with Dynamic Split/Lunge
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Front Leg (Lunge Forward)
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(40 + progress * 30, 0);
  ctx.lineTo(80 + progress * 40, 60);
  ctx.stroke();

  // Back Leg (Trailing)
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(-50, -10);
  ctx.lineTo(-90 - progress * 20, 30);
  ctx.stroke();

  // 2. Nike Court Vapor Pro 2 Shoes on Feet
  // Front Shoe
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(80 + progress * 40, 60, 22, 10, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2563EB'; // Royal Blue court swoosh
  ctx.fillRect(75 + progress * 40, 56, 18, 5);

  // Back Shoe
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-90 - progress * 20, 30, 20, 9, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // 3. Torso & Athletic Jersey
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.moveTo(-25, -140);
  ctx.lineTo(25, -140);
  ctx.lineTo(15, -60);
  ctx.lineTo(-15, -60);
  ctx.closePath();
  ctx.fill();

  // 4. Head & Face Profile
  ctx.fillStyle = '#E2E8F0';
  ctx.beginPath();
  ctx.arc(5, -165, 18, 0, Math.PI * 2);
  ctx.fill();

  // 5. Smash Arm & Badminton Racket
  ctx.save();
  ctx.translate(15, -135);
  ctx.rotate(racketAngle);

  // Arm
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(40, -30);
  ctx.lineTo(70, -10);
  ctx.stroke();

  // Racket Shaft & Head
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(70, -10);
  ctx.lineTo(150, 0);
  ctx.stroke();

  // Racket Oval Head
  ctx.beginPath();
  ctx.ellipse(180, 0, 32, 22, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();

  ctx.restore();
}

// =============================================================================
// HELPER: Draw Kinetic Male Runner with Nike Alphafly 3 Close-up Tracking
// =============================================================================
function drawKineticRunner(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number,
  isMobile: boolean
) {
  const scale = isMobile ? 0.75 : 1.1;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Running Stride Cycle based on scroll
  const strideCycle = progress * Math.PI * 6;
  const leg1Angle = Math.sin(strideCycle) * 0.7;
  const leg2Angle = -Math.sin(strideCycle) * 0.7;
  const arm1Angle = -Math.sin(strideCycle) * 0.8;
  const arm2Angle = Math.sin(strideCycle) * 0.8;

  // 1. Ground Contact Shadow
  ctx.beginPath();
  ctx.ellipse(0, 10, 70, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fill();

  // 2. Back Leg & Nike Alphafly 3 Shoe
  ctx.save();
  ctx.translate(0, -90);
  ctx.rotate(leg2Angle);
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(10, 45);
  ctx.lineTo(25, 90);
  ctx.stroke();

  // Alphafly 3 Back Shoe
  ctx.fillStyle = '#16A34A'; // Electric Volt
  ctx.beginPath();
  ctx.ellipse(30, 95, 24, 10, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF'; // ZoomX Foam Midsole
  ctx.fillRect(20, 100, 25, 6);
  ctx.restore();

  // 3. Torso & Running Singlet (Forward Lean)
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.moveTo(-20, -180);
  ctx.lineTo(25, -180);
  ctx.lineTo(10, -90);
  ctx.lineTo(-15, -90);
  ctx.closePath();
  ctx.fill();

  // 4. Head with Athletic Stride Gaze
  ctx.fillStyle = '#E2E8F0';
  ctx.beginPath();
  ctx.arc(15, -205, 18, 0, Math.PI * 2);
  ctx.fill();

  // 5. Front Leg & Nike Alphafly 3 (Hero Tracking)
  ctx.save();
  ctx.translate(0, -90);
  ctx.rotate(leg1Angle);
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-15, 45);
  ctx.lineTo(-30, 90);
  ctx.stroke();

  // Hero Alphafly 3 Front Shoe (Volt Upper + ZoomX Sole + Zoom Air Pods)
  ctx.fillStyle = '#16A34A'; // Volt Upper
  ctx.beginPath();
  ctx.ellipse(-30, 95, 28, 12, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // ZoomX Thick Cushion Midsole
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-30, 104, 30, 6, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // Pressurized Dual Zoom Air Pods (Cyan Glow)
  ctx.fillStyle = '#00F0FF';
  ctx.fillRect(-22, 101, 14, 5);
  ctx.restore();

  // 6. Athletic Arms Pumping
  ctx.save();
  ctx.translate(5, -170);
  ctx.rotate(arm1Angle);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(30, 30);
  ctx.lineTo(60, 10);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

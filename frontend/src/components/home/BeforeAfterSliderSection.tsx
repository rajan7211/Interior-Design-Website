import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { FadeIn } from '../ui/Motion';

export const BeforeAfterSliderSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min((x / rect.width) * 100, 95));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <div
            ref={containerRef}
          onMouseDown={() => { isDragging.current = true; }}
          onMouseUp={() => { isDragging.current = false; }}
          onMouseLeave={() => { isDragging.current = false; }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/10] sm:aspect-[21/10] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
        >
          {/* Base / "Original" Image (Right Side) */}
          <img
            src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=2400&q=85"
            alt="Original Space"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Original Badge (Top Right) */}
          <div className="absolute top-6 right-6 z-10 px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-[11px] font-sans font-bold uppercase tracking-wider text-black shadow-md">
            Original
          </div>

          {/* "Reimagine" Clipped Image (Left Side) */}
          <div
            style={{ width: `${sliderPosition}%` }}
            className="absolute inset-y-0 left-0 overflow-hidden z-10 transition-all duration-75"
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85"
              alt="Reimagined Space"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                height: '100%',
              }}
            />
            {/* Reimagine Badge (Top Left) */}
            <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-lg bg-[#E05A2B] text-white text-[11px] font-sans font-bold uppercase tracking-wider shadow-md">
              Reimagine
            </div>
          </div>

          {/* Draggable Vertical Divider Handle */}
          <div
            style={{ left: `${sliderPosition}%` }}
            className="absolute inset-y-0 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="w-[2px] h-full bg-white shadow-xl" />
            <div className="absolute w-10 h-10 rounded-full bg-white text-black shadow-2xl flex items-center justify-center font-bold text-xs pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
              <span>‹ ›</span>
            </div>
          </div>

          {/* Bottom Left CTA Pill (Matching Image 2) */}
          <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
            <button
              type="button"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-black/80 hover:bg-black backdrop-blur-md text-white text-xs font-bold font-sans tracking-wide transition-all shadow-xl space-x-2"
            >
              <span>Start Deciding 3 Free AI Design</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E05A2B]" />
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
  );
};


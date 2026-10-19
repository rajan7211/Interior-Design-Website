import React from 'react';
import { FadeIn } from '../ui/Motion';

export const ProductPlacementSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF8F5] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          {/* Main Visualizer Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl">
            {/* Base Scene Image */}
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85"
              alt="Living In Context - Curated Architectural Showcase"
              className="w-full h-full object-cover"
            />

            {/* Subtle Ambient Overlay for Optimal Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none" />

            {/* Elevated Editorial Content in Top Left */}
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10 z-20 max-w-md">
              {/* Kicker Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-3">
                <span className="text-[#E05A2B] text-xs">✦</span>
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-white/90">
                  Curated Living
                </span>
              </div>

              {/* Main Heading */}
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight drop-shadow-md">
                Living In Context
              </h3>

              {/* Contextual Subtitle */}
              <p className="mt-2 text-xs sm:text-sm text-neutral-200/95 leading-relaxed font-sans drop-shadow-sm max-w-sm">
                Where bespoke craftsmanship meets contemporary architecture in effortless harmony.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};


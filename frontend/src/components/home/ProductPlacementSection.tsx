import React from 'react';
import { FadeIn } from '../ui/Motion';

export const ProductPlacementSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF8F5] py-16 sm:py-24 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          {/* Main Visualizer Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl">
            {/* Base Scene Image */}
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85"
              alt="Product Placement Visualizer"
              className="w-full h-full object-cover"
            />

            {/* Title in Top Left (Matching Reference) */}
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10 z-20">
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white drop-shadow-md">
                Product Placement
              </h3>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};


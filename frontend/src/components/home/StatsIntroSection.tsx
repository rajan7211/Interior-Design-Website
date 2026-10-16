import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInStaggerItem, AnimatedCounter } from '../ui/Motion';

export const StatsIntroSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header with Title and "More About Us ->" Button */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#111111] max-w-2xl leading-[1.15] tracking-tight">
              Timeless Elegance Crafted For Modern Living And Everyday Comfort
            </h2>
            <Link to="/about" className="flex-shrink-0 group">
              <button
                type="button"
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all space-x-2 shadow-sm"
              >
                <span>More About Us</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </FadeIn>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Large Living Room Image */}
          <div className="lg:col-span-6">
            <FadeIn direction="up" delay={0.1}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Contemporary Living Room"
                  className="w-full h-full object-cover hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 3 Stats + Paragraph + 2 Photos */}
          <div className="lg:col-span-6 space-y-8">
            {/* 3 Metrics Row */}
            <FadeInStagger staggerDelay={0.15}>
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-neutral-100">
                <FadeInStaggerItem>
                  <p className="font-sans font-extrabold text-3xl sm:text-4xl text-[#111111]">
                    <AnimatedCounter value={80} prefix="$" suffix="M+" duration={1.8} />
                  </p>
                  <p className="text-xs text-neutral-500 font-sans mt-1">
                    Revenue Generated
                  </p>
                </FadeInStaggerItem>
                <FadeInStaggerItem>
                  <p className="font-sans font-extrabold text-3xl sm:text-4xl text-[#111111]">
                    <AnimatedCounter value={20} suffix="K+" duration={1.8} />
                  </p>
                  <p className="text-xs text-neutral-500 font-sans mt-1">
                    Happy Customers
                  </p>
                </FadeInStaggerItem>
                <FadeInStaggerItem>
                  <p className="font-sans font-extrabold text-3xl sm:text-4xl text-[#111111]">
                    <AnimatedCounter value={98} suffix="%" duration={1.8} />
                  </p>
                  <p className="text-xs text-neutral-500 font-sans mt-1">
                    Client Satisfaction
                  </p>
                </FadeInStaggerItem>
              </div>
            </FadeInStagger>

            {/* Narrative text */}
            <FadeIn direction="up" delay={0.2}>
              <p className="text-sm sm:text-base font-sans text-neutral-600 leading-relaxed">
                We believe great design transforms spaces into inspiring environments. Our collections combine comfort, craftsmanship, and contemporary aesthetics to create homes you love living in.
              </p>
            </FadeIn>

            {/* 2 Smaller Images Side-by-Side */}
            <FadeInStagger staggerDelay={0.15} initialDelay={0.1}>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <FadeInStaggerItem>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
                      alt="Modern Minimalist Art and Sofa"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                </FadeInStaggerItem>
                <FadeInStaggerItem>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
                      alt="Twin Lamps Console"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                </FadeInStaggerItem>
              </div>
            </FadeInStagger>
          </div>
        </div>
      </div>
    </section>
  );
};



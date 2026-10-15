import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MAIN_TESTIMONIAL } from '../../data/mockData';
import { FadeIn } from '../ui/Motion';

export const DribbbleTestimonialSection: React.FC = () => {
  const testimonials = [
    MAIN_TESTIMONIAL,
    {
      quote: 'The craftsmanship in their custom joinery and spatial lighting exceeded every ambition we held. Living in our renovated penthouse feels like residing inside an architectural sculpture.',
      author: 'Lord Julian Sterling',
      role: 'Private Collector',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  };

  const t = testimonials[currentIndex];

  return (
    <section className="w-full bg-[#FAF8F5] py-20 sm:py-28 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-neutral-100 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Interior Photo with Smooth Crossfade */}
              <div className="lg:col-span-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-md relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={t.image}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                      src={t.image}
                      alt="Testimonial Interior"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Narrative & Client Details */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-sans uppercase font-bold tracking-wider text-neutral-400 block mb-2">
                    Testimonial
                  </span>
                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111111] leading-tight">
                    Transforming Visions<br />Into Timeless Reality
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={t.quote}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm sm:text-base font-sans text-neutral-600 leading-relaxed font-normal min-h-[72px]"
                  >
                    "{t.quote}"
                  </motion.p>
                </AnimatePresence>

                {/* Author & Controls Row (Matching Image 3) */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#E05A2B]"
                    />
                    <div>
                      <h4 className="font-sans font-bold text-sm text-[#111111]">
                        {t.author}
                      </h4>
                      <p className="text-xs font-sans text-neutral-400">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* Terracotta Navigation Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="w-9 h-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="w-9 h-9 rounded-lg bg-[#E05A2B] hover:bg-[#C94A1F] text-white flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

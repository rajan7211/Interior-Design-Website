import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NUMBERED_ROOM_ACCORDION } from '../../data/mockData';
import { FadeIn } from '../ui/Motion';

export const NumberedAccordionSection: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState<string>('03'); // default on 03 Sleeping

  const activeItem =
    NUMBERED_ROOM_ACCORDION.find((item) => item.number === activeNumber) ||
    NUMBERED_ROOM_ACCORDION[2];

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
            <div>
              <span className="text-xs font-sans uppercase font-bold tracking-wider text-neutral-400 block mb-2">
                Curated Living Spaces
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight">
                Discover Your Perfect<br className="hidden sm:inline" /> Furniture
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 max-w-md leading-relaxed">
              Explore architecturally calibrated spaces curated with handcrafted essentials, natural materials, and timeless comfort for every corner of your home.
            </p>
          </div>
        </FadeIn>

        {/* Desktop View: Horizontal Expanding Panels (>= md screens) */}
        <div className="hidden md:flex h-[560px] lg:h-[620px] gap-3 sm:gap-4 w-full select-none">
          {NUMBERED_ROOM_ACCORDION.map((item) => {
            const isOpen = activeNumber === item.number;

            return (
              <div
                key={item.number}
                onClick={() => setActiveNumber(item.number)}
                onMouseEnter={() => setActiveNumber(item.number)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveNumber(item.number);
                  }
                }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isOpen
                    ? 'flex-[3.6] shadow-2xl'
                    : 'flex-1 hover:flex-[1.25] group shadow-sm'
                }`}
              >
                {/* Background Image with Zoom on Active / Hover */}
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                    isOpen ? 'scale-100' : 'scale-105 group-hover:scale-110'
                  }`}
                />

                {/* Dark Vignette Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isOpen
                      ? 'bg-gradient-to-t from-black/90 via-black/35 to-black/20'
                      : 'bg-black/55 group-hover:bg-black/40'
                  }`}
                />

                {/* Active Panel Content */}
                {isOpen ? (
                  <div className="relative z-10 w-full h-full p-8 sm:p-10 flex flex-col justify-end">
                    {/* Bottom Editorial Content with Smooth Motion */}
                    <motion.div
                      key={`content-${item.number}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="space-y-4 max-w-xl text-left"
                    >
                      <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                        {item.name} Sanctuary
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-neutral-200 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="pt-2">
                        <Link
                          to={`/products?category=${encodeURIComponent(item.name.toLowerCase())}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black hover:bg-[#E05A2B] hover:text-white transition-all text-xs font-bold uppercase tracking-wider group/cta shadow-xl"
                        >
                          <span>Explore {item.name} Collection</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  /* Inactive Panel: Sleek Vertical Callout */
                  <div className="relative z-10 w-full h-full p-6 flex flex-col justify-center items-center text-center">
                    {/* Vertical Rotated Title */}
                    <span className="block -rotate-90 whitespace-nowrap text-white font-sans font-extrabold text-base lg:text-lg tracking-wider uppercase group-hover:text-[#E05A2B] transition-colors">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View (< md screens): Category Tabs + High-Impact Active Room Card */}
        <div className="md:hidden space-y-4">
          {/* Scrollable Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {NUMBERED_ROOM_ACCORDION.map((item) => {
              const isSelected = activeNumber === item.number;
              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setActiveNumber(item.number)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                    isSelected
                      ? 'bg-black text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card for Mobile with Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.number}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/10] bg-neutral-900 shadow-xl"
            >
              <img
                src={activeItem.images[0]}
                alt={activeItem.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              <div className="relative z-10 w-full h-full p-6 flex flex-col justify-end">
                <div className="space-y-3">
                  <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight">
                    {activeItem.name} Sanctuary
                  </h3>
                  <p className="text-xs font-sans text-neutral-200 line-clamp-3 leading-relaxed">
                    {activeItem.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={`/products?category=${encodeURIComponent(activeItem.name.toLowerCase())}`}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#E05A2B] hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Explore Collection</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

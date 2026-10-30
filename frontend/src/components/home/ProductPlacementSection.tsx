import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HOTSPOT_ITEMS } from '../../data/mockData';
import { Hotspot } from '../../types';
import { FadeIn } from '../ui/Motion';

export const ProductPlacementSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const handleToggle = (item: Hotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHotspot(activeHotspot?.id === item.id ? null : item);
  };

  return (
    <section 
      className="w-full bg-[#FAF8F5] py-14 sm:py-20 overflow-hidden text-left"
      onClick={() => setActiveHotspot(null)}
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          {/* Main Visualizer Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl select-none">
            {/* Base Scene Image */}
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85"
              alt="Living In Context - Curated Architectural Showcase"
              className="w-full h-full object-cover"
            />

            {/* Subtle Ambient Overlay for Optimal Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/20 pointer-events-none" />

            {/* Elevated Editorial Content in Top Left */}
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10 z-20 max-w-md pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 mb-3">
                <span className="text-[#E05A2B] text-xs">✦</span>
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-white/90">
                  Curated Living
                </span>
              </div>

              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight drop-shadow-md">
                Living In Context
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-neutral-200/95 leading-relaxed font-sans drop-shadow-sm max-w-sm">
                Where bespoke craftsmanship meets contemporary architecture. Tap any marker to discover tagged essentials.
              </p>
            </div>

            {/* Bottom Right Explorer Pill */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-20 hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#E05A2B]" />
              <span className="text-white/80">3 Pieces Tagged in Scene</span>
              <span className="text-white/30">•</span>
              <Link
                to="/furniture"
                className="font-bold text-[#E05A2B] hover:text-white transition-colors uppercase tracking-wider text-[11px]"
              >
                View Full Catalog
              </Link>
            </div>

            {/* Interactive Hotspot Pins */}
            {HOTSPOT_ITEMS.map((item) => {
              const isActive = activeHotspot?.id === item.id;
              // Smart alignment: position popup towards the inside of the frame
              const isRightSide = item.x > 50;
              const isBottomSide = item.y > 60;

              return (
                <div
                  key={item.id}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Outer Pulsing Concentric Radar Wave */}
                  <span className="absolute -inset-2.5 rounded-full bg-white/40 animate-ping pointer-events-none" />

                  {/* Hotspot Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggle(item, e)}
                    aria-label={`Inspect ${item.title}`}
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isActive
                        ? 'bg-[#E05A2B] text-white scale-110 ring-4 ring-white/50'
                        : 'bg-white/95 text-neutral-900 hover:bg-[#E05A2B] hover:text-white hover:scale-110'
                    }`}
                  >
                    {isActive ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </button>

                  {/* Floating Product Detail Popover Card (Tablet & Desktop) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: isBottomSide ? 10 : -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className={`hidden sm:block absolute z-40 w-72 sm:w-80 bg-neutral-950/95 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-2xl text-left ${
                          isRightSide ? 'right-full mr-3.5' : 'left-full ml-3.5'
                        } ${
                          isBottomSide ? 'bottom-0' : 'top-0'
                        }`}
                      >
                        <div className="flex items-start justify-between pb-2 mb-2 border-b border-white/10">
                          <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B]">
                            {item.category || 'Featured Piece'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveHotspot(null)}
                            className="text-white/40 hover:text-white p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-3.5">
                          {item.image && (
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans font-bold text-sm text-white truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] font-sans text-neutral-400 truncate">
                              {item.subtitle}
                            </p>
                            <div className="text-xs font-sans font-extrabold text-[#E05A2B] mt-1">
                              {item.price}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                          <Link
                            to={`/furniture?category=${item.productSlug || 'living'}`}
                            className="text-[11px] font-sans text-white/70 hover:text-white underline underline-offset-2"
                          >
                            Explore in Catalog
                          </Link>

                          <Link
                            to={`/consultation?service=Custom+Furniture&item=${encodeURIComponent(item.title)}`}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#E05A2B] text-white hover:bg-[#C94A1F] text-[10px] font-bold uppercase tracking-wider transition-all"
                          >
                            <span>Order Now</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Mobile Anchored Popover Card (Contained within frame on phones) */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="sm:hidden absolute inset-x-3 bottom-3 z-40 bg-neutral-950/95 backdrop-blur-xl border border-white/15 p-3.5 rounded-2xl shadow-2xl text-left"
                >
                  <div className="flex items-start justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B]">
                      {activeHotspot.category || 'Featured Piece'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-white/60 hover:text-white p-1"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    {activeHotspot.image && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                        <img
                          src={activeHotspot.image}
                          alt={activeHotspot.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-sm text-white truncate">
                        {activeHotspot.title}
                      </h4>
                      <p className="text-[11px] font-sans text-neutral-400 truncate">
                        {activeHotspot.subtitle}
                      </p>
                      <div className="text-xs font-sans font-extrabold text-[#E05A2B] mt-0.5">
                        {activeHotspot.price}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <Link
                      to={`/furniture?category=${activeHotspot.productSlug || 'living'}`}
                      className="text-[11px] font-sans text-white/70 hover:text-white underline underline-offset-2"
                    >
                      Explore in Catalog
                    </Link>

                    <Link
                      to={`/consultation?service=Custom+Furniture&item=${encodeURIComponent(activeHotspot.title)}`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#E05A2B] text-white hover:bg-[#C94A1F] text-[10px] font-bold uppercase tracking-wider transition-all"
                    >
                      <span>Order Now</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

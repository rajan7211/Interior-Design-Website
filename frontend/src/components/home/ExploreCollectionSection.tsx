import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '../ui/Motion';

export const ExploreCollectionSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1); // default hovered on Home Organization

  const categories = [
    { name: 'Aroma & Wellness', preview: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80' },
    { name: 'Home Organization', preview: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=80' },
    { name: 'Decorative Accents', preview: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80' },
    { name: 'Wall Art & Decor', preview: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <FadeIn direction="up">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111111] mb-12 sm:mb-16 tracking-tight">
            Explore Collection
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Category List with Hover Preview */}
          <div className="lg:col-span-5 space-y-2">
            <FadeIn direction="up" delay={0.1}>
              <div className="divide-y divide-neutral-100">
                {categories.map((cat, idx) => (
                  <div
                    key={cat.name}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className="py-5 sm:py-6 flex items-center justify-between group cursor-pointer relative"
                  >
                    <span className="font-sans font-medium text-lg sm:text-xl text-neutral-800 group-hover:text-[#E05A2B] group-hover:translate-x-1.5 transition-all">
                      {cat.name}
                    </span>

                    {/* Floating Thumbnail Preview with Smooth Spring Pop */}
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.div
                          initial={{ scale: 0.6, opacity: 0, rotate: 0 }}
                          animate={{ scale: 1, opacity: 1, rotate: 6 }}
                          exit={{ scale: 0.6, opacity: 0, rotate: 0 }}
                          transition={{ duration: 0.3, ease: [0.34, 1.4, 0.64, 1] as const }}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-xl border-2 border-white"
                        >
                          <img
                            src={cat.preview}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link to="/projects">
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#E05A2B] hover:bg-[#C94A1F] text-white text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-md space-x-2"
                  >
                    <span>Explore All Categories</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Large Room Visual with FadeIn */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.2}>
              <div className="aspect-[16/11] rounded-3xl overflow-hidden bg-neutral-100 shadow-xl relative">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
                  alt="Styled Boucle Living Room with Circular Lighting"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};


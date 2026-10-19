import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '../ui/Motion';

interface CollectionCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const ExploreCollectionSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const categories: CollectionCategory[] = [
    {
      id: 'cat-living',
      name: 'Living Sanctuaries',
      description: 'Sculptural lounge seating, monolithic travertine coffee tables, and bouclé sofas tailored for refined modern living.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      slug: 'living'
    },
    {
      id: 'cat-dining',
      name: 'Culinary & Dining',
      description: 'Monolithic marble kitchen islands, bespoke fluted oak cabinetry, and sculpted architectural dining suites.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85',
      slug: 'dining'
    },
    {
      id: 'cat-bedroom',
      name: 'Master Bedroom Suites',
      description: 'Calm minimalist retreats with custom upholstered platform beds, acoustic headboards, and tailored nightstands.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
      slug: 'bedroom'
    },
    {
      id: 'cat-study',
      name: 'Executive Study & Library',
      description: 'Minimalist workspaces, floor-to-ceiling smoked walnut millwork, ergonomic seating, and warm focused task lighting.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=85',
      slug: 'workspace'
    },
    {
      id: 'cat-lighting',
      name: 'Architectural Lighting & Accents',
      description: 'Hand-blown glass chandeliers, ambient alabaster sconces, and tactile ceramic centrepieces for harmonious spatial mood.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=85',
      slug: 'lighting'
    }
  ];

  const activeCategory = categories[activeIndex] || categories[0];

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="mb-10 sm:mb-14">
            <span className="text-xs font-sans uppercase font-bold tracking-widest text-[#E05A2B] block mb-2">
              ✦ Curated Spatial Disciplines ✦
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight">
              Explore Interior Collections
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-sans text-neutral-500 max-w-xl leading-relaxed">
              Immerse yourself in spaces calibrated with natural textures, museum-grade joinery, and architectural proportion for contemporary living.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clean Bordered Category Cards (Same as previous style, locked height) */}
          <div className="lg:col-span-5 space-y-4">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-2.5">
                {categories.map((cat, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full text-left py-4 sm:py-4.5 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                        isActive
                          ? 'bg-[#FAF8F5] border-[#E05A2B]/40 shadow-sm'
                          : 'bg-transparent border-neutral-100 hover:bg-neutral-50 hover:border-neutral-200'
                      }`}
                    >
                      <span
                        className={`font-sans font-bold text-lg sm:text-xl transition-colors duration-200 block ${
                          isActive
                            ? 'text-[#E05A2B]'
                            : 'text-neutral-700 hover:text-[#111111]'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-6 sm:pt-8">
                <Link to="/products">
                  <span className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#E05A2B] hover:bg-[#C94A1F] text-white text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-md space-x-2">
                    <span>Explore All Collections</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Synchronized High-Resolution Showcase */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.2}>
              <div className="aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl relative">
                {/* Crossfading Dynamic Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeCategory.image}
                      alt={activeCategory.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Atmospheric Dark Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Overlaid Editorial Category Details at Bottom */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1.5 text-left text-white max-w-md">
                    <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-md">
                      {activeCategory.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-200/95 leading-relaxed drop-shadow-sm font-sans line-clamp-2">
                      {activeCategory.description}
                    </p>
                  </div>

                  <Link
                    to={`/products?category=${encodeURIComponent(activeCategory.slug)}`}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#E05A2B] hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-lg flex-shrink-0"
                  >
                    <span>View Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

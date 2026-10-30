import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layout } from '../components/layout/Layout';
import { FURNITURE_CATALOG } from '../data/mockData';
import { FurnitureProduct } from '../types';
import { CtaBanner } from '../components/home/CtaBanner';
import { ArrowUpRight, Sparkles, Info } from 'lucide-react';
import { FadeIn } from '../components/ui/Motion';

const CATEGORIES = [
  { label: 'All Collections', slug: 'all' },
  { label: 'Living Room', slug: 'living' },
  { label: 'Dining & Culinary', slug: 'dining' },
  { label: 'Bedroom Suites', slug: 'bedroom' },
  { label: 'Workspace & Study', slug: 'workspace' },
  { label: 'Lighting & Accents', slug: 'lighting' },
  { label: 'Outdoor & Terrace', slug: 'outdoor' },
];

const CATEGORY_ALIASES: Record<string, string> = {
  all: 'all',
  living: 'living',
  'living room': 'living',
  'living sanctuaries': 'living',
  dining: 'dining',
  culinary: 'dining',
  'culinary & dining': 'dining',
  'dining & culinary': 'dining',
  kitchen: 'dining',
  bedroom: 'bedroom',
  'bedroom suites': 'bedroom',
  sleeping: 'bedroom',
  sleep: 'bedroom',
  bed: 'bedroom',
  workspace: 'workspace',
  'workspace & study': 'workspace',
  study: 'workspace',
  office: 'workspace',
  library: 'workspace',
  lighting: 'lighting',
  'lighting & accents': 'lighting',
  light: 'lighting',
  accents: 'lighting',
  accent: 'lighting',
  outdoor: 'outdoor',
  'outdoor & terrace': 'outdoor',
  terrace: 'outdoor',
  patio: 'outdoor',
};

const normalizeCategory = (input?: string | null): string => {
  if (!input) return 'all';
  const clean = input.toLowerCase().trim();
  if (CATEGORY_ALIASES[clean]) return CATEGORY_ALIASES[clean];
  for (const [alias, target] of Object.entries(CATEGORY_ALIASES)) {
    if (clean.includes(alias) || alias.includes(clean)) return target;
  }
  return 'all';
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export const FurniturePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawParam = searchParams.get('category');
  const selectedSlug = useMemo(() => normalizeCategory(rawParam), [rawParam]);

  const [selectedProduct, setSelectedProduct] = useState<FurnitureProduct | null>(null);

  const handleCategorySelect = (slug: string) => {
    if (slug === 'all') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('category');
      setSearchParams(nextParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedSlug === 'all') return FURNITURE_CATALOG;
    return FURNITURE_CATALOG.filter((item) => item.roomSlug === selectedSlug);
  }, [selectedSlug]);

  return (
    <Layout>
      <div className="w-full bg-[#FAF8F5] pt-24 sm:pt-28 pb-20 sm:pb-28 text-left">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Page Hero Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="inline-flex items-center space-x-2 text-xs font-sans uppercase font-bold tracking-widest text-[#E05A2B] mb-3">
                <span>✦</span>
                <span>Handcrafted Essentials & Bespoke FF&E</span>
                <span>✦</span>
              </span>
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight">
                The Furniture Collection
              </h1>
              <p className="mt-4 text-sm sm:text-base font-sans text-neutral-600 leading-relaxed max-w-2xl">
                Calibrated with natural materials, architectural joinery, and tactile comfort. Every piece is fabricated to commission by master artisans or curated in limited editions.
              </p>
            </div>
          </FadeIn>

          {/* Interactive Category Filter Pills */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-10 sm:mb-14">
              {CATEGORIES.map((cat) => {
                const isActive = selectedSlug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-bold transition-all border ${
                      isActive
                        ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Empty State when no products match */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto border border-neutral-200">
              <Sparkles className="w-8 h-8 text-[#E05A2B] mx-auto mb-4" />
              <h3 className="font-sans font-bold text-xl text-neutral-900 mb-2">
                No Pieces Found
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                We couldn't find items in this specific category. Explore all our signature handcrafted pieces below.
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E05A2B] transition-colors"
              >
                View All Collections
              </button>
            </div>
          ) : (
            /* Products Grid with key={selectedSlug} so every tab switch animates and displays immediately */
            <motion.div
              key={selectedSlug}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Image Container with Badges */}
                    <div
                      className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 relative mb-5 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {product.badge && (
                          <span className="px-3 py-1 rounded-full bg-[#E05A2B] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                            {product.badge}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-medium tracking-wide">
                          {product.inStock ? 'In Stock' : 'Made to Order'}
                        </span>
                      </div>

                      {/* Quick View Button (Visible on mobile/tap, revealed on hover on desktop) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-md flex items-center space-x-1 z-10"
                      >
                        <span>Quick Details</span>
                        <Info className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Meta Information */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B]">
                        {product.category}
                      </span>
                      <h2
                        onClick={() => setSelectedProduct(product)}
                        className="font-sans font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#E05A2B] transition-colors leading-tight cursor-pointer"
                      >
                        {product.title}
                      </h2>
                      {product.materials && (
                        <p className="text-xs font-sans text-neutral-500 line-clamp-1">
                          {product.materials}
                        </p>
                      )}
                      {product.dimensions && (
                        <p className="text-[11px] font-mono text-neutral-400">
                          {product.dimensions}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price & Order Action */}
                  <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-sans uppercase tracking-wider text-neutral-400">
                        Price / Piece
                      </span>
                      <span className="font-sans font-extrabold text-base sm:text-lg text-[#111111]">
                        {product.price}
                      </span>
                    </div>

                    <Link
                      to={`/consultation?service=Custom+Furniture&item=${encodeURIComponent(product.title)}`}
                      className="inline-flex items-center space-x-1 px-4 py-2 rounded-full bg-neutral-100 text-neutral-800 hover:bg-[#E05A2B] hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Order Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto h-full bg-neutral-100 relative min-h-[260px]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans uppercase font-bold tracking-widest text-[#E05A2B]">
                      {selectedProduct.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="text-neutral-400 hover:text-black font-bold text-lg p-1"
                      aria-label="Close modal"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-sans font-extrabold text-2xl text-[#111111]">
                    {selectedProduct.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="pt-2 space-y-1 text-xs text-neutral-500 border-t border-neutral-100">
                    <p><span className="font-semibold text-black">Materials:</span> {selectedProduct.materials}</p>
                    <p><span className="font-semibold text-black">Dimensions:</span> {selectedProduct.dimensions}</p>
                    <p><span className="font-semibold text-black">Availability:</span> {selectedProduct.inStock ? 'Ready to Ship / In Stock' : 'Fabricated to Commission (4-8 weeks)'}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                      Studio Pricing
                    </span>
                    <span className="font-sans font-extrabold text-xl text-[#111111]">
                      {selectedProduct.price}
                    </span>
                  </div>

                  <Link
                    to={`/consultation?service=Custom+Furniture&item=${encodeURIComponent(selectedProduct.title)}`}
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#E05A2B] text-white hover:bg-[#C94A1F] transition-all text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    <span>Order Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Studio CTA Banner */}
      <CtaBanner />
    </Layout>
  );
};

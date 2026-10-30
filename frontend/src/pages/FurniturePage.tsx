import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layout } from '../components/layout/Layout';
import { FURNITURE_CATALOG } from '../data/mockData';
import { FurnitureProduct } from '../types';
import { CtaBanner } from '../components/home/CtaBanner';
import { ArrowUpRight, Sparkles, Info, ShoppingBag, Check, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FadeIn } from '../components/ui/Motion';
import { useWishlist } from '../context/WishlistContext';

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

// Numeric parser for price strings like "₹84,999"
const parsePrice = (priceStr: string): number => {
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return parseInt(numeric, 10) || 0;
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const { addItem, removeItem, isInWishlist, setIsOpen: setWishlistOpen } = useWishlist();

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
    let result = FURNITURE_CATALOG;

    // Filter by room slug
    if (selectedSlug !== 'all') {
      result = result.filter((item) => item.roomSlug === selectedSlug);
    }

    // Filter by in-stock toggle
    if (inStockOnly) {
      result = result.filter((item) => item.inStock);
    }

    // Filter by inline search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.materials && item.materials.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return result;
  }, [selectedSlug, inStockOnly, searchTerm, sortBy]);

  return (
    <Layout>
      <div className="w-full bg-[#FAF8F5] pt-24 sm:pt-28 pb-20 sm:pb-28 text-left">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Page Hero Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl mb-8 sm:mb-10">
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
          <FadeIn direction="up" delay={0.05}>
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-6">
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

          {/* Filter, Sort & Catalog Quick Search Bar */}
          <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-3.5 border border-neutral-200/80 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search collection by piece, finish, or marble..."
                className="w-full pl-10 pr-8 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-sans outline-none focus:border-black transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Controls: In Stock Toggle & Sorting */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs font-sans">
              {/* In Stock Filter */}
              <button
                type="button"
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                  inStockOnly
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-black'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-[#E05A2B]' : 'bg-green-500'}`} />
                <span className="font-semibold">Ready to Ship Only</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-neutral-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-neutral-800 font-semibold outline-none cursor-pointer text-xs"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Item Count */}
              <span className="text-neutral-400 text-xs pl-2 hidden lg:inline">
                Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> items
              </span>
            </div>
          </div>

          {/* Empty State when no products match */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto border border-neutral-200">
              <Sparkles className="w-8 h-8 text-[#E05A2B] mx-auto mb-4" />
              <h3 className="font-sans font-bold text-xl text-neutral-900 mb-2">
                No Pieces Matched Your Filters
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                Try clearing your search term or showing all made-to-order commissions.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setInStockOnly(false);
                    handleCategorySelect('all');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E05A2B] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            /* Products Grid with key so tab switch triggers smooth entry */
            <motion.div
              key={`${selectedSlug}-${sortBy}-${inStockOnly}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => {
                const isSaved = isInWishlist(product.id);

                return (
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

                        {/* Top Left Badges */}
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

                        {/* Top Right Save to Inquiry Bag Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSaved) {
                              removeItem(product.id);
                            } else {
                              addItem(product);
                            }
                          }}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 shadow-md ${
                            isSaved
                              ? 'bg-[#E05A2B] text-white scale-105'
                              : 'bg-white/90 text-neutral-700 hover:bg-black hover:text-white'
                          }`}
                          title={isSaved ? 'In your inquiry bag (click to remove)' : 'Save to inquiry bag'}
                        >
                          {isSaved ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <ShoppingBag className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Quick View Button on Hover */}
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

                      <div className="flex items-center space-x-2">
                        {/* Order Now Direct Link */}
                        <Link
                          to={`/consultation?service=Custom+Furniture&item=${encodeURIComponent(product.title)}`}
                          className="inline-flex items-center space-x-1 px-4 py-2 rounded-full bg-neutral-100 text-neutral-800 hover:bg-[#E05A2B] hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                        >
                          <span>Order Now</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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

                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                      Studio Pricing
                    </span>
                    <span className="font-sans font-extrabold text-xl text-[#111111]">
                      {selectedProduct.price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isInWishlist(selectedProduct.id)) {
                          removeItem(selectedProduct.id);
                        } else {
                          addItem(selectedProduct);
                          setWishlistOpen(true);
                        }
                      }}
                      className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border flex items-center justify-center space-x-1.5 ${
                        isInWishlist(selectedProduct.id)
                          ? 'bg-neutral-100 border-neutral-200 text-black'
                          : 'bg-white border-neutral-300 text-neutral-800 hover:border-black'
                      }`}
                    >
                      {isInWishlist(selectedProduct.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#E05A2B]" />
                          <span>In Inquiry Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Save to Bag</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/consultation?service=Custom+Furniture&item=${encodeURIComponent(selectedProduct.title)}`}
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 py-2.5 rounded-full bg-[#E05A2B] text-white hover:bg-[#C94A1F] transition-all text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center space-x-1"
                    >
                      <span>Order Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
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

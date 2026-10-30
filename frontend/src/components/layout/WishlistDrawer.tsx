import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../../context/WishlistContext';

export const WishlistDrawer: React.FC = () => {
  const { items, removeItem, isOpen, setIsOpen, clearWishlist, totalCount } = useWishlist();
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const handleProceedToConsultation = () => {
    setIsOpen(false);
    const itemNames = items.map((i) => i.title).join(', ');
    navigate(`/consultation?service=Custom+Furniture&item=${encodeURIComponent(itemNames)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 text-left"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#111111]" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#111111]">
                    Inquiry Bag
                  </h3>
                  <span className="text-xs text-neutral-400 font-sans">
                    {totalCount} {totalCount === 1 ? 'piece' : 'pieces'} curated for consultation
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-base text-neutral-900">
                      Your inquiry bag is empty
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                      Explore our handcrafted furniture collection and save your favorite bespoke pieces here.
                    </p>
                  </div>
                  <Link
                    to="/furniture"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#E05A2B] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Browse Furniture
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3.5 bg-neutral-50/80 rounded-2xl border border-neutral-100 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-neutral-200/60">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B] block">
                        {item.category}
                      </span>
                      <h4 className="font-sans font-bold text-sm text-[#111111] truncate mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs font-sans font-extrabold text-[#111111] mt-1">
                        {item.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                      title="Remove from inquiry bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Actions */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 pb-2">
                  <span>Selected Pieces: <strong className="text-black">{totalCount}</strong></span>
                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="text-neutral-400 hover:text-red-600 transition-colors text-xs underline"
                  >
                    Clear All
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToConsultation}
                  className="w-full py-3.5 px-6 rounded-full bg-[#E05A2B] hover:bg-[#C94A1F] text-white text-xs font-bold font-sans uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md group"
                >
                  <span>Inquire for All Saved Pieces</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-sans font-semibold text-neutral-600 hover:text-black transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '../../data/mockData';
import { ShoppingBag } from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../ui/Motion';

export const FeaturedCollectionSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF8F5] py-20 sm:py-28 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs font-sans uppercase font-bold tracking-wider text-neutral-400 block mb-1">
              Best Selling
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#111111] tracking-tight">
              Featured Collection
            </h2>
          </div>
        </FadeIn>

        {/* 4 Product Cards Grid with Staggered Entrance */}
        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {FEATURED_PRODUCTS.map((prod) => (
              <FadeInStaggerItem key={prod.id}>
                <div className="group bg-white rounded-2xl p-4 sm:p-5 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-50 mb-4 p-4 flex items-center justify-center relative">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    {prod.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#E05A2B] text-white text-[9px] font-bold uppercase tracking-wider">
                        {prod.badge}
                      </span>
                    )}
                    <Link
                      to="/consultation"
                      className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-black text-white hover:bg-[#E05A2B] opacity-0 group-hover:opacity-100 transition-all shadow-md"
                      title="Inquire about item"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-base text-[#111111] group-hover:text-[#E05A2B] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                      {prod.price}
                    </p>
                  </div>
                </div>
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
};

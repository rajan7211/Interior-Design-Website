import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../ui/Motion';

export const WhatWeOfferSection: React.FC = () => {
  const serviceCards = [
    {
      id: 'srv-1',
      title: 'Custom Interior Design',
      tagline: 'Tailored solutions that reflect your lifestyle and vision.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      isDarkOverlay: true,
      link: '/services',
    },
    {
      id: 'srv-2',
      title: 'Consultation & Planning',
      tagline: 'Expert guidance to plan spaces efficiently and beautifully.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      isDarkOverlay: false,
      link: '/consultation',
    },
    {
      id: 'srv-3',
      title: 'Styling & Implementation',
      tagline: 'From concept to completion, we bring designs to life.',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      isDarkOverlay: false,
      link: '/services',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] pb-20 sm:pb-28 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Title Column */}
          <div className="lg:col-span-3 space-y-2">
            <FadeIn direction="up">
              <span className="text-xs font-sans uppercase font-bold tracking-wider text-neutral-400">
                Our Services
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#111111] leading-tight mt-1">
                What We<br />Offer
              </h2>
            </FadeIn>
          </div>

          {/* Right: 3 Vertical Service Cards with Staggered Entrance */}
          <div className="lg:col-span-9">
            <FadeInStagger staggerDelay={0.12}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceCards.map((card) => (
                  <FadeInStaggerItem key={card.id}>
                    <Link
                      to={card.link}
                      className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-neutral-200/80 p-5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                    >
                {card.isDarkOverlay ? (
                  // Full-bleed style card
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-neutral-900 mb-5">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-between">
                      <h3 className="font-sans font-bold text-xl text-white">
                        {card.title}
                      </h3>
                      <p className="text-xs text-white/80 leading-snug">
                        {card.tagline}
                      </p>
                    </div>
                  </div>
                ) : (
                  // White card style
                  <>
                    <div className="pb-4 border-b border-neutral-100 mb-4">
                      <h3 className="font-sans font-bold text-lg text-[#111111] group-hover:text-[#E05A2B] transition-colors flex items-center justify-between">
                        <span>{card.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-sans text-neutral-500 leading-snug">
                      {card.tagline}
                    </p>
                  </>
                )}
                    </Link>
                  </FadeInStaggerItem>
                ))}
              </div>
            </FadeInStagger>
          </div>
        </div>
      </div>
    </section>
  );
};


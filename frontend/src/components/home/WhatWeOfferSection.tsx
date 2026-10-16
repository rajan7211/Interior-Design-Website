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
      link: '/services',
    },
    {
      id: 'srv-2',
      title: 'Consultation & Planning',
      tagline: 'Expert guidance to plan spaces efficiently and beautifully.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      link: '/consultation',
    },
    {
      id: 'srv-3',
      title: 'Styling & Implementation',
      tagline: 'From concept to completion, we bring designs to life.',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      link: '/services',
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Title Column with Descriptive Context & CTA */}
          <div className="lg:col-span-3">
            <FadeIn direction="up">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-sans uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                    Our Services
                  </span>
                  <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#111111] leading-tight">
                    What We<br />Offer
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-sans text-neutral-500 leading-relaxed">
                  From full-scale architectural transformations to bespoke furniture curation, our studio creates calm, purposeful spaces tailored to your lifestyle and everyday comfort.
                </p>

                <div className="pt-2">
                  <Link
                    to="/services"
                    className="inline-flex items-center space-x-2 text-xs font-bold font-sans uppercase tracking-wider text-[#111111] hover:text-[#E05A2B] transition-colors group/link"
                  >
                    <span>Explore All Services</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: 3 Unified Vertical Service Cards */}
          <div className="lg:col-span-9">
            <FadeInStagger staggerDelay={0.12}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceCards.map((card) => (
                  <FadeInStaggerItem key={card.id}>
                    <Link
                      to={card.link}
                      className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-neutral-200/80 p-5 bg-white shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 h-full"
                    >
                      <div>
                        {/* Title Bar with Hover Accent & Arrow */}
                        <div className="pb-4 border-b border-neutral-100 mb-4">
                          <h3 className="font-sans font-bold text-lg text-[#111111] group-hover:text-[#E05A2B] transition-colors flex items-center justify-between">
                            <span>{card.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#E05A2B] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </h3>
                        </div>

                        {/* Unobstructed Image Showcase */}
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                          />
                        </div>
                      </div>

                      {/* Tagline Description */}
                      <p className="text-xs font-sans text-neutral-500 leading-relaxed">
                        {card.tagline}
                      </p>
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

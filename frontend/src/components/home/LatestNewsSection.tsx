import React from 'react';
import { Link } from 'react-router-dom';
import { LATEST_ARTICLES } from '../../data/mockData';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../ui/Motion';

export const LatestNewsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF] pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden text-center">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight">
              Latest News
            </h2>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 leading-relaxed">
              Insights, trends, and design inspiration to help you create stylish, functional, and effortless living spaces.
            </p>
          </div>
        </FadeIn>

        {/* 4 Cards Grid with Staggered Entrance */}
        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {LATEST_ARTICLES.map((art) => (
              <FadeInStaggerItem key={art.id}>
                <article className="group flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm mb-4">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-sans font-bold text-base text-[#111111] group-hover:text-[#E05A2B] transition-colors leading-snug">
                      {art.title}
                    </h3>
                  </div>

                  <div className="pt-3">
                    <Link
                      to="/about"
                      className="text-xs font-bold font-sans text-neutral-600 hover:text-[#E05A2B] transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
};



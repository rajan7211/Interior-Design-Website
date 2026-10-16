import React from 'react';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES } from '../../data/mockData';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../ui/Motion';

export const ExclusiveFurnitureSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-20 overflow-hidden text-center">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight">
              Exclusive Furniture
            </h2>
            <p className="text-xs sm:text-sm font-sans text-neutral-500 leading-relaxed">
              Discover this week's handpicked selection of popular pieces that redefine comfort and style.
            </p>
          </div>
        </FadeIn>

        {/* 4-Column Grid with Staggered Entrance */}
        <FadeInStagger staggerDelay={0.12}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {ROOM_CATEGORIES.map((room) => (
              <FadeInStaggerItem key={room.id}>
                <Link
                  to="/projects"
                  className="group flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm mb-4">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-lg text-[#111111] group-hover:text-[#E05A2B] transition-colors">
                      {room.title}
                    </h3>
                    <p className="text-xs font-sans text-neutral-500 mt-1 leading-snug">
                      {room.description}
                    </p>
                  </div>
                </Link>
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
};



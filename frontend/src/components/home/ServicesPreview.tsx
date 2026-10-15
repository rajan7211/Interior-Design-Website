import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_SERVICES } from '../../data/mockData';

export const ServicesPreview: React.FC = () => {
  return (
    <section className="w-full bg-[#FBF9F5] py-16 sm:py-24 border-t border-[#E7E2D8] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
              Atelier Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#181716]">
              Architectural & Curation Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-[#181716] hover:text-[#5D6853] transition-colors border-b border-[#181716] pb-1 w-fit"
          >
            <span>Explore All Capabilities</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STUDIO_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#F2EDE4]/60 border border-[#E7E2D8] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#F2EDE4] transition-all duration-300 hover:border-[#D4CDBC] group text-left"
            >
              <div className="space-y-5">
                <span className="font-serif text-3xl sm:text-4xl font-light text-[#847262] block">
                  {service.number}
                </span>
                
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#181716] group-hover:text-[#5D6853] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs font-sans text-[#55504A] leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              <div className="pt-8 border-t border-[#E7E2D8] mt-8 flex items-center justify-between">
                <span className="text-[10px] uppercase font-sans tracking-[0.16em] text-[#757069]">
                  {service.timeline}
                </span>
                <Link
                  to="/services"
                  className="p-1.5 text-[#181716] group-hover:text-[#5D6853] transition-colors"
                  aria-label={`View ${service.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import { Button } from '../ui/Button';

interface ServiceDetailCardProps {
  service: Service;
  index: number;
}

export const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({ service, index }) => {
  const isReversed = index % 2 === 1;

  return (
    <article className="group border border-[#E7E2D8] bg-[#FFFFFF] p-6 sm:p-10 lg:p-12 mb-12 shadow-sm text-left transition-all duration-500 hover:border-[#C5BBAF] hover:shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Visual Column */}
        <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#EAE4D7] shadow-inner relative">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-[#181716] text-[#FBF9F5] px-3 py-1 font-serif text-lg font-light">
              {service.number}
            </div>
          </div>
        </div>

        {/* Narrative & Deliverables Column */}
        <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
              Duration: {service.timeline}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#181716]">
              {service.title}
            </h2>
            <p className="text-sm font-sans text-[#847262] italic">
              {service.tagline}
            </p>
          </div>

          <p className="text-sm font-sans text-[#55504A] leading-relaxed">
            {service.description}
          </p>

          <div className="bg-[#FBF9F5] border border-[#E7E2D8] p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-sans uppercase tracking-[0.18em] text-[#181716] font-medium">
              Atelier Deliverables & Milestones
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <div className="p-1 bg-[#EEF1EB] text-[#5D6853] mt-0.5 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-medium text-[#181716]">
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-sans text-[#757069] leading-snug mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E7E2D8]">
            <p className="text-xs font-sans text-[#757069]">
              <span className="font-medium text-[#181716]">Best suited for:</span> {service.idealFor}
            </p>
            <Link to={`/consultation?service=${encodeURIComponent(service.title)}`}>
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Commission Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};


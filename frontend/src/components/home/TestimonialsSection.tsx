import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, STUDIO_AWARDS } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section className="w-full bg-[#F2EDE4] py-16 sm:py-24 border-t border-[#E4DCD0] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Quote Carousel */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBF9F5] border border-[#E4DCD0] text-[#5D6853]">
            <Quote className="w-5 h-5" />
          </div>

          <div className="min-h-[160px] flex items-center justify-center">
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#181716] italic leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>
          </div>

          <div className="space-y-1">
            <p className="font-serif text-lg text-[#181716] font-normal">
              {currentTestimonial.clientName}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] font-sans text-[#757069]">
              {currentTestimonial.projectType} • {currentTestimonial.location}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 pt-4">
            <button
              onClick={prev}
              className="p-3 border border-[#D4CDBC] bg-[#FBF9F5] hover:bg-[#181716] hover:text-[#FBF9F5] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 transition-all ${
                    idx === activeIndex ? 'bg-[#5D6853] w-6' : 'bg-[#D4CDBC]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 border border-[#D4CDBC] bg-[#FBF9F5] hover:bg-[#181716] hover:text-[#FBF9F5] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Accolades & Honours Strip */}
        <div className="mt-20 pt-14 border-t border-[#E4DCD0]">
          <p className="text-center text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#847262] mb-8">
            Selected Critical Recognition & Honors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STUDIO_AWARDS.map((award, i) => (
              <div key={i} className="p-4 bg-[#FBF9F5]/70 border border-[#E4DCD0]/70 space-y-1">
                <p className="text-xs font-sans text-[#5D6853] font-medium">{award.year}</p>
                <h4 className="font-serif text-sm sm:text-base text-[#181716] font-normal">{award.title}</h4>
                <p className="text-[10px] uppercase tracking-[0.14em] font-sans text-[#757069]">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


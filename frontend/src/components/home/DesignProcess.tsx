import React from 'react';
import { DESIGN_PROCESS_STEPS } from '../../data/mockData';

export const DesignProcess: React.FC = () => {
  return (
    <section className="w-full bg-[#FBF9F5] py-16 sm:py-24 border-t border-[#E7E2D8] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
            Architectural Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#181716] mt-2">
            The Commission Journey
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#55504A] mt-4 leading-relaxed">
            Our disciplined 4-stage process balances boundless artistic exploration with rigorous project management, cost transparency, and flawless turnkey execution.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative text-left">
          {DESIGN_PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 sm:p-8 bg-[#F2EDE4]/50 border border-[#E7E2D8] flex flex-col justify-between hover:bg-[#F2EDE4] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E7E2D8] mb-6">
                  <span className="font-serif text-2xl sm:text-3xl text-[#5D6853]">
                    {step.step}
                  </span>
                  <span className="text-[10px] uppercase font-sans tracking-[0.16em] text-[#847262] bg-[#EAE4D7] px-2.5 py-1">
                    {step.phase}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-normal text-[#181716] mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[#55504A] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E2D8]/60 flex items-center justify-between text-[10px] uppercase font-sans tracking-[0.2em] text-[#757069]">
                <span>Phase 0{idx + 1} of 04</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


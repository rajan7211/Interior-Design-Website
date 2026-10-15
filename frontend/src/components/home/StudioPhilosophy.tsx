import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const StudioPhilosophy: React.FC = () => {
  return (
    <section className="w-full bg-[#181716] text-[#FBF9F5] py-20 sm:py-28 overflow-x-hidden border-t border-[#2A2724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait and Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] bg-[#2A2724] overflow-hidden relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Eleanor Vance, Founder of AURELLE Interiors"
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg sm:text-xl text-[#FBF9F5]">
                  Eleanor Vance
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#A39180]">
                  Founder & Principal Creative Director
                </p>
              </div>
            </div>

            {/* Overlapping Material Texture Accent */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-48 bg-[#2A2724] border border-[#3D3934] p-3 shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
                alt="Tactile materials"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Studio Manifesto
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FBF9F5] leading-tight">
              Spaces should not demand attention; they should reward it.
            </h2>

            <div className="space-y-4 text-sm sm:text-base font-sans text-[#C4BEB5] leading-relaxed">
              <p>
                At AURELLE Interiors, we believe luxury is defined by intangible qualities: proportional harmony, silence, tectonic clarity, and the sensory intimacy of natural materials that patina gracefully with age.
              </p>
              <p>
                Rejecting superficial ornamentation, our practice unites architectural discipline with decorative connoisseurship. We treat light as our primary building material, sculpting volumes that foster tranquility and creative renewal.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/about">
                <Button variant="sand" size="md" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                  Discover Studio Philosophy
                </Button>
              </Link>
              <Link to="/consultation">
                <Button variant="ghost" size="md" className="text-[#C5A880] hover:text-[#FBF9F5]">
                  Meet With Our Directors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


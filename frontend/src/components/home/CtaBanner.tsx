import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#181716] text-[#FBF9F5] py-20 sm:py-28 overflow-hidden border-t border-[#2A2724]">
      {/* Background subtle architectural vignette */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"
          alt="AURELLE Interior Atelier"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#C5A880] font-medium">
          Private Studio Engagement
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FBF9F5] leading-tight">
          Ready to sculpt your next sanctuary?
        </h2>

        <p className="text-sm sm:text-base font-sans text-[#C4BEB5] max-w-2xl mx-auto leading-relaxed">
          We accept a strictly limited number of private residential and commercial atelier commissions each calendar year to ensure unwavering focus and architectural intimacy.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/consultation" className="w-full sm:w-auto">
            <Button
              variant="sand"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              Request Private Consultation
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-[#FBF9F5] border-[#FBF9F5] hover:bg-[#FBF9F5] hover:text-[#181716]"
            >
              Contact Atelier
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


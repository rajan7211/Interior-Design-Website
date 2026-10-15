import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const LUXURY_EASE = [0.21, 0.47, 0.32, 0.98] as const;
const PHOTO_SETTLE_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_EASE = [0.34, 1.4, 0.64, 1] as const;

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-end overflow-hidden bg-[#181716] text-white">
      {/* Background Architectural Interior Photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: PHOTO_SETTLE_EASE }}
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85"
          alt="Curated Luxury Living Room"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/20" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-24 pt-36">
        <div className="max-w-4xl text-left space-y-6">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
            className="text-xs sm:text-sm font-sans text-white/90 max-w-lg leading-relaxed font-normal"
          >
            Curated home decor and furniture, thoughtfully crafted to elevate your living spaces with elegance.
          </motion.p>

          {/* Huge Display Headline with Inline Photo Badge */}
          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-white leading-[1.05] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: LUXURY_EASE }}
              className="inline-flex items-center flex-wrap gap-x-3 gap-y-1"
            >
              <span>Beautiful</span>
              {/* Inline Photo Badge (Smooth spring reveal) */}
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.45, ease: SPRING_EASE }}
                className="inline-block w-14 sm:w-20 md:w-24 h-9 sm:h-12 md:h-14 rounded-lg overflow-hidden border-2 border-white/80 shadow-md align-middle -translate-y-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80"
                  alt="Inline decor"
                  className="w-full h-full object-cover"
                />
              </motion.span>
              <span>Homes</span>
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.42, ease: LUXURY_EASE }}
              className="inline-block"
            >
              Start Right Here
            </motion.span>
          </h1>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: LUXURY_EASE }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <Link to="/projects">
              <button
                type="button"
                className="group px-8 py-4 rounded-full bg-white text-black hover:bg-[#F2EDE4] text-xs font-bold font-sans uppercase tracking-[0.16em] transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
            <Link to="/consultation">
              <button
                type="button"
                className="px-8 py-4 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/40 text-white text-xs font-bold font-sans uppercase tracking-[0.16em] transition-all"
              >
                <span>Book Consultation</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

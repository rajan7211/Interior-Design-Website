import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#100F0E] text-white pt-10 sm:pt-14 pb-8 border-t border-neutral-800 text-left">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main 2-Column Grid (Matching Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-10 border-b border-neutral-800">
          {/* Left Column (Logo, Tagline, Button & 3 Column Directory) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-4 max-w-md">
              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className="w-7 h-7 rounded-full border border-white/80 flex items-center justify-center font-bold text-xs bg-white/10">
                  <span>✦</span>
                </div>
                <span className="font-sans font-bold text-2xl tracking-tight text-white">
                  Aurellé<span className="text-[#E05A2B]">.</span>
                </span>
              </Link>

              <p className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed">
                Supporting modern living through thoughtfully designed furniture, décor, and timeless interior solutions for every home.
              </p>

              <div className="pt-2">
                <Link to="/projects">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-md"
                  >
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>

            {/* 3 Nav Columns: Quick Links, Support, Company */}
            <div className="grid grid-cols-3 gap-6 pt-5 border-t border-neutral-800/80 text-xs font-sans">
              <div>
                <p className="font-bold text-white mb-3 tracking-wide">
                  Quick Links
                </p>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/projects" className="hover:text-white transition-colors">Collection</Link></li>
                  <li><Link to="/projects" className="hover:text-white transition-colors">Furniture</Link></li>
                  <li><Link to="/services" className="hover:text-white transition-colors">Rooms</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-3 tracking-wide">
                  Support
                </p>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link to="/services" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                  <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Order Tracking</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Reviews</Link></li>
                  <li><Link to="/services" className="hover:text-white transition-colors">Design Guide</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-white mb-3 tracking-wide">
                  Company
                </p>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Contact, Offices & Socials (Matching Image 4) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight">
              Designing Homes For<br />Inspired Living
            </h3>

            <div className="space-y-1 text-sm font-sans">
              <a href="tel:+918580432871" className="block text-white font-semibold hover:text-[#E05A2B] transition-colors">
                (+91) 8580432871
              </a>
              <a href="mailto:ronakthakur434@gmail.com" className="block text-neutral-400 hover:text-white transition-colors">
                ronakthakur434@gmail.com
              </a>
            </div>

            {/* Studio Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-800 text-xs font-sans text-neutral-400">
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">London Studio</p>
                <p className="mt-1">28 Kensington Church St, London W8 4EP</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">New York Studio</p>
                <p className="mt-1">142 Franklin St, Tribeca, New York, NY 10013</p>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div className="pt-1 flex items-center space-x-3 text-sm text-neutral-400">
              <span className="text-xs font-bold text-white mr-2">Follow Us:</span>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                𝕏
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                ig
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                yt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-neutral-500 gap-3">
          <p>
            © {new Date().getFullYear()} Aurellé. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/admin/dashboard" className="flex items-center hover:text-white transition-colors">
              <Shield className="w-3.5 h-3.5 mr-1 text-[#E05A2B]" />
              <span>Admin Portal</span>
            </Link>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

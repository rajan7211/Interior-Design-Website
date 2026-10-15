import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/projects' },
    { label: 'Furniture', path: '/projects?category=Residential%20Architecture' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#141312]/95 backdrop-blur-md py-3.5 border-b border-white/10 shadow-lg text-white'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 lg:py-6 text-white'
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo with Circular Glyph (Matching Maisoné Reference) */}
            <Link to="/" className="flex items-center space-x-2.5 group focus:outline-none">
              <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center font-bold text-sm tracking-tighter bg-white/10 group-hover:bg-white group-hover:text-black transition-all">
                <span>✦</span>
              </div>
              <span className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-[#E05A2B] transition-colors">
                Aurellé<span className="text-[#E05A2B]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`text-sm font-sans transition-colors relative py-1 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E05A2B]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Login Pill */}
            <div className="hidden sm:flex items-center space-x-4 lg:space-x-5">
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-white/90 hover:text-white transition-colors"
                aria-label="Search Collection"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Shopping Bag Icon with Count */}
              <Link
                to="/consultation"
                className="relative p-1.5 text-white/90 hover:text-white transition-colors"
                aria-label="Inquiry Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E05A2B] text-white text-[9px] font-bold flex items-center justify-center">
                  2
                </span>
              </Link>

              <span className="text-white/30 text-xs">|</span>

              {/* Sign Up / Consultation */}
              <Link
                to="/consultation"
                className="text-xs font-sans text-white/90 hover:text-white transition-colors"
              >
                Sign Up
              </Link>

              {/* White Pill Button: Login / Admin */}
              <Link to="/admin/login">
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-white text-black hover:bg-[#F2EDE4] font-sans text-xs font-semibold tracking-wide transition-all shadow-sm"
                >
                  Login
                </button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-3 sm:hidden">
              <Link to="/consultation" className="p-1.5 text-white relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E05A2B] text-white text-[8px] font-bold flex items-center justify-center">
                  2
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[65px] z-50 bg-[#141312]/98 backdrop-blur-xl flex flex-col justify-between px-6 py-8 overflow-y-auto sm:hidden border-t border-white/10 text-left">
            <div className="space-y-6">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#E05A2B] font-bold">
                Menu Directory
              </p>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-2xl font-sans font-medium text-white hover:text-[#E05A2B] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 mt-8 space-y-3">
              <Link to="/admin/login" className="block w-full">
                <button
                  type="button"
                  className="w-full py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider"
                >
                  Login to Studio Portal
                </button>
              </Link>
              <Link to="/consultation" className="block w-full">
                <button
                  type="button"
                  className="w-full py-3 rounded-full bg-[#E05A2B] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Book Private Consultation
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] text-black w-full max-w-lg p-6 rounded-2xl shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-500">
                Search Decor & Projects
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search sofas, lighting, spatial design, penthouses..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-black"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
              <span className="font-semibold text-black">Popular:</span>
              <Link to="/projects" onClick={() => setSearchOpen(false)} className="hover:text-[#E05A2B] bg-gray-100 px-2 py-1 rounded-md">
                Billow Sofa
              </Link>
              <Link to="/projects" onClick={() => setSearchOpen(false)} className="hover:text-[#E05A2B] bg-gray-100 px-2 py-1 rounded-md">
                Kensington Maisonette
              </Link>
              <Link to="/services" onClick={() => setSearchOpen(false)} className="hover:text-[#E05A2B] bg-gray-100 px-2 py-1 rounded-md">
                Custom Joinery
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

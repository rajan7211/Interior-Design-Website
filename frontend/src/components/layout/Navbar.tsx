import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowUpRight, Sparkles, Layers, Compass, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { FURNITURE_CATALOG, INITIAL_PROJECTS, STUDIO_SERVICES } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState<'all' | 'furniture' | 'projects' | 'services'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { totalCount, setIsOpen: setWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Handle ESC key for search modal & auto focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      // Optional: Cmd/Ctrl + K shortcut to open search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/projects' },
    { label: 'Furniture', path: '/furniture' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  // Live filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return { furniture: [], projects: [], services: [], total: 0 };
    }

    const furniture = FURNITURE_CATALOG.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        (f.materials && f.materials.toLowerCase().includes(q)) ||
        (f.description && f.description.toLowerCase().includes(q))
    ).slice(0, 6);

    const projects = INITIAL_PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    ).slice(0, 4);

    const services = STUDIO_SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      furniture,
      projects,
      services,
      total: furniture.length + projects.length + services.length,
    };
  }, [searchQuery]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#100F0E] py-3.5 border-b border-neutral-800 text-white shadow-xl'
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
                    : location.pathname.startsWith(link.path) ||
                      (link.path === '/furniture' && location.pathname.startsWith('/products'));

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
            <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-white/90 hover:text-white transition-colors relative flex items-center space-x-1"
                aria-label="Search Collection"
                title="Search Collection (Ctrl+K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-[10px] text-white/40 border border-white/20 rounded px-1.5 py-0.5 ml-1">
                  ⌘K
                </span>
              </button>

              {/* Shopping Bag Trigger Button with Live Count */}
              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                className="relative p-1.5 text-white/90 hover:text-white transition-colors"
                aria-label="Inquiry Bag"
                title="View Inquiry Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E05A2B] text-white text-[9px] font-bold flex items-center justify-center shadow-md animate-in fade-in zoom-in">
                    {totalCount}
                  </span>
                )}
              </button>

              <span className="text-white/30 text-xs">|</span>

              {/* Consultation Link */}
              <Link
                to="/consultation"
                className="text-xs font-sans text-white/90 hover:text-white transition-colors"
              >
                Consultation
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
            <div className="flex items-center space-x-3 md:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-white"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                className="p-1.5 text-white relative"
                aria-label="Inquiry Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E05A2B] text-white text-[8px] font-bold flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </button>

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
          <div className="fixed inset-0 top-[65px] z-50 bg-[#141312]/98 backdrop-blur-xl flex flex-col justify-between px-6 py-8 overflow-y-auto md:hidden border-t border-white/10 text-left">
            <div className="space-y-6">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#E05A2B] font-bold">
                Menu Directory
              </p>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
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

      {/* Live Global Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="bg-white text-black w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative text-left border border-neutral-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center space-x-3.5">
              <Search className="w-5 h-5 text-[#E05A2B] flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search furniture, architecture, materials, lighting..."
                className="w-full text-base sm:text-lg font-sans outline-none placeholder:text-neutral-400 bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-neutral-400 hover:text-black"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 sm:px-2.5 sm:py-1 text-xs text-neutral-400 hover:text-black font-semibold rounded-md border border-neutral-200 flex items-center justify-center transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">ESC</span>
              </button>
            </div>

            {/* Results Filter Tabs if query present */}
            {searchQuery && searchResults.total > 0 && (
              <div className="px-6 py-2.5 bg-neutral-50/70 border-b border-neutral-100 flex items-center space-x-2 text-xs font-sans overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveSearchTab('all')}
                  className={`px-3 py-1 rounded-full font-bold transition-all ${
                    activeSearchTab === 'all'
                      ? 'bg-[#111111] text-white'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  All ({searchResults.total})
                </button>
                {searchResults.furniture.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('furniture')}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      activeSearchTab === 'furniture'
                        ? 'bg-[#111111] text-white'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Furniture ({searchResults.furniture.length})
                  </button>
                )}
                {searchResults.projects.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('projects')}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      activeSearchTab === 'projects'
                        ? 'bg-[#111111] text-white'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Projects ({searchResults.projects.length})
                  </button>
                )}
                {searchResults.services.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('services')}
                    className={`px-3 py-1 rounded-full font-bold transition-all ${
                      activeSearchTab === 'services'
                        ? 'bg-[#111111] text-white'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Services ({searchResults.services.length})
                  </button>
                )}
              </div>
            )}

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
              {!searchQuery ? (
                /* Empty state: show popular suggestions */
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-neutral-400 block mb-2.5">
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                      {['Bouclé Sofa', 'Travertine', 'Kensington', 'Dining Table', 'Full Interior Architecture', 'Penthouse', 'Lighting'].map((pill) => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => setSearchQuery(pill)}
                          className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-[#E05A2B] hover:text-white transition-all text-neutral-700 font-medium"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-neutral-400 block mb-3">
                      Featured Architectural Works
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INITIAL_PROJECTS.slice(0, 2).map((proj) => (
                        <Link
                          key={proj.id}
                          to={`/projects/${proj.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center space-x-3 p-2.5 rounded-2xl hover:bg-neutral-50 border border-neutral-100 transition-all group"
                        >
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans font-bold text-xs text-[#111111] group-hover:text-[#E05A2B] truncate">
                              {proj.title}
                            </h4>
                            <p className="text-[11px] text-neutral-400 truncate">
                              {proj.location}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E05A2B] flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : searchResults.total === 0 ? (
                /* No Results Found */
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-neutral-800">
                    No results for "{searchQuery}"
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Try searching for furniture types (*sofa, chair, lamp*), architectural locations (*London, Paris, Zurich*), or design services.
                  </p>
                </div>
              ) : (
                /* Results List */
                <div className="space-y-6">
                  {/* Furniture Results */}
                  {(activeSearchTab === 'all' || activeSearchTab === 'furniture') &&
                    searchResults.furniture.length > 0 && (
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B] block">
                          Furniture Collection ({searchResults.furniture.length})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {searchResults.furniture.map((item) => (
                            <Link
                              key={item.id}
                              to={`/furniture?category=${item.roomSlug || 'all'}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center space-x-3 p-2.5 rounded-2xl hover:bg-neutral-50 border border-neutral-100 transition-all group"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-sans font-bold text-xs text-[#111111] group-hover:text-[#E05A2B] truncate">
                                  {item.title}
                                </h4>
                                <span className="text-[11px] font-sans text-neutral-500 font-semibold block">
                                  {item.price}
                                </span>
                              </div>
                              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E05A2B]" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Projects Results */}
                  {(activeSearchTab === 'all' || activeSearchTab === 'projects') &&
                    searchResults.projects.length > 0 && (
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B] block">
                          Architectural Monographs ({searchResults.projects.length})
                        </span>
                        <div className="space-y-2">
                          {searchResults.projects.map((proj) => (
                            <Link
                              key={proj.id}
                              to={`/projects/${proj.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-neutral-100 transition-all group"
                            >
                              <div className="flex items-center space-x-3 min-w-0">
                                <img
                                  src={proj.coverImage}
                                  alt={proj.title}
                                  className="w-12 h-12 rounded-xl object-cover"
                                />
                                <div className="min-w-0">
                                  <h4 className="font-sans font-bold text-xs text-[#111111] group-hover:text-[#E05A2B] truncate">
                                    {proj.title}
                                  </h4>
                                  <p className="text-[11px] text-neutral-400 truncate">
                                    {proj.location} • {proj.category}
                                  </p>
                                </div>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#E05A2B]" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Services Results */}
                  {(activeSearchTab === 'all' || activeSearchTab === 'services') &&
                    searchResults.services.length > 0 && (
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#E05A2B] block">
                          Design Disciplines ({searchResults.services.length})
                        </span>
                        <div className="space-y-2">
                          {searchResults.services.map((serv) => (
                            <Link
                              key={serv.id}
                              to="/services"
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-neutral-100 transition-all group"
                            >
                              <div className="min-w-0">
                                <h4 className="font-sans font-bold text-xs text-[#111111] group-hover:text-[#E05A2B]">
                                  {serv.title}
                                </h4>
                                <p className="text-[11px] text-neutral-400 line-clamp-1">
                                  {serv.tagline}
                                </p>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#E05A2B]" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Footer Tip */}
            <div className="p-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 px-6">
              <span>Press <strong className="text-black">ESC</strong> to exit</span>
              <Link
                to="/furniture"
                onClick={() => setSearchOpen(false)}
                className="text-[#E05A2B] font-bold hover:underline"
              >
                Browse All Collections &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

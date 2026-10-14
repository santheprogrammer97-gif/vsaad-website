import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sparkles, ChevronDown } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGraniteDropdownOpen, setIsGraniteDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { quoteCart } = useVsaad();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsGraniteDropdownOpen(false);
  }, [location.pathname, location.search]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsGraniteDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cartCount = quoteCart.length;

  const isGraniteActive =
    location.pathname === '/granite' ||
    (location.pathname === '/products' && (!location.search || location.search.includes('granite')));

  const isTilesActive =
    location.pathname === '/tiles' ||
    (location.pathname === '/products' && location.search.includes('tiles'));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080A]/95 backdrop-blur-md border-b border-[#2A2A38]/70 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#08080A]/90 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: VSAAD Wordmark */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="VSAAD Surfaces Home"
            >
              <div className="relative">
                <span className="font-display tracking-[0.25em] text-2xl sm:text-3xl font-light text-vsaad-ivory group-hover:text-vsaad-purple-light transition-colors duration-300 uppercase">
                  VSAAD
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-vsaad-purple to-transparent group-hover:w-full transition-all duration-500" />
              </div>
              <span className="hidden sm:inline-block text-[10px] tracking-[0.3em] uppercase text-vsaad-ivory-dark font-sans border-l border-[#2A2A38] pl-2.5 py-0.5">
                Granite &amp; Tiles
              </span>
            </Link>

            {/* Centre: Desktop Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
              {/* Home */}
              <Link
                to="/"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  location.pathname === '/'
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                Home
                {location.pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>

              {/* Granite with Subnavigation Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsGraniteDropdownOpen(true)}
                onMouseLeave={() => setIsGraniteDropdownOpen(false)}
              >
                <Link
                  to="/products?category=granite"
                  className={`inline-flex items-center gap-1 text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                    isGraniteActive
                      ? 'text-vsaad-purple-light font-medium'
                      : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                  }`}
                  aria-expanded={isGraniteDropdownOpen}
                >
                  <span>Granite</span>
                  <ChevronDown className="w-3 h-3 text-vsaad-purple-light transition-transform duration-200 group-hover:rotate-180" />
                  {isGraniteActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {isGraniteDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-[#0E0E14] border border-[#2A2A38] rounded-xs shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl">
                    <Link
                      to="/products?category=granite"
                      className="block px-3 py-2 rounded-xs text-xs font-sans text-vsaad-ivory hover:text-vsaad-purple-light hover:bg-[#181822] transition-colors"
                    >
                      <span className="font-medium block">All Granite</span>
                      <span className="text-[10px] text-vsaad-ivory-dark block">Complete 20-slab showroom range</span>
                    </Link>
                    <div className="my-1 border-t border-[#1E1E2A]" />
                    <Link
                      to="/products?category=granite&finish=Polished"
                      className="block px-3 py-2 rounded-xs text-xs font-sans text-vsaad-ivory hover:text-vsaad-purple-light hover:bg-[#181822] transition-colors"
                    >
                      <span className="font-medium block">Polished Granite</span>
                      <span className="text-[10px] text-vsaad-ivory-dark block">17 High-mirror reflective varieties</span>
                    </Link>
                    <Link
                      to="/products?category=granite&finish=Lapotra"
                      className="block px-3 py-2 rounded-xs text-xs font-sans text-vsaad-ivory hover:text-amber-300 hover:bg-[#181822] transition-colors"
                    >
                      <span className="font-medium block">Lapotra Granite</span>
                      <span className="text-[10px] text-vsaad-ivory-dark block">3 Tactile brushed leathered varieties</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Tiles */}
              <Link
                to="/tiles"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  isTilesActive
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                Tiles
                {isTilesActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>

              {/* Gallery */}
              <Link
                to="/gallery"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  location.pathname === '/gallery'
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                Gallery
                {location.pathname === '/gallery' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>

              {/* About */}
              <Link
                to="/about"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  location.pathname === '/about'
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                About
                {location.pathname === '/about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>

              {/* Journal */}
              <Link
                to="/journal"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  location.pathname.startsWith('/journal') || location.pathname.startsWith('/blog')
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                Journal
                {(location.pathname.startsWith('/journal') || location.pathname.startsWith('/blog')) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>

              {/* FAQ */}
              <Link
                to="/faq"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  location.pathname === '/faq'
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                FAQ
                {location.pathname === '/faq' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`relative text-xs tracking-[0.16em] uppercase font-sans transition-colors duration-200 py-1 ${
                  location.pathname === '/contact'
                    ? 'text-vsaad-purple-light font-medium'
                    : 'text-vsaad-ivory-muted hover:text-vsaad-ivory'
                }`}
              >
                Contact
                {location.pathname === '/contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-vsaad-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3 sm:space-x-3.5">
              {/* Quote Cart Badge */}
              <Link
                to="/quote-cart"
                className="relative p-2 rounded-full text-vsaad-ivory hover:text-vsaad-purple-light hover:bg-[#171720] transition-colors focus:outline-none"
                aria-label={`View Quote Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-vsaad-purple text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Enquiry CTA Button */}
              <Link
                to="/quote-cart"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xs text-xs tracking-[0.18em] uppercase font-medium bg-gradient-to-r from-[#171720] to-[#22222E] border border-vsaad-purple/40 text-vsaad-ivory hover:border-vsaad-purple hover:shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-vsaad-purple" />
                <span>Enquiry</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded text-vsaad-ivory hover:text-vsaad-purple focus:outline-none"
                aria-label={isMobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08080A]/98 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 overflow-y-auto">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                location.pathname === '/' ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              Home
            </Link>

            {/* Mobile Granite Accordion */}
            <div className="py-2.5 border-b border-[#2A2A38]/50">
              <div className="flex items-center justify-between">
                <Link
                  to="/products?category=granite"
                  className={`text-base tracking-[0.15em] uppercase font-display ${
                    isGraniteActive ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
                  }`}
                >
                  Granite Catalogue
                </Link>
              </div>
              <div className="pl-4 mt-2 space-y-2 border-l border-vsaad-purple/30">
                <Link
                  to="/products?category=granite"
                  className="block text-xs uppercase tracking-wider text-vsaad-ivory-muted hover:text-white"
                >
                  All Granite (20 Varieties)
                </Link>
                <Link
                  to="/products?category=granite&finish=Polished"
                  className="block text-xs uppercase tracking-wider text-vsaad-purple-light hover:text-white"
                >
                  Polished Granite (17 Varieties)
                </Link>
                <Link
                  to="/products?category=granite&finish=Lapotra"
                  className="block text-xs uppercase tracking-wider text-amber-300 hover:text-white"
                >
                  Lapotra Granite (3 Varieties)
                </Link>
              </div>
            </div>

            <Link
              to="/tiles"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                isTilesActive ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              Architectural Tiles
            </Link>

            <Link
              to="/gallery"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                location.pathname === '/gallery' ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/about"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                location.pathname === '/about' ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              About
            </Link>

            <Link
              to="/journal"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                location.pathname.startsWith('/journal') ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              Journal
            </Link>

            <Link
              to="/faq"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                location.pathname === '/faq' ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              className={`text-base tracking-[0.15em] uppercase font-display py-2.5 border-b border-[#2A2A38]/50 ${
                location.pathname === '/contact' ? 'text-vsaad-purple-light font-semibold' : 'text-vsaad-ivory'
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="space-y-3 pt-6 border-t border-[#2A2A38]">
            <Link
              to="/quote-cart"
              className="flex items-center justify-between w-full py-3 px-4 rounded bg-[#171720] text-vsaad-ivory text-sm uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-vsaad-purple" />
                Quotation Request
              </span>
              <span className="bg-vsaad-purple text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded bg-gradient-to-r from-vsaad-purple to-vsaad-purple-deep text-white text-sm uppercase tracking-widest font-semibold shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Showroom Quote</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

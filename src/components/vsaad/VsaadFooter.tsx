import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useVsaad } from '../../context/VsaadContext';

export const VsaadFooter: React.FC = () => {
  const { siteConfig } = useVsaad();

  return (
    <footer className="relative bg-[#060608] text-vsaad-ivory-muted border-t border-[#2A2A38]/70 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.5) 0%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E1E28]">
          {/* Column 1: Brand & Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <span className="font-display tracking-[0.25em] text-3xl font-light text-vsaad-ivory uppercase">
                VSAAD
              </span>
              <p className="text-[11px] tracking-[0.28em] text-vsaad-purple-light uppercase mt-1 font-sans">
                Granite &amp; Architectural Tiles
              </p>
            </Link>

            <p className="text-sm text-vsaad-ivory-muted font-sans leading-relaxed max-w-sm pt-2">
              Nature, Refined. Spaces, Reimagined. VSAAD is a Chennai specialist showroom curating earth-quarried natural granite in Polished and tactile Lapotra finishes, alongside high-density architectural porcelain and vitrified stone tiles.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#13131A] border border-[#2A2A38] flex items-center justify-center text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#13131A] border border-[#2A2A38] flex items-center justify-center text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#13131A] border border-[#2A2A38] flex items-center justify-center text-vsaad-ivory hover:text-vsaad-purple hover:border-vsaad-purple transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Granite & Tiles Scope */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-vsaad-ivory">
              Surfaces Catalogue
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=granite" className="hover:text-vsaad-purple-light transition-colors">
                  All Granite (20 Slabs)
                </Link>
              </li>
              <li>
                <Link to="/products?category=granite&finish=Polished" className="hover:text-vsaad-purple-light transition-colors">
                  Polished Granite (17)
                </Link>
              </li>
              <li>
                <Link to="/products?category=granite&finish=Lapotra" className="hover:text-vsaad-purple-light transition-colors">
                  Lapotra Granite (3)
                </Link>
              </li>
              <li>
                <Link to="/products?category=tiles" className="hover:text-vsaad-purple-light transition-colors">
                  Architectural Tiles
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-vsaad-purple-light transition-colors">
                  Browse Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-vsaad-ivory">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/gallery" className="hover:text-vsaad-purple-light transition-colors">
                  Architectural Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-vsaad-purple-light transition-colors">
                  About Showroom
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-vsaad-purple-light transition-colors">
                  Journal &amp; Insights
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-vsaad-purple-light transition-colors">
                  FAQs &amp; Advisory
                </Link>
              </li>
              <li>
                <Link to="/quote-cart" className="hover:text-vsaad-purple-light transition-colors">
                  Quotation Enquiry Cart
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-xs text-vsaad-ivory-dark hover:text-vsaad-purple transition-colors">
                  Showroom Admin CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Showroom & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-vsaad-ivory">
              Chennai Showroom
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-vsaad-purple shrink-0 mt-0.5" />
                <span>
                  {siteConfig?.contact.address || '123, Anna Salai'}<br />
                  {siteConfig?.contact.city || 'Chennai'} – {siteConfig?.contact.pincode || '600002'}, Tamil Nadu
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-vsaad-purple shrink-0" />
                <a
                  href={`tel:${siteConfig?.contact.phone || '+919876543210'}`}
                  className="hover:text-vsaad-ivory transition-colors"
                >
                  {siteConfig?.contact.phone || '+91 98765 43210'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-vsaad-purple shrink-0" />
                <a
                  href={`mailto:${siteConfig?.contact.email || 'info@vsaad.com'}`}
                  className="hover:text-vsaad-ivory transition-colors"
                >
                  {siteConfig?.contact.email || 'info@vsaad.com'}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-vsaad-purple shrink-0 mt-0.5" />
                <span>
                  {siteConfig?.contact.workingHours || 'Mon – Sat: 09:30 AM – 08:00 PM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-vsaad-ivory-dark gap-4">
          <p>
            © {new Date().getFullYear()} VSAAD Granite &amp; Tiles. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-vsaad-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-vsaad-ivory transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/shipping-policy" className="hover:text-vsaad-ivory transition-colors">
              Shipping &amp; Handling
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

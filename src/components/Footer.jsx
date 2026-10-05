import React from 'react';
import { CAFE_INFO } from '../data/content';
import { Phone, MapPin, Heart, ArrowUp, Star } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B2420] text-[#FBF4E8] relative overflow-hidden pt-16 pb-24 sm:pb-16 border-t-4 border-[#E08A1E]">
      
      {/* Decorative Gradient Pattern Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-[#E08A1E] via-[#A6305E] to-[#5C7A5E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E08A1E] to-[#A6305E] flex items-center justify-center text-white text-xl shadow-md">
                🪔
              </div>
              <div>
                <span className="font-serif text-2xl font-bold leading-tight block text-white">
                  Rangoli <span className="text-[#E08A1E]">Cafe</span>
                </span>
                <span className="font-devanagari text-sm text-amber-200 font-bold block">
                  रंगोली कैफे & रेस्टोरेंट
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FBF4E8]/80 leading-relaxed font-light max-w-md">
              A women-owned, LGBTQ+ friendly sanctuary in Vashist, Manali. Serving homestyle Indian food, herbal chai, and unforgettable Himalayan mountain vistas.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.8 / 5.0 Rating from 500+ Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FBF4E8]/80 font-light">
              <li>
                <a href="#about" className="hover:text-[#E08A1E] transition-colors">Our Story & Identity</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#E08A1E] transition-colors">Menu Highlights</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E08A1E] transition-colors">Visual Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#E08A1E] transition-colors">Guest Reviews</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-[#E08A1E] transition-colors">Opening Hours</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#E08A1E] transition-colors">Location & Directions</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Details & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 inline-block">
              Visit Us
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#FBF4E8]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E08A1E] shrink-0 mt-0.5" />
                <span>Opposite Yogashala, Jogni Waterfall Rd, Vashist, Himachal Pradesh 175103</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E08A1E] shrink-0" />
                <a href={`tel:${CAFE_INFO.phoneRaw}`} className="hover:text-[#E08A1E] transition-colors font-semibold">
                  +91 98056 16406
                </a>
              </p>

              <p className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-[#A6305E] shrink-0" />
                <a href={CAFE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#A6305E] transition-colors">
                  {CAFE_INFO.instagram}
                </a>
              </p>

              <div className="pt-2">
                <span className="inline-block bg-[#5C7A5E]/40 text-emerald-200 text-xs px-3 py-1 rounded-full font-bold">
                  Open Daily: 8:30 AM – 10:30 PM
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF4E8]/60">
          <div>
            © {new Date().getFullYear()} Rangoli Cafe & Restaurant (रंगोली कैफे). All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-[#A6305E] text-[#A6305E]" />
            <span>in Vashist, Himachal Pradesh</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-[#E08A1E] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

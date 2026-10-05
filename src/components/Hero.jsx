import React from 'react';
import { Star, Phone, Utensils, MapPin, Heart, ArrowDown, ChevronRight } from 'lucide-react';
import { CAFE_INFO } from '../data/content';

export default function Hero({ onOpenReserveModal }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Image with Parallax & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
          alt="Rangoli Cafe Terrace View in Vashist, Manali"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-10000"
          style={{ animationDuration: '20s' }}
        />
        {/* Soft Dark Overlay with Warm Accent Tints */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2420] via-[#2B2420]/75 to-[#2B2420]/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#A6305E]/20" />
      </div>

      {/* Decorative Floating Rangoli Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#E08A1E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#A6305E]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        
        {/* Trust Badge Top Pill */}
        <div className="inline-flex items-center gap-2 bg-[#FFFDF9]/15 backdrop-blur-md border border-white/25 px-4 py-2 rounded-full mb-6 text-xs sm:text-sm font-semibold tracking-wide text-[#FBF4E8] shadow-lg animate-fade-in">
          <div className="flex items-center gap-1 text-[#E08A1E]">
            <Star className="w-4 h-4 fill-[#E08A1E]" />
            <span className="font-bold text-white">4.8</span>
          </div>
          <span className="text-white/40">•</span>
          <span className="text-white/90">500+ Google Reviews</span>
          <span className="text-white/40">•</span>
          <span className="text-white/90">Vashist, Himachal</span>
        </div>

        {/* Bilingual Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-2 text-white leading-tight drop-shadow-md">
          Rangoli Cafe <span className="text-[#E08A1E] font-normal italic">&</span> Restaurant
        </h1>
        
        {/* Devanagari Hindi Subheading */}
        <div className="font-devanagari text-2xl sm:text-3xl md:text-4xl text-[#FBF4E8] font-bold mb-6 tracking-wide drop-shadow text-amber-200">
          रंगोली कैफे & रेस्टोरेंट
        </div>

        {/* Identity Subtitle Pill Strip */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-6 text-xs sm:text-sm">
          <span className="bg-[#A6305E]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold shadow-sm">
            👩‍🍳 Women-Owned
          </span>
          <span className="bg-[#5C7A5E]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold shadow-sm">
            🏳️‍🌈 LGBTQ+ Friendly
          </span>
          <span className="bg-[#E08A1E]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold shadow-sm">
            🏔️ Terrace Mountain Views
          </span>
        </div>

        {/* Hero Paragraph */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#FBF4E8]/90 font-light leading-relaxed mb-8 sm:mb-10 drop-shadow">
          Homestyle Indian delicacies, aromatic freshly-brewed masala chai, and uninterrupted Himalayan peak vistas. Located opposite Yogashala on Jogni Waterfall Road, Vashist.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <a
            href="#menu"
            className="w-full sm:w-auto bg-gradient-to-r from-[#E08A1E] to-[#C6740E] hover:from-[#C6740E] hover:to-[#A6305E] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-warm-lg hover:scale-105 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Utensils className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Explore Menu</span>
          </a>

          <a
            href={`tel:${CAFE_INFO.phoneRaw}`}
            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-base px-7 py-3.5 rounded-full border border-white/40 hover:border-white transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5 text-[#E08A1E]" />
            <span>Call Us Now</span>
          </a>
        </div>

        {/* Location Landmark Micro-Badge */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#FBF4E8]/80 bg-[#2B2420]/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <MapPin className="w-4 h-4 text-[#E08A1E]" />
          <span>Opposite Yogashala, Jogni Waterfall Trail, Vashist (175103)</span>
        </div>

      </div>

      {/* Down Arrow Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <a href="#badges" aria-label="Scroll to features">
          <ArrowDown className="w-6 h-6 hover:text-[#E08A1E] transition-colors" />
        </a>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Phone, Utensils, Calendar } from 'lucide-react';
import { CAFE_INFO } from '../data/content';

export default function Navbar({ onOpenReserveModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for highlight
      const sections = ['hero', 'about', 'menu', 'gallery', 'reviews', 'hours', 'location', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Hours', href: '#hours', id: 'hours' },
    { label: 'Location', href: '#location', id: 'location' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF4E8]/95 backdrop-blur-md shadow-warm-sm border-b border-[#E08A1E]/20 py-3'
          : 'bg-gradient-to-b from-[#2B2420]/80 via-[#2B2420]/40 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#E08A1E] rounded-lg p-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E08A1E] to-[#A6305E] flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform">
              <span className="text-xl">🪔</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg sm:text-xl font-bold leading-tight tracking-wide ${isScrolled ? 'text-[#2B2420]' : 'text-white'}`}>
                Rangoli <span className="text-[#E08A1E]">Cafe</span>
              </span>
              <span className={`font-devanagari text-xs font-semibold ${isScrolled ? 'text-[#A6305E]' : 'text-[#FBF4E8]/90'}`}>
                रंगोली कैफे & रेस्टोरेंट
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-[#E08A1E] ${
                    isScrolled
                      ? isActive ? 'text-[#A6305E] font-bold border-b-2 border-[#A6305E]' : 'text-[#574B45]'
                      : isActive ? 'text-[#E08A1E] font-bold border-b-2 border-[#E08A1E]' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CAFE_INFO.phoneRaw}`}
              className={`hidden md:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-full border transition-all ${
                isScrolled
                  ? 'border-[#5C7A5E] text-[#5C7A5E] hover:bg-[#5C7A5E] hover:text-white'
                  : 'border-white/40 text-white hover:bg-white/20'
              }`}
              title="Call Us"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 98056 16406</span>
            </a>

            <button
              onClick={onOpenReserveModal}
              className="bg-gradient-to-r from-[#E08A1E] to-[#A6305E] hover:from-[#C6740E] hover:to-[#8B234D] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-warm-sm hover:shadow-warm-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenReserveModal}
              className="sm:hidden bg-[#E08A1E] text-white p-2 rounded-full text-xs font-bold"
              aria-label="Reserve"
            >
              <Calendar className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none ${
                isScrolled ? 'text-[#2B2420] hover:bg-[#F5EADA]' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF4E8] border-b border-[#E08A1E]/20 shadow-xl px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-[#E08A1E]/15 flex items-center justify-between">
              <span className="font-devanagari font-bold text-[#A6305E]">रंगोली कैफे - वशिष्ठ</span>
              <span className="text-xs font-bold text-[#5C7A5E] bg-[#5C7A5E]/10 px-2.5 py-1 rounded-full">⭐ 4.8 / 5.0</span>
            </div>
            
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 px-3 rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#E08A1E]/15 text-[#A6305E] font-bold'
                    : 'text-[#2B2420] hover:bg-[#F5EADA]'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-[#E08A1E]/15 flex flex-col gap-3">
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-[#5C7A5E] text-white font-bold py-3 rounded-full text-sm shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 98056 16406</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReserveModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E08A1E] to-[#A6305E] text-white font-bold py-3 rounded-full text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

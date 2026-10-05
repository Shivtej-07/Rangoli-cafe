import React, { useState } from 'react';
import { REVIEWS, CAFE_INFO } from '../data/content';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#5C7A5E] bg-[#5C7A5E]/10 px-3.5 py-1.5 rounded-full">
              Real Experiences From Real Guests
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Loved by 500+ Travelers
            </h2>
            <div className="font-devanagari text-lg text-[#A6305E] font-bold mb-4">
              गूगल समीक्षाएं — ⭐ 4.8 / 5.0 (510+ समीक्षाएं)
            </div>
          </div>
        </Reveal>

        {/* Google Summary Badge Banner */}
        <Reveal delay={100}>
          <div className="bg-gradient-to-r from-[#FBF4E8] via-[#FFFDF9] to-[#FBF4E8] border border-[#E08A1E]/30 rounded-3xl p-6 sm:p-8 shadow-warm-md mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E08A1E] to-[#A6305E] flex flex-col items-center justify-center text-white shadow-md font-serif font-extrabold text-2xl">
                4.8
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2B2420]">
                  Rated 4.8 / 5.0 on Google Maps
                </h3>
                <p className="text-xs text-[#574B45]">
                  Based on 510+ verified traveler reviews & local diners
                </p>
              </div>
            </div>

            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2B2420] hover:bg-[#A6305E] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span>View All Google Reviews</span>
              <CheckCircle2 className="w-4 h-4 text-[#E08A1E]" />
            </a>

          </div>
        </Reveal>

        {/* Reviews Interactive Carousel Card */}
        <Reveal delay={150}>
          <div className="max-w-4xl mx-auto relative">
            
            <div className="bg-[#FBF4E8] border border-[#E08A1E]/20 p-8 sm:p-12 rounded-3xl shadow-warm-lg relative">
              <Quote className="w-16 h-16 text-[#E08A1E]/15 absolute top-6 right-8 pointer-events-none" />

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={REVIEWS[currentIndex].avatar}
                  alt={REVIEWS[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E08A1E] shadow-sm"
                />
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2B2420]">
                    {REVIEWS[currentIndex].name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#574B45]">
                    <span>{REVIEWS[currentIndex].location}</span>
                    <span>•</span>
                    <span className="text-[#5C7A5E] font-semibold">{REVIEWS[currentIndex].date}</span>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-base sm:text-lg text-[#2B2420] font-light leading-relaxed italic mb-6">
                "{REVIEWS[currentIndex].text}"
              </p>

              {/* Bottom Controls & Indicators */}
              <div className="flex items-center justify-between pt-6 border-t border-[#E08A1E]/15">
                <div className="flex items-center gap-2">
                  {REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === idx ? 'w-8 bg-[#A6305E]' : 'w-2.5 bg-[#E08A1E]/30 hover:bg-[#E08A1E]/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevReview}
                    className="p-3 rounded-full bg-[#FFFDF9] hover:bg-[#E08A1E] hover:text-white border border-[#E08A1E]/30 text-[#2B2420] transition-all shadow-xs cursor-pointer"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-3 rounded-full bg-[#FFFDF9] hover:bg-[#E08A1E] hover:text-white border border-[#E08A1E]/30 text-[#2B2420] transition-all shadow-xs cursor-pointer"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

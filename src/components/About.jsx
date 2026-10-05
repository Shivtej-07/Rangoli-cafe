import React from 'react';
import { ABOUT_DATA, CAFE_INFO } from '../data/content';
import { Heart, MapPin, Award, Smile, ArrowRight, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#FBF4E8] relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Image Composition */}
          <div className="lg:col-span-6 relative">
            <Reveal>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Large Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-4 border-[#FFFDF9]">
                  <img
                    src={ABOUT_DATA.images[0].url}
                    alt={ABOUT_DATA.images[0].alt}
                    className="w-full h-[420px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2420]/70 via-transparent to-transparent" />
                  
                  {/* Overlay Tagline */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-devanagari text-lg text-amber-200 font-bold">
                      {ABOUT_DATA.hindiHeading}
                    </p>
                    <p className="font-serif text-xl font-bold">
                      Opposite Yogashala, Vashist Trail
                    </p>
                  </div>
                </div>

                {/* Overlapping Secondary Floating Card */}
                <div className="hidden sm:flex absolute -bottom-8 -right-6 bg-[#FFFDF9] border border-[#E08A1E]/30 p-4 rounded-2xl shadow-warm-md items-center gap-4 max-w-xs transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-[#E08A1E]/15 flex items-center justify-center text-[#E08A1E]">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#2B2420]">Women-Led Warmth</div>
                    <div className="text-xs text-[#574B45]">Fresh homestyle meals cooked with family recipes</div>
                  </div>
                </div>

                {/* Rating Badge Floating Top Left */}
                <div className="absolute top-6 left-6 bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 border border-[#E08A1E]/20">
                  <span className="text-amber-500 font-bold text-sm">⭐ 4.8 / 5.0</span>
                  <span className="text-xs text-[#574B45] font-semibold">(510+ Google Reviews)</span>
                </div>

              </div>
            </Reveal>
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-6">
            <Reveal delay={150}>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6305E] bg-[#A6305E]/10 px-3.5 py-1.5 rounded-full mb-4">
                <Heart className="w-3.5 h-3.5 fill-[#A6305E]" />
                <span>Our Story & Vibe</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2420] leading-tight mb-4">
                {ABOUT_DATA.heading}
              </h2>

              <div className="font-devanagari text-lg text-[#A6305E] font-bold mb-6">
                स्वादिष्ट भोजन, हिमालयन आत्मीयता एवं सबका स्वागत
              </div>

              <div className="space-y-4 text-base text-[#574B45] leading-relaxed mb-8">
                {ABOUT_DATA.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FFFDF9] rounded-2xl border border-[#E08A1E]/20 shadow-warm-sm mb-8">
                {ABOUT_DATA.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="font-serif text-2xl font-extrabold text-[#E08A1E]">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-[#574B45] mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#menu"
                  className="bg-[#A6305E] hover:bg-[#8B234D] text-white font-bold text-sm px-6 py-3 rounded-full shadow-warm-sm hover:shadow-warm-md transition-all flex items-center gap-2"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#location"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#5C7A5E] hover:text-[#2B2420] underline decoration-[#5C7A5E] underline-offset-4 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find Us in Vashist</span>
                </a>
              </div>

            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

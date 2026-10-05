import React from 'react';
import { BADGES } from '../data/content';
import { Heart, Sparkles, Mountain, Leaf, Dog, Flame } from 'lucide-react';
import Reveal from './Reveal';

const ICON_MAP = {
  HeartHandshake: Heart,
  Sparkles: Sparkles,
  Mountain: Mountain,
  Leaf: Leaf,
  Dog: Dog
};

export default function Badges() {
  return (
    <section id="badges" className="py-12 bg-[#FFFDF9] border-y border-[#E08A1E]/15 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A6305E] bg-[#A6305E]/10 px-3 py-1 rounded-full">
              Why Guests Love Rangoli
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2420] mt-2">
              Our Core Identity & Promise
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {BADGES.map((badge, idx) => {
            const IconComponent = ICON_MAP[badge.icon] || Sparkles;
            return (
              <Reveal key={badge.id} delay={idx * 100}>
                <div className="bg-[#FBF4E8] hover:bg-[#F5EADA] border border-[#E08A1E]/20 p-5 rounded-2xl text-center shadow-warm-sm hover:shadow-warm-md transform hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center justify-between group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E08A1E]/20 to-[#A6305E]/20 flex items-center justify-center text-[#A6305E] group-hover:scale-110 group-hover:from-[#E08A1E] group-hover:to-[#A6305E] group-hover:text-white transition-all duration-300 mb-3">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2B2420] mb-0.5 group-hover:text-[#A6305E] transition-colors">
                      {badge.title}
                    </h3>
                    <p className="font-devanagari text-xs text-[#A6305E] font-semibold mb-2">
                      {badge.hindi}
                    </p>
                    <p className="text-xs text-[#574B45] leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

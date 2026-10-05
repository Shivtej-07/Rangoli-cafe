import React, { useState } from 'react';
import { FAQ_DATA } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Reveal from './Reveal';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-16 bg-[#FFFDF9] relative border-t border-[#E08A1E]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#E08A1E] bg-[#E08A1E]/10 px-3.5 py-1.5 rounded-full">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2420] mt-3 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#574B45]">
              Everything you need to know about visiting Rangoli Cafe in Vashist.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <div className="bg-[#FBF4E8] border border-[#E08A1E]/20 rounded-2xl overflow-hidden shadow-warm-xs transition-all">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left font-serif font-bold text-base sm:text-lg text-[#2B2420] flex items-center justify-between gap-4 hover:text-[#A6305E] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#E08A1E] shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A6305E] transition-transform duration-300 ${
                      openIdx === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {openIdx === idx && (
                  <div className="px-5 pb-5 pt-0 text-sm text-[#574B45] leading-relaxed border-t border-[#E08A1E]/10 mt-1 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

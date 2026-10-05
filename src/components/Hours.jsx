import React, { useState, useEffect } from 'react';
import { HOURS_LIST, CAFE_INFO } from '../data/content';
import { Clock, Coffee, Moon, Sun, Sparkles, CheckCircle } from 'lucide-react';
import Reveal from './Reveal';

export default function Hours() {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      // 8:30 AM = 510 mins, 10:30 PM = 1350 mins
      const openTime = 8 * 60 + 30; // 510
      const closeTime = 22 * 60 + 30; // 1350

      setIsOpenNow(currentMinutes >= openTime && currentMinutes <= closeTime);
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hours" className="py-20 bg-[#FBF4E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#E08A1E] bg-[#E08A1E]/10 px-3.5 py-1.5 rounded-full">
              Welcoming You Every Day
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Opening Hours & Timings
            </h2>
            <div className="font-devanagari text-lg text-[#A6305E] font-bold mb-4">
              खुलने का समय - प्रतिदिन सुबह 8:30 से रात 10:30 तक
            </div>
            
            {/* Live Open / Closed Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border shadow-sm text-sm font-bold bg-[#FFFDF9]">
              <span className={`w-3 h-3 rounded-full animate-ping ${isOpenNow ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className={isOpenNow ? 'text-emerald-700' : 'text-rose-700'}>
                {isOpenNow ? '🟢 We Are Currently OPEN' : '🔴 Currently Closed'}
              </span>
              <span className="text-[#574B45]/40">•</span>
              <span className="text-xs text-[#574B45]">Local Time: {currentTimeStr || '8:30 AM – 10:30 PM'}</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Weekly Hours Table Card */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="bg-[#FFFDF9] border border-[#E08A1E]/20 p-6 sm:p-8 rounded-3xl shadow-warm-md">
                
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#E08A1E]/15">
                  <div className="w-10 h-10 rounded-full bg-[#E08A1E]/15 flex items-center justify-center text-[#E08A1E]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#2B2420]">
                      Weekly Operational Schedule
                    </h3>
                    <p className="text-xs text-[#574B45]">Continuous service 7 days a week</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {HOURS_LIST.map((item, idx) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#FBF4E8] transition-colors border border-transparent hover:border-[#E08A1E]/15"
                    >
                      <span className="font-bold text-sm text-[#2B2420] flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#5C7A5E]" />
                        {item.day}
                      </span>
                      <span className="font-serif font-bold text-sm text-[#A6305E] bg-[#FBF4E8] px-3 py-1 rounded-full border border-[#E08A1E]/20">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </Reveal>
          </div>

          {/* Side Meal Callouts */}
          <div className="lg:col-span-5 space-y-6">
            
            <Reveal delay={150}>
              <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E08A1E]/20 shadow-warm-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E08A1E]/15 flex items-center justify-center text-[#E08A1E] shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2B2420]">
                    Pahadi Breakfast & Morning Chai
                  </h4>
                  <p className="font-devanagari text-xs text-[#A6305E] font-semibold mb-1">
                    सुबह का नाश्ता: 8:30 AM – 11:30 AM
                  </p>
                  <p className="text-xs text-[#574B45] leading-relaxed">
                    Enjoy freshly prepared stuffed parathas, eggs, granola bowls, and hot pots of ginger cardamom tea on our sunny deck.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E08A1E]/20 shadow-warm-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#A6305E]/15 flex items-center justify-center text-[#A6305E] shrink-0">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2B2420]">
                    Homestyle Lunch & Cozy Evening Dinner
                  </h4>
                  <p className="font-devanagari text-xs text-[#A6305E] font-semibold mb-1">
                    दोपहर और रात का खाना: 12:00 PM – 10:30 PM
                  </p>
                  <p className="text-xs text-[#574B45] leading-relaxed">
                    Savor Himachali thalis, butter paneer, fresh trout curry, and hot momos paired with stunning mountain twilight views.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}

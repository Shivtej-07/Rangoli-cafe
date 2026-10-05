import React, { useState } from 'react';
import { CAFE_INFO } from '../data/content';
import { Phone, Calendar, MessageCircle, X } from 'lucide-react';

export default function FloatingButtons({ onOpenReserveModal }) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <>
      {/* Floating WhatsApp Button (Bottom-Right) */}
      <div className="fixed bottom-20 sm:bottom-8 right-5 z-40 flex flex-col items-end">
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="bg-[#2B2420] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg mb-2 flex items-center gap-2 animate-bounce">
            <span>Book Table on WhatsApp 💬</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-white/60 hover:text-white"
              aria-label="Dismiss toolip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={CAFE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-warm-lg transform hover:scale-110 transition-all duration-300 group cursor-pointer"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        </a>
      </div>

      {/* Sticky Mobile Bar (Visible only on small screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E08A1E]/20 p-2.5 shadow-2xl flex items-center justify-between gap-2">
        <a
          href={`tel:${CAFE_INFO.phoneRaw}`}
          className="flex-1 bg-[#5C7A5E] hover:bg-[#4A644C] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>Call Cafe</span>
        </a>

        <button
          onClick={onOpenReserveModal}
          className="flex-1 bg-gradient-to-r from-[#E08A1E] to-[#A6305E] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
        >
          <Calendar className="w-4 h-4" />
          <span>Reserve Table</span>
        </button>
      </div>
    </>
  );
}

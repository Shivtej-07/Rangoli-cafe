import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/content';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Food', 'Vibe', 'Views', 'Drinks'];

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    activeTab === 'All' ? true : item.category === activeTab
  );

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-20 bg-[#FBF4E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A6305E] bg-[#A6305E]/10 px-3.5 py-1.5 rounded-full">
              Snapshots of Life at Rangoli
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Our Visual Gallery
            </h2>
            <div className="font-devanagari text-lg text-[#E08A1E] font-bold mb-3">
              हिमालयी दृश्यों और स्वादिष्ट पकवानों की झलकियाँ
            </div>
            <p className="text-base text-[#574B45]">
              Explore the warm cozy ambiance, sunny terrace mountain views, and handcrafted meals.
            </p>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#A6305E] text-white shadow-warm-sm scale-105'
                    : 'bg-[#FFFDF9] text-[#574B45] hover:bg-[#A6305E]/10 border border-[#E08A1E]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 50}>
              <div
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-[#FFFDF9] shadow-warm-sm hover:shadow-warm-lg transition-all duration-500 cursor-pointer h-72 border border-[#E08A1E]/20"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2420]/90 via-[#2B2420]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-bold text-[#E08A1E] uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif font-bold text-base leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#FBF4E8]/80 line-clamp-2">
                    {item.caption}
                  </p>

                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Image Box */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <img
              src={filteredGallery[lightboxIndex].url}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 mb-4"
            />
            
            <div className="text-center text-white max-w-xl">
              <span className="text-xs font-bold text-[#E08A1E] uppercase tracking-wider">
                {filteredGallery[lightboxIndex].category} • {lightboxIndex + 1} of {filteredGallery.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 mb-1">
                {filteredGallery[lightboxIndex].title}
              </h3>
              <p className="text-sm text-[#FBF4E8]/80 font-light">
                {filteredGallery[lightboxIndex].caption}
              </p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}

import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/content';
import { Coffee, Flame, Utensils, Sandwich, CupSoda, Search, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

const ICON_MAP = {
  Utensils: Utensils,
  Coffee: Coffee,
  Flame: Flame,
  Sandwich: Sandwich,
  CupSoda: CupSoda
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    
    // Dietary match
    const dietaryMatch =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'veg' && item.isVeg) ||
      (dietaryFilter === 'non-veg' && !item.isVeg);

    // Search query match
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiName.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && dietaryMatch && searchMatch;
  });

  return (
    <section id="menu" className="py-20 bg-[#FFFDF9] relative">
      
      {/* Decorative Rangoli Pattern Top Line */}
      <div className="h-1.5 bg-gradient-to-r from-[#E08A1E] via-[#A6305E] to-[#5C7A5E] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#E08A1E] bg-[#E08A1E]/10 px-3.5 py-1.5 rounded-full">
              Freshly Cooked Homestyle Delights
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Rangoli Menu Highlights
            </h2>
            <div className="font-devanagari text-xl text-[#A6305E] font-bold mb-4">
              हमारा व्यंजन सूची - शुद्ध, स्वादिष्ट एवं ताज़ा
            </div>
            <p className="text-base text-[#574B45]">
              Every dish is crafted with fresh Himalayan produce, organic local spices, and traditional recipes.
            </p>
          </div>
        </Reveal>

        {/* Filter Controls Bar */}
        <Reveal delay={100}>
          <div className="bg-[#FBF4E8] p-4 sm:p-6 rounded-3xl border border-[#E08A1E]/20 shadow-warm-sm mb-10">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#574B45]" />
                <input
                  type="text"
                  placeholder="Search dishes (e.g. Chai, Thali, Paratha)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#E08A1E]/30 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#2B2420] placeholder-[#574B45]/60 focus:outline-none focus:ring-2 focus:ring-[#E08A1E]"
                />
              </div>

              {/* Veg / Non-Veg Toggle Buttons */}
              <div className="flex items-center gap-2 bg-[#FFFDF9] p-1 rounded-full border border-[#E08A1E]/20 self-stretch sm:self-auto justify-center">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    dietaryFilter === 'all'
                      ? 'bg-[#2B2420] text-white shadow-sm'
                      : 'text-[#574B45] hover:text-[#2B2420]'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setDietaryFilter('veg')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    dietaryFilter === 'veg'
                      ? 'bg-[#5C7A5E] text-white shadow-sm'
                      : 'text-[#5C7A5E] hover:bg-[#5C7A5E]/10'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-green-600 flex items-center justify-center p-0.5">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  </span>
                  Pure Veg
                </button>
                <button
                  onClick={() => setDietaryFilter('non-veg')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    dietaryFilter === 'non-veg'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-amber-800 hover:bg-amber-800/10'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-amber-800 flex items-center justify-center p-0.5">
                    <span className="w-1.5 h-1.5 bg-amber-800 rounded-full" />
                  </span>
                  Non-Veg
                </button>
              </div>

            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon] || Utensils;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E08A1E] to-[#A6305E] text-white shadow-warm-sm scale-105'
                        : 'bg-[#FFFDF9] text-[#574B45] hover:bg-[#E08A1E]/10 border border-[#E08A1E]/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </Reveal>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-[#FBF4E8] rounded-3xl border border-dashed border-[#E08A1E]/30">
            <Utensils className="w-10 h-10 text-[#E08A1E] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#2B2420]">No matching dishes found</h3>
            <p className="text-sm text-[#574B45] mt-1">Try adjusting your search query or filter selection.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setDietaryFilter('all'); }}
              className="mt-4 text-xs font-bold text-[#A6305E] underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 50}>
                <div className="bg-[#FBF4E8] hover:bg-[#F5EADA] p-6 rounded-2xl border border-[#E08A1E]/20 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 h-full flex flex-col justify-between group">
                  
                  <div>
                    {/* Item Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {/* Veg/Non-Veg Dot Icon */}
                        <span
                          className={`w-4 h-4 border flex items-center justify-center p-0.5 rounded-sm ${
                            item.isVeg ? 'border-green-600' : 'border-amber-800'
                          }`}
                          title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isVeg ? 'bg-green-600' : 'bg-amber-800'
                            }`}
                          />
                        </span>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B2420] group-hover:text-[#A6305E] transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      {/* Price Badge */}
                      <span className="font-serif font-extrabold text-lg sm:text-xl text-[#E08A1E] whitespace-nowrap bg-[#FFFDF9] px-3 py-1 rounded-full border border-[#E08A1E]/30 shadow-xs">
                        {item.price}
                      </span>
                    </div>

                    {/* Hindi Name */}
                    <div className="font-devanagari text-xs text-[#A6305E] font-semibold mb-2 ml-6">
                      {item.hindiName}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#574B45] leading-relaxed mb-4 ml-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Badges Footer */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E08A1E]/15 ml-6">
                    {item.isPopular && (
                      <span className="bg-[#E08A1E]/15 text-[#E08A1E] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Guest Favorite
                      </span>
                    )}
                    {item.isChefSpecial && (
                      <span className="bg-[#A6305E]/15 text-[#A6305E] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Heart className="w-3 h-3" /> Chef's Special
                      </span>
                    )}
                    {item.isVegan && (
                      <span className="bg-[#5C7A5E]/15 text-[#5C7A5E] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Vegan Option
                      </span>
                    )}
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Note to Ask in Person */}
        <Reveal delay={200}>
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-[#E08A1E]/10 via-[#A6305E]/10 to-[#5C7A5E]/10 rounded-3xl border border-[#E08A1E]/30 max-w-3xl mx-auto shadow-sm">
            <h4 className="font-serif text-lg font-bold text-[#2B2420] mb-1">
              📜 Looking for Daily Seasonal Specials?
            </h4>
            <p className="text-sm text-[#574B45] leading-relaxed">
              Our menu evolves with fresh mountain harvests! Please ask our warm hostesses in person for today's freshly prepared Himachali herbal teas, seasonal soups, and traditional specials.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

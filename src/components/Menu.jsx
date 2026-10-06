import React, { useState, useEffect } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/content';
import { 
  Coffee, Flame, Utensils, Sandwich, CupSoda, Search, 
  Sparkles, Heart, CheckCircle2, Edit3, Plus, Trash2, 
  Save, RotateCcw, Check, X, ShieldAlert, Lock, Unlock, KeyRound 
} from 'lucide-react';
import Reveal from './Reveal';

const ICON_MAP = {
  Utensils: Utensils,
  Coffee: Coffee,
  Flame: Flame,
  Sandwich: Sandwich,
  CupSoda: CupSoda
};

const LOCAL_STORAGE_KEY = 'rangoli_cafe_custom_menu';
const OWNER_PIN_CODE = '1234';

export default function Menu() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  
  // Owner Authentication State
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(() => {
    return sessionStorage.getItem('rangoli_owner_auth') === 'true';
  });

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Owner Edit Mode State (Only active when authenticated)
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form for New Item
  const [newItem, setNewItem] = useState({
    name: '',
    hindiName: '',
    price: '₹150',
    category: 'mains',
    description: '',
    isVeg: true,
    isPopular: false,
    isChefSpecial: false
  });

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === OWNER_PIN_CODE) {
      setIsOwnerAuthenticated(true);
      sessionStorage.setItem('rangoli_owner_auth', 'true');
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
      setIsEditMode(true);
      triggerToast('Welcome Owner! Menu editing unlocked.');
    } else {
      setPinError('Incorrect Owner PIN code. Please try again.');
    }
  };

  const handleOwnerLogout = () => {
    setIsOwnerAuthenticated(false);
    setIsEditMode(false);
    sessionStorage.removeItem('rangoli_owner_auth');
    triggerToast('Logged out of Owner Mode.');
  };

  // Save items to localStorage whenever items state changes
  const handleSaveToLocalStorage = (updatedItems) => {
    setItems(updatedItems);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
      triggerToast('Menu successfully updated & saved!');
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  };

  const handleResetDefaultMenu = () => {
    if (window.confirm("Are you sure you want to reset the menu back to original default items?")) {
      setItems(MENU_ITEMS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      triggerToast('Menu reset to original defaults!');
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Start Editing Item
  const startEdit = (item) => {
    setEditingItemId(item.id);
    setEditFormData({ ...item });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditFormData({});
  };

  const saveEdit = (id) => {
    const updated = items.map((itm) => (itm.id === id ? editFormData : itm));
    handleSaveToLocalStorage(updated);
    setEditingItemId(null);
  };

  const handleDeleteItem = (id, name) => {
    if (window.confirm(`Delete "${name}" from the menu?`)) {
      const updated = items.filter((itm) => itm.id !== id);
      handleSaveToLocalStorage(updated);
    }
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      alert("Please enter dish name and price!");
      return;
    }
    const itemToAdd = {
      ...newItem,
      id: 'custom_' + Date.now()
    };
    const updated = [itemToAdd, ...items];
    handleSaveToLocalStorage(updated);
    setShowAddModal(false);
    setNewItem({
      name: '',
      hindiName: '',
      price: '₹150',
      category: 'mains',
      description: '',
      isVeg: true,
      isPopular: false,
      isChefSpecial: false
    });
  };

  const filteredItems = items.filter((item) => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const dietaryMatch =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'veg' && item.isVeg) ||
      (dietaryFilter === 'non-veg' && !item.isVeg);
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hindiName && item.hindiName.includes(searchQuery)) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && dietaryMatch && searchMatch;
  });

  return (
    <section id="menu" className="py-20 bg-[#FFFDF9] relative">
      
      {/* Toast Banner Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2B2420] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#E08A1E] flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Decorative Rangoli Pattern Top Line */}
      <div className="h-1.5 bg-gradient-to-r from-[#E08A1E] via-[#A6305E] to-[#5C7A5E] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#E08A1E] bg-[#E08A1E]/10 px-3.5 py-1.5 rounded-full">
                Freshly Cooked Homestyle Delights
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Rangoli Menu Highlights
            </h2>
            
            <div className="font-devanagari text-xl text-[#A6305E] font-bold mb-4">
              हमारा व्यंजन सूची - शुद्ध, स्वादिष्ट एवं ताज़ा
            </div>
            
            <p className="text-base text-[#574B45] mb-6">
              Every dish is crafted with fresh Himalayan produce, organic local spices, and traditional recipes.
            </p>

            {/* OWNER ACCESS CONTROLS (Only visible/active for owner) */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-[#FBF4E8] border border-[#E08A1E]/30 p-2 sm:p-3 rounded-2xl shadow-warm-sm">
              {!isOwnerAuthenticated ? (
                /* DISCRETE OWNER LOCK BUTTON */
                <button
                  onClick={() => setShowPinModal(true)}
                  className="flex items-center gap-2 text-xs font-bold text-[#574B45] hover:text-[#A6305E] bg-[#FFFDF9] px-4 py-2 rounded-xl border border-gray-300 hover:border-[#A6305E] transition-all cursor-pointer shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E08A1E]" />
                  <span>🔒 Owner Login</span>
                </button>
              ) : (
                /* UNLOCKED OWNER PANEL */
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300">
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Owner Logged In</span>
                  </div>

                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isEditMode
                        ? 'bg-[#A6305E] text-white shadow-sm'
                        : 'bg-[#FFFDF9] text-[#2B2420] border border-[#E08A1E]/30'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditMode ? 'Editing Active' : 'Enable Editing'}</span>
                  </button>

                  {isEditMode && (
                    <>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-1 text-xs font-bold bg-[#5C7A5E] text-white px-3 py-1.5 rounded-xl hover:bg-[#4a634c] transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Dish</span>
                      </button>

                      <button
                        onClick={handleResetDefaultMenu}
                        className="flex items-center gap-1 text-xs font-bold text-[#574B45] hover:text-[#A6305E] bg-[#FFFDF9] px-2.5 py-1.5 rounded-xl border border-gray-300 transition-all cursor-pointer"
                        title="Reset Menu"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={handleOwnerLogout}
                    className="text-xs font-bold text-gray-500 hover:text-red-600 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

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
            {filteredItems.map((item, idx) => {
              const isEditing = isOwnerAuthenticated && isEditMode && editingItemId === item.id;

              return (
                <Reveal key={item.id} delay={idx * 40}>
                  <div className={`bg-[#FBF4E8] hover:bg-[#F5EADA] p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-between group relative ${
                    isEditing ? 'ring-2 ring-[#A6305E] border-transparent bg-amber-50/90' : 'border-[#E08A1E]/20 shadow-warm-sm hover:shadow-warm-md'
                  }`}>
                    
                    {/* OWNER EDITING FORM FOR ITEM (ONLY VISIBLE IF OWNER IS LOGGED IN & EDITING ACTIVE) */}
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E08A1E]/20">
                          <span className="text-xs font-bold text-[#A6305E] uppercase tracking-wider">Editing Dish</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="bg-emerald-600 text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 cursor-pointer"
                              title="Save Changes"
                            >
                              <Save className="w-4 h-4" /> Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-400 text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-gray-500 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" /> Cancel
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#2B2420]">Dish Name (English):</label>
                          <input
                            type="text"
                            value={editFormData.name || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            className="w-full bg-[#FFFDF9] border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-bold text-[#2B2420]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-bold text-[#2B2420]">Hindi Name:</label>
                            <input
                              type="text"
                              value={editFormData.hindiName || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, hindiName: e.target.value })}
                              className="w-full bg-[#FFFDF9] border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-[#A6305E] font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#2B2420]">Price (₹):</label>
                            <input
                              type="text"
                              value={editFormData.price || ''}
                              onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                              className="w-full bg-[#FFFDF9] border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-extrabold text-[#E08A1E]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#2B2420]">Description:</label>
                          <textarea
                            rows={2}
                            value={editFormData.description || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                            className="w-full bg-[#FFFDF9] border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-[#574B45]"
                          />
                        </div>

                        <div className="flex items-center gap-4 text-xs font-bold">
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editFormData.isVeg}
                              onChange={(e) => setEditFormData({ ...editFormData, isVeg: e.target.checked })}
                            />
                            <span>Vegetarian</span>
                          </label>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editFormData.isPopular}
                              onChange={(e) => setEditFormData({ ...editFormData, isPopular: e.target.checked })}
                            />
                            <span>Guest Favorite</span>
                          </label>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editFormData.isChefSpecial}
                              onChange={(e) => setEditFormData({ ...editFormData, isChefSpecial: e.target.checked })}
                            />
                            <span>Chef Special</span>
                          </label>
                        </div>
                      </div>
                    ) : (
                      /* DISPLAY NORMAL DISH CARD FOR CUSTOMERS */
                      <>
                        <div>
                          {/* Item Header */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 border flex items-center justify-center p-0.5 rounded-sm shrink-0 ${
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

                            <div className="flex items-center gap-2">
                              {/* Price Badge */}
                              <span className="font-serif font-extrabold text-lg sm:text-xl text-[#E08A1E] whitespace-nowrap bg-[#FFFDF9] px-3 py-1 rounded-full border border-[#E08A1E]/30 shadow-xs">
                                {item.price}
                              </span>

                              {/* Owner Edit Action Icons (ONLY VISIBLE WHEN OWNER IS LOGGED IN & EDIT MODE IS ON) */}
                              {isOwnerAuthenticated && isEditMode && (
                                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
                                  <button
                                    onClick={() => startEdit(item)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                    title="Edit Item"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id, item.name)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                    title="Delete Item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
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
                      </>
                    )}

                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Note to Ask in Person */}
        <Reveal delay={200}>
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-[#E08A1E]/10 via-[#A6305E]/10 to-[#5C7A5E]/10 rounded-3xl border border-[#E08A1E]/30 max-w-3xl mx-auto shadow-sm">
            <h4 className="font-serif text-lg font-bold text-[#2B2420] mb-1">
              📜 Looking for Daily Seasonal Specials?
            </h4>
            <p className="text-sm text-[#574B45] leading-relaxed">
              Our menu evolves with fresh mountain harvests! Please ask our warm mountain hosts in person for today's freshly prepared Himachali herbal teas, seasonal soups, and traditional specials.
            </p>
          </div>
        </Reveal>

      </div>

      {/* OWNER PIN CODE LOGIN MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E08A1E]/40 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#E08A1E]/20 mb-4">
              <div className="flex items-center gap-2 text-[#2B2420] font-bold font-serif text-lg">
                <KeyRound className="w-5 h-5 text-[#E08A1E]" />
                <span>Owner Authentication</span>
              </div>
              <button
                onClick={() => { setShowPinModal(false); setPinError(''); }}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#574B45] mb-4">
              Please enter your 4-digit Owner Security PIN to unlock menu editing and staff management. (Default PIN: <strong className="text-[#A6305E]">1234</strong>)
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter Owner PIN (1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-[#FBF4E8] border border-gray-300 focus:border-[#E08A1E] rounded-xl px-4 py-3 text-center text-lg font-extrabold tracking-widest text-[#2B2420]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs font-bold text-red-600 mt-2 text-center">{pinError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#A6305E] hover:bg-[#8B234D] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md cursor-pointer"
                >
                  Unlock Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW DISH MODAL (ONLY FOR AUTHORIZED OWNER) */}
      {showAddModal && isOwnerAuthenticated && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E08A1E]/30 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#E08A1E]/20 mb-4">
              <h3 className="font-serif font-bold text-lg text-[#2B2420]">Add New Dish to Self Menu</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-black p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">Dish Name (English)*:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pahadi Siddu with Ghee"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B2420] block mb-1">Hindi Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. सिड्डू घी के साथ"
                    value={newItem.hindiName}
                    onChange={(e) => setNewItem({ ...newItem, hindiName: e.target.value })}
                    className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#A6305E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2B2420] block mb-1">Price (e.g. ₹180)*:</label>
                  <input
                    type="text"
                    required
                    placeholder="₹180"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#E08A1E] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">Category:</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                >
                  <option value="breakfast">Breakfast & Chai</option>
                  <option value="mains">Homestyle Mains</option>
                  <option value="cafe">Cafe & Snacks</option>
                  <option value="drinks">Beverages & Desserts</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">Description:</label>
                <textarea
                  rows={2}
                  placeholder="Ingredients and special taste notes..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#574B45]"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-bold pt-1">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isVeg}
                    onChange={(e) => setNewItem({ ...newItem, isVeg: e.target.checked })}
                  />
                  <span>Pure Veg</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isPopular}
                    onChange={(e) => setNewItem({ ...newItem, isPopular: e.target.checked })}
                  />
                  <span>Popular</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isChefSpecial}
                    onChange={(e) => setNewItem({ ...newItem, isChefSpecial: e.target.checked })}
                  />
                  <span>Special</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#A6305E] hover:bg-[#8B234D] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all"
                >
                  Add Dish to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}

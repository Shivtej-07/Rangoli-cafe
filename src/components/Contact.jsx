import React, { useState } from 'react';
import { CAFE_INFO } from '../data/content';
import { Phone, MapPin, Send, CheckCircle2, Calendar, Users, MessageSquare, Clock, Heart } from 'lucide-react';
import Reveal from './Reveal';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Contact({ isModalMode = false, onCloseModal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '12:30 PM',
    guests: '2 Guests',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone or WhatsApp number.';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '12:30 PM',
      guests: '2 Guests',
      message: ''
    });
  };

  const content = (
    <div className={`${isModalMode ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
      
      {!isModalMode && (
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A6305E] bg-[#A6305E]/10 px-3.5 py-1.5 rounded-full">
              We Can't Wait to Host You
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Reserve a Table & Enquiries
            </h2>
            <div className="font-devanagari text-lg text-[#E08A1E] font-bold mb-4">
              टेबल बुक करें — आपका स्वागत है!
            </div>
            <p className="text-base text-[#574B45]">
              Planning a visit with family or friends? Book your mountain terrace table in advance.
            </p>
          </div>
        </Reveal>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form Box */}
        <div className={isModalMode ? 'col-span-12' : 'lg:col-span-7'}>
          <Reveal delay={100}>
            <div className="bg-[#FFFDF9] border border-[#E08A1E]/20 p-6 sm:p-8 rounded-3xl shadow-warm-md relative">
              
              {submitted ? (
                <div className="text-center py-8 px-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#2B2420] mb-2">
                    Table Reservation Request Sent!
                  </h3>
                  <div className="font-devanagari text-base text-[#A6305E] font-bold mb-3">
                    धन्यवाद! हम आपसे शीघ्र ही संपर्क करेंगे।
                  </div>
                  <p className="text-sm text-[#574B45] max-w-md mx-auto mb-6">
                    Thank you, <strong>{formData.name}</strong>! We have received your booking request for <strong>{formData.guests}</strong> on <strong>{formData.date || 'today'}</strong>. Our team will contact you shortly on <strong>{formData.phone}</strong>.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/919805616406?text=Hi%20Rangoli%20Cafe!%20My%20name%20is%20${encodeURIComponent(formData.name)}.%20I%20just%20sent%20a%20reservation%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2"
                    >
                      <span>Confirm Faster via WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={resetForm}
                      className="bg-[#FBF4E8] text-[#2B2420] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full border border-[#E08A1E]/30 hover:bg-[#E08A1E]/10"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#E08A1E]/15 pb-4 mb-2">
                    <h3 className="font-serif font-bold text-xl text-[#2B2420]">
                      {isModalMode ? 'Reserve a Table at Rangoli' : 'Table Reservation & Inquiry'}
                    </h3>
                    <p className="text-xs text-[#574B45]">Fill in details below for quick booking confirmation.</p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2420] uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-[#FBF4E8] border ${
                          errors.name ? 'border-red-500' : 'border-[#E08A1E]/30'
                        } rounded-xl px-4 py-2.5 text-sm text-[#2B2420] focus:outline-none focus:ring-2 focus:ring-[#E08A1E]`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2420] uppercase tracking-wider mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98056 16406"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full bg-[#FBF4E8] border ${
                          errors.phone ? 'border-red-500' : 'border-[#E08A1E]/30'
                        } rounded-xl px-4 py-2.5 text-sm text-[#2B2420] focus:outline-none focus:ring-2 focus:ring-[#E08A1E]`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Date, Time & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2420] uppercase tracking-wider mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#FBF4E8] border border-[#E08A1E]/30 rounded-xl px-3 py-2.5 text-sm text-[#2B2420] focus:outline-none focus:ring-2 focus:ring-[#E08A1E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2420] uppercase tracking-wider mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#FBF4E8] border border-[#E08A1E]/30 rounded-xl px-3 py-2.5 text-sm text-[#2B2420] focus:outline-none focus:ring-2 focus:ring-[#E08A1E]"
                      >
                        <option>9:00 AM (Breakfast)</option>
                        <option>10:30 AM (Chai & Brunch)</option>
                        <option>1:00 PM (Lunch)</option>
                        <option>3:30 PM (Afternoon Tea)</option>
                        <option>7:00 PM (Dinner)</option>
                        <option>8:30 PM (Dinner)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2B2420] uppercase tracking-wider mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-[#FBF4E8] border border-[#E08A1E]/30 rounded-xl px-3 py-2.5 text-sm text-[#2B2420] focus:outline-none focus:ring-2 focus:ring-[#E08A1E]"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3-4 Guests</option>
                        <option>5-8 Guests</option>
                        <option>Large Group (8+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-[#2B2420] uppercase tracking-wider mb-1">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="High chair needed, terrace seating preference, dietary requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FBF4E8] border border-[#E08A1E]/30 rounded-xl px-4 py-2.5 text-sm text-[#2B2420] focus:outline-none focus:ring-2 focus:ring-[#E08A1E]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#E08A1E] to-[#A6305E] hover:from-[#C6740E] hover:to-[#8B234D] text-white font-bold text-base py-3.5 rounded-full shadow-warm-md hover:shadow-warm-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Table Booking Request</span>
                  </button>

                  <p className="text-[11px] text-[#574B45] text-center italic">
                    🔒 No advance payment required. We will hold your table for up to 15 minutes after reserved time.
                  </p>
                </form>
              )}

            </div>
          </Reveal>
        </div>

        {/* Right Side Direct Info */}
        {!isModalMode && (
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={150}>
              <div className="bg-[#FFFDF9] border border-[#E08A1E]/20 p-6 sm:p-8 rounded-3xl shadow-warm-sm">
                
                <h3 className="font-serif font-bold text-xl text-[#2B2420] mb-4">
                  Direct Contact Information
                </h3>

                <div className="space-y-4 text-sm">
                  
                  {/* Phone */}
                  <a
                    href={`tel:${CAFE_INFO.phoneRaw}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#FBF4E8] border border-[#E08A1E]/15 hover:border-[#E08A1E] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#E08A1E] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#574B45] font-semibold">Direct Phone & WhatsApp</div>
                      <div className="font-bold text-[#2B2420] text-base group-hover:text-[#A6305E] transition-colors">
                        +91 98056 16406
                      </div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={CAFE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#FBF4E8] border border-[#E08A1E]/15 hover:border-[#A6305E] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#A6305E] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#574B45] font-semibold">Follow Our Mountain Stories</div>
                      <div className="font-bold text-[#2B2420] text-base group-hover:text-[#A6305E] transition-colors">
                        {CAFE_INFO.instagram}
                      </div>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF4E8] border border-[#E08A1E]/15">
                    <div className="w-10 h-10 rounded-xl bg-[#5C7A5E] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#574B45] font-semibold">Visit Us In Person</div>
                      <div className="font-bold text-[#2B2420] text-sm leading-snug">
                        Opposite Yogashala, Jogni Waterfall Rd, Vashist, Himachal Pradesh 175103
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </Reveal>
          </div>
        )}

      </div>
    </div>
  );

  if (isModalMode) {
    return content;
  }

  return (
    <section id="contact" className="py-20 bg-[#FBF4E8] relative">
      {content}
    </section>
  );
}

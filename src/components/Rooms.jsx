import React, { useState } from 'react';
import { ROOM_ITEMS, INITIAL_STAFF_WAGES, CAFE_INFO } from '../data/content';
import { 
  Home, Calendar, DollarSign, Wifi, Sun, ShieldCheck, 
  Users, Plus, Trash2, CheckCircle2, Phone, MessageSquare, 
  ChevronRight, Sparkles, UserCheck, Clock, Calculator, Lock, KeyRound, X,
  Check, Edit3, RotateCcw
} from 'lucide-react';
import Reveal from './Reveal';

const ROOMS_LOCAL_KEY = 'rangoli_cafe_rooms_status_v2';
const STAFF_LOCAL_KEY = 'rangoli_cafe_staff_wages_data';
const OWNER_PIN_CODE = '1234';

export default function Rooms() {
  const [stayPricingType, setStayPricingType] = useState('monthly'); // 'monthly' | 'daily'
  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms' | 'wages'

  // Rooms State (Persisted in localStorage)
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem(ROOMS_LOCAL_KEY);
      return saved ? JSON.parse(saved) : ROOM_ITEMS;
    } catch {
      return ROOM_ITEMS;
    }
  });

  // Owner Authentication State
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(() => {
    return sessionStorage.getItem('rangoli_owner_auth') === 'true';
  });

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Booking Modal State for Visitors
  const [bookingRoom, setBookingRoom] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    guestName: '',
    phone: '',
    checkInDate: new Date().toISOString().split('T')[0],
    duration: 'monthly'
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');

  // Staff Wages State (Persisted in localStorage)
  const [staffList, setStaffList] = useState(() => {
    try {
      const saved = localStorage.getItem(STAFF_LOCAL_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STAFF_WAGES;
    } catch {
      return INITIAL_STAFF_WAGES;
    }
  });

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Helper',
    dailyRate: 500,
    monthlyBase: 12000,
    daysWorkedThisMonth: 25,
    roomProvided: true
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const saveRoomsToStorage = (updatedRooms) => {
    setRooms(updatedRooms);
    try {
      localStorage.setItem(ROOMS_LOCAL_KEY, JSON.stringify(updatedRooms));
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'wages' && !isOwnerAuthenticated) {
      setShowPinModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === OWNER_PIN_CODE) {
      setIsOwnerAuthenticated(true);
      sessionStorage.setItem('rangoli_owner_auth', 'true');
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
      setActiveTab('wages');
      triggerToast('Owner Access Granted!');
    } else {
      setPinError('Incorrect PIN code. Only cafe owner can access staff wages.');
    }
  };

  // GUEST ROOM BOOKING CONFIRMATION
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.guestName || !bookingForm.phone) {
      alert("Please enter your name and contact phone number!");
      return;
    }

    const updatedRooms = rooms.map((rm) => {
      if (rm.id === bookingRoom.id) {
        return {
          ...rm,
          isBooked: true,
          bookedBy: bookingForm.guestName,
          bookedPhone: bookingForm.phone,
          checkInDate: bookingForm.checkInDate,
          stayType: bookingForm.duration === 'monthly' ? 'Monthly Stay' : 'Daily Stay'
        };
      }
      return rm;
    });

    saveRoomsToStorage(updatedRooms);
    triggerToast(`🎉 Room "${bookingRoom.title}" successfully booked for ${bookingForm.guestName}!`);

    // WhatsApp Notification Link
    const waMsg = `Hello Rangoli Cafe! I have booked the ${bookingRoom.title} (${bookingForm.duration.toUpperCase()}) on your website.%0A%0A*Guest:* ${encodeURIComponent(bookingForm.guestName)}%0A*Phone:* ${encodeURIComponent(bookingForm.phone)}%0A*Check-in Date:* ${bookingForm.checkInDate}`;
    window.open(`https://wa.me/919805616406?text=${waMsg}`, '_blank');

    setBookingRoom(null);
    setBookingForm({
      guestName: '',
      phone: '',
      checkInDate: new Date().toISOString().split('T')[0],
      duration: 'monthly'
    });
  };

  // OWNER TOGGLE ROOM STATUS (BOOKED / AVAILABLE)
  const handleOwnerToggleRoomStatus = (roomId) => {
    const updated = rooms.map((rm) => {
      if (rm.id === roomId) {
        const nextState = !rm.isBooked;
        return {
          ...rm,
          isBooked: nextState,
          bookedBy: nextState ? (rm.bookedBy || 'Reserved Guest') : '',
          checkInDate: nextState ? (rm.checkInDate || 'Active') : ''
        };
      }
      return rm;
    });
    saveRoomsToStorage(updated);
    triggerToast('Room status updated by Owner!');
  };

  // OWNER RESET ALL ROOMS TO AVAILABLE
  const handleResetRooms = () => {
    if (window.confirm("Reset all rooms back to Available?")) {
      const reset = rooms.map((rm) => ({ ...rm, isBooked: false, bookedBy: '', checkInDate: '' }));
      saveRoomsToStorage(reset);
      triggerToast('All rooms reset to Available!');
    }
  };

  // STAFF WAGE LOGIC
  const saveStaffToStorage = (updatedList) => {
    setStaffList(updatedList);
    try {
      localStorage.setItem(STAFF_LOCAL_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDaysChange = (id, newDays) => {
    const updated = staffList.map((stf) =>
      stf.id === id ? { ...stf, daysWorkedThisMonth: Math.max(0, parseInt(newDays) || 0) } : stf
    );
    saveStaffToStorage(updated);
  };

  const handleRateChange = (id, newRate) => {
    const updated = staffList.map((stf) =>
      stf.id === id ? { ...stf, dailyRate: Math.max(0, parseInt(newRate) || 0) } : stf
    );
    saveStaffToStorage(updated);
  };

  const handleDeleteStaff = (id, name) => {
    if (window.confirm(`Remove staff record for ${name}?`)) {
      const updated = staffList.filter((stf) => stf.id !== id);
      saveStaffToStorage(updated);
    }
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.name) return;
    const item = {
      ...newStaff,
      id: Date.now(),
      dailyRate: Number(newStaff.dailyRate),
      daysWorkedThisMonth: Number(newStaff.daysWorkedThisMonth)
    };
    const updated = [...staffList, item];
    saveStaffToStorage(updated);
    setShowAddStaffModal(false);
    setNewStaff({
      name: '',
      role: 'Helper',
      dailyRate: 500,
      monthlyBase: 12000,
      daysWorkedThisMonth: 25,
      roomProvided: true
    });
  };

  const totalMonthlyPayroll = staffList.reduce(
    (acc, stf) => acc + (stf.dailyRate * stf.daysWorkedThisMonth),
    0
  );

  return (
    <section id="rooms" className="py-20 bg-[#FBF4E8] relative overflow-hidden">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2B2420] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#5C7A5E] flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Background Subtle Accent Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E08A1E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A6305E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C7A5E] bg-[#5C7A5E]/10 px-3.5 py-1.5 rounded-full mb-3">
              <Home className="w-4 h-4" />
              <span>Mountain Rooms & Accommodation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mb-3">
              Rooms For Stay (Monthly & Daily)
            </h2>

            <div className="font-devanagari text-xl text-[#A6305E] font-bold mb-4">
              मासिक एवं दैनिक कमरे - रंगोली स्टे
            </div>

            <p className="text-base text-[#574B45]">
              We offer cozy, fully-furnished mountain view rooms for monthly stays and daily rates with high-speed Wi-Fi and hot shower.
            </p>

            {/* TAB SELECTOR & OWNER CONTROLS */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => handleTabChange('rooms')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'rooms'
                    ? 'bg-gradient-to-r from-[#E08A1E] to-[#A6305E] text-white shadow-warm-md scale-105'
                    : 'bg-[#FFFDF9] text-[#574B45] hover:bg-[#E08A1E]/10 border border-[#E08A1E]/20'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>🏠 Rooms & Lodging (Monthly / Daily)</span>
              </button>

              {/* STAFF WAGES TAB (PROTECTED BEHIND OWNER PIN) */}
              <button
                onClick={() => handleTabChange('wages')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'wages'
                    ? 'bg-gradient-to-r from-[#5C7A5E] to-[#2B2420] text-white shadow-warm-md scale-105'
                    : 'bg-[#FFFDF9] text-[#574B45] hover:bg-[#5C7A5E]/10 border border-[#5C7A5E]/20'
                }`}
              >
                {isOwnerAuthenticated ? <Calculator className="w-4 h-4" /> : <Lock className="w-4 h-4 text-[#E08A1E]" />}
                <span>💼 Staff Daily Wages {isOwnerAuthenticated ? '' : '(Owner Only)'}</span>
              </button>

              {/* OWNER ROOM MANAGEMENT BUTTONS */}
              {isOwnerAuthenticated && activeTab === 'rooms' && (
                <button
                  onClick={handleResetRooms}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#574B45] hover:text-[#A6305E] bg-[#FFFDF9] px-3.5 py-2 rounded-full border border-gray-300 transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Rooms to Available</span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* TAB 1: ROOMS & LODGING */}
        {activeTab === 'rooms' && (
          <div>
            {/* PRICING TOGGLE: Monthly vs Daily */}
            <Reveal delay={100}>
              <div className="flex items-center justify-center gap-3 mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2B2420]">Select Stay Duration Rate:</span>
                <div className="bg-[#FFFDF9] p-1 rounded-full border border-[#E08A1E]/30 inline-flex shadow-xs">
                  <button
                    onClick={() => setStayPricingType('monthly')}
                    className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      stayPricingType === 'monthly'
                        ? 'bg-[#A6305E] text-white shadow-sm'
                        : 'text-[#574B45] hover:text-[#A6305E]'
                    }`}
                  >
                    📅 Monthly Room Stay Rate (महीने का दर)
                  </button>
                  <button
                    onClick={() => setStayPricingType('daily')}
                    className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      stayPricingType === 'daily'
                        ? 'bg-[#E08A1E] text-white shadow-sm'
                        : 'text-[#574B45] hover:text-[#E08A1E]'
                    }`}
                  >
                    ☀️ Daily Room Rate (दैनिक किराया)
                  </button>
                </div>
              </div>
            </Reveal>

            {/* ROOM CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rooms.map((room, idx) => {
                const isBooked = !!room.isBooked;

                return (
                  <Reveal key={room.id} delay={idx * 100}>
                    <div className={`bg-[#FFFDF9] rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between group relative ${
                      isBooked
                        ? 'border-red-300 shadow-md bg-red-50/30'
                        : 'border-[#E08A1E]/20 shadow-warm-md hover:shadow-warm-lg'
                    }`}>
                      <div>
                        {/* Room Image Container */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={room.image}
                            alt={room.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              isBooked ? 'grayscale-[40%] group-hover:scale-100' : 'group-hover:scale-105'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          
                          {/* Price Badge */}
                          <div className="absolute top-4 right-4 bg-[#2B2420]/90 backdrop-blur-md text-amber-300 font-extrabold px-3.5 py-1.5 rounded-full text-sm border border-amber-300/40 shadow-lg">
                            {stayPricingType === 'monthly' ? room.monthlyPrice : room.dailyPrice}
                          </div>

                          {/* BOOKED VS POPULAR BADGE */}
                          {isBooked ? (
                            <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-white" />
                              <span>🔴 BOOKED / OCCUPIED</span>
                            </div>
                          ) : (
                            room.isPopular && (
                              <div className="absolute top-4 left-4 bg-[#A6305E] text-white font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Available & Popular
                              </div>
                            )
                          )}

                          <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-200 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                              {room.type}
                            </span>
                            {isBooked && room.bookedBy && (
                              <span className="text-[11px] font-bold text-red-200 bg-red-950/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                                Guest: {room.bookedBy}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Room Content */}
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-serif text-xl font-bold text-[#2B2420] group-hover:text-[#A6305E] transition-colors">
                              {room.title}
                            </h3>
                            {isBooked && (
                              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                Occupied
                              </span>
                            )}
                          </div>

                          <div className="font-devanagari text-xs text-[#A6305E] font-semibold mb-3">
                            {room.hindiTitle}
                          </div>

                          <p className="text-xs text-[#574B45] leading-relaxed mb-6">
                            {room.description}
                          </p>

                          {/* Room Amenities Features */}
                          <div className="space-y-2 mb-6 pt-4 border-t border-[#E08A1E]/15">
                            <span className="text-xs font-bold uppercase text-[#2B2420] block mb-2">Room Features:</span>
                            {room.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2 text-xs text-[#574B45]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#5C7A5E] shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Room Action Section */}
                      <div className="p-6 pt-0 space-y-2">
                        {isBooked ? (
                          /* IF ROOM IS BOOKED */
                          <div className="space-y-2">
                            <div className="w-full bg-red-100 border border-red-300 text-red-800 font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2">
                              <Lock className="w-4 h-4 text-red-600" />
                              <span>Room is Currently Booked</span>
                            </div>

                            <a
                              href={`https://wa.me/919805616406?text=Hello%20Rangoli%20Cafe!%20I%20saw%20that%20the%20${encodeURIComponent(room.title)}%20is%20currently%20booked.%20When%20will%20it%20be%20available%20next?`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-[#FFFDF9] hover:bg-amber-50 text-[#2B2420] border border-[#E08A1E]/40 font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#E08A1E]" />
                              <span>Inquire Future Availability</span>
                            </a>
                          </div>
                        ) : (
                          /* IF ROOM IS AVAILABLE FOR BOOKING */
                          <button
                            onClick={() => {
                              setBookingRoom(room);
                              setBookingForm({
                                ...bookingForm,
                                duration: stayPricingType
                              });
                            }}
                            className="w-full bg-[#E08A1E] hover:bg-[#C6740E] text-white font-bold text-xs py-3.5 rounded-2xl shadow-warm-sm hover:shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Book This Room ({stayPricingType === 'monthly' ? 'Monthly Stay' : 'Daily Stay'})</span>
                          </button>
                        )}

                        {/* OWNER TOGGLE ROOM AVAILABILITY CONTROL */}
                        {isOwnerAuthenticated && (
                          <div className="pt-2 border-t border-gray-200">
                            <button
                              onClick={() => handleOwnerToggleRoomStatus(room.id)}
                              className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isBooked
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                  : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isBooked ? 'Owner: Mark as Available' : 'Owner: Mark as Booked'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Extra Room Lodging Banner */}
            <Reveal delay={200}>
              <div className="mt-12 p-6 bg-[#FFFDF9] rounded-3xl border border-[#E08A1E]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E08A1E]/15 flex items-center justify-center text-[#E08A1E] shrink-0">
                    <Sun className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#2B2420]">
                      Looking for Workation & Long Month Stay Discounts?
                    </h4>
                    <p className="text-xs text-[#574B45] mt-0.5">
                      All room guests enjoy 15% discount on Rangoli Cafe meals, high-speed fiber internet, and 24x7 power backup.
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${CAFE_INFO.phoneRaw}`}
                  className="bg-[#2B2420] text-white hover:bg-[#A6305E] px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#E08A1E]" />
                  <span>Call Owner (+91 98056 16406)</span>
                </a>
              </div>
            </Reveal>
          </div>
        )}

        {/* TAB 2: STAFF & DAILY WAGES MANAGEMENT (ACCESSIBLE ONLY TO OWNER) */}
        {activeTab === 'wages' && isOwnerAuthenticated && (
          <Reveal delay={100}>
            <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#5C7A5E]/30 shadow-warm-md">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B2420]">
                    Rangoli Cafe Staff & Daily Wage Tracker (Owner Access)
                  </h3>
                  <p className="text-xs text-[#574B45] mt-1">
                    Calculate monthly payouts based on daily wage rates and actual working days.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#5C7A5E]/15 px-4 py-2 rounded-2xl border border-[#5C7A5E]/30">
                    <div className="text-[11px] font-bold text-[#5C7A5E]">Total Monthly Payroll</div>
                    <div className="text-lg font-extrabold text-[#2B2420]">₹{totalMonthlyPayroll.toLocaleString('en-IN')}</div>
                  </div>

                  <button
                    onClick={() => setShowAddStaffModal(true)}
                    className="bg-[#5C7A5E] hover:bg-[#4a634c] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Staff Member
                  </button>
                </div>
              </div>

              {/* STAFF WAGES TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#FBF4E8] text-[#2B2420] text-xs uppercase font-bold border-b border-gray-200">
                      <th className="p-3.5">Staff Name & Role</th>
                      <th className="p-3.5">Daily Wage Rate (₹/day)</th>
                      <th className="p-3.5">Days Worked (Month)</th>
                      <th className="p-3.5">Total Calculated Wage</th>
                      <th className="p-3.5">Room Facility</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {staffList.map((stf) => {
                      const calculatedWage = stf.dailyRate * stf.daysWorkedThisMonth;
                      return (
                        <tr key={stf.id} className="hover:bg-amber-50/50 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-[#2B2420]">{stf.name}</div>
                            <div className="text-xs text-[#A6305E] font-semibold">{stf.role}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-gray-500">₹</span>
                              <input
                                type="number"
                                value={stf.dailyRate}
                                onChange={(e) => handleRateChange(stf.id, e.target.value)}
                                className="w-24 bg-white border border-gray-300 rounded-lg px-2 py-1 text-sm font-bold text-[#E08A1E]"
                              />
                              <span className="text-xs text-gray-400">/day</span>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <input
                              type="number"
                              min="0"
                              max="31"
                              value={stf.daysWorkedThisMonth}
                              onChange={(e) => handleDaysChange(stf.id, e.target.value)}
                              className="w-20 bg-white border border-gray-300 rounded-lg px-2 py-1 text-sm font-bold text-[#2B2420]"
                            />
                            <span className="text-xs text-gray-400 ml-1">days</span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-serif font-extrabold text-base text-[#5C7A5E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                              ₹{calculatedWage.toLocaleString('en-IN')}
                            </span>
                          </td>

                          <td className="p-3.5">
                            {stf.roomProvided ? (
                              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-max">
                                <Home className="w-3 h-3" /> Room Free
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">No Room</span>
                            )}
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteStaff(stf.id, stf.name)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </Reveal>
        )}

      </div>

      {/* GUEST ROOM BOOKING MODAL */}
      {bookingRoom && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E08A1E]/40 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#E08A1E]/20 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6305E]">Confirm Room Booking</span>
                <h3 className="font-serif font-bold text-lg text-[#2B2420]">{bookingRoom.title}</h3>
              </div>
              <button
                onClick={() => setBookingRoom(null)}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">Your Full Name*:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={bookingForm.guestName}
                  onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">WhatsApp / Phone Number*:</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B2420] block mb-1">Stay Duration:</label>
                  <select
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
                    className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#2B2420] font-bold"
                  >
                    <option value="monthly">Monthly Stay ({bookingRoom.monthlyPrice})</option>
                    <option value="daily">Daily Stay ({bookingRoom.dailyPrice})</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2B2420] block mb-1">Check-in Date:</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.checkInDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, checkInDate: e.target.value })}
                    className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#2B2420]"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <p className="font-bold flex items-center gap-1 text-[#E08A1E]">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Room Hold
                </p>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Submitting will mark this room as <strong>BOOKED</strong> on the Rangoli Cafe website and send your booking confirmation directly to the owner.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingRoom(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E08A1E] hover:bg-[#C6740E] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Book Room</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OWNER PIN MODAL FOR ROOMS / WAGES TAB */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E08A1E]/40 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#E08A1E]/20 mb-4">
              <div className="flex items-center gap-2 text-[#2B2420] font-bold font-serif text-lg">
                <KeyRound className="w-5 h-5 text-[#E08A1E]" />
                <span>Owner Verification</span>
              </div>
              <button
                onClick={() => { setShowPinModal(false); setPinError(''); }}
                className="text-gray-400 hover:text-black p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#574B45] mb-4">
              The Staff Daily Wage Tracker is restricted to the cafe owner. Enter your PIN to view staff wages. (Default PIN: <strong className="text-[#A6305E]">1234</strong>)
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
                  className="bg-[#5C7A5E] hover:bg-[#4a634c] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md cursor-pointer"
                >
                  Verify PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {showAddStaffModal && isOwnerAuthenticated && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#5C7A5E]/30 animate-fadeIn">
            <h3 className="font-serif font-bold text-lg text-[#2B2420] pb-2 border-b border-gray-200 mb-4">
              Add New Staff Member
            </h3>

            <form onSubmit={handleAddStaffSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">Staff Full Name*:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunil Kumar"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2B2420] block mb-1">Job Role:</label>
                <input
                  type="text"
                  placeholder="e.g. Assistant Cook / Service"
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2B2420] block mb-1">Daily Wage Rate (₹)*:</label>
                  <input
                    type="number"
                    required
                    value={newStaff.dailyRate}
                    onChange={(e) => setNewStaff({ ...newStaff, dailyRate: e.target.value })}
                    className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#E08A1E] font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2B2420] block mb-1">Days Worked:</label>
                  <input
                    type="number"
                    value={newStaff.daysWorkedThisMonth}
                    onChange={(e) => setNewStaff({ ...newStaff, daysWorkedThisMonth: e.target.value })}
                    className="w-full bg-[#FBF4E8] border border-gray-300 rounded-xl px-3 py-2 text-sm text-[#2B2420]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="roomCheck"
                  checked={newStaff.roomProvided}
                  onChange={(e) => setNewStaff({ ...newStaff, roomProvided: e.target.checked })}
                />
                <label htmlFor="roomCheck" className="text-xs font-bold text-[#2B2420] cursor-pointer">
                  Room Accommodation Provided Free
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5C7A5E] hover:bg-[#4a634c] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md"
                >
                  Save Staff Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}

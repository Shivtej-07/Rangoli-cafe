import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Badges from './components/Badges';
import About from './components/About';
import Menu from './components/Menu';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Hours from './components/Hours';
import Location from './components/Location';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import { X } from 'lucide-react';

export default function App() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const openModal = () => setIsReserveModalOpen(true);
  const closeModal = () => setIsReserveModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF4E8] text-[#2B2420] selection:bg-[#E08A1E]/30 selection:text-[#A6305E]">
      
      {/* Sticky Header Navigation */}
      <Navbar onOpenReserveModal={openModal} />

      {/* Main Single Page Content */}
      <main className="flex-grow">
        <Hero onOpenReserveModal={openModal} />
        <Badges />
        <About />
        <Menu />
        <Rooms />
        <Gallery />
        <Reviews />
        <Hours />
        <Location />
        <Contact />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons: WhatsApp & Sticky Mobile Call Bar */}
      <FloatingButtons onOpenReserveModal={openModal} />

      {/* Reservation Modal Dialog Overlay */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#E08A1E]/30 my-8">
            
            {/* Modal Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-[#2B2420]/60 hover:text-[#2B2420] bg-[#FBF4E8] hover:bg-[#E08A1E]/20 p-2 rounded-full transition-all cursor-pointer"
              aria-label="Close Reservation Window"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Render Contact component in Modal mode */}
            <Contact isModalMode={true} onCloseModal={closeModal} />

          </div>
        </div>
      )}

    </div>
  );
}

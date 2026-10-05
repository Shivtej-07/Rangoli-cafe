import React from 'react';
import { CAFE_INFO } from '../data/content';
import { MapPin, Navigation, Compass, Phone, ExternalLink, Copy, Check } from 'lucide-react';
import Reveal from './Reveal';

export default function Location() {
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CAFE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="location" className="py-20 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#A6305E] bg-[#A6305E]/10 px-3.5 py-1.5 rounded-full">
              Find Us in Vashist Village
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2420] mt-3 mb-2">
              Location & How to Reach Us
            </h2>
            <div className="font-devanagari text-lg text-[#E08A1E] font-bold mb-4">
              हमारा पता — योगशाला के सामने, जोगणी वॉटरफॉल मार्ग, वशिष्ठ
            </div>
            <p className="text-base text-[#574B45]">
              Situated on the picturesque walking path to Jogni Waterfalls, opposite Yogashala.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side Directions Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Reveal delay={100} className="h-full">
              <div className="bg-[#FBF4E8] border border-[#E08A1E]/20 p-6 sm:p-8 rounded-3xl shadow-warm-md flex flex-col justify-between h-full">
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#A6305E] text-white flex items-center justify-center shadow-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#2B2420]">
                        Rangoli Cafe Address
                      </h3>
                      <span className="font-devanagari text-xs text-[#A6305E] font-bold">
                        वशिष्ठ, मनाली, हिमाचल प्रदेश
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-[#574B45] mb-8">
                    <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#E08A1E]/15">
                      <div className="font-bold text-[#2B2420] text-sm mb-1 flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#E08A1E]" /> Full Address
                      </div>
                      <p className="text-xs leading-relaxed text-[#574B45]">
                        {CAFE_INFO.address}
                      </p>
                      
                      <button
                        onClick={copyAddress}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#A6305E] hover:underline cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Address Copied!' : 'Copy Address to Clipboard'}</span>
                      </button>
                    </div>

                    <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#E08A1E]/15">
                      <div className="font-bold text-[#2B2420] text-sm mb-1 flex items-center gap-1.5">
                        <Navigation className="w-4 h-4 text-[#5C7A5E]" /> Key Landmarks
                      </div>
                      <ul className="text-xs leading-relaxed space-y-1.5 text-[#574B45]">
                        <li>• Directly opposite <strong>Yogashala</strong></li>
                        <li>• On the trail to <strong>Jogni Waterfalls</strong></li>
                        <li>• 5-minute easy walk from <strong>Vashist Hot Water Springs Temple</strong></li>
                        <li>• 3.5 km from main Manali Mall Road</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Directions Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E08A1E]/15">
                  <a
                    href={CAFE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 bg-[#E08A1E] hover:bg-[#C6740E] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-warm-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={`tel:${CAFE_INFO.phoneRaw}`}
                    className="w-full sm:w-auto bg-[#FFFDF9] hover:bg-[#5C7A5E] hover:text-white border border-[#5C7A5E] text-[#5C7A5E] font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call for Directions</span>
                  </a>
                </div>

              </div>
            </Reveal>
          </div>

          {/* Right Side Map Embed */}
          <div className="lg:col-span-7">
            <Reveal delay={150} className="h-full">
              <div className="bg-[#FBF4E8] border border-[#E08A1E]/20 p-3 rounded-3xl shadow-warm-md h-full min-h-[380px] flex flex-col">
                <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden relative shadow-inner">
                  <iframe
                    title="Rangoli Cafe Vashist Google Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.966964177264!2d77.187311!3d32.266200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390487d555555555%3A0x123456789abcdef!2sRangoli%20Cafe%20%26%20Restaurant!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '380px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl w-full h-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';

// --- Types ---
interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  genre: string;
  image: string;
  description: string;
  featured: boolean;
  pricing: Array<{
    category: string;
    description: string;
    beforePrice: string;
    beforeCover: string;
    afterPrice: string;
    afterCover: string;
  }>;
}

// --- Data ---
const EVENTS: EventItem[] = [
  {
    id: 'bianca-lif',
    title: 'BIANCA LIF',
    subtitle: 'Live & Unplugged Experience',
    date: 'Saturday, Aug 15, 2026',
    time: '10:00 PM - Late',
    location: 'The Grand Arena, Main Stage',
    genre: 'Afrobeats / Amapiano / Hip-Hop',
    image: '/biancalif.png',
    description:
      'Experience an unforgettable night with Bianca Lif performing live. High energy, heavy basslines, top-tier audio-visual production, and an energetic crowd guaranteed.',
    featured: true,
    pricing: [
      {
        category: 'Couples',
        description: 'Joint entry profile',
        beforePrice: '4.5k',
        beforeCover: '4.5k Cover',
        afterPrice: '6k',
        afterCover: '6k Cover'
      },
      {
        category: 'Girls',
        description: 'Single female entry',
        beforePrice: '2k',
        beforeCover: '2k Cover',
        afterPrice: '2k',
        afterCover: '2k Cover'
      },
      {
        category: 'Stags',
        description: 'Single male entry',
        beforePrice: '6k',
        beforeCover: '6k Cover',
        afterPrice: '8k',
        afterCover: '8k Cover'
      }
    ],
  },
  {
    id: 'house-of-black',
    title: 'HOUSE OF BLACK',
    subtitle: 'The Darkroom Techno & House Odyssey',
    date: 'Friday, Aug 28, 2026',
    time: '11:00 PM - 05:00 AM',
    location: 'Vault 42 / Underground Club',
    genre: 'Melodic Techno / Tech House / Deep',
    image: '/houseofblack.png',
    description:
      'Dress in black and immerse yourself in the deep underground sounds of House of Black. Featuring international Guest DJs, immersive strobe light shows, and intense bass rhythms.',
    featured: true,
    pricing: [
      {
        category: 'Couples',
        description: 'Joint entry profile',
        beforePrice: '4.5k',
        beforeCover: '4.5k Cover',
        afterPrice: '6k',
        afterCover: '6k Cover'
      },
      {
        category: 'Girls',
        description: 'Single female entry',
        beforePrice: '2k',
        beforeCover: '2k Cover',
        afterPrice: '2k',
        afterCover: '2k Cover'
      },
      {
        category: 'Stags',
        description: 'Single male entry',
        beforePrice: '6k',
        beforeCover: '6k Cover',
        afterPrice: '8k',
        afterCover: '8k Cover'
      }
    ],
  },
];

export default function TrapEntertainmentPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleOpenBooking = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const handleCloseBooking = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-yellow-500 selection:text-black">
      {/* Background Decorative Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-amber-500 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 text-black font-black flex items-center justify-center rounded-lg text-xl tracking-tighter shadow-lg shadow-yellow-500/20">
                TE
              </div>
              <span className="text-xl font-black tracking-widest text-white uppercase">
                Trap <span className="text-yellow-400">Entertainment</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider text-neutral-300">
              <a href="#events" className="hover:text-yellow-400 transition-colors">
                EVENTS
              </a>
              <a href="#about" className="hover:text-yellow-400 transition-colors">
                ABOUT
              </a>
              <a href="#vip" className="hover:text-yellow-400 transition-colors">
                VIP TABLES
              </a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">
                CONTACT
              </a>
            </nav>

            <a
              href="#events"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs uppercase px-5 py-2.5 rounded-full tracking-wider transition-all transform hover:scale-105 shadow-md shadow-yellow-400/20"
            >
              Get Tickets
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden text-center border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-6 border border-yellow-400/20">
              Official Nightlife & Music Events
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6">
              UNFORGETTABLE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                NIGHTS & BEATS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
              Welcome to Trap Entertainment. Bringing you premier party experiences, world-class lineup events, and electrifying atmosphere.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#events"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-8 py-4 rounded-xl text-sm tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-yellow-400/20"
              >
                Browse Upcoming Events
              </a>
              <a
                href="#vip"
                className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase px-8 py-4 rounded-xl text-sm tracking-wider transition-all"
              >
                Book VIP Bottle Service
              </a>
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        <section id="events" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-2">
                Upcoming Shows
              </h2>
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                Featured Events
              </p>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm mt-4 md:mt-0">
              Select an event below to check pricing tiers or reserve VIP access.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="group relative bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 flex flex-col justify-between shadow-2xl"
              >
                {/* Event Image Container */}
                <div className="relative h-[380px] bg-neutral-950 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-yellow-400">
                    {evt.genre}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                </div>

                {/* Event Details */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-3xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                        {evt.title}
                      </h3>
                      <span className="text-yellow-400 font-extrabold text-sm bg-neutral-950 px-3 py-1.5 rounded-xl border border-white/10">
                        Cover Tiers
                      </span>
                    </div>
                    <p className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-4">
                      {evt.subtitle}
                    </p>

                    <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                      {evt.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-neutral-300">
                      <div>
                        <span className="block text-neutral-500 uppercase font-bold text-[10px] tracking-wider">
                          DATE & TIME
                        </span>
                        <span className="font-semibold text-white">{evt.date}</span>
                        <br />
                        <span className="text-neutral-400">{evt.time}</span>
                      </div>
                      <div>
                        <span className="block text-neutral-500 uppercase font-bold text-[10px] tracking-wider">
                          LOCATION
                        </span>
                        <span className="font-semibold text-white">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => handleOpenBooking(evt)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase py-3.5 rounded-xl text-xs tracking-wider transition-all text-center shadow-md shadow-yellow-400/10"
                    >
                      View Pricing Tiers
                    </button>
                    <a
                      href="#vip"
                      className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase px-6 py-3.5 rounded-xl text-xs tracking-wider transition-all"
                    >
                      VIP Access
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIP / Table Reservation Banner */}
        <section id="vip" className="py-20 bg-neutral-900/60 border-y border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-yellow-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-2xl relative z-10">
                <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-2 block">
                  Exclusive Experience
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">
                  VIP Bottle Service & Private Tables
                </h2>
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
                  Elevate your night with custom table packages, dedicated server staff, premium spirit bottles, and the best view of the stage for Bianca Lif or House of Black.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-6 py-3.5 rounded-xl text-xs tracking-wider transition-all"
                  >
                    Inquire VIP Reservation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-16 bg-black border-t border-white/10 text-neutral-400 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-400 text-black font-black flex items-center justify-center rounded text-sm">
                  TE
                </div>
                <span className="text-lg font-black tracking-widest text-white uppercase">
                  Trap Entertainment
                </span>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
                Creating premier nightlife experiences and live music concerts. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-white tracking-widest mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#events" className="hover:text-yellow-400">Bianca Lif Event</a></li>
                <li><a href="#events" className="hover:text-yellow-400">House of Black Event</a></li>
                <li><a href="#vip" className="hover:text-yellow-400">VIP Bottle Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-white tracking-widest mb-4">
                Contact & Inquiries
              </h4>
              <p className="text-xs text-neutral-400 mb-2">
                Email: <span className="text-white">info@trapentertainment.com</span>
              </p>
              <p className="text-xs text-neutral-400">
                Instagram: <span className="text-yellow-400">@trapentertainment</span>
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-white/5 text-center text-xs text-neutral-600">
            © {new Date().getFullYear()} Trap Entertainment. Built with Next.js.
          </div>
        </footer>
      </div>

      {/* Ticket Purchase / Pricing Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl my-auto">
            <button
              onClick={handleCloseBooking}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white text-xl font-bold p-2 z-10 bg-neutral-900 rounded-full"
            >
              ✕
            </button>

            <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-1 block">
              Event Access Terminal
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-xs text-neutral-400 mb-8 border-b border-white/10 pb-4">
              {selectedEvent.date} • {selectedEvent.location} • Door timings applied.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Column 1: Pricing Architecture */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">Phase 1 Architecture</h4>
                    <p className="text-[10px] text-neutral-500 uppercase font-medium">Valid for entry before 9:00 PM</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedEvent.pricing.map((tier) => (
                    <div key={tier.category} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/40">
                      <div>
                        <span className="font-bold block text-sm text-white">{tier.category}</span>
                        <span className="text-xs text-neutral-500 font-light">{tier.description}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-yellow-400 text-lg">${tier.beforePrice}</span>
                        <span className="text-[10px] block text-neutral-500 font-bold uppercase">{tier.beforeCover}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Post Cutoff Architecture */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-400/10 border border-red-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">Post Cutoff Architecture</h4>
                    <p className="text-[10px] text-red-400 uppercase font-medium">Valid for entry post 10:00 PM</p>
                  </div>
                </div>

                <div className="space-y-3 opacity-90">
                  {selectedEvent.pricing.map((tier) => (
                    <div key={tier.category} className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-950/20">
                      <div>
                        <span className="font-bold block text-sm text-white">{tier.category}</span>
                        <span className="text-xs text-neutral-500 font-light">{tier.description}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-white text-lg">${tier.afterPrice}</span>
                        <span className="text-[10px] block text-neutral-500 font-bold uppercase">{tier.afterCover}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed mb-6">
                Door admission policies apply. Entry is strictly based on venue capacity. We recommend Phase 1 architecture for guaranteed faster entry.
              </p>
              <a
                href="#contact"
                onClick={handleCloseBooking}
                className="inline-flex bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-8 py-4 rounded-xl text-xs tracking-wider transition-all shadow-lg shadow-yellow-400/20"
              >
                Reserve Spot via Instagram DM
              </a>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Sparkles, 
  PartyPopper, 
  Music, 
  Calendar, 
  MapPin, 
  Users, 
  X 
} from 'lucide-react';

export default function TrapEntertainmentsWebsite() {
  const [activeModal, setActiveModal] = useState<string | null>(null); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [passType, setPassType] = useState<string>('couple');
  
  // Apple-inspired scroll listener state for dynamic navbar blurring
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "NAAK",
      day: "Friday Night",
      date: "June 19, 2026",
      venue: "Cavore, Bangalore",
      bgImage: "/naak.png",
      tagline: "The sensation NAAK is coming to Cavore for an unforgettable, high-octane premium nightlife takeover.",
      features: [
        "Headlined by the phenomenal DJ NAAK delivering an exclusive high-energy set.",
        "Featuring a heavy-hitting support performance by MALIK MUSIC.",
        "Strictly curated premium atmosphere. Lock in your guestlist access below."
      ],
      pricing: {
        couples: "Couples — ₹3.5k post 10:30 PM",
        stags: "Stags — ₹4k all night",
        girls: "Girls — Walk in free"
      }
    },
  ];

  const handleOpenBooking = (eventTitle = "General Event Access") => {
    setSelectedEvent(eventTitle);
    setActiveModal('book');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-400 selection:text-black antialiased overflow-x-hidden animate-[fadeIn_1.2s_ease-out_both]">
      
      {/* Global CSS injection for custom keyframes without breaking Tailwind configs */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header / Navigation Bar with dynamic Apple-style scroll blur */}
      <header className={`sticky top-0 z-40 w-full border-b transition-all duration-500 ease-out ${
        scrolled 
          ? "border-neutral-800 bg-neutral-950/80 backdrop-blur-xl py-2" 
          : "border-transparent bg-neutral-950/0 backdrop-blur-0 py-4"
      }`}>
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <button 
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            title="Refresh Page"
          >
            <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
            <span className="text-xl font-black tracking-widest text-white uppercase transition-colors group-hover:text-amber-400">
              Trap <span className="text-amber-400 transition-colors group-hover:text-white">Ent.</span>
            </span>
          </button>
          
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-sm font-medium text-neutral-300 transition-all hover:border-amber-400/40 hover:text-amber-400"
          >
            <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span className="hidden sm:inline">Follow updates</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6 text-center py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-neutral-950 to-neutral-950" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-yellow-600/5 blur-[150px]" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.4em] text-amber-400 font-semibold">
            <Sparkles className="h-4 w-4" /> Trap Entertainment
          </p>
          
          <img
            src="/logo.png"
            alt="Trap Ent Logo"
            className="mx-auto mb-8 w-40 md:w-52 drop-shadow-[0_0_25px_rgba(255,215,0,0.35)] transform transition-transform duration-700 hover:scale-[1.03]"
          />
          
          <h1 className="text-5xl font-black leading-tight md:text-7xl tracking-tight uppercase">
            Bangalore's Next-Level
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 drop-shadow-sm">
              Party Experience
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 md:text-xl leading-relaxed">
            Exclusive nightlife properties, elite artist collaborations, curated college festivals, and uncompromised club experiences for the high-energy crowd.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <a
              href="#event"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("event")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group flex items-center gap-2 rounded-xl bg-amber-400 px-10 py-4 text-base font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-amber-300 shadow-lg shadow-amber-500/10"
            >
              <Ticket className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Book Events
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - MOVED TO THE TOP RIGHT UNDER HERO */}
      <section id="event" className="mx-auto max-w-6xl px-6 py-24 border-t border-neutral-900/60 scroll-mt-24">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
            Active Grid
          </p>
          <h2 className="text-4xl font-black uppercase md:text-5xl tracking-tight text-white">
            Catch The Next Wave
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-amber-400/30 group shadow-2xl"
            >
              {/* Refined visibility background layout for naak.png */}
              <div 
                className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover lg:bg-contain lg:bg-right transition-transform duration-1000 group-hover:scale-102 opacity-75 lg:opacity-100"
                style={{ backgroundImage: `url(${event.bgImage})` }}
              />
              
              {/* Multilayer linear overlays for flawless contrast masking */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-neutral-950/40 lg:bg-gradient-to-r lg:from-neutral-950 lg:via-neutral-950/85 lg:to-transparent" />

              <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 p-8 md:p-12 gap-8 items-center">
                
                {/* Left Typography Block */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-md bg-amber-400 text-black px-3 py-1 text-xs uppercase font-extrabold tracking-wider">
                      {event.day}
                    </span>
                    <span className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-800">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping inline-block" />
                      Booking Live
                    </span>
                  </div>

                  <h3 className="text-5xl font-black tracking-tight text-white uppercase md:text-6xl drop-shadow-md">
                    {event.title}
                  </h3>
                  
                  <p className="text-neutral-300 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                    {event.tagline}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-1 text-neutral-300">
                    <div className="flex items-center gap-2 text-sm bg-neutral-950/90 backdrop-blur-sm border border-neutral-800 px-4 py-2 rounded-xl">
                      <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-semibold">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-neutral-950/90 backdrop-blur-sm border border-neutral-800 px-4 py-2 rounded-xl">
                      <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-semibold">{event.venue}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {event.features.map((feature, idx) => (
                      <div key={idx} className="bg-neutral-950/80 backdrop-blur-sm border border-neutral-900/60 rounded-xl p-3.5 text-xs text-neutral-400 max-w-xl leading-relaxed">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Reservation Matrix */}
                <div className="lg:col-span-5 w-full bg-neutral-950/95 backdrop-blur-md border border-neutral-800 p-6 rounded-2xl space-y-5 shadow-2xl transition-all duration-300 hover:border-neutral-700">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Pass Configuration Matrix</p>
                    <p className="text-[11px] text-neutral-500">Select your preferences at the front security gates.</p>
                  </div>

                  <div className="text-sm space-y-3 font-medium text-neutral-300">
                    <div className="flex justify-between border-b border-neutral-900 pb-2.5 items-center">
                      <span className="text-neutral-400">Couples</span>
                      <span className="text-white font-bold text-sm bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">{event.pricing.couples}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-900 pb-2.5 items-center">
                      <span className="text-neutral-400">Stags</span>
                      <span className="text-white font-bold text-sm bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">{event.pricing.stags}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-neutral-400">Girls</span>
                      <span className="text-emerald-400 font-black uppercase tracking-wider bg-emerald-950/30 px-3 py-1.5 rounded-lg border border-emerald-500/20">{event.pricing.girls}</span>
                    </div>
                  </div>

                  <p className="text-[10px] italic text-neutral-500 text-center border-t border-neutral-900 pt-3">
                    *Disclaimer: Cover charges are subjective to the venue profile context.
                  </p>

                  <button 
                    type="button"
                    onClick={() => handleOpenBooking(event.title)}
                    className="w-full rounded-xl bg-amber-400 px-6 py-4 font-black text-black transition-all duration-200 hover:bg-amber-300 uppercase tracking-widest text-xs shadow-lg shadow-amber-400/10 hover:scale-[1.01]"
                  >
                    Reserve Spot via Guestlist
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-neutral-900">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              About Us
            </p>
            <h2 className="text-4xl font-black uppercase md:text-5xl tracking-tight leading-tight text-white">
              We Design Experiences,
              <span className="block text-neutral-500 mt-1">Not Just Parties.</span>
            </h2>
          </div>

          <div className="border-l border-neutral-800 pl-0 md:pl-8">
            <p className="text-base leading-8 text-neutral-400">
              Trap Entertainments is a youth-driven lifestyle management company fueling premium nightlife ecosystems, underground artist showcases, and bespoke live entertainment events across Bangalore's most luxurious destination venues.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-neutral-950 px-6 py-24 border-t border-neutral-900">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              What We Do
            </p>
            <h2 className="text-4xl font-black uppercase md:text-5xl tracking-tight text-white">
              Events That Hit Different
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <PartyPopper className="h-6 w-6 text-amber-400" />,
                title: 'Premium Clubbing',
                desc: 'Unmatched VIP experiences featuring world-class acoustic arrays at high-end luxury venues around India.',
              },
              {
                icon: <Users className="h-6 w-6 text-amber-400" />,
                title: 'College Festivals',
                desc: 'Tailored, hyper-energetic dynamic concerts, cultural alignments, and custom curation for student demographics.',
              },
              {
                icon: <Music className="h-6 w-6 text-amber-400" />,
                title: 'Artist Alignments',
                desc: 'Live performances, domestic and international tours, independent showcases, and major agency alignments.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-neutral-900 bg-neutral-950 p-8 transition-all duration-300 hover:border-amber-400/20 hover:-translate-y-1"
              >
                <div className="mb-5 inline-block rounded-xl bg-neutral-900 p-4 border border-neutral-800 group-hover:bg-neutral-900 group-hover:border-amber-400/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold tracking-tight text-white">{item.title}</h3>
                <p className="leading-7 text-neutral-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {activeModal === 'book' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_both]">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 md:p-8 shadow-2xl">
            
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Priority Entry Form</span>
              <h3 className="text-xl font-black text-white uppercase mt-1">EVENT: {selectedEvent}</h3>
              <p className="text-xs text-neutral-400 mt-1">Provide authentication details to process gate checklist credentials.</p>
            </div>

            <form action="https://formspree.io/f/xnjyydqw" method="POST" className="space-y-4">
              <input type="hidden" name="_subject" value={`Trap Ent. Roster Request: ${selectedEvent}`} />
              <input type="hidden" name="Target Roster Show" value={selectedEvent || 'NAAK Live'} />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="Full Name" 
                  required 
                  placeholder="e.g. Rohan Hegde"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="Email" 
                    required 
                    placeholder="name@domain.com"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Contact WhatsApp</label>
                  <input 
                    type="tel" 
                    name="Phone Number" 
                    required 
                    placeholder="10-digit primary"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Select Your Pass Tier</label>
                <select
                  name="Selected Pass Roster Type"
                  value={passType}
                  onChange={(e) => setPassType(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="couple">Couple Pass (₹3.5k post 10:30)</option>
                  <option value="stag">Stag Pass (₹4k all night)</option>
                  <option value="girls">Girls Pass (Walk in free)</option>
                </select>
              </div>

              {passType === 'couple' && (
                <div className="p-4 rounded-xl border border-dashed border-amber-400/20 bg-amber-400/5 space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">Partner's Full Name *</label>
                  <input 
                    type="text" 
                    name="Partner Full Name" 
                    required={passType === 'couple'}
                    placeholder="e.g. Aisha Rao"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              )}

              {passType === 'girls' && (
                <div className="p-4 rounded-xl border border-dashed border-neutral-800 bg-neutral-900/20 space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">Total Ladies in Group</label>
                  <select
                    name="Total Ladies Count Group"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="1">1 (Individual Free Walk-in)</option>
                    <option value="2">2 Girls</option>
                    <option value="3">3 Girls</option>
                    <option value="4+">4+ Girls Group</option>
                  </select>
                </div>
              )}

              {passType === 'stag' && (
                <div className="p-4 rounded-xl border border-dashed border-red-500/10 bg-red-500/5">
                  <p className="text-[11px] leading-relaxed text-neutral-400">
                    <span className="text-red-400 font-bold">Notice:</span> Stag passes are heavily regulated by management rules. Ensure entry timings match target benchmarks.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-black uppercase tracking-wider transition-all hover:bg-amber-300"
              >
                Submit Guestlist Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Premium Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 px-6 py-12 text-center text-sm text-neutral-500">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span className="font-bold text-neutral-300 tracking-wide uppercase">Trap Entertainment Base</span>
          </div>
          <p className="text-xs">&copy; 2026 Trap Entertainment. Bangalore, IN. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { Ticket, Sparkles, PartyPopper, Music, Calendar, MapPin, Users, X } from 'lucide-react';

export default function TrapEntertainmentsWebsite() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [passType, setPassType] = useState<string>('couple');
  const [ladiesCount, setLadiesCount] = useState<number>(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      pricing: { couples: "Couples — ₹3.5k post 10:30 PM", stags: "Stags — ₹4k all night", girls: "Girls — Walk in free" }
    },
  ];

  const handleOpenBooking = (eventTitle = "General Event Access") => {
    setSelectedEvent(eventTitle);
    setActiveModal('book');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-400 selection:text-black antialiased overflow-x-hidden">
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <header className={`sticky top-0 z-40 w-full border-b transition-all duration-500 ${scrolled ? "border-neutral-800 bg-neutral-950/80 backdrop-blur-xl py-3" : "border-transparent bg-transparent py-5"}`}>
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <button onClick={() => window.location.reload()} className="flex items-center gap-3 group">
            <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
            <span className="text-xl font-black tracking-widest text-white uppercase">Trap <span className="text-amber-400">Ent.</span></span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center py-12">
        <h1 className="text-5xl font-black md:text-7xl uppercase tracking-tight">Bangalore's Next-Level <span className="block mt-2 text-amber-400">Party Experience</span></h1>
        <button onClick={() => document.getElementById("event")?.scrollIntoView({ behavior: "smooth" })} className="mt-10 flex items-center gap-2 rounded-xl bg-amber-400 px-10 py-4 font-bold text-black hover:bg-amber-300">
          <Ticket className="h-5 w-5" /> Book Events
        </button>
      </section>

      {/* Events */}
      <section id="event" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="relative rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-4xl md:text-5xl font-black uppercase">{event.title}</h3>
                <p className="text-neutral-400 text-sm md:text-base">{event.tagline}</p>
                <button onClick={() => handleOpenBooking(event.title)} className="bg-amber-400 w-full md:w-auto px-8 py-4 font-black text-black rounded-xl uppercase">Reserve Spot</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Modal - Bottom sheet on mobile, centered on desktop */}
      {activeModal === 'book' && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/90 p-0 md:p-4">
          <div className="w-full max-w-md bg-neutral-950 p-6 rounded-t-3xl md:rounded-3xl border border-neutral-800 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black uppercase">Booking: {selectedEvent}</h3>
              <X onClick={() => setActiveModal(null)} className="cursor-pointer" />
            </div>
            
            <form action="https://formspree.io/f/xnjyydqw" method="POST" className="space-y-4">
              <select value={passType} onChange={(e) => setPassType(e.target.value)} className="w-full p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                <option value="couple">Couple Pass</option>
                <option value="stag">Stag Pass</option>
                <option value="girls">Girls Pass</option>
              </select>

              {passType === 'girls' && (
                <div className="p-4 border border-dashed border-neutral-800 rounded-xl">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Total Ladies</label>
                  <select onChange={(e) => setLadiesCount(Number(e.target.value))} className="w-full p-2 bg-neutral-950 rounded-lg">
                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Girls</option>)}
                  </select>
                </div>
              )}
              <button type="submit" className="w-full bg-amber-400 py-3 font-black text-black rounded-xl uppercase">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
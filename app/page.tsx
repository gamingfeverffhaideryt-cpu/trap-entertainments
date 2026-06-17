"use client";

import React, { useState, useEffect } from 'react';
import { Ticket, X } from 'lucide-react';

export default function TrapEntertainmentsWebsite() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [passType, setPassType] = useState<string>('couple');
  const [ladiesCount, setLadiesCount] = useState<number>(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden">
      
      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-neutral-950/80 backdrop-blur-md py-4 border-b border-neutral-800" : "bg-transparent py-6"}`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xl font-black uppercase tracking-widest">
            Trap <span className="text-amber-400">Ent.</span>
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[70svh] flex flex-col items-center justify-center px-6 text-center pt-24">
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9]">
          Bangalore's <span className="block text-amber-400 mt-2">Next-Level</span>
        </h1>
        <p className="mt-6 text-neutral-400 text-base md:text-xl max-w-lg">
          Premium nightlife experiences, elite artist collaborations, and uncompromised club environments.
        </p>
        <button 
          onClick={() => document.getElementById("event")?.scrollIntoView({ behavior: "smooth" })} 
          className="mt-10 bg-amber-400 px-10 py-4 font-bold text-black rounded-xl hover:scale-105 transition-transform"
        >
          Explore Events
        </button>
      </section>

      {/* Event Section */}
      <section id="event" className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-neutral-900/30 p-6 md:p-10 rounded-3xl border border-neutral-800 backdrop-blur-sm">
          <div className="flex flex-col gap-4">
            <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">Upcoming Takeover</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase">NAAK Live</h3>
            <p className="text-neutral-400 leading-relaxed max-w-2xl">
              The sensation NAAK is coming to Cavore for an unforgettable, high-octane premium nightlife takeover. Join us for a strictly curated atmosphere.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => { setSelectedEvent("NAAK Live"); setActiveModal('book'); }} 
                className="w-full md:w-auto bg-amber-400 px-10 py-4 font-bold text-black rounded-xl uppercase tracking-widest hover:bg-amber-300 transition-colors"
              >
                Reserve Spot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {activeModal === 'book' && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-950 p-6 md:p-8 rounded-t-3xl md:rounded-3xl border-t md:border border-neutral-800 max-h-[85svh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black uppercase text-lg">Event: {selectedEvent}</h3>
              <X onClick={() => setActiveModal(null)} className="cursor-pointer hover:text-amber-400" />
            </div>
            
            <form action="https://formspree.io/f/xnjyydqw" method="POST" className="space-y-5">
              <input type="hidden" name="Event" value={selectedEvent || ''} />
              
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-2">Select Pass Tier</label>
                <select value={passType} onChange={(e) => setPassType(e.target.value)} className="w-full p-3 bg-neutral-900 rounded-xl border border-neutral-800 focus:border-amber-400 outline-none">
                  <option value="couple">Couple Pass</option>
                  <option value="stag">Stag Pass</option>
                  <option value="girls">Girls Pass</option>
                </select>
              </div>

              {passType === 'girls' && (
                <div className="space-y-3 p-4 border border-dashed border-neutral-800 rounded-xl bg-neutral-900/20">
                  <label className="block text-[10px] uppercase font-bold text-neutral-400">Total Ladies in Group</label>
                  <select value={ladiesCount} onChange={(e) => setLadiesCount(Number(e.target.value))} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                    {[1, 2, 3, 4].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Girl' : 'Girls'}</option>)}
                  </select>
                  {Array.from({ length: ladiesCount }).map((_, i) => (
                    <input key={i} name={`Lady ${i + 1} Name`} required placeholder={`Guest ${i + 1} Name`} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm" />
                  ))}
                </div>
              )}
              
              <button type="submit" className="w-full bg-amber-400 py-4 font-black text-black rounded-xl uppercase tracking-widest mt-2 hover:bg-amber-300">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
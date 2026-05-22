"use client";

import { useEffect, useState, useRef } from "react";
import React from 'react';
import { 
  Ticket, 
  ImageIcon, 
  PartyPopper, 
  Music, 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  X,
  ChevronRight,
  ArrowLeft,
  Maximize2
} from 'lucide-react';

function useScrollReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsRevealed(true); else setIsRevealed(false); },
      { threshold: 0.02, rootMargin: "0px 0px -30px 0px" }
    );
    const currentRef = elementRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return { elementRef, isRevealed };
}

export default function TrapEntertainmentWebsite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewState, setViewState] = useState<'home' | 'archive'>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  const [guestlistStep, setGuestlistStep] = useState<'tier-select' | 'form'>('tier-select');
  const [selectedTier, setSelectedTier] = useState<'stag' | 'girl' | 'couple' | null>(null);
  const [activeMediaVault, setActiveMediaVault] = useState<{title: string, items: {type: 'image' | 'video', url: string}[]} | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const renderCursorLoop = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX - 14}px, ${ringY - 14}px, 0)`;
      requestAnimationFrame(renderCursorLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const animationId = requestAnimationFrame(renderCursorLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const upcomingEvents = [{
    id: 1,
    title: "DAYTONA",
    day: "Friday Night",
    date: "May 22, 2026",
    timing: "9:00 pm",
    venue: "Cavore, Ashok Nagar",
    features: ["The producers of the famous afro song Addicted are playing their exclusive set."]
  }];

  const historicalArchive = [
    { id: "scream", title: "SCREAM", date: "OCTOBER 25, 2025", description: "Our premier signature Halloween curation. An elite premium layout pairing extreme high-tier theatrical soundscapes.", guests: "1500+", status: "Public", posterUrl: "/scream.jpg", isExclusive: true, media: [{ type: 'image', url: '/scream.jpg' }] },
    { id: "spookfest", title: "SPOOK FEST", date: "NOVEMBER 8, 2025", description: "Bangalore’s biggest Halloween fest. A night of costumes, chills, and thrills.", guests: "1200+", status: "Public", posterUrl: "/spookfest.jpg", isExclusive: false, media: [{ type: 'image', url: '/spookfest.jpg' }] },
    { id: "vol02", title: "VOL. 02", date: "NOVEMBER 23, 2025", description: "An immersive rave experience for Toyota Experience Museum (TEM).", guests: "200+", status: "Limited Spots", posterUrl: "/vol02.jpg", isExclusive: true, media: [{ type: 'image', url: '/vol02.jpg' }] }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Cursor Elements */}
      <div ref={dotRef} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] mix-blend-difference" />
      <div ref={ringRef} className="hidden md:block fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9998] border border-neutral-500/40 transition-all duration-300 ease-out" />

      {/* Main Navigation Logic */}
      {viewState === 'home' ? (
        <main>
          {/* Hero Section */}
          <section className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-black mb-8">TRAP ENTERTAINMENT</h1>
            <button onClick={() => setViewState('archive')} className="px-8 py-4 bg-amber-500 text-black rounded-2xl font-bold hover:scale-105 transition">View Archive</button>
          </section>
        </main>
      ) : (
        <div className="min-h-screen p-6 max-w-5xl mx-auto py-20">
          <button onClick={() => setViewState('home')} className="mb-10 text-neutral-400 hover:text-white">← Back Home</button>
          <h1 className="text-6xl font-black tracking-widest text-center mb-20">ARCHIVE</h1>
          <div className="space-y-10">
            {historicalArchive.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row border border-neutral-900 rounded-3xl overflow-hidden bg-neutral-950">
                <div className="w-full md:w-1/2 h-64 bg-neutral-900" />
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                  <p className="text-neutral-400 mb-6">{item.description}</p>
                  <div className="flex gap-8">
                    <div><span className="block text-xl font-bold">{item.guests}</span><span className="text-[10px] text-neutral-500">GUESTS</span></div>
                    <div><span className="block text-xl font-bold">{item.status}</span><span className="text-[10px] text-neutral-500">STATUS</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
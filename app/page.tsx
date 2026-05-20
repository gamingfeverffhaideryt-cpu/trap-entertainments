"use client";
import { useEffect, useState } from "react";
import React from 'react';
import { 
  Ticket, 
  Image as ImageIcon, 
  PartyPopper, 
  Music, 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  X 
} from 'lucide-react';

export default function TrapEntertainmentsWebsite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);

    // High-performance passive scroll listener for the Apple-style squeeze effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // State for controlling user interactive modals
  const [activeModal, setActiveModal] = useState<string | null>(null); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Calculate dynamic scaling and softness based on scroll depth
  // As scroll increases, scale drops from 1 to 0.85, and opacity decreases
  const heroScale = Math.max(0.85, 1 - scrollY / 2000);
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  // Simulates a luxury softening effect as you push away
  const heroBlur = Math.min(8, scrollY / 80); 

  const upcomingEvents = [
    {
      id: 1,
      title: "DAYTONA",
      day: "Friday Night",
      date: "May 22, 2026",
      venue: "Cavore, Ashok Nagar",
      features: ["The producers of the famous afro song Addicted are playing their exclusive set. Submit your names to reserve your spot on the exclusive guestlist."]
    },
  ];

  const handleOpenBooking = (eventTitle = "General Event Access") => {
    setSelectedEvent(eventTitle);
    setActiveModal('book');
  };

  return (
    <div className={`min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-92 w-92 rounded-full bg-yellow-600/5 blur-3xl" />

        {/* Dynamic Wrapper handling the Apple-inspired fluid squeeze effect */}
        <div 
          className="relative z-10 max-w-4xl will-change-transform transition-all duration-300 ease-out"
          style={{
            transform: `scale(${heroScale})`,
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`
          }}
        >
          {/* Star Icon Removed — Clean Typography Heading remains */}
          <p className="mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.45em] text-amber-400 font-semibold">
            Trap Entertainments
          </p>
          <img
            src="/logo.png"
            alt="Trap Ent Logo"
            className="mx-auto mb-8 w-40 md:w-52 drop-shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-transform duration-700 hover:scale-105"
          />
          <h1 className="text-5xl font-black leading-tight md:text-7xl tracking-tight text-neutral-100">
            Bangalore's Next-Level
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 mt-2">
              Premium Nightlife
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl leading-relaxed font-light">
            Exclusive nightlife experiences, top-tier DJ acts, custom college events, and luxury club hosting across Bangalore.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#event"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("event")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-8 py-4 text-lg font-bold text-black transition-all duration-300 transform active:scale-95 active:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]"
            >
              <Ticket className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Book Events
            </a>

            <button 
              type="button"
              onClick={() => alert("Our comprehensive photo gallery is launching soon! Follow our Instagram for real-time recaps.")}
              className="flex items-center gap-2 rounded-2xl border border-amber-500/20 bg-neutral-900/40 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 text-amber-400 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black hover:border-transparent hover:scale-[1.03] active:scale-95"
            >
              <ImageIcon className="h-5 w-5" />
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-amber-500/5">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-500 font-medium">
              About Us
            </p>
            <h2 className="text-4xl font-bold md:text-5
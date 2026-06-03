"use client";

import { useEffect, useState, useRef } from "react";
import React from 'react';
import { 
  Ticket, 
  PartyPopper, 
  Music, 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  X,
  ChevronRight,
  ShieldCheck,
  Lock
} from 'lucide-react';

function useScrollReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        } else {
          setIsRevealed(false); 
        }
      },
      { 
        threshold: 0.02, 
        rootMargin: "0px 0px -30px 0px" 
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { elementRef, isRevealed };
}

export default function TrapEntertainmentWebsite() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  const [guestlistStep, setGuestlistStep] = useState<'tier-select' | 'form'>('tier-select');
  const [selectedTier, setSelectedTier] = useState<'girl' | 'couple' | 'stag-male' | null>(null);

  // Refs for zero-lag cursor management
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('clickable-target') ||
        target.onclick
      ) {
        ringRef.current?.classList.add("w-14", "h-14", "bg-amber-400/10", "border-amber-400/80", "shadow-[0_0_20px_rgba(245,158,11,0.4)]", "scale-110");
        ringRef.current?.classList.remove("w-7", "h-7", "bg-transparent", "border-neutral-500/40");
      } else {
        ringRef.current?.classList.remove("w-14", "h-14", "bg-amber-400/10", "border-amber-400/80", "shadow-[0_0_20px_rgba(245,158,11,0.4)]", "scale-110");
        ringRef.current?.classList.add("w-7", "h-7", "bg-transparent", "border-neutral-500/40");
      }
    };

    const renderCursorLoop = () => {
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ringRef.current) {
        const isHovered = ringRef.current.classList.contains("w-14");
        const offset = isHovered ? 28 : 14;
        ringRef.current.style.transform = `translate3d(${ringX - offset}px, ${ringY - offset}px, 0)`;
      }

      requestAnimationFrame(renderCursorLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    const animationId = requestAnimationFrame(renderCursorLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const heroScale = Math.max(0.88, 1 - scrollY / 2500);
  const heroOpacity = Math.max(0, 1 - scrollY / 700);
  const heroBlur = Math.min(6, scrollY / 140); 

  const eventsHeaderReveal = useScrollReveal();
  const eventsGridReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const serviceHeaderReveal = useScrollReveal();
  const servicesGridReveal = useScrollReveal();

  const handleOpenBooking = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setGuestlistStep('tier-select');
    setSelectedTier(null);
    setActiveModal('book');
  };

  const handleSelectTier = (tier: 'girl' | 'couple' | 'stag-male') => {
    setSelectedTier(tier);
    setGuestlistStep('form');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.reload();
    }, 450); 
  };

  return (
    <div className={`min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black transition-opacity duration-1000 ease-out select-none md:cursor-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ scrollBehavior: 'smooth' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          a, button, [role="button"], .clickable-target, input, select, textarea {
            cursor: none !important;
          }
        }
      `}} />

      <div 
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] will-change-transform mix-blend-difference"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div 
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9998] will-change-transform border transition-all duration-300 ease-out w-7 h-7 bg-transparent border-neutral-500/40"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6 flex flex-row items-center justify-end">
        <a 
          href="https://www.instagram.com/trap.entz"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md text-xs md:text-sm font-bold tracking-wide text-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-amber-400 hover:border-amber-400/40 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] active:scale-95 group shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
        >
          <div className="relative h-4 w-4 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
          </div>
          <span>Instagram</span>
        </a>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 md:py-0 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/15 via-neutral-950 to-neutral-950" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />

        <div 
          className="relative z-10 max-w-4xl w-full will-change-transform transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `scale(${heroScale}) translateY(${scrollY * 0.05}px)`,
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`
          }}
        >
          <p className="mb-4 flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.5em] text-amber-400 font-bold">
            Trap Entertainment
          </p>
          
          <img
            src="/logo.png"
            alt="Trap Ent Logo"
            onClick={handleLogoClick}
            className="mx-auto mb-6 md:mb-8 w-36 md:w-52 drop-shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(245,158,11,0.55)] cursor-pointer clickable-target active:scale-95 active:brightness-125"
          />
          
          <h1 className="text-4xl font-black leading-tight md:text-6xl tracking-tight text-neutral-100 max-w-3xl mx-auto">
            Elevating Bangalore's nightlife through
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 mt-2">
              niche, ultra-premium party experiences
            </span>
          </h1>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full max-w-md mx-auto sm:max-w-none">
            <a
              href="#event"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("event")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-8 py-4 text-base md:text-lg font-bold text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform active:scale-95 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              <Ticket className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-12" />
              Explore Showcases
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="event" className="mx-auto max-w-7xl px-6 py-24 border-t border-amber-500/5">
        <div 
          ref={eventsHeaderReveal.elementRef}
          className={`mb-12 md:mb-16 text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            eventsHeaderReveal.isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
            Showcase Schedule
          </p>
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-100">
            Secure Immediate Entry
          </h2>
        </div>

        <div 
          ref={eventsGridReveal.elementRef}
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            eventsGridReveal.isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-12"
          }`}
        >
          <div className="grid gap-8 lg:grid-cols-2 items-start justify-center max-w-5xl mx-auto">
            
            {/* EVENT 1: STEREO EXPRESS */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-950 min-h-[480px] w-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] hover:border-amber-500/50 hover:scale-[1.01] transition-all duration-500 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover:scale-105 opacity-50"
                style={{ backgroundImage: `url('/stereoexpress.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/40 z-10" />

              <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between flex-1">
                <div>
                  <span className="inline-block mb-4 rounded-full bg-amber-500 text-black font-black px-4 py-1 text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    NEXT SHOWCASE
                  </span>

                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    STEREO EXPRESS ⚡
                  </h3>
                  
                  <div className="mt-4 space-y-2.5 text-neutral-200 font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] text-sm">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>5th June | Thursday • 7:00 PM Onwards</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>Cavore, Bangalore</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 max-w-md text-xs text-neutral-300 font-light">
                    <div className="bg-neutral-950/80 border border-neutral-900 rounded-xl px-4 py-2">
                      🕒 Guestlist Access Valid Strictly Until 9:00 PM
                    </div>
                    <div className="bg-neutral-950/80 border border-neutral-900 rounded-xl px-4 py-2">
                      🎟️ Post 9:00 PM: Mandatory Cover Charges Enforced at Gate
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => handleOpenBooking("STEREO EXPRESS ⚡")}
                  className="mt-8 w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3.5 font-black text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] text-sm uppercase tracking-wider shadow-lg"
                >
                  Select Pass & Book
                </button>
              </div>
            </div>

            {/* EVENT 2: MADE IN BRASIL */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-emerald-500/20 bg-neutral-950 min-h-[480px] w-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] hover:border-emerald-500/50 hover:scale-[1.01] transition-all duration-500 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover:scale-105 opacity-50"
                style={{ backgroundImage: `url('/madeinbrasel.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-emerald-950/40 z-10" />

              <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between flex-1">
                <div>
                  <span className="inline-block mb-4 rounded-full bg-emerald-500 text-black font-black px-4 py-1 text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    INTERNATIONAL CURATION
                  </span>

                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    MADE IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">BRASIL</span> 🇧🇷
                  </h3>
                  
                  <div className="mt-4 space-y-2.5 text-neutral-200 font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] text-sm">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>6th June | Saturday • 9:00 PM Onwards</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Kitty Ko, Lalit Ashok</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium backdrop-blur-sm">
                      Girls: FREE ALL NIGHT
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium backdrop-blur-sm">
                      Couples: FREE TILL 9 PM
                    </span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => handleOpenBooking("MADE IN BRASIL 🇧🇷")}
                  className="mt-8 w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-yellow-500 px-6 py-3.5 font-black text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] text-sm uppercase tracking-wider shadow-lg"
                >
                  Access Brasil Guestlist
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about"
        ref={aboutReveal.elementRef}
        className={`mx-auto max-w-6xl px-6 py-24 border-t border-amber-500/5 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
          aboutReveal.isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">About Us</p>
            <h2 className="text-3xl font-bold md:text-5xl tracking-tight leading-tight text-neutral-100">
              We Design Architecture,
              <span className="block text-amber-400 mt-1 font-light">Not Just Bashes.</span>
            </h2>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-amber-500/20 pt-6 md:pt-0 pl-0 md:pl-8">
            <p className="text-base md:text-lg leading-7 md:leading-8 text-neutral-400 font-light">
              Trap Entertainment is a premium lifestyle collective built exclusively for the modern nightlife enthusiast. We curate global setups, ultra-exclusive signature properties, and high-tier club layouts.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gradient-to-b from-neutral-950 to-neutral-900/50 px-6 py-24 border-y border-amber-500/5 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div 
            ref={serviceHeaderReveal.elementRef}
            className={`mb-12 md:mb-16 text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              serviceHeaderReveal.isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"
            }`}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">What We Do</p>
            <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-100">Curated Event Standards</h2>
          </div>

          <div ref={servicesGridReveal.elementRef} className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <PartyPopper className="h-6 w-6 text-amber-400 shrink-0" />,
                title: 'Club Parties',
                desc: 'A-grade luxury nightlife modules matching exceptional production standards with exclusive partner clubs.',
              },
              {
                icon: <Users className="h-6 w-6 text-amber-400 shrink-0" />,
                title: 'Signature Curations',
                desc: 'High-concept premium social properties built strictly around elite lounge and night-club architectures.',
              },
              {
                icon: <Music className="h-6 w-6 text-amber-400 shrink-0" />,
                title: 'Artist Rosters',
                desc: 'Bespoke independent lineup design, global production touring blueprints, and strategic booking operations.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`group rounded-3xl border border-neutral-800 bg-neutral-950/50 p-6 md:p-8 shadow-2xl backdrop-blur transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
                  servicesGridReveal.isRevealed ? "opacity-100 translate-x-0 scale-100" : index % 2 === 0 ? "opacity-0 -translate-x-6 scale-[0.96]" : "opacity-0 translate-x-6 scale-[0.96]"
                } hover:border-amber-500/35 hover:-translate-y-2`}
              >
                <div className="mb-5 inline-block rounded-2xl bg-amber-950/30 p-4 border border-amber-500/10 group-hover:bg-amber-900/20 group-hover:border-amber-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl md:text-2xl font-bold tracking-tight text-neutral-200">{item.title}</h3>
                <p className="leading-6 md:leading-7 text-neutral-400 font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-950 border-t border-amber-500/10 relative overflow-hidden px-6 py-24 text-center">
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
            Ready To Party?
          </h2> 
          <p className="mt-4 md:mt-6 text-base md:text-xl text-neutral-400 max-w-xl mx-auto font-light">
            Contact Trap Entertainment for premium brand alignments, premium night bookings, sponsorship structures, and ultra-high-end private showcases.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 px-4">
            <button 
              type="button"
              onClick={() => setActiveModal('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-8 py-4 text-base md:text-lg font-bold text-black transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg"
            >
              <Mail className="h-5 w-5 shrink-0" /> Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-black px-6 py-8 text-center text-xs tracking-wider text-neutral-600 font-light">
        © 2026 Trap Entertainment. All rights reserved. Curated for the elite crowd in Bangalore, India.
      </footer>

      {/* Modal Systems */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/90 transition-all duration-300 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out">
            
            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-amber-400 transition-colors p-2 z-30 bg-black/40 rounded-full"
            >
              <X className="h-5 w-5 shrink-0" />
            </button>

            {activeModal === 'book' && (
              <div className="flex flex-col">
                <div className="relative h-44 md:h-52 overflow-hidden flex flex-col justify-end p-6 z-10">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${selectedEvent?.includes("BRASIL") ? "'/madeinbrasel.jpg'" : "'/stereoexpress.jpg'"})` }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-black/40 z-10" />
                  
                  <div className="relative z-20">
                    <span className={`text-[10px] font-black uppercase tracking-widest bg-black border px-2 py-0.5 rounded-md ${selectedEvent?.includes("BRASIL") ? "text-emerald-400 border-emerald-500/30" : "text-amber-400 border-amber-500/30"}`}>
                      Official Entry Gate
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1.5 tracking-tight">{selectedEvent}</h3>
                    <p className="text-xs text-neutral-300 font-light mt-0.5">Select your entry bracket category to sync registration fields</p>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-neutral-950">
                  {guestlistStep === 'tier-select' ? (
                    <div className="space-y-3">
                      
                      {/* Couple Entry Selector */}
                      <button 
                        type="button"
                        onClick={() => handleSelectTier('couple')}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border bg-neutral-900/30 transition-all text-left group ${selectedEvent?.includes("BRASIL") ? "hover:border-emerald-500/40 hover:bg-neutral-900/60 border-neutral-800" : "hover:border-amber-500/40 hover:bg-neutral-900/60 border-neutral-800"}`}
                      >
                        <div className="flex flex-col">
                          <span className={`text-base font-bold text-neutral-100 transition-colors flex items-center gap-1.5 ${selectedEvent?.includes("BRASIL") ? "group-hover:text-emerald-400" : "group-hover:text-amber-400"}`}>
                            Couple Entry Ticket Bracket
                          </span>
                          <span className="text-xs text-neutral-400 font-light mt-1 space-y-0.5 block">
                            {selectedEvent?.includes("BRASIL") ? (
                              <>
                                <span className="block">• Entry Before 9:00 PM: <strong className="text-emerald-400">FREE GUESTLIST</strong></span>
                                <span className="block">• Entry Post 9:00 PM: <strong>1,500</strong> Cover Charge Enforced</span>
                              </>
                            ) : (
                              <>
                                <span className="block">• Entry Before 9:00 PM: <strong className="text-emerald-400">FREE GUESTLIST</strong></span>
                                <span className="block">• Entry Post 9:00 PM: <strong>₹4,500</strong> Cover Charge Enforced</span>
                              </>
                            )}
                          </span>
                        </div>
                        <ChevronRight className={`h-5 w-5 text-neutral-600 group-hover:translate-x-0.5 transition-all ${selectedEvent?.includes("BRASIL") ? "group-hover:text-emerald-400" : "group-hover:text-amber-400"}`} />
                      </button>

                      {/* Ladies Entry Selector */}
                      <button 
                        type="button"
                        onClick={() => handleSelectTier('girl')}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border bg-neutral-900/30 transition-all text-left group ${selectedEvent?.includes("BRASIL") ? "hover:border-emerald-500/40 hover:bg-neutral-900/60 border-neutral-800" : "hover:border-amber-500/40 hover:bg-neutral-900/60 border-neutral-800"}`}
                      >
                        <div className="flex flex-col">
                          <span className={`text-base font-bold text-neutral-100 transition-colors flex items-center gap-1.5 ${selectedEvent?.includes("BRASIL") ? "group-hover:text-emerald-400" : "group-hover:text-amber-400"}`}>
                            Girls Entry Ticket Bracket
                          </span>
                          <span className="text-xs text-neutral-400 font-light mt-1 space-y-0.5 block">
                            {selectedEvent?.includes("BRASIL") ? (
                              <span className="block">• Entry Bracket Validation: <strong className="text-emerald-400">FREE ALL NIGHT</strong></span>
                            ) : (
                              <>
                                <span className="block">• Entry Before 9:00 PM: <strong className="text-emerald-400">FREE GUESTLIST</strong></span>
                                <span className="block">• Entry Post 9:00 PM: <strong>₹2,000</strong> Cover Charge Enforced</span>
                              </>
                            )}
                          </span>
                        </div>
                        <ChevronRight className={`h-5 w-5 text-neutral-600 group-hover:translate-x-0.5 transition-all ${selectedEvent?.includes("BRASIL") ? "group-hover:text-emerald-400" : "group-hover:text-amber-400"}`} />
                      </button>

                      {/* Male Stag Selector */}
                      <button 
                        type="button"
                        onClick={() => handleSelectTier('stag-male')}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border bg-neutral-900/30 transition-all text-left group ${selectedEvent?.includes("BRASIL") ? "hover:border-emerald-500/40 hover:bg-neutral-900/60 border-neutral-800" : "hover:border-amber-500/40 hover:bg-neutral-900/60 border-neutral-800"}`}
                      >
                        <div className="flex flex-col">
                          <span className={`text-base font-bold text-neutral-100 transition-colors flex items-center gap-1.5 ${selectedEvent?.includes("BRASIL") ? "group-hover:text-emerald-400" : "group-hover:text-amber-400"}`}>
                            Male Stag Ticket Bracket 
                          </span>
                          <span className="text-xs text-neutral-400 font-light mt-1 space-y-0.5 block">
                            {selectedEvent?.includes("BRASIL") ? (
                              <span className="block">• General Door Cover Parameter: <strong>2,000</strong> Cover Charge</span>
                            ) : (
                              <>
                                <span className="block">• General Door Cover Parameter: <strong>₹6,000</strong> Cover Charge</span>
                                <span className="block text-amber-500/80 text-[10px] uppercase tracking-wider font-semibold mt-0.5">⚠️ Subject to dynamic variance changes post 10:00 PM</span>
                              </>
                            )}
                          </span>
                        </div>
                        <ChevronRight className={`h-5 w-5 text-neutral-600 group-hover:translate-x-0.5 transition-all ${selectedEvent?.includes("BRASIL") ? "group-hover:text-emerald-400" : "group-hover:text-amber-400"}`} />
                      </button>

                    </div>
                  ) : (
                    <div>
                      <button 
                        type="button"
                        onClick={() => setGuestlistStep('tier-select')}
                        className={`text-xs font-bold mb-4 flex items-center gap-1 transition-colors ${selectedEvent?.includes("BRASIL") ? "text-emerald-500 hover:text-emerald-400" : "text-amber-500 hover:text-amber-400"}`}
                      >
                        ← Back to Entry Categories
                      </button>

                      <form 
                        action="https://formspree.io/f/xaqzwvae"
                        method="POST"
                        className="space-y-4"
                      >
                        <input type="hidden" name="Event Title" value={selectedEvent || "SHOWCASE"} />
                        <input 
                          type="hidden" 
                          name="Selected Ticket Bracket" 
                          value={
                            selectedTier === 'couple' ? 'Couple Entry Bracket' : 
                            selectedTier === 'girl' ? 'Ladies Entry Bracket' : 'Male Stag Bracket'
                          } 
                        />

                        {/* Form Fields: Couple Branch */}
                        {selectedTier === 'couple' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className={`mb-1 block text-xs font-bold uppercase tracking-wider ${selectedEvent?.includes("BRASIL") ? "text-emerald-400" : "text-amber-400"}`}>
                                  Male Full Name
                                </label>
                                <input
                                  type="text"
                                  name="male_full_name"
                                  required
                                  placeholder="Legal First & Last Name"
                                  className={`w-full rounded-xl border bg-neutral-900 px-4 py-2.5 text-white outline-none text-sm transition-colors ${selectedEvent?.includes("BRASIL") ? "border-emerald-500/30 focus:border-emerald-500" : "border-amber-500/30 focus:border-amber-500"}`}
                                />
                              </div>
                              <div>
                                <label className={`mb-1 block text-xs font-bold uppercase tracking-wider ${selectedEvent?.includes("BRASIL") ? "text-emerald-400" : "text-amber-400"}`}>
                                  Female Full Name
                                </label>
                                <input
                                  type="text"
                                  name="female_full_name"
                                  required
                                  placeholder="Legal First & Last Name"
                                  className={`w-full rounded-xl border bg-neutral-900 px-4 py-2.5 text-white outline-none text-sm transition-colors ${selectedEvent?.includes("BRASIL") ? "border-emerald-500/30 focus:border-emerald-500" : "border-amber-500/30 focus:border-amber-500"}`}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Male Insta Handle</label>
                                <input
                                  type="text"
                                  name="male_instagram_handle"
                                  required
                                  placeholder="@username"
                                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Female Insta Handle</label>
                                <input
                                  type="text"
                                  name="female_instagram_handle"
                                  required
                                  placeholder="@username"
                                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Phone Number</label>
                              <input
                                type="tel"
                                name="contact_phone"
                                required
                                placeholder="Enter 10-digit mobile number"
                                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                              />
                            </div>
                          </div>
                        )}

                        {/* Form Fields: Ladies Branch */}
                        {selectedTier === 'girl' && (
                          <div className="space-y-4">
                            <div>
                              <label className={`mb-1 block text-xs font-bold uppercase tracking-wider ${selectedEvent?.includes("BRASIL") ? "text-emerald-400" : "text-amber-400"}`}>
                                Lead Guest Full Name
                              </label>
                              <input
                                type="text"
                                name="ladies_primary_name"
                                required
                                placeholder="Legal First & Last Name"
                                className={`w-full rounded-xl border bg-neutral-900 px-4 py-2.5 text-white outline-none text-sm transition-colors ${selectedEvent?.includes("BRASIL") ? "border-emerald-500/30 focus:border-emerald-500" : "border-amber-500/30 focus:border-amber-500"}`}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Instagram Handle</label>
                                <input
                                  type="text"
                                  name="lady_insta_handle"
                                  required
                                  placeholder="@username"
                                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Girls Attending</label>
                                <select 
                                  name="total_ladies_count"
                                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                                >
                                  <option value="1">Just Me (1)</option>
                                  <option value="2">2 Ladies</option>
                                  <option value="3">3 Ladies</option>
                                  <option value="4">4 Ladies</option>
                                  <option value="5">5+ Ladies Group</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Phone Number</label>
                              <input
                                type="tel"
                                name="contact_phone"
                                required
                                placeholder="Enter 10-digit mobile number"
                                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                              />
                            </div>
                          </div>
                        )}

                        {/* Form Fields: Stag Branch */}
                        {selectedTier === 'stag-male' && (
                          <div className="space-y-4">
                            <div>
                              <label className={`mb-1 block text-xs font-bold uppercase tracking-wider ${selectedEvent?.includes("BRASIL") ? "text-emerald-400" : "text-amber-400"}`}>
                                Stag Full Name
                              </label>
                              <input
                                type="text"
                                name="stag_primary_name"
                                required
                                placeholder="Legal First & Last Name"
                                className={`w-full rounded-xl border bg-neutral-900 px-4 py-2.5 text-white outline-none text-sm transition-colors ${selectedEvent?.includes("BRASIL") ? "border-emerald-500/30 focus:border-emerald-500" : "border-amber-500/30 focus:border-amber-500"}`}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Instagram Handle</label>
                                <input
                                  type="text"
                                  name="stag_insta_handle"
                                  required
                                  placeholder="@username"
                                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Phone</label>
                                <input
                                  type="tel"
                                  name="contact_phone"
                                  required
                                  placeholder="Mobile Number"
                                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white outline-none focus:border-neutral-500 text-sm"
                                />
                              </div>
                            </div>

                            <div className={`border p-3.5 rounded-xl flex items-start gap-2.5 ${selectedEvent?.includes("BRASIL") ? "bg-emerald-950/40 border-emerald-500/20" : "bg-amber-950/40 border-amber-500/20"}`}>
                              <ShieldCheck className={`h-4 w-4 shrink-0 mt-0.5 ${selectedEvent?.includes("BRASIL") ? "text-emerald-400" : "text-amber-400"}`} />
                              <p className="text-[11px] text-neutral-400 leading-normal">
                                {selectedEvent?.includes("BRASIL") ? (
                                  <span>Stag passes for this event require a flat 2,000 cover charge parameter at the entry gates of Kitty Ko.</span>
                                ) : (
                                  <span>Male stag registrations secure allocation context for door evaluation. Standard cover profiles apply firmly upon arrival parameters.</span>
                                )}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Submission Framework Footer */}
                        <div className="pt-2">
                          <p className="text-[10px] text-neutral-500 leading-relaxed mb-4">
                            ⚠️ Entry policy validation dictates club dress code rules: strictly formal, chic, or fashionable attire. Open footwear/slippers for men will result in categorical rejection at gates.
                          </p>
                          <button 
                            type="submit"
                            className={`w-full py-4 rounded-xl font-black text-black uppercase tracking-widest text-sm transition-all duration-300 transform active:scale-95 shadow-lg ${
                              selectedEvent?.includes("BRASIL") 
                                ? "bg-gradient-to-r from-emerald-500 to-yellow-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]" 
                                : "bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                            }`}
                          >
                            Complete Request Allocation
                          </button>
                        </div>

                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-black text-neutral-100 mb-2">Connect with Trap Management</h3>
                <p className="text-sm text-neutral-400 font-light mb-6">For brand associations, high-tier table reservations, and sponsorship briefs.</p>
                
                <form action="https://formspree.io/f/xaqzwvae" method="POST" className="space-y-4">
                  <input type="hidden" name="Context" value="General Business Inquiry" />
                  <div>
                    <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase">Your Name</label>
                    <input type="text" name="name" required className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400/50" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase">Email Protocol</label>
                    <input type="email" name="email" required className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400/50" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase">Brief Message</label>
                    <textarea name="message" rows={4} required className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400/50 resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs tracking-wider transition-all">
                    Dispatch Briefing
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
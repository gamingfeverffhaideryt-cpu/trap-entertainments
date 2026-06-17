"use client";

import { useEffect, useState, useRef } from "react";
import React from 'react';
import { 
  PartyPopper, 
  Music, 
  Users, 
  Mail, 
  X,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Sparkles
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
  
  // Dynamic form state for custom group entries
  const [entryType, setEntryType] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(1);

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

  const handleEntryTypeChange = (value: string) => {
    setEntryType(value);
    if (value === "couple") {
      setGuestCount(2);
    } else {
      setGuestCount(1);
    }
  };

  const heroScale = Math.max(0.88, 1 - scrollY / 2500);
  const heroOpacity = Math.max(0, 1 - scrollY / 700);
  const heroBlur = Math.min(6, scrollY / 140); 

  const eventsHeaderReveal = useScrollReveal();
  const eventsGridReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const serviceHeaderReveal = useScrollReveal();
  const servicesGridReveal = useScrollReveal();

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
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />

        <div 
          className="relative z-10 max-w-4xl w-full will-change-transform transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `scale(${heroScale}) translateY(${scrollY * 0.05}px)`,
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`
          }}
        >
          <p className="mb-4 flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.5em] text-amber-400 font-bold drop-shadow-md">
            Trap Entertainment Presents
          </p>
          
          <img
            src="/logo.png"
            alt="Trap Ent Logo"
            onClick={handleLogoClick}
            className="mx-auto mb-6 md:mb-8 w-36 md:w-52 drop-shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(245,158,11,0.5)] cursor-pointer clickable-target active:scale-95 active:brightness-125"
          />
          
          <h1 className="text-4xl font-black leading-tight md:text-6xl tracking-tight text-neutral-100 max-w-3xl mx-auto drop-shadow-lg">
            Elevating {"Bangalore's"} nightlife through
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
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-10 py-4 text-base md:text-lg font-bold text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform active:scale-95 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              EXPLORE SHOWCASE
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - Configured for NAAK */}
      <section id="event" className="mx-auto max-w-7xl px-6 py-24 border-t border-amber-500/5">
        <div 
          ref={eventsHeaderReveal.elementRef}
          className={`mb-12 md:mb-16 text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            eventsHeaderReveal.isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold tracking-widest">
            Next Premium Showcase
          </p>
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-100 uppercase">
            NAAK at Cavore
          </h2>
        </div>

        <div 
          ref={eventsGridReveal.elementRef}
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            eventsGridReveal.isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-12"
          }`}
        >
          <div className="flex items-center justify-center max-w-3xl mx-auto w-full">
            
            <div className="group relative flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900/50 shadow-2xl transition-all duration-500 hover:border-amber-500/30 overflow-hidden w-full backdrop-blur-sm hover:-translate-y-1">
              
              {/* Event Poster Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                <img 
                  src="/naak.png" 
                  alt="NAAK Showcase Poster Layout" 
                  className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-4 left-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 text-center shadow-xl">
                  <p className="text-xs font-bold uppercase text-amber-400">June</p>
                  <p className="text-xl font-black text-white">19</p>
                </div>
              </div>

              {/* Data Deck */}
              <div className="relative z-10 flex flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Headliner
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">Featuring Malik Music</span>
                </div>
                <h3 className="mb-4 text-4xl font-black uppercase tracking-tight text-neutral-100">NAAK</h3>
                
                <div className="mb-6 grid gap-3 text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>Friday, 19th June 2026</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                    <span><strong>Cavore</strong>, Bangalore</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>Guestlist Open from 8:30 PM Onwards</span>
                  </div>
                </div>

                {/* Entry Blueprint Box */}
                <div className="mb-8 rounded-2xl bg-neutral-950/60 border border-neutral-800 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Ticket className="h-4 w-4 text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">Entry Matrix</h4>
                  </div>
                  
                  <div className="text-sm font-semibold text-white space-y-2 border-b border-white/5 pb-3">
                    <p className="flex justify-between">
                      <span>Girls:</span> 
                      <span className="text-green-400 uppercase font-black">Walk in Free All Night</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Couples:</span> 
                      <span className="text-neutral-200">FREE until 10:30 PM</span>
                    </p>
                  </div>
                  
                  <div className="text-xs text-neutral-400 space-y-2 mt-3">
                    <p className="font-semibold text-neutral-300 uppercase mb-1">Cover Charges Setup:</p>
                    <p className="flex justify-between">• Couples (Post 10:30 PM) <span className="text-white font-bold">₹3,500</span></p>
                    <p className="flex justify-between">• Stags <span className="text-white font-bold">₹4,000 All Night</span></p>
                    
                    <p className="italic text-amber-500/80 mt-4 text-[10px] pt-2 border-t border-white/5 flex items-start gap-1">
                      <Sparkles className="h-3 w-3 shrink-0 mt-0.5" />
                      <span>Disclaimer: Cover charges are subjective to the situation.</span>
                    </p>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    setEntryType("");
                    setGuestCount(1);
                    setActiveModal('register');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-amber-300 active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  Join The Guestlist
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
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">About Us</p>
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

      {/* Modal Engine */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/90 transition-all duration-300 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out">
            
            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-amber-400 transition-colors p-2 z-40 bg-black/60 rounded-full"
            >
              <X className="h-5 w-5 shrink-0" />
            </button>

            {/* Dynamic Registration Module */}
            {activeModal === 'register' && (
              <div className="relative p-6 md:p-8 overflow-hidden min-h-[550px] flex flex-col justify-between">
                
                {/* Visual Backdrop Asset specific to NAAK event */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                  <img 
                    src="/naak.png" 
                    alt="NAAK Event Backdrop" 
                    className="w-full h-full object-cover opacity-15 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/95 via-neutral-950/85 to-neutral-950" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-between space-y-5">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-2xl font-black text-neutral-100 uppercase tracking-tight">Guestlist Registry</h3>
                    <p className="text-sm text-amber-400 font-bold mt-0.5">NAAK @ Cavore • June 19th</p>
                  </div>
                  
                  {/* UPDATED FORMSPREE ACTION ENDPOINT HERE */}
                  <form action="https://formspree.io/f/xnjyydqw" method="POST" className="space-y-4">
                    <input type="hidden" name="Event" value="NAAK at Cavore - June 19" />
                    <input type="hidden" name="TotalGuests" value={guestCount} />
                    
                    {/* Entry Category Select */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-neutral-400 uppercase tracking-wide">Select Entry Type</label>
                      <div className="relative">
                        <select 
                          name="entryType" 
                          required 
                          value={entryType}
                          onChange={(e) => handleEntryTypeChange(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-sm px-4 py-3 text-white text-sm outline-none transition-colors focus:border-amber-400/50 focus:bg-neutral-800"
                        >
                          <option value="" disabled className="text-neutral-500">Choose entry category...</option>
                          <option value="stag">Male Stag Entry (₹4,000 Cover All Night)</option>
                          <option value="couple">Couple Entry (FREE until 10:30 PM / ₹3,500 Post)</option>
                          <option value="girls">Girls Entry (Walk in Free All Night)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Capacity Option for Girls Section */}
                    {entryType === "girls" && (
                      <div className="animate-in slide-in-from-top-2 duration-300">
                        <label className="mb-1.5 block text-xs font-bold text-amber-400 uppercase tracking-wide">Number of Girls Attending</label>
                        <div className="relative">
                          <select 
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-sm px-4 py-3 text-white text-sm outline-none transition-colors focus:border-amber-400/50 focus:bg-neutral-800"
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Girl' : 'Girls'}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Legal Name Registration Fields */}
                    {entryType && (
                      <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar animate-in fade-in duration-300">
                        {Array.from({ length: guestCount }).map((_, i) => (
                          <div key={i} className="animate-in fade-in slide-in-from-top-1 duration-200">
                            <label className="mb-1 block text-[11px] font-bold text-neutral-400 uppercase tracking-wide">
                              {entryType === "couple" 
                                ? (i === 0 ? "Partner 1 Name (As per Govt ID)" : "Partner 2 Name (As per Govt ID)")
                                : (guestCount > 1 ? `Girl #${i + 1} Legal Name` : "Full Legal Name")
                              }
                            </label>
                            <input 
                              type="text" 
                              name={`guest_name_${i + 1}`} 
                              required 
                              placeholder="First & Last Name"
                              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-sm px-4 py-2.5 text-white text-sm outline-none transition-colors focus:border-amber-400/50 focus:bg-neutral-800" 
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-neutral-400 uppercase tracking-wide">Where did you hear about us?</label>
                      <div className="relative">
                        <select 
                          name="source" 
                          required 
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-sm px-4 py-3 text-white text-sm outline-none transition-colors focus:border-amber-400/50 focus:bg-neutral-800"
                        >
                          <option value="" disabled className="text-neutral-500">Select an option...</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Friend suggested">Friend suggested</option>
                          <option value="Promoters">Promoters</option>
                          <option value="Others">Others</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button type="submit" className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                        Confirm Guestlist
                      </button>
                      <p className="mt-3 text-center text-[10px] text-neutral-500 font-medium">
                        * Cover charges are subjective to the situation. Management reserves right of admission.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* General Contact Modal */}
            {activeModal === 'contact' && (
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-black text-neutral-100 mb-2">Connect with Trap Management</h3>
                <p className="text-sm text-neutral-400 font-light mb-6">For brand associations, table reservations, and sponsorship structures.</p>
                
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
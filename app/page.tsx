"use client";

import { useEffect, useState, useRef } from "react";
import React from 'react';
import { 
  PartyPopper, 
  Music, 
  Users, 
  Mail, 
  X,
  Radio,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  CheckCircle2
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
  const [showPasses, setShowPasses] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Single Lady");
  const [selectedEvent, setSelectedEvent] = useState({ id: "", title: "", subtitle: "", formValue: "" });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const openBookingModal = (id: string, eventTitle: string, subtitle: string, formValue: string) => {
    setSelectedEvent({ id: id, title: eventTitle, subtitle: subtitle, formValue: formValue });
    setSelectedCategory("Single Lady");
    setIsSubmitted(false);
    setShowPasses(true);
  };

  const closeBookingModal = () => {
    setShowPasses(false);
    setIsSubmitted(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meaqvjke", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("There was an issue submitting your request. Please try again.");
      }
    } catch (error) {
      alert("There was an issue submitting your request. Please try again.");
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
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-10 py-4 text-base md:text-lg font-bold text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform active:scale-95 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              EXPLORE ACTIVE SHOWCASES
            </a>
          </div>
        </div>
      </section>

      {/* Active Curation Showcase Section */}
      <section id="event" className="mx-auto max-w-7xl px-6 py-24 border-t border-amber-500/5">
        <div 
          ref={eventsHeaderReveal.elementRef}
          className={`mb-12 md:mb-16 text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            eventsHeaderReveal.isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold tracking-widest">
            Now Live
          </p>
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-100 uppercase">
            Active Showcases
          </h2>
        </div>

        <div 
          ref={eventsGridReveal.elementRef}
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            eventsGridReveal.isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-12"
          }`}
        >
          {/* Side-by-Side Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
            
            {/* EVENT 1: CATZ 'N DOGZ @ CAVORE (18 SEP FRIDAY) */}
            <div className="group relative flex flex-col rounded-3xl border border-neutral-900 bg-neutral-900/20 shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]">
              <div className="relative w-full h-[460px] bg-neutral-950 flex flex-col justify-between p-6 overflow-hidden">
                <img 
                  src="/18-sep-friday.png" 
                  alt="Inflight Catz 'N Dogz featuring Malik Poster" 
                  className="absolute inset-0 w-full h-full object-contain object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] pointer-events-none will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/95 z-10" />
                
                <div className="relative z-20 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-emerald-400 w-fit backdrop-blur-md">
                  <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
                  <span>Free Guestlist Open • 21+ Only</span>
                </div>

                <div className="relative z-20 mt-auto">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">Friday Night Showcase</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase group-hover:text-amber-400 transition-colors duration-300">INFLIGHT PRESENTS CATZ 'N DOGZ</h4>
                  <p className="text-xs text-neutral-300 font-medium mt-1 uppercase tracking-wider">ALSO FEATURING: MALIK</p>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-100 mb-2">
                    CATZ 'N DOGZ @ CAVORE
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    A premier Friday night showcase presented by Sourberry and Cavore featuring Catz 'N Dogz along with Malik. High-energy house and underground beats.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">Friday, 18th September</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">8:00 PM Onwards</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">Cavore, Bangalore</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => openBookingModal("cavore", "CATZ 'N DOGZ GUESTLIST", "Cavore Friday night allocation", "CATZ 'N DOGZ @ Cavore Bangalore (18 Sep)")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-4 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 active:scale-95 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)]"
                >
                  <Ticket className="h-4 w-4" /> BOOK PASSES / GUESTLIST
                </button>
              </div>
            </div>

            {/* EVENT 2: THE SATURDAY EDIT @ HEYOU (19 SEP SATURDAY) */}
            <div className="group relative flex flex-col rounded-3xl border border-neutral-900 bg-neutral-900/20 shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]">
              <div className="relative w-full h-[460px] bg-neutral-950 flex flex-col justify-between p-6 overflow-hidden">
                <img 
                  src="/The Saturday Edit - Story Sep 19th.png" 
                  alt="The Saturday Edit Poster" 
                  className="absolute inset-0 w-full h-full object-contain object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] pointer-events-none will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/95 z-10" />
                
                <div className="relative z-20 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-emerald-400 w-fit backdrop-blur-md">
                  <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
                  <span>Free Guestlist Open • 21+ Only</span>
                </div>

                <div className="relative z-20 mt-auto">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">Saturday Night Showcase</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase group-hover:text-amber-400 transition-colors duration-300">THE SATURDAY EDIT</h4>
                  <p className="text-xs text-neutral-300 font-medium mt-1 uppercase tracking-wider">FEAT. AMITH SULEGAI • ERYTH TUVIANA • CRIS • ANSH</p>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-100 mb-2">
                    THE SATURDAY EDIT @ HEYOU
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    A signature Saturday showcase at Heyou MG Road. Featuring top-tier local artist lineups with Heineken 0.0 experience.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">Saturday, 19th September</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">8:30 PM Onwards</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">Heyou, MG Road, Bangalore</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => openBookingModal("heyou", "THE SATURDAY EDIT GUESTLIST", "Heyou Saturday night allocation", "THE SATURDAY EDIT @ Heyou MG Road (19 Sep)")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-4 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 active:scale-95 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)]"
                >
                  <Ticket className="h-4 w-4" /> BOOK PASSES / GUESTLIST
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Form Overlay Terminal Modal */}
      {showPasses && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 overflow-y-auto animate-in fade-in duration-300 backdrop-blur-md">
          <div className="relative w-full max-w-lg my-auto mx-auto border rounded-3xl p-6 md:p-8 shadow-2xl bg-[#0d0d0d] border-neutral-800/80 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ease-out">
            
            <button
              type="button"
              onClick={closeBookingModal}
              className="absolute top-4 right-4 text-neutral-500 hover:text-amber-400 transition-colors p-2 bg-neutral-900/80 rounded-full z-50 border border-neutral-800"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-amber-500 uppercase block mb-1">SELECT TICKETS</span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 font-normal">
                    {selectedEvent.subtitle}. Complete your pass selection below.
                  </p>
                </div>

                <div className="space-y-5">
                  
                  {/* Ticket Options Stack */}
                  <div className="space-y-3">
                    
                    {/* Option 1: Single Lady */}
                    <div 
                      onClick={() => setSelectedCategory("Single Lady")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex items-center justify-between ${
                        selectedCategory === "Single Lady" 
                          ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
                          : "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700"
                      }`}
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white text-sm">Rsvp - Single Lady [Free Entry]</span>
                          <span className="text-[9px] font-extrabold text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full tracking-wider">FREE</span>
                        </div>
                        <p className="text-xs text-neutral-400 font-light leading-snug">Permits Free Entry For One Single Lady All Night Long.</p>
                      </div>
                      <div className="shrink-0 ml-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === "Single Lady" ? "border-amber-400 bg-amber-400" : "border-neutral-700 bg-neutral-900"}`}>
                          {selectedCategory === "Single Lady" && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Couple */}
                    <div 
                      onClick={() => setSelectedCategory("Couple")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex items-center justify-between ${
                        selectedCategory === "Couple" 
                          ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
                          : "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700"
                      }`}
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white text-sm">Couple [Free Entry]</span>
                          <span className="text-[9px] font-extrabold text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full tracking-wider">RSVP</span>
                        </div>
                        <p className="text-xs text-neutral-400 font-light leading-snug">Permits Free Entry To One Couple Via Trap Guestlist.</p>
                      </div>
                      <div className="shrink-0 ml-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === "Couple" ? "border-amber-400 bg-amber-400" : "border-neutral-700 bg-neutral-900"}`}>
                          {selectedCategory === "Couple" && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                      </div>
                    </div>

                    {/* Option 3: Stags */}
                    <div 
                      onClick={() => setSelectedCategory("Stag")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex items-center justify-between ${
                        selectedCategory === "Stag" 
                          ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]" 
                          : "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700"
                      }`}
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white text-sm">Rsvp - Stags [Mandatory Cover]</span>
                          <span className="text-[9px] font-extrabold text-amber-500 uppercase bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full tracking-wider">RSVP</span>
                        </div>
                        <p className="text-xs text-neutral-400 font-light leading-snug">Mandatory Cover Charges Will Be Applicable As Per Club Rules And Regulations.</p>
                      </div>
                      <div className="shrink-0 ml-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === "Stag" ? "border-amber-400 bg-amber-400" : "border-neutral-700 bg-neutral-900"}`}>
                          {selectedCategory === "Stag" && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Form Submission Input Section */}
                  <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-5">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      <input 
                        type="hidden" 
                        name="Event" 
                        value={selectedEvent.formValue} 
                      />
                      <input 
                        type="hidden" 
                        name="Category" 
                        value={selectedCategory} 
                      />

                      {selectedCategory === "Couple" ? (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <div>
                            <label className="mb-1 block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">PARTNER 1 NAME</label>
                            <input type="text" name="partner1_name" required className="w-full rounded-xl border border-neutral-800 bg-black/60 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-500/60 transition-colors" />
                          </div>
                          <div>
                            <label className="mb-1 block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">PARTNER 2 NAME</label>
                            <input type="text" name="partner2_name" required className="w-full rounded-xl border border-neutral-800 bg-black/60 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-500/60 transition-colors" />
                          </div>
                        </div>
                      ) : (
                        <div className="animate-in fade-in duration-300">
                          <label className="mb-1 block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">YOUR FULL NAME</label>
                          <input type="text" name="name" required className="w-full rounded-xl border border-neutral-800 bg-black/60 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-500/60 transition-colors" />
                        </div>
                      )}

                      <div>
                        <label className="mb-1 block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">CONTACT INFO</label>
                        <input type="text" name="contact" required placeholder="Phone number" className="w-full rounded-xl border border-neutral-800 bg-black/60 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-500/60 transition-colors" />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-3.5 mt-2 rounded-xl text-black font-extrabold uppercase text-xs tracking-wider transition-all shadow-lg active:scale-95 bg-amber-400 hover:bg-amber-300"
                      >
                        Reserve Pass ({selectedCategory})
                      </button>
                    </form>
                  </div>

                </div>
              </>
            ) : (
              /* Submission Confirmation Screen */
              <div className="text-center py-10 px-2 space-y-5 max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 className="h-14 w-14 text-amber-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  Pass Reserved!
                </h3>
                <div className="bg-neutral-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-2 text-neutral-300">
                  <p className="text-xs font-medium">
                    Your pass reservation has been recorded.
                  </p>
                  <p className="text-sm md:text-base font-bold text-amber-400 bg-black/70 py-2.5 px-3 rounded-xl border border-amber-500/20">
                    Mention <span className="text-white font-black underline decoration-amber-400">"Trap Guestlist"</span> at entry.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

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
            Keep In Touch
          </h2> 
          <p className="mt-4 md:mt-6 text-base md:text-xl text-neutral-400 max-w-xl mx-auto font-light">
            Contact Trap Entertainment for premium brand alignments, venue bookings, sponsorship structures, and ultra-high-end private showcases.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 px-4">
            <button 
              type="button"
              onClick={() => {
                setActiveModal('contact');
                setIsSubmitted(false);
              }}
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

      {/* Contact Modal Engine */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/90 transition-all duration-300 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out">
            
            <button 
              type="button"
              onClick={() => {
                setActiveModal(null);
                setIsSubmitted(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-amber-400 transition-colors p-2 z-40 bg-black/60 rounded-full"
            >
              <X className="h-5 w-5 shrink-0" />
            </button>

            {/* Contact Modal Module */}
            {activeModal === 'contact' && (
              <div className="p-6 md:p-8">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-2xl font-black text-neutral-100 mb-2">Connect with Trap Management</h3>
                    <p className="text-sm text-neutral-400 font-light mb-6">Drop your information below to sign up for next-event priority access notification hooks or business proposals.</p>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <input type="hidden" name="Context" value="VIP Waitlist & Business Hub Setup" />
                      <div>
                        <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase">Your Name</label>
                        <input type="text" name="name" required className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400/50" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase">Contact Email / Phone</label>
                        <input type="text" name="contact_info" required placeholder="name@domain.com or phone" className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400/50" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold text-neutral-400 uppercase">Message / Special Requests</label>
                        <textarea name="message" rows={3} placeholder="Let us know if you're joining the early waitlist or reaching out for business." className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-white text-sm outline-none focus:border-amber-400/50 resize-none"></textarea>
                      </div>
                      <button type="submit" className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase text-xs tracking-wider transition-all">
                        Submit Request
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <CheckCircle2 className="h-12 w-12 text-amber-400 mx-auto" />
                    <h4 className="text-xl font-bold text-white uppercase">Request Received</h4>
                    <p className="text-xs text-neutral-400">
                      Your entry is reserved at the box office please say <span className="text-amber-400 font-bold">"Trap Guestlist"</span> and enter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModal(null);
                        setIsSubmitted(false);
                      }}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-neutral-800 text-white font-bold text-xs uppercase"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
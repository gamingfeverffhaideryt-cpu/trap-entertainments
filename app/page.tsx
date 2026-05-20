"use client";
import { useEffect, useState, useRef } from "react";
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

// High-performance viewport reveal tracking hook
function UseScrollReveal() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroScale = Math.max(0.88, 1 - scrollY / 2500);
  const heroOpacity = Math.max(0, 1 - scrollY / 700);
  const heroBlur = Math.min(10, scrollY / 90); 

  const eventsHeaderReveal = UseScrollReveal();
  const eventsGridReveal = UseScrollReveal();
  const aboutReveal = UseScrollReveal();
  const serviceHeaderReveal = UseScrollReveal();
  const servicesGridReveal = UseScrollReveal();

  const upcomingEvents = [
    {
      id: 1,
      title: "DAYTONA",
      day: "Friday Night",
      date: "May 22, 2026",
      timing: "9:00 pm",
      venue: "Cavore, Ashok Nagar",
      features: ["The producers of the famous afro song Addicted are playing their exclusive set. Submit your names to reserve your spot on the exclusive guestlist."]
    },
  ];

  const handleOpenBooking = (eventTitle = "General Event Access") => {
    setSelectedEvent(eventTitle);
    setActiveModal('book');
  };

  return (
    <div className={`min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-black transition-opacity duration-1000 ease-out overlay-scroll-fix ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Top-Right Interactive Sticky Instagram Handle (Using Native SVG to prevent build errors) */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6 flex justify-end">
        <a 
          href="https://www.instagram.com/trap.entz/"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/50 border border-neutral-800/60 backdrop-blur-md text-xs md:text-sm font-semibold tracking-wide text-neutral-200 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:text-amber-400 hover:border-amber-500/40 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] active:scale-95 group shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-transform duration-500 group-hover:rotate-12 shrink-0"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          <span>@trap.entz</span>
        </a>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 md:py-0 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/15 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-92 w-92 rounded-full bg-yellow-600/5 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />

        <div 
          className="relative z-10 max-w-4xl w-full will-change-transform transform transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: `scale(${heroScale}) translateY(${scrollY * 0.05}px)`,
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`
          }}
        >
          <p className="mb-4 flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.5em] text-amber-400 font-bold tracking-widest">
            Trap Entertainment
          </p>
          <img
            src="/logo.png"
            alt="Trap Ent Logo"
            className="mx-auto mb-6 md:mb-8 w-36 md:w-52 drop-shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(245,158,11,0.55)]"
          />
          <h1 className="text-4xl font-black leading-tight md:text-7xl tracking-tight text-neutral-100">
            Bangalore's Next-Level
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 mt-2">
              Premium Nightlife
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base md:text-xl text-neutral-400 leading-relaxed font-light px-2">
            Exclusive nightlife experiences, top-tier DJ acts, custom college events, and luxury club hosting across Bangalore.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full max-w-md mx-auto sm:max-w-none">
            <a
              href="#event"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("event")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-8 py-4 text-base md:text-lg font-bold text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform active:scale-95 active:shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              <Ticket className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-12" />
              Book Events
            </a>

            <button 
              type="button"
              onClick={() => alert("Our comprehensive photo gallery is launching soon! Follow our Instagram for real-time recaps.")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-500/20 bg-neutral-900/40 px-8 py-4 text-base md:text-lg font-semibold backdrop-blur-sm transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) text-amber-400 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black hover:border-transparent hover:scale-[1.04] active:scale-95"
            >
              <ImageIcon className="h-5 w-5 shrink-0" />
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section (Positioned Above About Us) */}
      <section id="event" className="mx-auto max-w-6xl px-6 py-24 border-t border-amber-500/5">
        <div 
          ref={eventsHeaderReveal.elementRef}
          className={`mb-12 md:mb-16 text-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${
            eventsHeaderReveal.isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
            Upcoming Events
          </p>
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-100">
            Secure Immediate Entry
          </h2>
        </div>

        <div 
          ref={eventsGridReveal.elementRef}
          className={`grid gap-8 md:grid-cols-2 justify-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${
            eventsGridReveal.isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-12"
          }`}
        >
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-black p-6 md:p-8 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:border-amber-500/40 hover:scale-[1.02] max-w-xl w-full mx-auto shadow-[0_0_50px_rgba(0,0,0,0.85)] hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]"
            >
              <div>
                <span className="inline-block mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs uppercase font-bold tracking-wider text-amber-400">
                  {event.day}
                </span>

                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">{event.title}</h3>
                
                <div className="mt-4 space-y-2 text-neutral-400 font-light">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Calendar className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {event.features.map((feature, idx) => (
                    <span key={idx} className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-3.5 text-xs text-neutral-400 leading-relaxed font-light block shadow-inner">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                type="button"
                onClick={() => handleOpenBooking(event.title)}
                className="mt-6 md:mt-8 w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3.5 font-bold text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:scale-[1.01] active:scale-95 active:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] text-sm md:text-base"
              >
                Reserve Spot via Guestlist
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutReveal.elementRef}
        className={`mx-auto max-w-6xl px-6 py-24 border-t border-amber-500/5 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${
          aboutReveal.isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              About Us
            </p>
            <h2 className="text-3xl font-bold md:text-5xl tracking-tight leading-tight text-neutral-100">
              We Design Architecture,
              <span className="block text-amber-400 mt-1 font-light">Not Just Bashes.</span>
            </h2>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-amber-500/20 pt-6 md:pt-0 pl-0 md:pl-8">
            <p className="text-base md:text-lg leading-7 md:leading-8 text-neutral-400 font-light">
              Trap Entertainment is a premium lifestyle collective built for the modern nightlife enthusiast. 
              We curate global electronic music acts, high-energy college properties, and VIP club configurations—uniting Bangalore's elite night crowds under signature concepts.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-b from-neutral-950 to-neutral-900/50 px-6 py-24 border-y border-amber-500/5 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div 
            ref={serviceHeaderReveal.elementRef}
            className={`mb-12 md:mb-16 text-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${
              serviceHeaderReveal.isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"
            }`}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
              What We Do
            </p>
            <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-100">
              Curated Event Standards
            </h2>
          </div>

          <div 
            ref={servicesGridReveal.elementRef}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: <PartyPopper className="h-6 w-6 text-amber-400 shrink-0" />,
                title: 'Club Parties',
                desc: 'A-grade luxury nightlife modules matching exceptional production standards with exclusive target clubs.',
              },
              {
                icon: <Users className="h-6 w-6 text-amber-400 shrink-0" />,
                title: 'College Events',
                desc: 'Custom high-volume cultural takeovers, vibrant orientation events, and scaled premium student entertainment.',
              },
              {
                icon: <Music className="h-6 w-6 text-amber-400 shrink-0" />,
                title: 'Artist Rosters',
                desc: 'Bespoke independent lineup curation, global production touring properties, and strategic booking operations.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`group rounded-3xl border border-neutral-800 bg-neutral-950/50 p-6 md:p-8 shadow-2xl backdrop-blur transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${
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

      {/* Contact Call-to-Action */}
      <section className="bg-neutral-950 border-t border-amber-500/10 relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/15 via-black to-black opacity-80" />
        
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
            Ready To Party?
          </h2> 

          <p className="mt-4 md:mt-6 text-base md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed font-light">
            Contact Trap Entertainment for elite brand alignments, night bookings, sponsorship structures, and premium student festivals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 px-4">
            <button 
              type="button"
              onClick={() => setActiveModal('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 px-8 py-4 text-base md:text-lg font-bold text-black transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-amber-500/10"
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

      {/* Shared Interactive Modal Wrapper */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 transition-all duration-300 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl border border-amber-500/20 bg-neutral-950 p-6 md:p-8 shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-300 ease-out">
            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-amber-400 transition-colors p-1 z-10"
            >
              <X className="h-6 w-6 shrink-0" />
            </button>

            {activeModal === 'book' ? (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-1 tracking-tight">Reserve Guestlist</h3>
                <p className="text-xs md:text-sm text-neutral-400 mb-4 font-light">Booking request for: <strong className="text-white font-medium">{selectedEvent || "General Access"}</strong></p>
                
                <form 
                  action="https://formspree.io/f/mwvzvjge"
                  method="POST"
                  className="space-y-4"
                >
                  <input type="hidden" name="Event Title" value={selectedEvent || "General Access"} />

                  <div>
                    <label className="mb-1 block text-xs md:text-sm font-medium text-neutral-300">
                      Male Name
                    </label>
                    <input
                      type="text"
                      name="maleName"
                      required
                      placeholder="Enter male guest name"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs md:text-sm font-medium text-neutral-300">
                      Female Name
                    </label>
                    <input
                      type="text"
                      name="femaleName"
                      required
                      placeholder="Enter female guest name"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-white outline-none focus:border-amber-400 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1 font-medium">
                      Phone Number (WhatsApp)
                    </label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 text-sm transition-all" 
                      placeholder="+91 XXXXX XXXXX" 
                    />
                  </div>
                  
                  <button type="submit" className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3.5 font-bold text-black transition hover:scale-[1.01] active:scale-95 text-sm">
                    Submit Request
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-1 tracking-tight">Let's Collaborate</h3>
                <p className="text-xs md:text-sm text-neutral-400 mb-4 font-light">Drop us a line and team Trap will orchestrate your next concept.</p>
                
                <form 
                  action="https://formspree.io/f/mwvzvjge"
                  method="POST"
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Email Address</label>
                    <input required type="email" name="email" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-sm" placeholder="name@domain.com" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Inquiry Type</label>
                    <select name="inquiryType" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-sm">
                      <option>Artist Booking / Lineup</option>
                      <option>College Fest Pitch</option>
                      <option>Brand Sponsor Sponsorship</option>
                      <option>Other Collaboration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Message Details</label>
                    <textarea name="message" rows={3} required className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-sm placeholder-neutral-600" placeholder="Tell us about your strategy/event plans..."></textarea>
                  </div>
                  <button type="submit" className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 py-3.5 font-bold text-black transition hover:scale-[1.01] active:scale-95 text-sm">
                    Send Message
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
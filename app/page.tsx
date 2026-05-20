"use client";
import { useEffect } from "react";
import React, { useState } from 'react';
import { 
  Ticket, 
  Image as ImageIcon, 
  Sparkles, 
  PartyPopper, 
  Music, 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  Instagram,
  X 
} from 'lucide-react';

export default function TrapEntertainmentsWebsite() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for controlling user interactive modals
  const [activeModal, setActiveModal] = useState<string | null>(null); 
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Structured upcoming events array
  const upcomingEvents = [
    {
      id: 1,
      title: "DAYTONA",
      day: "Friday Night",
      date: "May 22, 2026",
      venue: "Cavore, Ashok Nagar",
      features: ["The producers of the famous afro song Addicted are playing their exclusive set, submit your names to reserve your name in the exclusive guestlist."]
    },
  ];

  const handleOpenBooking = (eventTitle = "General Event Access") => {
    setSelectedEvent(eventTitle);
    setActiveModal('book');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Hero Section */}
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-92 w-92 rounded-full bg-purple-800/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.4em] text-purple-400 font-semibold">
            <Sparkles className="h-4 w-4" /> Trap Entertainments
          </p>
          
          <img
            src="/logo.png"
            alt="Trap Ent Logo"
            className="mx-auto mb-8 w-40 md:w-52 drop-shadow-[0_0_25px_rgba(255,215,0,0.35)]"
          />
          
          <h1 className="text-5xl font-black leading-tight md:text-7xl tracking-tight">
            Bangalore's Next-Level
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500">
              Party Experience
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl leading-relaxed">
            Exclusive nightlife events, DJ nights, college parties, luxury club
            experiences, and unforgettable entertainment.
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
              className="group flex items-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
            >
              <Ticket className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Book Events
            </a>

            <button 
              type="button"
              onClick={() => alert("Our comprehensive photo gallery is launching soon! Follow our Instagram for real-time recaps.")}
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-[1.02]"
            >
              <ImageIcon className="h-5 w-5" />
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
              About Us
            </p>
            <h2 className="text-4xl font-bold md:text-5xl tracking-tight leading-tight">
              We Create Experiences,
              <span className="block text-purple-500 mt-1">Not Just Parties.</span>
            </h2>
          </div>

          <div className="border-l-2 border-purple-600/30 pl-0 md:pl-8">
            <p className="text-lg leading-8 text-gray-300">
              Trap Entertainments is a youth-driven entertainment organization
              focused on premium nightlife, artist collaborations, music events,
              and unforgettable social experiences. From high-energy DJ nights
              to curated luxury events, we bring Bangalore's nightlife crowd together under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-neutral-900/40 to-neutral-900/20 px-6 py-24 border-y border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
              What We Do
            </p>
            <h2 className="text-4xl font-bold md:text-5xl tracking-tight">
              Events That Hit Different
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <PartyPopper className="h-6 w-6 text-purple-400" />,
                title: 'Club Parties',
                desc: 'Premium nightlife experiences with top-tier DJs at the most exclusive venues across Bangalore.',
              },
              {
                icon: <Users className="h-6 w-6 text-purple-400" />,
                title: 'College Events',
                desc: 'Youth-focused cultural festivals, high-energy freshers bashes, and tailored campus entertainment.',
              },
              {
                icon: <Music className="h-6 w-6 text-purple-400" />,
                title: 'Artist Collaborations',
                desc: 'Live performances, independent artist showcases, influencer guest appearances, and music agency partnerships.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1"
              >
                <div className="mb-5 inline-block rounded-2xl bg-purple-950/50 p-4 border border-purple-500/20 group-hover:bg-purple-900/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight">{item.title}</h3>
                <p className="leading-7 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="event" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
            Upcoming Events
          </p>
          <h2 className="text-4xl font-bold md:text-5xl tracking-tight">
            Catch The Next Wave
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 justify-center">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/30 via-black to-black p-8 transition-all duration-300 hover:border-purple-500/30 w-full max-w-xl mx-auto"
            >
              <div>
                <span className="inline-block mb-4 rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs uppercase font-semibold tracking-wider text-purple-300">
                  {event.day}
                </span>

                <h3 className="text-3xl font-black tracking-tight text-yellow-400">{event.title}</h3>
                
                <div className="mt-4 space-y-2 text-gray-300">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-purple-400 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  {event.features.map((feature, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/5 rounded-lg p-3 text-xs leading-relaxed text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                type="button"
                onClick={() => handleOpenBooking(event.title)}
                className="mt-8 w-full rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-black transition-all duration-200 hover:bg-purple-600 hover:text-white"
              >
                Reserve Spot via Guestlist
              </button>
            </div>
          ))}
        </div>
      </section>

      {
"use client";

import { useState, useEffect } from "react";

export default function TrapEntertainmentWebsite() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero Parallax Calculations
  const heroScale = Math.max(0.85, 1 - scrollY * 0.0008);
  const heroOpacity = Math.max(0, 1 - scrollY * 0.002);
  const heroBlur = Math.min(12, scrollY * 0.02);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Trap Entertainment Logo" className="h-8 w-auto" />
          <span className="text-sm font-bold tracking-widest uppercase text-amber-500">
            TRAP ENTERTAINMENT
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-neutral-400">
          <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
          <a href="#events" className="hover:text-amber-400 transition-colors">Events</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
        </nav>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-300 transition-all hover:border-amber-500/50 hover:text-amber-400"
        >
          <div className="relative">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
          </div>
          <span className="ml-2">Instagram</span>
        </a>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
      >
        <div className="absolute inset-0 z-0 bg-neutral-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl" />

        <div
          className="relative z-10 max-w-4xl w-full text-center transition-all duration-300 will-change-transform"
          style={{
            transform: `scale(${heroScale}) translateY(${scrollY * 0.05}px)`,
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`
          }}
        >
          <p className="mb-4 flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.5em] text-amber-500">
            Trap Entertainment Presents
          </p>

          <img
            src="/logo.png"
            alt="Trap Entertainment"
            className="mx-auto h-auto max-w-[280px] md:max-w-md drop-shadow-[0_0_35px_rgba(245,158,11,0.2)]"
          />

          <p className="mt-6 text-sm md:text-base text-neutral-400 max-w-xl mx-auto tracking-wide">
            Curating night culture, live acts, and soundscapes across prime venues.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-neutral-100">
            Upcoming <span className="text-amber-500">Events</span>
          </h2>
          <p className="mt-2 text-neutral-400 text-sm tracking-widest uppercase">
            Experience the sound live
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* EVENT 1 */}
          <div className="group relative flex flex-col rounded-3xl border border-neutral-900 bg-neutral-900/20 shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]">
            <div className="relative w-full h-[460px] bg-neutral-950 flex flex-col justify-between p-6 overflow-hidden">
              <img
                src="/saturday-edit.png"
                alt="The Saturday Edit Poster"
                className="absolute inset-0 w-full h-full object-contain object-center transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] pointer-events-none will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/95 z-10" />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
                Saturday Night
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wider text-neutral-100">
                The Saturday Edit
              </h3>
              <p className="text-xs text-neutral-400">
                Exclusive live sets, premium atmosphere, and bass-heavy lineups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 text-center text-xs text-neutral-500 tracking-wider">
        <p>© {new Date().getFullYear()} TRAP ENTERTAINMENT. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
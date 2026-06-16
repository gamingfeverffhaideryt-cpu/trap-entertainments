// app/page.tsx - Optimized Current Event Section

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      
      {/* Background Poster Container - Behind Everything */}
      <div className="absolute inset-0 z-0 w-full h-full opacity-35 sm:opacity-40 md:opacity-50">
        <img 
          src="/naak.png" 
          alt="naaK Event Poster" 
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px] md:blur-0 transition-all duration-700 select-none pointer-events-none"
        />
        {/* Cyberpunk Vignette/Overlays to smoothly blend the poster into the deep black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
      </div>

      {/* Content Layer (Sits safely on top of the poster image due to z-10) */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 select-none">
        
        {/* Premium Amber Cyberpunk Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] md:text-xs font-mono tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Live Event
        </div>

        {/* Dynamic Text Headers */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase font-sans selection:bg-amber-400 selection:text-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          naaK
        </h1>
        
        {/* Date Container */}
        <div className="flex flex-col items-center space-y-2 font-mono">
          <p className="text-2xl md:text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 drop-shadow-sm">
            FRIDAY 16TH – 19TH
          </p>
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Bangalore Nightlife • Trap Entertainment
          </p>
        </div>

        {/* CTA Buttons - Hooked to your dynamic booking modal state */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center px-4">
          <button className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-black tracking-widest rounded-none uppercase transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:shadow-[0_0_40px_rgba(251,191,36,0.45)] cursor-pointer">
            Book Guestlist
          </button>
        </div>

      </div>

      {/* Decorative Cyberpunk UI lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
    </section>
  );
}
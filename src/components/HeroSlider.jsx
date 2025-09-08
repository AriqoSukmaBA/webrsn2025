// src/components/HeroSlider.jsx
import React, { useEffect, useRef, useState } from "react";

const SLIDES = [
  { img: "/assets/rs-nindhita-building.jpg" }, // 0
  { img: "/assets/hero-2.jpg" },               // 1
  { img: "/assets/hero-3.jpg" },               // 2
  { img: "/assets/hero-4.jpg" },               // 3
  { img: "/assets/hero-5.jpg" },               // 4
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const t = useRef();
  const wrapRef = useRef(null);

  // === Inject CSS: Ken Burns + full-bleed helper ===
  useEffect(() => {
    if (document.getElementById("kb-style")) return;
    const s = document.createElement("style");
    s.id = "kb-style";
    s.textContent = `
      @keyframes kbInOutA { 
        0% { transform: scale(1) translate3d(0,0,0); }
        100% { transform: scale(1.12) translate3d(0,0,0); }
      }
      @keyframes kbInOutB { 
        0% { transform: scale(1.12) translate3d(0,0,0); }
        100% { transform: scale(1) translate3d(0,0,0); }
      }
      .kb-animate-a {
        animation: kbInOutA 8s ease-in-out infinite alternate;
        will-change: transform;
        transform-origin: center center;
      }
      .kb-animate-b {
        animation: kbInOutB 8s ease-in-out infinite alternate;
        will-change: transform;
        transform-origin: center center;
      }
      /* Helper agar section menabrak padding container dan selebar viewport */
      .full-bleed {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
      }
    `;
    document.head.appendChild(s);
  }, []);

  // ===== Autoplay (pause on hover / when tab hidden)
  useEffect(() => {
    const start = () => { clearInterval(t.current); t.current = setInterval(next, 3000); };
    const stop  = () => clearInterval(t.current);
    start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const el = wrapRef.current;
    if (el) { el.addEventListener("mouseenter", stop); el.addEventListener("mouseleave", start); }

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      if (el) { el.removeEventListener("mouseenter", stop); el.removeEventListener("mouseleave", start); }
    };
  }, []);

  const lastTickRef = useRef(Date.now());
  const hoverRef = useRef(false);
  const hiddenRef = useRef(document.hidden);
  const stopWatchdogRef = useRef(false);

  const next = () => setI((p) => (p + 1) % SLIDES.length);
  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const go   = (n) => setI((n + SLIDES.length) % SLIDES.length);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowLeft") prev(); else if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe (mobile)
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    let startX = 0, dx = 0;
    const onStart = (e) => { startX = e.touches?.[0]?.clientX ?? 0; dx = 0; };
    const onMove  = (e) => { dx = (e.touches?.[0]?.clientX ?? 0) - startX; };
    const onEnd   = () => { if (Math.abs(dx) > 50) (dx < 0 ? next() : prev()); };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  // Hover/visibility flags for watchdog
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const onEnter = () => (hoverRef.current = true);
    const onLeave = () => (hoverRef.current = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const onVis = () => (hiddenRef.current = document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => { lastTickRef.current = Date.now(); }, [i]);

  useEffect(() => {
    stopWatchdogRef.current = false;
    const tick = () => {
      if (stopWatchdogRef.current) return;
      const now = Date.now();
      const elapsed = now - lastTickRef.current;
      if (!hoverRef.current && !hiddenRef.current && elapsed > 5200) {
        lastTickRef.current = now;
        requestAnimationFrame(() => next());
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { stopWatchdogRef.current = true; };
  }, []);

  // Untuk hero: paksa semua cover agar benar-benar full-bleed & tidak menyisakan tepi
  const fitClassFor = () => "object-cover";

  return (
    <section
      id="beranda"
      ref={wrapRef}
      role="region"
      aria-label="Slider beranda"
      className="relative select-none full-bleed overflow-hidden"
      style={{ height: "calc(100svh - var(--nav-h))" }} // penuh layar, minus tinggi navbar (sudah dihitung otomatis)
    >
      {/* Slides */}
      {SLIDES.map((s, idx) => {
        const isActive = idx === i;
        const kbClass = idx % 2 === 0 ? "kb-animate-a" : "kb-animate-b";
        return (
          <img
            key={s.img}
            src={s.img}
            alt=""
            className={`absolute inset-0 w-full h-full ${fitClassFor()}
              transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}
              ${isActive ? kbClass : ""}`}
            width="1920"
            height="720"
            fetchPriority={isActive ? "high" : "low"}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        );
      })}

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2
                   bg-black/35 hover:bg-black/50 text-white
                   rounded-full w-10 h-10 flex items-center justify-center
                   focus:outline-none focus:ring-2 focus:ring-white/70"
        aria-label="Sebelumnya"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   bg-black/35 hover:bg-black/50 text-white
                   rounded-full w-10 h-10 flex items-center justify-center
                   focus:outline-none focus:ring-2 focus:ring-white/70"
        aria-label="Berikutnya"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" aria-live="polite">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition
              ${idx === i ? "bg-white scale-100" : "bg-white/60 scale-90 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}

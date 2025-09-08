// src/components/DoctorRow.jsx
import React, { useEffect, useRef, useState } from "react";
import DoctorCard from "../DoctorCard.jsx";

function ArrowLeft({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" />
    </svg>
  );
}
function ArrowRight({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M8.3 18.7a1 1 0 0 1 0-1.4L13.6 12 8.3 6.7A1 1 0 0 1 9.7 5.3l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" />
    </svg>
  );
}

export default function DoctorRow({ doctors = [] }) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // hitung apakah bisa scroll kiri/kanan
  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    const ro = new ResizeObserver(() => updateArrows());

    el.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [doctors?.length]);

  const scrollByStep = (dir = 1) => {
    const el = scrollRef.current;
    if (!el) return;
    // width perkiraan: lebar card (320–360) + gap
    const step = Math.min(360, el.clientWidth * 0.6);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative w-full mt-6">
      {/* Panah kiri */}
      <button
        type="button"
        onClick={() => scrollByStep(-1)}
        disabled={!canLeft}
        aria-label="Scroll kiri"
        className={`hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 
          items-center justify-center w-10 h-10 rounded-full shadow 
          bg-white/90 backdrop-blur border border-slate-200
          hover:bg-white active:scale-95 transition
          ${canLeft ? "" : "opacity-0 pointer-events-none"}`}
      >
        <ArrowLeft />
      </button>

      {/* Panah kanan */}
      <button
        type="button"
        onClick={() => scrollByStep(1)}
        disabled={!canRight}
        aria-label="Scroll kanan"
        className={`hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 
          items-center justify-center w-10 h-10 rounded-full shadow 
          bg-white/90 backdrop-blur border border-slate-200
          hover:bg-white active:scale-95 transition
          ${canRight ? "" : "opacity-0 pointer-events-none"}`}
      >
        <ArrowRight />
      </button>

      {/* Track scroll */}
      <div className="px-2">
        <div
          ref={scrollRef}
          className="
            flex gap-4 md:gap-6 overflow-x-auto pb-3
            snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          style={{ scrollbarWidth: "none" }}
        >
          {/* Hide scrollbar webkit */}
          <style>{`.hide-scroll::-webkit-scrollbar{display:none}`}</style>

          {doctors.map((d, i) => (
            <div key={d.id ?? d.name ?? i} className="snap-start shrink-0">
              {/* min-width card agar baris horizontal */}
              <div className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px]">
                <DoctorCard doctor={d} />
              </div>
            </div>
          ))}

          {/* Spacer kanan */}
          <div className="shrink-0 basis-2 md:basis-4" />
        </div>
      </div>

      {/* Gradient fade kiri/kanan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

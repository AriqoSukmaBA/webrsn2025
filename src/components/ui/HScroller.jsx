import React, { useRef } from "react";

export default function HScroller({ children, className = "" }) {
  const ref = useRef(null);

  const scrollBy = (dx) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      {/* tombol kiri */}
      <button
        type="button"
        aria-label="Geser kiri"
        onClick={() => scrollBy(-360)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
      >
        ‹
      </button>

      {/* rail */}
      <div
        ref={ref}
        className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent
                   -mx-4 px-4 md:mx-0 md:px-0"
        style={{ scrollBehavior: "smooth" }}
      >
        <div
          className="flex gap-4 md:gap-6 pb-2 snap-x snap-mandatory"
          /* penting: gap kecil agar gulir halus */
        >
          {children}
        </div>
      </div>

      {/* tombol kanan */}
      <button
        type="button"
        aria-label="Geser kanan"
        onClick={() => scrollBy(360)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
      >
        ›
      </button>

      {/* fade edges agar elegan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent md:w-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent md:w-10" />
    </div>
  );
}

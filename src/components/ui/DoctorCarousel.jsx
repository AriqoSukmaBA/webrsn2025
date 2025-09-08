import React, { useMemo, useState } from "react";
import DoctorCard from "../DoctorCard.jsx";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function DoctorCarousel({ doctors = [] }) {
  const PER_PAGE = 5; // target 5 per halaman (desktop)
  const pages = useMemo(() => chunk(doctors, PER_PAGE), [doctors]);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i === 0 ? pages.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === pages.length - 1 ? 0 : i + 1));

  if (!doctors?.length) return null;

  return (
    <div className="relative mt-6">
      {/* NAV kiri/kanan */}
      {pages.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Sebelumnya"
            className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-slate-300 bg-white/90 backdrop-blur px-3 py-2 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Berikutnya"
            className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-slate-300 bg-white/90 backdrop-blur px-3 py-2 shadow hover:bg-white"
          >
            ›
          </button>
        </>
      )}

      {/* Halaman aktif */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="grid gap-4 md:gap-6"
          // responsive: mobile 1–2, md 3, lg 4, xl 5 kolom
          style={{
            gridTemplateColumns: "repeat(var(--cols, 1), minmax(0, 1fr))",
          }}
        >
          <style>{`
            @media (min-width: 0px)   {.doctor-cols{--cols:1}}
            @media (min-width: 480px) {.doctor-cols{--cols:2}}
            @media (min-width: 768px) {.doctor-cols{--cols:3}}
            @media (min-width: 1024px){.doctor-cols{--cols:4}}
            @media (min-width: 1280px){.doctor-cols{--cols:5}}
          `}</style>
          <div className="doctor-cols contents">
            {pages[idx].map((d, i) => (
              <DoctorCard key={(d.id ?? d.name) + i} doctor={d} />
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      {pages.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Halaman ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === idx ? "w-6 bg-[var(--rs-primary)]" : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

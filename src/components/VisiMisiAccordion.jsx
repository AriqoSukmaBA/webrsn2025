import React, { useEffect, useRef, useState } from "react";

/* ===== Ikon Mata ===== */
function EyeOpen({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.8"
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
      />
      <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
    </svg>
  );
}
function EyeClosed({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path strokeWidth="1.8" d="M3 3l18 18" />
      <path strokeWidth="1.8" d="M2 12s3.5-6 10-6c1.8 0 3.4.4 4.8 1" />
      <path strokeWidth="1.8" d="M22 12s-3.5 6-10 6c-1.8 0-3.4-.4-4.8-1" />
      <path strokeWidth="1.8" d="M9.5 9.5a3 3 0 0 0 5 5" />
    </svg>
  );
}

/* ===== Panel dengan animasi height + unmount saat closed ===== */
function AnimatedPanel({ open, children, className = "" }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(open);

  // Bila dibuka, pastikan ter‑mount
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Kelola animasi buka/tutup
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Helper next frame
    const raf = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

    if (open) {
      // dari 0 -> auto
      el.style.height = "0px";
      raf(() => {
        el.style.height = el.scrollHeight + "px";
      });
    } else {
      // dari auto/tinggi -> 0
      el.style.height = el.scrollHeight + "px";
      raf(() => {
        el.style.height = "0px";
      });
    }

    const onEnd = (e) => {
      if (e.propertyName !== "height") return;
      if (open) {
        // selesai dibuka, set height auto biar fleksibel
        el.style.height = "auto";
      } else {
        // selesai ditutup, unmount konten biar bener2 hilang
        setMounted(false);
      }
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${className}`}
      style={{ height: open ? "auto" : "0px" }}
      aria-hidden={!open}
    >
      {children}
    </div>
  );
}

/* ===== Ribbon / Tab ===== */
function Tab({ id, active, setActive, title }) {
  const isActive = active === id;
  return (
    <button
      type="button"
      onClick={() => setActive(isActive ? null : id)}
      aria-expanded={isActive}
      aria-controls={`panel-${id}`}
      className={`
        w-full text-left rounded-xl px-3 md:px-4 py-2.5 md:py-3
        bg-gradient-to-r from-[var(--rs-primary)] to-orange-400
        text-white font-semibold shadow-sm
        flex items-center gap-2.5 transition
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-300 focus:ring-offset-white
        ${isActive ? "brightness-100" : "brightness-95 hover:brightness-100"}
        active:scale-[.98]
      `}
    >
      <span className="text-white/95">
        {isActive ? (
          <EyeOpen className="w-[18px] h-[18px]" />
        ) : (
          <EyeClosed className="w-[18px] h-[18px]" />
        )}
      </span>
      <span className="text-[15px] md:text-base tracking-wide">{title}</span>
      <span className="ml-auto opacity-90 text-sm">{isActive ? "▴" : "▾"}</span>
    </button>
  );
}

/* ===== Komponen utama ===== */
export default function VisiMisiAccordion({
  bgSrc = "/assets/bg-rs.jpg",
  doctorSrc = "/assets/direktur.png",
  doctorName = "dr. Abdul Kadir Munsy, Sp.An",
  doctorTitle = "Direktur",
}) {
  const [active, setActive] = useState("visi");

  return (
    <section id="visi-misi" className="relative overflow-hidden">
      {/* Background + overlay */}
      <div className="absolute inset-0">
        <img
          src={bgSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-10 grid lg:grid-cols-12 gap-6 md:gap-8">
        {/* Foto direktur (lebih kecil + sejajar nama) */}
        <div className="lg:col-span-4">
          <div className="inline-block text-center lg:text-left">
            <img
              src={doctorSrc}
              alt={doctorName}
              loading="lazy"
              className="w-36 sm:w-40 md:w-48 lg:w-52 xl:w-56 h-auto drop-shadow-xl select-none pointer-events-none mx-auto lg:mx-0"
            />
            <div className="mt-3">
              <div className="text-slate-900 text-lg md:text-xl font-extrabold leading-none">
                {doctorTitle}
              </div>
              <div className="text-slate-700 text-base md:text-lg font-semibold leading-snug">
                {doctorName}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs + Panel */}
        <div className="lg:col-span-8">
          <div className="space-y-3 max-w-[920px]">
            {/* VISI */}
            <Tab id="visi" active={active} setActive={setActive} title="Visi" />
            <AnimatedPanel
              open={active === "visi"}
              className="rounded-xl bg-white shadow border border-orange-100/70"
            >
              <div
                id="panel-visi"
                className="px-3 md:px-4 py-3 md:py-4 text-slate-700"
              >
                <p className="text-[15px] md:text-[16px] leading-relaxed m-0">
                  Menjadi Rumah Sakit Pilihan Masyarakat.
                </p>
              </div>
            </AnimatedPanel>

            {/* MISI */}
            <Tab id="misi" active={active} setActive={setActive} title="Misi" />
            <AnimatedPanel
              open={active === "misi"}
              className="rounded-xl bg-white shadow border border-orange-100/70"
            >
              <div
                id="panel-misi"
                className="px-3 md:px-4 py-3 md:py-4 text-slate-700"
              >
                <ul className="list-disc pl-5 space-y-1.5 text-[15px] md:text-[16px] m-0">
                  <li>Memberikan Pelayanan Prima Pada Pasien</li>
                  <li>Meningkatkan Profesionalisme Sumber Daya Manusia.</li>
                  <li>
                    Melaksanakan Peningkatan Mutu Berkelanjutan Dalam Pelayanan
                    Kesehatan.
                  </li>
                  <li>Melakukan Inovasi Dalam Jenis Pelayanan Kesehatan.</li>
                </ul>
              </div>
            </AnimatedPanel>

            {/* MAKLUMAT */}
            <Tab
              id="motto"
              active={active}
              setActive={setActive}
              title="Motto"
            />
            <AnimatedPanel
              open={active === "motto"}
              className="rounded-xl bg-white shadow border border-orange-100/70"
            >
              <div
                id="panel-maklumat"
                className="px-3 md:px-4 py-3 md:py-4 text-slate-700"
              >
                <p className="text-[15px] md:text-[16px] leading-relaxed m-0">
                  "SERASI"( Segera, Efektif, Ramah, Aman, Simpatik, dan Indah)
                </p>
              </div>
            </AnimatedPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

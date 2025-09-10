// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import useScrollSpy from "../hooks/useScrollSpy.js";

/* Ikon (tetap disimpan bila diperlukan) */
function AmbulanceIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden
    >
      {/* headband kiri-kanan */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 0-7 7v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 1 7 7v4" />
      {/* ear cups */}
      <rect x="4" y="12" width="4" height="5" rx="1.5" />
      <rect x="16" y="12" width="4" height="5" rx="1.5" />
      {/* mic */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c0 1.66-1.34 3-3 3h-1" />
    </svg>
  );
}

/* ====== DATA ====== */
const LINKS_LEFT = [
  { label: "Beranda", href: "#beranda" },
  {
    label: "Tentang Kami",
    children: [
      { label: "Sejarah Singkat", href: "/sejarah" },
      { label: "Visi, Misi & Motto", href: "/visi-misi" },
      { label: "Struktur Organisasi", href: "/truktur" },
      { label: "Tugas Pokok & Fungsi", href: "/tupoksi" },
      { label: "Indikator Kinerja RS Nindhita", href: "/kinerja" },
      { label: "Indikator Mutu Unit", href: "/mutu" },
      { label: "Survey Kepuasan Pelanggan", href: "/kepuasan" },
      { label: "Laporan Program Pelayanan", href: "/pelayanan" },

    ],
  },
  {
    label: "Pelayanan Medik",
    children: [
      { label: "IGD 24 Jam", href: "/igd" },
      {
        label: "Instalasi Rawat Jalan",
        children: [{ label: "Poli", href: "/poli" }],
      },
      { label: "Instalasi Rawat Inap", href: "/rain" },
      {
        label: "Instalasi Intensive Care",
        children: [
          { label: "ICU", href: "/icu" },
          { label: "NICU", href: "/nicu" },
          { label: "PICU", href: "/picu" },
        ],
      },
      { label: "Instalasi Bedah Central", href: "/ibs" },
    ],
  },
  { label: "Jadwal Dokter", href: "#dokter" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Kontak", href: "#kontak" },
];

const LINKS_RIGHT = [
  {
    label: "Penunjang Medik",
    children: [
      { label: "Instalasi Farmasi", href: "/farmasi" },
      { label: "Instalasi Laboratorium", href: "/lab" },
      { label: "Instalasi Radiologi", href: "/radiologi" },
      { label: "Instalasi Gizi", href: "/gizi" },
      { label: "Instalasi Ambulance & Jenazah", href: "/ambulance-jenazah" },
    ],
  },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDD, setOpenDD] = useState(null); // dropdown level-1 aktif
  const [openSub, setOpenSub] = useState(null); // dropdown level-2 aktif

  // ====== Hover intent timers ======
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openSubTimerRef = useRef(null);
  const closeSubTimerRef = useRef(null);

  const HOVER_OPEN_DELAY = 200;
  const HOVER_CLOSE_DELAY = 200;
  const SUB_OPEN_DELAY = 200;
  const SUB_CLOSE_DELAY = 200;

  const clearTimers = () => {
    [openTimerRef, closeTimerRef, openSubTimerRef, closeSubTimerRef].forEach(
      (r) => {
        if (r.current) {
          clearTimeout(r.current);
          r.current = null;
        }
      }
    );
  };

  const enterMenu = (label) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      setOpenDD(label);
      setOpenSub(null);
    }, HOVER_OPEN_DELAY);
  };
  const leaveMenu = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenDD(null);
      setOpenSub(null);
    }, HOVER_CLOSE_DELAY);
  };
  const enterSub = (label) => {
    if (closeSubTimerRef.current) {
      clearTimeout(closeSubTimerRef.current);
      closeSubTimerRef.current = null;
    }
    if (openSubTimerRef.current) clearTimeout(openSubTimerRef.current);
    openSubTimerRef.current = setTimeout(
      () => setOpenSub(label),
      SUB_OPEN_DELAY
    );
  };
  const leaveSub = () => {
    if (openSubTimerRef.current) {
      clearTimeout(openSubTimerRef.current);
      openSubTimerRef.current = null;
    }
    if (closeSubTimerRef.current) clearTimeout(closeSubTimerRef.current);
    closeSubTimerRef.current = setTimeout(
      () => setOpenSub(null),
      SUB_CLOSE_DELAY
    );
  };

  useEffect(() => () => clearTimers(), []);

  const active = useScrollSpy(
    [
      "beranda",
      "layanan",
      "dokter",
      "fasilitas",
      "berita",
      "kontak",
      "poli",
      "icu",
      "nicu",
      "picu",
      "ibs",
      "farmasi",
      "lab",
      "radiologi",
      "ambulance-jenazah",
    ],
    96
  );

  const toRootHash = (href) => (href?.startsWith("#") ? `/${href}` : href);

  // Smooth anchor click (delegasi)
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        (parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
        ) || 0) -
        8;
      window.scrollTo({ top: y, behavior: "smooth" });
      setOpenDrawer(false);
      setOpenDD(null);
      setOpenSub(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Tutup dropdown saat klik di luar
  const ddRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target)) {
        setOpenDD(null);
        setOpenSub(null);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // ukuran header → CSS var --nav-h
  const headerRef = useRef(null);
  useEffect(() => {
    const applyNavH = () => {
      const h = headerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    applyNavH();
    const ro = new ResizeObserver(applyNavH);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", applyNavH);
    window.addEventListener("orientationchange", applyNavH);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyNavH);
      window.removeEventListener("orientationchange", applyNavH);
    };
  }, []);

  const linkBase =
    "px-2 py-2 relative transition-colors text-slate-800 hover:text-[var(--rs-primary-700)]";
  const underline =
    "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-0.5 after:bg-[var(--rs-primary)] after:rounded-full after:w-0 hover:after:w-6 after:transition-all";
  const activeClass = "text-[var(--rs-primary-700)] after:w-6 hover:after:w-8";

  /** ========= SUBMENU RENDERER (panel oranye, item hover putih tipis) ========= */
  const RenderChildren = ({ items }) => (
    <ul className="py-1 text-sm">
      {items.map((c, idx) => (
        <li
          key={(c.href || c.label) + idx}
          className="relative"
          onMouseEnter={() => enterSub(c.label)}
          onMouseLeave={leaveSub}
        >
          {c.children ? (
            <>
              <div
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 cursor-default"
                aria-haspopup="menu"
                aria-expanded={openSub === c.label}
              >
                <span>{c.label}</span>
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M7.21 14.77a.75.75 0 0 1-.02-1.06L10.94 10 7.19 6.29A.75.75 0 1 1 8.25 5.23l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0z" />
                </svg>
              </div>
              {openSub === c.label && (
                <div
                  className="absolute left-full top-0 ml-1 min-w-[220px] rounded-xl
                             bg-gradient-to-br from-[var(--rs-primary)] to-[var(--rs-primary-700)]
                             text-white shadow-xl z-[70] p-1 ring-1 ring-orange-400/40 border border-orange-400/30"
                  onMouseEnter={() => enterSub(c.label)}
                  onMouseLeave={leaveSub}
                >
                  <ul className="py-1 text-sm">
                    {c.children.map((gc) => (
                      <li key={gc.href || gc.label}>
                        <a
                          className="block px-3 py-2 rounded-lg hover:bg-white/10"
                          href={toRootHash(gc.href)}
                        >
                          {gc.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <a
              className="block px-3 py-2 rounded-lg hover:bg-white/10"
              href={toRootHash(c.href)}
            >
              {c.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  /* ====== URUTAN ====== */
  const ORDERED_LINKS = [
    ...LINKS_LEFT.slice(0, 3),
    ...LINKS_RIGHT,
    ...LINKS_LEFT.slice(3),
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[60]
                 bg-[#fff3e6]/90 supports-[backdrop-filter]:bg-[#fff3e6]/70 backdrop-blur
                 border-b border-orange-100 shadow-sm"
    >
      {/* Top bar */}
      <div className="w-full bg-[var(--rs-primary)] text-white text-sm">
        <div className="px-6 sm:px-12 py-2 flex items-center justify-between">
          <p className="truncate">
            Hotline IGD:{" "}
            <a href="tel:082132780511" className="underline font-semibold">
              (+62) 82132780511
            </a>{" "}
            · Layanan 24 Jam
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div ref={ddRef} className="px-6 sm:px-12 py-2.5 flex items-center gap-6">
        {/* Brand */}
        <a href={toRootHash("#beranda")} className="flex items-center gap-3">
          <img
            src="/assets/logo-nindhita.png"
            alt="Logo Rumah Sakit Nindhita"
            className="h-10 w-auto"
            width="150"
            height="40"
            loading="eager"
            fetchpriority="high"
          />
          <div className="leading-tight block min-w-0">
          <div className="font-bold text-slate-800 tracking-wide text-sm sm:text-base">
            Rumah Sakit Nindhita
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 leading-snug max-w-[50ch] sm:max-w-none break-words">
            To Become The Hospital of Choice For The Community
          </div>
        </div>
        </a>

        {/* NAV DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6 font-medium flex-1">
          {ORDERED_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => enterMenu(link.label)}
                onMouseLeave={leaveMenu}
              >
                <div
                  className={`${linkBase} ${underline} ${
                    openDD === link.label ? activeClass : ""
                  } cursor-default flex items-center gap-1`}
                  aria-haspopup="menu"
                  aria-expanded={openDD === link.label}
                >
                  {link.label}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                  </svg>
                </div>

                {/* PANEL ORANYE */}
                {openDD === link.label && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 min-w-[260px] rounded-2xl
                               bg-gradient-to-br from-[var(--rs-primary)] to-[var(--rs-primary-700)]
                               text-white shadow-xl z-[70] p-1
                               ring-1 ring-orange-400/40 border border-orange-400/30"
                    onMouseEnter={() => enterMenu(link.label)}
                    onMouseLeave={leaveMenu}
                  >
                    <RenderChildren items={link.children} />
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={toRootHash(link.href)}
                className={`${linkBase} ${underline} ${
                  active === link.href?.replace?.("#", "") ? activeClass : ""
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Mobile burger */}
        <button
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 ml-auto"
          onClick={() => setOpenDrawer(true)}
          aria-label="Buka menu"
        >
          <span className="sr-only">Buka menu</span>☰
        </button>
      </div>

      {/* MOBILE DRAWER (versi oranye) */}
{openDrawer && (
  <div>
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={() => setOpenDrawer(false)}
    />
    <aside className="fixed inset-y-0 left-0 w-80 bg-rs-grad text-white shadow-2xl p-5 z-[80] animate-slideIn lg:hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="text-base font-semibold">Menu</div>
        <button
          onClick={() => setOpenDrawer(false)}
          aria-label="Tutup menu"
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <nav className="space-y-3">
        {ORDERED_LINKS.map((l) =>
          l.children ? (
            /* Item level-1 dengan submenu */
            <details
              key={l.label}
              className="rounded-xl overflow-hidden ring-1 ring-orange-400/30"
            >
              <summary
                className="cursor-pointer py-3 px-4 font-semibold tracking-wide
                           rounded-xl text-white bg-[var(--rs-primary)]
                           hover:bg-[var(--rs-primary-700)] transition-colors"
              >
                {l.label}
              </summary>

              {/* ISI level-2 (oranye) */}
              <ul
                className="p-2 text-sm space-y-1 rounded-xl
                           bg-[var(--rs-primary)] text-white
                           ring-1 ring-orange-400/30"
              >
                {l.children.map((c) =>
                  c.children ? (
                    /* Item level-2 yang masih punya submenu */
                    <li key={c.label}>
                      <details className="rounded-lg overflow-hidden">
                        <summary
                          className="cursor-pointer px-3 py-2 rounded-lg font-medium text-white
                                     bg-[var(--rs-primary-700)]
                                     hover:bg-[var(--rs-primary-700)]/90 transition-colors"
                        >
                          {c.label}
                        </summary>

                        {/* ISI level-3 (oranye lebih gelap) */}
                        <ul
                          className="pl-2 py-1 space-y-1 rounded-lg
                                     bg-[var(--rs-primary-700)]/90 text-white"
                        >
                          {c.children.map((gc) => (
                            <li key={gc.href || gc.label}>
                              <a
                                href={toRootHash(gc.href)}
                                className="block px-3 py-2 rounded-lg text-white
                                           hover:bg-[var(--rs-primary-700)] transition-colors"
                              >
                                {gc.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ) : (
                    /* Item level-2 tanpa submenu */
                    <li key={c.href || c.label}>
                      <a
                        href={toRootHash(c.href)}
                        className="block px-3 py-2 rounded-lg text-white
                                   hover:bg-[var(--rs-primary-700)] transition-colors"
                      >
                        {c.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </details>
          ) : (
            /* Item level-1 tanpa submenu (Beranda, Jadwal Dokter, dll.) */
            <a
              key={l.href}
              href={toRootHash(l.href)}
              className="block py-3 px-4 rounded-xl font-semibold text-white
                         bg-[var(--rs-primary)] hover:bg-[var(--rs-primary-700)]
                         ring-1 ring-orange-400/30 transition-colors"
            >
              {l.label}
            </a>
          )
        )}
      </nav>
    </aside>
  </div>
)}

    </header>
  );
}

// src/pages/ServiceLayout.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import BackToTop from "../components/BackToTop.jsx";
import ChatWidget from "../components/ChatWidget.jsx";

/* ====================== NAV DATA (tetap: dipakai utk chip mobile, TIDAK merender sidenav) ====================== */
const MEDIK_LINKS = [
  { title: "IGD 24 Jam", href: "/igd", icon: "flash" },
  {
    title: "Instalasi Rawat Jalan",
    href: "/rawat-jalan",
    icon: "steth",
    children: [{ title: "Poli", href: "/poli", icon: "poli" }],
  },
  { title: "Instalasi Rawat Inap", href: "/rain", icon: "bed" }, // sesuai rute kamu
  {
    title: "Instalasi Intensive Care",
    href: "/intensive-care",
    icon: "monitor",
    children: [
      { title: "ICU", href: "/icu", icon: "icu" },
      { title: "NICU", href: "/nicu", icon: "nicu" },
      { title: "PICU", href: "/picu", icon: "picu" },
    ],
  },
];

/* ====================== ICONS ====================== */
function Icon({ name, className = "w-4 h-4" }) {
  const p = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const M = {
    flash: (
      <svg {...p} viewBox="0 0 24 24">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
    steth: (
      <svg {...p} viewBox="0 0 24 24">
        <path d="M12 19a5 5 0 0 0 5-5V3" />
        <path d="M6 3v11a6 6 0 0 0 12 0" />
        <circle cx="18" cy="5" r="2" />
      </svg>
    ),
    poli: (
      <svg {...p} viewBox="0 0 24 24">
        <path d="M12 2v20" />
        <path d="M5 9h14" />
        <path d="M5 15h14" />
      </svg>
    ),
    bed: (
      <svg {...p} viewBox="0 0 24 24">
        <path d="M2 18V8a2 2 0 0 1 2-2h9a5 5 0 0 1 5 5v7" />
        <path d="M2 14h20" />
      </svg>
    ),
    monitor: (
      <svg {...p} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M7 20h10" />
      </svg>
    ),
    whatsapp: (
      <svg {...p} viewBox="0 0 24 24">
        <path d="M3 21l1.5-4A8.5 8.5 0 1 1 21 12a8.5 8.5 0 0 1-12.5 7.5L3 21z" />
        <path d="M8 12c1 2 3 4 5 5l2-2" />
      </svg>
    ),
  };
  return M[name] ?? null;
}

/* ====== MATIKAN SIDENAV SECARA DEFAULT (bisa dihidupkan per-halaman lewat prop) ====== */
const DEFAULT_SHOW_SIDENAV = false;

/* ====================== LAYOUT ====================== */
export default function ServiceLayout({
  title,
  subtitle,
  heroBadges = [],
  actions = [],
  children,
  showSidenav = DEFAULT_SHOW_SIDENAV, // <<< default OFF
}) {
  const { pathname } = useLocation();
  const flatLinks = React.useMemo(
    () => MEDIK_LINKS.flatMap((i) => [i, ...(i.children || [])]),
    []
  );

  const contentRef = React.useRef(null);

  // === Tambahan: state untuk chat widget global
  const [openChat, setOpenChat] = React.useState(false);
  const ADMIN_WA_E164 = "6285385835878";
  const DOCTOR_WA_E164 = "6282132780511 ";

  React.useEffect(() => {
    if (title) document.title = `${title} · RS Nindhita`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title, pathname]);

  // Scroll reveal ringan
  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll("h2, h3, .reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in")
        );
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    targets.forEach((t) => {
      t.classList.add("reveal");
      io.observe(t);
    });
    return () => io.disconnect();
  }, [pathname]);

  // kelas grid dinamis: 1 kolom jika sidenav OFF
  const gridCols = showSidenav
    ? "xl:grid-cols-[260px,1fr] lg:grid-cols-[260px,1fr]"
    : "grid-cols-1";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-white border rounded px-3 py-2"
      >
        Skip to content
      </a>

      <Navbar />

      {/* HERO */}
      <header
        className="relative overflow-hidden border-b border-orange-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,247,237,.95) 0%, rgba(255,255,255,.9) 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-10 relative">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span>Pelayanan Medik</span>
            <span className="mx-2">/</span>
            <span className="text-slate-800 font-semibold">{title}</span>
          </nav>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-slate-600 max-w-3xl">{subtitle}</p>
          )}

          {!!heroBadges.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {heroBadges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800"
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          {!!actions.length && (
            <div className="mt-5 flex flex-wrap gap-3">
              {actions.map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  target={
                    a.href?.startsWith("http") || a.href?.startsWith("tel:")
                      ? "_blank"
                      : undefined
                  }
                  rel="noreferrer"
                  className={[
                    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition",
                    a.variant === "outline"
                      ? "border border-orange-300 text-orange-700 hover:bg-orange-50"
                      : "bg-orange-500 text-white hover:bg-orange-600",
                  ].join(" ")}
                >
                  {a.icon && <Icon name={a.icon} className="w-4 h-4" />}
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* BODY */}
      <main
        id="main"
        className={`max-w-7xl mx-auto px-4 py-10 grid ${gridCols} gap-8`}
      >
        {/* === SIDENAV DI-NONAKTIFKAN SECARA DEFAULT === */}
        {showSidenav && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-slate-200 p-3 bg-white/80 backdrop-blur-sm shadow-sm">
                {MEDIK_LINKS.map((item) => (
                  <div key={item.href} className="mb-1">
                    <Link
                      to={item.href}
                      className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition text-slate-700 hover:bg-slate-100"
                    >
                      {item.icon && (
                        <Icon name={item.icon} className="w-4 h-4 opacity-80" />
                      )}
                      <span>{item.title}</span>
                    </Link>
                    {item.children?.length ? (
                      <div className="mt-1 ml-2 pl-3 border-l border-slate-200">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            to={c.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
                          >
                            {c.icon && (
                              <Icon
                                name={c.icon}
                                className="w-3.5 h-3.5 opacity-80"
                              />
                            )}
                            <span>{c.title}</span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* CONTENT */}
        <section>
          {/* Quick chips (mobile) tetap ada, tidak mengganggu */}
          <div className="lg:hidden mb-5">
            <div className="flex gap-2 overflow-x-auto">
              {flatLinks.map((it) => (
                <Link
                  key={it.href}
                  to={it.href}
                  className="whitespace-nowrap rounded-full border px-4 py-2 text-sm border-slate-200 text-slate-600"
                >
                  {it.title}
                </Link>
              ))}
            </div>
          </div>

          <div
            ref={contentRef}
            className="prose max-w-none prose-headings:scroll-mt-28"
          >
            {children}
          </div>
        </section>
      </main>


      {/* Tombol chat mengambang (muncul di semua halaman) */}
      {!openChat && (
        <button
          onClick={() => setOpenChat(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-[var(--rs-primary)] text-white"
          aria-label="Buka chat"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
            <img
              src="/assets/ambulance_icon.svg"
              alt="Ambulance"
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
        </button>
      )}

      <BackToTop />

      {/* Widget chat (modal) */}
      <ChatWidget
        open={openChat}
        onClose={() => setOpenChat(false)}
        adminWa={ADMIN_WA_E164}
        doctorWa={DOCTOR_WA_E164}
      />
    </>
  );
}

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * IntensiveCarePage.jsx — interaktif (tema oranye)
 * - Kartu unit ICU/NICU/PICU dengan efek tilt ringan
 * - Highlights fasilitas kritikal
 * - Timeline alur rujukan ke unit intensif
 * - FAQ ringkas
 */

function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(
      x * 5
    ).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-orange-50/50 rounded-2xl"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <span className="text-orange-600 font-bold">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-slate-700">{a}</div>}
    </div>
  );
}

export default function IntensiveCarePage() {
  return (
    <ServiceLayout
      title="Instalasi Intensive Care"
      subtitle="Unit kritikal dengan pemantauan ketat, peralatan lengkap, dan tim multidisiplin 24/7."
      heroBadges={["Critical Care", "Multidisiplin", "24/7 Monitoring"]}
      actions={[
        { label: "Lihat ICU", href: "/icu", icon: "arrow" },
        {
          label: "Lihat NICU",
          href: "/nicu",
          icon: "arrow",
          variant: "outline",
        },
        {
          label: "Lihat PICU",
          href: "/picu",
          icon: "arrow",
          variant: "outline",
        },
      ]}
    >
      {/* UNIT CARDS */}
      <section aria-label="unit intensive" className="reveal">
        <h2>Unit di Bawah Intensive Care</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            {
              to: "/icu",
              label: "ICU",
              badge: "Dewasa",
              desc: "Ventilasi mekanik, pemantauan hemodinamik, terapi intensif.",
            },
            {
              to: "/nicu",
              label: "NICU",
              badge: "Neonatal",
              desc: "Perawatan intensif bayi: respirasi, nutrisi, kontrol suhu.",
            },
            {
              to: "/picu",
              label: "PICU",
              badge: "Pediatrik",
              desc: "Kegawatan anak & monitoring multi-parameter.",
            },
          ].map((u) => (
            <TiltCard key={u.to}>
              <Link
                to={u.to}
                className="block rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition relative overflow-hidden"
              >
                <div className="absolute inset-x-0 -top-10 h-20 bg-gradient-to-b from-orange-100/70 to-transparent opacity-0 hover:opacity-100 transition" />
                <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                  {u.badge}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{u.label}</h3>
                <p className="mt-1 text-sm text-slate-700">{u.desc}</p>
                <span className="inline-flex items-center gap-1 text-orange-700 font-semibold mt-3">
                  Lihat detail →
                </span>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mt-10" aria-label="fasilitas unggulan">
        <h2>Fasilitas & Kapabilitas</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Monitoring 24/7",
              "Monitor multi-parameter tiap bed, alarm terintegrasi.",
            ],
            [
              "Respiratory Support",
              "Ventilator, HFNC/CPAP (sesuai unit), terapi oksigen.",
            ],
            [
              "Infusion & Medication",
              "Infusion pump, syringe pump, manajemen sedasi/analgesia.",
            ],
            [
              "Isolation & Safety",
              "Ruang isolasi sesuai indikasi dan protokol pencegahan infeksi.",
            ],
            [
              "Tim Multidisiplin",
              "Dokter intensifis, perawat terlatih, farmasi & nutrisionis.",
            ],
            [
              "Komunikasi Keluarga",
              "Update klinis terjadwal, edukasi & informed consent jelas.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE RUJUKAN */}
      <section className="mt-10" aria-label="alur rujukan">
        <h2>Alur Rujukan ke Intensive Care</h2>
        <ol className="relative border-l-2 border-orange-200 pl-6 space-y-5">
          {[
            [
              "Identifikasi Kasus",
              "Dokter IGD/ruangan menilai kebutuhan perawatan intensif.",
            ],
            [
              "Stabilisasi Awal",
              "Airway-Breathing-Circulation, obat emergensi bila perlu.",
            ],
            [
              "Koordinasi Unit",
              "Konfirmasi ketersediaan bed & persiapan ruang/alat.",
            ],
            [
              "Transfer Aman",
              "Prosedur pemindahan pasien sesuai protokol keselamatan.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="reveal">
              <div
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-orange-400"
                style={{ boxShadow: "0 0 0 6px rgba(255,148,35,.12)" }}
              />
              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4">
                <div className="text-xs font-semibold text-orange-700">
                  Langkah {i + 1}
                </div>
                <div className="font-semibold text-slate-900">{t}</div>
                <p className="text-sm text-slate-700 mt-1">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-10" aria-label="faq">
        <h2>Pertanyaan Umum</h2>
        <div className="not-prose space-y-3">
          <FAQItem
            q="Apakah semua pengunjung boleh masuk ke ICU/NICU/PICU?"
            a="Kunjungan dibatasi sesuai kondisi pasien dan kebijakan kontrol infeksi. Mohon ikuti arahan perawat."
          />
          <FAQItem
            q="Bagaimana jadwal informasi untuk keluarga?"
            a="Tim akan memberikan update rutin; gunakan nomor kontak yang disediakan perawat jaga."
          />
          <FAQItem
            q="Bisakah pindah antar unit intensif?"
            a="Penentuan unit berdasarkan kondisi klinis dan kriteria medis; perpindahan mengikuti penilaian dokter."
          />
        </div>
      </section>
    </ServiceLayout>
  );
}

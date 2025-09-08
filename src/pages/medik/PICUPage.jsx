import React, { useRef, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * PICUPage.jsx — interaktif (tema oranye)
 * - Fokus perawatan intensif anak
 * - Kartu layanan dengan tilt ringan
 * - Komunikasi keluarga (#komunikasi)
 * - Keselamatan & privasi + FAQ
 */

function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(
      x * 6
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
  const [open, setOpen] = useState(false);
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

export default function PICUPage() {
  return (
    <ServiceLayout
      title="PICU"
      subtitle="Perawatan intensif untuk pasien anak dengan pemantauan ketat, perangkat pediatrik, dan dukungan keluarga."
      heroBadges={[
        "Pediatric Critical Care",
        "Multi-discipline",
        "Family-Friendly",
      ]}
    >
      {/* LAYANAN UNGGULAN */}
      <section aria-label="layanan" className="reveal">
        <h2>Layanan Unggulan PICU</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            {
              t: "Manajemen Jalan Napas Anak",
              d: "Pendekatan pediatrik untuk jalan napas sulit, dukungan oksigen/ventilasi sesuai ukuran anak.",
            },
            {
              t: "Monitoring Multi-Parameter",
              d: "Monitor dengan ukuran manset/akses pediatrik: EKG, SpO₂, NIBP, respirasi.",
            },
            {
              t: "Sedasi & Nyeri",
              d: "Protokol sedasi/analgesia yang aman untuk pasien anak.",
            },
          ].map((c) => (
            <TiltCard key={c.t}>
              <div className="rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition">
                <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                  PICU
                </div>
                <h3 className="text-lg font-bold text-slate-900">{c.t}</h3>
                <p className="mt-1 text-sm text-slate-700">{c.d}</p>
                <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* KOLOBRASI & TIM */}
      <section className="mt-10" aria-label="kolaborasi tim">
        <h2>Kolaborasi Multidisiplin</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Dokter Anak & Intensivis",
              "Penilaian klinis terpadu & keputusan terapi intensif.",
            ],
            [
              "Perawat Terlatih PICU",
              "Monitoring ketat & tindakan sesuai protokol pediatrik.",
            ],
            [
              "Farmasi, Gizi, Rehabilitasi",
              "Optimasi terapi obat, nutrisi, dan mobilisasi dini.",
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

      {/* KOMUNIKASI & PENDAMPINGAN */}
      <section
        id="komunikasi"
        className="mt-10"
        aria-label="komunikasi keluarga"
      >
        <h2>Komunikasi & Pendampingan Keluarga</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Update Terjadwal</h3>
            <p className="text-sm text-slate-700 mt-1">
              Tim memberikan update kondisi secara rutin; pastikan nomor
              keluarga aktif.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Edukasi & Informed Consent</h3>
            <p className="text-sm text-slate-700 mt-1">
              Penjelasan tindakan, risiko, dan target perawatan dengan bahasa
              yang mudah dipahami.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Kebijakan Pendamping</h3>
            <p className="text-sm text-slate-700 mt-1">
              Pendampingan menyesuaikan kondisi pasien & jam kunjung unit; ikuti
              arahan perawat.
            </p>
          </div>
        </div>
      </section>

      {/* KESELAMATAN & PRIVASI */}
      <section className="mt-10" aria-label="keselamatan & privasi">
        <h2>Keselamatan & Privasi</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Kontrol Infeksi",
              "Hand hygiene, skrining pengunjung, APD sesuai kebutuhan.",
            ],
            [
              "Alarm & Keselamatan",
              "Alarm terintegrasi & protokol eskalasi cepat.",
            ],
            [
              "Privasi Anak & Keluarga",
              "Pembatasan foto/rekaman; hormati privasi selama tindakan.",
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

      {/* FAQ */}
      <section className="mt-10" aria-label="faq">
        <h2>Pertanyaan Umum</h2>
        <div className="not-prose space-y-3">
          <FAQItem
            q="Apakah orang tua boleh masuk ke ruang PICU?"
            a="Kunjungan diatur ketat. Ikuti jadwal dan instruksi dari perawat jaga."
          />
          <FAQItem
            q="Apakah boleh membawa mainan/alat hiburan?"
            a="Bisa sesuai kebijakan unit, dengan memperhatikan kebersihan & keselamatan alat."
          />
          <FAQItem
            q="Bagaimana bila ingin konsultasi tambahan?"
            a="Sampaikan ke perawat; tim akan mengatur waktu konsultasi dengan dokter penanggung jawab."
          />
        </div>
      </section>
    </ServiceLayout>
  );
}

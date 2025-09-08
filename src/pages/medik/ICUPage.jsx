import React, { useEffect, useRef, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * ICUPage.jsx — interaktif (tema oranye)
 * - Stat counter animasi
 * - Kartu layanan dengan tilt ringan
 * - Grid fasilitas (glass look)
 * - Protokol kunjungan (#protokol) + FAQ ringkas
 */

function Stat({ label, value, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value);
    const dur = 900;
    const t0 = performance.now();
    const raf = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [value]);
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-orange-200/70 bg-white/80 backdrop-blur-sm px-4 py-3">
      <div className="text-2xl font-extrabold text-slate-900">
        {n}
        {suffix}
      </div>
      <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mt-0.5">
        {label}
      </div>
    </div>
  );
}

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

export default function ICUPage() {
  return (
    <ServiceLayout
      title="ICU"
      subtitle="Intensive Care Unit untuk pasien dewasa dengan kondisi kritis; pemantauan 24/7 dan dukungan ventilasi."
      heroBadges={["Critical Care", "Monitoring 24/7", "Ventilator-Ready"]}
    >
      {/* STATS */}
      <section aria-label="statistik" className="reveal">
        <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Bed ICU" value={7} />
          <Stat label="Ventilator" value={4} />
          <Stat label="Monitor Bedside" value={7} />
          <Stat label="24/7" value={24} suffix="/7" />
        </div>
      </section>

      {/* LAYANAN */}
      <section className="mt-8" aria-label="layanan">
        <h2>Layanan Unggulan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            {
              t: "Pemantauan Hemodinamik",
              d: "Pengawasan tekanan darah invasif/non-invasif, nadi, SpO₂, EKG kontinu.",
            },
            {
              t: "Dukungan Respirasi",
              d: "Ventilasi mekanik, terapi oksigen, manajemen jalan napas sulit.",
            },
            {
              t: "Sedasi & Analgesia",
              d: "Kontrol nyeri & kenyamanan sesuai protokol ICU.",
            },
          ].map((c) => (
            <TiltCard key={c.t}>
              <div className="rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition">
                <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                  ICU
                </div>
                <h3 className="text-lg font-bold text-slate-900">{c.t}</h3>
                <p className="mt-1 text-sm text-slate-700">{c.d}</p>
                <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* FASILITAS */}
      <section className="mt-10" aria-label="fasilitas">
        <h2>Fasilitas</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Monitor multi-parameter tiap bed",
              "EKG, SpO₂, NIBP/IBP, suhu, respirasi",
            ],
            ["Ventilator & suction", "Dukungan respirasi invasif/non-invasif"],
            ["Infusion & syringe pump", "Akurasi pemberian cairan & obat"],
            ["Ruang isolasi", "Sesuai indikasi & protokol infeksi"],
            [
              "Laboratorium & radiologi terhubung",
              "Percepatan penegakan diagnosis",
            ],
            ["Tim multidisiplin", "Intensivis, perawat, farmasi, gizi, rehab"],
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

      {/* PROTOKOL KUNJUNGAN */}
      <section id="protokol" className="mt-10" aria-label="protokol kunjungan">
        <h2>Protokol Kunjungan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Jam Kunjungan</h3>
            <p className="text-sm text-slate-700 mt-1">
              Terbatas & terjadwal. Silakan konfirmasi ke perawat jaga sebelum
              datang.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Kebersihan & APD</h3>
            <p className="text-sm text-slate-700 mt-1">
              Cuci tangan/hand rub sebelum & sesudah kunjungan, gunakan APD
              sesuai instruksi.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Privasi & Keselamatan</h3>
            <p className="text-sm text-slate-700 mt-1">
              Batasi penggunaan ponsel & rekaman. Ikuti arahan tim saat tindakan
              berlangsung.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10" aria-label="faq">
        <h2>Pertanyaan Umum</h2>
        <div className="not-prose space-y-3">
          <FAQItem
            q="Apakah keluarga boleh menemani di ICU?"
            a="Pendampingan sangat terbatas dan disesuaikan dengan kondisi klinis serta kebijakan kontrol infeksi."
          />
          <FAQItem
            q="Bagaimana cara mendapatkan update kondisi pasien?"
            a="Tim perawatan akan memberi informasi terjadwal. Cantumkan nomor keluarga aktif untuk komunikasi."
          />
          <FAQItem
            q="Apakah bisa video call?"
            a="Sesuai kondisi pasien dan kebijakan unit; mohon koordinasi dengan perawat jaga."
          />
        </div>
      </section>
    </ServiceLayout>
  );
}

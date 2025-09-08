import React, { useEffect, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/* Ring progress animasi */
function Ring({ value = 90, label = "IKM" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setV((x) => (x >= value ? value : i));
      if (i >= value) clearInterval(id);
    }, 12);
    return () => clearInterval(id);
  }, [value]);

  const R = 36,
    C = 2 * Math.PI * R,
    off = C - (v / 100) * C;
  return (
    <div className="hover-lift">
      <div className="flex items-center gap-5">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={R}
            stroke="#fee2c0"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r={R}
            stroke="#f97316"
            strokeWidth="10"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={off}
            strokeLinecap="round"
            transform="rotate(-90 48 48)"
            className="ring-stroke"
          />
        </svg>
        <div>
          <div className="text-3xl font-extrabold">{v}%</div>
          <div className="text-slate-600 text-sm">{label}</div>
        </div>
      </div>
    </div>
  );
}

/* Bar progress animasi */
function BarRow({ q, val }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setW(val));
    return () => cancelAnimationFrame(raf);
  }, [val]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-sm text-slate-600">{q}</div>
      <div className="relative flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 bar-anim"
          style={{ width: `${w}%` }}
          title={`${val}%`}
        />
        <div className="absolute -top-6 right-0 text-xs font-semibold">
          {val}%
        </div>
      </div>
    </div>
  );
}

const QUARTER = [
  { q: "2024-Q3", val: 88 },
  { q: "2024-Q4", val: 90 },
  { q: "2025-Q1", val: 91 },
  { q: "2025-Q2", val: 93 },
];

export default function KepuasanPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Survey Kepuasan Pelanggan"
      subtitle="Indeks kepuasan dan umpan balik pasien untuk perbaikan berkelanjutan."
      heroBadges={["IKM", "Voice of Customer", "Continuous Improvement"]}
    >
      {/* Hasil Terkini */}
      <section className="reveal">
        <div className="section-card orange-ambient">
          <h2>Hasil Terkini</h2>
          <div className="not-prose grid sm:grid-cols-3 gap-6 mt-2">
            <Ring value={93} label="IKM (Overall)" />
            <Ring value={95} label="Sikap & Empati" />
            <Ring value={90} label="Kecepatan Layanan" />
          </div>
        </div>
      </section>

      {/* Tren Triwulan */}
      <section className="mt-6 reveal">
        <div className="section-card">
          <h2>Tren Triwulan</h2>
          <div className="not-prose space-y-3 mt-2">
            {QUARTER.map((r) => (
              <BarRow key={r.q} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Survei */}
      <section id="isi" className="mt-6 reveal">
        <div className="section-card">
          <h2>Ikut Tinggalkan Penilaian</h2>
          <p className="not-prose text-slate-800 mt-1">
            Suara Anda penting bagi kami. Isi kuesioner singkat (±2 menit) untuk
            membantu peningkatan layanan.
          </p>
          <a
            href="https://forms.gle/xxx" /* ganti dgn link form asli */
            target="_blank"
            rel="noreferrer"
            className="btn-genz inline-flex items-center gap-2 mt-4 px-4 py-3 rounded-2xl font-semibold hover:shadow"
          >
            Isi Survei Sekarang <span>→</span>
          </a>
        </div>
      </section>
    </ServiceLayout>
  );
}

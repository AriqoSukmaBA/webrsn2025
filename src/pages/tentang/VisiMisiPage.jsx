import React, { useEffect, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/** Lingkar progres ringkas (tanpa lib) */
function StatRing({ value = 80, label = "Kinerja" }) {
  const R = 34; // radius
  const C = 2 * Math.PI * R; // keliling
  const off = C - (value / 100) * C;
  return (
    <div className="glass rounded-2xl p-5 glow-border hover-lift">
      <div className="flex items-center gap-5">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r={R}
            stroke="#fee2c0"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="44"
            cy="44"
            r={R}
            stroke="#f97316"
            strokeWidth="10"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={off}
            strokeLinecap="round"
            transform="rotate(-90 44 44)"
          />
        </svg>
        <div>
          <div className="text-3xl font-extrabold">{value}%</div>
          <div className="text-slate-600 text-sm">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function VisiMisiPage() {
  const [tab, setTab] = useState("visi");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <ServiceLayout
      title="Visi, Misi & Motto"
      subtitle="Menjadi rumah sakit pilihan masyarakat—bermutu, cepat, empatik."
      heroBadges={["Safety", "Quality", "Service Excellence"]}
    >
      {/* Tabs */}
      <section className="reveal">
        <div className="not-prose w-full overflow-x-auto">
          <div className="inline-flex gap-2 p-1 bg-slate-100 rounded-2xl">
            {[
              ["visi", "Visi"],
              ["misi", "Misi"],
              ["nilai", "Motto & Nilai"],
            ].map(([k, t]) => (
              <button
                key={k}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${
                  tab === k
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-600 hover:bg-white/60"
                }`}
                onClick={() => setTab(k)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          {tab === "visi" && (
            <div className="not-prose rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 glow-border">
              <p className="text-xl md:text-2xl font-bold text-slate-900">
                “Menjadi Rumah Sakit Terpercaya dan Pilihan Masyarakat.”
              </p>
            </div>
          )}
          {tab === "misi" && (
            <div className="not-prose grid md:grid-cols-2 gap-4">
              {[
                "Memberikan layanan prima pada pasien.",
                "Meningkatkan profesional sumber daya manusia",
                "Melaksanakan peningkatan mutu berkelanjutan dalam pelayanan kesehatan.",
                "Melakukan inovasi dalam jenis pelayanan kesehatan",
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover-lift"
                >
                  <p className="text-slate-800">{m}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "nilai" && (
            <>
              <div className="flex flex-wrap gap-2 not-prose">
                {["Tujuan Umum : Meningkatkan derajat kesehatan masyarakat","Tujuan Khusus : Melaksanakan pelayanan prima yang 'SERASI'(Segera, Efektif, Ramah, Aman, Simpatik dan Indah)"].map(
                  (v) => (
                    <span key={v} className="badge-soft">
                      {v}
                    </span>
                  )
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-4 not-prose">
                <StatRing value={92} label="Kepuasan Pasien" />
                <StatRing value={88} label="Respon IGD" />
                <StatRing value={96} label="Kepatuhan Protap" />
              </div>
            </>
          )}
        </div>
      </section>
    </ServiceLayout>
  );
}

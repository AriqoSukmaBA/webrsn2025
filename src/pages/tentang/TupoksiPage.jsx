import React, { useMemo, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

const DATA = [
  {
    group: "Manajemen",
    items: [
      "Perencanaan strategis, mutu & keselamatan pasien (PMKP).",
      "Perizinan, regulasi, dan akreditasi rumah sakit.",
      "Audit internal & peningkatan berkelanjutan.",
    ],
  },
  {
    group: "Pelayanan Medik",
    items: [
      "Penyelenggaraan IGD, Rawat Jalan, Rawat Inap, Intensive Care.",
      "Tata kelola klinis & kolaborasi multidisiplin.",
    ],
  },
  {
    group: "Keperawatan",
    items: [
      "Asuhan keperawatan berfokus pada pasien.",
      "Manajemen SDM, kompetensi & jadwal dinas.",
    ],
  },
  {
    group: "Penunjang Medik",
    items: [
      "Laboratorium, Radiologi, Farmasi, Gizi, Rehabilitasi Medik, CSSD.",
      "Pengendalian infeksi (PPI) & K3RS.",
    ],
  },
  {
    group: "Umum & Keuangan",
    items: [
      "Sarana-prasarana, IT & SIMRS, keamanan & kebersihan.",
      "Keuangan, pengadaan, hubungan BPJS/Asuransi.",
    ],
  },
];

export default function TupoksiPage() {
  const [q, setQ] = useState("");
  const filter = useMemo(() => q.trim().toLowerCase(), [q]);

  return (
    <ServiceLayout
      title="Tugas Pokok & Fungsi"
      subtitle="Kerangka tugas setiap unit untuk pelayanan yang aman, efektif, dan berkesinambungan."
      heroBadges={["SOP", "PMKP", "PPI"]}
    >
      {/* Search/filter */}
      <section className="reveal">
        <div className="not-prose flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-400"
            placeholder="Cari tupoksi… (mis. ‘PPI’, ‘SIMRS’, ‘IGD’)"
          />
          <button
            className="btn-genz btn-ripple px-4 py-3 rounded-2xl"
            onMouseDown={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--x",
                `${e.clientX - r.left}px`
              );
              e.currentTarget.style.setProperty(
                "--y",
                `${e.clientY - r.top}px`
              );
            }}
          >
            Cari
          </button>
        </div>
      </section>

      <section className="mt-6 reveal">
        <h2>Rincian Tupoksi</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {DATA.map(({ group, items }) => {
            const filtered = items.filter((x) =>
              x.toLowerCase().includes(filter)
            );
            if (filter && filtered.length === 0) return null;
            return (
              <div
                key={group}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover-lift"
              >
                <h3 className="font-semibold">{group}</h3>
                <ul className="mt-2 text-sm text-slate-700 list-disc pl-5 space-y-1">
                  {(filter ? filtered : items).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 reveal">
        <h2>Dokumen & SOP Terkait</h2>
        <div className="not-prose flex flex-wrap gap-2">
          {[
            "SOP IGD",
            "SOP Rawat Jalan",
            "SOP Radiologi",
            "Panduan PPI",
            "Kebijakan PMKP",
          ].map((d) => (
            <span key={d} className="badge-soft">
              {d}
            </span>
          ))}
        </div>
      </section>
    </ServiceLayout>
  );
}

// src/pages/tentang/KinerjaPage.jsx
import React, { useMemo } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/** Data contoh – ganti dengan angka real bila sudah ada */
const KPI = [
  {
    key: "bor",
    name: "BOR (Bed Occupancy Rate)",
    unit: "%",
    value: 65,
    targetNote: "60–85%",
  },
  {
    key: "alos",
    name: "ALOS (Average Length of Stay)",
    unit: "hari",
    value: 2.2,
    targetNote: "3–6 hari",
  },
  {
    key: "bto",
    name: "BTO (Bed Turn Over)",
    unit: "kali",
    value: 21.4,
    targetNote: "≥ 40",
  },
  {
    key: "toi",
    name: "TOI (Turn Over Interval)",
    unit: "hari",
    value: 1.4,
    targetNote: "1–3 hari",
  },
  {
    key: "ndr",
    name: "NDR (Net Death Rate)",
    unit: "‰",
    value: 0,
    targetNote: "≤ 2‰",
  },
  {
    key: "gdr",
    name: "GDR (Gross Death Rate)",
    unit: "‰",
    value: 1.05,
    targetNote: "≤ 45‰",
  },

  {
    key: "mmr",
    name: "MMR (Maternal Mortality Rate)",
    unit: "/100.000 KH",
    value: 0,      
    targetNote: "≤ 183/100.000 KH",
  },
  {
    key: "imr",
    name: "IMR (Infant Mortality Rate)",
    unit: "/1.000 KH",
    value: 1,            
    targetNote: "≤ 25/1.000 KH",
  },
];

function Chip({ ok, children }) {
  return (
    <span
      className={`px-2 py-1 text-[11px] rounded-full font-semibold
      ${ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
    >
      {children}
    </span>
  );
}
function Bar({ percent = 0 }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

export default function KinerjaPage() {
  // evaluasi sederhana: yang “range/ambang” pakai aturan singkat
  const evalKpi = useMemo(() => {
    /** mapping aturan singkat per indikator */
    const rule = {
      bor: (v) => v >= 60 && v <= 85,
      alos: (v) => v >= 3 && v <= 6,
      bto: (v) => v >= 40,
      toi: (v) => v >= 1 && v <= 3,
      ndr: (v) => v <= 2,
      gdr: (v) => v <= 45,
      // ===== Tambahan =====
      mmr: (v) => v <= 183, // target contoh nasional; silakan sesuaikan target RS
      imr: (v) => v <= 25,  // target contoh; silakan sesuaikan target RS/daerah
    };
    return KPI.map((k) => ({ ...k, ok: rule[k.key]?.(k.value) ?? true }));
  }, []);

  return (
    <ServiceLayout
      nav="about"
      title="Indikator Kinerja RS Nindhita"
btitle="Ringkasan Key Performance Indicators (KPI) rumah sakit sebagai gambaran mutu layanan."
      heroBadges={["BOR/ALOS/BTO/TOI", "NDR/GDR", "Januari - Juni 2025"]}
    >
      <section className="reveal">
        <h2>Ringkasan KPI</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {evalKpi.map((k) => (
            <div
              key={k.key}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {k.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    Target: {k.targetNote}
                  </div>
                </div>
                <Chip ok={k.ok}>{k.ok ? "On Target" : "Perlu Perbaikan"}</Chip>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="text-2xl font-extrabold text-slate-900">
                  {k.value}
                  {k.unit}
                </div>
                <div className="flex-1">
                  <Bar
                    percent={
                      k.key === "bor"
                        ? k.value
                        : k.key === "bto"
                        ? Math.min(100, (k.value / 60) * 100)
                        : k.key === "toi"
                        ? 100 - Math.min(100, (Math.abs(2 - k.value) / 2) * 100)
                        : k.key === "alos"
                        ? 100 -
                          Math.min(100, (Math.abs(4.5 - k.value) / 3) * 100)
                        : k.key === "ndr" || k.key === "gdr"
                        ? 100 -
                          Math.min(
                            100,
                            (k.value / (k.key === "ndr" ? 2 : 45)) * 100
                          )
                        : k.key === "mmr"
                        ? 100 - Math.min(100, (k.value / 183) * 100)
                        : k.key === "imr"
                        ? 100 - Math.min(100, (k.value / 25) * 100)
                        : 50
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 reveal">
        <h2>Definisi Singkat</h2>
        <div className="not-prose overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-orange-50 text-slate-900">
              <tr>
                <th className="text-left px-4 py-3">Indikator</th>
                <th className="text-left px-4 py-3">Definisi</th>
                <th className="text-left px-4 py-3">Target Umum</th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-white [&>tr:nth-child(odd)]:bg-slate-50">
              <tr>
                <td className="px-4 py-3 font-semibold">BOR</td>
                <td className="px-4 py-3">
                  Persentase pemakaian tempat tidur pada periode tertentu.
                </td>
                <td className="px-4 py-3">60–85%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">ALOS</td>
                <td className="px-4 py-3">Rata-rata lama rawat pasien.</td>
                <td className="px-4 py-3">3–6 hari</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">BTO</td>
                <td className="px-4 py-3">
                  Frekuensi penggunaan tempat tidur.
                </td>
                <td className="px-4 py-3">≥ 40 kali</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">TOI</td>
                <td className="px-4 py-3">
                  Rata-rata hari tempat tidur kosong sebelum terisi kembali.
                </td>
                <td className="px-4 py-3">1–3 hari</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">NDR</td>
                <td className="px-4 py-3">
                  Kematian ≥48 jam/rawat inap per 1.000 pasien keluar (‰).
                </td>
                <td className="px-4 py-3">≤ 2‰</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">GDR</td>
                <td className="px-4 py-3">
                  Kematian total per 1.000 pasien keluar (‰).
                </td>
                <td className="px-4 py-3">≤ 45‰</td>
              </tr>

              {/* ===== Tambahan definisi MMR & IMR ===== */}
              <tr>
                <td className="px-4 py-3 font-semibold">MMR</td>
                <td className="px-4 py-3">
                  Angka kematian ibu per 100.000 kelahiran hidup (KH).
                </td>
                <td className="px-4 py-3">≤ 183/100.000 KH</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">IMR</td>
                <td className="px-4 py-3">
                  Angka kematian bayi (&lt;1 tahun) per 1.000 kelahiran hidup.
                </td>
                <td className="px-4 py-3">≤ 25/1.000 KH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ServiceLayout>
  );
}

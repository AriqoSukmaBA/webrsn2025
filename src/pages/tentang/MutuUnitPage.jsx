import React, { useMemo, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

const DATA = {
  IGD: [
    {
      ind: "Waktu Tanggap Triase Merah",
      target: "≤ 5 menit",
      hasil: "3 menit",
    },
    {
      ind: "Waktu Tunggu Dokter Umum",
      target: "≤ 30 menit",
      hasil: "18 menit",
    },
    { ind: "Kepatuhan Hand Hygiene", target: "≥ 90%", hasil: "93%" },
  ],
  "Rawat Jalan": [
    { ind: "Waktu Tunggu Pendaftaran", target: "≤ 10 menit", hasil: "7 menit" },
    { ind: "Waktu Tunggu Obat", target: "≤ 30 menit", hasil: "24 menit" },
    { ind: "Kepatuhan Identifikasi Pasien", target: "≥ 95%", hasil: "98%" },
  ],
  "Rawat Inap": [
    { ind: "Kepatuhan Bundle PPI", target: "≥ 90%", hasil: "92%" },
    { ind: "Pressure Injury baru", target: "0 kasus", hasil: "0 kasus" },
    { ind: "Pemberian Edukasi Saat Pulang", target: "≥ 95%", hasil: "97%" },
  ],
  Radiologi: [
    {
      ind: "Waktu Pemberian Hasil X-Ray",
      target: "≤ 60 menit",
      hasil: "45 menit",
    },
    {
      ind: "Keselamatan Radiasi (KAR)",
      target: "100% patuh",
      hasil: "100% patuh",
    },
  ],
  Farmasi: [
    { ind: "Ketepatan Peracikan", target: "≥ 99%", hasil: "99.6%" },
    { ind: "Ketersediaan Obat Esensial", target: "≥ 95%", hasil: "97%" },
  ],
};

function Row({ ind, target, hasil }) {
  const ok = useMemo(() => {
    // evaluasi sangat sederhana berdasarkan angka persentase/menit
    const toNum = (t) => parseFloat(String(t).replace(/[^\d.]/g, "")) || 0;
    if (target.includes("≥")) return toNum(hasil) >= toNum(target);
    if (target.includes("≤")) return toNum(hasil) <= toNum(target);
    if (target.includes("0 kasus")) return toNum(hasil) === 0;
    return true;
  }, [target, hasil]);
  return (
    <tr className="border-b last:border-none">
      <td className="px-4 py-3">{ind}</td>
      <td className="px-4 py-3 text-slate-600">{target}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
          ${ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {hasil} {ok ? "✓" : "!"}
        </span>
      </td>
    </tr>
  );
}

export default function MutuUnitPage() {
  const units = Object.keys(DATA);
  const [unit, setUnit] = useState(units[0]);
  const list = DATA[unit] || [];

  return (
    <ServiceLayout
      nav="about"
      title="Indikator Mutu Unit"
      subtitle="Monitoring indikator mutu di tiap unit layanan RS Nindhita."
      heroBadges={[
        "Real-time Update",
        "PPI & Keselamatan",
        "Service Excellence",
      ]}
    >
      <section className="reveal">
        <div className="not-prose flex items-center gap-3">
          <label className="text-sm text-slate-600">Pilih Unit</label>
          <select
            className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {units.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="not-prose mt-4 overflow-x-auto">
          <table className="min-w-[680px] w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-orange-50 text-slate-900">
              <tr>
                <th className="text-left px-4 py-3">Indikator</th>
                <th className="text-left px-4 py-3">Target</th>
                <th className="text-left px-4 py-3">Hasil Terbaru</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {list.map((r) => (
                <Row key={r.ind} {...r} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 reveal">
        <h2>Catatan Perbaikan</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {[
            [
              "Pelatihan Hand Hygiene",
              "Refreshment bulanan untuk semua unit klinis.",
            ],
            [
              "Optimasi Alur Obat",
              "Sinkronisasi SIMRS & stok farmasi untuk mempercepat waktu tunggu.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover-lift"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </ServiceLayout>
  );
}

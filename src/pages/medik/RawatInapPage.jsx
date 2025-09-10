
import React, { useEffect, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";


function useRIInjectStyles() {
  useEffect(() => {
    if (document.getElementById("ri-styles")) return;
    const el = document.createElement("style");
    el.id = "ri-styles";
    el.textContent = `
      .card-glow { position: relative; }
      .card-glow::before { content:""; position:absolute; inset:-1px; z-index:-1; border-radius:1.5rem; background:linear-gradient(135deg, rgba(255,159,67,.5), rgba(255,88,0,.4)); filter:blur(8px); opacity:.35; transition:opacity .3s ease; pointer-events:none; }
      .card-glow:hover::before { opacity:.6; }
      .pill { display:inline-block; border:1px solid rgba(251,146,60,.5); color:#9a3412; padding:.35rem .7rem; border-radius:999px; font-size:11px; font-weight:600; margin:.125rem; background:rgba(255,247,237,.8); }
      .tab { padding:.5rem 1rem; border-radius: .75rem; font-weight:700; font-size: .9rem; }
    `;
    document.head.appendChild(el);
  }, []);
}

const CLASSES = {
  VVIP: {
    desc: "Suite privat dengan ruang lebih luas, kenyamanan maksimal untuk pasien & keluarga.",
    amenities: [
      "Kamar suite privat",
      "Bed elektrik premium",
      "AC, Smart TV, kulkas mini",
      "Sofa bed tamu + meja kerja",
      "Pantry & dispenser",
      "Kamar mandi dalam + water heater",
      "Nurse call & monitoring",
      "Makan pasien terjadwal",
    ],
  },
  VIP: {
    desc: "Kamar luas untuk privasi maksimal dengan fasilitas premium.",
    amenities: [
      "Kamar privat + sofa tamu",
      "Bed elektrik, AC, TV, kulkas mini",
      "Kamar mandi dalam + water heater",
      "Nurse call & monitoring",
      "Makan pasien terjadwal",
    ],
  },
  "Kelas I": {
    desc: "Kenyamanan tinggi dengan jumlah bed terbatas.",
    amenities: [
      "2 bed per kamar",
      "Bed elektrik, AC, TV bersama",
      "Kamar mandi dalam",
      "Nurse call & monitoring",
    ],
  },
  "Kelas II": {
    desc: "Pilihan ekonomis dengan layanan aman dan standar.",
    amenities: [
      "3 bed per kamar",
      "Bed standar dan AC ",
      "Kamar mandi dalam",
      "Nurse call",
    ],
  },
  "Kelas III": {
    desc: "Terjangkau untuk kebutuhan perawatan dasar yang nyaman.",
    amenities: [
      "4 bed per kamar",
      "Bed standar dan AC",
      "Kamar mandi dalam",
      "Nurse call",
    ],
  },
};

function ClassTabs({ value, onChange }) {
  const items = Object.keys(CLASSES);
  return (
    <div className="inline-flex border border-orange-200 bg-white/80 backdrop-blur-sm rounded-2xl p-1">
      {items.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          className={[
            "tab btn-ripple",
            value === k
              ? "bg-orange-500 text-white"
              : "text-slate-700 hover:bg-orange-50",
          ].join(" ")}
          aria-pressed={value === k}
        >
          {k}
        </button>
      ))}
    </div>
  );
}

export default function RawatInapPage() {
  useRIInjectStyles();
  // tetap default ke VIP (tidak diubah)
  const [kelas, setKelas] = useState("VIP");
  const data = CLASSES[kelas];

  return (
    <ServiceLayout
      title="Instalasi Rawat Inap"
      subtitle="Perawatan komprehensif dengan pilihan kelas & fasilitas nyaman."
      heroBadges={["Nyaman", "Aman", "Terstandar"]}
    >
      {/* PILIHAN KELAS */}
      <section aria-label="kelas perawatan" className="reveal">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="m-0">Pilih Kelas Perawatan</h2>
          <ClassTabs value={kelas} onChange={setKelas} />
        </div>

        <div className="not-prose mt-4 grid md:grid-cols-3 gap-4">
          {/* Deskripsi kelas terpilih */}
          <div className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 md:col-span-2">
            <div className="text-xs font-semibold text-orange-700 mb-1">
              {kelas}
            </div>
            <h3 className="font-semibold">{data.desc}</h3>
            <div className="mt-2">
              {data.amenities.map((a) => (
                <span key={a} className="pill">
                  {a}
                </span>
              ))}
            </div>
          </div>

        {/* Info cepat */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-50 to-white p-5">
            <h3 className="font-semibold">Info Cepat</h3>
            <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
              <li>
                Proses admisi melalui <b>Loket Rawat Inap</b>.
              </li>
              <li>Jam kunjung menyesuaikan kebijakan unit & kondisi pasien.</li>
              <li>Fasilitas bisa berbeda sesuai ketersediaan.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PERBANDINGAN RINGKAS */}
      <section className="mt-10" aria-label="perbandingan kelas">
        <h2>Perbandingan Fasilitas</h2>
        <div className="not-prose overflow-x-auto">
          <table className="min-w-[820px] w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-slate-700">
                <th className="py-3">Fitur</th>
                {Object.keys(CLASSES).map((k) => (
                  <th key={k} className="py-3">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                //     VVIP                VIP                 Kelas I   Kelas II       Kelas III
                ["Privasi",             ["Suite Privat",     "Privat",  "Tinggi",      "Sedang",       "Dasar"]],
                ["Jumlah Bed/Kamar",    ["1 (suite)",        "1",       "2–3",         "3–4",          "4–6"]],
                ["Kamar Mandi",         ["Dalam + heater",   "Dalam + heater", "Dalam", "Dalam",  "Dalam"]],
                ["AC/TV & Fasilitas",   ["AC + Smart TV + Kulkas + Pantry", "AC + TV Pribadi", "AC + TV Bersama", "Kipas/AC Bersama", "—"]],
              ].map(([fitur, cols]) => (
                <tr key={fitur} className="border-t border-slate-200">
                  <td className="py-3 font-semibold text-slate-900">{fitur}</td>
                  {cols.map((c, i) => (
                    <td key={i} className="py-3 text-slate-700">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TIMELINE ALUR OPNAME */}
      <section className="mt-10" aria-label="alur opname">
        <h2>Alur Opname</h2>
        <ol className="relative border-l-2 border-orange-200 pl-6 space-y-5">
          {[
            ["Indikasi dari Dokter","Dokter penanggung jawab menentukan perlunya rawat inap."],
            ["Administrasi","Verifikasi dokumen & pilihan kelas perawatan."],
            ["Penempatan Kamar","Pasien diarahkan ke kamar sesuai ketersediaan."],
            ["Perawatan & Monitoring","Tindakan medis, pemberian obat, observasi berkala."],
            ["Edukasi Pulang","Panduan obat, kontrol, serta tanda bahaya."],
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

      {/* KEBIJAKAN KUNJUNGAN */}
      <section className="mt-10" aria-label="kebijakan kunjungan">
        <h2>Kebijakan Kunjungan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          <div className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Jam Kunjung</h3>
            <p className="text-sm text-slate-700 mt-1">
              Mengikuti kebijakan unit perawatan; mohon konfirmasi ke perawat jaga.
            </p>
          </div>
          <div className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Kebersihan & APD</h3>
            <p className="text-sm text-slate-700 mt-1">
              Cuci tangan/hand rub sebelum & sesudah kunjungan. Gunakan APD sesuai instruksi.
            </p>
          </div>
          <div className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Jumlah Pengunjung</h3>
            <p className="text-sm text-slate-700 mt-1">
              Dibatasi sesuai kondisi klinis pasien & kapasitas ruangan.
            </p>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}

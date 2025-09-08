
import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * LaporanProgramPage.jsx
 * - Tema selaras dengan halaman “Tentang” lain (ServiceLayout + .reveal)
 * - Ringkasan program (kartu), capaian KPI mini, tabel daftar laporan, dan rencana tindak lanjut
 * - Semua link unduh masih placeholder (#) — tinggal ganti ke file PDF asli
 */

function StatMini({ label, value, unit = "", help, percent = 0 }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 hover:shadow-sm transition">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="mt-1 flex items-end gap-2">
        <div className="text-2xl font-extrabold text-slate-900">
          {value}
          <span className="text-sm font-bold ml-0.5">{unit}</span>
        </div>
        {help ? <div className="text-xs text-slate-500">{help}</div> : null}
      </div>
      <div className="mt-3 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
          style={{ width: `${p}%` }}
        />
      </div>
    </div>
  );
}

function Badge({ children, tone = "ok" }) {
  const map = {
    ok: "bg-green-100 text-green-700",
    warn: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${map[tone] || map.ok}`}>
      {children}
    </span>
  );
}

export default function LaporanProgramPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Laporan Program Pelayanan"
      subtitle="Ikhtisar pelaksanaan program, capaian mutu, serta rencana tindak lanjut lintas instalasi di RS Nindhita."
      heroBadges={["Transparan", "Berbasis Data", "Continuous Improvement"]}
    >
      {/* RINGKASAN PROGRAM */}
      <section className="reveal">
        <h2>Ringkasan Program</h2>
        <div className="not-prose grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              t: "IGD 24 Jam",
              d: "Peningkatan waktu tanggap, triase, serta koordinasi antar unit.",
              s: "On track",
              tone: "ok",
            },
            {
              t: "Rawat Jalan",
              d: "Pendaftaran online Mobile JKN, edukasi pasien & manajemen antrian.",
              s: "On track",
              tone: "ok",
            },
            {
              t: "Rawat Inap",
              d: "Peningkatan BOR seimbang, pengendalian ALOS & keselamatan pasien.",
              s: "Perlu monitoring",
              tone: "warn",
            },
            {
              t: "Radiologi",
              d: "Standard persiapan, keselamatan radiasi, SLA hasil.",
              s: "On track",
              tone: "ok",
            },
            {
              t: "Laboratorium",
              d: "Kendali mutu internal, TAT pemeriksaan, komunikasi hasil kritis.",
              s: "On track",
              tone: "ok",
            },
            {
              t: "Gizi",
              d: "Skrining risiko malnutrisi & intervensi nutrisi terarah.",
              s: "On track",
              tone: "ok",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition"
            >
              <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                Program
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">{c.t}</h3>
                <Badge tone={c.tone}>{c.s}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-700">{c.d}</p>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
            </div>
          ))}
        </div>
      </section>

      {/* CAPAIAN UTAMA (KPI MINI) */}
      <section className="mt-10 reveal">
        <h2>Capaian Utama</h2>
        <div className="not-prose grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatMini label="BOR" value={65} unit="%" help="Target 60–85%" percent={74} />
          <StatMini label="ALOS" value={2.2} unit="hr" help="Target 3–6 hr" percent={76} />
          <StatMini label="Waktu Tanggap IGD" value={7} unit="mnt" help="Target ≤10 mnt" percent={90} />
          <StatMini label="Kepuasan Pasien" value={93} unit="%" help="IKM" percent={93} />
        </div>
      </section>

      {/* DAFTAR LAPORAN / DOKUMEN */}
      <section id="unduh" className="mt-10 reveal">
        <h2>Daftar Laporan</h2>
        <div className="not-prose overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-orange-50 text-slate-900">
              <tr>
                <th className="text-left px-4 py-3 w-36">Periode</th>
                <th className="text-left px-4 py-3">Judul</th>
                <th className="text-left px-4 py-3 w-48">Instalasi</th>
                <th className="text-left px-4 py-3 w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-white [&>tr:nth-child(odd)]:bg-slate-50">
              {[
                ["2025-Q2", "Laporan Program Pelayanan Medik Triwulan 2", "IGD • Rawat Inap • Penunjang"],
                ["2025-Q1", "Laporan Program Pelayanan Medik Triwulan 1", "Rawat Jalan • Radiologi • Gizi"],
                ["2024", "Laporan Tahunan Program Pelayanan Medik", "Semua Instalasi"],
              ].map(([p, j, i], idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 font-semibold">{p}</td>
                  <td className="px-4 py-3">{j}</td>
                  <td className="px-4 py-3">{i}</td>
                  <td className="px-4 py-3">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 rounded-xl border border-orange-300 px-3 py-1.5 font-semibold text-orange-700 hover:bg-orange-50"
                      title="Unduh PDF"
                    >
                      
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-7 2h14v2H5z" />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RENCANA TINDAK LANJUT */}
      <section className="mt-10 reveal">
        <h2>Rencana Tindak Lanjut</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold text-slate-900">Perbaikan Proses</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Optimasi alur triase IGD dan *fast track* kasus ringan.</li>
              <li>Penguatan edukasi & *reminder* kontrol pasien rawat jalan.</li>
              <li>Implementasi *bed management* harian untuk kendali BOR/ALOS.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold text-slate-900">Keselamatan & Mutu</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Audit kepatuhan *hand hygiene* & pelaporan insiden KTD/KNC.</li>
              <li>Pengendalian waktu tunggu hasil penunjang (lab/radio).</li>
              <li>Review kasus mortalitas/morbiditas lintas disiplin.</li>
            </ul>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}

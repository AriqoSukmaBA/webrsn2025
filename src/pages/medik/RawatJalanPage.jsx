import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * RawatJalanPage.jsx — interaktif & modern (tema oranye)
 * Fitur:
 * - Quick Action ribbon (CTA) dengan ripple
 * - Tabs: Pendaftaran JKN vs. Loket (offline)
 * - Stepper timeline dengan glow accent
 * - Kartu "Pelayanan Populer" bergaya glass + gradient border
 * - Grid Persyaratan (JKN / Umum)
 * - FAQ accordion
 */

// inject style lokal (glow/gradient border)
function useRJInjectStyles() {
  useEffect(() => {
    if (document.getElementById("rj-styles")) return;
    const el = document.createElement("style");
    el.id = "rj-styles";
    el.textContent = `
      .card-glow { position: relative; }
      .card-glow::before {
        content: ""; position: absolute; inset: -1px; z-index: -1; border-radius: 1.5rem;
        background: linear-gradient(135deg, rgba(255,159,67,.5), rgba(255,88,0,.4));
        filter: blur(8px); opacity: .35; transition: opacity .3s ease; pointer-events:none;
      }
      .card-glow:hover::before { opacity: .6; }
      .step-dot { box-shadow: 0 0 0 6px rgba(255,148,35,.12); }
    `;
    document.head.appendChild(el);
  }, []);
}

function Tabs({ value, onChange }) {
  const items = [
    { key: "jkn", label: "Daftar Online (Mobile JKN)" },
    { key: "loket", label: "Daftar di Loket (Offline)" },
  ];
  return (
    <div className="inline-flex rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm p-1">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => onChange(it.key)}
          className={[
            "px-4 py-2 text-sm font-semibold rounded-xl transition btn-ripple",
            value === it.key
              ? "bg-orange-500 text-white"
              : "text-slate-700 hover:bg-orange-50",
          ].join(" ")}
        >
          {it.label}
        </button>
      ))}
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

export default function RawatJalanPage() {
  useRJInjectStyles();
  const [tab, setTab] = useState("jkn");

  return (
    <ServiceLayout
      title="Instalasi Rawat Jalan"
      subtitle="Daftar poli makin mudah—via Mobile JKN atau langsung di loket. Efisien, ramah, dan terarah."
      heroBadges={["Mitra JKN", "Antrean Online", "User-Friendly"]}
      actions={[
        {
          label: "Daftar Mobile JKN",
          href: "https://play.google.com/store/apps/details?id=app.bpjs.mobile",
          icon: "jkn",
        },
        {
          label: "Lihat Daftar Poli",
          href: "/poli",
          icon: "arrow",
          variant: "outline",
        },
      ]}
    >
      {/* QUICK ACTIONS */}
      <section aria-label="quick actions" className="reveal">
        <div className="not-prose grid md:grid-cols-3 gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=app.bpjs.mobile"
            target="_blank"
            rel="noreferrer"
            className="btn-ripple rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-500 to-orange-400 text-white px-5 py-4 font-bold hover:brightness-105"
          >
            Daftar Online via Mobile JKN
          </a>
          <Link
            to="/poli"
            className="btn-ripple rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm px-5 py-4 font-semibold text-orange-700 hover:bg-orange-50"
          >
            Lihat Semua Poli
          </Link>
          <a
            href="https://wa.me/62xxxxxxxxxxx"
            target="_blank"
            rel="noreferrer"
            className="btn-ripple rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm px-5 py-4 font-semibold text-orange-700 hover:bg-orange-50"
          >
            WhatsApp Front Office
          </a>
        </div>
      </section>

      {/* TABS PENDAFTARAN */}
      <section className="mt-8" aria-label="pendaftaran">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="m-0">Pendaftaran</h2>
          <Tabs value={tab} onChange={setTab} />
        </div>

        {tab === "jkn" ? (
          <div className="not-prose mt-4 grid md:grid-cols-2 gap-4">
            <div className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5">
              <div className="text-xs font-semibold text-orange-700 mb-1">
                Mobile JKN
              </div>
              <h3 className="font-semibold">Langkah-langkah</h3>
              <ol className="list-decimal pl-5 text-sm text-slate-700 mt-1">
                <li>
                  Buka Mobile JKN → <em>Pendaftaran Pelayanan</em> → pilih{" "}
                  <b>RS Nindhita</b>.
                </li>
                <li>
                  Pilih <b>Poli & Dokter</b> → tentukan tanggal.
                </li>
                <li>
                  Konfirmasi & simpan tiket antrean → datang 15–30 menit lebih
                  awal.
                </li>
              </ol>
              <div className="mt-3 text-xs text-slate-500">
                Jika kuota penuh, pilih tanggal/dokter lain atau datang ke loket
                lebih pagi.
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-50 to-white p-5">
              <h3 className="font-semibold">Tips Sukses Antrean Online</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                <li>Cek ulang kepesertaan JKN aktif.</li>
                <li>Pilih jadwal lebih pagi untuk meminimalkan antre.</li>
                <li>Siapkan kartu kontrol bila kunjungan ulang.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="not-prose mt-4 grid md:grid-cols-2 gap-4">
            <div className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5">
              <div className="text-xs font-semibold text-orange-700 mb-1">
                Loket
              </div>
              <h3 className="font-semibold">Alur Singkat</h3>
              <ol className="list-decimal pl-5 text-sm text-slate-700 mt-1">
                <li>Ambil nomor antrean di lobby.</li>
                <li>Verifikasi identitas & pilih poli/dokter.</li>
                <li>Menuju ruang periksa sesuai panggilan.</li>
              </ol>
              <div className="mt-3 text-xs text-slate-500">
                Jam layanan mengikuti jadwal dokter masing-masing poli.
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-50 to-white p-5">
              <h3 className="font-semibold">Dokumen Wajib</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                <li>KTP/identitas</li>
                <li>Kartu JKN aktif (jika peserta)</li>
                <li>Rujukan dari Faskes 1 (bila diperlukan)</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* TIMELINE ALUR */}
      <section className="mt-10" aria-label="alur layanan">
        <h2>Alur Layanan di Rawat Jalan</h2>
        <ol className="relative border-l-2 border-orange-200 pl-6 space-y-5">
          {[
            "Registrasi",
            "Tunggu Panggilan",
            "Pemeriksaan Dokter",
            "Resep & Farmasi",
            "Pulang & Edukasi",
          ].map((t, i) => (
            <li key={t} className="reveal">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-orange-400 step-dot" />
              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4">
                <div className="text-xs font-semibold text-orange-700">
                  Langkah {i + 1}
                </div>
                <div className="font-semibold text-slate-900">{t}</div>
                {i === 3 ? (
                  <p className="text-sm text-slate-700 mt-1">
                    Validasi resep di Farmasi, edukasi obat (dosis, waktu minum,
                    efek samping).
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* PELAYANAN POPULER */}
      <section className="mt-10" aria-label="pelayanan populer">
        <h2>Pelayanan Populer</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            ["Poli Umum", "Keluhan umum, skrining awal, surat keterangan."],
            ["Poli Anak", "Batuk pilek, imunisasi, tumbuh kembang."],
            [
              "Poli Penyakit Dalam",
              "Diabetes, hipertensi, maag, kontrol berkala.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="card-glow rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition"
            >
              <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                RAWAT JALAN
              </div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-700">{desc}</p>
              <div className="mt-3 flex gap-2">
                <a
                  href="https://play.google.com/store/apps/details?id=app.bpjs.mobile"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ripple rounded-xl px-3 py-2 text-xs font-bold bg-orange-500 text-white hover:bg-orange-600"
                >
                  Daftar Mobile JKN
                </a>
                <Link
                  to="/poli"
                  className="btn-ripple rounded-xl px-3 py-2 text-xs font-semibold border border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  Lihat Semua Poli
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERSYARATAN */}
      <section className="mt-10" aria-label="persyaratan">
        <h2>Persyaratan Administrasi</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5">
            <div className="text-xs font-semibold text-orange-700 mb-1">
              Peserta JKN
            </div>
            <ul className="list-disc pl-5 text-sm text-slate-700">
              <li>KTP/identitas & Kartu JKN aktif</li>
              <li>Surat rujukan Faskes 1 (sesuai ketentuan)</li>
              <li>Kartu kontrol untuk kunjungan ulang</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-50 to-white p-5">
            <div className="text-xs font-semibold text-orange-700 mb-1">
              Pasien Umum
            </div>
            <ul className="list-disc pl-5 text-sm text-slate-700">
              <li>KTP/identitas</li>
              <li>Pembayaran di loket/cashless sesuai kebijakan RS</li>
              <li>Bukti pendukung lain bila diminta admin</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10" aria-label="faq">
        <h2>Pertanyaan Umum</h2>
        <div className="not-prose space-y-3">
          <FAQItem
            q="Apakah bisa ganti jadwal dokter di Mobile JKN?"
            a="Bisa, selama kuota tersedia. Lakukan perubahan sebelum hari H kunjungan."
          />
          <FAQItem
            q="Apakah wajib antre online?"
            a="Tidak wajib. Kamu bisa datang ke loket, namun antrean mengikuti ketersediaan hari itu."
          />
          <FAQItem
            q="Kapan waktu terbaik datang?"
            a="Pagi hari sebelum jam praktik dimulai agar proses verifikasi lebih cepat."
          />
        </div>
      </section>
    </ServiceLayout>
  );
}

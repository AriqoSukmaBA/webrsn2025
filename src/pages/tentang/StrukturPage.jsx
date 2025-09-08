// src/pages/tentang/StrukturPage.jsx
import React, { useState, useEffect } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/* ====== Inject style ringan (glow, ripple) ====== */
function useSOStyles() {
  useEffect(() => {
    if (document.getElementById("so-styles")) return;
    const s = document.createElement("style");
    s.id = "so-styles";
    s.textContent = `
      @keyframes fadeInUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      .glass { background:rgba(255,255,255,.8); backdrop-filter:saturate(140%) blur(6px); }
      .glow::before{content:"";position:absolute;inset:-1px;border-radius:1rem;background:
        linear-gradient(135deg,rgba(255,163,94,.55),rgba(255,111,35,.35));
        filter:blur(10px);opacity:.35;z-index:-1;transition:.3s;
      }
      .hover-lift:hover{ transform: translateY(-2px); }
      .pill{ display:inline-block; margin:.125rem; padding:.35rem .6rem; border-radius:999px;
             font-size:11px; font-weight:700; border:1px solid rgba(251,146,60,.5);
             color:#9a3412; background:rgba(255,247,237,.85);}
      .btn-ripple{position:relative;overflow:hidden}
      .btn-ripple:active::after{content:"";position:absolute;left:var(--x,50%);top:var(--y,50%);
        width:12px;height:12px;border-radius:999px;background:rgba(255,255,255,.6);
        transform:translate(-50%,-50%);animation:ripple .6s ease-out forwards}
      @keyframes ripple{0%{opacity:.6;transform:translate(-50%,-50%) scale(0)}100%{opacity:0;transform:translate(-50%,-50%) scale(12)}}
    `;
    document.head.appendChild(s);
  }, []);
}

/* ====== Data hasil pemetaan dari dokumen SOTK ======
   (Nama & unit disalin sesuai PDF supaya konsisten) */
const TOP = {
  corporate: ["Komisaris PT.NUS", "Direktur PT. Nindhita Universal Sampang"],
  hospital: ["Direktur Rumah Sakit Nindhita"],
  pengawasan: ["SPI"], // Satuan Pengawasan Internal
};

const BAG_TU = {
  title: "Bagian Tata Usaha",
  head: "Ka. Bagian Tata Usaha",
  subs: [
    "Ka. Sub. Bag. Umum dan Kepegawaian",
    "Ka. Sub. Bag. Perencanaan",
    "Ka. Sub. Bag. Keuangan",
    "RM dan SIMRS",
  ],
};

const BIDANG_PELAYANAN = {
  title: "Bidang Pelayanan",
  head: "Ka. Bidang Pelayanan",
  units: ["IGD", "IRJA", "IRNA", "ICU", "IBS"],
};

const BIDANG_PENUNJANG = {
  title: "Bidang Penunjang",
  head: "Ka. Bidang Penunjang",
  units: [
    "Inst.Laboratorium",
    "Inst.Farmasi",
    "Inst.Radiologi",
    "Inst.Gizi",
    "Laundry dan CSSD",
    "IPSRS",
    "KESLING",
    "Ambulance",
    "Pemulasaran Jenazah",
  ],
};

const KOMITE = [
  "Komite Medis",
  "Komite Keperawatan",
  "Komite Nakes Lainnya",
  "Komite Etik Rumah Sakit",
  "Komite Mutu",
  "Komite Farmasi dan Terapi",
];

/* ====== UI ====== */
function Card({ children, className = "" }) {
  return (
    <div
      className={`relative glass rounded-2xl border border-orange-200 p-5 shadow-sm glow hover-lift animate-[fadeInUp_.25s_ease] ${className}`}
    >
      {children}
    </div>
  );
}

function Accord({ title, caption, items }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-left font-semibold hover:bg-orange-50/60"
      >
        <div>
          <div className="font-semibold text-slate-900">{title}</div>
          {caption ? (
            <div className="text-xs text-slate-500 -mt-0.5">{caption}</div>
          ) : null}
        </div>
        <span className="text-orange-600 text-lg leading-none select-none">
          {open ? "–" : "+"}
        </span>
      </button>
      {open && (
        <ul className="px-5 pb-4 grid sm:grid-cols-2 gap-x-6 text-sm text-slate-700">
          {items.map((x) => (
            <li key={x} className="py-1">
              {x}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function StrukturPage() {
  useSOStyles();

  return (
    <ServiceLayout
      title="Struktur Organisasi"
      subtitle="Struktur organisasi RS Nindhita berbasis tata kelola yang efektif untuk mutu & keselamatan pasien."
      heroBadges={["Good Governance", "PMKP", "Keselamatan Pasien"]}
    >
      {/* PUCuk pimpinan & korporasi */}
      <section className="reveal">
        <h2>Pucuk Pimpinan</h2>

        <div className="not-prose grid md:grid-cols-3 gap-4">
          <Card>
            <div className="text-[11px] font-bold text-orange-700 uppercase">
              Korporasi
            </div>
            <div className="mt-2 space-y-2">
              {TOP.corporate.map((t) => (
                <div key={t} className="font-semibold">
                  {t}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-[11px] font-bold text-orange-700 uppercase">
              Direktur RS
            </div>
            <div className="mt-2 space-y-2">
              {TOP.hospital.map((t) => (
                <div key={t} className="font-semibold">
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <span className="pill">{TOP.pengawasan[0]}</span>
            </div>
          </Card>

          <Card>
            <div className="text-[11px] font-bold text-orange-700 uppercase">
              Komite (Lintas)
            </div>
            <div className="mt-2 flex flex-wrap">
              {KOMITE.map((k) => (
                <span key={k} className="pill">
                  {k}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Bagian TU & Subbag */}
      <section className="mt-10 reveal">
        <h2>Bagian & Subbag</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <Card>
            <div className="text-xs text-slate-500">{BAG_TU.title}</div>
            <div className="font-semibold text-slate-900">{BAG_TU.head}</div>
            <div className="mt-3 flex flex-wrap">
              {BAG_TU.subs.map((s) => (
                <span key={s} className="pill">
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-xs text-slate-500">{BIDANG_PELAYANAN.title}</div>
            <div className="font-semibold text-slate-900">
              {BIDANG_PELAYANAN.head}
            </div>
            <div className="mt-3 flex flex-wrap">
              {BIDANG_PELAYANAN.units.map((u) => (
                <span key={u} className="pill">
                  {u}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Bidang Penunjang */}
      <section className="mt-10 reveal">
        <h2>Bidang Penunjang</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <Card className="md:col-span-2">
            <div className="text-xs text-slate-500">
              {BIDANG_PENUNJANG.title}
            </div>
            <div className="font-semibold text-slate-900">
              {BIDANG_PENUNJANG.head}
            </div>

            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {BIDANG_PENUNJANG.units.map((u) => (
                <div
                  key={u}
                  className="rounded-xl border border-slate-200 px-3 py-2 bg-white/70"
                >
                  {u}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Ringkas versi akordeon (opsional, tetap setema) */}
      <section className="mt-10 reveal">
        <h2>Ringkasan (Akordeon)</h2>
        <div className="not-prose space-y-3">
          <Accord
            title="Komite & Tim Lintas"
            caption="Struktur komite sesuai ketentuan RS"
            items={KOMITE}
          />
          <Accord
            title="Instalasi Pelayanan"
            caption={BIDANG_PELAYANAN.head}
            items={BIDANG_PELAYANAN.units}
          />
          <Accord
            title="Instalasi Penunjang"
            caption={BIDANG_PENUNJANG.head}
            items={BIDANG_PENUNJANG.units}
          />
        </div>
      </section>
    </ServiceLayout>
  );
}

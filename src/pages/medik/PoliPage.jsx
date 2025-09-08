import React, { useMemo, useState, useEffect } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

const POLI = [
  {
    key: "obgyn",
    name: "Poli Kandungan (Obgyn)",
    desc: "Kontrol kehamilan, masalah menstruasi, program hamil.",
    tags: ["Obgyn", "Kandungan", "Kehamilan", "Ibu Hamil", "KB"],
  },
  {
    key: "anak",
    name: "Poli Anak",
    desc: "Pelayanan pediatrik: imunisasi, batuk-pilek, tumbuh kembang.",
    tags: ["Pediatri", "Anak", "Imunisasi", "Tumbuh Kembang"],
  },
  {
    key: "bedah",
    name: "Poli Bedah Umum",
    desc: "Konsultasi pra/pasca operasi: hernia, benjolan, luka, dll.",
    tags: ["Bedah", "Operasi", "Luka", "Hernia", "Tumor Kulit"],
  },
  {
    key: "penyakit-dalam",
    name: "Poli Penyakit Dalam",
    desc: "Diabetes, hipertensi, maag, penyakit metabolik & infeksi.",
    tags: ["Interna", "Diabetes", "Hipertensi", "Maag", "Asam Urat"],
  },
  {
    key: "mata",
    name: "Poli Mata",
    desc: "Cek tajam penglihatan, infeksi/iritasi, katarak (skrining).",
    tags: ["Oftalmologi", "Mata", "Kacamata", "Katarak"],
  },
  {
    key: "urologi",
    name: "Poli Urologi",
    desc: "Batu ginjal, prostat, gangguan saluran kemih & reproduksi.",
    tags: ["Batu Ginjal", "Prostat", "Anyang-anyangan", "Urologi"],
  },
  {
    key: "saraf",
    name: "Poli Saraf",
    desc: "Stroke, sakit kepala, kejang, neuropati & gangguan saraf.",
    tags: ["Neurologi", "Stroke", "Migrain", "Kejang", "Kesemutan"],
  },
  {
    key: "jiwa",
    name: "Poli Jiwa",
    desc: "Gangguan cemas, depresi, psikiatri anak-dewasa & konseling.",
    tags: ["Psikiatri", "Kesehatan Jiwa", "Cemas", "Depresi", "Konseling"],
  },
  {
    key: "paru",
    name: "Poli Paru",
    desc: "Asma, PPOK, TB, infeksi saluran napas & alergi pernapasan.",
    tags: ["Pulmonologi", "Asma", "PPOK", "TB", "Batuk"],
  },
  {
  key: "jantung",
  name: "Poli Jantung",
  desc: "Pemeriksaan, diagnosis, dan perawatan penyakit jantung.",
  tags: ["Kardiologi", "Penyakit Jantung", "EKG", "Perawatan"],
  },
  {
    key: "radiologi",
    name: "Radiologi (Konsultasi)",
    desc: "Konsultasi hasil Rontgen/USG/CT sesuai rujukan dokter.",
    tags: ["Radiologi", "Rontgen", "USG", "CT Scan"],
  },
  {
    key: "patologi-klinik",
    name: "Patologi Klinik",
    desc: "Konsultasi hasil laboratorium & interpretasi pemeriksaan.",
    tags: ["Lab", "Patologi Klinik", "Darah", "Kimia Klinik"],
  },
];

function useDebouncedValue(value, delay = 160) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function PoliPage() {
  const [q, setQ] = useState("");
  const dq = useDebouncedValue(q);

  const list = useMemo(() => {
    const s = dq.trim().toLowerCase();
    if (!s) return POLI;
    return POLI.filter((p) =>
      [p.name, p.desc, ...(p.tags || [])].join(" ").toLowerCase().includes(s)
    );
  }, [dq]);

  return (
    <ServiceLayout
      title="Poli"
      subtitle="Semua poliklinik Rawat Jalan—pilih kebutuhanmu, daftar online, selesai."
      heroBadges={["Rawat Jalan", "By Appointment", "Fast Track"]}
    >
      {/* SEARCH BAR */}
      <section className="reveal">
        <div className="not-prose flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative w-full md:w-[480px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari poli (mis. Anak, Mata, THT, Penyakit Dalam...)"
              className="w-full rounded-2xl border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 px-4 py-3 outline-none"
              aria-label="Cari nama poli"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-700 font-bold"
              >
                ×
              </button>
            )}
          </div>
          <div className="text-xs text-slate-500">
            Jadwal dapat berubah. Cek update di Instagram resmi RS.
          </div>
        </div>
      </section>

      {/* GRID POLI */}
      <section className="mt-6">
        <div className="not-prose grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <article
              key={p.key}
              className="group rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition relative overflow-hidden"
            >
              {/* gradient accent */}
              <div className="absolute inset-x-0 -top-10 h-20 bg-gradient-to-b from-orange-100/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                RAWAT JALAN
              </div>
              <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-700">{p.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(p.tags || []).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-1 rounded-full border border-orange-200 text-orange-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://play.google.com/store/apps/details?id=app.bpjs.mobile"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ripple rounded-xl px-3 py-2 text-xs font-bold bg-orange-500 text-white hover:bg-orange-600"
                >
                  Daftar Mobile JKN
                </a>
                <span className="rounded-xl px-3 py-2 text-xs font-semibold border border-orange-200 text-orange-700">
                  Jadwal cek IG
                </span>
              </div>
            </article>
          ))}
        </div>

        {!list.length && (
          <div className="mt-6 text-sm text-slate-600">
            Tidak menemukan poli dengan kata kunci tersebut. Coba istilah lain
            ya.
          </div>
        )}
      </section>
    </ServiceLayout>
  );
}

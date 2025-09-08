import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * NICUPage.jsx — interaktif (tema oranye)
 * - Fokus perawatan neonatal, pendampingan orang tua, keselamatan pasien
 * - Kartu glass + gradient accent
 * - Anchor #pendamping untuk CTA dari layout
 */

export default function NICUPage() {
  return (
    <ServiceLayout
      title="NICU"
      subtitle="Perawatan intensif untuk bayi baru lahir (neonatal) dengan pemantauan ketat dan dukungan komprehensif."
      heroBadges={[
        "Neonatal Care",
        "Incubator & Phototherapy",
        "Family-Centered",
      ]}
    >
      {/* FOKUS PERAWATAN */}
      <section aria-label="fokus perawatan" className="reveal">
        <h2>Fokus Perawatan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Stabilisasi Respirasi",
              "HFNC/CPAP sesuai indikasi dan pemantauan saturasi berkelanjutan.",
            ],
            [
              "Kontrol Suhu & Nutrisi",
              "Inkubator, fototerapi, nutrisi enteral/parenteral terukur.",
            ],
            [
              "Monitoring Intensif",
              "Tanda vital real-time, kontrol bilirubin & evaluasi berkala.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PENDAMPINGAN ORANG TUA */}
      <section
        id="pendamping"
        className="mt-10"
        aria-label="pendampingan orang tua"
      >
        <h2>Pendampingan Orang Tua</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Kangaroo Care</h3>
            <p className="text-sm text-slate-700 mt-1">
              Kontak kulit ke kulit untuk mendukung stabilitas suhu, pernapasan,
              dan bonding.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Edukasi Laktasi</h3>
            <p className="text-sm text-slate-700 mt-1">
              Pendampingan ASI perah, jadwal pumping, dan kebersihan alat sesuai
              standar.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Komunikasi Terjadwal</h3>
            <p className="text-sm text-slate-700 mt-1">
              Update rutin mengenai kondisi bayi; nomor kontak keluarga dicatat
              oleh perawat.
            </p>
          </div>
        </div>
      </section>

      {/* KESELAMATAN PASIEN */}
      <section className="mt-10" aria-label="keselamatan pasien">
        <h2>Keselamatan Pasien</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Kontrol Infeksi</h3>
            <p className="text-sm text-slate-700 mt-1">
              Protokol steril, skrining pengunjung, dan hand hygiene ketat.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Alarm & Monitoring</h3>
            <p className="text-sm text-slate-700 mt-1">
              Alarm terintegrasi, pemantauan saturasi & respirasi berkelanjutan.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Keamanan Data</h3>
            <p className="text-sm text-slate-700 mt-1">
              Pencatatan medis terstandar, persetujuan tindakan, dan privasi
              keluarga.
            </p>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}

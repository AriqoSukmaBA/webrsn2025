import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

export default function AmbulanceJenazahPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Instalasi Ambulance & Pemulasaran Jenazah"
      subtitle="Layanan ambulans 24 jam untuk rujukan/penjemputan dan pemulasaraan jenazah sesuai ketentuan."
      heroBadges={["Ambulans 24 Jam", "Rujukan Aman", "Pemulasaraan"]}
    >
      <section className="reveal">
        <h2>Layanan Ambulans</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Penjemputan Pasien",
              "Tim terlatih, peralatan dasar, dan komunikasi dengan IGD.",
            ],
            [
              "Rujukan Fasilitas",
              "Koordinasi rujukan antar-fasilitas dan pendampingan administrasi.",
            ],
            [
              "Standar Keamanan",
              "Disinfeksi kendaraan, logbook perjalanan, dan pemeriksaan alat.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 reveal">
        <h2>Pemulasaraan Jenazah</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3>Perawatan & Dokumentasi</h3>
            <p className="text-sm text-slate-700 mt-1">
              Perawatan jenazah sesuai keyakinan/permintaan keluarga dan
              ketentuan berlaku; dokumen lengkap disiapkan.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3>Koordinasi Pemakaman/Pengantaran</h3>
            <p className="text-sm text-slate-700 mt-1">
              Pengantaran dengan ambulans; koordinasi waktu & lokasi bersama
              keluarga.
            </p>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}

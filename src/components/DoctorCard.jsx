import React from "react";

export default function DoctorCard({ doctor }) {
  const onImgErr = (e) => {
    e.currentTarget.src = "/assets/avatar-doctor.png"; // placeholder fallback
  };

  return (
    // Outer border gradient (tipis) + soft glow
    <article
      className="group relative h-full rounded-2xl p-[1px]
                 bg-gradient-to-br from-orange-500 via-pink-500 to-violet-500
                 shadow-[0_10px_30px_rgba(249,115,22,.22)]
                 hover:shadow-[0_16px_40px_rgba(236,72,153,.25)]
                 transition-shadow duration-300"
      title={doctor?.name || ""}
    >
      {/* Inner glass surface */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-5">
        {/* Avatar + ring gradien */}
        <div className="flex justify-center mb-4">
          <div
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-[2px]
                       bg-[conic-gradient(at_50%_50%,#f97316_0deg,#fb7185_140deg,#8b5cf6_320deg,#f97316_360deg)]
                       shadow-[0_6px_18px_rgba(249,115,22,.22)]
                       transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <img
              src={doctor?.image || "/assets/avatar-doctor.png"}
              onError={onImgErr}
              alt={doctor?.name || "Dokter"}
              className="w-full h-full rounded-full object-cover bg-white"
              loading="lazy"
            />
            {/* subtle inner ring */}
            <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/60" />
          </div>
        </div>

        {/* Nama */}
        <h3 className="text-slate-900 font-extrabold text-center text-base md:text-lg tracking-tight">
          {doctor?.name || "-"}
        </h3>

        {/* Spesialis – pill gen z */}
        <div className="mt-1 flex justify-center">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                           bg-gradient-to-r from-orange-500/15 via-pink-500/15 to-violet-500/15
                           text-orange-700"
          >
            {doctor?.spec || "-"}
          </span>
        </div>

        {/* Info hari & jam */}
        <div className="mt-3 text-center text-sm">
          <p className="text-slate-600 truncate">
            {(doctor?.days && doctor.days.join(", ")) || "-"}
          </p>
          <p className="text-slate-700 font-medium">{doctor?.hours || "-"}</p>
        </div>
      </div>

      {/* Glow lembut saat hover */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition
                      bg-[radial-gradient(40%_40%_at_50%_50%,rgba(249,115,22,.18),transparent_70%)]"
      />
    </article>
  );
}

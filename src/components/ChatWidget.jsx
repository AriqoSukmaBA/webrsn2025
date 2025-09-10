import React, { useEffect, useMemo, useState } from "react";

export default function ChatWidget({
  open,
  onClose,
  adminWa = "",
  doctorWa = "",
}) {
  const [tab, setTab] = useState("admin"); // 'admin' | 'dokter'
  const [msg, setMsg] = useState("");

  // Pesan default per tab
  const defaultMsg = useMemo(() => {
    if (tab === "admin") {
      return "Halo Admin RS Nindhita, saya ingin bertanya informasi umum.";
    }
    return "";
  }, [tab]);

  // Set pesan default saat buka / ganti tab
  useEffect(() => {
    if (open) setMsg(defaultMsg);
  }, [open, defaultMsg]);

  // target WA number sesuai tab
  const targetWa = tab === "admin" ? adminWa : doctorWa;

  // link WhatsApp
  const waLink = useMemo(() => {
    if (!targetWa) return "#";
    return `https://wa.me/${targetWa}?text=${encodeURIComponent(msg || "")}`;
  }, [targetWa, msg]);

  // Quick suggestions
  const quickAdmin = [
    "Jam kunjungan pasien?",
    "Syarat pendaftaran rawat jalan?",
    "Ketersediaan kamar?",
  ];
  const quickDokter = ["Saya Butuh Ambulance"];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      {/* panel */}
      <div className="relative w-full md:max-w-xl bg-white rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-[var(--rs-primary)] to-orange-400 text-white">
          <div className="flex items-center gap-2">
            <svg
  viewBox="0 0 24 24"
  className="w-5 h-5"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
  aria-hidden
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 0-7 7v4" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 1 7 7v4" />
  <rect x="4" y="12" width="4" height="5" rx="1.5" />
  <rect x="16" y="12" width="4" height="5" rx="1.5" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c0 1.66-1.34 3-3 3h-1" />
</svg>
            <div className="font-semibold">
              {tab === "admin" ? "Chat Admin RS" : "Chat IGD"}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* tabs */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTab("admin")}
              className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                tab === "admin"
                  ? "bg-[var(--rs-primary)] text-white border-[var(--rs-primary)]"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              aria-pressed={tab === "admin"}
            >
              Admin RS
            </button>
            <button
              onClick={() => setTab("dokter")}
              className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                tab === "dokter"
                  ? "bg-[var(--rs-primary)] text-white border-[var(--rs-primary)]"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              aria-pressed={tab === "dokter"}
            >
              IGD
            </button>
          </div>
        </div>

        {/* body */}
        <div className="p-4 space-y-3">
          {/* tips */}
          <div className="text-xs text-slate-500">
            {tab === "admin"
              ? "Gunakan chat ini untuk informasi ."
              : "Gunakan chat ini untuk Darurat? Hubungi IGD."}
          </div>

          {/* quick chips */}
          <div className="flex flex-wrap gap-2">
            {(tab === "admin" ? quickAdmin : quickDokter).map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  setMsg((prev) =>
                    prev
                      ? prev.trim().endsWith(".")
                        ? prev + " " + t
                        : prev + ". " + t
                      : t
                  )
                }
                className="px-3 py-1.5 rounded-full text-xs border border-slate-200 hover:bg-slate-50"
              >
                {t}
              </button>
            ))}
          </div>

          {/* textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pesan
            </label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--rs-primary)]"
              placeholder={defaultMsg}
            />
            <div className="mt-1 text-xs text-slate-500">
              Pesan ini akan dibuka di WhatsApp.
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Nomor tujuan:{" "}
            <span className="font-semibold">
              {targetWa || "(belum diatur)"}
            </span>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold ${
              targetWa
                ? "bg-[var(--rs-accent)] hover:bg-[var(--rs-accent-700)]"
                : "bg-slate-300 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!targetWa) e.preventDefault();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20 4.5A9.5 9.5 0 0 0 4.4 18.6L3 22l3.5-1.3A9.5 9.5 0 1 0 20 4.5zm-7.4 3.7c.2 0 .4 0 .6.2l1.1 1.2c.2.2.2.5.1.8l-.3.6c-.1.3-.4.6-.7.7 0 0-.3.2-.9-.1s-1.5-.9-2.3-1.8-1.2-1.7-1.3-2.4.1-.9.1-.9c.1-.3.4-.6.7-.7l.6-.3c.3-.1.6-.1.8.1l1.2 1.1c.2.2.2.4.2.6l-.1.6c0 .2-.1.3-.2.4l-.3.3c-.1.1-.1.2 0 .3.3.5.7 1 1.1 1.4.5.4.9.8 1.4 1.1.1.1.2.1.3 0l.3-.3c.1-.1.2-.2.4-.2l.6-.1z" />
            </svg>
            Buka WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

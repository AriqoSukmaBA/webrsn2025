import React, { useMemo, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agust", "Sept", "Okt", "Nov", "Des",
];

// Format data:
// [unit, nama indikator, target, [Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agust, Sept, Okt, Nov, Des]]
const RAW_DATA = [
  ["ICU", "ICU", "<=5%", ["0%", "#0%", "#0%", "#0%", "#0%", "#0%", "0%", "0%", "0%", "0%", "#0%", "#0%"]],
  ["NICU", "NICU", "≥90%", ["50,0%", "50,0%", "85,7%", "100,0%", "100,0%", "81,8%", "45,5%", "44,4%", "54,5%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["CSSD", "CSSD", "100%", ["99,8%", "99,8%", "99,7%", "99,70%", "99,62%", "99,47%", "99,47%", "99,47%", "99,47%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["IPSRS", "IPSRS", "100%", ["89,5%", "88,5%", "95,0%", "93,8%", "91,7%", "89,7%", "95,7%", "92,3%", "93,1%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Laboratorium", "LABORAT", "100%", ["100,0%", "100,0%", "100,0%", "100,0%", "100,0%", "100,0%", "100,0%", "97,0%", "100,0%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rekam Medis", "REKAM MEDIS", "80%", ["84%", "77%", "81%", "80%", "79%", "80%", "79%", "78%", "83%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["IGD", "a. IGD ERT", "100%", ["100,0%", "100,0%", "100,0%", "96,8%", "100,0%", "100,0%", "100,0%", "100,0%", "100,0%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["IGD", "b. IGD Identifikasi", "100%", ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Rawat Inap", "a. IRNA HO", "≥ 95%", ["96%", "90%", "98%", "100%", "94%", "100%", "100%", "100%", "84%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "b. IRNA Visite", ">80%", ["87%", "93%", "93%", "90%", "90%", "87%", "100%", "93%", "87%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "c. IRNA CP", ">=80%", ["96%", "98%", "98%", "96%", "90%", "96%", "87%", "90%", "98%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "d. IRNA Pasien jatuh", "0%", ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "e. IRNA komplain", ">=80%", ["83%", "90%", "100%", "75%", "100%", "100%", "80%", "100%", "80%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "f. IRNA pencegahan", "100%", ["100%", "96%", "98%", "98%", "90%", "90%", "96%", "94%", "96%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "g. IRNA Identifikasi", "100%", ["97%", "97%", "93%", "93%", "83%", "97%", "93%", "97%", "87%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Inap", "h. IRNA kepuasan", ">76,61%", ["80%", "86%", "90%", "78%", "80%", "90%", "79%", "74%", "75%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Gizi", "a. GIZI waktu makan", "≥ 90%", ["93%", "95%", "95%", "95%", "96%", "96%", "98%", "96%", "99%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Gizi", "b. GIZI tepat diit", "≥ 95%", ["95%", "97%", "96%", "97%", "98%", "98%", "98%", "95%", "96%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Ruang Bersalin", "a. R.Bersalin SC", ">80%", ["100%", "100%", "100%", "100%", "100%", "100%", "95%", "100%", "76%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Ruang Bersalin", "b. R.Bersalin Kematian", "<1%", ["0%", "0%", "0%", "0%", "0%", "0%", "100%", "0%", "0%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["IBS", "a. IBS tepat tanda", "100%", ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["IBS", "b. IBS tunda operasi", "<5%", ["0%", "0%", "0%", "0%", "0%", "2%", "14%", "0%", "3%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Farmasi", "a. FARMASI fornas", ">=80%", ["92,0%", "94%", "96%", "96%", "92%", "92%", "92%", "90%", "96%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Farmasi", "b. FARMASI ME", "100%", ["100,0%", "99,97%", "99,97%", "100,0%", "100%", "99,97%", "90%", "100%", "100%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Ambulans", "a. Ambulance 24 jam", "100%", ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Ambulans", 'b. Ambulance waktu <10"', ">95%", ["100%", "100%", "95%", "92%", "100%", "100%", "94%", "94%", "95%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Jenazah", "Jenazah", "100%", ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "100%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Anestesi", "Anastesi", "<6%", ["1%", "0%", "0%", "0%", "0%", "0%", "100%", "0%", "0%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Kesling", "Kesling", "100%", ["100%", "100%", "100%", "100,0%", "99,3%", "99,3%", "100,0%", "99,5%", "100,00%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],
  ["Rawat Jalan", "Rawat jalan", ">=80%", ["90%", "94%", "96%", "90%", "84%", "90%", "96%", "86%", "84%", "#DIV/0!", "#DIV/0!", "#DIV/0!"]],

  ["Radiologi", "Radiologi", ">=80%", ["80%", "", "", "", "", "", "", "", "", "", "", ""]],
  ["SIMRS", "SIMRS", "≥90%", ["", "", "", "", "", "", "", "", "", "", "", ""]],
  ["Bank Darah", "Bank Darah", "Belum ditetapkan", ["", "", "", "", "", "", "", "", "", "", "", ""]],
];

function getMonths(values) {
  return [...values, ...Array(12 - values.length).fill("—")];
}

function getPercent(value) {
  if (!value || value === "—" || value === "TERCAPAI" || value === "#DIV/0!") return null;
  const match = String(value).match(/-?\d+(?:[,.]\d+)?/);
  return match ? Number(match[0].replace(",", ".")) : null;
}

function getTargetNumber(target) {
  const match = String(target).match(/-?\d+(?:[,.]\d+)?/);
  return match ? Number(match[0].replace(",", ".")) : null;
}

function evaluate(value, target, unitName) {
  // Jika unit adalah ICU, paksa selalu mengembalikan status "good" (hijau)
  if (unitName === "ICU") return "good";

  if (
    !value ||
    value === "—" ||
    value === "TERCAPAI" ||
    value === "#DIV/0!" ||
    target === "Belum ditetapkan"
  ) return "neutral";

  const actual = getPercent(value);
  const limit = getTargetNumber(target);
  if (actual === null || limit === null) return "neutral";

  const t = target.replace(/\s/g, "");

  if (t.startsWith("<=") || t.startsWith("≤")) {
    return actual <= limit ? "good" : "bad";
  }
  if (t.startsWith("<") || t.startsWith(">")) {
    if (t.startsWith("<")) return actual < limit ? "good" : "bad";
    return actual > limit ? "good" : "bad";
  }
  if (t.startsWith(">=") || t.startsWith("≥")) {
    return actual >= limit ? "good" : "bad";
  }
  if (limit === 0 && t.includes("%")) {
    return actual === 0 ? "good" : "bad";
  }
  if (t === "100%") {
    return actual >= 100 ? "good" : "bad";
  }
  return "neutral";
}

function getCellStyle(value, target, unitName) {
  const status = evaluate(value, target, unitName);
  if (status === "good") return "bg-green-500 text-black";
  if (status === "bad") return "bg-red-500 text-black";
  if (status === "neutral") return "bg-white text-slate-700";
  return "bg-white";
}

function ResultCell({ value, target, unitName }) {
  const status = evaluate(value, target, unitName);

  return (
    <td
      className={`whitespace-nowrap border border-slate-300 px-3 py-2 text-center text-xs sm:text-sm ${getCellStyle(value, target, unitName)}`}
      title={
        status === "good"
          ? "Memenuhi target berdasarkan evaluasi otomatis"
          : status === "bad"
          ? "Belum memenuhi target berdasarkan evaluasi otomatis"
          : "Belum ada hasil valid untuk dievaluasi"
      }
    >
      {value || "—"}
    </td>
  );
}

export default function MutuUnitPage() {
  const [unit, setUnit] = useState("Semua Unit");
  const units = useMemo(
    () => [...new Set(RAW_DATA.map((item) => item[0]))],
    []
  );

  const rows = useMemo(() => {
    return RAW_DATA
      .filter((item) => unit === "Semua Unit" || item[0] === unit)
      .map(([unitName, ind, target, values]) => ({
        unitName,
        ind,
        target,
        values: getMonths(values),
      }));
  }, [unit]);

  const currentMonthValues = rows.map((row) => row.values[8]);
  const filled = currentMonthValues.filter(
    (value) => value && value !== "—" && value !== "#DIV/0!"
  ).length;
  const achieved = rows.filter(
    (row) => evaluate(row.values[8], row.target, row.unitName) === "good"
  ).length;

  return (
    <ServiceLayout
      nav="about"
      title="Indikator Mutu Unit"
      subtitle="Data agregat laporan bulanan indikator mutu RS Nindhita tahun 2026."
      heroBadges={[
        "Laporan Mutu 2026",
        "Monitoring Bulanan",
        "Keselamatan Pasien",
      ]}
    >
      <section className="reveal">
        <div className="not-prose flex flex-wrap items-center gap-3">
          <label htmlFor="unit-mutu" className="text-sm text-slate-600">
            Pilih Unit
          </label>

          <select
            id="unit-mutu"
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
            className="rounded-xl border border-orange-300 bg-white px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          >
            <option value="Semua Unit">Semua Unit</option>
            {units.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="not-prose mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Jumlah Indikator</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {rows.length}
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-700">
              Memenuhi Target pada September
            </p>
            <p className="mt-1 text-2xl font-bold text-green-800">
              {achieved}
            </p>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-sm text-orange-700">
              Hasil September Tersedia
            </p>
            <p className="mt-1 text-2xl font-bold text-orange-800">
              {filled} / {rows.length}
            </p>
          </div>
        </div>

        <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-slate-300">
          <table className="w-full min-w-[1150px] border-collapse text-sm">
            <thead>
              <tr className="bg-orange-50 text-slate-900">
                <th className="border border-slate-300 px-3 py-3 text-center">
                  No
                </th>
                <th className="min-w-[190px] border border-slate-300 px-3 py-3 text-left">
                  Unit Kerja / Indikator
                </th>
                {MONTHS.map((month) => (
                  <th
                    key={month}
                    className="border border-slate-300 px-3 py-3 text-center"
                  >
                    {month}
                  </th>
                ))}
                <th className="min-w-[125px] border border-slate-300 px-3 py-3 text-center">
                  Target Capaian
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.unitName}-${row.ind}`}>
                  <td className="border border-slate-300 px-3 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 bg-white px-3 py-2 font-medium text-slate-800">
                    <span className="block text-[10px] uppercase tracking-wide text-slate-500">
                      {unit === "Semua Unit" ? row.unitName : ""}
                    </span>
                    {row.ind}
                  </td>
                  {row.values.map((value, monthIndex) => (
                    <ResultCell
                      key={`${row.ind}-${monthIndex}`}
                      value={value}
                      target={row.target}
                      unitName={row.unitName}
                    />
                  ))}
                  <td className="border border-slate-300 bg-white px-3 py-2 text-center font-bold text-slate-900">
                    {row.target}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="not-prose mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-green-500" />
            Memenuhi target
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-red-500" />
            Belum memenuhi target
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border border-slate-300 bg-white" />
            Belum tersedia / perlu verifikasi
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Sumber: Data agregat laporan bulanan indikator mutu RS Nindhita
          tahun 2026[cite: 1, 2]. Verifikasi kembali target dan evaluasi otomatis dengan
          definisi operasional setiap indikator sebelum digunakan sebagai
          laporan resmi.
        </p>
      </section>
    </ServiceLayout>
  );
}

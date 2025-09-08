import React, { useState } from "react";

export default function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="hover:text-rs.primary700"
        onClick={() => setOpen((v) => !v)} // mobile/touch
      >
        {label} ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 min-w-[240px] rounded-xl border border-slate-200 bg-white shadow-depth z-40">
          <ul className="py-2 text-sm">
            {items.map((it) => (
              <li key={it.href}>
                <a href={it.href} className="block px-4 py-2 hover:bg-slate-50">
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

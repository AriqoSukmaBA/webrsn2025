// src/components/mockups/DeviceMockup.jsx
import React from "react";

export default function DeviceMockup({
  type = "phone", // "phone" | "tablet" | "laptop"
  src,
  alt = "Mockup",
  className = "",
}) {
  const base =
    "overflow-hidden bg-white shadow-xl border border-slate-300 rounded-xl";

  if (type === "phone") {
    return (
      <div
        className={`w-[220px] h-[440px] rounded-[2.5rem] p-3 bg-slate-800 ${className}`}
      >
        <div className={`${base} w-full h-full rounded-[2rem]`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (type === "tablet") {
    return (
      <div
        className={`w-[400px] h-[280px] rounded-[1.5rem] p-4 bg-slate-800 ${className}`}
      >
        <div className={`${base} w-full h-full rounded-[1rem]`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // default laptop
  return (
    <div
      className={`w-[640px] h-[380px] rounded-xl p-4 bg-slate-900 ${className}`}
    >
      <div className={`${base} w-full h-full rounded-lg`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

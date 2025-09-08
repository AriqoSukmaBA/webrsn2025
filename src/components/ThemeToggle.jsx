import React from "react";
import { useTheme } from "../theme/useTheme.js";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 ${className}`}
      title={`Ganti tema: ${theme === "soft" ? "Vivid" : "Soft"}`}
    >
      <span
        className="inline-block w-2.5 h-2.5 rounded-full"
        style={{ background: "var(--rs-primary)" }}
        aria-hidden
      />
      <span className="text-sm font-medium">
        {theme === "soft" ? "Soft" : "Vivid"}
      </span>
    </button>
  );
}

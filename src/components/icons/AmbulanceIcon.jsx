import React from "react";

export default function AmbulanceIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18h12a2 2 0 0 0 2-2v-5.5a1 1 0 0 0-.293-.707l-3.5-3.5A1 1 0 0 0 15.5 6H14V4a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2zm10-8h2l2 2v2h-4v-4zm-9-1h2V7h2v2h2v2h-2v2H9v-2H7V9zM7 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      />
    </svg>
  );
}

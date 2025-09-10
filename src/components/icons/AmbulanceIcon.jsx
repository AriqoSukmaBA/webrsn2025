import React from "react";

export default function AmbulanceIcon({ className = "w-20 h-20" }) {
  return (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth={1.8}
         className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 0-7 7v4"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 0 1 7 7v4"/>
      <rect x="4" y="12" width="4" height="5" rx="1.5"/>
      <rect x="16" y="12" width="4" height="5" rx="1.5"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c0 1.657-1.343 3-3 3h-1"/>
    </svg>
  );
}

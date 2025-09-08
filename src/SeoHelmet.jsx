/**
 * Drop this file somewhere in your React app (e.g., src/seo/SeoHelmet.jsx)
 * Usage per page:
 *   <SeoHelmet title="Judul Halaman" description="Deskripsi halaman" path="/dokter" />
 */
import React from "react";
import { Helmet } from "react-helmet-async";

export default function SeoHelmet({ title, description, path = "/" }) {
  const site = "https://rsnindhita.com";
  const fullTitle = title ? `${title} | RS Nindhita` : "Rumah Sakit Nindhita - Sampang";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={site + path} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={site + path} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

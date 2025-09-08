import React from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "../../data/services.js";
import ScrollReveal from "../anim/ScrollReveal.jsx";

export default function LayananSection() {
  return (
    <section id="layanan" className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal from="up">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Layanan
          </h2>
        </ScrollReveal>
        <ScrollReveal from="up" delay={80}>
          <p className="mt-2 text-slate-600">
            Poliklinik komprehensif dengan tenaga medis profesional.
          </p>
        </ScrollReveal>

        {/* grid lebih rapi dan seragam */}
        <div className="mt-8 grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-6 overflow-x-auto snap-x no-scrollbar -mx-4 px-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-4 md:overflow-visible md:mx-0 md:px-0">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.slug} from="up" delay={i * 80}>
              <article
                className="relative group h-full flex flex-col
                           rounded-2xl bg-white border border-[var(--rs-primary)]/40 
                           shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* gambar */}
                <div className="h-32 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width="640"
                    height="280"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* isi */}
                <div className="flex-1 p-4 flex flex-col">
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 flex-1">
                    {s.excerpt}
                  </p>
                  <Link
                    to={`/layanan/${s.slug}`}
                    className="mt-3 inline-flex text-sm text-[var(--rs-primary-700)] font-semibold hover:underline"
                  >
                    Baca selengkapnya →
                  </Link>
                </div>

                {/* efek hover */}
                <div
                  className="absolute inset-0 -z-10 rounded-2xl 
                                bg-gradient-to-br from-[var(--rs-primary)]/8 to-[var(--rs-accent)]/8 
                                opacity-0 group-hover:opacity-100 transition"
                />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

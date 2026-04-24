'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const results = [
  { label: 'Pesticide Residue', value: 'Below LOQ', note: 'Limit of Quantification', pass: true },
  { label: 'LCMS-MS Panel', value: '70+ Compounds', note: 'All within safe limits', pass: true },
  { label: 'GCMS-MS Panel', value: '60+ Compounds', note: 'All within safe limits', pass: true },
  { label: 'Test Method', value: 'ICAR‑IIHR', note: 'Accredited Laboratory', pass: false },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function LabReport() {
  return (
    <section
      id="lab-report"
      className="relative flex flex-col justify-center bg-white overflow-hidden"
      style={{ minHeight: 'auto' }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12" style={{ paddingTop: 'clamp(3rem, 6vw, 8rem)', paddingBottom: 'clamp(3rem, 6vw, 8rem)' }}>

        <motion.p className="font-sans text-sm tracking-[0.35em] uppercase text-berry mb-6 font-semibold text-center" {...reveal(0)}>
          Lab Report Summary
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <motion.h2 className="font-serif text-2xl md:text-4xl font-bold text-charcoal leading-tight max-w-lg" {...reveal(0.08)}>
            Independently lab tested. Zero residues detected.
          </motion.h2>
          <motion.div className="flex items-center gap-3 shrink-0" {...reveal(0.16)}>
            <Image src="/assets/ICAR.png" alt="ICAR-IIHR" width={40} height={40} className="object-contain" />
            <div>
              <p className="font-sans text-xs text-muted uppercase tracking-widest">Report ID</p>
              <p className="font-serif text-sm text-charcoal font-semibold">FSRL2026‑40 · 13 Apr 2026</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {results.map((r, i) => (
            <motion.div key={r.label} className="rounded-2xl border border-border bg-[#F9F9F8] p-5 md:p-6" {...reveal(i * 0.08)}>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted mb-2">{r.label}</p>
              <p className="font-serif text-lg md:text-xl font-bold text-charcoal mb-1">{r.value}</p>
              <p className="font-sans text-xs text-muted">{r.note}</p>
              {r.pass && (
                <span className="inline-flex items-center gap-1 mt-3 text-[#16a34a] font-sans text-[10px] tracking-wide uppercase">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                  Pass
                </span>
              )}
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}

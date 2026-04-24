'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

const promises = [
  {
    title: 'Organically Grown',
    body: 'Zero synthetic pesticides or chemicals — ever. Our soil and our conscience are clean.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22V12m0 0C12 7 7 3 2 3c0 5.5 4 9 10 9zm0 0c0-5 5-9 10-9-1 5.5-4.5 9-10 9" />
      </svg>
    ),
  },
  {
    title: 'ICAR‑IIHR Certified',
    body: 'Independently tested by government-accredited scientists at ICAR‑IIHR. Zero residues detected across 130+ compounds.',
    icon: (
      <img src="/assets/ICAR.png" alt="ICAR-IIHR" width={20} height={20} className="object-contain" />
    ),
  },
  {
    title: '24 hr Farm to Table',
    body: "Picked in the morning. At your door the next day. Freshness is not a promise — it's our process.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

export default function CommitmentSection() {
  return (
    <section
      id="promise"
      className="flex flex-col justify-center bg-white overflow-hidden"
      style={{ minHeight: 'auto' }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-24 md:py-32">

        <motion.p className="font-sans text-sm tracking-[0.35em] uppercase text-berry mb-6 font-semibold text-center" {...reveal(0)}>
          Our Promise
        </motion.p>

        <motion.h2 className="font-serif text-2xl md:text-4xl font-bold text-charcoal leading-tight mb-8" {...reveal(0.08)}>
          Our Commitment to you and the land.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              className="rounded-2xl border border-border p-5 md:p-6 hover:shadow-sm hover:border-charcoal/20 transition-all duration-300 cursor-default"
              {...reveal(0.2 + i * 0.08)}
            >
              <div className="text-green-600 mb-4">{p.icon}</div>
              <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mb-1.5">{p.title}</h3>
              <p className="font-sans text-xs md:text-[13px] text-muted leading-[1.75]">{p.body}</p>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  )
}

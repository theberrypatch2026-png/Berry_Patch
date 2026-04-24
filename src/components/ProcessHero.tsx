'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01', title: 'Organically Grown',
    body: 'No synthetic pesticides or fertilisers. Our Camarosa plants grow in rich Kodaikanal soil.',
    icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22V12m0 0C12 7 7 3 2 3c0 5.5 4 9 10 9zm0 0c0-5 5-9 10-9-1 5.5-4.5 9-10 9" /></svg>),
  },
  {
    number: '02', title: 'Hand-Harvested',
    body: 'Each berry is picked by hand at peak ripeness. Only the best make it into your order.',
    icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8a6 6 0 006 6h2a6 6 0 006-6v-4a2 2 0 00-2-2v0a2 2 0 00-2 2v0" /></svg>),
  },
  {
    number: '03', title: 'Inspected & Lab Tested',
    body: 'Tested at an ICAR accredited lab for 130+ pesticide compounds via LCMS-MS and GCMS-MS panels.',
    icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>),
  },
  {
    number: '04', title: 'Delivered in 24 Hours',
    body: 'From our farm to your door in under 24 hours. Orders before noon ship the same day.',
    icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M10 12h4" /></svg>),
  },
]

export default function ProcessHero() {
  return (
    <section
      id="process-steps"
      className="relative flex flex-col justify-center bg-white overflow-hidden"
      style={{ minHeight: 'auto' }}
    >
      <div className="max-w-7xl mx-auto w-full px-5 md:px-12" style={{ paddingTop: 'clamp(3rem, 6vw, 8rem)', paddingBottom: 'clamp(3rem, 6vw, 8rem)' }}>



        <motion.p
          className="font-sans text-sm tracking-[0.35em] uppercase text-berry mb-6 font-semibold text-center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}
        >
          From Farm to Table
        </motion.p>

        <motion.h1
          className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}
        >
          How we grow, test &amp; deliver.
        </motion.h1>

        <motion.p
          className="font-sans text-xs md:text-sm text-muted leading-relaxed mb-5 max-w-md"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}
        >
          Every step from seed to doorstep is handled with care and verified with science.
        </motion.p>

        {/* Always 2×2 grid so all 4 cards fit in one viewport */}
        <div className="grid grid-cols-2 gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="group rounded-xl border border-border bg-white p-4 hover:border-charcoal/20 hover:shadow-sm transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-green-600 group-hover:text-green-700 transition-colors duration-300">{step.icon}</span>
                <span className="font-serif text-2xl font-bold text-charcoal/30 leading-none">{step.number}</span>
              </div>
              <h3 className="font-serif text-sm md:text-base font-semibold text-charcoal mb-1">{step.title}</h3>
              <p className="font-sans text-[11px] md:text-xs text-muted leading-[1.6]">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function ComingSoonSection() {
  return (
    <section
      className="flex items-center bg-white overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
      style={{ minHeight: 'auto' }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-8 flex flex-col items-center text-center">

        <motion.p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted mb-5" {...reveal(0)}>
          Coming Soon
        </motion.p>

        <motion.h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal leading-[1.05] mb-6" {...reveal(0.1)}>
          Strawberry
          <br />
          <span className="italic font-normal text-berry">Preserve</span>
        </motion.h2>

        <motion.p className="font-sans text-sm md:text-[15px] text-muted leading-[1.8] max-w-lg mb-10" {...reveal(0.2)}>
          A small-batch preserve crafted from our finest Camarosa strawberries.
          No added sugar. No artificial flavours. Just the pure, sun-ripened sweetness of the hills — preserved.
        </motion.p>

        <motion.div className="flex flex-wrap justify-center gap-3 mb-12" {...reveal(0.3)}>
          {['No Added Sugar', 'Small Batch', 'Kodaikanal Berries', 'Artisan Made'].map((tag) => (
            <span key={tag} className="font-sans text-xs tracking-wide text-charcoal/60 border border-border px-4 py-2 rounded-full">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div className="flex items-center gap-4 w-full max-w-xs" {...reveal(0.4)}>
          <div className="h-px flex-1 bg-border" />
          <svg className="w-4 h-4 text-muted/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="3" /></svg>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BackLink from './BackLink'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative flex flex-col justify-center bg-white overflow-hidden py-16 md:py-24"
      style={{ minHeight: 'auto' }}
    >
      <BackLink />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-24 md:pb-32 pt-28 md:pt-36">

        <motion.p className="font-sans text-sm tracking-[0.35em] uppercase text-berry mb-6 text-center font-semibold" {...reveal(0)}>
          The Origin
        </motion.p>

        <motion.blockquote
          className="font-serif text-xl md:text-3xl lg:text-4xl italic font-normal text-charcoal leading-[1.4] text-center max-w-3xl mx-auto mb-10 md:mb-16"
          {...reveal(0.1)}
        >
          &ldquo;In the quiet hills of Kodaikanal, The Berry Patch began with a simple idea - to grow strawberries the right way.&rdquo;
        </motion.blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="grid grid-cols-3 gap-2 md:gap-4 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] md:aspect-square">
              <Image src="/assets/real-farm2.jpg" alt="Strawberry Plant" fill className="object-cover" sizes="(max-width: 768px) 33vw, 16vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] md:aspect-square">
              <Image src="/assets/real-berries2.jpg" alt="Strawberries on the farm" fill className="object-cover" sizes="(max-width: 768px) 33vw, 16vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] md:aspect-square">
              <Image src="/assets/real-farm.jpg" alt="Strawberry Farm Rows" fill className="object-cover" sizes="(max-width: 768px) 33vw, 16vw" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.h2 className="font-serif text-2xl md:text-4xl font-bold text-charcoal leading-tight" {...reveal(0.15)}>
              Our Story
            </motion.h2>
            <motion.p className="font-sans text-sm md:text-[15px] text-muted leading-[1.8]" {...reveal(0.22)}>
              We work with local farmers - no shortcuts, no chemicals. Grown organically in Kodaikanal&apos;s cool hills, just as nature intended.
            </motion.p>
            <motion.p className="font-sans text-sm md:text-[15px] text-muted leading-[1.8]" {...reveal(0.29)}>
              We chose the Camarosa variety - handpicked and lab-tested by ICAR-IIHR Bangalore with zero pesticide residue across 130+ compounds.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  )
}

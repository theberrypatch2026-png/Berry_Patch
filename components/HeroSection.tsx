'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'


export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center bg-white overflow-hidden px-5 pt-6 pb-4"
      style={{ height: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* Centred logo + branding */}
      <motion.div
        className="shrink-0 flex flex-col items-center text-center mb-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.01 }}
      >
        <Image src="/assets/logo.png" alt="The Berry Patch" width={200} height={200} className="object-contain" priority />
      </motion.div>

      {/* Vertical card stack — flex-1 fills all remaining space */}
      <motion.div
        className="w-full flex-1 min-h-0 flex flex-col gap-2"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        {/* Top Split: Strawberry (Left) / Raspberry & Blueberry (Right) */}
        <div className="flex w-full gap-2 flex-[3] min-h-0">
          <Link href="/process" className="relative flex-[1.4] rounded-2xl overflow-hidden group cursor-pointer">
            <Image src="/assets/strawberry.png" alt="Strawberry" fill className="object-contain scale-[1.15] group-hover:scale-[1.22] transition-transform duration-500" priority sizes="(max-width: 768px) 60vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1 font-sans text-[8px] tracking-[0.14em] uppercase text-white bg-forest/90 px-2 py-0.5 rounded-full">
                <span className="w-1 h-1 rounded-full bg-green-400 shrink-0" />Available Now
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 flex items-end justify-between">
              <p className="font-serif text-lg font-bold text-white">Strawberry</p>
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* Raspberry */}
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image src="/assets/raspberry.png" alt="Raspberry" fill className="object-cover" sizes="(max-width: 768px) 40vw, 30vw" />
              <div className="absolute inset-0 bg-[#7a0f20]/75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end px-3 py-2.5">
                <p className="font-sans text-[8px] tracking-[0.14em] uppercase text-white/55 mb-0.5">Coming Soon</p>
                <p className="font-serif text-[15px] font-bold text-white leading-tight">Raspberry</p>
              </div>
            </div>

            {/* Blueberry */}
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image src="/assets/blueberry.png" alt="Blueberry" fill className="object-cover" sizes="(max-width: 768px) 40vw, 30vw" />
              <div className="absolute inset-0 bg-[#0d1040]/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end px-3 py-2.5">
                <p className="font-sans text-[8px] tracking-[0.14em] uppercase text-white/55 mb-0.5">Coming Soon</p>
                <p className="font-serif text-[15px] font-bold text-white leading-tight">Blueberry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="shrink-0 w-full h-px bg-border my-1.5" />

        {/* Berry Preserve */}
        <div className="flex flex-col items-center justify-center px-4 py-3 flex-[0.5] rounded-xl bg-[#f9f9f8] border border-border min-h-[60px]">
          <p className="font-serif text-[22px] font-bold text-charcoal text-center tracking-widest">The Berry Preserve</p>
        </div>
      </motion.div>

      {/* Social cards */}
      <motion.div
        className="w-full mt-2 grid grid-cols-2 gap-2.5 shrink-0"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.36 }}
      >
        <a
          href="https://wa.me/919176540077"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/25 rounded-xl px-4 py-3.5 hover:bg-[#25D366]/18 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-semibold text-charcoal leading-tight">WhatsApp</p>
            <p className="font-sans text-[11px] text-muted truncate">+91 91765 40077</p>
          </div>
        </a>

        <a
          href="https://instagram.com/theberrypatch.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#E1306C]/10 border border-[#E1306C]/25 rounded-xl px-4 py-3.5 hover:bg-[#E1306C]/18 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6 text-[#E1306C] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-semibold text-charcoal leading-tight">Instagram</p>
            <p className="font-sans text-[11px] text-muted truncate">@theberrypatch.in</p>
          </div>
        </a>
      </motion.div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BackLink() {
  return (
    <motion.div
      className="absolute left-6 md:left-12 z-20"
      style={{ top: 'max(env(safe-area-inset-top, 0px) + 12px, 60px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-berry font-sans text-xs font-semibold text-white hover:bg-berry/90 transition-all duration-200 cursor-pointer shadow-md"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        back to berry patch
      </Link>
    </motion.div>
  )
}

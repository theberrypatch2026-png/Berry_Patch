'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BackLink() {
  return (
    <motion.div 
      className="absolute top-28 left-6 md:top-32 md:left-12 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/5 font-sans text-xs text-charcoal/80 hover:bg-charcoal/10 hover:text-charcoal transition-all duration-200 cursor-pointer backdrop-blur-sm"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        back to berry patch
      </Link>
    </motion.div>
  )
}

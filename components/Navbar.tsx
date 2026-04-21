'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const container =
      document.getElementById('scroll-container') ||
      document.getElementById('process-container')

    const handleScroll = () => {
      const top = container ? container.scrollTop : window.scrollY
      setScrolled(top > 72)
    }

    const target = container ?? window
    handleScroll()
    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => target.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 2.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/assets/logo.png"
            alt="The Berry Patch"
            width={34}
            height={34}
            className="object-contain"
          />
          <span className="font-serif text-base font-semibold text-charcoal tracking-tight">
            The Berry Patch
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#story"
            className="font-sans text-sm text-muted hover:text-charcoal transition-colors duration-200 tracking-wide cursor-pointer"
          >
            Our Story
          </Link>
          <Link
            href="/process"
            className="font-sans text-sm text-muted hover:text-charcoal transition-colors duration-200 tracking-wide cursor-pointer"
          >
            Process
          </Link>
          <a
            href="https://wa.me/919176540077"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-medium bg-berry text-white px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Order Now
          </a>
        </div>

        <a
          href="https://wa.me/919176540077"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden font-sans text-sm font-medium bg-berry text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
        >
          Order
        </a>
      </div>
    </motion.nav>
  )
}

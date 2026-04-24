'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHeroPage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Hide Navbar completely on the main hero page as requested
  if (isHeroPage) return null

  const navLinks = [
    { name: 'BERRY PATCH', href: '/' },
    { name: 'OUR STORY', href: '/process#story' },
    { name: 'PROCESS', href: '/process#process-steps' },
    { name: 'REPORT SUMMARY', href: '/process#lab-report' },
    { name: 'OUR PROMISE', href: '/process#promise' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg'
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center relative h-full">
        {/* Left Side: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link 
            href="/" 
            className="relative overflow-hidden rounded-xl bg-white/10 p-1 transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className={`object-contain transition-all duration-500 ${
                scrolled ? 'w-8 h-8 md:w-10 md:h-10' : 'w-10 h-10 md:w-12 md:h-12'
              }`}
            />
          </Link>
        </div>

        {/* Centered Branding */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href="/" className="flex flex-col items-center group">
            <span className={`font-serif font-bold text-charcoal tracking-tight transition-all duration-500 ${
              scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
            }`}>
              The Berry Patch
            </span>
            <span className={`font-sans text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-berry font-bold transition-all duration-500 ${
              scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto mt-0.5'
            }`}>
              Organic Goodness
            </span>
          </Link>
        </div>

        {/* Right Side: Dropdown Trigger */}
        <div className="flex-1 flex items-center justify-end">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 p-2 rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors group"
            >
              <div className="flex flex-col gap-1">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 4.5, width: '18px' } : { rotate: 0, y: 0, width: '18px' }}
                  className="h-0.5 bg-charcoal rounded-full origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-3 h-0.5 bg-charcoal rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -4.5, width: '18px' } : { rotate: 0, y: 0, width: '12px' }}
                  className="h-0.5 bg-charcoal rounded-full origin-center"
                />
              </div>
              <span className="hidden md:block font-sans text-[10px] font-bold tracking-widest text-charcoal pr-1 uppercase">Menu</span>
            </button>

            {/* Dropdown Menu (Small Window) */}
            <AnimatePresence>
              {menuOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-black/5"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-3 z-50 overflow-hidden"
                  >
                    <div className="flex flex-col gap-1.5">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:bg-charcoal/5 text-charcoal group"
                        >
                          <span className="font-serif text-sm font-bold tracking-tight">{link.name}</span>
                          <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-berry" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

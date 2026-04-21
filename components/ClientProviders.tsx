'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Loader from './Loader'

let hasSeenInitialRoute = false

function RouteLoader({ duration, pathname }: { duration: number; pathname: string }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <AnimatePresence>
      {loading && <Loader key={pathname} />}
    </AnimatePresence>
  )
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/'
  const duration = hasSeenInitialRoute ? 900 : 2200

  useEffect(() => {
    hasSeenInitialRoute = true
  }, [pathname])

  return (
    <>
      <RouteLoader
        key={pathname}
        pathname={pathname}
        duration={duration}
      />
      {children}
    </>
  )
}

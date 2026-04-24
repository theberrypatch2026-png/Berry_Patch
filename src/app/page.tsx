import HeroSection from '@/components/HeroSection'
import LockScroll from '@/components/LockScroll'

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-white">
      <LockScroll />
      <HeroSection />
    </main>
  )
}

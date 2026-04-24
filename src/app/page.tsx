import HeroSection from '@/components/HeroSection'
import LockScroll from '@/components/LockScroll'

export default function Home() {
  return (
    <main className="fixed inset-0 bg-white overflow-hidden flex flex-col">
      <LockScroll />
      <HeroSection />
    </main>
  )
}

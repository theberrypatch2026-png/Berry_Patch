import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main
      id="scroll-container"
      className="fixed inset-0 overflow-y-scroll"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      <HeroSection />
    </main>
  )
}

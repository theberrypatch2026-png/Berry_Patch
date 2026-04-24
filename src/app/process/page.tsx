import StorySection from '@/components/StorySection'
import ProcessHero from '@/components/ProcessHero'
import LabReport from '@/components/LabReport'
import LabPDFSection from '@/components/LabPDFSection'
import CommitmentSection from '@/components/CommitmentSection'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata = {
  title: 'Our Process - The Berry Patch',
  description: 'From farm to table: how we grow, harvest, test, and deliver organic Kodaikanal strawberries.',
}

export default function ProcessPage() {
  return (
    <main>
      <SmoothScroll />
      <StorySection />
      <ProcessHero />
      <LabReport />
      <LabPDFSection />
      <CommitmentSection />
    </main>
  )
}

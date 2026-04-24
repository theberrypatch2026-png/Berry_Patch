import ClientProviders from '@/components/ClientProviders'

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>
}

import type { ReactNode } from 'react'
import clsx from 'clsx'

// CSS-native adaptation of shadcn's small Card composition for this non-Tailwind project.
export function EvidenceCard({ children, opportunity }: { children: ReactNode; opportunity: boolean }) {
  return <section data-slot="card" data-size="sm" className={clsx('lw-evidence-block', opportunity ? 'is-opportunity' : 'is-check')}>{children}</section>
}
export function EvidenceCardHeader({ children }: { children: ReactNode }) {
  return <header data-slot="card-header" className="lw-evidence-heading">{children}</header>
}
export function EvidenceCardContent({ children }: { children: ReactNode }) {
  return <div data-slot="card-content" className="lw-evidence-content">{children}</div>
}
export function EvidenceCardFooter({ children }: { children: ReactNode }) {
  return <footer data-slot="card-footer" className="lw-evidence-sample">{children}</footer>
}
export function EvidenceBadge({ children }: { children: ReactNode }) {
  return <span data-slot="badge" className="lw-evidence-badge">{children}</span>
}

'use client'

import Link from 'next/link'
import { STUDENTS } from '@/lib/api'
import { cn } from '@/lib/utils'

// Segmented control to jump between the three demo students.
export function StudentSwitcher({ activeId }: { activeId: string }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
      {STUDENTS.map((s) => {
        const active = s.id === activeId
        return (
          <Link
            key={s.id}
            href={`/students/${s.id}`}
            className={cn(
              'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {s.name}
          </Link>
        )
      })}
    </div>
  )
}

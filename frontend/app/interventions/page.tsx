'use client'

import Link from 'next/link'
import { ArrowUpRight, ListChecks } from 'lucide-react'
import { useAllIntelligence } from '@/lib/hooks'
import { riskTheme } from '@/lib/risk'
import type { Intelligence, RiskLevel } from '@/lib/api'
import { PageHeader } from '@/components/page-header'
import { RiskBadge } from '@/components/risk-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/states'
import { cn } from '@/lib/utils'

const PRIORITY_LABEL: Record<RiskLevel, string> = {
  HIGH: 'Immediate Intervention',
  MEDIUM: 'Monitor & Support',
  LOW: 'Continue Monitoring',
}

// HIGH first, then MEDIUM, then LOW; within a level, higher score first.
const LEVEL_WEIGHT: Record<RiskLevel, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 }

export default function InterventionsPage() {
  const { data, error, isLoading } = useAllIntelligence()

  return (
    <div>
      <PageHeader
        title="Interventions"
        subtitle="Prioritized action plan for students who need support."
      />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : !data || data.length === 0 ? (
        <EmptyState label="No students to review." />
      ) : (
        <div className="space-y-4">
          {[...data]
            .sort(
              (a, b) =>
                LEVEL_WEIGHT[b.risk.level] - LEVEL_WEIGHT[a.risk.level] || b.risk.score - a.risk.score,
            )
            .map((item) => (
              <InterventionCard key={item.student.id} item={item} />
            ))}
        </div>
      )}
    </div>
  )
}

function InterventionCard({ item }: { item: Intelligence }) {
  const { student, risk, insights, recommendations } = item
  const t = riskTheme(risk.level)

  return (
    <article className={cn('rounded-xl border bg-card', t.border)}>
      <div className={cn('flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between', t.border)}>
        <div className="flex items-center gap-4">
          <div className={cn('flex size-12 items-center justify-center rounded-xl text-sm font-semibold', t.bg, t.text)}>
            {risk.score}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{student.name}</h2>
              <RiskBadge level={risk.level} />
            </div>
            <p className="text-xs text-muted-foreground">
              {student.rollNumber} · {student.className}
            </p>
          </div>
        </div>
        <span className={cn('inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold', t.bg, t.border, t.text)}>
          {PRIORITY_LABEL[risk.level]}
        </span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Main Concerns
          </h3>
          {insights?.length ? (
            <ul className="space-y-2">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex gap-2.5 text-sm text-pretty text-muted-foreground">
                  <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', t.dot)} />
                  {insight}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No concerns reported.</p>
          )}
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <ListChecks className="size-3.5" />
            Recommended Actions
          </h3>
          {recommendations?.length ? (
            <ol className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2.5 text-sm text-pretty text-muted-foreground">
                  <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {rec}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">No recommendations available.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border px-5 py-4">
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View Student
          <ArrowUpRight className="size-4" />
        </Link>
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
        >
          View Recommendations
        </Link>
      </div>
    </article>
  )
}

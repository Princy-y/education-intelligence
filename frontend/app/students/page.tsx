'use client'

import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { useAllIntelligence } from '@/lib/hooks'
import { riskTheme } from '@/lib/risk'
import { PageHeader } from '@/components/page-header'
import { RiskBadge } from '@/components/risk-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/states'

export default function StudentsPage() {
  const { data, error, isLoading } = useAllIntelligence()
  const router = useRouter()

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="All monitored students and their current academic risk."
      />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : !data || data.length === 0 ? (
        <EmptyState label="No students found." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Roll Number</th>
                  <th className="px-6 py-3 font-medium">Class</th>
                  <th className="px-6 py-3 font-medium">Risk</th>
                  <th className="px-6 py-3 font-medium">Risk Score</th>
                  <th className="px-6 py-3 font-medium">Attendance</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3" aria-label="Open" />
                </tr>
              </thead>
              <tbody>
                {data.map((i) => {
                  const t = riskTheme(i.risk.level)
                  return (
                    <tr
                      key={i.student.id}
                      onClick={() => router.push(`/students/${i.student.id}`)}
                      className="group cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-xs font-semibold text-primary">
                            {i.student.name
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </span>
                          <span className="font-medium">{i.student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{i.student.rollNumber}</td>
                      <td className="px-6 py-4 text-muted-foreground">{i.student.className}</td>
                      <td className="px-6 py-4">
                        <RiskBadge level={i.risk.level} />
                      </td>
                      <td className="px-6 py-4 font-semibold tabular-nums">{i.risk.score}</td>
                      <td className="px-6 py-4 tabular-nums">{i.performance.attendance}%</td>
                      <td className={`px-6 py-4 font-medium ${t.text}`}>{t.message}</td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className="ml-auto size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

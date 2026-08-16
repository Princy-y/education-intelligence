'use client'

import { CalendarCheck, ClipboardList, GraduationCap, LifeBuoy } from 'lucide-react'
import { useAllIntelligence } from '@/lib/hooks'
import { computeAggregates } from '@/lib/aggregate'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { RiskDistribution } from '@/components/risk-distribution'
import { LoadingState, ErrorState } from '@/components/states'

function ScoreBar({ label, value, bar }: { label: string; value: number; bar: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tabular-nums">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const { data, error, isLoading } = useAllIntelligence()

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Cohort-level performance aggregated across all monitored students."
      />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : !data ? null : (
        (() => {
          const agg = computeAggregates(data)
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Avg. Attendance" value={agg.avgAttendance} suffix="%" icon={CalendarCheck} accent="primary" />
                <StatCard label="Avg. Assignment" value={agg.avgAssignment} suffix="%" icon={ClipboardList} accent="success" />
                <StatCard label="Avg. Examination" value={agg.avgExam} suffix="%" icon={GraduationCap} accent="warning" />
                <StatCard
                  label="Need Intervention"
                  value={agg.needingIntervention}
                  icon={LifeBuoy}
                  accent="danger"
                  hint={`of ${agg.total} students`}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-sm font-semibold">Risk Distribution</h2>
                  <p className="mb-5 text-xs text-muted-foreground">Share of students by risk level</p>
                  <RiskDistribution counts={agg.counts} total={agg.total} />
                </section>

                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-sm font-semibold">Average Performance</h2>
                  <p className="mb-5 text-xs text-muted-foreground">Cohort averages by category</p>
                  <div className="space-y-4">
                    <ScoreBar label="Attendance" value={agg.avgAttendance} bar="bg-primary" />
                    <ScoreBar label="Assignment Score" value={agg.avgAssignment} bar="bg-success" />
                    <ScoreBar label="Examination Score" value={agg.avgExam} bar="bg-warning" />
                  </div>
                </section>
              </div>

              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-sm font-semibold">Students Requiring Intervention</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {data
                    .filter((i) => i.risk.level !== 'LOW')
                    .sort((a, b) => b.risk.score - a.risk.score)
                    .map((i) => (
                      <div key={i.student.id} className="rounded-lg border border-border bg-background p-4">
                        <p className="font-medium">{i.student.name}</p>
                        <p className="text-xs text-muted-foreground">{i.student.className}</p>
                        <p className="mt-3 text-2xl font-semibold tabular-nums">{i.risk.score}</p>
                        <p className="text-xs text-muted-foreground">{i.risk.level} risk</p>
                      </div>
                    ))}
                  {data.filter((i) => i.risk.level !== 'LOW').length === 0 ? (
                    <p className="text-sm text-muted-foreground">No students currently require intervention.</p>
                  ) : null}
                </div>
              </section>
            </div>
          )
        })()
      )}
    </div>
  )
}

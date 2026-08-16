'use client'

import Link from 'next/link'
import { Users, ShieldCheck, ShieldAlert, ShieldX, ArrowUpRight } from 'lucide-react'
import { useAllIntelligence } from '@/lib/hooks'
import { computeAggregates } from '@/lib/aggregate'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { RiskDistribution } from '@/components/risk-distribution'
import { RiskBadge, Trend } from '@/components/risk-badge'
import { LoadingState, ErrorState } from '@/components/states'

export default function DashboardPage() {
  const { data, error, isLoading } = useAllIntelligence()

  const status = (
    <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      Intelligence System Online
    </div>
  )

  return (
    <div>
      <PageHeader
        title="Academic Intelligence"
        subtitle="Monitor student performance and identify risks early."
        action={status}
      />

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : !data ? null : (
        <DashboardContent items={data} />
      )}
    </div>
  )
}

function DashboardContent({ items }: { items: NonNullable<ReturnType<typeof useAllIntelligence>['data']> }) {
  const agg = computeAggregates(items)

  // High-priority first: sort by risk score descending.
  const ranked = [...items].sort((a, b) => b.risk.score - a.risk.score)
  const highPriority = ranked.filter((i) => i.risk.level !== 'LOW')
  const priorityList = highPriority.length > 0 ? highPriority : ranked.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Students" value={agg.total} icon={Users} accent="primary" />
        <StatCard label="Low Risk" value={agg.counts.LOW} icon={ShieldCheck} accent="success" />
        <StatCard label="Medium Risk" value={agg.counts.MEDIUM} icon={ShieldAlert} accent="warning" />
        <StatCard label="High Risk" value={agg.counts.HIGH} icon={ShieldX} accent="danger" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-6 lg:col-span-1">
          <h2 className="text-sm font-semibold">Risk Distribution</h2>
          <p className="mb-5 text-xs text-muted-foreground">Across {agg.total} monitored students</p>
          <RiskDistribution counts={agg.counts} total={agg.total} />
        </section>

        <section className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold">Quick Access</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Select a student to open their full intelligence profile.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {items.map((i) => (
              <Link
                key={i.student.id}
                href={`/students/${i.student.id}`}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <RiskBadge level={i.risk.level} />
                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium leading-tight">{i.student.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.student.rollNumber} · {i.student.className}
                  </p>
                </div>
                <p className="text-2xl font-semibold tabular-nums">
                  {i.risk.score}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">risk score</span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold">High-Priority Students</h2>
            <p className="text-xs text-muted-foreground">Ranked by academic risk score</p>
          </div>
          <Link
            href="/interventions"
            className="text-xs font-medium text-primary hover:underline"
          >
            View interventions
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Student</th>
                <th className="px-6 py-3 font-medium">Roll Number</th>
                <th className="px-6 py-3 font-medium">Risk Score</th>
                <th className="px-6 py-3 font-medium">Risk Level</th>
                <th className="px-6 py-3 font-medium">Attendance</th>
                <th className="px-6 py-3 font-medium">Trend</th>
                <th className="px-6 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {priorityList.map((i) => (
                <tr key={i.student.id} className="border-b border-border/60 last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-medium">{i.student.name}</p>
                    <p className="text-xs text-muted-foreground">{i.student.className}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{i.student.rollNumber}</td>
                  <td className="px-6 py-4 font-semibold tabular-nums">{i.risk.score}</td>
                  <td className="px-6 py-4">
                    <RiskBadge level={i.risk.level} />
                  </td>
                  <td className="px-6 py-4 tabular-nums">{i.performance.attendance}%</td>
                  <td className="px-6 py-4">
                    <Trend value={i.performance.scoreTrend} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/students/${i.student.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      View
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

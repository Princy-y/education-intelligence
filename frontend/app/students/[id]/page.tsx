'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  CheckCircle2,
  Clock,
  Activity,
  Lightbulb,
} from 'lucide-react'
import { useIntelligence } from '@/lib/hooks'
import { riskTheme } from '@/lib/risk'
import type { Intelligence } from '@/lib/api'
import { StudentSwitcher } from '@/components/student-switcher'
import { Trend } from '@/components/risk-badge'
import { LoadingState, ErrorState, EmptyState } from '@/components/states'
import { cn } from '@/lib/utils'

export default function StudentIntelligencePage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const { data, error, isLoading } = useIntelligence(id)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/students"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to students
        </Link>
        {id ? <StudentSwitcher activeId={id} /> : null}
      </div>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : !data ? (
        <EmptyState label="No intelligence data for this student." />
      ) : (
        <StudentIntelligence data={data} />
      )}
    </div>
  )
}

function StudentIntelligence({ data }: { data: Intelligence }) {
  const { student, performance, risk, insights, recommendations } = data
  const t = riskTheme(risk.level)

  const metrics = [
    { label: 'Attendance', value: `${performance.attendance}%`, icon: CalendarCheck },
    { label: 'Assignment Average', value: `${performance.assignmentAverage}%`, icon: ClipboardList },
    { label: 'Exam Average', value: `${performance.examAverage}%`, icon: GraduationCap },
    { label: 'Completion Rate', value: `${performance.completionRate}%`, icon: CheckCircle2 },
    { label: 'Pending Assignments', value: performance.pendingAssignments, icon: Clock },
  ]

  return (
    <div className="space-y-6">
      {/* Identity + Risk hero */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-primary/15 text-lg font-semibold text-primary">
              {student.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">{student.name}</h1>
              <p className="text-sm text-muted-foreground">{student.department}</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: 'Class', v: student.className },
              { k: 'Roll Number', v: student.rollNumber },
              { k: 'Year', v: `Year ${student.year}` },
              { k: 'Score Trend', v: null },
            ].map((row) => (
              <div key={row.k} className="rounded-lg border border-border bg-background p-3">
                <dt className="text-xs text-muted-foreground">{row.k}</dt>
                <dd className="mt-0.5 font-medium">
                  {row.v !== null ? row.v : <Trend value={performance.scoreTrend} />}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Big Academic Risk card */}
        <div className={cn('flex flex-col justify-between rounded-xl border p-6', t.bg, t.border)}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Academic Risk
            </p>
            <Activity className={cn('size-5', t.text)} />
          </div>
          <div className="py-2">
            <p className={cn('text-6xl font-bold tabular-nums tracking-tight', t.text)}>{risk.score}</p>
            <p className={cn('mt-1 text-lg font-semibold', t.text)}>{t.label.toUpperCase()}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t.message}</p>
        </div>
      </div>

      {/* Performance metrics */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">Performance Overview</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4">
              <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <p className="mt-3 text-2xl font-semibold tabular-nums">{value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insights + Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className={cn('flex size-8 items-center justify-center rounded-lg', t.bg, t.text)}>
              <Lightbulb className="size-4" />
            </span>
            <h2 className="font-semibold">{t.insightQuestion}</h2>
          </div>
          {insights?.length ? (
            <ul className="space-y-3">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-pretty">
                  <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', t.dot)} />
                  <span className="text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No insights available.</p>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Recommended Actions</h2>
          {recommendations?.length ? (
            <ol className="space-y-3">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="font-mono text-sm font-semibold text-primary tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-pretty text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">No recommendations available.</p>
          )}
        </section>
      </div>
    </div>
  )
}

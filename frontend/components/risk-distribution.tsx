import type { RiskLevel } from '@/lib/api'

const ORDER: { level: RiskLevel; label: string; bar: string; text: string }[] = [
  { level: 'LOW', label: 'Low Risk', bar: 'bg-success', text: 'text-success' },
  { level: 'MEDIUM', label: 'Medium Risk', bar: 'bg-warning', text: 'text-warning' },
  { level: 'HIGH', label: 'High Risk', bar: 'bg-danger', text: 'text-danger' },
]

export function RiskDistribution({
  counts,
  total,
}: {
  counts: Record<RiskLevel, number>
  total: number
}) {
  const safeTotal = total || 1

  return (
    <div className="space-y-5">
      {/* Stacked proportion bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {ORDER.map(({ level, bar }) => {
          const pct = (counts[level] / safeTotal) * 100
          return pct > 0 ? <div key={level} className={bar} style={{ width: `${pct}%` }} /> : null
        })}
      </div>

      <div className="space-y-3">
        {ORDER.map(({ level, label, bar, text }) => {
          const count = counts[level]
          const pct = Math.round((count / safeTotal) * 100)
          return (
            <div key={level}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className={`size-2 rounded-full ${bar}`} />
                  {label}
                </span>
                <span className="tabular-nums">
                  <span className={`font-semibold ${text}`}>{count}</span>
                  <span className="text-muted-foreground"> · {pct}%</span>
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

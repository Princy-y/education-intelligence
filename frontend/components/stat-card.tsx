import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  accent = 'default',
  hint,
}: {
  label: string
  value: string | number
  suffix?: string
  icon?: LucideIcon
  accent?: 'default' | 'success' | 'warning' | 'danger' | 'primary'
  hint?: string
}) {
  const accentMap = {
    default: 'text-muted-foreground bg-muted',
    primary: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  } as const

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon ? (
          <span className={cn('flex size-8 items-center justify-center rounded-lg', accentMap[accent])}>
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">{value}</span>
        {suffix ? <span className="text-lg text-muted-foreground">{suffix}</span> : null}
      </div>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

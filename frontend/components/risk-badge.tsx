import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import type { RiskLevel } from '@/lib/api'
import { riskTheme } from '@/lib/risk'
import { cn } from '@/lib/utils'

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const t = riskTheme(level)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        t.bg,
        t.border,
        t.text,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', t.dot)} />
      {level}
    </span>
  )
}

export function Trend({ value, className }: { value: number; className?: string }) {
  const up = value > 0
  const flat = value === 0
  const Icon = flat ? Minus : up ? TrendingUp : TrendingDown
  const color = flat ? 'text-muted-foreground' : up ? 'text-success' : 'text-danger'
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm font-medium tabular-nums', color, className)}>
      <Icon className="size-4" />
      {up ? '+' : ''}
      {value}
    </span>
  )
}

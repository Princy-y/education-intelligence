import type { Intelligence, RiskLevel } from '@/lib/api'

export interface Aggregates {
  total: number
  counts: Record<RiskLevel, number>
  avgAttendance: number
  avgAssignment: number
  avgExam: number
  needingIntervention: number
}

function avg(values: number[]): number {
  if (values.length === 0) return 0
  const sum = values.reduce((a, b) => a + b, 0)
  return Math.round((sum / values.length) * 10) / 10
}

export function computeAggregates(items: Intelligence[]): Aggregates {
  const counts: Record<RiskLevel, number> = { LOW: 0, MEDIUM: 0, HIGH: 0 }
  for (const item of items) counts[item.risk.level] += 1

  return {
    total: items.length,
    counts,
    avgAttendance: avg(items.map((i) => i.performance.attendance)),
    avgAssignment: avg(items.map((i) => i.performance.assignmentAverage)),
    avgExam: avg(items.map((i) => i.performance.examAverage)),
    needingIntervention: counts.HIGH + counts.MEDIUM,
  }
}

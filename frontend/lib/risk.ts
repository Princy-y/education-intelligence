import type { RiskLevel } from '@/lib/api'

interface RiskTheme {
  label: string
  message: string
  action: string
  insightQuestion: string
  // Tailwind class fragments keyed to the semantic risk tokens.
  text: string
  bg: string
  border: string
  dot: string
  ring: string
}

const THEMES: Record<RiskLevel, RiskTheme> = {
  LOW: {
    label: 'Low Risk',
    message: 'Student is performing well',
    action: 'Continue Monitoring',
    insightQuestion: 'Why is this student performing well?',
    text: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/30',
    dot: 'bg-success',
    ring: 'text-success',
  },
  MEDIUM: {
    label: 'Medium Risk',
    message: 'Monitoring recommended',
    action: 'Monitor & Support',
    insightQuestion: 'Why does this student need monitoring?',
    text: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    dot: 'bg-warning',
    ring: 'text-warning',
  },
  HIGH: {
    label: 'High Risk',
    message: 'Immediate attention recommended',
    action: 'Immediate Intervention',
    insightQuestion: 'Why is this student at high risk?',
    text: 'text-danger',
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    dot: 'bg-danger',
    ring: 'text-danger',
  },
}

export function riskTheme(level: RiskLevel | undefined): RiskTheme {
  return THEMES[level ?? 'LOW']
}

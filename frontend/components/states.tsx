import { AlertTriangle, Inbox, Loader2 } from 'lucide-react'
import { API_BASE_URL } from '@/lib/api'

export function LoadingState({ label = 'Loading intelligence…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-20 text-muted-foreground">
      <Loader2 className="size-6 animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function ErrorState({ error }: { error?: Error }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-danger/30 bg-danger/5 px-6 py-16 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-danger/15 text-danger">
        <AlertTriangle className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-foreground">Unable to reach the intelligence service</p>
        <p className="max-w-md text-sm text-muted-foreground text-pretty">
          Make sure the backend is running at{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{API_BASE_URL}</code>.
          {error?.message ? ` (${error.message})` : ''}
        </p>
      </div>
    </div>
  )
}

export function EmptyState({ label = 'Nothing to show yet.' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-16 text-muted-foreground">
      <Inbox className="size-6" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

// Skeleton block for card-level loading.
export function SkeletonCard({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl border border-border bg-card ${className}`} />
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrainCircuit, LayoutDashboard, Users, BarChart3, LifeBuoy } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/students', label: 'Students', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/interventions', label: 'Interventions', icon: LifeBuoy },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
            <BrainCircuit className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-sidebar-foreground">EduIntel</p>
            <p className="text-xs text-muted-foreground">Academic Intelligence</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                )}
              >
                <Icon className="size-4.5 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Intelligence System Online
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col md:pl-64">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-border bg-sidebar px-5 py-4 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <BrainCircuit className="size-4" />
            </div>
            <span className="font-semibold">EduIntel</span>
          </div>
          <nav className="flex gap-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg',
                    active ? 'bg-sidebar-accent text-primary' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="size-4.5" />
                </Link>
              )
            })}
          </nav>
        </header>

        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}

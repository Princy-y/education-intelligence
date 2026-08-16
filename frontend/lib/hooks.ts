'use client'

import useSWR from 'swr'
import { fetchIntelligence, STUDENTS, type Intelligence } from '@/lib/api'

// Fetch a single student's intelligence payload.
export function useIntelligence(id: string | undefined) {
  const { data, error, isLoading } = useSWR<Intelligence>(
    id ? ['intelligence', id] : null,
    () => fetchIntelligence(id as string),
  )

  return {
    data: data ?? null,
    error: error as Error | undefined,
    isLoading,
  }
}

// Fetch intelligence for every known student (used by dashboard/analytics/interventions).
export function useAllIntelligence() {
  const { data, error, isLoading } = useSWR<Intelligence[]>(
    ['intelligence-all'],
    () => Promise.all(STUDENTS.map((s) => fetchIntelligence(s.id))),
  )

  return {
    data: data ?? null,
    error: error as Error | undefined,
    isLoading,
  }
}

import axios from 'axios'

// Single source of truth for the backend base URL.
export const API_BASE_URL = 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

// ---- Types describing the /intelligence response ----

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export interface StudentInfo {
  id: string
  name: string
  email: string
  rollNumber: string
  year: number
  className: string
  department: string
}

export interface Performance {
  attendance: number
  assignmentAverage: number
  examAverage: number
  previousScore: number
  completionRate: number
  scoreTrend: number
  pendingAssignments: number
}

export interface Risk {
  score: number
  level: RiskLevel
}

export interface Intelligence {
  student: StudentInfo
  performance: Performance
  risk: Risk
  insights: string[]
  recommendations: string[]
}

// The three demo students exposed by the existing backend.
export interface DirectoryStudent {
  id: string
  name: string
}

export const STUDENTS: DirectoryStudent[] = [
  { id: '44444444-4444-4444-4444-444444444441', name: 'Arun Kumar' },
  { id: '44444444-4444-4444-4444-444444444442', name: 'Priya Sharma' },
  { id: '44444444-4444-4444-4444-444444444443', name: 'Karthik Raj' },
]

export async function fetchIntelligence(id: string): Promise<Intelligence> {
  const { data } = await api.get<Intelligence>(`/api/students/${id}/intelligence`)
  return data
}

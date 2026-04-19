import { apiRequest } from "../api-client"

export interface CounselorWorkload {
  counselorId: number
  name: string
  email: string
  totalLeads: number
  hotLeads: number
  immediateHotLeads: number
  warmLeads: number
  coldLeads: number
  featureLeads: number
  contactedLeads: number
  lastAssignedAt: string | null
}

export interface RoundRobinResult {
  assignedCount: number
  counselorAssignments: Record<string, number>
}

export interface AssignmentHistoryEntry {
  id: number
  fromCounselorName: string | null
  toCounselorName: string | null
  assignedByName: string | null
  reason: string | null
  assignedAt: string
}

export async function assignLeadsRoundRobin(leadIds?: number[]): Promise<RoundRobinResult> {
  const body = leadIds && leadIds.length > 0 ? { leadIds } : {}
  const result = await apiRequest<RoundRobinResult>("/leads/assign/round-robin", { method: "POST", body })
  if (!result.success || !result.data) throw new Error(result.message || "Round-robin assignment failed")
  return result.data
}

export async function getCounselorWorkload(): Promise<CounselorWorkload[]> {
  const result = await apiRequest<CounselorWorkload[]>("/leads/counselor-workload")
  if (!result.success || !result.data) throw new Error(result.message || "Failed to fetch workload")
  return result.data
}

export async function reassignLead(leadId: number, newCounselorId: number, reason: string): Promise<void> {
  const result = await apiRequest(`/leads/${leadId}/reassign`, { method: "PUT", body: { newCounselorId, reason } })
  if (!result.success) throw new Error(result.message || "Reassignment failed")
}

export async function getLeadAssignmentHistory(leadId: number): Promise<AssignmentHistoryEntry[]> {
  const result = await apiRequest<AssignmentHistoryEntry[]>(`/leads/${leadId}/assignment-history`)
  if (!result.success || !result.data) throw new Error(result.message || "Failed to fetch history")
  return result.data
}

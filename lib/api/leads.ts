import { apiRequest } from "../api-client"
import type { Campaign } from "../../app/admin/leads/types"

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
  const result = await apiRequest<RoundRobinResult>("/api/leads/assign/round-robin", { method: "POST", body })
  if (!result.success || !result.data) throw new Error(result.message || "Round-robin assignment failed")
  return result.data
}

export async function getCounselorWorkload(): Promise<CounselorWorkload[]> {
  const result = await apiRequest<CounselorWorkload[]>("/api/leads/counselor-workload")
  if (!result.success || !result.data) throw new Error(result.message || "Failed to fetch workload")
  return result.data
}

export async function reassignLead(leadId: number, newCounselorId: number, reason: string): Promise<void> {
  const result = await apiRequest(`/api/leads/${leadId}/reassign`, { method: "PUT", body: { newCounselorId, reason } })
  if (!result.success) throw new Error(result.message || "Reassignment failed")
}

export async function getLeadAssignmentHistory(leadId: number): Promise<AssignmentHistoryEntry[]> {
  const result = await apiRequest<AssignmentHistoryEntry[]>(`/api/leads/${leadId}/assignment-history`)
  if (!result.success || !result.data) throw new Error(result.message || "Failed to fetch history")
  return result.data
}

export async function getCampaigns(): Promise<Campaign[]> {
  const result = await apiRequest<Campaign[]>("/api/campaigns")
  if (!result.success || !result.data) throw new Error(result.message || "Failed to fetch campaigns")
  return result.data
}

export async function createCampaignApi(data: {
  name: string
  source: string
  description?: string
  qrCode?: string
}): Promise<Campaign> {
  const result = await apiRequest<Campaign>("/api/campaigns", { method: "POST", body: data })
  if (!result.success || !result.data) throw new Error(result.message || "Failed to create campaign")
  return result.data
}

/**
 * Type definitions for Lead Management System
 * @module LeadTypes
 * @description Comprehensive type definitions for lead management, ensuring type safety across the application
 */

/**
 * User interface representing system users
 * @interface User
 */
export interface User {
  /** Unique identifier for the user */
  id: string
  /** Full name of the user */
  name: string
  /** Role of the user in the system (admin, counselor, etc.) */
  role: string
  /** Optional email address */
  email?: string
}

/**
 * Lead interface representing a potential customer
 * @interface Lead
 */
export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  status: string
  score: number
  source: string
  assignedTo?: string
  createdAt: string
  tags?: string[]
  engagementLevel?: number
  urgency?: string
  timeline?: string
  qualification?: any
  college?: string
}

export interface LeadOwnership {
  ownerId: string
  ownerName: string
  assignedDate: string
  assignedBy: string
}

export interface LeadAccessControl {
  userId: string
  userName: string
  accessLevel: "owner" | "editor" | "viewer"
  grantedDate: string
  grantedBy: string
}

export interface LeadTransferHistory {
  id: string
  fromUserId: string
  fromUserName: string
  toUserId: string
  toUserName: string
  reason: string
  transferDate: string
  transferredBy: string
  notes?: string
}

export interface Counselor {
  id: string
  name: string
  activeLeads: number
  performance: number
}

export interface Campaign {
  id: string
  name: string
  source: string
  totalLeads?: number
  assignedLeads?: number
  unassignedLeads?: number
  duplicates?: number
  status: string
  createdDate: string
}

export interface Allocation {
  id: string
  leadsAllocated?: number
  leadsContacted?: number
  leadsConverted?: number
  pending?: number
  completed?: number
}

export interface CallLog {
  id: string
  status: string
  leadName?: string
  recordingUrl?: string
}

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

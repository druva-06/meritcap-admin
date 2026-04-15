/**
 * API Client for Student Management (Admin)
 */

import { api } from "../api-client"

// ── Types ──────────────────────────────────────────────────────────────────

export interface StudentSummary {
  userId: number
  studentId: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  profilePicture?: string
  gender?: string
  dateOfBirth?: string
  graduationLevel?: string
  profileActiveStatus?: string
  profileCompletion?: number
  // Application analytics
  totalApplications: number
  pendingApplications: number
  submittedApplications: number
  approvedApplications: number
  rejectedApplications: number
  // Document analytics
  totalDocuments: number
  pendingDocuments: number
  verifiedDocuments: number
  // Other
  wishlistCount: number
  educationRecordsCount: number
}

export interface DocumentResponse {
  id: number
  referenceType: string
  referenceId: number
  documentType: string
  documentStatus: "PENDING" | "VERIFIED"
  category: string
  remarks?: string
  fileUrl: string
  uploadedBy: string
  uploadedAt: string
}

export interface ApplicationResponse {
  registrationId: number
  studentId: number
  collegeCourseSnapshotId: number
  intakeSession: string
  applicationYear: number
  status: string
  remarks?: string
  createdAt: string
  updatedAt: string
  courseName: string
  collegeName: string
}

export interface WishlistItemResponse {
  wishlistItemId: number
  studentId: number
  collegeCourseId: number
  collegeName: string
  courseName: string
  campusName?: string
  tuitionFee?: string
  countryId?: number
  intakeMonths?: string[]
}

export interface EducationResponse {
  educationId: number
  educationLevel: string
  institutionName: string
  board?: string
  collegeCode?: string
  institutionAddress?: string
  startYear?: string
  endYear?: string
  percentage?: number
  cgpa?: number
  fieldOfStudy?: string
  degree?: string
  backlogs?: number
}

// ── API Functions ──────────────────────────────────────────────────────────

/**
 * Fetch student analytics summary (applications, docs, wishlist counts etc.)
 */
export async function getStudentSummary(studentId: number): Promise<StudentSummary> {
  const response = await api.get<any>(`/api/admin/students/${studentId}/summary`)
  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to fetch student summary")
  }
  return response.data as StudentSummary
}

/**
 * Fetch all documents for a student
 */
export async function getStudentDocuments(studentId: number): Promise<DocumentResponse[]> {
  const response = await api.get<any>(
    `/api/documents/list?referenceType=STUDENT&referenceId=${studentId}`
  )
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch documents")
  }
  return (response.data as DocumentResponse[]) || []
}

/**
 * Approve or reject a document
 */
export async function updateDocumentStatus(
  documentId: number,
  status: "VERIFIED" | "PENDING",
  remarks?: string
): Promise<DocumentResponse> {
  let url = `/api/documents/admin/${documentId}/status?status=${status}`
  if (remarks) url += `&remarks=${encodeURIComponent(remarks)}`
  const response = await api.put<any>(url, {})
  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to update document status")
  }
  return response.data as DocumentResponse
}

/**
 * Fetch all applications/registrations for a student
 */
export async function getStudentApplications(studentId: number): Promise<ApplicationResponse[]> {
  const response = await api.get<any>(
    `/api/admin/student-college-course-registration?studentId=${studentId}`
  )
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch applications")
  }
  return (response.data as ApplicationResponse[]) || []
}

/**
 * Fetch wishlist for a student
 */
export async function getStudentWishlist(studentId: number): Promise<WishlistItemResponse[]> {
  const response = await api.get<any>(`/api/admin/wishlists?studentId=${studentId}`)
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch wishlist")
  }
  return (response.data as WishlistItemResponse[]) || []
}

/**
 * Fetch education records for a student
 */
export async function getStudentEducation(userId: number): Promise<EducationResponse[]> {
  const response = await api.get<any>(`/api/student-education/get?userId=${userId}`)
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch education records")
  }
  return (response.data as EducationResponse[]) || []
}

/**
 * Generate a 15-minute presigned URL for viewing/downloading a document
 */
export async function getDocumentPresignedUrl(documentId: number): Promise<string> {
  const response = await api.get<any>(`/api/documents/${documentId}/presigned-url`)
  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to generate document URL")
  }
  // Backend returns the URL string directly as the response data
  return response.data as string
}

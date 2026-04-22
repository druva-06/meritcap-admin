"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Mail, MessageSquare, FileText, ArrowRightLeft } from "lucide-react"

export interface LeadRow {
  id: string
  name: string
  email: string
  phone?: string
  phone_number?: string
  status: string
  score: number
  tags?: string[]
  assigned_to_name?: string
  assignedTo?: string
}

interface LeadOwnership {
  ownerId: string
  ownerName: string
}

type AccessLevel = "owner" | "editor" | "viewer" | "none"

interface LeadsTableProps {
  leads: LeadRow[]
  isLoading: boolean
  pageSize: number
  selectedLeads: string[]
  onSelectedLeadsChange: (ids: string[]) => void
  leadOwnerships: Map<string, LeadOwnership>
  currentUserId: string
  isCounselor: boolean
  getAccessLevel: (leadId: string) => AccessLevel
  canEdit: (leadId: string) => boolean
  onReassign: (leadId: string) => void
  onEmail: (lead: LeadRow) => void
  onSMS: (lead: LeadRow) => void
  onNotes: (lead: LeadRow) => void
  // Pagination
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

const statusBadgeClass = (status: string) => {
  switch (status) {
    case "IMMEDIATE_HOT":
      return "bg-gradient-to-r from-red-600 to-red-700 text-white border-0 shadow-md font-bold"
    case "HOT":
      return "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-sm"
    case "WARM":
      return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm"
    case "COLD":
      return "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-0 shadow-sm"
    case "FEATURE_LEAD":
      return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-sm"
    case "CONTACTED":
      return "bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

const statusLabel = (status: string) => (status === "IMMEDIATE_HOT" ? "IMMEDIATE HOT" : status === "FEATURE_LEAD" ? "FEATURE LEAD" : status)

export function LeadsTable({
  leads,
  isLoading,
  pageSize,
  selectedLeads,
  onSelectedLeadsChange,
  leadOwnerships,
  currentUserId,
  isCounselor,
  getAccessLevel,
  canEdit,
  onReassign,
  onEmail,
  onSMS,
  onNotes,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
  onPageSizeChange,
}: LeadsTableProps) {
  const router = useRouter()
  const allChecked = selectedLeads.length === leads.length && leads.length > 0

  const toggleAll = (checked: boolean) => {
    onSelectedLeadsChange(checked ? leads.map((l) => l.id) : [])
  }

  const toggleOne = (id: string, checked: boolean) => {
    onSelectedLeadsChange(checked ? [...selectedLeads, id] : selectedLeads.filter((x) => x !== id))
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto custom-scrollbar" style={{ minHeight: isLoading ? "600px" : "auto" }}>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox checked={allChecked} onCheckedChange={(c) => toggleAll(!!c)} />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Lead Info</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tags</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <tr
                    key={`skeleton-${index}`}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-4 py-4"><Skeleton className="h-4 w-4 rounded" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-3 w-52" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Skeleton className="h-4 w-28" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-2 w-16 rounded-full" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1.5">
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                leads.map((lead) => {
                  const ownership = leadOwnerships.get(lead.id)
                  const accessLevel = getAccessLevel(lead.id)
                  const editable = canEdit(lead.id)
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={(c) => toggleOne(lead.id, !!c)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.email}</p>
                            {accessLevel !== "none" && accessLevel !== "owner" && (
                              <Badge
                                variant="outline"
                                className={`text-xs mt-1 ${
                                  accessLevel === "editor" ? "border-blue-400 text-blue-700" : "border-gray-400 text-gray-700"
                                }`}
                              >
                                {accessLevel === "editor" ? "Can Edit" : "View Only"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{lead.phone_number || lead.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={statusBadgeClass(lead.status)}>
                          {statusLabel(lead.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {ownership ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-700">{ownership.ownerName.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ownership.ownerName}</p>
                              {ownership.ownerId === currentUserId && (
                                <Badge variant="outline" className="text-xs border-green-400 text-green-700 mt-0.5">
                                  You
                                </Badge>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">{lead.score}</span>
                          <span className="text-gray-400 text-xs">/100</span>
                        </div>
                        <Progress value={lead.score} className="h-1 mt-1 w-16" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {lead.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => router.push(`/admin/leads/${lead.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {!isCounselor && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                              title="Reassign lead"
                              onClick={() => onReassign(lead.id)}
                            >
                              <ArrowRightLeft className="w-4 h-4" />
                            </Button>
                          )}
                          {editable && (
                            <>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onEmail(lead)}>
                                <Mail className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onSMS(lead)}>
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onNotes(lead)}>
                                <FileText className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {!editable && accessLevel === "viewer" && (
                            <Badge variant="outline" className="text-xs border-gray-400 text-gray-600">
                              View Only
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
              {!isLoading && leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No leads found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && totalElements > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-semibold">{currentPage * pageSize + 1}</span> to{" "}
                <span className="font-semibold">{Math.min((currentPage + 1) * pageSize, totalElements)}</span> of{" "}
                <span className="font-semibold">{totalElements}</span> leads
              </div>
              <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="25">25 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                  <SelectItem value="100">100 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onPageChange(0)} disabled={currentPage === 0}>
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <div className="text-sm text-gray-700">
                Page <span className="font-semibold">{currentPage + 1}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Last
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

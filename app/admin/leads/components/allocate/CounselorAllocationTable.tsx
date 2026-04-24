"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, ExternalLink } from "lucide-react"
import type { CounselorWorkload } from "@/lib/api/leads"

interface Props {
  workload: CounselorWorkload[]
  loading: boolean
  onViewLeads: (counselorId: number, counselorName: string) => void
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Never"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function getContactRate(c: CounselorWorkload): number {
  if (c.totalLeads === 0) return 0
  return Math.round((c.contactedLeads / c.totalLeads) * 100)
}

function getContactRateColor(rate: number): string {
  if (rate > 30) return "text-green-600"
  if (rate > 10) return "text-yellow-600"
  return "text-red-600"
}

function getInProgress(c: CounselorWorkload): number {
  return c.hotLeads + c.immediateHotLeads + c.warmLeads + c.coldLeads + c.featureLeads
}

const AVATAR_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-green-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
]

export function CounselorAllocationTable({ workload, loading, onViewLeads }: Props) {
  const [search, setSearch] = useState("")

  const filtered = workload.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Counselor Workload</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search counselors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Counselor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Allocated
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  In Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[140px]">
                  Contact Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Assigned
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-2 w-36" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <Skeleton className="h-2 w-full rounded-full" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  </td>
                  <td className="px-4 py-3"><Skeleton className="h-3 w-16" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-8 w-24 rounded-md" /></td>
                </tr>
              ))}

              {!loading && workload.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                    No counselors found. Add counselors to start allocating leads.
                  </td>
                </tr>
              )}

              {!loading && workload.length > 0 && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                    No counselors match &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}

              {!loading && filtered.map((c, idx) => {
                const rate = getContactRate(c)
                const inProgress = getInProgress(c)
                const avatarGradient = AVATAR_COLORS[idx % AVATAR_COLORS.length]

                return (
                  <tr key={c.counselorId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 bg-gradient-to-br ${avatarGradient} rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0`}
                        >
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                          <p className="text-xs text-gray-500 truncate">{c.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-gray-900">
                        {c.totalLeads.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-blue-600">
                        {inProgress.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-purple-600">
                        {c.contactedLeads.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${getContactRateColor(rate)}`}>
                            {rate}%
                          </span>
                        </div>
                        <Progress value={rate} className="h-1.5 w-24" />
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(c.lastAssignedAt)}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1"
                        onClick={() => onViewLeads(c.counselorId, c.name)}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Leads
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

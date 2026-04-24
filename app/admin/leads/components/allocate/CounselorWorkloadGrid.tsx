"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CounselorWorkload } from "@/lib/api/leads"

interface Props {
  workload: CounselorWorkload[]
  loading: boolean
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

function getWorkloadBadge(total: number): { label: string; className: string } {
  if (total < 500) return { label: "Available", className: "bg-green-100 text-green-700 border-0" }
  if (total < 1000) return { label: "Busy", className: "bg-yellow-100 text-yellow-700 border-0" }
  return { label: "Full", className: "bg-red-100 text-red-700 border-0" }
}

export function CounselorWorkloadGrid({ workload, loading }: Props) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor Workload Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-5 bg-gray-200 rounded w-16" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded" />
                  <div className="h-2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (workload.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Counselor Workload Overview</h3>
          <p className="text-sm text-gray-500 text-center py-6">No counselors found. Add counselors to start allocating leads.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor Workload Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workload.map((c) => {
            const rate = getContactRate(c)
            const badge = getWorkloadBadge(c.totalLeads)
            return (
              <div key={c.counselorId} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-900 text-sm truncate flex-1 mr-2">{c.name}</p>
                  <Badge className={badge.className}>{badge.label}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Total Leads</span>
                    <span className="font-semibold text-gray-900">{c.totalLeads.toLocaleString()}</span>
                  </div>
                  <Progress value={Math.min((c.totalLeads / 1500) * 100, 100)} className="h-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Contact Rate</span>
                    <span className={`font-semibold ${getContactRateColor(rate)}`}>{rate}%</span>
                  </div>
                  <Progress value={rate} className="h-2" />
                  <p className="text-xs text-gray-400 pt-1">
                    {c.hotLeads + c.immediateHotLeads} hot · {c.warmLeads} warm · {c.coldLeads} cold · {c.contactedLeads} contacted
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, Activity, CheckCircle2, UserX } from "lucide-react"
import type { CounselorWorkload } from "@/lib/api/leads"

interface Props {
  workload: CounselorWorkload[]
  totalLeadsCount: number
}

export function AllocateStatsCards({ workload, totalLeadsCount }: Props) {
  const totalAllocated = workload.reduce((sum, c) => sum + c.totalLeads, 0)
  const inProgress = workload.reduce(
    (sum, c) => sum + c.hotLeads + c.immediateHotLeads + c.warmLeads + c.coldLeads + c.featureLeads,
    0
  )
  const completed = workload.reduce((sum, c) => sum + c.contactedLeads, 0)
  const unassigned = Math.max(0, totalLeadsCount - totalAllocated)

  const cards = [
    {
      label: "Total Allocated",
      value: totalAllocated,
      icon: UserCheck,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Activity,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      label: "Unassigned",
      value: unassigned,
      icon: UserX,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, bg, color }) => (
        <Card key={label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
              </div>
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

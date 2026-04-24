"use client"

import { useState, useEffect, useCallback } from "react"
import { getCounselorWorkload } from "@/lib/api/leads"
import type { CounselorWorkload } from "@/lib/api/leads"
import type { Campaign } from "../../types"
import { AllocateStatsCards } from "./AllocateStatsCards"
import { CampaignAllocatePanel } from "./CampaignAllocatePanel"
import { CounselorWorkloadGrid } from "./CounselorWorkloadGrid"
import { RoundRobinPanel } from "./RoundRobinPanel"

interface Props {
  campaigns: Campaign[]
  totalLeadsCount: number
  initialCampaignName?: string
}

export function AllocateLeadsTab({ campaigns, totalLeadsCount, initialCampaignName = "" }: Props) {
  const [workload, setWorkload] = useState<CounselorWorkload[]>([])
  const [workloadLoading, setWorkloadLoading] = useState(true)

  const fetchWorkload = useCallback(async () => {
    setWorkloadLoading(true)
    try {
      const data = await getCounselorWorkload()
      setWorkload(data)
    } catch (err) {
      console.error("Failed to fetch counselor workload:", err)
    } finally {
      setWorkloadLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkload()
  }, [fetchWorkload])

  const totalAllocated = workload.reduce((sum, c) => sum + c.totalLeads, 0)
  const unassignedCount = Math.max(0, totalLeadsCount - totalAllocated)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Lead Allocation</h2>
          <p className="text-sm text-gray-600 mt-1">Distribute leads from campaigns to counselors</p>
        </div>
        <CampaignAllocatePanel
          campaigns={campaigns}
          workload={workload}
          initialCampaignName={initialCampaignName}
          onAssignComplete={fetchWorkload}
        />
      </div>

      <AllocateStatsCards workload={workload} totalLeadsCount={totalLeadsCount} />

      <RoundRobinPanel unassignedCount={unassignedCount} onComplete={fetchWorkload} />

      <CounselorWorkloadGrid workload={workload} loading={workloadLoading} />
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, CheckCircle, Merge, Zap } from "lucide-react"

interface LeadStatsCardsProps {
  totalLeads: number
  assignedLeads: number
  duplicates: number
  avgScore: number
}

export function LeadStatsCards({ totalLeads, assignedLeads, duplicates, avgScore }: LeadStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assigned</p>
              <p className="text-2xl font-bold text-gray-900">{assignedLeads.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Duplicates</p>
              <p className="text-2xl font-bold text-gray-900">{duplicates.toLocaleString()}</p>
            </div>
            <Merge className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">{avgScore}/100</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

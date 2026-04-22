"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, FolderKanban, UserCheck, UserX, Users } from "lucide-react"

interface Props {
  totalCampaigns: number
  totalLeads: number
  assignedLeads: number
  unassignedLeads: number
  duplicates: number
}

export function CampaignStatsCards({
  totalCampaigns,
  totalLeads,
  assignedLeads,
  unassignedLeads,
  duplicates,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Assigned</p>
              <p className="text-2xl font-bold text-gray-900">{assignedLeads.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Unassigned</p>
              <p className="text-2xl font-bold text-gray-900">{unassignedLeads.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Duplicates</p>
              <p className="text-2xl font-bold text-gray-900">{duplicates.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

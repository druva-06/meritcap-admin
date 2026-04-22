"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, QrCode, UserCheck } from "lucide-react"
import type { Campaign } from "../../types"

interface Props {
  campaigns: Campaign[]
  getStatusColor: (status: string) => string
  onView: (campaignName: string) => void
  onAssign: (campaignName: string) => void
}

export function CampaignTable({ campaigns, getStatusColor, onView, onAssign }: Props) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Campaign Name", "Source", "Total Leads", "Assigned", "Unassigned", "Duplicates", "Status", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500">
                    No campaigns yet. Create one to get started.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900 text-sm">{campaign.name}</p>
                      <p className="text-xs text-gray-500">Created: {campaign.createdDate}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-700">{campaign.source}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {(campaign.totalLeads || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-green-600">
                        {(campaign.assignedLeads || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-orange-600">
                        {(campaign.unassignedLeads || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-red-600">
                        {(campaign.duplicateLeads || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => onView(campaign.name)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => onAssign(campaign.name)}
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          <QrCode className="w-4 h-4 mr-1" />
                          QR
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

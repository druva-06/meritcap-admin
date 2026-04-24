"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserCheck, Activity } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { directAssignLeads } from "@/lib/api/leads"
import type { Campaign } from "../../types"
import type { CounselorWorkload } from "@/lib/api/leads"

interface Props {
  campaigns: Campaign[]
  workload: CounselorWorkload[]
  initialCampaignName?: string
  onAssignComplete: () => void
}

export function CampaignAllocatePanel({
  campaigns,
  workload,
  initialCampaignName = "",
  onAssignComplete,
}: Props) {
  const [open, setOpen] = useState(false)
  const [campaignName, setCampaignName] = useState(initialCampaignName)
  const [counselorId, setCounselorId] = useState("")
  const [count, setCount] = useState("")
  const [sortBy, setSortBy] = useState<"score" | "createdAt">("createdAt")
  const [loading, setLoading] = useState(false)

  // Sync if parent changes the pre-selected campaign (cross-tab navigation)
  useEffect(() => {
    if (initialCampaignName) setCampaignName(initialCampaignName)
  }, [initialCampaignName])

  const selectedCampaign = campaigns.find((c) => c.name === campaignName)
  const selectedCounselor = workload.find((c) => String(c.counselorId) === counselorId)
  const countNum = Number.parseInt(count) || 0
  const available = selectedCampaign ? selectedCampaign.unassignedLeads : null
  const countExceedsAvailable = available !== null && countNum > available

  const handleSubmit = async () => {
    if (!counselorId || countNum < 1) {
      toast({
        title: "Error",
        description: "Please select a counselor and enter a valid count",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    try {
      const result = await directAssignLeads({
        campaignName: campaignName || undefined,
        counselorId: Number(counselorId),
        count: countNum,
        sortBy,
      })
      const partial = result.assignedCount < result.requestedCount
        ? ` (only ${result.assignedCount} were available)`
        : ""
      toast({
        title: "Leads Assigned",
        description: `${result.assignedCount} leads assigned to ${result.counselorName}${partial}`,
      })
      setOpen(false)
      setCounselorId("")
      setCount("")
      onAssignComplete()
    } catch (err: any) {
      toast({ title: "Assignment Failed", description: err.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (v: boolean) => {
    setOpen(v)
    if (!v) {
      setCounselorId("")
      setCount("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <UserCheck className="w-4 h-4 mr-2" />
          Allocate Leads
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Allocate Leads to Counselor</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Campaign selector */}
          <div className="space-y-2">
            <Label>Campaign</Label>
            <Select value={campaignName} onValueChange={setCampaignName}>
              <SelectTrigger>
                <SelectValue placeholder="All unassigned leads" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All unassigned leads (no campaign filter)</SelectItem>
                {campaigns.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name} ({(c.unassignedLeads || 0).toLocaleString()} available)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCampaign && (
              <p className="text-xs text-gray-500">
                {selectedCampaign.unassignedLeads.toLocaleString()} unassigned of {selectedCampaign.totalLeads.toLocaleString()} total
              </p>
            )}
          </div>

          {/* Counselor selector */}
          <div className="space-y-2">
            <Label>Select Counselor</Label>
            <Select value={counselorId} onValueChange={setCounselorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select counselor" />
              </SelectTrigger>
              <SelectContent>
                {workload.map((c) => (
                  <SelectItem key={c.counselorId} value={String(c.counselorId)}>
                    {c.name} — {c.totalLeads} leads
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCounselor && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedCounselor.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Current workload: {selectedCounselor.totalLeads.toLocaleString()} leads
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Contact Rate</p>
                    <p className={`text-lg font-bold ${
                      selectedCounselor.totalLeads > 0 &&
                      (selectedCounselor.contactedLeads / selectedCounselor.totalLeads) > 0.30
                        ? "text-green-600"
                        : selectedCounselor.totalLeads > 0 &&
                          (selectedCounselor.contactedLeads / selectedCounselor.totalLeads) > 0.10
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}>
                      {selectedCounselor.totalLeads > 0
                        ? Math.round((selectedCounselor.contactedLeads / selectedCounselor.totalLeads) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Count + sort */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Number of Leads</Label>
              <Input
                type="number"
                min={1}
                placeholder="e.g., 50"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              {countExceedsAvailable && (
                <p className="text-xs text-amber-600">
                  Only {available} available — will assign {available}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "score" | "createdAt")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Oldest first (FIFO)</SelectItem>
                  <SelectItem value="score">Highest score first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {countNum >= 1 && selectedCounselor && (
            <p className="text-xs text-gray-500">
              New workload will be:{" "}
              <strong className="text-gray-900">
                {(selectedCounselor.totalLeads + Math.min(countNum, available ?? countNum)).toLocaleString()} leads
              </strong>
            </p>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              All selected leads are assigned exclusively to the chosen counselor, not distributed via round-robin.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              disabled={loading || !counselorId || countNum < 1}
            >
              {loading ? "Assigning..." : "Assign Leads"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

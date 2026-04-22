"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, QrCode } from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaignName: string
  campaignSource: string
  onCampaignNameChange: (value: string) => void
  onCampaignSourceChange: (value: string) => void
  onFileChange: (file: File | null) => void
  onSubmit: () => void
}

export function CreateCampaignDialog({
  open,
  onOpenChange,
  campaignName,
  campaignSource,
  onCampaignNameChange,
  onCampaignSourceChange,
  onFileChange,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Campaign Name</Label>
            <Input
              placeholder="e.g., Education Fair Mumbai 2024"
              value={campaignName}
              onChange={(e) => onCampaignNameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Source</Label>
            <Select value={campaignSource} onValueChange={onCampaignSourceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offline">Offline Event</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="facebook">Facebook Ads</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Upload Leads (CSV/Excel)</Label>
            <Input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            />
            <p className="text-xs text-gray-500">Upload a CSV or Excel file with lead data</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <QrCode className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">QR Code Generation</p>
                <p className="text-xs text-blue-700 mt-1">
                  A unique QR code will be generated for this campaign to track offline leads
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onSubmit}>
              Create Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from "lucide-react"

export interface CounselorOption {
  id: number | string
  name: string
}

export interface ReassignLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  counselors: CounselorOption[]
  counselorId: string
  onCounselorIdChange: (value: string) => void
  reason: string
  onReasonChange: (value: string) => void
  loading: boolean
  onSubmit: () => void
}

export function ReassignLeadDialog({
  open,
  onOpenChange,
  counselors,
  counselorId,
  onCounselorIdChange,
  reason,
  onReasonChange,
  loading,
  onSubmit,
}: ReassignLeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
            Reassign Lead
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>New Counselor</Label>
            <Select value={counselorId} onValueChange={onCounselorIdChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a counselor" />
              </SelectTrigger>
              <SelectContent>
                {counselors.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Textarea
              placeholder="Why is this lead being reassigned?"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={onSubmit}
              disabled={!counselorId || loading}
            >
              {loading ? "Reassigning..." : "Reassign"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

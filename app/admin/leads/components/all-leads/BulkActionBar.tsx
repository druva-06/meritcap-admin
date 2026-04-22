"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, X } from "lucide-react"

interface BulkActionBarProps {
  selectedCount: number
  totalVisible: number
  onSelectAll: (checked: boolean) => void
  onBulkAssign: () => void
  onClear: () => void
}

export function BulkActionBar({
  selectedCount,
  totalVisible,
  onSelectAll,
  onBulkAssign,
  onClear,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedCount === totalVisible}
              onCheckedChange={(checked) => onSelectAll(!!checked)}
            />
            <span className="font-medium text-blue-900">{selectedCount} leads selected</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={onBulkAssign} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Users className="w-4 h-4 mr-2" />
              Bulk Assign
            </Button>
            <Button size="sm" variant="outline" onClick={onClear} className="border-blue-600 text-blue-600">
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

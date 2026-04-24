"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { assignLeadsRoundRobin } from "@/lib/api/leads"

interface Props {
  unassignedCount: number
  onComplete: () => void
}

export function RoundRobinPanel({ unassignedCount, onComplete }: Props) {
  const [loading, setLoading] = useState(false)

  const handleRoundRobin = async () => {
    setLoading(true)
    try {
      const result = await assignLeadsRoundRobin()
      toast({
        title: "Round-Robin Complete",
        description: `${result.assignedCount} leads distributed across ${Object.keys(result.counselorAssignments).length} counselors.`,
      })
      onComplete()
    } catch (err: any) {
      toast({ title: "Round-Robin Failed", description: err.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-purple-200 bg-purple-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-900">Auto-Assign All Unassigned</h3>
              {unassignedCount > 0 ? (
                <p className="text-xs text-purple-700 mt-0.5">
                  <strong>{unassignedCount.toLocaleString()}</strong> unassigned leads will be distributed evenly across all counselors.
                </p>
              ) : (
                <p className="text-xs text-green-700 mt-0.5 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  All leads are currently assigned.
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={handleRoundRobin}
            disabled={loading || unassignedCount === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white shrink-0"
          >
            <Zap className="w-4 h-4 mr-2" />
            {loading ? "Assigning..." : "Round-Robin Assign"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

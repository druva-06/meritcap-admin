"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  UserCheck,
  Target,
  RefreshCw,
  Shuffle,
  CheckCircle,
  Loader2,
  ExternalLink,
} from "lucide-react"
import { getCounselorWorkload, assignLeadsRoundRobin } from "@/lib/api/leads"
import type { CounselorWorkload, RoundRobinResult } from "@/lib/api/leads"
import { apiRequest } from "@/lib/api-client"

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Never"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function WorkloadBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

function StatusDot({ color, count, label }: { color: string; count: number; label: string }) {
  if (count === 0) return null
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-gray-600">{count} {label}</span>
    </div>
  )
}

export default function LeadAssignmentPage() {
  const router = useRouter()

  const [workload, setWorkload] = useState<CounselorWorkload[]>([])
  const [unassignedCount, setUnassignedCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [result, setResult] = useState<RoundRobinResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [workloadData, countData] = await Promise.all([
        getCounselorWorkload(),
        apiRequest<{ totalElements: number }>("/leads?size=1&page=0"),
      ])
      setWorkload(workloadData)
      // Fetch unassigned count via a separate lightweight call
      const unassignedRes = await apiRequest<any>("/leads?size=1&page=0&assignedTo=unassigned")
      // Fallback: derive from workload total vs total leads
      setUnassignedCount(unassignedRes?.data?.totalElements ?? 0)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch unassigned count using the leads endpoint with a filter trick
  useEffect(() => {
    const fetchUnassigned = async () => {
      try {
        const res = await apiRequest<any>("/leads/count")
        const totalRes = await apiRequest<any>("/leads?size=1&page=0")
        const assignedTotal = workload.reduce((sum, c) => sum + c.totalLeads, 0)
        const total = totalRes?.data?.totalElements ?? 0
        setUnassignedCount(Math.max(0, total - assignedTotal))
      } catch {
        // silently ignore
      }
    }
    if (!loading && workload.length > 0) fetchUnassigned()
  }, [workload, loading])

  useEffect(() => {
    getCounselorWorkload()
      .then(setWorkload)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleRoundRobin = async () => {
    setAssigning(true)
    setResult(null)
    setError(null)
    try {
      const res = await assignLeadsRoundRobin()
      setResult(res)
      // Refresh workload after assignment
      const updated = await getCounselorWorkload()
      setWorkload(updated)
      setUnassignedCount(0)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setAssigning(false)
    }
  }

  const totalLeads = workload.reduce((sum, c) => sum + c.totalLeads, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lead Assignment</h1>
            <p className="text-sm text-gray-600 mt-1">
              Round-robin distribution and counselor workload overview
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Counselors</p>
                <p className="text-2xl font-bold text-blue-600">{workload.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Assigned</p>
                <p className="text-2xl font-bold text-green-600">{totalLeads}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Unassigned</p>
                <p className="text-2xl font-bold text-orange-600">{unassignedCount}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg per Counselor</p>
                <p className="text-2xl font-bold text-purple-600">
                  {workload.length > 0 ? Math.round(totalLeads / workload.length) : 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shuffle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Round Robin Control Panel */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
            <Shuffle className="w-5 h-5" />
            Round Robin Auto-Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-700">
            Automatically distribute all unassigned leads evenly across active counselors in round-robin order.
            Counselors who haven't been assigned recently get leads first.
          </p>

          {unassignedCount > 0 ? (
            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <Target className="w-4 h-4 text-orange-600 shrink-0" />
              <p className="text-sm text-orange-700">
                <strong>{unassignedCount}</strong> lead{unassignedCount !== 1 ? "s are" : " is"} currently unassigned
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              <p className="text-sm text-green-700">All leads are assigned</p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          {result && (
            <div className="p-4 bg-white border border-green-200 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <CheckCircle className="w-4 h-4" />
                {result.assignedCount} lead{result.assignedCount !== 1 ? "s" : ""} assigned
              </div>
              {Object.keys(result.counselorAssignments).length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {Object.entries(result.counselorAssignments).map(([name, count]) => (
                    <div key={name} className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded">
                      <span className="truncate mr-2">{name}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handleRoundRobin}
            disabled={assigning || loading || unassignedCount === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            {assigning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4" />
                Assign All Unassigned (Round Robin)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Counselor Workload Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Counselor Workload</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="space-y-1 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : workload.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No counselors found. Add counselors to start assigning leads.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workload.map((counselor) => {
              const maxLeads = Math.max(...workload.map((c) => c.totalLeads), 1)
              const barColor =
                counselor.totalLeads / maxLeads > 0.8
                  ? "bg-red-500"
                  : counselor.totalLeads / maxLeads > 0.5
                  ? "bg-yellow-500"
                  : "bg-green-500"

              return (
                <Card key={counselor.counselorId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    {/* Counselor header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                          {counselor.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{counselor.name}</p>
                          <p className="text-xs text-gray-500 truncate">{counselor.email}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-bold text-gray-900">{counselor.totalLeads}</p>
                        <p className="text-xs text-gray-500">leads</p>
                      </div>
                    </div>

                    {/* Workload bar */}
                    <WorkloadBar value={counselor.totalLeads} max={maxLeads} color={barColor} />

                    {/* Status breakdown */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <StatusDot color="bg-red-500" count={counselor.immediateHotLeads + counselor.hotLeads} label="Hot" />
                      <StatusDot color="bg-yellow-500" count={counselor.warmLeads} label="Warm" />
                      <StatusDot color="bg-blue-400" count={counselor.coldLeads} label="Cold" />
                      <StatusDot color="bg-green-500" count={counselor.contactedLeads} label="Contacted" />
                      <StatusDot color="bg-purple-500" count={counselor.featureLeads} label="Feature" />
                    </div>

                    {/* Last assigned + view link */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      <p className="text-xs text-gray-400">
                        Last assigned: {formatRelativeTime(counselor.lastAssignedAt)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 gap-1"
                        onClick={() => router.push(`/admin/leads?assignedTo=${counselor.counselorId}`)}
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Phone,
  Mail,
  GraduationCap,
  CheckCircle,
  Clock,
  User,
  BookOpen,
  Trash2,
  Loader2,
  FileText,
  Heart,
  Building2,
  XCircle,
  Send,
  Eye,
  ExternalLink,
} from "lucide-react"
import { deleteUser } from "@/lib/api/users"
import {
  getStudentSummary,
  getStudentDocuments,
  getStudentApplications,
  getStudentWishlist,
  updateDocumentStatus,
  getDocumentPresignedUrl,
  type StudentSummary,
  type DocumentResponse,
  type ApplicationResponse,
  type WishlistItemResponse,
} from "@/lib/api/students"
import { toast } from "@/hooks/use-toast"

// ── Helper components ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color = "text-foreground",
}: {
  label: string
  value: number | string
  color?: string
}) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl border bg-card">
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function TabLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

function TabError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <XCircle className="h-10 w-10 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  )
}

function statusBadge(status: string) {
  const s = status?.toUpperCase()
  if (s === "APPROVED" || s === "VERIFIED") {
    return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>
  }
  if (s === "REJECTED") {
    return <Badge className="bg-red-100 text-red-800 border-red-200">{status}</Badge>
  }
  if (s === "SUBMITTED") {
    return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>
  }
  return <Badge variant="outline">{status}</Badge>
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—"
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

// ── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ summary }: { summary: StudentSummary }) {
  return (
    <div className="space-y-6">
      {/* Analytics */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Applications
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard label="Total" value={summary.totalApplications} />
          <StatCard label="Pending" value={summary.pendingApplications} color="text-yellow-600" />
          <StatCard label="Submitted" value={summary.submittedApplications} color="text-blue-600" />
          <StatCard label="Approved" value={summary.approvedApplications} color="text-green-600" />
          <StatCard label="Rejected" value={summary.rejectedApplications} color="text-red-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Documents */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Documents
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Total" value={summary.totalDocuments} />
            <StatCard label="Pending" value={summary.pendingDocuments} color="text-yellow-600" />
            <StatCard label="Verified" value={summary.verifiedDocuments} color="text-green-600" />
          </div>
        </div>

        {/* Wishlist & Education */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Other
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Wishlist Items" value={summary.wishlistCount} color="text-purple-600" />
            <StatCard label="Education Records" value={summary.educationRecordsCount} />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Profile
        </h3>
        <Card>
          <CardContent className="pt-5 space-y-4">
            {summary.profileCompletion != null && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Profile completion</span>
                  <span className="font-medium">{summary.profileCompletion}%</span>
                </div>
                <Progress value={summary.profileCompletion} className="h-2" />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {summary.gender && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground w-28 shrink-0">Gender</span>
                  <span className="font-medium capitalize">{summary.gender.toLowerCase()}</span>
                </div>
              )}
              {summary.dateOfBirth && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground w-28 shrink-0">Date of Birth</span>
                  <span className="font-medium">{formatDate(summary.dateOfBirth)}</span>
                </div>
              )}
              {summary.graduationLevel && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground w-28 shrink-0">Education</span>
                  <span className="font-medium capitalize">
                    {summary.graduationLevel.replace(/_/g, " ").toLowerCase()}
                  </span>
                </div>
              )}
              {summary.profileActiveStatus && (
                <div className="flex gap-2">
                  <span className="text-muted-foreground w-28 shrink-0">Status</span>
                  {statusBadge(summary.profileActiveStatus)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ── Applications Tab ──────────────────────────────────────────────────────────

function ApplicationsTab({ studentId }: { studentId: number }) {
  const [apps, setApps] = useState<ApplicationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getStudentApplications(studentId)
      setApps(data)
    } catch (e: any) {
      setError(e?.message || "Failed to load applications")
    } finally {
      setLoading(false)
    }
  }, [studentId])

  useEffect(() => { load() }, [load])

  if (loading) return <TabLoader />
  if (error) return <TabError message={error} onRetry={load} />

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Send className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No applications found for this student.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {apps.map((app) => (
        <Card key={app.registrationId} className="hover:shadow-sm transition-shadow">
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-semibold text-sm">{app.collegeName}</span>
                  {statusBadge(app.status)}
                </div>
                <p className="text-sm text-muted-foreground pl-6">{app.courseName}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pl-6 text-xs text-muted-foreground">
                  <span>Session: {app.intakeSession}</span>
                  <span>Year: {app.applicationYear}</span>
                  <span>Applied: {formatDate(app.createdAt)}</span>
                </div>
                {app.remarks && (
                  <p className="pl-6 text-xs text-muted-foreground italic">{app.remarks}</p>
                )}
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                #{app.registrationId}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ── Documents Tab ─────────────────────────────────────────────────────────────

function DocumentsTab({ studentId }: { studentId: number }) {
  const [docs, setDocs] = useState<DocumentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [remarkDialog, setRemarkDialog] = useState<{
    open: boolean
    docId: number
    action: "VERIFIED" | "PENDING"
  } | null>(null)
  const [remarksInput, setRemarksInput] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getStudentDocuments(studentId)
      setDocs(data)
    } catch (e: any) {
      setError(e?.message || "Failed to load documents")
    } finally {
      setLoading(false)
    }
  }, [studentId])

  useEffect(() => { load() }, [load])

  const handleStatusUpdate = async (docId: number, status: "VERIFIED" | "PENDING", remarks?: string) => {
    setUpdatingId(docId)
    setRemarkDialog(null)
    try {
      const updated = await updateDocumentStatus(docId, status, remarks)
      setDocs((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, documentStatus: updated.documentStatus, remarks: updated.remarks } : d))
      )
      toast({
        title: status === "VERIFIED" ? "Document Approved" : "Document Reset",
        description: `Document has been marked as ${status.toLowerCase()}.`,
      })
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Failed to update document status.",
        variant: "destructive",
      })
    } finally {
      setUpdatingId(null)
      setRemarksInput("")
    }
  }

  if (loading) return <TabLoader />
  if (error) return <TabError message={error} onRetry={load} />

  if (docs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <FileText className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
      </div>
    )
  }

  const pending = docs.filter((d) => d.documentStatus === "PENDING")
  const verified = docs.filter((d) => d.documentStatus === "VERIFIED")

  return (
    <>
      <div className="space-y-6">
        {pending.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" /> Pending Review ({pending.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pending.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  isUpdating={updatingId === doc.id}
                  onApprove={() => setRemarkDialog({ open: true, docId: doc.id, action: "VERIFIED" })}
                />
              ))}
            </div>
          </div>
        )}

        {verified.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Verified ({verified.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {verified.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  isUpdating={updatingId === doc.id}
                  onRevoke={() => handleStatusUpdate(doc.id, "PENDING")}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Remarks dialog */}
      {remarkDialog && (
        <Dialog open={remarkDialog.open} onOpenChange={() => { setRemarkDialog(null); setRemarksInput("") }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Approve Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Add optional remarks before approving this document.
              </p>
              <Textarea
                placeholder="Remarks (optional)"
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setRemarkDialog(null); setRemarksInput("") }}>
                Cancel
              </Button>
              <Button
                onClick={() => handleStatusUpdate(remarkDialog.docId, "VERIFIED", remarksInput || undefined)}
              >
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

function DocumentCard({
  doc,
  isUpdating,
  onApprove,
  onRevoke,
}: {
  doc: DocumentResponse
  isUpdating: boolean
  onApprove?: () => void
  onRevoke?: () => void
}) {
  const isPending = doc.documentStatus === "PENDING"
  const [loadingUrl, setLoadingUrl] = useState(false)

  const openFile = async () => {
    setLoadingUrl(true)
    try {
      const url = await getDocumentPresignedUrl(doc.id)
      window.open(url, "_blank", "noopener,noreferrer")
    } catch {
      toast({ title: "Error", description: "Could not open file. Please try again.", variant: "destructive" })
    } finally {
      setLoadingUrl(false)
    }
  }

  return (
    <Card className="relative">
      <CardContent className="pt-4 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">
                {doc.documentType.replace(/_/g, " ")}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{doc.category}</p>
            </div>
            {statusBadge(doc.documentStatus)}
          </div>

          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>Uploaded: {formatDate(doc.uploadedAt)}</p>
            {doc.uploadedBy && <p>By: {doc.uploadedBy}</p>}
            {doc.remarks && <p className="italic">"{doc.remarks}"</p>}
          </div>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-primary px-1.5"
              onClick={openFile}
              disabled={loadingUrl}
            >
              {loadingUrl ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <ExternalLink className="h-3 w-3 mr-1" />
              )}
              View File
            </Button>
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : isPending ? (
              <Button size="sm" variant="outline" className="h-7 text-xs text-green-700 border-green-300 hover:bg-green-50" onClick={onApprove}>
                <CheckCircle className="h-3 w-3 mr-1" /> Approve
              </Button>
            ) : (
              <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={onRevoke}>
                Reset to Pending
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Wishlist Tab ──────────────────────────────────────────────────────────────

function WishlistTab({ studentId }: { studentId: number }) {
  const [items, setItems] = useState<WishlistItemResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getStudentWishlist(studentId)
      setItems(data)
    } catch (e: any) {
      setError(e?.message || "Failed to load wishlist")
    } finally {
      setLoading(false)
    }
  }, [studentId])

  useEffect(() => { load() }, [load])

  if (loading) return <TabLoader />
  if (error) return <TabError message={error} onRetry={load} />

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Heart className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No courses saved in wishlist.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <Card key={item.wishlistItemId} className="hover:shadow-sm transition-shadow">
          <CardContent className="pt-4 pb-4">
            <div className="space-y-1">
              <p className="font-semibold text-sm">{item.courseName}</p>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {item.collegeName}
              </div>
              {item.campusName && (
                <p className="text-xs text-muted-foreground pl-5">{item.campusName}</p>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {item.tuitionFee && <span>Fee: {item.tuitionFee}</span>}
                {item.intakeMonths && item.intakeMonths.length > 0 && (
                  <span>Intake: {item.intakeMonths.join(", ")}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const studentId = Number(params.id)

  const [summary, setSummary] = useState<StudentSummary | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  const [activeTab, setActiveTab] = useState("overview")
  const [isDeleting, setIsDeleting] = useState(false)

  const loadSummary = useCallback(async () => {
    setSummaryLoading(true)
    setSummaryError(null)
    try {
      const data = await getStudentSummary(studentId)
      setSummary(data)
    } catch (e: any) {
      setSummaryError(e?.message || "Failed to load student details")
    } finally {
      setSummaryLoading(false)
    }
  }, [studentId])

  useEffect(() => { loadSummary() }, [loadSummary])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUser(studentId)
      toast({ title: "Student Deleted", description: "Student has been removed." })
      router.push("/admin/students")
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Failed to delete student.", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  const fullName = summary
    ? `${summary.firstName} ${summary.lastName}`.trim()
    : `Student #${params.id}`

  const initials = summary
    ? `${summary.firstName?.[0] ?? ""}${summary.lastName?.[0] ?? ""}`.toUpperCase()
    : "S"

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/students")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold text-muted-foreground">Students</h1>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-lg font-semibold">{fullName}</h1>
        </div>

        {/* Profile card */}
        {summaryLoading ? (
          <Card>
            <CardContent className="py-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : summaryError ? (
          <Card>
            <CardContent className="py-8 flex flex-col items-center gap-3">
              <XCircle className="h-8 w-8 text-destructive" />
              <p className="text-sm text-muted-foreground">{summaryError}</p>
              <Button variant="outline" size="sm" onClick={loadSummary}>Retry</Button>
            </CardContent>
          </Card>
        ) : summary && (
          <Card>
            <CardContent className="pt-6 pb-5">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {/* Avatar */}
                <div className="relative shrink-0">
                  {summary.profilePicture ? (
                    <img
                      src={summary.profilePicture}
                      alt={fullName}
                      className="h-16 w-16 rounded-full object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl border-2 border-border">
                      {initials}
                    </div>
                  )}
                  {summary.profileActiveStatus && (
                    <span
                      className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${
                        summary.profileActiveStatus === "ACTIVE" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h2 className="text-xl font-bold">{fullName}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {summary.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" /> {summary.email}
                      </span>
                    )}
                    {summary.phoneNumber && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {summary.phoneNumber}
                      </span>
                    )}
                    {summary.graduationLevel && (
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {summary.graduationLevel.replace(/_/g, " ")}
                      </span>
                    )}
                  </div>
                  {summary.profileCompletion != null && (
                    <div className="flex items-center gap-2 pt-1">
                      <Progress value={summary.profileCompletion} className="h-1.5 max-w-40" />
                      <span className="text-xs text-muted-foreground">{summary.profileCompletion}% complete</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Student</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {fullName}&apos;s account and all associated data. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-1.5">
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
              {summary && summary.totalApplications > 0 && (
                <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
                  {summary.totalApplications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
              {summary && summary.pendingDocuments > 0 && (
                <Badge className="ml-1 bg-yellow-100 text-yellow-800 hidden sm:inline-flex">
                  {summary.pendingDocuments}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {summary ? (
              <OverviewTab summary={summary} />
            ) : !summaryLoading && (
              <p className="text-sm text-muted-foreground py-8 text-center">No data available.</p>
            )}
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <ApplicationsTab studentId={studentId} />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <DocumentsTab studentId={studentId} />
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <WishlistTab studentId={studentId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

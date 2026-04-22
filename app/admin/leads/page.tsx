"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, UserPlus, Zap, AlertCircle, TrendingUp, Clock, Calendar, Phone, Search, Download, Eye, Mail, MessageSquare, FileText, Filter, X, CheckCircle, Send, History, BarChart3, Merge, Plus, QrCode, FolderKanban, UserCheck, UserX, Activity, CheckCircle2, ArrowRightLeft, PlayCircle, Star } from 'lucide-react'
import { useAuth } from "@/lib/auth-context"
import { mockData } from "@/lib/mock-data"
import { toast } from "@/hooks/use-toast"
import { api } from "@/lib/api-client"
// Assuming apiUtils and generateQRCode are in a separate file, e.g., lib/api.ts
import { apiUtils, generateQRCode } from "@/lib/apiUtils" // Placeholder, adjust path as needed
import { reassignLead, getCampaigns, createCampaignApi } from "@/lib/api/leads"
import type { Campaign } from "./types"
import { CreateCampaignDialog } from "./components/campaigns/CreateCampaignDialog"
import { CampaignStatsCards } from "./components/campaigns/CampaignStatsCards"
import { CampaignTable } from "./components/campaigns/CampaignTable"
import { LeadStatsCards, LeadsFilterBar, BulkActionBar, LeadsTable, ReassignLeadDialog } from "./components/all-leads"

// Mock User and other types for demonstration
interface User {
  id: string;
  name: string;
  role: string;
  email?: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string; // camelCase for compatibility
  phone_number?: string; // snake_case from backend
  status: string;
  score: number;
  source?: string;
  assignedTo?: string;
  assigned_to_name?: string; // snake_case from backend
  createdAt?: string; // camelCase for compatibility
  created_at?: string; // snake_case from backend
  tags?: string[];
  is_duplicate?: boolean; // snake_case from backend
  engagementLevel?: number;
  urgency?: string;
  timeline?: string;
  qualification?: any; // Add qualification property
  college?: string; // Added for search functionality
}

interface LeadOwnership {
  ownerId: string;
  ownerName: string;
  assignedDate: string;
  assignedBy: string;
}

interface LeadAccessControl {
  userId: string;
  userName: string;
  accessLevel: "owner" | "editor" | "viewer";
  grantedDate: string;
  grantedBy: string;
}

interface LeadTransferHistory {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  reason: string;
  transferDate: string;
  transferredBy: string;
  notes?: string;
}

// Mock data for users
const mockUsers: User[] = [
  { id: "U001", name: "Admin User", role: "admin" },
  { id: "U002", name: "Vinayak Kumar", role: "counselor" },
  { id: "U003", name: "Priya Sharma", role: "counselor" },
  // ... other mock users
];


export default function AdminLeads() {
  const router = useRouter()
  const { user } = useAuth()
  const isCounselor = user?.role === "counselor"

  const [currentUser] = useState<User>(mockUsers[1]) // Simulating Vinayak Kumar as logged in user

  const [leadOwnerships, setLeadOwnerships] = useState<Map<string, LeadOwnership>>(new Map())
  const [leadAccessControls, setLeadAccessControls] = useState<Map<string, LeadAccessControl[]>>(new Map())
  const [leadTransferHistories, setLeadTransferHistories] = useState<Map<string, LeadTransferHistory[]>>(new Map())

  // Ref to prevent duplicate API calls on mount
  const countsLoadedRef = useRef(false)

  const [activeMainTab, setActiveMainTab] = useState("leads")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [totalLeadsCount, setTotalLeadsCount] = useState(0)
  const [statusCounts, setStatusCounts] = useState({
    hotLeads: 0,
    immediateHotLeads: 0,
    warmLeads: 0,
    coldLeads: 0,
    featureLeads: 0,
    contactedLeads: 0,
    assignedLeads: 0
  })

  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [scoreFrom, setScoreFrom] = useState("")
  const [scoreTo, setScoreTo] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [showBulkAssignDialog, setShowBulkAssignDialog] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showSMSDialog, setShowSMSDialog] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [showImportHistoryDialog, setShowImportHistoryDialog] = useState(false)
  const [showSourceAnalyticsDialog, setShowSourceAnalyticsDialog] = useState(false)
  const [showDuplicateMergeDialog, setShowDuplicateMergeDialog] = useState(false)
  const [selectedLeadForAction, setSelectedLeadForAction] = useState<any>(null)
  const [selectedLead, setSelectedLead] = useState<any>(null) // Added to fix undeclared variable

  // Existing states
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [allocations, setAllocations] = useState(mockData.allocations)
  const [callLogs, setCallLogs] = useState(mockData.callLogs)

  const [importHistory, setImportHistory] = useState(mockData.leadImportHistory)
  const [leadNotes, setLeadNotes] = useState(mockData.leadNotes)
  const [duplicateLeads, setDuplicateLeads] = useState(mockData.duplicateLeads)

  // Dialog states
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [showAppointmentSection, setShowAppointmentSection] = useState(false)
  const [showReminderSection, setShowReminderSection] = useState(false)
  const meetingLink = ""
  const location = ""
  const [notificationMethod, setNotificationMethod] = useState<"email" | "in-app" | "both">("both")

  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false)
  const [selectedRecording, setSelectedRecording] = useState<any>(null)

  const [newStatus, setNewStatus] = useState("")
  const [remarks, setRemarks] = useState("")
  const [reminderDate, setReminderDate] = useState("")
  const [reminderTime, setReminderTime] = useState("")
  const [reminderNotes, setReminderNotes] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [meetingLinkValue, setMeetingLinkValue] = useState("") // Changed to avoid name collision
  const [locationValue, setLocationValue] = useState("") // Changed to avoid name collision

  // Add state for transfer reason dropdown selection
  const [transferReasonType, setTransferReasonType] = useState("")
  const [transferReason, setTransferReason] = useState("")

  // State for the counselor to transfer to
  const [transferTo, setTransferTo] = useState<string>("")

  const [qualificationDialogOpen, setQualificationDialogOpen] = useState(false)
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([])

  const [selectedCountryOptions, setSelectedCountryOptions] = useState<string[]>([])
  const [selectedCollegeOptions, setSelectedCollegeOptions] = useState<string[]>([])
  const [selectedProgramOptions, setSelectedProgramOptions] = useState<string[]>([])

  const [indiaMode, setIndiaMode] = useState<"offline" | "online" | "both">("offline")
  // const [selectedColleges, setSelectedColleges] = useState<string[]>([]) // Replaced with selectedCollegeOptions
  // const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]) // Replaced with selectedProgramOptions

  // Dialog visibility states
  const [createCampaignDialogOpen, setCreateCampaignDialogOpen] = useState(false)
  const [allocateDialogOpen, setAllocateDialogOpen] = useState(false)
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)

  // Reassign dialog state
  const [showReassignDialog, setShowReassignDialog] = useState(false)
  const [reassignLeadId, setReassignLeadId] = useState<string | null>(null)
  const [reassignCounselorId, setReassignCounselorId] = useState("")
  const [reassignReason, setReassignReason] = useState("")
  const [reassignLoading, setReassignLoading] = useState(false)
  const [counselorsList, setCounselorsList] = useState<any[]>([])

  // Campaign form states
  const [campaignName, setCampaignName] = useState("")
  const [campaignSource, setCampaignSource] = useState("")
  const [campaignFile, setCampaignFile] = useState<File | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  // Allocation form states
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [selectedCounselor, setSelectedCounselor] = useState("")
  const [leadsToAllocate, setLeadsToAllocate] = useState("")

  // Fetch leads from backend API
  const fetchLeads = async () => {
    setIsLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()

      if (searchTerm) params.append('search', searchTerm)
      if (selectedCampaignFilter && selectedCampaignFilter !== 'all') {
        params.append('campaign', selectedCampaignFilter)
      }
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)
      if (scoreFrom) params.append('scoreFrom', scoreFrom)
      if (scoreTo) params.append('scoreTo', scoreTo)

      // Status filters come only from advanced filter checkboxes
      selectedStatuses.forEach(status => params.append('status', status))

      // Add tags
      selectedTags.forEach(tag => params.append('tags', tag))

      // Add pagination
      params.append('page', currentPage.toString())
      params.append('size', pageSize.toString())
      params.append('sortBy', 'createdAt')
      params.append('sortDirection', 'DESC')

      const response = await api.get(`/api/leads?${params.toString()}`)

      console.log('API Response:', response)

      if (response.success && response.data) {
        const pageData = response.data
        console.log('Page Data:', pageData)
        console.log('Leads:', pageData.leads)

        // Backend returns 'leads' not 'content'
        setLeads(pageData.leads || [])
        setTotalPages(pageData.total_pages || pageData.totalPages || 0)
        setTotalElements(pageData.total_elements || pageData.totalElements || 0)
      } else {
        setLeads([])
        toast({
          title: "Error",
          description: response.message || "Failed to load leads",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      setLeads([])
      toast({
        title: "Error",
        description: "Failed to fetch leads from server. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch total leads count from backend API
  const fetchTotalLeadsCount = async () => {
    try {
      const response = await api.get('/api/leads/count')
      if (response.success && response.data !== undefined) {
        setTotalLeadsCount(response.data)
      }
    } catch (error) {
      console.error('Error fetching total leads count:', error)
    }
  }

  // Fetch lead status counts from backend API
  const fetchLeadStatusCounts = async () => {
    try {
      const response = await api.get('/api/leads/status-counts')
      if (response.success && response.data) {
        setStatusCounts({
          hotLeads: response.data.hot_leads || 0,
          immediateHotLeads: response.data.immediate_hot_leads || 0,
          warmLeads: response.data.warm_leads || 0,
          coldLeads: response.data.cold_leads || 0,
          featureLeads: response.data.feature_leads || 0,
          contactedLeads: response.data.contacted_leads || 0,
          assignedLeads: response.data.assigned_leads || 0
        })
      }
    } catch (error) {
      console.error('Error fetching lead status counts:', error)
    }
  }

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns()
      setCampaigns(data)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    }
  }

  // Refetch leads when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLeads()
    }, 500) // Debounce for 500ms

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCampaignFilter, dateFrom, dateTo, scoreFrom, scoreTo, selectedStatuses, selectedTags, currentPage, pageSize])

  // Fetch total leads count and campaigns on mount
  useEffect(() => {
    // Prevent duplicate calls in React 18 Strict Mode
    if (countsLoadedRef.current) return
    countsLoadedRef.current = true

    fetchTotalLeadsCount()
    fetchLeadStatusCounts()
    fetchCampaigns()
  }, [])

  // No localStorage persistence - using API as single source of truth



  const getStatusColor = (status: string) => {
    switch (status) {
      case "HOT":
        return "bg-red-100 text-red-700 border-red-300"
      case "IMMEDIATE_HOT":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "WARM":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "COLD":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "FEATURE_LEAD":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "CONTACTED":
        return "bg-green-100 text-green-700 border-green-200"
      case "Qualified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Converted":
        return "bg-green-100 text-green-700 border-green-200"
      case "Lost":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "Active":
      case "ACTIVE":
        return "bg-green-600 text-white"
      case "Completed":
      case "COMPLETED":
        return "bg-gray-600 text-white"
      case "In Progress":
        return "bg-blue-600 text-white"
      case "PAUSED":
        return "bg-yellow-500 text-white"
      case "Connected":
        return "bg-green-600 text-white"
      case "Not Connected":
        return "bg-red-600 text-white"
      case "Interested":
        return "bg-green-100 text-green-700"
      case "Not Interested":
        return "bg-red-100 text-red-700"
      case "Callback":
        return "bg-orange-100 text-orange-700"
      case "DND":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-cyan-600"
    if (score >= 70) return "text-yellow-600"
    return "text-orange-600"
  }

  const filteredLeads = leads.filter((lead) => {
    // Counselors only see their assigned leads
    if (isCounselor && user) {
      const ownership = leadOwnerships.get(lead.id);
      const isAssignedToUser = ownership && ownership.ownerId === user.id;
      if (!isAssignedToUser) return false
    }

    // All other filtering is now done by the backend API
    // This client-side filter only handles role-based access control
    return true
  })

  const calculateLeadScore = (lead: any) => {
    let score = 50 // Base score

    // Engagement level
    score += lead.engagementLevel * 0.3

    // Emails/SMS interaction
    score += (lead.emailsSent || 0) * 2
    score += (lead.smsSent || 0) * 3

    // Urgency
    if (lead.urgency === "high") score += 15
    else if (lead.urgency === "medium") score += 10
    else score += 5

    // Timeline
    if (lead.timeline === "Immediate") score += 10
    else if (lead.timeline === "1-2 weeks") score += 7
    else score += 3

    return Math.min(Math.round(score), 100)
  }

  const openReassignDialog = async (leadId: string) => {
    setReassignLeadId(leadId)
    setReassignCounselorId("")
    setReassignReason("")
    // Fetch counselors if not loaded yet
    if (counselorsList.length === 0) {
      try {
        const res = await api.get("/api/user/counselors")
        if (res.success && res.data) setCounselorsList(res.data)
      } catch { /* ignore */ }
    }
    setShowReassignDialog(true)
  }

  const handleReassign = async () => {
    if (!reassignLeadId || !reassignCounselorId) return
    setReassignLoading(true)
    try {
      await reassignLead(Number(reassignLeadId), Number(reassignCounselorId), reassignReason)
      toast({ title: "Lead Reassigned", description: "Lead has been reassigned successfully." })
      setShowReassignDialog(false)
      fetchLeads()
    } catch (e: any) {
      toast({ title: "Reassignment Failed", description: e.message, variant: "destructive" })
    } finally {
      setReassignLoading(false)
    }
  }

  const handleBulkAssign = (counselorName: string) => {
    setLeads(leads.map((lead) => (selectedLeads.includes(lead.id) ? { ...lead, assignedTo: counselorName } : lead)))
    toast({
      title: "Leads Assigned Successfully",
      description: `${selectedLeads.length} leads have been assigned to ${counselorName}`,
    })
    setSelectedLeads([])
    setShowBulkAssignDialog(false)
  }

  const handleExportToExcel = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Status", "Score", "Assigned To", "Created At"].join(","),
      ...filteredLeads.map((lead) =>
        [lead.name, lead.email, lead.phone_number || lead.phone, lead.status, lead.score, lead.assigned_to_name || lead.assignedTo, lead.created_at || lead.createdAt].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`
    a.click()

    toast({
      title: "Export Successful",
      description: `Exported ${filteredLeads.length} leads to Excel`,
    })
  }

  const handleSendEmail = (to: string, subject: string, message: string) => {
    toast({
      title: "Email Sent (Mock)",
      description: `Email would be sent to ${to} with subject: "${subject}"`,
    })
    setShowEmailDialog(false)
  }

  const handleSendSMS = (to: string, message: string) => {
    toast({
      title: "SMS Sent (Mock)",
      description: `SMS would be sent to ${to}: "${message}"`,
    })
    setShowSMSDialog(false)
  }

  const handleAddNote = (note: string, type: string) => {
    const newNote = {
      id: `LN${Date.now()}`,
      leadId: selectedLeadForAction.id,
      userId: user?.id || "U001",
      userName: user?.name || "Admin User",
      note,
      type,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString(),
    }
    setLeadNotes([...leadNotes, newNote])
    toast({
      title: "Note Added",
      description: "Note has been added to lead timeline",
    })
    setShowNotesDialog(false)
  }

  const handleMergeDuplicate = (duplicateId: string, action: "merge" | "keep-separate") => {
    setDuplicateLeads(
      duplicateLeads.map((dup) =>
        dup.id === duplicateId ? { ...dup, status: action === "merge" ? "merged" : "kept-separate" } : dup,
      ),
    )
    toast({
      title: action === "merge" ? "Duplicate Merged" : "Kept Separate",
      description:
        action === "merge" ? "Duplicate lead has been merged with original" : "Duplicate lead kept as separate entry",
    })
  }

  const sourceAnalytics = leads.reduce((acc: any, lead) => {
    const source = lead.source
    if (!acc[source]) {
      acc[source] = { total: 0, hot: 0, converted: 0, avgScore: 0, totalScore: 0 }
    }
    acc[source].total += 1
    if (lead.status === "HOT" || lead.status === "IMMEDIATE_HOT") acc[source].hot += 1
    if (lead.status === "Converted") acc[source].converted += 1
    acc[source].totalScore += lead.score
    acc[source].avgScore = Math.round(acc[source].totalScore / acc[source].total)
    return acc
  }, {})

  const handleCreateCampaign = async () => {
    if (!campaignName || !campaignSource) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      // Generate QR code URL for this campaign
      const qrCode = await generateQRCode(campaignName)
      setQrCodeUrl(qrCode)

      // Create campaign via real API
      const newCampaign = await createCampaignApi({
        name: campaignName,
        source: campaignSource,
        qrCode: qrCode,
      })

      setCampaigns((prev) => [newCampaign, ...prev])

      toast({
        title: "Campaign Created",
        description: `Campaign "${campaignName}" created successfully`,
      })

      setCreateCampaignDialogOpen(false)
      setCampaignName("")
      setCampaignSource("")
      setCampaignFile(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to create campaign",
        variant: "destructive",
      })
    }
  }

  const handleAllocateLeads = async () => {
    if (!selectedCampaign || !selectedCounselor || !leadsToAllocate) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const allocation = await apiUtils.allocateLeads({
        campaignId: selectedCampaign,
        counselorName: selectedCounselor,
        count: Number.parseInt(leadsToAllocate),
      })

      setAllocations([...allocations, allocation])

      toast({
        title: "Leads Allocated",
        description: `${leadsToAllocate} leads allocated to ${selectedCounselor} successfully`,
      })

      setAllocateDialogOpen(false)
      setSelectedCampaign("")
      setSelectedCounselor("")
      setLeadsToAllocate("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to allocate leads",
        variant: "destructive",
      })
    }
  }

  const getUserAccessLevel = (leadId: string): "owner" | "editor" | "viewer" | "none" => {
    const ownership = leadOwnerships.get(leadId)
    if (ownership && ownership.ownerId === currentUser.id) {
      return "owner"
    }

    const accessList = leadAccessControls.get(leadId) || []
    const userAccess = accessList.find(access => access.userId === currentUser.id)

    return userAccess?.accessLevel || "none"
  }

  const canEditLead = (leadId: string): boolean => {
    const accessLevel = getUserAccessLevel(leadId)
    return accessLevel === "owner" || accessLevel === "editor"
  }


  const handleUpdateStatus = async () => {
    if (!selectedLead || !newStatus) {
      toast({
        title: "Error",
        description: "Please select a lead and a new status",
        variant: "destructive",
      })
      return
    }

    const isQualifyingStatus = ["HOT", "WARM", "IMMEDIATE_HOT", "CONTACTED", "FEATURE_LEAD"].includes(newStatus)
    const leadQualification = selectedLead.qualification

    if (isQualifyingStatus && !leadQualification) {
      const ownership: LeadOwnership = {
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        assignedDate: new Date().toISOString(),
        assignedBy: "System (First Qualification)"
      }

      setLeadOwnerships(prev => new Map(prev).set(selectedLead.id, ownership))

      // Open qualification dialog
      setQualificationDialogOpen(true)
      setStatusDialogOpen(false)
      return
    }

    try {
      await apiUtils.updateLeadStatus(selectedLead.id, newStatus, remarks)

      setLeads(leads.map((lead) => (lead.id === selectedLead.id ? { ...lead, status: newStatus } : lead)))

      if (notificationMethod === "email" || notificationMethod === "both") {
        toast({
          title: "Email Notification",
          description: `📧 Email would be sent to: ${selectedLead.email}\nSubject: Lead Status Updated to ${newStatus}`,
          duration: 5000,
        })
      }

      // Handle appointment booking if section is shown
      if (showAppointmentSection && appointmentDate && appointmentTime && appointmentType) {
        await apiUtils.createAppointment({
          leadId: selectedLead.id,
          date: appointmentDate,
          time: appointmentTime,
          type: appointmentType,
          meetingLink: appointmentType === "online" ? meetingLinkValue : undefined,
          location: appointmentType === "offline" ? locationValue : undefined,
        })

        if (notificationMethod === "email" || notificationMethod === "both") {
          toast({
            title: "Appointment Email",
            description: `📧 Appointment confirmation email would be sent to: ${selectedLead.email}`,
            duration: 5000,
          })
        }
      }

      // Handle reminder if section is shown
      if (showReminderSection && reminderDate && reminderTime) {
        await apiUtils.createNotification({
          leadId: selectedLead.id,
          type: "reminder",
          message: `Callback reminder for ${selectedLead.name}`,
          scheduledFor: `${reminderDate} ${reminderTime}`,
          notes: reminderNotes,
        })

        if (notificationMethod === "email" || notificationMethod === "both") {
          toast({
            title: "Reminder Email",
            description: `📧 Reminder email would be sent to: ${selectedLead.email} on ${reminderDate}`,
            duration: 5000,
          })
        }
      }

      toast({
        title: "Success",
        description: `Lead status updated successfully with all actions completed`,
      })

      // Reset all states
      setStatusDialogOpen(false)
      setNewStatus("")
      setRemarks("")
      setShowAppointmentSection(false)
      setShowReminderSection(false)
      setAppointmentDate("")
      setAppointmentTime("")
      setAppointmentType("")
      setMeetingLinkValue("")
      setLocationValue("")
      setReminderDate("")
      setReminderTime("")
      setReminderNotes("")
      setNotificationMethod("both")
      setSelectedLead(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const handleSetReminder = async () => {
    if (!reminderDate || !reminderTime || !selectedLead) {
      toast({
        title: "Error",
        description: "Please select date and time",
        variant: "destructive",
      })
      return
    }

    try {
      await apiUtils.createNotification({
        leadId: selectedLead.id,
        type: "reminder",
        message: `Callback reminder for ${selectedLead.name}`,
        scheduledFor: `${reminderDate} ${reminderTime}`,
        notes: reminderNotes,
      })

      toast({
        title: "Reminder Set",
        description: `Reminder set for ${reminderDate} at ${reminderTime}. Email notification will be sent.`,
      })

      setReminderDialogOpen(false)
      setReminderDate("")
      setReminderTime("")
      setReminderNotes("")
      setSelectedLead(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder",
        variant: "destructive",
      })
    }
  }

  const handleBookAppointment = async () => {
    if (!appointmentDate || !appointmentTime || !appointmentType || !selectedLead) {
      toast({
        title: "Error",
        description: "Please fill all appointment details",
        variant: "destructive",
      })
      return
    }

    try {
      await apiUtils.createAppointment({
        leadId: selectedLead.id,
        date: appointmentDate,
        time: appointmentTime,
        type: appointmentType,
      })

      toast({
        title: "Appointment Booked",
        description: `Appointment scheduled for ${appointmentDate} at ${appointmentTime}. Email confirmation will be sent.`,
      })

      setAppointmentDialogOpen(false)
      setAppointmentDate("")
      setAppointmentTime("")
      setAppointmentType("")
      setSelectedLead(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive",
      })
    }
  }

  // Update Transfer Dialog with reason dropdown
  const handleTransfer = () => {
    if (!selectedLeadForAction || !transferTo || !transferReasonType) {
      toast({
        title: "Missing Information",
        description: "Please select a counselor and reason for transfer",
        variant: "destructive",
      })
      return
    }

    const transferHistory: LeadTransferHistory = {
      id: `TH-${Date.now()}`,
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      toUserId: transferTo,
      toUserName: counselors.find(c => c.name === transferTo)?.name || transferTo, // Find name from counselors list
      reason: transferReasonType,
      transferDate: new Date().toISOString(),
      transferredBy: currentUser.name,
      notes: transferReason
    }

    const newOwnership: LeadOwnership = {
      ownerId: transferTo,
      ownerName: counselors.find(c => c.id === transferTo)?.name || transferTo, // Find name using ID
      assignedDate: new Date().toISOString(),
      assignedBy: currentUser.name
    }

    setLeadOwnerships(prev => new Map(prev).set(selectedLeadForAction.id, newOwnership))

    const existingHistory = leadTransferHistories.get(selectedLeadForAction.id) || []
    setLeadTransferHistories(prev =>
      new Map(prev).set(selectedLeadForAction.id, [...existingHistory, transferHistory])
    )

    const existingAccess = leadAccessControls.get(selectedLeadForAction.id) || []
    const newAccess: LeadAccessControl = {
      userId: currentUser.id,
      userName: currentUser.name,
      accessLevel: "viewer", // Defaulting to viewer for simplicity
      grantedDate: new Date().toISOString(),
      grantedBy: "System (Transfer)"
    }

    // Add new access for the transferred-to counselor if not already there
    if (!existingAccess.some(access => access.userId === transferTo)) {
      const transferredToAccess: LeadAccessControl = {
        userId: transferTo,
        userName: counselors.find(c => c.id === transferTo)?.name || transferTo, // Find name using ID
        accessLevel: "owner", // The new owner has owner level
        grantedDate: new Date().toISOString(),
        grantedBy: "System (Transfer)"
      }
      setLeadAccessControls(prev =>
        new Map(prev).set(selectedLeadForAction.id, [...existingAccess, transferredToAccess])
      )
    } else {
      // If the user already has access, ensure their level is owner if they are the new owner
      setLeadAccessControls(prev =>
        new Map(prev).set(selectedLeadForAction.id,
          (prev.get(selectedLeadForAction.id) || []).map(access =>
            access.userId === transferTo ? { ...access, accessLevel: "owner" } : access
          )
        )
      )
    }


    toast({
      title: "Lead Transferred",
      description: `Lead transferred to ${counselors.find(c => c.id === transferTo)?.name || transferTo} successfully`,
    })

    setTransferDialogOpen(false)
    setTransferTo("")
    setTransferReason("")
    setTransferReasonType("")
    setSelectedLeadForAction(null)
  }


  const handleCall = (lead: any) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${lead.phone_number || lead.phone}`,
    })
    window.location.href = `tel:${lead.phone_number || lead.phone}`
  }

  const handleEmail = (lead: any) => {
    toast({
      title: "Opening Email",
      description: `Composing email to ${lead.name}`,
    })
    window.location.href = `mailto:${lead.email}`
  }

  // Add handlePlayRecording function
  const handlePlayRecording = (report: any) => {
    setSelectedRecording(report)
    setAudioPlayerOpen(true)
  }

  const stats = {
    totalLeads: leads.length,
    qualified: leads.filter((l) => l.status === "Qualified").length,
    converted: leads.filter((l) => l.status === "Converted").length,
    avgScore: leads.length > 0 ? leads.reduce((sum, l) => sum + (l.score || 0), 0) / leads.length : 0,
    totalCampaigns: campaigns.length,
    totalCampaignLeads: campaigns.reduce((sum, c) => sum + (c.totalLeads || 0), 0),
    assignedLeads: campaigns.reduce((sum, c) => sum + (c.assignedLeads || 0), 0),
    unassignedLeads: campaigns.reduce((sum, c) => sum + (c.unassignedLeads || 0), 0),
    duplicates: campaigns.reduce((sum, c) => sum + (c.duplicateLeads || 0), 0),
    totalAllocated: allocations.reduce((sum, a) => sum + (a.leadsAllocated || 0), 0),
    inProgress: allocations.reduce((sum, a) => sum + (a.pending || 0), 0),
    completed: allocations.reduce((sum, a) => sum + (a.completed || 0), 0),
    totalCalls: callLogs.length,
    connectedCalls: callLogs.filter((c) => c.status === "Connected").length,
    notConnectedCalls: callLogs.filter((c) => c.status === "Not Connected").length,
  }

  const counselors = [
    { name: "Vinayak Kumar", activeLeads: 450, performance: 85, id: "U002" },
    { name: "Priya Sharma", activeLeads: 680, performance: 92, id: "U003" },
    { name: "Amit Patel", activeLeads: 1200, performance: 78, id: "U004" },
    { name: "Ravi Kumar", activeLeads: 320, performance: 88, id: "U005" },
  ]

  const allocationStats = {
    totalAllocated: allocations.reduce((sum, a) => sum + (a.leadsAllocated || 0), 0),
    totalContacted: allocations.reduce((sum, a) => sum + (a.leadsContacted || 0), 0),
    totalConverted: allocations.reduce((sum, a) => sum + (a.leadsConverted || 0), 0),
    conversionRate:
      allocations.reduce((sum, a) => sum + (a.leadsAllocated || 0), 0) > 0
        ? (
          (allocations.reduce((sum, a) => sum + (a.leadsConverted || 0), 0) /
            allocations.reduce((sum, a) => sum + (a.leadsAllocated || 0), 0)) *
          100
        ).toFixed(1)
        : "0",
  }

  const handleQualifyLead = async () => {
    if (selectedVerticals.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one vertical",
        variant: "destructive",
      })
      return
    }

    if (selectedVerticals.length > 2) {
      toast({
        title: "Error",
        description: "Maximum 2 verticals can be selected",
        variant: "destructive",
      })
      return
    }

    // Validate conditional fields
    if (selectedVerticals.includes("study_abroad") && selectedCountryOptions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one country for Study Abroad",
        variant: "destructive",
      })
      return
    }

    if (selectedVerticals.includes("study_india") && selectedCollegeOptions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one college for Study India",
        variant: "destructive",
      })
      return
    }

    if (selectedVerticals.includes("study_online") && selectedProgramOptions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one program for Study Online",
        variant: "destructive",
      })
      return
    }

    try {
      // Build qualification object
      const qualification: any = {
        verticals: selectedVerticals,
        qualifiedBy: user?.name || "Admin",
        qualifiedDate: new Date().toISOString(),
      }

      if (selectedVerticals.includes("study_abroad")) {
        qualification.studyAbroad = { countries: selectedCountryOptions }
      }

      if (selectedVerticals.includes("study_india")) {
        qualification.studyIndia = {
          mode: indiaMode,
          colleges: selectedCollegeOptions,
        }
      }

      if (selectedVerticals.includes("study_online")) {
        qualification.studyOnline = { programs: selectedProgramOptions }
      }

      // Save qualification
      await apiUtils.qualifyLead(selectedLead.id, qualification)

      // Assign lead owner (first person to qualify)
      await apiUtils.assignLeadOwner(selectedLead.id, user?.id, "Qualified by telecaller")

      // Now update status
      await apiUtils.updateLeadStatus(selectedLead.id, newStatus, remarks)

      toast({
        title: "Success",
        description: `Lead qualified successfully and status updated to ${newStatus}`,
      })

      // Reset states
      setQualificationDialogOpen(false)
      setSelectedVerticals([])
      setSelectedCountryOptions([]) // Reset multi-select state
      setSelectedCollegeOptions([]) // Reset multi-select state
      setSelectedProgramOptions([]) // Reset multi-select state
      setIndiaMode("offline")
      setNewStatus("")
      setRemarks("")
      setSelectedLead(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to qualify lead",
        variant: "destructive",
      })
    }
  }


  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-600 mt-1">AI-powered lead tracking and conversion optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowImportHistoryDialog(true)}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <History className="w-4 h-4 mr-2" />
            Import History
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSourceAnalyticsDialog(true)}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Source Analytics
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportToExcel}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/admin/leads/new")}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="space-y-6">
        <TabsList className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full">
          <TabsTrigger
            value="leads"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=inactive]:text-white rounded-full px-6 transition-all duration-200"
          >
            All Leads
          </TabsTrigger>
          {!isCounselor && (
            <>
              <TabsTrigger
                value="assign"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=inactive]:text-white rounded-full px-6 transition-all duration-200"
              >
                Campaigns
              </TabsTrigger>
              <TabsTrigger
                value="allocate"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=inactive]:text-white rounded-full px-6 transition-all duration-200"
              >
                Allocate Leads
              </TabsTrigger>
            </>
          )}
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=inactive]:text-white rounded-full px-6 transition-all duration-200"
          >
            Call Reporting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <LeadStatsCards
            totalLeads={totalLeadsCount}
            assignedLeads={statusCounts.assignedLeads || 0}
            duplicates={stats.duplicates || 0}
            avgScore={Math.round(stats.avgScore)}
          />

          <LeadsFilterBar
            searchTerm={searchTerm}
            onSearchTermChange={(v) => { setSearchTerm(v); setCurrentPage(0) }}
            selectedCampaignFilter={selectedCampaignFilter}
            onCampaignFilterChange={(v) => { setSelectedCampaignFilter(v); setCurrentPage(0) }}
            showAdvancedFilters={showAdvancedFilters}
            onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
            dateFrom={dateFrom}
            onDateFromChange={(v) => { setDateFrom(v); setCurrentPage(0) }}
            dateTo={dateTo}
            onDateToChange={(v) => { setDateTo(v); setCurrentPage(0) }}
            scoreFrom={scoreFrom}
            onScoreFromChange={(v) => { setScoreFrom(v); setCurrentPage(0) }}
            scoreTo={scoreTo}
            onScoreToChange={(v) => { setScoreTo(v); setCurrentPage(0) }}
            selectedStatuses={selectedStatuses}
            onSelectedStatusesChange={(v) => { setSelectedStatuses(v); setCurrentPage(0) }}
            selectedTags={selectedTags}
            onSelectedTagsChange={(v) => { setSelectedTags(v); setCurrentPage(0) }}
          />

          <BulkActionBar
            selectedCount={selectedLeads.length}
            totalVisible={filteredLeads.length}
            onSelectAll={(checked) => setSelectedLeads(checked ? filteredLeads.map((l) => l.id) : [])}
            onBulkAssign={() => setShowBulkAssignDialog(true)}
            onClear={() => setSelectedLeads([])}
          />

          <LeadsTable
            leads={filteredLeads}
            isLoading={isLoading}
            pageSize={pageSize}
            selectedLeads={selectedLeads}
            onSelectedLeadsChange={setSelectedLeads}
            leadOwnerships={leadOwnerships}
            currentUserId={currentUser.id}
            isCounselor={isCounselor}
            getAccessLevel={getUserAccessLevel}
            canEdit={canEditLead}
            onReassign={openReassignDialog}
            onEmail={(lead) => { setSelectedLeadForAction(lead); setShowEmailDialog(true) }}
            onSMS={(lead) => { setSelectedLeadForAction(lead); setShowSMSDialog(true) }}
            onNotes={(lead) => { setSelectedLeadForAction(lead); setShowNotesDialog(true) }}
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(0) }}
          />
        </TabsContent>

        {/* Campaigns Tab */}
        {!isCounselor && (
          <TabsContent value="assign" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Campaign Management</h2>
                <p className="text-sm text-gray-600 mt-1">Create campaigns and assign bulk data to your team</p>
              </div>
              <CreateCampaignDialog
                open={createCampaignDialogOpen}
                onOpenChange={setCreateCampaignDialogOpen}
                campaignName={campaignName}
                campaignSource={campaignSource}
                onCampaignNameChange={setCampaignName}
                onCampaignSourceChange={setCampaignSource}
                onFileChange={setCampaignFile}
                onSubmit={handleCreateCampaign}
              />
            </div>

            <CampaignStatsCards
              totalCampaigns={stats.totalCampaigns}
              totalLeads={stats.totalCampaignLeads}
              assignedLeads={stats.assignedLeads}
              unassignedLeads={stats.unassignedLeads}
              duplicates={stats.duplicates}
            />

            <CampaignTable
              campaigns={campaigns}
              getStatusColor={getStatusColor}
              onView={(name) => { setSelectedCampaignFilter(name); setActiveMainTab("leads") }}
              onAssign={(name) => { setSelectedCampaign(name); setActiveMainTab("allocate") }}
            />
          </TabsContent>
        )}

        {/* Allocate Leads Tab */}
        {!isCounselor && (
          <TabsContent value="allocate" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Lead Allocation</h2>
                <p className="text-sm text-gray-600 mt-1">Distribute leads from campaigns to counselors</p>
              </div>
              <Dialog open={allocateDialogOpen} onOpenChange={setAllocateDialogOpen}>
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
                    <div className="space-y-2">
                      <Label>Select Campaign</Label>
                      <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign.id} value={campaign.name}>
                              {campaign.name} ({(campaign.unassignedLeads || 0).toLocaleString()} available)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Select Counselor</Label>
                      <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select counselor" />
                        </SelectTrigger>
                        <SelectContent>
                          {counselors.map((counselor) => (
                            <SelectItem key={counselor.name} value={counselor.id}> {/* Use counselor.id */}
                              <div className="flex items-center justify-between w-full">
                                <span>{counselor.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  {counselor.activeLeads} leads • {counselor.performance}% performance
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedCounselor && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{counselors.find((c) => c.id === selectedCounselor)?.name}</p>
                              <p className="text-xs text-gray-600 mt-1">
                                Current Workload: {counselors.find((c) => c.id === selectedCounselor)?.activeLeads}{" "} {/* Use ID */}
                                active leads
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">Performance</p>
                              <p className="text-lg font-bold text-green-600">
                                {counselors.find((c) => c.id === selectedCounselor)?.performance}% {/* Use ID */}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Number of Leads</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 2000"
                        value={leadsToAllocate}
                        onChange={(e) => setLeadsToAllocate(e.target.value)}
                      />
                      {leadsToAllocate && selectedCounselor && (
                        <p className="text-xs text-gray-600">
                          New workload will be:{" "}
                          <strong className="text-gray-900">
                            {(counselors.find((c) => c.id === selectedCounselor)?.activeLeads || 0) + // Use ID
                              Number.parseInt(leadsToAllocate)}{" "}
                            leads
                          </strong>
                        </p>
                      )}
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Smart Allocation</p>
                          <p className="text-xs text-blue-700 mt-1">
                            Leads are allocated based on counselor workload, performance, and availability
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setAllocateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAllocateLeads}>
                        Allocate Leads
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Total Allocated</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(allocationStats.totalAllocated || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(allocationStats.totalContacted || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(allocationStats.totalConverted || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor Workload Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200"> {/* Use ID */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900 text-sm">{counselor.name}</p>
                        <Badge
                          className={
                            counselor.activeLeads < 500
                              ? "bg-green-100 text-green-700"
                              : counselor.activeLeads < 1000
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {counselor.activeLeads < 500 ? "Available" : counselor.activeLeads < 1000 ? "Busy" : "Full"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Active Leads</span>
                          <span className="font-semibold text-gray-900">{counselor.activeLeads}</span>
                        </div>
                        <Progress value={(counselor.activeLeads / 1500) * 100} className="h-2" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Performance</span>
                          <span className="font-semibold text-green-600">{counselor.performance}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Counselor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Campaign
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Allocated
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Completed
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Pending
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allocations.map((allocation) => {
                        const progress = (allocation.completed / allocation.allocated) * 100
                        return (
                          <tr key={allocation.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">{allocation.counselor}</p>
                                <p className="text-xs text-gray-500">
                                  Current workload: {allocation.currentWorkload} leads
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm text-gray-900">{allocation.campaign}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-semibold text-gray-900">
                                {(allocation.allocated || 0).toLocaleString()}
                              </p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-semibold text-green-600">
                                {(allocation.completed || 0).toLocaleString()}
                              </p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-semibold text-orange-600">
                                {(allocation.pending || 0).toLocaleString()}
                              </p>
                            </td>
                            <td className="px-4 py-3">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-gray-700">{progress.toFixed(1)}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-sm text-gray-600">{allocation.dateAllocated}</p>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                >
                                  <ArrowRightLeft className="w-4 h-4 mr-1" />
                                  Reassign
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Call Reporting Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Call Reports & Analytics</h2>
              <p className="text-sm text-gray-600 mt-1">Track call performance and outcomes</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Total Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCalls}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Connected</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.connectedCalls}</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Not Connected</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.notConnectedCalls}</p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Avg. Duration</p>
                    <p className="text-2xl font-bold text-gray-900">8:45</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Conversion</p>
                    <p className="text-2xl font-bold text-gray-900">{allocationStats.conversionRate}%</p>
                  </div>
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Call Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Lead Info
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Counselor
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Outcome
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Next Action
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Recording
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {callLogs.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              {report.leadName.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-sm">{report.leadName}</p>
                              <p className="text-xs text-gray-500 truncate">{report.leadPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">{report.counselor}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm text-gray-900">{report.callDate}</p>
                            <p className="text-xs text-gray-500">{report.callTime}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-gray-900">{report.duration}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusColor(report.outcome)}>{report.outcome}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-700">{report.nextAction}</p>
                        </td>
                        <td className="px-4 py-3">
                          {report.hasRecording ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => handlePlayRecording(report)}
                            >
                              <PlayCircle className="w-4 h-4 mr-1" />
                              Play
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400">No recording</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showBulkAssignDialog} onOpenChange={setShowBulkAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Assign Leads</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Assign {selectedLeads.length} leads to:</Label>
              <Select onValueChange={(value) => handleBulkAssign(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select counselor" />
                </SelectTrigger>
                <SelectContent>
                  {counselors.map((counselor) => (
                    <SelectItem key={counselor.id} value={counselor.name}> {/* Use name for display, ID for value if needed elsewhere */}
                      {counselor.name} ({counselor.activeLeads} active leads)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email to {selectedLeadForAction?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>To</Label>
              <Input value={selectedLeadForAction?.email} disabled className="mt-1" />
            </div>
            <div>
              <Label>Subject</Label>
              <Input placeholder="Enter subject" className="mt-1" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea placeholder="Enter your message" rows={6} className="mt-1" />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleSendEmail(selectedLeadForAction?.email, "Subject", "Message")}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This is a mock feature. In production, email would be sent to {selectedLeadForAction?.email}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSMSDialog} onOpenChange={setShowSMSDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send SMS to {selectedLeadForAction?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>To</Label>
              <Input value={selectedLeadForAction?.phone} disabled className="mt-1" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                placeholder="Enter your message (max 160 characters)"
                rows={4}
                maxLength={160}
                className="mt-1"
              />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleSendSMS(selectedLeadForAction?.phone, "Message")}
            >
              <Send className="w-4 h-4 mr-2" />
              Send SMS
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This is a mock feature. In production, SMS would be sent to {selectedLeadForAction?.phone}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Timeline - {selectedLeadForAction?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {leadNotes
              .filter((note) => note.leadId === selectedLeadForAction?.id)
              .map((note) => (
                <div key={note.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {note.type === "call" && <Phone className="w-4 h-4 text-blue-600" />}
                    {note.type === "email" && <Mail className="w-4 h-4 text-green-600" />}
                    {note.type === "sms" && <MessageSquare className="w-4 h-4 text-purple-600" />}
                    {note.type === "meeting" && <Calendar className="w-4 h-4 text-orange-600" />}
                    {note.type === "general" && <FileText className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{note.note}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {note.userName} • {note.date} {note.time}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="space-y-3 pt-3 border-t">
            <Label>Add New Note</Label>
            <Textarea id="new-note" placeholder="Enter note" rows={3} />
            <Select defaultValue="general">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                const noteInput = document.getElementById("new-note") as HTMLTextAreaElement
                handleAddNote(noteInput.value, "general")
                noteInput.value = ""
              }}
            >
              Add Note
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showImportHistoryDialog} onOpenChange={setShowImportHistoryDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Lead Import History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Date & Time</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Campaign</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">File Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Uploaded By</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Success</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Duplicates</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {importHistory.map((history) => (
                  <tr key={history.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {history.uploadedDate}
                      <br />
                      <span className="text-xs text-gray-500">{history.uploadedTime}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{history.campaignName}</td>
                    <td className="px-4 py-3 text-sm">{history.fileName}</td>
                    <td className="px-4 py-3 text-sm">{history.uploadedBy}</td>
                    <td className="px-4 py-3 text-sm text-right">{history.totalRecords}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-600">{history.successfulImports}</td>
                    <td className="px-4 py-3 text-sm text-right text-orange-600">{history.duplicates}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className="bg-green-100 text-green-700">Completed</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSourceAnalyticsDialog} onOpenChange={setShowSourceAnalyticsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Lead Source Analytics</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {Object.entries(sourceAnalytics).map(([source, data]: [string, any]) => (
              <Card key={source}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{source}</h3>
                    <Badge className="bg-blue-100 text-blue-700">{data.total} leads</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Hot Leads</p>
                      <p className="text-lg font-bold text-red-600">{data.hot}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Converted</p>
                      <p className="text-lg font-bold text-green-600">{data.converted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Avg Score</p>
                      <p className="text-lg font-bold text-blue-600">{data.avgScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Quality</p>
                      <p className="text-lg font-bold text-purple-600">
                        {data.avgScore >= 80 ? "High" : data.avgScore >= 60 ? "Medium" : "Low"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {duplicateLeads.filter((d) => d.status === "pending").length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-orange-900 flex items-center gap-2">
                  <Merge className="w-5 h-5" />
                  {duplicateLeads.filter((d) => d.status === "pending").length} Duplicate Leads Found
                </h3>
                <p className="text-sm text-orange-700 mt-1">
                  Review and merge duplicate leads to clean up your database
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setShowDuplicateMergeDialog(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Review Duplicates
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDuplicateMergeDialog} onOpenChange={setShowDuplicateMergeDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Duplicate Leads</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {duplicateLeads
              .filter((d) => d.status === "pending")
              .map((duplicate) => (
                <Card key={duplicate.id} className="border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{duplicate.name}</h4>
                        <p className="text-sm text-gray-600">
                          {duplicate.phone} • {duplicate.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Uploaded in <strong>{duplicate.campaignName}</strong> on {duplicate.uploadedDate} by{" "}
                          {duplicate.uploadedBy}
                        </p>
                        <p className="text-xs text-orange-600 mt-1">
                          Duplicate of existing lead ID: {duplicate.originalLeadId}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMergeDuplicate(duplicate.id, "merge")}
                          className="border-blue-600 text-blue-600"
                        >
                          Merge
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMergeDuplicate(duplicate.id, "keep-separate")}
                        >
                          Keep Separate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Qualification Dialog */}
      <Dialog open={qualificationDialogOpen} onOpenChange={setQualificationDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Qualify Lead - {selectedLead?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Verticals</Label>
              <div className="flex flex-wrap gap-2">
                {["study_abroad", "study_india", "study_online", "career_counseling"].map((vertical) => (
                  <Button
                    key={vertical}
                    variant={selectedVerticals.includes(vertical) ? "default" : "outline"}
                    className={
                      selectedVerticals.includes(vertical)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-blue-600 text-blue-600"
                    }
                    onClick={() => {
                      if (selectedVerticals.includes(vertical)) {
                        setSelectedVerticals(selectedVerticals.filter((v) => v !== vertical))
                      } else {
                        setSelectedVerticals([...selectedVerticals, vertical])
                      }
                    }}
                  >
                    {vertical.replace("_", " ").toUpperCase()}
                  </Button>
                ))}
              </div>
              {selectedVerticals.length > 2 && (
                <p className="text-xs text-red-600">Maximum 2 verticals can be selected.</p>
              )}
            </div>

            {selectedVerticals.includes("study_abroad") && (
              <div className="space-y-2">
                <Label>Countries</Label>
                <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                  {[
                    { value: "USA", label: "USA" },
                    { value: "UK", label: "UK" },
                    { value: "Canada", label: "Canada" },
                    { value: "Australia", label: "Australia" },
                    { value: "Germany", label: "Germany" },
                    { value: "Ireland", label: "Ireland" },
                  ].map((country) => (
                    <label key={country.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <Checkbox
                        checked={selectedCountryOptions.includes(country.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCountryOptions([...selectedCountryOptions, country.value])
                          } else {
                            setSelectedCountryOptions(selectedCountryOptions.filter((c) => c !== country.value))
                          }
                        }}
                      />
                      <span className="text-sm">{country.label}</span>
                    </label>
                  ))}
                </div>
                {selectedCountryOptions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCountryOptions.map((country) => (
                      <Badge key={country} variant="secondary" className="text-xs">
                        {country}
                        <button
                          onClick={() => setSelectedCountryOptions(selectedCountryOptions.filter((c) => c !== country))}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedVerticals.includes("study_india") && (
              <>
                <div className="space-y-2">
                  <Label>Mode</Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                      <Checkbox
                        checked={indiaMode === "offline"}
                        onCheckedChange={(checked) => checked && setIndiaMode("offline")}
                      />
                      Offline
                    </label>
                    <label className="flex items-center gap-1">
                      <Checkbox
                        checked={indiaMode === "online"}
                        onCheckedChange={(checked) => checked && setIndiaMode("online")}
                      />
                      Online
                    </label>
                    <label className="flex items-center gap-1">
                      <Checkbox
                        checked={indiaMode === "both"}
                        onCheckedChange={(checked) => checked && setIndiaMode("both")}
                      />
                      Both
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Colleges</Label>
                  <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                    {mockData.colleges
                      .filter((college) =>
                        indiaMode === "both" || college.type === indiaMode || indiaMode === ""
                      )
                      .map((college) => (
                        <label key={college.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                          <Checkbox
                            checked={selectedCollegeOptions.includes(college.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCollegeOptions([...selectedCollegeOptions, college.name])
                              } else {
                                setSelectedCollegeOptions(selectedCollegeOptions.filter((c) => c !== college.name))
                              }
                            }}
                          />
                          <span className="text-sm">{college.name}</span>
                        </label>
                      ))}
                  </div>
                  {selectedCollegeOptions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedCollegeOptions.map((college) => (
                        <Badge key={college} variant="secondary" className="text-xs">
                          {college}
                          <button
                            onClick={() => setSelectedCollegeOptions(selectedCollegeOptions.filter((c) => c !== college))}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedVerticals.includes("study_online") && (
              <div className="space-y-2">
                <Label>Programs</Label>
                <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                  {[
                    { value: "MBA", label: "MBA" },
                    { value: "Masters in Computer Science", label: "Masters in Computer Science" },
                    { value: "Bachelors in Engineering", label: "Bachelors in Engineering" },
                    { value: "Data Science Bootcamp", label: "Data Science Bootcamp" },
                    { value: "Digital Marketing Course", label: "Digital Marketing Course" },
                  ].map((program) => (
                    <label key={program.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <Checkbox
                        checked={selectedProgramOptions.includes(program.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProgramOptions([...selectedProgramOptions, program.value])
                          } else {
                            setSelectedProgramOptions(selectedProgramOptions.filter((p) => p !== program.value))
                          }
                        }}
                      />
                      <span className="text-sm">{program.label}</span>
                    </label>
                  ))}
                </div>
                {selectedProgramOptions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedProgramOptions.map((program) => (
                      <Badge key={program} variant="secondary" className="text-xs">
                        {program}
                        <button
                          onClick={() => setSelectedProgramOptions(selectedProgramOptions.filter((p) => p !== program))}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setQualificationDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleQualifyLead}>
              Qualify Lead
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status for {selectedLead?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>New Status</Label>
              <Select onValueChange={(value) => setNewStatus(value)} defaultValue={newStatus}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HOT">HOT</SelectItem>
                  <SelectItem value="IMMEDIATE_HOT">Immediate Hot</SelectItem>
                  <SelectItem value="WARM">Warm</SelectItem>
                  <SelectItem value="COLD">Cold</SelectItem>
                  <SelectItem value="FEATURE_LEAD">Feature Lead</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Remarks</Label>
              <Textarea
                placeholder="Enter any remarks"
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* Appointment Section */}
            <div className="border-t pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={showAppointmentSection} onCheckedChange={setShowAppointmentSection} />
                Book Appointment
              </label>
              {showAppointmentSection && (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <Select value={appointmentType} onValueChange={setAppointmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online Meeting</SelectItem>
                        <SelectItem value="offline">Offline Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {appointmentType === "online" && (
                    <div className="space-y-2">
                      <Label>Meeting Link</Label>
                      <Input
                        placeholder="Enter meeting link"
                        value={meetingLinkValue}
                        onChange={(e) => setMeetingLinkValue(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                  {appointmentType === "offline" && (
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        placeholder="Enter location"
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Reminder Section */}
            <div className="border-t pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={showReminderSection} onCheckedChange={setShowReminderSection} />
                Set Reminder
              </label>
              {showReminderSection && (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      placeholder="Enter reminder notes"
                      rows={2}
                      value={reminderNotes}
                      onChange={(e) => setReminderNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <Label>Notification Method</Label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={notificationMethod === "email"}
                    onCheckedChange={(checked) => checked && setNotificationMethod("email")}
                  />
                  Email
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={notificationMethod === "in-app"}
                    onCheckedChange={(checked) => checked && setNotificationMethod("in-app")}
                  />
                  In-App
                </label>
                <label className="flex items-center gap-1">
                  <Checkbox
                    checked={notificationMethod === "both"}
                    onCheckedChange={(checked) => checked && setNotificationMethod("both")}
                  />
                  Both
                </label>
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                // Call the appropriate handler based on whether qualification is needed
                if (newStatus && !selectedLead?.qualification && ["HOT", "Warm", "Immediate Hot", "Contacted", "Future Lead"].includes(newStatus)) {
                  setQualificationDialogOpen(true)
                } else {
                  handleUpdateStatus()
                }
              }}
            >
              Update Status
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This action will update the lead's status and trigger relevant notifications.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedLeadForAction && getUserAccessLevel(selectedLeadForAction.id) === "viewer" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-800">
                    You have read-only access to this lead
                  </p>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  You cannot transfer this lead. Contact the owner for changes.
                </p>
              </div>
            )}

            <div>
              <Label>Transfer to</Label>
              <Select onValueChange={(value) => setTransferTo(value)} value={transferTo}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select counselor" />
                </SelectTrigger>
                <SelectContent>
                  {counselors.map((counselor) => (
                    <SelectItem key={counselor.id} value={counselor.id}> {/* Use ID for value */}
                      {counselor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reason Category</Label>
              <Select onValueChange={(value) => setTransferReasonType(value)} value={transferReasonType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workload">Workload Distribution</SelectItem>
                  <SelectItem value="expertise">Counselor Expertise Match</SelectItem>
                  <SelectItem value="location">Geographic Location</SelectItem>
                  <SelectItem value="language">Language Preference</SelectItem>
                  <SelectItem value="unavailable">Counselor Unavailable</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Enter additional details for transfer"
                rows={3}
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                className="mt-1"
              />
            </div>

            {selectedLeadForAction && leadTransferHistories.get(selectedLeadForAction.id)?.length > 0 && (
              <div className="border-t pt-3">
                <Label className="text-xs text-gray-600">Transfer History</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {leadTransferHistories.get(selectedLeadForAction.id)?.map((history) => (
                    <div key={history.id} className="bg-gray-50 rounded p-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {history.fromUserName} → {history.toUserName}
                        </span>
                        <span className="text-gray-500">
                          {new Date(history.transferDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{history.reason}</p>
                      {history.notes && (
                        <p className="text-gray-500 mt-1 italic">{history.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleTransfer}
              disabled={selectedLeadForAction && getUserAccessLevel(selectedLeadForAction.id) === "viewer"}
            >
              Transfer Lead
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={audioPlayerOpen} onOpenChange={setAudioPlayerOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Recording</DialogTitle>
          </DialogHeader>
          {selectedRecording && (
            <div className="flex flex-col items-center justify-center py-4">
              <audio controls className="w-full">
                <source src={selectedRecording.recordingUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-xs text-gray-500 mt-3">
                Recording for lead: {selectedRecording.leadName}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ReassignLeadDialog
        open={showReassignDialog}
        onOpenChange={setShowReassignDialog}
        counselors={counselorsList}
        counselorId={reassignCounselorId}
        onCounselorIdChange={setReassignCounselorId}
        reason={reassignReason}
        onReasonChange={setReassignReason}
        loading={reassignLoading}
        onSubmit={handleReassign}
      />
    </div>
  )
}

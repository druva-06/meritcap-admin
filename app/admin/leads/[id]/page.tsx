"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api-client"
import { toast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  FileText,
  MessageSquare,
  Clock,
  User,
  Building2,
  GraduationCap,
  Target,
  Zap,
  Download,
  Upload,
  Send,
  CheckCircle2,
  PhoneCall,
  Video,
  Users,
  MapPin,
  Briefcase,
  Globe,
} from "lucide-react"

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [lead, setLead] = useState<any>(null)

  // Fetch lead data from API
  useEffect(() => {
    const fetchLeadDetails = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/api/leads/${params.id}`)

        if (response.success && response.data) {
          // Map backend snake_case to frontend format
          const leadData = response.data

          // Helper function to ensure array
          const ensureArray = (value: any) => {
            if (Array.isArray(value)) return value
            if (typeof value === 'string') return value.split(',').map((s: string) => s.trim()).filter(Boolean)
            return []
          }

          const preferredCoursesArray = ensureArray(leadData.preferred_courses)
          const preferredCountriesArray = ensureArray(leadData.preferred_countries)
          const tagsArray = ensureArray(leadData.tags)

          // Parse encrypted personal details
          let personalDetails: any = {}
          try {
            if (leadData.encrypted_personal_details) {
              personalDetails = JSON.parse(leadData.encrypted_personal_details)
            }
          } catch (e) {
            console.error('Error parsing encrypted_personal_details:', e)
          }

          // Parse encrypted academic details
          let academicDetails: any = {}
          try {
            if (leadData.encrypted_academic_details) {
              academicDetails = JSON.parse(leadData.encrypted_academic_details)
            }
          } catch (e) {
            console.error('Error parsing encrypted_academic_details:', e)
          }

          // Parse encrypted preferences
          let preferences: any = {}
          try {
            if (leadData.encrypted_preferences) {
              preferences = JSON.parse(leadData.encrypted_preferences)
            }
          } catch (e) {
            console.error('Error parsing encrypted_preferences:', e)
          }

          const mappedLead = {
            id: leadData.id,
            name: `${leadData.first_name || ''} ${leadData.last_name || ''}`.trim() || 'N/A',
            firstName: leadData.first_name || '',
            lastName: leadData.last_name || '',
            email: leadData.email || '',
            phone: leadData.phone_number || '',
            phoneNumber: leadData.phone_number || '',
            alternatePhone: personalDetails.alternate_phone || '',
            location: leadData.country || '',
            address: personalDetails.address || '',
            city: personalDetails.city || '',
            state: personalDetails.state || '',
            pincode: personalDetails.pincode || '',
            dateOfBirth: personalDetails.date_of_birth || 'N/A',
            gender: personalDetails.gender ? personalDetails.gender.charAt(0).toUpperCase() + personalDetails.gender.slice(1) : 'N/A',
            college: leadData.college || 'N/A',
            collegeLocation: leadData.college_location || 'N/A',
            course: leadData.course || 'N/A',
            year: leadData.intake || 'N/A',
            source: leadData.lead_source || 'N/A',
            status: leadData.status || 'COLD',
            interest: preferredCoursesArray.length > 0 ? preferredCoursesArray.join(', ') : 'N/A',
            budget: leadData.budget_range || 'N/A',
            createdAt: leadData.created_at ? new Date(leadData.created_at).toLocaleDateString() : 'N/A',
            lastContact: leadData.updated_at ? new Date(leadData.updated_at).toLocaleDateString() : 'N/A',
            assignedTo: leadData.assigned_to_name || 'Unassigned',
            assignedToId: leadData.assigned_to_id,
            score: leadData.score || 0,
            conversionProbability: Math.min((leadData.score || 0) + 5, 100),
            aiInsight: "Lead data fetched from backend",
            urgency: leadData.status === 'IMMEDIATE_HOT' || leadData.status === 'HOT' ? 'high' : 'medium',
            engagementLevel: leadData.score || 0,
            nextAction: "Contact lead for further details",
            timeline: leadData.intake || 'N/A',
            preferredCountries: preferredCountriesArray,
            preferredCourses: preferredCoursesArray,
            testScores: {
              ielts: academicDetails.ielts || "N/A",
              gre: academicDetails.gre || "N/A",
              toefl: academicDetails.toefl || "N/A",
              gmat: academicDetails.gmat || "N/A",
            },
            academicBackground: {
              degree: academicDetails.current_education || academicDetails.degree || "N/A",
              university: academicDetails.university || leadData.college || "N/A",
              percentage: academicDetails.percentage || "N/A",
              yearOfPassing: academicDetails.year_of_passing || "N/A",
            },
            workExperience: academicDetails.work_experience || "N/A",
            tags: tagsArray,
            isDuplicate: leadData.is_duplicate || false,
            createdBy: leadData.created_by_name || 'System',
            preferredCollege: preferences.preferred_college || '',
            notes: preferences.notes || '',
            updatedAt: leadData.updated_at,
            encryptedPersonalDetails: leadData.encrypted_personal_details,
            encryptedAcademicDetails: leadData.encrypted_academic_details,
            encryptedPreferences: leadData.encrypted_preferences,
          }
          setLead(mappedLead)
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to load lead details",
            variant: "destructive",
          })
          router.push("/admin/leads")
        }
      } catch (error) {
        console.error("Error fetching lead details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch lead details from server",
          variant: "destructive",
        })
        router.push("/admin/leads")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeadDetails()
  }, [params.id])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardHeader className="pb-3">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Content Skeleton */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show error if lead not found
  if (!lead) {
    return null
  }

  // Activity timeline
  const activities = [
    {
      id: 1,
      type: "call",
      title: "Phone Call",
      description: "Discussed MBA program options and budget",
      user: "Amit Counselor",
      timestamp: "2024-01-20 10:30 AM",
      duration: "15 mins",
      outcome: "Positive - Interested in USA universities",
    },
    {
      id: 2,
      type: "email",
      title: "Email Sent",
      description: "Sent university shortlist and fee structure",
      user: "Amit Counselor",
      timestamp: "2024-01-19 03:45 PM",
    },
    {
      id: 3,
      type: "status",
      title: "Status Updated",
      description: "Changed from Warm to HOT",
      user: "Amit Counselor",
      timestamp: "2024-01-19 02:30 PM",
      from: "Warm",
      to: "HOT",
    },
    {
      id: 4,
      type: "meeting",
      title: "Walk-in Meeting",
      description: "Initial counseling session completed",
      user: "Amit Counselor",
      timestamp: "2024-01-18 11:00 AM",
      duration: "45 mins",
    },
    {
      id: 5,
      type: "note",
      title: "Note Added",
      description: "Student is very serious about Fall 2025 intake",
      user: "Amit Counselor",
      timestamp: "2024-01-18 11:45 AM",
    },
    {
      id: 6,
      type: "document",
      title: "Document Uploaded",
      description: "Uploaded academic transcripts",
      user: "Priya Sharma",
      timestamp: "2024-01-17 04:20 PM",
    },
    {
      id: 7,
      type: "call",
      title: "Phone Call",
      description: "Initial inquiry call",
      user: "Amit Counselor",
      timestamp: "2024-01-15 02:15 PM",
      duration: "10 mins",
      outcome: "Scheduled walk-in appointment",
    },
    {
      id: 8,
      type: "created",
      title: "Lead Created",
      description: "Lead generated from website form",
      user: "System",
      timestamp: "2024-01-15 01:30 PM",
    },
  ]

  // Call logs
  const callLogs = [
    {
      id: 1,
      date: "2024-01-20",
      time: "10:30 AM",
      duration: "15 mins",
      type: "Outgoing",
      outcome: "Positive",
      notes: "Discussed MBA program options and budget. Student is interested in USA universities.",
      counselor: "Amit Counselor",
    },
    {
      id: 2,
      date: "2024-01-18",
      time: "02:45 PM",
      duration: "8 mins",
      type: "Incoming",
      outcome: "Positive",
      notes: "Student called to confirm walk-in appointment",
      counselor: "Amit Counselor",
    },
    {
      id: 3,
      date: "2024-01-15",
      time: "02:15 PM",
      duration: "10 mins",
      type: "Outgoing",
      outcome: "Positive",
      notes: "Initial inquiry call. Scheduled walk-in appointment for Jan 18.",
      counselor: "Amit Counselor",
    },
  ]

  // Email history
  const emails = [
    {
      id: 1,
      subject: "University Shortlist for Fall 2025",
      from: "Amit Counselor",
      to: "Priya Sharma",
      date: "2024-01-19 03:45 PM",
      status: "Sent",
      preview: "Hi Priya, Based on our discussion, here is a shortlist of universities...",
    },
    {
      id: 2,
      subject: "Welcome to MeritCap - Your Study Abroad Journey Begins",
      from: "MeritCap Team",
      to: "Priya Sharma",
      date: "2024-01-15 02:00 PM",
      status: "Sent",
      preview: "Dear Priya, Thank you for choosing MeritCap for your study abroad journey...",
    },
  ]

  // Meeting notes
  const meetings = [
    {
      id: 1,
      title: "Initial Counseling Session",
      date: "2024-01-18",
      time: "11:00 AM",
      duration: "45 mins",
      type: "Walk-in",
      counselor: "Amit Counselor",
      notes:
        "Student is very serious about pursuing MS in Computer Science. Prefers USA but open to Canada. Budget is 25-30 Lakhs. Has good academic background (85%) and 3 years work experience. IELTS score is 7.5, GRE is 320. Discussed top universities and application process. Next step: Finalize university list and start application process.",
      attendees: ["Priya Sharma", "Amit Counselor"],
    },
  ]

  // Documents
  const documents = [
    {
      id: 1,
      name: "Academic Transcripts.pdf",
      type: "Academic",
      uploadedBy: "Priya Sharma",
      uploadedAt: "2024-01-17 04:20 PM",
      size: "2.5 MB",
      status: "Verified",
    },
    {
      id: 2,
      name: "IELTS Score Card.pdf",
      type: "Test Score",
      uploadedBy: "Priya Sharma",
      uploadedAt: "2024-01-17 04:22 PM",
      size: "1.2 MB",
      status: "Verified",
    },
    {
      id: 3,
      name: "GRE Score Report.pdf",
      type: "Test Score",
      uploadedBy: "Priya Sharma",
      uploadedAt: "2024-01-17 04:25 PM",
      size: "800 KB",
      status: "Verified",
    },
    {
      id: 4,
      name: "Passport Copy.pdf",
      type: "Identity",
      uploadedBy: "Priya Sharma",
      uploadedAt: "2024-01-17 04:30 PM",
      size: "1.5 MB",
      status: "Pending Verification",
    },
    {
      id: 5,
      name: "Work Experience Letter.pdf",
      type: "Professional",
      uploadedBy: "Priya Sharma",
      uploadedAt: "2024-01-17 04:35 PM",
      size: "900 KB",
      status: "Verified",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      case "meeting":
        return <Users className="w-4 h-4" />
      case "status":
        return <TrendingUp className="w-4 h-4" />
      case "note":
        return <MessageSquare className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "created":
        return <User className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "call":
        return "bg-green-100 text-green-600"
      case "email":
        return "bg-blue-100 text-blue-600"
      case "meeting":
        return "bg-purple-100 text-purple-600"
      case "status":
        return "bg-orange-100 text-orange-600"
      case "note":
        return "bg-yellow-100 text-yellow-600"
      case "document":
        return "bg-cyan-100 text-cyan-600"
      case "created":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HOT":
        return "bg-red-600 text-white"
      case "IMMEDIATE_HOT":
        return "bg-orange-600 text-white"
      case "WARM":
        return "bg-yellow-600 text-white"
      case "COLD":
        return "bg-blue-600 text-white"
      case "FEATURE_LEAD":
        return "bg-purple-600 text-white"
      case "CONTACTED":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{lead.name}</h1>
              <p className="text-xs text-gray-500">
                ID: {lead.id} • Created: {lead.createdAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent hover:bg-gray-50">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={() => router.push(`/admin/leads/${lead.id}/edit`)}
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Lead Score</p>
                  <p className="text-2xl font-bold text-green-600">{lead.score}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Conversion</p>
                  <p className="text-2xl font-bold text-blue-600">{lead.conversionProbability}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Engagement</p>
                  <p className="text-2xl font-bold text-purple-600">{lead.engagementLevel}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 flex items-center text-sm md:text-base">
                  AI-Powered Insight
                  <Badge className="ml-2 bg-white/20 text-white text-xs border-0">Live</Badge>
                </h3>
                <p className="text-sm text-white/90">{lead.aiInsight}</p>
                <p className="text-xs text-white/80 mt-2 font-medium">⚡ Next Action: {lead.nextAction}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2 h-10">
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-10"
                onClick={() => setEmailDialogOpen(true)}
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2 h-10">
                <Video className="w-4 h-4" />
                Meeting
              </Button>
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2 h-10"
                onClick={() => setStatusDialogOpen(true)}
              >
                <Edit className="w-4 h-4" />
                Status
              </Button>
              <Button
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2 h-10"
                onClick={() => setNoteDialogOpen(true)}
              >
                <MessageSquare className="w-4 h-4" />
                Note
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-10">
                <CheckCircle2 className="w-4 h-4" />
                Convert
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-gray-100 p-1">
            <TabsTrigger
              value="overview"
              className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Calls</span>
            </TabsTrigger>
            <TabsTrigger value="emails" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Emails</span>
            </TabsTrigger>
            <TabsTrigger
              value="meetings"
              className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Meetings</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Combined Personal & Contact Information */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal & Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <Label className="text-xs text-gray-500">Full Name</Label>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Gender</Label>
                      <p className="font-medium text-gray-900">{lead.gender}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Date of Birth</Label>
                      <p className="font-medium text-gray-900">{lead.dateOfBirth}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Country</Label>
                      <p className="font-medium text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {lead.location}
                      </p>
                    </div>
                  </div>
                  {lead.address && (
                    <div className="pt-2 border-t">
                      <Label className="text-xs text-gray-500">Address</Label>
                      <p className="text-sm font-medium text-gray-900 whitespace-pre-line">{lead.address}</p>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {lead.city && (
                          <div>
                            <Label className="text-xs text-gray-500">City</Label>
                            <p className="text-sm font-medium text-gray-900">{lead.city}</p>
                          </div>
                        )}
                        {lead.state && (
                          <div>
                            <Label className="text-xs text-gray-500">State</Label>
                            <p className="text-sm font-medium text-gray-900">{lead.state}</p>
                          </div>
                        )}
                        {lead.pincode && (
                          <div>
                            <Label className="text-xs text-gray-500">Pincode</Label>
                            <p className="text-sm font-medium text-gray-900">{lead.pincode}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-500">Primary Phone</Label>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {lead.phone}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600 hover:bg-green-50">
                            <Phone className="w-3 h-3" />
                          </Button>
                        </p>
                      </div>
                      {lead.alternatePhone && (
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-gray-500">Alternate Phone</Label>
                          <p className="font-medium text-gray-900 flex items-center gap-2">
                            {lead.alternatePhone}
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600 hover:bg-green-50">
                              <Phone className="w-3 h-3" />
                            </Button>
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-500">Email</Label>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {lead.email}
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-50">
                            <Mail className="w-3 h-3" />
                          </Button>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Combined Academic & Test Scores */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    Academic Background & Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-xs text-gray-500">Current Education</Label>
                      <p className="font-medium text-gray-900">{lead.academicBackground.degree}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">University</Label>
                        <p className="font-medium text-gray-900">{lead.academicBackground.university}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Percentage</Label>
                        <p className="font-medium text-gray-900">{lead.academicBackground.percentage}</p>
                      </div>
                    </div>
                    {lead.academicBackground.yearOfPassing && lead.academicBackground.yearOfPassing !== 'N/A' && (
                      <div>
                        <Label className="text-xs text-gray-500">Year of Passing</Label>
                        <p className="font-medium text-gray-900">{lead.academicBackground.yearOfPassing}</p>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t">
                    <Label className="text-xs text-gray-500 mb-2 block">Test Scores</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-600">IELTS</p>
                        <p className="text-lg font-bold text-green-600">{lead.testScores.ielts}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-600">TOEFL</p>
                        <p className="text-lg font-bold text-blue-600">{lead.testScores.toefl}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-600">GRE</p>
                        <p className="text-lg font-bold text-purple-600">{lead.testScores.gre}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-600">GMAT</p>
                        <p className="text-lg font-bold text-orange-600">{lead.testScores.gmat}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <Label className="text-xs text-gray-500">Work Experience</Label>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-gray-400" />
                      {lead.workExperience}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Study Preferences */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-600" />
                    Study Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    {lead.preferredCollege && (
                      <div>
                        <Label className="text-xs text-gray-500">Preferred College</Label>
                        <p className="font-medium text-gray-900">{lead.preferredCollege}</p>
                      </div>
                    )}
                    <div>
                      <Label className="text-xs text-gray-500">Intake</Label>
                      <p className="font-medium text-gray-900">{lead.year}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Budget Range</Label>
                      <p className="font-medium text-gray-900">{lead.budget}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Preferred Countries</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lead.preferredCountries.map((country) => (
                          <Badge
                            key={country}
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Preferred Courses</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lead.preferredCourses.map((course) => (
                          <Badge
                            key={course}
                            variant="outline"
                            className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Management Info */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-600" />
                    Lead Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                        <Label className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Source
                        </Label>
                        <p className="font-bold text-blue-900 mt-1 text-sm">{lead.source}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                        <Label className="text-xs text-orange-700 font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Timeline
                        </Label>
                        <p className="font-bold text-orange-900 mt-1 text-sm">{lead.timeline}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Budget Range</Label>
                        <p className="font-medium text-gray-900 mt-0.5">{lead.budget}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Assigned To</Label>
                        <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          {lead.assignedTo}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                      <div>
                        <Label className="text-xs text-gray-500">Created By</Label>
                        <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          {lead.createdBy}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Created At</Label>
                        <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {lead.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Last Updated</Label>
                        <p className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {lead.lastContact}
                        </p>
                      </div>
                    </div>
                  </div>
                  {lead.tags && lead.tags.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                      <Label className="text-xs text-gray-500 mb-2 block">Tags</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {lead.tags.map((tag: string, index: number) => (
                          <Badge
                            key={`${tag}-${index}`}
                            variant="outline"
                            className="text-xs bg-teal-50 text-teal-700 border-teal-200 px-2.5 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {lead.notes && (
                    <div className="pt-3 border-t border-gray-100">
                      <Label className="text-xs text-gray-500 mb-2 block">Notes</Label>
                      <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {lead.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        {index < activities.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            {activity.duration && (
                              <p className="text-xs text-gray-500 mt-1">Duration: {activity.duration}</p>
                            )}
                            {activity.outcome && (
                              <Badge className="mt-2 bg-green-100 text-green-700 text-xs">{activity.outcome}</Badge>
                            )}
                            {activity.from && activity.to && (
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={getStatusColor(activity.from)}>{activity.from}</Badge>
                                <span className="text-xs text-gray-400">→</span>
                                <Badge className={getStatusColor(activity.to)}>{activity.to}</Badge>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.user}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calls" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Call Logs</CardTitle>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Log New Call
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {callLogs.map((call) => (
                    <div key={call.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className={call.type === "Outgoing" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}
                            >
                              {call.type}
                            </Badge>
                            <Badge className="bg-green-100 text-green-700">{call.outcome}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{call.notes}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {call.date} at {call.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {call.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {call.counselor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emails" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Email History</CardTitle>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  onClick={() => setEmailDialogOpen(true)}
                >
                  <Send className="w-4 h-4" />
                  Send Email
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emails.map((email) => (
                    <div key={email.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{email.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            From: {email.from} → To: {email.to}
                          </p>
                        </div>
                        <Badge className="bg-green-600 text-white text-xs">{email.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{email.preview}</p>
                      <p className="text-xs text-gray-400">{email.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Meeting Notes</CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Meeting
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{meeting.title}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {meeting.date} at {meeting.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {meeting.duration}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-purple-600 text-white text-xs">{meeting.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{meeting.notes}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">Attendees:</p>
                        {meeting.attendees.map((attendee) => (
                          <Badge key={attendee} variant="outline" className="text-xs">
                            {attendee}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Counselor: {meeting.counselor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Documents</CardTitle>
                <Button
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
                  onClick={() => setDocumentDialogOpen(true)}
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{doc.size}</span>
                            <Badge
                              className={
                                doc.status === "Verified"
                                  ? "bg-green-600 text-white text-xs"
                                  : "bg-yellow-600 text-white text-xs"
                              }
                            >
                              {doc.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                          <Download className="w-4 h-4" />
                        </Button>
                        {doc.status === "Pending Verification" && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600 hover:bg-green-50">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs remain the same */}

        {/* Dialogs */}
        <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Lead Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>New Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">HOT</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Textarea placeholder="Add remarks..." rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Status</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>To</Label>
                <Input value={lead.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Email subject..." />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Type your message..." rows={8} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Send className="w-4 h-4" />
                  Send Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Note</Label>
                <Textarea placeholder="Add your note..." rows={6} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Add Note</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={documentDialogOpen} onOpenChange={setDocumentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="test">Test Score</SelectItem>
                    <SelectItem value="identity">Identity</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>File</Label>
                <Input type="file" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDocumentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

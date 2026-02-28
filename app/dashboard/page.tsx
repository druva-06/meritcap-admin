"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  FileText,
  Heart,
  CreditCard,
  Send,
  Gift,
  Briefcase,
  CheckSquare,
  Upload,
  Menu,
  X,
  Settings,
  LogOut,
  Award,
  MessageCircle,
  Eye,
  CheckCircle,
  Clock,
  UserCheck,
  FileCheck,
  Video,
  Plane,
  Search,
  FileImage,
  FileSpreadsheet,
  Users,
  MoreHorizontal,
  BarChart3,
  User,
  Star,
  Bell,
  GraduationCap,
  ChevronUp,
  ChevronDown,
  Download,
  Plus,
  RotateCcw,
  AlertTriangle,
} from "lucide-react"
import type { UnifiedUserProfile } from "@/types/user"

interface Application {
  id: string
  university: string
  program: string
  country: string
  currentStage: number
  stages: ApplicationStage[]
  deadline: string
  appliedDate: string
  status: "in-progress" | "accepted" | "rejected" | "waitlisted" | "submitted"
  documents: string[]
  fees: {
    application: number
    tuition: number
    currency: string
  }
  timeline: TimelineEvent[]
  counselor?: string
  notes?: string
  applicationData?: any
  universityId?: string
  courseId?: string
  universityName?: string
  courseName?: string
  submittedAt?: string
  formData?: any
  pdfFileName?: string
}

interface ApplicationStage {
  id: number
  name: string
  icon: string
  completed: boolean
  date?: string
}

interface TimelineEvent {
  id: string
  title: string
  description: string
  date: string
  type: "info" | "success" | "warning" | "error"
}

interface Document {
  id: number
  name: string
  status: "uploaded" | "pending" | "missing" | "verified" | "rejected"
  required: boolean
  uploadDate?: string
  size?: string
  type?: string
  url?: string
  comments?: string
  category?: string
  file?: File
}

interface University {
  id: number
  name: string
  program: string
  location: string
  country: string
  ranking: string
  tuition: string
  deadline: string
  type: "expert" | "wishlist"
  logo?: string
  acceptanceRate?: string
  duration?: string
  intake?: string[]
  requirements?: string[]
  scholarships?: boolean
  isApplied?: boolean
  applicationId?: string
  matchPercentage?: number
  selected?: boolean
  rating?: string
}

interface Task {
  id: number
  title: string
  description?: string
  assignedBy: string
  assignedTo: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
  status: "pending" | "completed" | "overdue"
  category: string
  attachments?: string[]
  comments?: Comment[]
}

interface Comment {
  id: string
  author: string
  message: string
  date: string
}

interface ChatMessage {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: string
  type?: "text" | "suggestion" | "action"
  actions?: ChatAction[]
}

interface ChatAction {
  label: string
  action: string
  data?: any
}

interface Offer {
  id: string
  university: string
  program: string
  country: string
  logo?: string
  location?: string
  intake?: string
  offerType: "Conditional" | "Unconditional" | "Scholarship" | "Waitlist"
  status: "pending" | "accepted" | "declined" | "expired"
  receivedDate: string
  responseDeadline: string
  tuitionFee: string
  scholarshipAmount?: string
  conditions?: string[]
  documents: string[]
  contactPerson: {
    name: string
    email: string
    phone: string
  }
  nextSteps: string[]
  applicationId: string
}

interface SearchResult {
  id: number
  name: string
  program: string
  location: string
  country: string
  ranking: string
  tuition: string
  deadline: string
  acceptanceRate?: string
  scholarships?: boolean
  matchPercentage?: number
  logo?: string
  rating?: string
}

// Custom Progress Component
const Progress = ({ value, className = "" }: { value: number; className?: string }) => (
  <div className={`w-full bg-blue-200 rounded-full ${className}`}>
    <div className="bg-white h-full rounded-full transition-all duration-300" style={{ width: `${value}%` }}></div>
  </div>
)

// Custom Avatar Components
const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative inline-flex items-center justify-center rounded-full bg-blue-100 ${className}`}>
    {children}
  </div>
)

const AvatarImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <img src={src || "/placeholder.svg"} alt={alt} className={`rounded-full object-cover ${className}`} />
)

const AvatarFallback = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center rounded-full bg-blue-500 text-white font-medium ${className}`}>
    {children}
  </div>
)

// Simple toast function
const showToast = (title: string, description?: string) => {
  console.log(`${title}: ${description || ""}`)
  alert(`${title}${description ? `: ${description}` : ""}`)
}

// Sample university data for search
const sampleUniversities: SearchResult[] = [
  {
    id: 1,
    name: "Harvard University",
    program: "MS Computer Science",
    location: "Cambridge, MA",
    country: "USA",
    ranking: "#1 Global",
    tuition: "$55,000/year",
    deadline: "Dec 15, 2024",
    acceptanceRate: "3.4%",
    scholarships: true,
    matchPercentage: 95,
    logo: "/harvard.png",
    rating: "4.8",
  },
  {
    id: 2,
    name: "MIT",
    program: "MS Electrical Engineering",
    location: "Cambridge, MA",
    country: "USA",
    ranking: "#2 Global",
    tuition: "$58,000/year",
    deadline: "Dec 20, 2024",
    acceptanceRate: "4.1%",
    scholarships: true,
    matchPercentage: 92,
    logo: "/mit.png",
    rating: "4.7",
  },
  {
    id: 3,
    name: "Stanford University",
    program: "MS Computer Science",
    location: "Stanford, CA",
    country: "USA",
    ranking: "#3 Global",
    tuition: "$56,000/year",
    deadline: "Dec 18, 2024",
    acceptanceRate: "4.3%",
    scholarships: true,
    matchPercentage: 90,
    logo: "/stanford.png",
    rating: "4.6",
  },
  {
    id: 4,
    name: "Oxford University",
    program: "MSc Computer Science",
    location: "Oxford, UK",
    country: "UK",
    ranking: "#4 Global",
    tuition: "£35,000/year",
    deadline: "Jan 10, 2025",
    acceptanceRate: "17.5%",
    scholarships: true,
    matchPercentage: 88,
    logo: "/oxford.png",
    rating: "4.5",
  },
  {
    id: 5,
    name: "University of Toronto",
    program: "MS Data Science",
    location: "Toronto, Canada",
    country: "Canada",
    ranking: "#18 Global",
    tuition: "CAD 45,000/year",
    deadline: "Jan 15, 2025",
    acceptanceRate: "43%",
    scholarships: false,
    matchPercentage: 85,
    logo: "/toronto.png",
    rating: "4.4",
  },
]

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    FileText,
    Eye,
    CheckCircle,
    Gift,
    FileCheck,
    Video,
    UserCheck,
    CreditCard,
    Award,
    Plane,
    Users,
    Clock,
  }
  return iconMap[iconName] || FileText
}

const sidebarItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    color: "text-blue-600",
    subtabs: [],
  },
  {
    id: "shortlist",
    label: "Shortlist",
    icon: Heart,
    color: "text-red-600",
    subtabs: [
      { id: "overall", label: "Overall" },
      { id: "my-saved", label: "My Saved" },
      { id: "expert-shortlist", label: "Expert Shortlist" },
      { id: "comparison", label: "Comparison Tool" },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    icon: Send,
    color: "text-indigo-600",
    subtabs: [
      { id: "in-progress", label: "In Progress" },
      { id: "submitted", label: "Submitted" },
      { id: "decisions", label: "Decisions" },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    icon: Upload,
    color: "text-blue-600",
    subtabs: [],
  },
  {
    id: "offers",
    label: "Offers",
    icon: Gift,
    color: "text-blue-600",
    subtabs: [
      { id: "all-offers", label: "All Offers" },
      { id: "action-required", label: "Action Required" },
      { id: "accepted", label: "Accepted" },
      { id: "closed", label: "Closed" },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
    color: "text-purple-500",
    subtabs: [],
  },
  {
    id: "community",
    label: "Community",
    icon: MessageCircle,
    color: "text-orange-600",
    subtabs: [],
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: Briefcase,
    color: "text-gray-600",
    subtabs: [],
  },
  {
    id: "loan",
    label: "Loan",
    icon: CreditCard,
    color: "text-yellow-600",
    subtabs: [],
  },
  {
    id: "more",
    label: "More",
    icon: MoreHorizontal,
    color: "text-gray-500",
    subtabs: [],
  },
]

const shortlistData = {
  overall: [
    {
      id: 1,
      name: "Stanford University",
      program: "MS Computer Science",
      location: "Stanford, CA",
      match: 95,
      acceptance: 4.3,
      tuition: "$55,000/year",
      deadline: "Dec 15, 2024",
      tags: ["Strong GPA match", "Research interests align", "Location preference"],
      type: "expert",
    },
    {
      id: 2,
      name: "MIT",
      program: "MS Artificial Intelligence",
      location: "Cambridge, MA",
      match: 92,
      acceptance: 6.7,
      tuition: "$58,000/year",
      deadline: "Dec 31, 2024",
      tags: ["Excellent test scores", "Relevant work experience", "Program fit"],
      type: "expert",
    },
    {
      id: 3,
      name: "Carnegie Mellon",
      program: "MS Machine Learning",
      location: "Pittsburgh, PA",
      match: 88,
      acceptance: 8.1,
      tuition: "$52,000/year",
      deadline: "Jan 15, 2025",
      tags: ["Technical background", "Research publications", "Industry connections"],
      type: "saved",
    },
    {
      id: 4,
      name: "UC Berkeley",
      program: "MS Data Science",
      location: "Berkeley, CA",
      match: 85,
      acceptance: 12.5,
      tuition: "$48,000/year",
      deadline: "Dec 20, 2024",
      tags: ["Academic excellence", "Project portfolio", "Faculty match"],
      type: "saved",
    },
  ],
  "my-saved": [
    {
      id: 3,
      name: "Carnegie Mellon",
      program: "MS Machine Learning",
      location: "Pittsburgh, PA",
      match: 88,
      acceptance: 8.1,
      tuition: "$52,000/year",
      deadline: "Jan 15, 2025",
      tags: ["Technical background", "Research publications", "Industry connections"],
      type: "saved",
    },
    {
      id: 4,
      name: "UC Berkeley",
      program: "MS Data Science",
      location: "Berkeley, CA",
      match: 85,
      acceptance: 12.5,
      tuition: "$48,000/year",
      deadline: "Dec 20, 2024",
      tags: ["Academic excellence", "Project portfolio", "Faculty match"],
      type: "saved",
    },
  ],
  "expert-shortlist": [
    {
      id: 1,
      name: "Stanford University",
      program: "MS Computer Science",
      location: "Stanford, CA",
      match: 95,
      acceptance: 4.3,
      tuition: "$55,000/year",
      deadline: "Dec 15, 2024",
      tags: ["Strong GPA match", "Research interests align", "Location preference"],
      type: "expert",
    },
    {
      id: 2,
      name: "MIT",
      program: "MS Artificial Intelligence",
      location: "Cambridge, MA",
      match: 92,
      acceptance: 6.7,
      tuition: "$58,000/year",
      deadline: "Dec 31, 2024",
      tags: ["Excellent test scores", "Relevant work experience", "Program fit"],
      type: "expert",
    },
  ],
  comparison: [],
}

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user: authUser, loading: authLoading } = useAuth()
  const [user, setUser] = useState<UnifiedUserProfile | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [activeSubTab, setActiveSubTab] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("abroad")

  // Check authentication
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return

    // Check if user is authenticated
    if (!authUser) {
      router.push("/login")
      return
    }

    // Redirect all authenticated users to their appropriate dashboards
    // (Students don't have login access to this portal)
    switch (authUser.role) {
      case "admin":
      case "manager":
      case "counselor":
      case "SUPER_ADMIN":
        router.push("/admin/dashboard")
        return
      case "COLLEGE":
        router.push("/college/dashboard")
        return
      case "SUBAGENT":
        router.push("/subagent/dashboard")
        return
      default:
        // Unknown role, redirect to login
        router.push("/login")
        return
    }
  }, [authUser, authLoading, router])

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white/80 backdrop-blur"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-12 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Applications Section */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                    <Skeleton className="h-9 w-32 rounded-lg" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50/50 transition-colors border border-gray-100"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-7 w-24 rounded-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-transparent"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <Skeleton className="h-6 w-36" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full rounded-lg" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!authUser) {
    return null
  }

  const [appDocuments, setAppDocuments] = useState<any[]>([])
  const [applicationsData, setApplicationsData] = useState<Application[]>([])
  const [allTasks, setAllTasks] = useState<any[]>([])

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState("abroad")
  const [searchCountry, setSearchCountry] = useState("")
  const [searchLevel, setSearchLevel] = useState("")
  const [searchDuration, setSearchDuration] = useState("")
  const [searchExams, setSearchExams] = useState("")
  const [searchFees, setSearchFees] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const [offersFilter, setOffersFilter] = useState("all-offers")

  // Document state
  const [addDocumentOpen, setAddDocumentOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "Academic",
    file: null as File | null,
  })
  const [newDocumentName, setNewDocumentName] = useState("")
  const [newDocumentCategory, setNewDocumentCategory] = useState("")
  const [newDocumentRemarks, setNewDocumentRemarks] = useState("")
  const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null)
  const [documentError, setDocumentError] = useState("")

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm WOW MAMA, your AI study assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
      type: "text",
      actions: [
        { label: "Find Universities", action: "find_universities" },
        { label: "Check Application Status", action: "check_applications" },
        { label: "Document Help", action: "document_help" },
      ],
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  // Documents state
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: "10th Marksheet",
      status: "verified",
      required: true,
      uploadDate: "2024-01-15",
      size: "2.3 MB",
      type: "PDF",
      category: "Academic",
    },
    {
      id: 2,
      name: "12th Marksheet",
      status: "verified",
      required: true,
      uploadDate: "2024-01-15",
      size: "1.8 MB",
      type: "PDF",
      category: "Academic",
    },
    {
      id: 3,
      name: "Degree Certificate",
      status: "pending",
      required: true,
      uploadDate: "2024-01-20",
      size: "3.1 MB",
      type: "PDF",
      category: "Academic",
      comments: "Under verification by university",
    },
    {
      id: 4,
      name: "Passport",
      status: "verified",
      required: true,
      uploadDate: "2024-01-10",
      size: "1.2 MB",
      type: "PDF",
      category: "Personal",
    },
    {
      id: 5,
      name: "IELTS Score Report",
      status: "missing",
      required: false,
      category: "Test Scores",
      comments: "Please upload your latest IELTS score report",
    },
    {
      id: 6,
      name: "Statement of Purpose",
      status: "rejected",
      required: true,
      uploadDate: "2024-01-18",
      size: "0.8 MB",
      type: "PDF",
      category: "Application",
      comments: "Please revise and resubmit. Focus more on career goals.",
    },
  ])

  // Shortlist state
  const [shortlistFilter, setShortlistFilter] = useState("all")
  const [selectedUniversities, setSelectedUniversities] = useState<number[]>([])

  // Applications state - Initialize with empty array, will load from localStorage
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app-1",
      university: "Harvard University",
      program: "MS Computer Science",
      country: "USA",
      currentStage: 3,
      stages: [],
      deadline: "Dec 15, 2024",
      appliedDate: "Nov 20, 2024",
      status: "in-progress",
      documents: [],
      fees: {
        application: 100,
        tuition: 55000,
        currency: "USD",
      },
      timeline: [],
      universityId: "harvard",
      courseId: "cs-ms",
    },
    {
      id: "app-4",
      university: "University of Toronto",
      program: "MS Artificial Intelligence",
      country: "Canada",
      currentStage: 2,
      stages: [],
      deadline: "Jan 31, 2025",
      appliedDate: "Dec 5, 2024",
      status: "in-progress",
      documents: [],
      fees: {
        application: 150,
        tuition: 45000,
        currency: "CAD",
      },
      timeline: [],
      universityId: "toronto",
      courseId: "ai-ms",
    },
    {
      id: "app-5",
      university: "IIT Bombay",
      program: "M.Tech Computer Science",
      country: "India",
      currentStage: 4,
      stages: [],
      deadline: "Feb 15, 2025",
      appliedDate: "Nov 25, 2024",
      status: "in-progress",
      documents: [],
      fees: {
        application: 50,
        tuition: 2500,
        currency: "USD",
      },
      timeline: [],
      universityId: "iit-bombay",
      courseId: "cs-mtech",
    },
    {
      id: "app-6",
      university: "University of Melbourne",
      program: "MS Data Analytics",
      country: "Australia",
      currentStage: 1,
      stages: [],
      deadline: "Mar 1, 2025",
      appliedDate: "Dec 10, 2024",
      status: "in-progress",
      documents: [],
      fees: {
        application: 120,
        tuition: 42000,
        currency: "AUD",
      },
      timeline: [],
      universityId: "melbourne",
      courseId: "da-ms",
    },
    {
      id: "app-7",
      university: "National University of Singapore",
      program: "MS Software Engineering",
      country: "Singapore",
      currentStage: 3,
      stages: [],
      deadline: "Jan 20, 2025",
      appliedDate: "Nov 30, 2024",
      status: "in-progress",
      documents: [],
      fees: {
        application: 80,
        tuition: 38000,
        currency: "SGD",
      },
      timeline: [],
      universityId: "nus",
      courseId: "se-ms",
    },
    {
      id: "app-8",
      university: "University of British Columbia",
      program: "MS Machine Learning",
      country: "Canada",
      currentStage: 2,
      stages: [],
      deadline: "Feb 28, 2025",
      appliedDate: "Dec 1, 2024",
      status: "in-progress",
      documents: [],
      fees: {
        application: 140,
        tuition: 47000,
        currency: "CAD",
      },
      timeline: [],
      universityId: "ubc",
      courseId: "ml-ms",
    },
    {
      id: "app-2",
      university: "MIT",
      program: "MS Electrical Engineering",
      country: "USA",
      currentStage: 7,
      stages: [],
      deadline: "Dec 20, 2024",
      appliedDate: "Nov 15, 2024",
      status: "submitted",
      documents: [],
      fees: {
        application: 100,
        tuition: 58000,
        currency: "USD",
      },
      timeline: [],
      universityId: "mit",
      courseId: "ee-ms",
    },
    {
      id: "app-3",
      university: "Stanford University",
      program: "MS Data Science",
      country: "USA",
      currentStage: 10,
      stages: [],
      deadline: "Jan 15, 2025",
      appliedDate: "Oct 30, 2024",
      status: "accepted",
      documents: [],
      fees: {
        application: 100,
        tuition: 52000,
        currency: "USD",
      },
      timeline: [],
      universityId: "stanford",
      courseId: "ds-ms",
    },
  ])

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete IELTS registration",
      description: "Register for IELTS exam for January 2025 session",
      assignedBy: "Sarah Johnson (Counselor)",
      assignedTo: "student",
      priority: "High",
      dueDate: "2024-12-18",
      status: "pending",
      category: "Test Preparation",
    },
    {
      id: 2,
      title: "Submit Stanford application documents",
      description: "Upload remaining documents for Stanford application",
      assignedBy: "Michael Chen (Backend Team)",
      assignedTo: "student",
      priority: "High",
      dueDate: "2024-12-15",
      status: "completed",
      category: "Application",
    },
    {
      id: 3,
      title: "Review visa requirements for USA",
      description: "Research and prepare visa documentation checklist",
      assignedBy: "You",
      assignedTo: "Emily Davis (Counselor)",
      priority: "Medium",
      dueDate: "2024-12-25",
      status: "pending",
      category: "Visa",
    },
  ])

  // Offers state
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "offer-001",
      university: "Stanford University",
      logo: "/placeholder.svg?height=40&width=40&text=SU",
      program: "MS Computer Science",
      country: "USA",
      location: "Stanford, CA",
      intake: "Fall 2024",
      offerType: "Conditional",
      status: "pending",
      receivedDate: "2024-01-20",
      responseDeadline: "2024-02-20",
      tuitionFee: "$55,000/year",
      conditions: ["Submit final transcripts", "IELTS score of 7.0 or above", "Complete pre-enrollment health check"],
      documents: ["Offer Letter", "I-20 Form", "Scholarship Details"],
      contactPerson: {
        name: "Dr. Sarah Johnson",
        email: "admissions@stanford.edu",
        phone: "+1-650-723-2300",
      },
      nextSteps: [
        "Accept offer by February 20, 2024",
        "Pay enrollment deposit of $500",
        "Submit required documents",
        "Apply for student visa",
      ],
      applicationId: "app-001",
    },
    {
      id: "offer-002",
      university: "University of Toronto",
      logo: "/placeholder.svg?height=40&width=40&text=UT",
      program: "MS Data Science",
      country: "Canada",
      location: "Toronto, ON",
      intake: "Winter 2024",
      offerType: "Scholarship",
      status: "pending",
      receivedDate: "2024-01-18",
      responseDeadline: "2024-02-15",
      tuitionFee: "CAD $45,000/year",
      scholarshipAmount: "CAD $15,000",
      conditions: ["Maintain GPA of 3.5 or above"],
      documents: ["Offer Letter", "Scholarship Award Letter", "Study Permit Guide"],
      contactPerson: {
        name: "Prof. Michael Chen",
        email: "graduate.admissions@utoronto.ca",
        phone: "+1-416-978-2011",
      },
      nextSteps: [
        "Accept scholarship offer",
        "Complete enrollment process",
        "Apply for study permit",
        "Arrange accommodation",
      ],
      applicationId: "app-003",
    },
    {
      id: "offer-003",
      university: "Manipal University Online",
      logo: "/placeholder.svg?height=40&width=40&text=MU",
      program: "MBA",
      country: "India",
      location: "Online",
      intake: "January 2025",
      offerType: "Unconditional",
      status: "accepted",
      receivedDate: "2024-01-10",
      responseDeadline: "2024-02-10",
      tuitionFee: "₹2,50,000/year",
      documents: ["Offer Letter", "Enrollment Confirmation"],
      contactPerson: {
        name: "Dr. Priya Sharma",
        email: "admissions@manipal.edu",
        phone: "+91-820-292-0261",
      },
      nextSteps: ["Complete enrollment process", "Pay first semester fee", "Access online portal"],
      applicationId: "app-004",
    },
    {
      id: "offer-004",
      university: "Harvard University",
      logo: "/placeholder.svg?height=40&width=40&text=HU",
      program: "MS Business Analytics",
      country: "USA",
      location: "Cambridge, MA",
      intake: "Fall 2024",
      offerType: "Conditional",
      status: "declined",
      receivedDate: "2024-01-05",
      responseDeadline: "2024-01-25",
      tuitionFee: "$65,000/year",
      conditions: ["Submit GMAT score of 700+"],
      documents: ["Offer Letter"],
      contactPerson: {
        name: "Dr. Robert Wilson",
        email: "admissions@harvard.edu",
        phone: "+1-617-495-1000",
      },
      nextSteps: [],
      applicationId: "app-005",
    },
    {
      id: "offer-005",
      university: "MIT",
      logo: "/placeholder.svg?height=40&width=40&text=MIT",
      program: "MS Artificial Intelligence",
      country: "USA",
      location: "Cambridge, MA",
      intake: "Spring 2024",
      offerType: "Waitlist",
      status: "expired",
      receivedDate: "2023-12-15",
      responseDeadline: "2024-01-15",
      tuitionFee: "$58,000/year",
      documents: ["Waitlist Letter"],
      contactPerson: {
        name: "Dr. Lisa Chen",
        email: "admissions@mit.edu",
        phone: "+1-617-253-1000",
      },
      nextSteps: [],
      applicationId: "app-006",
    },
  ])

  // Shortlist data
  const [expertSuggestions, setExpertSuggestions] = useState<University[]>([
    {
      id: 1,
      name: "Harvard University",
      program: "MS Computer Science",
      location: "Cambridge, MA",
      country: "USA",
      ranking: "#1 Global",
      tuition: "$55,000/year",
      deadline: "Dec 15, 2024",
      type: "expert",
      acceptanceRate: "3.4%",
      duration: "2 years",
      matchPercentage: 95,
      scholarships: true,
      selected: false,
    },
    {
      id: 2,
      name: "MIT",
      program: "MS Electrical Engineering",
      location: "Cambridge, MA",
      country: "USA",
      ranking: "#2 Global",
      tuition: "$58,000/year",
      deadline: "Dec 20, 2024",
      type: "expert",
      acceptanceRate: "4.1%",
      duration: "2 years",
      matchPercentage: 92,
      scholarships: true,
      selected: false,
    },
  ])

  const [studentWishlist, setStudentWishlist] = useState<University[]>([
    {
      id: 3,
      name: "Oxford University",
      program: "MSc Computer Science",
      location: "Oxford, UK",
      country: "UK",
      ranking: "#4 Global",
      tuition: "£35,000/year",
      deadline: "Jan 10, 2025",
      type: "wishlist",
      acceptanceRate: "17.5%",
      duration: "1 year",
      matchPercentage: 88,
      scholarships: true,
      selected: false,
    },
    {
      id: 4,
      name: "University of Melbourne",
      program: "MS Data Science",
      location: "Melbourne, Australia",
      country: "Australia",
      ranking: "#15 Global",
      tuition: "AUD 45,000/year",
      deadline: "Feb 1, 2025",
      type: "wishlist",
      acceptanceRate: "25.2%",
      duration: "2 years",
      matchPercentage: 85,
      scholarships: false,
      selected: false,
    },
  ])

  const [recommendations, setRecommendations] = useState<any[]>([])
  const [statusUpdates, setStatusUpdates] = useState<any[]>([])

  const [expandedApplications, setExpandedApplications] = useState<Set<string>>(new Set())

  const toggleApplicationExpansion = (applicationId: string) => {
    const newExpanded = new Set(expandedApplications)
    if (newExpanded.has(applicationId)) {
      newExpanded.delete(applicationId)
    } else {
      newExpanded.add(applicationId)
    }
    setExpandedApplications(newExpanded)
  }

  const generateApplicationPDF = (application: Application) => {
    // Create a simple PDF content with watermark
    const pdfContent = `
    APPLICATION DOCUMENT
    
    University: ${application.university}
    Program: ${application.program}
    Country: ${application.country}
    Applied Date: ${application.appliedDate}
    Deadline: ${application.deadline}
    Status: ${application.status.toUpperCase()}
    Current Stage: ${application.currentStage}/10
    
    Application Fee: ${application.fees.currency} ${application.fees.application}
    Tuition Fee: ${application.fees.currency} ${application.fees.tuition}
    
    --- CAP WATERMARK ---
    Generated by MeritCap Education Platform
    Date: ${new Date().toLocaleDateString()}
  `

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${application.university}_${application.program}_Application.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStagesByStudyType = (country: string) => {
    if (country === "USA" || country === "UK" || country === "Canada") {
      return [
        { id: 1, name: "Application", completed: true },
        { id: 2, name: "Document Review", completed: true },
        { id: 3, name: "Interview", completed: false },
        { id: 4, name: "Decision", completed: false },
        { id: 5, name: "Enrollment", completed: false },
      ]
    } else if (country === "India") {
      return [
        { id: 1, name: "Application", completed: true },
        { id: 2, name: "Verification", completed: true },
        { id: 3, name: "Merit List", completed: false },
        { id: 4, name: "Admission", completed: false },
        { id: 5, name: "Confirmation", completed: false },
      ]
    } else {
      return [
        { id: 1, name: "Registration", completed: true },
        { id: 2, name: "Course Selection", completed: true },
        { id: 3, name: "Payment", completed: false },
        { id: 4, name: "Access", completed: false },
        { id: 5, name: "Completion", completed: false },
      ]
    }
  }

  // Handle URL routing for tabs
  useEffect(() => {
    const pathParts = window.location.pathname.split("/")

    // Handle new student-dashboard URLs
    if (pathParts[1] === "student-dashboard") {
      const mainTab = pathParts[2] || "overview"
      const subTab = pathParts[3] || ""
      setActiveTab(mainTab)
      setActiveSubTab(subTab)
    } else {
      // Handle legacy dashboard URLs with query parameters
      const tab = searchParams.get("tab")
      const subtab = searchParams.get("subtab")

      if (
        tab &&
        [
          "overview",
          "shortlist",
          "applications",
          "documents",
          "offers",
          "tasks",
          "community",
          "jobs",
          "loan",
          "more",
        ].includes(tab)
      ) {
        setActiveTab(tab)
        if (subtab) {
          setActiveSubTab(subtab)
        }
      }
    }
  }, [searchParams])

  const handleTabChange = (tabId: string, subTabId = "") => {
    setActiveTab(tabId)
    setActiveSubTab(subTabId)

    // Use new URL structure
    const newPath = subTabId ? `/student-dashboard/${tabId}/${subTabId}` : `/student-dashboard/${tabId}`

    window.history.pushState({}, "", newPath)
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("meritcap_user") || "null")

    if (userData) {
      setUser(userData)
    } else {
      // Fallback user data if no user is logged in
      const fallbackUser: UnifiedUserProfile = {
        id: "1",
        name: "Guest User",
        email: "guest@example.com",
        phone: "+1234567890",
        profileCompletion: 0,
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Not specified",
        university: "Not specified",
        course: "Not specified",
        year: "Not specified",
        gpa: "Not specified",
        interests: [],
        achievements: [],
        documents: [],
        applications: [],
        preferences: {
          notifications: true,
          emailUpdates: true,
          smsUpdates: false,
        },
      }
      setUser(fallbackUser)
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem("meritcap_documents", JSON.stringify(documents))
    }
  }, [documents])

  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem("meritcap_applications", JSON.stringify(applications))
    }
  }, [applications])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("meritcap_tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("meritcap_user") || "null")

    const updates = JSON.parse(localStorage.getItem("application_status_updates") || "[]")
    setStatusUpdates(
      updates.filter(
        (update: any) => new Date(update.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      ),
    )

    if (userData) {
      generateSmartRecommendations(userData)
    }
  }, [])

  const generateSmartRecommendations = (profile: any) => {
    const mockRecommendations = [
      {
        id: 1,
        university: "Stanford University",
        program: "MS Computer Science",
        matchScore: 95,
        reasons: ["Strong GPA match", "Research interests align", "Location preference"],
        tuition: "$55,000/year",
        deadline: "Dec 15, 2024",
        acceptance_rate: "4.3%",
      },
      {
        id: 2,
        university: "MIT",
        program: "MS Artificial Intelligence",
        matchScore: 92,
        reasons: ["Excellent test scores", "Relevant work experience", "Program fit"],
        tuition: "$58,000/year",
        deadline: "Dec 31, 2024",
        acceptance_rate: "6.7%",
      },
      {
        id: 3,
        university: "Carnegie Mellon",
        program: "MS Machine Learning",
        matchScore: 88,
        reasons: ["Technical background", "Research publications", "Industry connections"],
        tuition: "$52,000/year",
        deadline: "Jan 15, 2025",
        acceptance_rate: "8.2%",
      },
    ]

    setRecommendations(mockRecommendations)
  }

  const handleLogout = () => {
    localStorage.removeItem("meritcap_user")
    localStorage.removeItem("meritcap_documents")
    localStorage.removeItem("meritcap_applications")
    localStorage.removeItem("meritcap_tasks")
    router.push("/")
  }

  const handleProfileAction = (action: string) => {
    setProfileDropdownOpen(false)
    switch (action) {
      case "edit-profile":
        handleTabChange("profile")
        break
      case "change-password":
        // TODO: Implement change password functionality
        console.log("Change password clicked")
        break
      case "account-settings":
        // TODO: Implement account settings
        console.log("Account settings clicked")
        break
      case "privacy-settings":
        // TODO: Implement privacy settings
        console.log("Privacy settings clicked")
        break
      case "logout":
        handleLogout()
        break
    }
  }

  const sidebarItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      color: "text-blue-600",
      subtabs: [],
    },
    {
      id: "shortlist",
      label: "Shortlist",
      icon: Heart,
      color: "text-red-600",
      subtabs: [
        { id: "overall", label: "Overall" },
        { id: "my-saved", label: "My Saved" },
        { id: "expert-shortlist", label: "Expert Shortlist" },
        { id: "comparison", label: "Comparison Tool" },
      ],
    },
    {
      id: "applications",
      label: "Applications",
      icon: Send,
      color: "text-indigo-600",
      subtabs: [
        { id: "in-progress", label: "In Progress" },
        { id: "submitted", label: "Submitted" },
        { id: "decisions", label: "Decisions" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      icon: Upload,
      color: "text-blue-600",
      subtabs: [],
    },
    {
      id: "offers",
      label: "Offers",
      icon: Gift,
      color: "text-blue-600",
      subtabs: [
        { id: "all-offers", label: "All Offers" },
        { id: "action-required", label: "Action Required" },
        { id: "accepted", label: "Accepted" },
        { id: "closed", label: "Closed" },
      ],
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      color: "text-purple-500",
      subtabs: [],
    },
    {
      id: "community",
      label: "Community",
      icon: MessageCircle,
      color: "text-orange-600",
      subtabs: [],
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      color: "text-gray-600",
      subtabs: [],
    },
    {
      id: "loan",
      label: "Loan",
      icon: CreditCard,
      color: "text-yellow-600",
      subtabs: [],
    },
    {
      id: "more",
      label: "More",
      icon: MoreHorizontal,
      color: "text-gray-500",
      subtabs: [],
    },
  ]

  // Search functions
  const handleSearch = () => {
    let results = sampleUniversities

    if (searchQuery.trim()) {
      results = results.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (searchCountry) {
      results = results.filter((uni) => uni.country.toLowerCase() === searchCountry.toLowerCase())
    }

    if (searchLevel) {
      results = results.filter((uni) => uni.program.toLowerCase().includes(searchLevel.toLowerCase()))
    }

    setSearchResults(results)
    setShowSearchResults(true)
  }

  const addToShortlist = (university: SearchResult) => {
    const newUni: University = {
      id: Date.now(),
      name: university.name,
      program: university.program,
      location: university.location,
      country: university.country,
      ranking: university.ranking,
      tuition: university.tuition,
      deadline: university.deadline,
      type: "wishlist",
      acceptanceRate: university.acceptanceRate,
      duration: "2 years",
      matchPercentage: university.matchPercentage,
      scholarships: university.scholarships,
      selected: false,
      logo: university.logo,
      rating: university.rating,
    }

    setStudentWishlist([...studentWishlist, newUni])
    showToast("Added to Shortlist", `${university.name} has been added to your shortlist`)
  }

  // Chat functions
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "text",
    }

    setChatMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage)
      setChatMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("university") || lowerMessage.includes("college")) {
      return {
        id: Date.now() + 1,
        text: "I can help you find the perfect universities! Based on your profile, I recommend focusing on universities in the USA and Canada. Would you like me to show you some personalized recommendations?",
        sender: "ai",
        timestamp: new Date().toISOString(),
        type: "suggestion",
        actions: [
          { label: "Show Recommendations", action: "show_recommendations" },
          { label: "Filter by Country", action: "filter_country" },
        ],
      }
    }

    if (lowerMessage.includes("application") || lowerMessage.includes("apply")) {
      return {
        id: Date.now() + 1,
        text: `I see you have ${applications.length} active applications. ${applications.length > 0 ? `Your latest application to ${applications[applications.length - 1]?.university} is at stage ${applications[applications.length - 1]?.currentStage}.` : ""} Would you like me to help you with next steps?`,
        sender: "ai",
        timestamp: new Date().toISOString(),
        type: "suggestion",
        actions: [
          { label: "View Applications", action: "view_applications" },
          { label: "Next Steps", action: "next_steps" },
        ],
      }
    }

    if (lowerMessage.includes("document")) {
      return {
        id: Date.now() + 1,
        text: "I can help with your documents! You have 1 document pending verification and 1 rejected document that needs revision. Your Statement of Purpose needs to be resubmitted. Would you like help with that?",
        sender: "ai",
        timestamp: new Date().toISOString(),
        type: "suggestion",
        actions: [
          { label: "View Documents", action: "view_documents" },
          { label: "SOP Help", action: "sop_help" },
        ],
      }
    }

    return {
      id: Date.now() + 1,
      text: "Thanks for your message! I'm here to help with your study abroad journey. I can assist with university recommendations, application tracking, document management, and much more. What would you like to know?",
      sender: "ai",
      timestamp: new Date().toISOString(),
      type: "text",
      actions: [
        { label: "Find Universities", action: "find_universities" },
        { label: "Check Applications", action: "check_applications" },
        { label: "Document Help", action: "document_help" },
      ],
    }
  }

  const handleChatAction = (action: string) => {
    switch (action) {
      case "find_universities":
      case "show_recommendations":
        handleTabChange("shortlist")
        setChatOpen(false)
        showToast("Navigated to University Shortlist", "Find your perfect university match!")
        break
      case "check_applications":
      case "view_applications":
        handleTabChange("applications")
        setChatOpen(false)
        showToast("Navigated to Applications", "Track your application progress")
        break
      case "document_help":
      case "view_documents":
        handleTabChange("documents")
        setChatOpen(false)
        showToast("Navigated to Documents", "Manage your application documents")
        break
      default:
        showToast("Feature Coming Soon", "This feature will be available soon!")
    }
  }

  // Document functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      setDocumentError("File size exceeds 5MB limit. Please choose a smaller file.")
      return
    }

    setDocumentError("")
    setNewDocumentFile(file)
  }

  const addDocument = () => {
    if (!newDocumentName.trim()) {
      setDocumentError("Please enter document name")
      return
    }

    if (!newDocumentCategory) {
      setDocumentError("Please select document category")
      return
    }

    if (!newDocumentFile) {
      setDocumentError("Please select a file to upload")
      return
    }

    const newDoc: Document = {
      id: Date.now(),
      name: newDocumentName.trim(),
      status: "uploaded",
      required: false,
      uploadDate: new Date().toISOString().split("T")[0],
      size: `${(newDocumentFile.size / (1024 * 1024)).toFixed(1)} MB`,
      type: newDocumentFile.type.includes("pdf")
        ? "PDF"
        : newDocumentFile.type.includes("image")
          ? "Image"
          : "Document",
      category: newDocumentCategory,
      comments: newDocumentRemarks.trim() || undefined,
      file: newDocumentFile,
    }

    setDocuments([...documents, newDoc])

    // Reset form
    setNewDocumentName("")
    setNewDocumentCategory("")
    setNewDocumentRemarks("")
    setNewDocumentFile(null)
    setDocumentError("")
    setAddDocumentOpen(false)

    showToast("Document Added", `${newDocumentName} has been uploaded successfully`)
  }

  const updateDocumentStatus = (id: number, status: Document["status"]) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? {
            ...doc,
            status,
            uploadDate: status === "uploaded" ? new Date().toISOString().split("T")[0] : doc.uploadDate,
          }
          : doc,
      ),
    )
    showToast("Document Updated", "Document status has been updated")
  }

  const deleteDocument = (id: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter((doc) => doc.id !== id))
      showToast("Document Deleted", "Document has been removed")
    }
  }

  const getDocumentIcon = (type?: string) => {
    if (!type) return FileText
    if (type.toLowerCase().includes("pdf")) return FileText
    if (type.toLowerCase().includes("image")) return FileImage
    if (type.toLowerCase().includes("sheet") || type.toLowerCase().includes("excel")) return FileSpreadsheet
    return FileText
  }

  // Shortlist functions
  const toggleUniversitySelection = (universityId: number) => {
    const updatedExpert = expertSuggestions.map((uni) =>
      uni.id === universityId ? { ...uni, selected: !uni.selected } : uni,
    )
    const updatedWishlist = studentWishlist.map((uni) =>
      uni.id === universityId ? { ...uni, selected: !uni.selected } : uni,
    )

    setExpertSuggestions(updatedExpert)
    setStudentWishlist(updatedWishlist)

    const selectedCount = [...updatedExpert, ...updatedWishlist].filter((uni) => uni.selected).length
    if (selectedCount > 2) {
      showToast("Selection Limit", "You can compare maximum 2 universities at a time")
      return
    }
  }

  const compareSelectedUniversities = () => {
    const selected = [...expertSuggestions, ...studentWishlist].filter((uni) => uni.selected)
    if (selected.length < 2) {
      showToast("Select Universities", "Please select at least 2 universities to compare")
      return
    }
    showToast("Comparison Feature", "University comparison feature will be available soon!")
  }

  const toggleWishlist = (universityId: number) => {
    const university = [...expertSuggestions, ...studentWishlist].find((uni) => uni.id === universityId)
    if (!university) return

    if (university.type === "expert") {
      // Move from expert to wishlist
      setExpertSuggestions(expertSuggestions.filter((uni) => uni.id !== universityId))
      setStudentWishlist([...studentWishlist, { ...university, type: "wishlist" }])
    } else {
      // Remove from wishlist
      setStudentWishlist(studentWishlist.filter((uni) => uni.id !== universityId))
    }

    showToast(
      university.type === "expert" ? "Added to Wishlist" : "Removed from Wishlist",
      university.type === "expert"
        ? `${university.name} has been added to your wishlist`
        : `${university.name} has been removed from your wishlist`,
    )
  }

  const checkRequiredDocuments = (universityId: number): boolean => {
    const requiredDocs = documents.filter((doc) => doc.required && doc.status === "verified")
    const totalRequired = documents.filter((doc) => doc.required).length
    return requiredDocs.length === totalRequired
  }

  // Update the applyToUniversity function to show document status check
  const applyToUniversity = (universityId: number) => {
    const university = [...expertSuggestions, ...studentWishlist].find((uni) => uni.id === universityId)
    if (!university) return

    // Check document status
    const requiredDocs = [
      { name: "Academic Transcripts", uploaded: true },
      { name: "Degree Certificate", uploaded: true },
      { name: "Statement of Purpose", uploaded: false },
      { name: "Letters of Recommendation", uploaded: false },
      { name: "Passport Copy", uploaded: true },
    ]

    const missingDocs = requiredDocs.filter((doc) => !doc.uploaded)

    if (missingDocs.length > 0) {
      const missingList = missingDocs.map((doc) => `✗ ${doc.name}`).join("\n")
      const uploadedList = requiredDocs
        .filter((doc) => doc.uploaded)
        .map((doc) => `✓ ${doc.name}`)
        .join("\n")

      const confirmMessage = `Document Status Check:\n\n✓ RECEIVED:\n${uploadedList}\n\n✗ MISSING:\n${missingList}\n\nNote: If university or embassy requests additional documents during application process, we will notify you immediately.\n\nWould you like to upload missing documents now?`

      if (confirm(confirmMessage)) {
        // Redirect to document upload
        router.push(`/dashboard/applications/new-${universityId}/documents?setup=true`)
        return
      }
    }

    // Rest of the existing application logic remains the same...
    const applicationStages = [
      {
        id: 1,
        name: "Application Started",
        icon: "FileText",
        completed: true,
        date: new Date().toISOString().split("T")[0],
      },
      { id: 2, name: "Under Review", icon: "Eye", completed: false },
      { id: 3, name: "Application Accepted", icon: "CheckCircle", completed: false },
      { id: 4, name: "Offer Letter Released", icon: "Gift", completed: false },
      { id: 5, name: "Document Verified", icon: "FileCheck", completed: false },
      { id: 6, name: "Interview Process", icon: "Video", completed: false },
      { id: 7, name: "Selection Confirmation", icon: "UserCheck", completed: false },
      { id: 8, name: "Fee Payment", icon: "CreditCard", completed: false },
      { id: 9, name: "Enrollment Closed", icon: "Award", completed: false },
      { id: 10, name: "Visa Process", icon: "Plane", completed: false },
    ]

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      university: university.name,
      program: university.program,
      country: university.country,
      currentStage: 1,
      stages: applicationStages,
      deadline: university.deadline,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "in-progress",
      documents: [],
      fees: { application: 100, tuition: Number.parseInt(university.tuition.replace(/[^0-9]/g, "")), currency: "USD" },
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: "Application Submitted",
          description: "Application has been submitted to university and is under verification",
          date: new Date().toISOString().split("T")[0],
          type: "success",
        },
      ],
    }

    setApplications([...applications, newApplication])
    showToast(
      "Application Submitted",
      `Your application to ${university.name} has been submitted successfully. Document status tracked - we will notify you of any additional requirements.`,
    )
  }

  // Task functions
  const updateTaskStatus = (taskId: number, status: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            status,
          }
          : task,
      ),
    )
    showToast("Task Updated", `Task has been marked as ${status}`)
  }

  const addTask = () => {
    const title = prompt("Enter task title:")
    if (title?.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: title.trim(),
        assignedBy: "You",
        assignedTo: "student",
        priority: "Medium",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
        category: "General",
      }
      setTasks([...tasks, newTask])
      showToast("Task Added", "New task has been created")
    }
  }

  // Profile functions
  const saveProfile = () => {
    if (user) {
      localStorage.setItem("meritcap_user", JSON.stringify(user))
      setEditingProfile(false)
      showToast("Profile Saved", "Your profile has been updated successfully")
    }
  }

  const getSubtitleText = () => {
    return "Manage your Study Journey"
  }

  const handleApplyNowFn = (universityId: string, courseId: string) => {
    const university = sampleUniversities.find((u) => u.id.toString() === universityId)
    if (university) {
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        university: university.name,
        program: university.program,
        country: university.country,
        currentStage: 1,
        stages: [],
        deadline: new Date().toLocaleDateString(),
        appliedDate: new Date().toLocaleDateString(),
        status: "in-progress",
        documents: [],
        fees: {
          application: 100,
          tuition: Number.parseInt(university.tuition.replace(/[^0-9]/g, "")),
          currency: university.tuition.includes("£") ? "GBP" : "USD",
        },
        timeline: [],
        universityId,
        courseId,
      }

      setApplications((prev) => [...prev, newApplication])

      // Navigate to application form
      router.push(`/apply/${universityId}/${courseId}`)
    }
  }

  const renderRecommendationCard = (university: any) => (
    <div
      key={university.id}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{university.name}</h3>
          <p className="text-gray-600 mb-2">{university.program}</p>
          <p className="text-sm text-gray-500">{university.location}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-lg font-bold text-gray-900">{university.match}% match</span>
          </div>
          <div className="w-20 bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${university.match}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">Acceptance: {university.acceptance}%</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {university.tags.map((tag: string, index: number) => (
          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>
          {university.tuition} • Deadline: {university.deadline}
        </span>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
          Learn More
        </Button>
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => handleApplyNowFn(university.name.toLowerCase().replace(/\s+/g, "-"), "cs-ms")}
        >
          Apply Now
        </Button>
      </div>
    </div>
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Welcome back, {user?.name || "Student"}! 🎉</h2>
                    <p className="text-blue-100">Ready to continue your educational journey?</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Profile Completion</span>
                  <span className="text-sm font-semibold">85%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <p className="text-xs text-blue-100 mt-1">15% remaining to complete your profile</p>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Find Your Perfect University</h3>
              </div>
              <p className="text-gray-600 mb-4">Search and discover universities that match your preferences</p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search courses, universities, locations..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="abroad">Study Abroad</option>
                    <option value="india">Study India</option>
                    <option value="online">Study Online</option>
                  </select>

                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Country</option>
                  </select>

                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Level</option>
                  </select>

                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Duration</option>
                  </select>

                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Fees</option>
                  </select>
                </div>

                <div className="flex justify-center">
                  <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-8">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-white border-l-4 border-l-blue-500 cursor-pointer hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Active Applications</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {applications.filter((app) => app.status === "in-progress").length}
                      </p>
                      <p className="text-xs text-blue-500">
                        {applications.filter((app) => app.status === "in-progress").length} in progress
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <Send className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white border-l-4 border-l-blue-500 cursor-pointer hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Offers Received</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                      <p className="text-xs text-green-600 mt-1">↗ 2 pending response</p>
                    </div>
                    <div className="text-blue-500">
                      <Gift className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white border-l-4 border-l-blue-500 cursor-pointer hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Universities Shortlisted</p>
                      <p className="text-2xl font-bold text-blue-900">4</p>
                      <p className="text-xs text-blue-500">2 expert picks</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white border-l-4 border-l-blue-500 cursor-pointer hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Pending Tasks</p>
                      <p className="text-2xl font-bold text-blue-900">2</p>
                      <p className="text-xs text-blue-500">1 high priority</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <CheckSquare className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Updates */}
            {statusUpdates.length > 0 && (
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span>Recent Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statusUpdates.slice(0, 3).map((update, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Application status updated to <span className="text-blue-600">{update.status}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {update.collegeName} • {new Date(update.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Smart Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span>AI-Powered Recommendations</span>
                </CardTitle>
                <p className="text-sm text-gray-600">Universities matched to your profile</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{rec.university}</h4>
                          <p className="text-sm text-gray-600">{rec.program}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{rec.matchScore}% match</span>
                          </div>
                          <p className="text-xs text-gray-500">Acceptance: {rec.acceptance_rate}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {rec.reasons.map((reason: string, idx: number) => (
                          <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {reason}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{rec.tuition}</span> • Deadline: {rec.deadline}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Learn More
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Heart className="w-4 h-4 mr-1" />
                            Shortlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "shortlist":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <div className="flex space-x-1">
                {sidebarItems
                  .find((item) => item.id === "shortlist")
                  ?.subtabs.map((subtab) => (
                    <button
                      key={subtab.id}
                      onClick={() => handleTabChange("shortlist", subtab.id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeSubTab === subtab.id || (activeSubTab === "" && subtab.id === "overall")
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                      {subtab.label}
                    </button>
                  ))}
              </div>
            </div>

            <div className="space-y-6">
              {(activeSubTab === "overall" || activeSubTab === "") && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">AI-Powered Recommendations</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Universities matched to your profile</p>

                  <div className="grid gap-6">{shortlistData.overall.map(renderRecommendationCard)}</div>
                </div>
              )}

              {activeSubTab === "my-saved" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Heart className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">My Saved Universities</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Universities you've saved for later</p>

                  <div className="grid gap-6">{shortlistData["my-saved"].map(renderRecommendationCard)}</div>
                </div>
              )}

              {activeSubTab === "expert-shortlist" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Expert Shortlist</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Top recommendations from our education experts</p>

                  <div className="grid gap-6">{shortlistData["expert-shortlist"].map(renderRecommendationCard)}</div>
                </div>
              )}

              {activeSubTab === "comparison" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Comparison Tool</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Compare universities side by side</p>

                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Universities to Compare</h3>
                    <p className="text-gray-600 mb-4">Add universities to your shortlist to start comparing them</p>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setActiveSubTab("overall")}>
                      Browse Universities
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "applications":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <div className="flex space-x-1">
                {sidebarItems
                  .find((item) => item.id === "applications")
                  ?.subtabs.map((subtab) => (
                    <button
                      key={subtab.id}
                      onClick={() => handleTabChange("applications", subtab.id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeSubTab === subtab.id || (activeSubTab === "" && subtab.id === "in-progress")
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                      {subtab.label}
                    </button>
                  ))}
              </div>
            </div>

            <div className="space-y-6">
              {(activeSubTab === "in-progress" || activeSubTab === "") && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications In Progress</h3>
                  {applications.filter((app) => app.status === "in-progress").length === 0 ? (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Send className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Applications in Progress</h4>
                        <p className="text-gray-600 mb-6">
                          Start your application journey by selecting universities from your shortlist
                        </p>
                        <Button onClick={() => handleTabChange("shortlist")} className="bg-blue-600 hover:bg-blue-700">
                          View Shortlist
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {applications
                        .filter((app) => app.status === "in-progress")
                        .map((application) => {
                          const isExpanded = expandedApplications.has(application.id)
                          const stages = getStagesByStudyType(application.country)
                          const completedStages = stages.filter((stage) => stage.completed).length

                          return (
                            <Card
                              key={application.id}
                              className="border-0 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500"
                            >
                              <CardContent className="p-4">
                                {/* Compact Header */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 flex-1">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <GraduationCap className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-900 text-sm">{application.university}</h4>
                                      <p className="text-xs text-gray-600">{application.program}</p>
                                      <p className="text-xs text-gray-500">
                                        {application.country} • Applied: {application.appliedDate}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                      {completedStages}/5 Stages
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => generateApplicationPDF(application)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => generateApplicationPDF(application)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      PDF
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleApplicationExpansion(application.id)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      {isExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>

                                <div className="mt-4 mb-2">
                                  <div className="relative flex items-center justify-between mb-2">
                                    <div className="absolute top-5 left-0 right-0 h-1 flex items-center px-5">
                                      <div className="w-full h-full bg-gray-200 rounded-full relative">
                                        <div
                                          className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                                          style={{ width: `${(completedStages - 1) * (100 / (stages.length - 1))}%` }}
                                        />
                                      </div>
                                    </div>

                                    {stages.map((stage, index) => (
                                      <div key={stage.id} className="flex flex-col items-center z-10 px-2">
                                        <div
                                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${stage.completed ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                                            }`}
                                        >
                                          {stage.completed ? <CheckCircle className="w-4 h-4" /> : stage.id}
                                        </div>
                                        <span className="text-xs text-gray-600 mt-2 text-center w-20 leading-tight">
                                          {stage.name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Deadline:</span>
                                        <span className="font-medium ml-2">{application.deadline}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Application Fee:</span>
                                        <span className="font-medium ml-2">
                                          {application.fees.currency} {application.fees.application}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Tuition Fee:</span>
                                        <span className="font-medium ml-2">
                                          {application.fees.currency} {application.fees.tuition}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Status:</span>
                                        <span className="font-medium ml-2 capitalize">{application.status}</span>
                                      </div>
                                    </div>

                                    <div className="flex space-x-2">
                                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        Continue Application
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        Contact Counselor
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )
                        })}
                    </div>
                  )}
                </div>
              )}

              {activeSubTab === "submitted" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Applications</h3>
                  {applications.filter((app) => app.status === "submitted").length === 0 ? (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Submitted Applications</h4>
                        <p className="text-gray-600 mb-6">Applications you've completed will appear here</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {applications
                        .filter((app) => app.status === "submitted")
                        .map((application) => {
                          const isExpanded = expandedApplications.has(application.id)
                          const stages = getStagesByStudyType(application.country)

                          return (
                            <Card
                              key={application.id}
                              className="border-0 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 flex-1">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                      <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-900 text-sm">{application.university}</h4>
                                      <p className="text-xs text-gray-600">{application.program}</p>
                                      <p className="text-xs text-gray-500">
                                        {application.country} • Submitted: {application.appliedDate}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                      Submitted
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => generateApplicationPDF(application)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => generateApplicationPDF(application)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      PDF
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleApplicationExpansion(application.id)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      {isExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>

                                {isExpanded && (
                                  <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Deadline:</span>
                                        <span className="font-medium ml-2">{application.deadline}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Application Fee:</span>
                                        <span className="font-medium ml-2">
                                          {application.fees.currency} {application.fees.application}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )
                        })}
                    </div>
                  )}
                </div>
              )}

              {activeSubTab === "decisions" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Decisions</h3>
                  {applications.filter((app) => app.status === "accepted" || app.status === "rejected").length === 0 ? (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Decisions Yet</h4>
                        <p className="text-gray-600 mb-6">
                          University decisions will appear here once they're available
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {applications
                        .filter((app) => app.status === "accepted" || app.status === "rejected")
                        .map((application) => {
                          const isExpanded = expandedApplications.has(application.id)
                          const isAccepted = application.status === "accepted"

                          return (
                            <Card
                              key={application.id}
                              className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${isAccepted ? "border-l-green-500" : "border-l-red-500"
                                }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 flex-1">
                                    <div
                                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${isAccepted ? "bg-green-100" : "bg-red-100"
                                        }`}
                                    >
                                      {isAccepted ? (
                                        <Award className="w-6 h-6 text-green-600" />
                                      ) : (
                                        <X className="w-6 h-6 text-red-600" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-900 text-sm">{application.university}</h4>
                                      <p className="text-xs text-gray-600">{application.program}</p>
                                      <p className="text-xs text-gray-500">
                                        {application.country} • Decision Available
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${isAccepted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                      {isAccepted ? "Accepted" : "Rejected"}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => generateApplicationPDF(application)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => generateApplicationPDF(application)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      PDF
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleApplicationExpansion(application.id)}
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      {isExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>

                                {isExpanded && (
                                  <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Decision Date:</span>
                                        <span className="font-medium ml-2">{application.appliedDate}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Next Steps:</span>
                                        <span className="font-medium ml-2">
                                          {isAccepted ? "Accept Offer" : "Apply Elsewhere"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-900">Documents Upload Centre</h2>
                </div>
                <Button onClick={() => setAddDocumentOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Upload Document</span>
                  <span className="sm:hidden">Upload</span>
                </Button>
              </div>
            </div>

            {/* Document List with Edit, Download, Preview actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {documents.map((document) => {
                    const IconComponent = getDocumentIcon(document.type)
                    return (
                      <div
                        key={document.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow space-y-3 sm:space-y-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${document.status === "verified"
                              ? "bg-green-100"
                              : document.status === "pending"
                                ? "bg-yellow-100"
                                : document.status === "rejected"
                                  ? "bg-red-100"
                                  : "bg-blue-100"
                              }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 ${document.status === "verified"
                                ? "text-green-600"
                                : document.status === "pending"
                                  ? "text-yellow-600"
                                  : document.status === "rejected"
                                    ? "text-red-600"
                                    : "text-blue-600"
                                }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{document.name}</h4>
                            <p className="text-sm text-gray-600">{document.category}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${document.status === "verified"
                                  ? "bg-green-100 text-green-800"
                                  : document.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : document.status === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                              </span>
                              {document.size && <span className="text-xs text-gray-500">{document.size}</span>}
                              {document.uploadDate && (
                                <span className="text-xs text-gray-500">Uploaded: {document.uploadDate}</span>
                              )}
                            </div>
                            {document.comments && <p className="text-xs text-gray-600 mt-1">{document.comments}</p>}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent flex-1 sm:flex-none"
                          >
                            <FileText className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent flex-1 sm:flex-none"
                          >
                            <Download className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline ml-1">Download</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent flex-1 sm:flex-none"
                          >
                            <Eye className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline ml-1">Preview</span>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Upload Document Modal */}
            {addDocumentOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4 text-blue-900">Upload New Document</h3>

                  {documentError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4">
                      {documentError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                      <Input
                        value={newDocumentName}
                        onChange={(e) => setNewDocumentName(e.target.value)}
                        placeholder="Enter document name"
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={newDocumentCategory}
                        onChange={(e) => setNewDocumentCategory(e.target.value)}
                        className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select category</option>
                        <option value="Academic">Academic</option>
                        <option value="Personal">Personal</option>
                        <option value="Test Scores">Test Scores</option>
                        <option value="Application">Application</option>
                        <option value="Financial">Financial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                      <input
                        type="file"
                        onChange={(e) => setNewDocumentFile(e.target.files?.[0] || null)}
                        className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                      <textarea
                        value={newDocumentRemarks}
                        onChange={(e) => setNewDocumentRemarks(e.target.value)}
                        placeholder="Add any remarks or notes"
                        className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button onClick={addDocument} className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                      Upload Document
                    </Button>
                    <Button variant="outline" onClick={() => setAddDocumentOpen(false)} className="flex-1 sm:flex-none">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "offers":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <div className="flex space-x-1">
                {sidebarItems
                  .find((item) => item.id === "offers")
                  ?.subtabs.map((subtab) => (
                    <button
                      key={subtab.id}
                      onClick={() => handleTabChange("offers", subtab.id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeSubTab === subtab.id || (activeSubTab === "" && subtab.id === "all-offers")
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                      {subtab.label}
                    </button>
                  ))}
              </div>
            </div>

            {/* Offers Content based on selected tab */}
            <div className="space-y-6">
              {(activeSubTab === "all-offers" || activeSubTab === "") && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Gift className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">All University Offers</h2>
                  </div>

                  <div className="grid gap-4">
                    {offers.map((offer) => (
                      <div
                        key={offer.id}
                        className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        {/*  Enhanced offer card layout with logo, better information display, and proper date positioning */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* University Logo */}
                            <div className="flex-shrink-0">
                              <img
                                src={offer.logo || "/placeholder.svg?height=40&width=40&text=UNI"}
                                alt={`${offer.university} logo`}
                                className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                              />
                            </div>

                            {/* University and Program Info */}
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">{offer.university}</h3>
                              <p className="text-gray-600 font-medium">{offer.program}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span>{offer.location || offer.country}</span>
                                {offer.intake && (
                                  <>
                                    <span>•</span>
                                    <span>{offer.intake}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Dates and Status */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm text-gray-500 mb-2">
                              <div>Received: {new Date(offer.receivedDate).toLocaleDateString()}</div>
                              <div className="text-red-600 font-medium">
                                Deadline: {new Date(offer.responseDeadline).toLocaleDateString()}
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${offer.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : offer.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-600">Offer Type:</span>
                            <span className="font-medium ml-2">{offer.offerType}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tuition Fee:</span>
                            <span className="font-medium ml-2">{offer.tuitionFee}</span>
                          </div>
                          {offer.scholarshipAmount && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Scholarship:</span>
                              <span className="font-medium ml-2 text-green-600">{offer.scholarshipAmount}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                          >
                            Reject
                          </Button>
                          <Button
                            variant="outline"
                            className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                          >
                            On Hold
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === "action-required" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Clock className="w-5 h-5 text-red-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Action Required</h2>
                  </div>

                  <div className="grid gap-4">
                    {offers
                      .filter((offer) => offer.status === "pending")
                      .map((offer) => (
                        //  Changed background from pink to white as requested
                        <div key={offer.id} className="bg-white border border-red-200 shadow-sm rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                <img
                                  src={offer.logo || "/placeholder.svg?height=40&width=40&text=UNI"}
                                  alt={`${offer.university} logo`}
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{offer.university}</h3>
                                <p className="text-gray-600 font-medium">{offer.program}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{offer.location || offer.country}</span>
                                  {offer.intake && (
                                    <>
                                      <span>•</span>
                                      <span>{offer.intake}</span>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-red-600 font-medium mt-2">
                                  ⏰ Deadline: {new Date(offer.responseDeadline).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept Now
                            </Button>
                            <Button
                              variant="outline"
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Review Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeSubTab === "accepted" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Accepted Offers</h2>
                  </div>

                  <div className="grid gap-4">
                    {offers
                      .filter((offer) => offer.status === "accepted")
                      .map((offer) => (
                        <div key={offer.id} className="bg-green-50 border border-green-200 shadow-sm rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                <img
                                  src={offer.logo || "/placeholder.svg?height=40&width=40&text=UNI"}
                                  alt={`${offer.university} logo`}
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{offer.university}</h3>
                                <p className="text-gray-600 font-medium">{offer.program}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{offer.location || offer.country}</span>
                                  {offer.intake && (
                                    <>
                                      <span>•</span>
                                      <span>{offer.intake}</span>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-green-600 font-medium mt-2">✅ Accepted</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Confirmation
                            </Button>
                            <Button
                              variant="outline"
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                            >
                              Next Steps
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeSubTab === "closed" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <X className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Closed Offers</h2>
                  </div>

                  <div className="grid gap-4">
                    {offers
                      .filter((offer) => ["declined", "expired", "rejected"].includes(offer.status))
                      .map((offer) => (
                        <div key={offer.id} className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                <img
                                  src={offer.logo || "/placeholder.svg?height=40&width=40&text=UNI"}
                                  alt={`${offer.university} logo`}
                                  className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{offer.university}</h3>
                                <p className="text-gray-600 font-medium">{offer.program}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{offer.location || offer.country}</span>
                                  {offer.intake && (
                                    <>
                                      <span>•</span>
                                      <span>{offer.intake}</span>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                  Status: {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "tasks":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Task Management</h2>
                    <p className="text-blue-100">Stay on top of your educational journey</p>
                  </div>
                </div>
                <Button onClick={addTask} className="bg-white text-blue-600 hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="text-2xl font-bold">
                    {tasks.filter((t) => t.priority === "High" && t.status === "pending").length}
                  </div>
                  <div className="text-sm text-blue-100">Urgent</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="text-2xl font-bold">
                    {
                      tasks.filter((t) => {
                        const dueDate = new Date(t.dueDate)
                        const today = new Date()
                        return dueDate.toDateString() === today.toDateString() && t.status === "pending"
                      }).length
                    }
                  </div>
                  <div className="text-sm text-blue-100">Due Today</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{tasks.filter((t) => t.status === "pending").length}</div>
                  <div className="text-sm text-blue-100">Pending</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{tasks.filter((t) => t.status === "completed").length}</div>
                  <div className="text-sm text-blue-100">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <div className="flex space-x-1 overflow-x-auto">
                {[
                  { id: "all", label: "All Tasks", count: tasks.length },
                  {
                    id: "urgent",
                    label: "Urgent",
                    count: tasks.filter((t) => t.priority === "High" && t.status === "pending").length,
                  },
                  {
                    id: "college",
                    label: "College",
                    count: tasks.filter((t) => t.assignedBy.includes("University") || t.assignedBy.includes("College"))
                      .length,
                  },
                  {
                    id: "platform",
                    label: "Platform",
                    count: tasks.filter((t) => t.assignedBy.includes("Backend Team") || t.assignedBy.includes("MeritCap"))
                      .length,
                  },
                  { id: "personal", label: "Personal", count: tasks.filter((t) => t.assignedBy === "You").length },
                  {
                    id: "emergency",
                    label: "Emergency",
                    count: tasks.filter((t) => t.category.includes("Application") || t.category.includes("Deadline"))
                      .length,
                  },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveSubTab(filter.id)}
                    className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeSubTab === filter.id || (activeSubTab === "" && filter.id === "all")
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeSubTab === filter.id || (activeSubTab === "" && filter.id === "all")
                          ? "bg-white bg-opacity-20 text-white"
                          : "bg-blue-100 text-blue-600"
                          }`}
                      >
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {(() => {
                let filteredTasks = tasks

                switch (activeSubTab) {
                  case "urgent":
                    filteredTasks = tasks.filter((t) => t.priority === "High" && t.status === "pending")
                    break
                  case "college":
                    filteredTasks = tasks.filter(
                      (t) => t.assignedBy.includes("University") || t.assignedBy.includes("College"),
                    )
                    break
                  case "platform":
                    filteredTasks = tasks.filter(
                      (t) => t.assignedBy.includes("Backend Team") || t.assignedBy.includes("MeritCap"),
                    )
                    break
                  case "personal":
                    filteredTasks = tasks.filter((t) => t.assignedBy === "You")
                    break
                  case "emergency":
                    filteredTasks = tasks.filter(
                      (t) => t.category.includes("Application") || t.category.includes("Deadline"),
                    )
                    break
                  default:
                    filteredTasks = tasks
                }

                if (filteredTasks.length === 0) {
                  return (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckSquare className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Tasks Found</h4>
                        <p className="text-gray-600 mb-6">
                          {activeSubTab === "all" || activeSubTab === ""
                            ? "You're all caught up! Add a new task to get started."
                            : `No ${activeSubTab} tasks at the moment.`}
                        </p>
                        <Button onClick={addTask} className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Task
                        </Button>
                      </CardContent>
                    </Card>
                  )
                }

                return filteredTasks.map((task) => {
                  const dueDate = new Date(task.dueDate)
                  const today = new Date()
                  const isOverdue = dueDate < today && task.status === "pending"
                  const isDueToday = dueDate.toDateString() === today.toDateString()
                  const isDueSoon = dueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) && dueDate > today

                  const getPriorityColor = () => {
                    if (isOverdue) return "border-l-red-500 bg-red-50"
                    if (task.priority === "High" || isDueToday) return "border-l-red-500 bg-red-50"
                    if (task.priority === "Medium" || isDueSoon) return "border-l-yellow-500 bg-yellow-50"
                    return "border-l-blue-500 bg-white"
                  }

                  const getTaskIcon = () => {
                    if (task.assignedBy.includes("University") || task.assignedBy.includes("College")) {
                      return <GraduationCap className="w-5 h-5 text-blue-600" />
                    }
                    if (task.assignedBy.includes("Backend Team") || task.assignedBy.includes("MeritCap")) {
                      return <Settings className="w-5 h-5 text-purple-600" />
                    }
                    if (task.assignedBy === "You") {
                      return <User className="w-5 h-5 text-green-600" />
                    }
                    if (task.category.includes("Application") || task.category.includes("Deadline")) {
                      return <AlertTriangle className="w-5 h-5 text-red-600" />
                    }
                    return <CheckSquare className="w-5 h-5 text-blue-600" />
                  }

                  return (
                    <Card
                      key={task.id}
                      className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${getPriorityColor()}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {getTaskIcon()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
                                  {task.description && <p className="text-xs text-gray-600 mt-1">{task.description}</p>}
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    <span>Assigned by: {task.assignedBy}</span>
                                    <span>•</span>
                                    <span>Category: {task.category}</span>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                  <div className="text-xs text-gray-500 mb-1">Due: {dueDate.toLocaleDateString()}</div>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === "High"
                                        ? "bg-red-100 text-red-800"
                                        : task.priority === "Medium"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                      {task.priority}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : isOverdue
                                          ? "bg-red-100 text-red-800"
                                          : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                      {task.status === "completed" ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 mt-3">
                                {task.status === "pending" && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateTaskStatus(task.id, "completed")}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Complete
                                  </Button>
                                )}
                                {task.status === "completed" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateTaskStatus(task.id, "pending")}
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                  >
                                    <RotateCcw className="w-3 h-3 mr-1" />
                                    Reopen
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                                >
                                  <Clock className="w-3 h-3 mr-1" />
                                  Snooze
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              })()}
            </div>
          </div>
        )

      // ... existing code ...
      default:
        return <div>Content for {activeTab}</div>
    }
  }

  const handleApplyNow = (universityId: string, courseId: string) => {
    const university = sampleUniversities.find((u) => u.id.toString() === universityId)
    if (university) {
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        university: university.name,
        program: university.program,
        country: university.country,
        currentStage: 1,
        stages: [],
        deadline: new Date().toLocaleDateString(),
        appliedDate: new Date().toLocaleDateString(),
        status: "in-progress",
        documents: [],
        fees: {
          application: 100,
          tuition: Number.parseInt(university.tuition.replace(/[^0-9]/g, "")),
          currency: university.tuition.includes("£") ? "GBP" : "USD",
        },
        timeline: [],
        universityId,
        courseId,
      }

      setApplications((prev) => [...prev, newApplication])

      // Navigate to application form
      router.push(`/apply/${universityId}/${courseId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b p-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-bold text-lg">WOW MAMA</h1>
          <p className="text-xs text-gray-600">{getSubtitleText()}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setChatOpen(true)}>
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-600 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          style={{ top: "64px", height: "calc(100vh - 64px)" }}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold">{user?.name || "Student"}</h1>
                  <p className="text-xs text-blue-100">Student Dashboard</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-white hover:bg-blue-800"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {sidebarItems.map((item) => (
                  <div key={item.id}>
                    <Button
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${activeTab === item.id
                        ? "bg-blue-700 text-white hover:bg-blue-800"
                        : "hover:bg-blue-700 text-white"
                        }`}
                      onClick={() => {
                        if (item.id === "community" && item.subtabs.length === 0) {
                          router.push("/student-community")
                          setSidebarOpen(false)
                        } else {
                          handleTabChange(item.id, "")
                          setSidebarOpen(false)
                        }
                      }}
                    >
                      <item.icon className={`w-4 h-4 mr-3 ${activeTab === item.id ? "text-white" : "text-blue-200"}`} />
                      {item.label}
                    </Button>
                  </div>
                ))}
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-blue-500">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-blue-700">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-300 hover:bg-red-600 hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white shadow-sm border-b p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name || "Student"}!</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
          <Card className="w-full max-w-md h-96 flex flex-col">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">WOW MAMA AI Assistant</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {message.actions && (
                        <div className="mt-2 space-y-1">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full text-xs bg-transparent"
                              onClick={() => handleChatAction(action.action)}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

// Mock data store for the application
export interface User {
  id: string | number
  name: string
  email: string
  role: "admin" | "manager" | "counselor" | "COLLEGE" | "SUBAGENT" | "SUPER_ADMIN"
  avatar?: string
  phone?: string
  department?: string
  // Additional fields from API response
  first_name?: string
  last_name?: string
  username?: string
  phone_number?: string
  user_id?: number
}

export interface Campaign {
  id: string
  name: string
  source: string
  sourceId: string
  totalLeads: number
  assignedLeads: number
  unassignedLeads: number
  duplicateLeads: number
  createdBy: string
  createdDate: string
  status: "active" | "completed" | "paused"
  description?: string
}

export interface LeadAllocation {
  id: string
  campaignId: string
  campaignName: string
  counselorId: string
  counselorName: string
  leadsAllocated: number
  leadsContacted: number
  leadsConverted: number
  allocatedDate: string
  status: "pending" | "in-progress" | "completed"
}

export interface CallLog {
  id: string
  leadId: string
  leadName: string
  leadPhone: string
  counselorId: string
  counselorName: string
  callDate: string
  callTime: string
  duration: string
  status: "connected" | "not-connected" | "busy" | "no-answer" | "dnd"
  outcome: "interested" | "not-interested" | "callback" | "dnd" | "wrong-number"
  notes?: string
  recordingUrl?: string
  nextAction?: string
  nextActionDate?: string
}

export interface Appointment {
  id: string
  leadId: string
  leadName: string
  counselorId: string
  counselorName: string
  type: "online-counseling" | "offline-meeting" | "phone-call"
  date: string
  time: string
  duration: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  meetingLink?: string
  location?: string
  notes?: string
  reminder?: {
    enabled: boolean
    time: string // e.g., "30 minutes before"
  }
}

export interface AICallResult {
  id: string
  campaignId: string
  leadId: string
  leadName: string
  leadPhone: string
  callDate: string
  callTime: string
  duration: string
  status: "completed" | "failed" | "in-progress"
  outcome: "interested" | "not-interested" | "callback" | "no-answer" | "invalid-number"
  transcript?: string
  sentiment?: "positive" | "neutral" | "negative"
  recordingUrl?: string
  aiConfidenceScore?: number
  nextAction?: string
}

export interface Notification {
  id: string
  userId: string
  type: "appointment" | "reminder" | "ai-call-result" | "lead-assigned" | "system"
  title: string
  message: string
  date: string
  time: string
  read: boolean
  actionUrl?: string
}

export interface DuplicateLead {
  id: string
  phone: string
  name: string
  email: string
  uploadedBy: string
  uploadedDate: string
  campaignId: string
  campaignName: string
  originalLeadId: string
  status: "pending" | "merged" | "kept-separate"
}

export interface Application {
  id: string
  studentId: string
  studentName: string
  course: string
  university: string
  country: string
  status: "submitted" | "in-review" | "pending-docs" | "approved" | "rejected"
  progress: number
  submittedDate: string
  deadline: string
  counselorId: string
  counselorName: string
  documents: {
    total: number
    submitted: number
    pending: number
  }
  fees: {
    application: string
    paid: boolean
  }
  priority: "high" | "medium" | "low"
}

export interface Student {
  id: string
  name: string
  dob: string
  age: number
  email: string
  phone: string
  country: string
  course: string
  counselorId: string
  counselorName: string
  branch: string
  status: "Active" | "Inactive"
  userType: ("counseling_client" | "community_member" | "job_seeker" | "early_explorer")[]
  studyIntent?: "study_abroad" | "study_india" | "study_online" | "exploring"
  educationLevel?: string
  services?: StudentService
  communityActivity?: CommunityActivity
  jobsPortal?: JobsPortalActivity
  documents: {
    [key: string]: {
      status: "verified" | "pending" | "rejected"
      expiry?: string
      marks?: string
      cgpa?: string
      score?: string
    }
  }
  applications: {
    id: string
    college: string
    course: string
    status: string
    deadline: string
  }[]
}

export interface Transaction {
  id: string
  type: "Commission" | "Counseling Fee" | "Application Fee" | "Document Fee"
  studentId: string
  studentName: string
  college: string
  amount: string
  amountNumber: number
  status: "Paid" | "Pending" | "Overdue"
  date: string
  counselorId: string
  counselorName: string
  invoiceId?: string
  paymentMethod?: string
  notes?: string
}

export interface LeadImportHistory {
  id: string
  campaignId: string
  campaignName: string
  uploadedBy: string
  uploadedDate: string
  uploadedTime: string
  fileName: string
  totalRecords: number
  successfulImports: number
  duplicates: number
  failed: number
  status: "completed" | "in-progress" | "failed"
}

export interface LeadNote {
  id: string
  leadId: string
  userId: string
  userName: string
  note: string
  type: "call" | "email" | "sms" | "meeting" | "general"
  date: string
  time: string
}

export interface College {
  id: string
  name: string
  city: string
  state?: string
  country: string
  type: "offline" | "online" | "both"
  programs: string[]
  established?: string
  ranking?: number
}

export interface LeadQualification {
  verticals: ("study_abroad" | "study_india" | "study_online")[]
  studyAbroad?: {
    countries: string[]
  }
  studyIndia?: {
    mode: "offline" | "online" | "both"
    colleges: string[] // College IDs
  }
  studyOnline?: {
    programs: string[]
  }
  qualifiedBy: string
  qualifiedDate: string
}

export interface LeadOwnership {
  ownerId: string
  ownerName: string
  assignedDate: string
  assignedBy: string
}

export interface LeadAccessControl {
  userId: string
  userName: string
  accessLevel: "owner" | "editor" | "viewer"
  grantedDate: string
  grantedBy: string
}

export interface LeadTransferHistory {
  id: string
  fromUserId: string
  fromUserName: string
  toUserId: string
  toUserName: string
  reason: string
  transferDate: string
  transferredBy: string
  notes?: string
}

// Services tracking interfaces
export interface StudentService {
  psychometricTests?: {
    testName: string
    date: string
    score: number
    report: string
    status: "completed" | "scheduled" | "pending"
  }[]
  mockInterviews?: {
    interviewType: string
    date: string
    rating: number
    feedback: string
    status: "completed" | "scheduled"
  }[]
  loans?: {
    loanProvider: string
    amount: string
    status: "approved" | "pending" | "rejected" | "in-process"
    appliedDate: string
  }[]
  training?: {
    programName: string
    startDate: string
    endDate: string
    progress: number
    status: "ongoing" | "completed" | "enrolled"
  }[]
  campusVisits?: {
    college: string
    visitDate: string
    type: "virtual" | "physical"
    status: "scheduled" | "completed" | "cancelled"
  }[]
}

export interface CommunityActivity {
  postsCreated: number
  commentsPosted: number
  groupsMembership: string[]
  lastActive: string
  reputation: number
}

export interface JobsPortalActivity {
  applicationsSubmitted: number
  companiesInterested: string[]
  status: "active" | "inactive"
  externalProfileLink?: string
}

// Mock data stores
export const mockUsers: User[] = [
  {
    id: "U001",
    name: "Admin User",
    email: "admin@meritcap.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+91 98765 43210",
    department: "Management",
  },
  {
    id: "U002",
    name: "Vinayak Kumar",
    email: "vinayak@meritcap.com",
    role: "counselor",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+91 98765 43211",
    department: "Counseling",
  },
  {
    id: "U003",
    name: "Priya Sharma",
    email: "priya@meritcap.com",
    role: "counselor",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+91 98765 43212",
    department: "Counseling",
  },
  {
    id: "U004",
    name: "Rahul Verma",
    email: "rahul@meritcap.com",
    role: "manager",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+91 98765 43213",
    department: "Operations",
  },
  {
    id: "U005",
    name: "Sneha Patel",
    email: "sneha@meritcap.com",
    role: "counselor",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+91 98765 43214",
    department: "Counseling",
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: "C001",
    name: "Education Fair Mumbai 2024",
    source: "Offline Event",
    sourceId: "S001",
    totalLeads: 5000,
    assignedLeads: 3000,
    unassignedLeads: 1800,
    duplicateLeads: 200,
    createdBy: "Admin User",
    createdDate: "2024-01-15",
    status: "active",
    description: "Leads collected from Education Fair in Mumbai",
  },
  {
    id: "C002",
    name: "Google Ads - Study Abroad",
    source: "Digital Marketing",
    sourceId: "S002",
    totalLeads: 3500,
    assignedLeads: 2500,
    unassignedLeads: 900,
    duplicateLeads: 100,
    createdBy: "Admin User",
    createdDate: "2024-01-20",
    status: "active",
    description: "Leads from Google Ads campaign",
  },
  {
    id: "C003",
    name: "College Visit - Delhi",
    source: "Offline Event",
    sourceId: "S003",
    totalLeads: 2000,
    assignedLeads: 2000,
    unassignedLeads: 0,
    duplicateLeads: 50,
    createdBy: "Rahul Verma",
    createdDate: "2024-01-10",
    status: "completed",
    description: "Campus visit leads from Delhi colleges",
  },
]

export const mockAllocations: LeadAllocation[] = [
  {
    id: "A001",
    campaignId: "C001",
    campaignName: "Education Fair Mumbai 2024",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    leadsAllocated: 1000,
    leadsContacted: 450,
    leadsConverted: 85,
    allocatedDate: "2024-01-16",
    status: "in-progress",
  },
  {
    id: "A002",
    campaignId: "C001",
    campaignName: "Education Fair Mumbai 2024",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    leadsAllocated: 1000,
    leadsContacted: 520,
    leadsConverted: 92,
    allocatedDate: "2024-01-16",
    status: "in-progress",
  },
  {
    id: "A003",
    campaignId: "C001",
    campaignName: "Education Fair Mumbai 2024",
    counselorId: "U005",
    counselorName: "Sneha Patel",
    leadsAllocated: 1000,
    leadsContacted: 380,
    leadsConverted: 68,
    allocatedDate: "2024-01-16",
    status: "in-progress",
  },
  {
    id: "A004",
    campaignId: "C002",
    campaignName: "Google Ads - Study Abroad",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    leadsAllocated: 1500,
    leadsContacted: 890,
    leadsConverted: 145,
    allocatedDate: "2024-01-21",
    status: "in-progress",
  },
]

export const mockCallLogs: CallLog[] = [
  {
    id: "CL001",
    leadId: "L001",
    leadName: "Rahul Kumar",
    leadPhone: "+91 98765 11111",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    callDate: "2024-01-25",
    callTime: "10:30 AM",
    duration: "8:45",
    status: "connected",
    outcome: "interested",
    notes: "Interested in MBA programs in Canada. Wants to apply for Fall 2024.",
    recordingUrl: "/mock-recording.mp3",
    nextAction: "Send program details and schedule counseling",
    nextActionDate: "2024-01-26",
  },
  {
    id: "CL002",
    leadId: "L002",
    leadName: "Priya Singh",
    leadPhone: "+91 98765 22222",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    callDate: "2024-01-25",
    callTime: "11:15 AM",
    duration: "5:20",
    status: "connected",
    outcome: "callback",
    notes: "Busy right now, requested callback tomorrow evening.",
    nextAction: "Call back tomorrow at 6 PM",
    nextActionDate: "2024-01-26",
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "AP001",
    leadId: "L001",
    leadName: "Rahul Kumar",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    type: "online-counseling",
    date: "2024-01-26",
    time: "3:00 PM",
    duration: "45 minutes",
    status: "scheduled",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes: "Discuss MBA programs in Canada",
    reminder: {
      enabled: true,
      time: "30 minutes before",
    },
  },
  {
    id: "AP002",
    leadId: "L003",
    leadName: "Amit Patel",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    type: "offline-meeting",
    date: "2024-01-27",
    time: "11:00 AM",
    duration: "1 hour",
    status: "scheduled",
    location: "MeritCap Office, Mumbai",
    notes: "Document verification and application process discussion",
    reminder: {
      enabled: true,
      time: "1 hour before",
    },
  },
]

export const mockAICallResults: AICallResult[] = [
  {
    id: "AI001",
    campaignId: "C001",
    leadId: "L010",
    leadName: "Neha Gupta",
    leadPhone: "+91 98765 33333",
    callDate: "2024-01-25",
    callTime: "9:15 AM",
    duration: "4:30",
    status: "completed",
    outcome: "interested",
    transcript:
      "AI: Hello, this is MeritCap calling about study abroad opportunities...\nLead: Yes, I am interested in studying in Australia...",
    sentiment: "positive",
    recordingUrl: "/mock-ai-recording.mp3",
    aiConfidenceScore: 85,
    nextAction: "Assign to counselor for follow-up",
  },
  {
    id: "AI002",
    campaignId: "C001",
    leadId: "L011",
    leadName: "Vikram Shah",
    leadPhone: "+91 98765 44444",
    callDate: "2024-01-25",
    callTime: "9:20 AM",
    duration: "2:15",
    status: "completed",
    outcome: "not-interested",
    transcript: "AI: Hello, this is MeritCap calling...\nLead: Not interested, please do not call again.",
    sentiment: "negative",
    aiConfidenceScore: 95,
    nextAction: "Mark as not interested",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "N001",
    userId: "U002",
    type: "appointment",
    title: "Upcoming Appointment",
    message: "You have an appointment with Rahul Kumar at 3:00 PM today",
    date: "2024-01-26",
    time: "2:30 PM",
    read: false,
    actionUrl: "/admin/leads/L001",
  },
  {
    id: "N002",
    userId: "U002",
    type: "ai-call-result",
    title: "AI Call - Interested Lead",
    message: "Neha Gupta showed interest in AI call. Please follow up.",
    date: "2024-01-25",
    time: "9:20 AM",
    read: false,
    actionUrl: "/admin/leads/L010",
  },
  {
    id: "N003",
    userId: "U002",
    type: "lead-assigned",
    title: "New Leads Assigned",
    message: '500 new leads from "Education Fair Mumbai 2024" have been assigned to you',
    date: "2024-01-25",
    time: "8:00 AM",
    read: true,
    actionUrl: "/admin/leads",
  },
]

export const mockDuplicateLeads: DuplicateLead[] = [
  {
    id: "D001",
    phone: "+91 98765 11111",
    name: "Rahul Kumar",
    email: "rahul@email.com",
    uploadedBy: "Admin User",
    uploadedDate: "2024-01-20",
    campaignId: "C002",
    campaignName: "Google Ads - Study Abroad",
    originalLeadId: "L001",
    status: "pending",
  },
  {
    id: "D002",
    phone: "+91 98765 22222",
    name: "Priya Singh",
    email: "priya@email.com",
    uploadedBy: "Admin User",
    uploadedDate: "2024-01-22",
    campaignId: "C002",
    campaignName: "Google Ads - Study Abroad",
    originalLeadId: "L002",
    status: "pending",
  },
]

export const mockApplications: Application[] = [
  {
    id: "APP-2024-001",
    studentId: "STU-1247",
    studentName: "Priya Sharma",
    course: "MBA",
    university: "Harvard Business School",
    country: "USA",
    status: "in-review",
    progress: 75,
    submittedDate: "2024-01-15",
    deadline: "2024-03-01",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    documents: {
      total: 12,
      submitted: 10,
      pending: 2,
    },
    fees: {
      application: "$250",
      paid: true,
    },
    priority: "high",
  },
  {
    id: "APP-2024-002",
    studentId: "STU-1248",
    studentName: "Rahul Verma",
    course: "MS Computer Science",
    university: "MIT",
    country: "USA",
    status: "submitted",
    progress: 100,
    submittedDate: "2024-01-10",
    deadline: "2024-02-28",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    documents: {
      total: 10,
      submitted: 10,
      pending: 0,
    },
    fees: {
      application: "$200",
      paid: true,
    },
    priority: "medium",
  },
  {
    id: "APP-2024-003",
    studentId: "STU-1249",
    studentName: "Sneha Patel",
    course: "MBBS",
    university: "University of Melbourne",
    country: "Australia",
    status: "pending-docs",
    progress: 45,
    submittedDate: "2024-01-20",
    deadline: "2024-03-15",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    documents: {
      total: 15,
      submitted: 8,
      pending: 7,
    },
    fees: {
      application: "$300",
      paid: false,
    },
    priority: "high",
  },
  {
    id: "APP-2024-004",
    studentId: "STU-1250",
    studentName: "Amit Kumar",
    course: "MS Engineering",
    university: "Stanford University",
    country: "USA",
    status: "approved",
    progress: 100,
    submittedDate: "2024-01-05",
    deadline: "2024-02-20",
    counselorId: "U005",
    counselorName: "Sneha Patel",
    documents: {
      total: 10,
      submitted: 10,
      pending: 0,
    },
    fees: {
      application: "$220",
      paid: true,
    },
    priority: "low",
  },
]

export const mockStudents: Student[] = [
  {
    id: "STU-2025-001",
    name: "Priya Sharma",
    dob: "15/03/2000",
    age: 25,
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    country: "USA",
    course: "CS @ Harvard",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    branch: "Mumbai",
    status: "Active",
    userType: ["counseling_client", "community_member"],
    studyIntent: "study_abroad",
    educationLevel: "Graduate",
    services: {
      psychometricTests: [
        {
          testName: "Career Aptitude Test",
          date: "2024-12-10",
          score: 85,
          report: "/reports/psychometric-001.pdf",
          status: "completed",
        },
      ],
      mockInterviews: [
        {
          interviewType: "University Admission",
          date: "2025-01-15",
          rating: 8,
          feedback: "Well prepared, good communication skills",
          status: "completed",
        },
      ],
      loans: [
        {
          loanProvider: "HDFC Education Loan",
          amount: "₹25,00,000",
          status: "approved",
          appliedDate: "2024-11-20",
        },
      ],
      training: [
        {
          programName: "IELTS Preparation",
          startDate: "2024-10-01",
          endDate: "2024-12-01",
          progress: 100,
          status: "completed",
        },
      ],
      campusVisits: [
        {
          college: "Harvard University",
          visitDate: "2025-02-10",
          type: "virtual",
          status: "completed",
        },
      ],
    },
    communityActivity: {
      postsCreated: 12,
      commentsPosted: 45,
      groupsMembership: ["Study Abroad USA", "Computer Science Students"],
      lastActive: "2 hours ago",
      reputation: 150,
    },
    jobsPortal: {
      applicationsSubmitted: 5,
      companiesInterested: ["Google", "Microsoft", "Amazon"],
      status: "active",
      externalProfileLink: "https://linkedin.com/in/priya-sharma",
    },
    documents: {
      passport: { status: "verified", expiry: "2030" },
      marksheet10: { status: "verified", marks: "85%" },
      marksheet12: { status: "verified", marks: "88%" },
      degree: { status: "verified", cgpa: "8.5/10" },
      ielts: { status: "verified", score: "7.5" },
      bankStatement: { status: "pending" },
      sop: { status: "pending" },
    },
    applications: [
      {
        id: "APP-2025-001",
        college: "Harvard University",
        course: "MS in CS",
        status: "Offer Received",
        deadline: "March 15, 2025",
      },
      {
        id: "APP-2025-002",
        college: "Stanford University",
        course: "MS in CS",
        status: "Submitted",
        deadline: "March 20, 2025",
      },
      { id: "APP-2025-003", college: "MIT", course: "MS in CS", status: "In Progress", deadline: "March 25, 2025" },
    ],
  },
  {
    id: "STU-2025-002",
    name: "Rahul Patel",
    dob: "22/08/1999",
    age: 26,
    email: "rahul.patel@email.com",
    phone: "+91 87654 32109",
    country: "Canada",
    course: "MBA @ Toronto",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    branch: "Delhi",
    status: "Active",
    userType: ["counseling_client"],
    studyIntent: "study_abroad",
    educationLevel: "Graduate",
    services: {
      psychometricTests: [
        {
          testName: "MBA Aptitude Test",
          date: "2024-11-05",
          score: 78,
          report: "/reports/psychometric-002.pdf",
          status: "completed",
        },
      ],
      mockInterviews: [
        {
          interviewType: "MBA Admission",
          date: "2025-01-10",
          rating: 7,
          feedback: "Good analytical skills, needs work on presentation",
          status: "completed",
        },
      ],
      loans: [
        {
          loanProvider: "SBI Education Loan",
          amount: "₹30,00,000",
          status: "in-process",
          appliedDate: "2024-12-15",
        },
      ],
      training: [
        {
          programName: "GMAT Preparation",
          startDate: "2024-09-01",
          endDate: "2024-11-30",
          progress: 100,
          status: "completed",
        },
      ],
    },
    documents: {
      passport: { status: "verified", expiry: "2029" },
      marksheet10: { status: "verified", marks: "82%" },
      marksheet12: { status: "verified", marks: "85%" },
      degree: { status: "verified", cgpa: "8.2/10" },
      ielts: { status: "verified", score: "7.0" },
      bankStatement: { status: "verified" },
      sop: { status: "verified" },
    },
    applications: [
      {
        id: "APP-2025-004",
        college: "University of Toronto",
        course: "MBA",
        status: "Submitted",
        deadline: "April 1, 2025",
      },
    ],
  },
  {
    id: "STU-2025-003",
    name: "Neha Singh",
    dob: "10/12/2001",
    age: 24,
    email: "neha.singh@email.com",
    phone: "+91 76543 21098",
    country: "UK",
    course: "MBA @ Oxford",
    counselorId: "U005",
    counselorName: "Sneha Patel",
    branch: "Bangalore",
    status: "Active",
    userType: ["counseling_client", "community_member", "job_seeker"],
    studyIntent: "study_abroad",
    educationLevel: "Graduate",
    services: {
      psychometricTests: [
        {
          testName: "Leadership Assessment",
          date: "2024-10-20",
          score: 92,
          report: "/reports/psychometric-003.pdf",
          status: "completed",
        },
      ],
      mockInterviews: [
        {
          interviewType: "MBA Admission",
          date: "2025-01-05",
          rating: 9,
          feedback: "Excellent communication and leadership qualities",
          status: "completed",
        },
      ],
      loans: [
        {
          loanProvider: "Axis Bank Education Loan",
          amount: "₹35,00,000",
          status: "approved",
          appliedDate: "2024-11-10",
        },
      ],
      training: [
        {
          programName: "IELTS Advanced",
          startDate: "2024-08-01",
          endDate: "2024-10-15",
          progress: 100,
          status: "completed",
        },
        {
          programName: "Leadership Development",
          startDate: "2025-01-20",
          endDate: "2025-03-20",
          progress: 30,
          status: "ongoing",
        },
      ],
      campusVisits: [
        {
          college: "University of Oxford",
          visitDate: "2024-12-15",
          type: "physical",
          status: "completed",
        },
      ],
    },
    communityActivity: {
      postsCreated: 25,
      commentsPosted: 89,
      groupsMembership: ["Study Abroad UK", "MBA Aspirants", "Leadership Club"],
      lastActive: "1 hour ago",
      reputation: 280,
    },
    jobsPortal: {
      applicationsSubmitted: 12,
      companiesInterested: ["McKinsey", "BCG", "Deloitte", "KPMG"],
      status: "active",
      externalProfileLink: "https://linkedin.com/in/neha-singh",
    },
    documents: {
      passport: { status: "verified", expiry: "2031" },
      marksheet10: { status: "verified", marks: "90%" },
      marksheet12: { status: "verified", marks: "92%" },
      degree: { status: "verified", cgpa: "9.0/10" },
      ielts: { status: "verified", score: "8.0" },
      bankStatement: { status: "verified" },
      sop: { status: "verified" },
    },
    applications: [
      {
        id: "APP-2025-005",
        college: "University of Oxford",
        course: "MBA",
        status: "Approved",
        deadline: "March 30, 2025",
      },
    ],
  },
  {
    id: "STU-2025-004",
    name: "Amit Kumar",
    dob: "05/06/2003",
    age: 22,
    email: "amit.kumar@email.com",
    phone: "+91 98765 12345",
    country: "India",
    course: "Exploring",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    branch: "Mumbai",
    status: "Active",
    userType: ["community_member", "early_explorer"],
    studyIntent: "exploring",
    educationLevel: "2nd Year",
    communityActivity: {
      postsCreated: 8,
      commentsPosted: 32,
      groupsMembership: ["Engineering Students", "Study Tips"],
      lastActive: "5 hours ago",
      reputation: 65,
    },
    documents: {},
    applications: [],
  },
  {
    id: "STU-2025-005",
    name: "Sneha Gupta",
    dob: "12/02/2002",
    age: 23,
    email: "sneha.gupta@email.com",
    phone: "+91 87654 98765",
    country: "India",
    course: "Job Seeker",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    branch: "Delhi",
    status: "Active",
    userType: ["job_seeker", "community_member"],
    studyIntent: "exploring",
    educationLevel: "Graduate",
    services: {
      psychometricTests: [
        {
          testName: "Career Fit Assessment",
          date: "2025-01-10",
          score: 76,
          report: "/reports/psychometric-005.pdf",
          status: "completed",
        },
      ],
      mockInterviews: [
        {
          interviewType: "Job Interview Prep",
          date: "2025-01-18",
          rating: 7,
          feedback: "Good technical skills, improve communication",
          status: "scheduled",
        },
      ],
    },
    jobsPortal: {
      applicationsSubmitted: 18,
      companiesInterested: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant"],
      status: "active",
      externalProfileLink: "https://linkedin.com/in/sneha-gupta",
    },
    communityActivity: {
      postsCreated: 15,
      commentsPosted: 56,
      groupsMembership: ["Job Seekers", "Interview Prep", "Tech Career"],
      lastActive: "30 minutes ago",
      reputation: 120,
    },
    documents: {
      degree: { status: "verified", cgpa: "7.8/10" },
      marksheet10: { status: "verified", marks: "79%" },
      marksheet12: { status: "verified", marks: "82%" },
    },
    applications: [],
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "TRX-001",
    type: "Commission",
    studentId: "STU-1247",
    studentName: "Priya Sharma",
    college: "Harvard University",
    amount: "₹1,65,000",
    amountNumber: 165000,
    status: "Paid",
    date: "2025-03-01",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    invoiceId: "INV-001",
    paymentMethod: "Bank Transfer",
    notes: "Commission for Harvard MBA enrollment",
  },
  {
    id: "TRX-002",
    type: "Counseling Fee",
    studentId: "STU-1248",
    studentName: "Rahul Patel",
    college: "-",
    amount: "₹50,000",
    amountNumber: 50000,
    status: "Pending",
    date: "2025-03-05",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    invoiceId: "INV-002",
    paymentMethod: "-",
    notes: "Initial counseling package",
  },
  {
    id: "TRX-003",
    type: "Commission",
    studentId: "STU-1249",
    studentName: "Neha Singh",
    college: "Stanford University",
    amount: "₹1,45,000",
    amountNumber: 145000,
    status: "Paid",
    date: "2025-02-28",
    counselorId: "U005",
    counselorName: "Sneha Patel",
    invoiceId: "INV-003",
    paymentMethod: "Bank Transfer",
    notes: "Commission for Stanford MS enrollment",
  },
  {
    id: "TRX-004",
    type: "Application Fee",
    studentId: "STU-1250",
    studentName: "Amit Kumar",
    college: "MIT",
    amount: "₹30,000",
    amountNumber: 30000,
    status: "Paid",
    date: "2025-03-02",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    invoiceId: "INV-004",
    paymentMethod: "Credit Card",
    notes: "Application processing fee",
  },
  {
    id: "TRX-005",
    type: "Document Fee",
    studentId: "STU-1251",
    studentName: "Ravi Sharma",
    college: "-",
    amount: "₹15,000",
    amountNumber: 15000,
    status: "Overdue",
    date: "2025-02-20",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    invoiceId: "INV-005",
    paymentMethod: "-",
    notes: "Document verification and processing",
  },
]

export const mockLeadImportHistory: LeadImportHistory[] = [
  {
    id: "IH001",
    campaignId: "C001",
    campaignName: "Education Fair Mumbai 2024",
    uploadedBy: "Admin User",
    uploadedDate: "2024-01-15",
    uploadedTime: "10:30 AM",
    fileName: "mumbai_fair_leads.csv",
    totalRecords: 5200,
    successfulImports: 5000,
    duplicates: 200,
    failed: 0,
    status: "completed",
  },
  {
    id: "IH002",
    campaignId: "C002",
    campaignName: "Google Ads - Study Abroad",
    uploadedBy: "Admin User",
    uploadedDate: "2024-01-20",
    uploadedTime: "2:15 PM",
    fileName: "google_ads_leads.csv",
    totalRecords: 3600,
    successfulImports: 3500,
    duplicates: 100,
    failed: 0,
    status: "completed",
  },
  {
    id: "IH003",
    campaignId: "C003",
    campaignName: "College Visit - Delhi",
    uploadedBy: "Rahul Verma",
    uploadedDate: "2024-01-10",
    uploadedTime: "9:00 AM",
    fileName: "delhi_college_leads.xlsx",
    totalRecords: 2050,
    successfulImports: 2000,
    duplicates: 50,
    failed: 0,
    status: "completed",
  },
]

export const mockLeadNotes: LeadNote[] = [
  {
    id: "LN001",
    leadId: "L001",
    userId: "U002",
    userName: "Vinayak Kumar",
    note: "Initial call completed. Student very interested in US universities, specifically Computer Science programs.",
    type: "call",
    date: "2024-01-15",
    time: "10:30 AM",
  },
  {
    id: "LN002",
    leadId: "L001",
    userId: "U002",
    userName: "Vinayak Kumar",
    note: "Sent university shortlist and scholarship information via email.",
    type: "email",
    date: "2024-01-16",
    time: "2:45 PM",
  },
  {
    id: "LN003",
    leadId: "L001",
    userId: "U002",
    userName: "Vinayak Kumar",
    note: "Meeting scheduled for tomorrow to discuss application process and documentation requirements.",
    type: "meeting",
    date: "2024-01-17",
    time: "4:15 PM",
  },
]

export const mockColleges: College[] = [
  // India - Offline Colleges
  {
    id: "COL-IND-001",
    name: "Indian Institute of Technology Delhi",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    type: "offline",
    programs: ["B.Tech", "M.Tech", "MBA", "PhD"],
    established: "1961",
    ranking: 1,
  },
  {
    id: "COL-IND-002",
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    type: "offline",
    programs: ["B.Tech", "M.Tech", "MBA", "PhD"],
    established: "1958",
    ranking: 2,
  },
  {
    id: "COL-IND-003",
    name: "Christ University",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    type: "offline",
    programs: ["BBA", "MBA", "B.Com", "M.Com", "BCA", "MCA"],
    established: "1969",
    ranking: 15,
  },
  {
    id: "COL-IND-004",
    name: "Symbiosis International University",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    type: "offline",
    programs: ["BBA", "MBA", "Law", "Mass Communication"],
    established: "2002",
    ranking: 18,
  },
  {
    id: "COL-IND-005",
    name: "Manipal Academy of Higher Education",
    city: "Manipal",
    state: "Karnataka",
    country: "India",
    type: "offline",
    programs: ["MBBS", "Engineering", "MBA", "Pharmacy"],
    established: "1953",
    ranking: 20,
  },
  // India - Online Colleges
  {
    id: "COL-IND-ON-001",
    name: "IGNOU - Indira Gandhi National Open University",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    type: "online",
    programs: ["BA", "MA", "B.Com", "M.Com", "BBA", "MBA", "MCA"],
    established: "1985",
    ranking: 5,
  },
  {
    id: "COL-IND-ON-002",
    name: "Amity University Online",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    type: "online",
    programs: ["BBA", "MBA", "MCA", "BCA"],
    established: "2005",
    ranking: 25,
  },
  {
    id: "COL-IND-ON-003",
    name: "Manipal University Online",
    city: "Manipal",
    state: "Karnataka",
    country: "India",
    type: "online",
    programs: ["MBA", "MCA", "Data Science", "AI & ML"],
    established: "2001",
    ranking: 22,
  },
]

export interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: "active" | "inactive"
  joinDate: string
  branch: string
  department: string
  reportingTo?: string
  permissions: TeamPermissions
  loginActivity: {
    lastLogin: string
    totalLogins: number
  }
  performance: {
    leadsAssigned: number
    leadsConverted: number
    conversionRate: number
  }
}

export interface TeamPermissions {
  // Leads Module
  leads: {
    viewAll: boolean
    viewAssigned: boolean
    create: boolean
    edit: boolean
    delete: boolean
    transfer: boolean
    bulkAssign: boolean
    export: boolean
  }
  // Students Module
  students: {
    viewAll: boolean
    viewAssigned: boolean
    create: boolean
    edit: boolean
    delete: boolean
    export: boolean
  }
  // Applications Module
  applications: {
    viewAll: boolean
    viewAssigned: boolean
    create: boolean
    edit: boolean
    delete: boolean
    approve: boolean
    export: boolean
  }
  // Community Module
  community: {
    view: boolean
    moderate: boolean
    delete: boolean
    feature: boolean
    manageTeam: boolean
  }
  // Finance Module
  finance: {
    viewReports: boolean
    createInvoices: boolean
    approveExpenses: boolean
    viewPayments: boolean
    export: boolean
  }
  // HR Module
  hr: {
    viewAttendance: boolean
    approveLeave: boolean
    manageTraining: boolean
    viewPerformance: boolean
  }
  // Settings Module
  settings: {
    accessSettings: boolean
    manageRoles: boolean
    manageIntegrations: boolean
    systemConfig: boolean
  }
  // Reports Module
  reports: {
    viewAllReports: boolean
    exportData: boolean
    viewAnalytics: boolean
  }
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "TM-001",
    name: "Vinayak Kumar",
    email: "vinayak@meritcap.com",
    phone: "+91 98765 43211",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-01-15",
    branch: "Mumbai",
    department: "Counseling",
    reportingTo: "Admin User",
    permissions: {
      leads: { viewAll: true, viewAssigned: true, create: true, edit: true, delete: false, transfer: true, bulkAssign: false, export: true },
      students: { viewAll: true, viewAssigned: true, create: true, edit: true, delete: false, export: true },
      applications: { viewAll: true, viewAssigned: true, create: true, edit: true, delete: false, approve: false, export: true },
      community: { view: true, moderate: false, delete: false, feature: false, manageTeam: false },
      finance: { viewReports: true, createInvoices: false, approveExpenses: false, viewPayments: true, export: false },
      hr: { viewAttendance: true, approveLeave: false, manageTraining: false, viewPerformance: true },
      settings: { accessSettings: false, manageRoles: false, manageIntegrations: false, systemConfig: false },
      reports: { viewAllReports: true, exportData: true, viewAnalytics: true },
    },
    loginActivity: {
      lastLogin: "2 hours ago",
      totalLogins: 245,
    },
    performance: {
      leadsAssigned: 450,
      leadsConverted: 85,
      conversionRate: 18.9,
    },
  },
  {
    id: "TM-002",
    name: "Priya Sharma",
    email: "priya@meritcap.com",
    phone: "+91 98765 43212",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-03-20",
    branch: "Delhi",
    department: "Counseling",
    reportingTo: "Admin User",
    permissions: {
      leads: { viewAll: false, viewAssigned: true, create: true, edit: true, delete: false, transfer: false, bulkAssign: false, export: false },
      students: { viewAll: false, viewAssigned: true, create: true, edit: true, delete: false, export: false },
      applications: { viewAll: false, viewAssigned: true, create: true, edit: true, delete: false, approve: false, export: false },
      community: { view: true, moderate: true, delete: false, feature: false, manageTeam: false },
      finance: { viewReports: false, createInvoices: false, approveExpenses: false, viewPayments: false, export: false },
      hr: { viewAttendance: true, approveLeave: false, manageTraining: false, viewPerformance: false },
      settings: { accessSettings: false, manageRoles: false, manageIntegrations: false, systemConfig: false },
      reports: { viewAllReports: false, exportData: false, viewAnalytics: true },
    },
    loginActivity: {
      lastLogin: "5 hours ago",
      totalLogins: 198,
    },
    performance: {
      leadsAssigned: 380,
      leadsConverted: 72,
      conversionRate: 18.9,
    },
  },
]

export interface CounselorAvailability {
  id: string
  counselorId: string
  counselorName: string
  dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  startTime: string
  endTime: string
  maxAppointmentsPerDay: number
  bufferTimeMinutes: number
  status: "active" | "inactive"
}

export interface CounselorLeave {
  id: string
  counselorId: string
  counselorName: string
  startDate: string
  endDate: string
  reason: string
  status: "approved" | "pending"
}

export interface EnhancedAppointment extends Appointment {
  studentId?: string
  studentEmail?: string
  agenda?: string
  attendees?: string[]
  zoomLink?: string
  googleMeetLink?: string
  whatsappReminderSent?: boolean
  emailReminderSent?: boolean
  feedback?: {
    rating: number
    comments: string
    submittedDate: string
  }
}

export interface CommunityComment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  likes: number
  status: "approved" | "pending" | "rejected"
}

export interface CommunityPoll {
  id: string
  title: string
  description: string
  options: {
    id: string
    text: string
    votes: number
  }[]
  createdBy: string
  createdAt: string
  endsAt: string
  totalVotes: number
  status: "active" | "closed"
}

export interface CommunityBadge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  pointsRequired: number
}

export interface MemberBadges {
  userId: string
  badges: string[] // Badge IDs
  points: number
  level: number
}

export const mockCounselorAvailability: CounselorAvailability[] = [
  {
    id: "AVL-001",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "18:00",
    maxAppointmentsPerDay: 8,
    bufferTimeMinutes: 15,
    status: "active",
  },
  {
    id: "AVL-002",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    dayOfWeek: "Tuesday",
    startTime: "09:00",
    endTime: "18:00",
    maxAppointmentsPerDay: 8,
    bufferTimeMinutes: 15,
    status: "active",
  },
  {
    id: "AVL-003",
    counselorId: "U003",
    counselorName: "Priya Sharma",
    dayOfWeek: "Monday",
    startTime: "10:00",
    endTime: "19:00",
    maxAppointmentsPerDay: 6,
    bufferTimeMinutes: 15,
    status: "active",
  },
]

export const mockCounselorLeaves: CounselorLeave[] = [
  {
    id: "LV-001",
    counselorId: "U002",
    counselorName: "Vinayak Kumar",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    reason: "Personal leave",
    status: "approved",
  },
]

export const mockCommunityComments: CommunityComment[] = [
  {
    id: "CMT-001",
    postId: "POST001",
    authorId: "STU002",
    authorName: "Priya Patel",
    content: "Thanks for sharing! This really helped me.",
    createdAt: "2024-01-15 14:30",
    likes: 12,
    status: "approved",
  },
  {
    id: "CMT-002",
    postId: "POST001",
    authorId: "STU003",
    authorName: "Amit Kumar",
    content: "Can you share more details about the mock tests?",
    createdAt: "2024-01-15 16:45",
    likes: 5,
    status: "approved",
  },
]

export const mockCommunityPolls: CommunityPoll[] = [
  {
    id: "POLL-001",
    title: "Which country are you planning to study in?",
    description: "Help us understand where our community is headed!",
    options: [
      { id: "OPT-001", text: "USA", votes: 145 },
      { id: "OPT-002", text: "Canada", votes: 89 },
      { id: "OPT-003", text: "UK", votes: 67 },
      { id: "OPT-004", text: "Australia", votes: 52 },
    ],
    createdBy: "Admin User",
    createdAt: "2024-01-10",
    endsAt: "2024-02-10",
    totalVotes: 353,
    status: "active",
  },
]

export const mockCommunityBadges: CommunityBadge[] = [
  {
    id: "BDG-001",
    name: "Helpful Contributor",
    description: "Awarded for helping other community members",
    icon: "🏆",
    criteria: "Receive 50 likes on your posts",
    pointsRequired: 50,
  },
  {
    id: "BDG-002",
    name: "Active Member",
    description: "Regular participation in community",
    icon: "⭐",
    criteria: "Create 20 posts",
    pointsRequired: 100,
  },
  {
    id: "BDG-003",
    name: "Expert Advisor",
    description: "Recognized expert in study abroad",
    icon: "🎓",
    criteria: "Receive 100 likes and create 50 helpful posts",
    pointsRequired: 200,
  },
]

export const mockMemberBadges: MemberBadges[] = [
  {
    userId: "STU001",
    badges: ["BDG-001", "BDG-002"],
    points: 150,
    level: 3,
  },
  {
    userId: "STU002",
    badges: ["BDG-001"],
    points: 78,
    level: 2,
  },
]

export const mockData = {
  users: mockUsers,
  campaigns: mockCampaigns,
  allocations: mockAllocations,
  callLogs: mockCallLogs,
  appointments: mockAppointments,
  aiCallResults: mockAICallResults,
  notifications: mockNotifications,
  duplicateLeads: mockDuplicateLeads,
  applications: mockApplications,
  students: mockStudents,
  transactions: mockTransactions,
  leadImportHistory: mockLeadImportHistory,
  leadNotes: mockLeadNotes,
  colleges: mockColleges,
  leads: [
    {
      id: "L001",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      college: "University of California",
      collegeLocation: "Los Angeles, USA",
      course: "Computer Science",
      year: "Fall 2025",
      source: "Website",
      status: "HOT",
      interest: "Study Abroad - USA",
      budget: "₹25-30 Lakhs",
      createdAt: "2024-01-15",
      lastContact: "2024-01-15",
      assignedTo: "Amit Counselor",
      score: 95,
      conversionProbability: 92,
      aiInsight: "High intent - Mentioned specific universities",
      urgency: "high",
      engagementLevel: 78,
      nextAction: "Schedule counseling call within 24h",
      timeline: "Immediate",
      tags: ["MBA", "USA", "High-Budget"],
      lastEmail: "2024-01-16",
      lastSMS: "2024-01-15",
      emailsSent: 3,
      smsSent: 2,
    },
    {
      id: "L002",
      name: "Rahul Patel",
      email: "rahul.patel@email.com",
      phone: "+91 87654 32109",
      location: "Ahmedabad, Gujarat",
      college: "University of Toronto",
      collegeLocation: "Toronto, Canada",
      course: "Engineering",
      year: "Fall 2025",
      source: "Facebook Ads",
      status: "Warm",
      interest: "Study Abroad - Canada",
      budget: "₹20-25 Lakhs",
      createdAt: "2024-01-14",
      lastContact: "2024-01-16",
      assignedTo: "Priya Counselor",
      score: 82,
      conversionProbability: 88,
      aiInsight: "Strong profile - Engineering background",
      urgency: "medium",
      engagementLevel: 85,
      nextAction: "Send university shortlist",
      timeline: "1-2 weeks",
      tags: ["Engineering", "Canada"],
      lastEmail: "2024-01-16",
      lastSMS: null,
      emailsSent: 2,
      smsSent: 0,
    },
    {
      id: "L003",
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 76543 21098",
      location: "Hyderabad, Telangana",
      college: "University of Manchester",
      collegeLocation: "Manchester, UK",
      course: "Business Administration",
      year: "Spring 2026",
      source: "Google Ads",
      status: "Cold",
      interest: "Study Abroad - UK",
      budget: "₹30-35 Lakhs",
      createdAt: "2024-01-13",
      lastContact: "2024-01-17",
      assignedTo: "Ravi Counselor",
      score: 68,
      conversionProbability: 75,
      aiInsight: "Budget concerns - Needs scholarship info",
      urgency: "medium",
      engagementLevel: 65,
      nextAction: "Share scholarship opportunities",
      timeline: "2-3 weeks",
      tags: ["UK", "MBA"],
      lastEmail: "2024-01-17",
      lastSMS: "2024-01-14",
      emailsSent: 1,
      smsSent: 1,
    },
  ],
  teamMembers: mockTeamMembers,
  counselorAvailability: mockCounselorAvailability,
  counselorLeaves: mockCounselorLeaves,
  communityComments: mockCommunityComments,
  communityPolls: mockCommunityPolls,
  communityBadges: mockCommunityBadges,
  memberBadges: mockMemberBadges,
}

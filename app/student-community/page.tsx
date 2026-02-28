"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  MessageCircle,
  Users,
  GraduationCap,
  Search,
  Clock,
  Star,
  BookOpen,
  Send,
  Video,
  Mic,
  Phone,
  Settings,
  Upload,
  ChevronRight,
  CheckCircle,
  X,
  Briefcase,
  Sparkles,
  Award,
  Plus,
  Target,
  Calendar,
  Globe,
  Lock,
  Mail,
  ChevronLeft,
} from "lucide-react"

const studyRoomsData = [
  // Renamed to avoid conflict with updated studyRooms
  {
    id: "1",
    title: "Data Analytics Bootcamp",
    description: "Join our live bootcamp to learn data analytics from scratch.",
    host: "John Doe",
    participants: 25,
    maxParticipants: 50,
    isLive: true,
    category: "Technical",
  },
  {
    id: "2",
    title: "IELTS Preparation Workshop",
    description: "Scheduled workshop for IELTS preparation.",
    host: "Jane Smith",
    participants: 10,
    maxParticipants: 30,
    isLive: false,
    category: "Language",
    scheduledTime: "Dec 18, 2024 10:00 AM",
  },
  {
    id: "1",
    title: "Advanced Java Programming",
    description: "Deep dive into Java concurrency, streams, and design patterns for enterprise applications.",
    host: "Amit Patel",
    hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    participants: 8,
    maxParticipants: 15,
    isLive: true,
    category: "study",
    topic: "programming",
    duration: "2h 30m left",
    startedAgo: "30 minutes ago",
    rating: 4.8,
  },
  {
    id: "2",
    title: "GRE Quantitative Mastery",
    description: "Intensive session covering advanced quant concepts and problem-solving strategies.",
    host: "Dr. Sarah Johnson",
    hostImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    participants: 12,
    maxParticipants: 20,
    isLive: true,
    category: "exam",
    topic: "test-prep",
    duration: "1h 45m left",
    startedAgo: "1 hour ago",
    rating: 4.9,
  },
  {
    id: "3",
    title: "GMAT Study Group - Verbal Section",
    description: "Practice critical reasoning and reading comprehension with expert guidance.",
    host: "Michael Chen",
    hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    participants: 6,
    maxParticipants: 12,
    isLive: false,
    category: "exam",
    topic: "test-prep",
    scheduledTime: "Today, 6:00 PM",
    rating: 4.7,
  },
  {
    id: "4",
    title: "CAT Preparation Marathon",
    description: "Complete mock test discussion and strategy session for CAT 2025 aspirants.",
    host: "Priya Sharma",
    hostImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    participants: 15,
    maxParticipants: 25,
    isLive: true,
    category: "exam",
    topic: "test-prep",
    duration: "3h 20m left",
    startedAgo: "40 minutes ago",
    rating: 4.9,
  },
  {
    id: "5",
    title: "React & Next.js Project Workshop",
    description: "Build a full-stack application using React 18, Next.js 14, and Tailwind CSS.",
    host: "Rahul Kumar",
    hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    participants: 10,
    maxParticipants: 18,
    isLive: true,
    category: "project",
    topic: "web-dev",
    duration: "2h 15m left",
    startedAgo: "45 minutes ago",
    rating: 4.8,
  },
  {
    id: "6",
    title: "Data Structures & Algorithms Bootcamp",
    description: "Crack coding interviews with DSA problem-solving and optimization techniques.",
    host: "Ananya Singh",
    hostImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    participants: 20,
    maxParticipants: 30,
    isLive: true,
    category: "study",
    topic: "programming",
    duration: "1h 30m left",
    startedAgo: "2 hours ago",
    rating: 4.9,
  },
  {
    id: "7",
    title: "Python for Data Science",
    description: "Learn pandas, numpy, and matplotlib for data analysis and visualization.",
    host: "Dr. Vikram Mehta",
    hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    participants: 14,
    maxParticipants: 22,
    isLive: false,
    category: "study",
    topic: "data-science",
    scheduledTime: "Tomorrow, 10:00 AM",
    rating: 4.8,
  },
  {
    id: "8",
    title: "IELTS Speaking Practice Session",
    description: "Mock speaking tests with immediate feedback and improvement tips.",
    host: "Prof. Anita Desai",
    hostImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    participants: 8,
    maxParticipants: 10,
    isLive: true,
    category: "exam",
    topic: "language",
    duration: "45m left",
    startedAgo: "15 minutes ago",
    rating: 5.0,
  },
  {
    id: "9",
    title: "Machine Learning Fundamentals",
    description: "Understanding supervised and unsupervised learning with practical examples.",
    host: "Karthik Reddy",
    hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    participants: 18,
    maxParticipants: 25,
    isLive: true,
    category: "study",
    topic: "ai-ml",
    duration: "2h 50m left",
    startedAgo: "10 minutes ago",
    rating: 4.7,
  },
  {
    id: "10",
    title: "MBA Application Essay Review",
    description: "Get personalized feedback on your MBA application essays and SOP.",
    host: "James Anderson",
    hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    participants: 5,
    maxParticipants: 8,
    isLive: false,
    category: "discussion",
    topic: "career",
    scheduledTime: "Dec 20, 2024 4:00 PM",
    rating: 4.6,
  },
  {
    id: "11",
    title: "System Design Interview Prep",
    description: "Learn to design scalable systems for FAANG interviews with real examples.",
    host: "Neha Gupta",
    hostImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    participants: 16,
    maxParticipants: 20,
    isLive: true,
    category: "study",
    topic: "programming",
    duration: "1h 20m left",
    startedAgo: "1 hour ago",
    rating: 4.9,
  },
  {
    id: "12",
    title: "TOEFL Writing Strategies",
    description: "Master independent and integrated writing tasks with proven frameworks.",
    host: "Robert Williams",
    hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    participants: 7,
    maxParticipants: 15,
    isLive: false,
    category: "exam",
    topic: "language",
    scheduledTime: "Dec 19, 2024 2:00 PM",
    rating: 4.7,
  },
  {
    id: "13",
    title: "Financial Modeling in Excel",
    description: "Build comprehensive financial models for business analysis and valuation.",
    host: "Arjun Kapoor",
    hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    participants: 11,
    maxParticipants: 18,
    isLive: true,
    category: "study",
    topic: "finance",
    duration: "2h 5m left",
    startedAgo: "55 minutes ago",
    rating: 4.8,
  },
  {
    id: "14",
    title: "Research Paper Writing Workshop",
    description: "Learn academic writing, citations, and how to structure research papers effectively.",
    host: "Dr. Meera Iyer",
    hostImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    participants: 9,
    maxParticipants: 15,
    isLive: false,
    category: "discussion",
    topic: "academic",
    scheduledTime: "Tomorrow, 3:00 PM",
    rating: 4.9,
  },
  {
    id: "15",
    title: "Mock Interview for Product Managers",
    description: "Realistic PM interviews with behavioral, case study, and technical rounds.",
    host: "Sanjay Verma",
    hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    participants: 4,
    maxParticipants: 6,
    isLive: true,
    category: "project",
    topic: "career",
    duration: "1h 10m left",
    startedAgo: "20 minutes ago",
    rating: 4.8,
  },
]

const experts = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    title: "Study Abroad Counselor",
    specialization: "USA, Canada, Admissions",
    rating: 4.8,
    reviews: 500,
    responseTime: "24 hours",
    isOnline: true,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    questionsAnswered: 1250,
    responseRate: "98%",
    topExpert: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: "Software Engineer",
    specialization: "Tech Career, USA Work Culture",
    rating: 4.5,
    reviews: 300,
    responseTime: "48 hours",
    isOnline: false,
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    questionsAnswered: 780,
    responseRate: "94%",
    topExpert: false,
  },
  {
    id: "3",
    name: "Prof. Anita Desai",
    title: "IELTS Expert",
    specialization: "English Proficiency, Test Prep",
    rating: 4.9,
    reviews: 850,
    responseTime: "12 hours",
    isOnline: true,
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    questionsAnswered: 2100,
    responseRate: "99%",
    topExpert: true,
  },
  {
    id: "4",
    name: "Michael Chen",
    title: "MBA Consultant",
    specialization: "Business Schools, GMAT",
    rating: 4.7,
    reviews: 420,
    responseTime: "36 hours",
    isOnline: true,
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    questionsAnswered: 890,
    responseRate: "96%",
    topExpert: false,
  },
  {
    id: "5",
    name: "Dr. Priya Sharma",
    title: "Education Finance Advisor",
    specialization: "Scholarships, Loans, Funding",
    rating: 4.8,
    reviews: 650,
    responseTime: "24 hours",
    isOnline: false,
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    questionsAnswered: 1450,
    responseRate: "97%",
    topExpert: true,
  },
  {
    id: "6",
    name: "James Anderson",
    title: "Career Coach",
    specialization: "Career Planning, Interview Prep",
    rating: 4.6,
    reviews: 380,
    responseTime: "48 hours",
    isOnline: true,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    questionsAnswered: 620,
    responseRate: "95%",
    topExpert: false,
  },
]

const publicQA = [
  {
    id: "qa-1",
    question: "What is the best time to apply for Fall 2025 admissions?",
    askedBy: "Student",
    category: "Admissions",
    answers: 5,
    views: 234,
    upvotes: 18,
    answeredBy: "Dr. Rajesh Kumar",
    expertImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    trending: true,
  },
  {
    id: "qa-2",
    question: "How to improve IELTS speaking score from 6.5 to 7.5?",
    askedBy: "Priya M",
    category: "Test Prep",
    answers: 8,
    views: 567,
    upvotes: 45,
    answeredBy: "Prof. Anita Desai",
    expertImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    trending: true,
  },
  {
    id: "qa-3",
    question: "Which scholarships are available for Indian students in Canada?",
    askedBy: "Rahul K",
    category: "Finance",
    answers: 12,
    views: 892,
    upvotes: 67,
    answeredBy: "Dr. Priya Sharma",
    expertImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    trending: false,
  },
]

export default function StudentCommunityPage() {
  const [activeTab, setActiveTab] = useState<"discussions" | "rooms" | "experts">("discussions")
  const [selectedTopic, setSelectedTopic] = useState<string>("usa-safety")
  const [chatMessage, setChatMessage] = useState("")
  const [isVerifiedUser] = useState(true)
  const [isKYCVerified] = useState(false)
  const [showCreateTopic, setShowCreateTopic] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [categoryStartIndex, setCategoryStartIndex] = useState(0)

  const allCategories = [
    {
      id: "computer-science",
      name: "Computer Science",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: "law",
      name: "Law",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5" />
          <path d="M12 12v9" />
          <path d="M12 12L4 7.5" />
        </svg>
      ),
    },
    {
      id: "agriculture",
      name: "Agriculture",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: "test-prep",
      name: "Test Prep",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="10" y1="8" x2="16" y2="8" />
          <line x1="10" y1="12" x2="16" y2="12" />
          <line x1="10" y1="16" x2="13" y2="16" />
        </svg>
      ),
    },
    {
      id: "medicine",
      name: "Medicine",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: "engineering",
      name: "Engineering",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6" />
          <path d="M21 12h-6m-6 0H3" />
          <path d="M18.364 5.636L15.536 8.464m-7.072 0L5.636 5.636" />
          <path d="M18.364 18.364L15.536 15.536m-7.072 0L5.636 18.364" />
        </svg>
      ),
    },
    {
      id: "business",
      name: "Business",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: "arts",
      name: "Arts",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 9h6l-6 6h6" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      id: "science",
      name: "Science",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2v6l-4 8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-4-8V2" />
          <path d="M9 2h6" />
        </svg>
      ),
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9l6 6" />
          <path d="M15 9l-6 6" />
        </svg>
      ),
    },
    {
      id: "language",
      name: "Language",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      id: "psychology",
      name: "Psychology",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      ),
    },
    {
      id: "finance",
      name: "Finance",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: "design",
      name: "Design",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
    },
    {
      id: "research",
      name: "Research",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
    {
      id: "career",
      name: "Career",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      ),
    },
    {
      id: "economics",
      name: "Economics",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ),
    },
    {
      id: "journalism",
      name: "Journalism",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
    },
    {
      id: "architecture",
      name: "Architecture",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9v12" />
          <path d="M9 21h6" />
        </svg>
      ),
    },
    {
      id: "hospitality",
      name: "Hospitality",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18l-9-9-9 9z" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
        </svg>
      ),
    },
  ]

  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [roomType, setRoomType] = useState<"study" | "exam" | "project" | "discussion">("study")
  const [roomTopic, setRoomTopic] = useState("")
  const [roomDuration, setRoomDuration] = useState("2")
  const [inviteContacts, setInviteContacts] = useState("")
  const [showStudyRoomInterface, setShowStudyRoomInterface] = useState(false)

  const [createRoomStep, setCreateRoomStep] = useState(1)
  const [roomTitle, setRoomTitle] = useState("")
  const [roomDescription, setRoomDescription] = useState("")
  const [roomPrivacy, setRoomPrivacy] = useState<"public" | "private">("public")

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Data for Study Rooms Tab
  const [roomFilter, setRoomFilter] = useState("all")
  const [activeUserSessions] = useState([
    {
      id: 1,
      title: "Calculus Problem Solving",
      duration: "1h 23m",
      recording: true,
      participants: [{ name: "You" }, { name: "Rahul Kumar" }, { name: "Meera Patel" }],
    },
  ])
  const [liveRooms] = useState([
    {
      id: 1,
      title: "AI & Machine Learning Study Group",
      host: {
        name: "Priya Sharma",
        badge: "AI Expert",
        rating: 4.8,
      },
      participants: 4,
      capacity: 8,
      timeLeft: "3h left",
      category: "Exam Preparation",
      startedAgo: "2 hours ago",
      participantAvatars: ["P", "R", "M", "A"],
    },
    {
      id: 2,
      title: "Data Structures & Algorithms - Deep Dive",
      host: {
        name: "Amit Verma",
        badge: "DSA Expert",
        rating: 4.9,
      },
      participants: 6,
      capacity: 10,
      timeLeft: "2h left",
      category: "Study Session",
      startedAgo: "1 hour ago",
      participantAvatars: ["A", "S", "K", "N", "T", "R"],
    },
    {
      id: 3,
      title: "GATE 2025 - Mathematics Revision",
      host: {
        name: "Dr. Rajesh Kumar",
        badge: "Professor",
        rating: 5.0,
      },
      participants: 8,
      capacity: 12,
      timeLeft: "4h left",
      category: "Exam Preparation",
      startedAgo: "30 minutes ago",
      participantAvatars: ["R", "K", "P", "S", "M", "A", "T", "N"],
    },
  ])
  const [scheduledRooms] = useState([
    {
      id: 1,
      title: "Web Development Bootcamp - React Advanced",
      host: {
        name: "Sarah Johnson",
        badge: "Web Dev Expert",
      },
      scheduledTime: "Today 6:00 PM",
      category: "Study Session",
      registeredCount: 15,
    },
    {
      id: 2,
      title: "Database Design & SQL Mastery",
      host: {
        name: "Vikram Singh",
        badge: "Database Specialist",
      },
      scheduledTime: "Tomorrow 10:00 AM",
      category: "Project Work",
      registeredCount: 8,
    },
  ])
  const [allRooms] = useState([
    {
      id: 1,
      title: "Python for Data Science - Beginner Friendly",
      host: {
        name: "Neha Gupta",
      },
      category: "Study Session",
      participants: 3,
      capacity: 8,
      status: "Open",
    },
    {
      id: 2,
      title: "Operating Systems Concepts Discussion",
      host: {
        name: "Ravi Patel",
      },
      category: "Discussion",
      participants: 5,
      capacity: 10,
      status: "Open",
    },
    {
      id: 3,
      title: "Final Year Project - IoT Collaboration",
      host: {
        name: "Anjali Reddy",
      },
      category: "Project Work",
      participants: 4,
      capacity: 6,
      status: "Open",
    },
    {
      id: 4,
      title: "Competitive Programming Practice",
      host: {
        name: "Karthik Menon",
      },
      category: "Study Session",
      participants: 7,
      capacity: 12,
      status: "Open",
    },
    {
      id: 5,
      title: "Cloud Computing & AWS Fundamentals",
      host: {
        name: "Pooja Shah",
      },
      category: "Study Session",
      participants: 2,
      capacity: 8,
      status: "Open",
    },
    {
      id: 6,
      title: "Blockchain Technology Deep Dive",
      host: {
        name: "Arjun Mehta",
      },
      category: "Discussion",
      participants: 6,
      capacity: 10,
      status: "Open",
    },
  ])

  const studyRooms = [
    {
      id: "1",
      title: "AI & Machine Learning Study Group",
      host: "Priya Sharma",
      hostAvatar: "PS",
      hostPoints: 1250,
      hostBadges: ["AI Expert", "Top Contributor"],
      hostScore: 4.8,
      participants: 4,
      maxParticipants: 8,
      isLive: true,
      category: "Exam Preparation",
      type: "study",
      duration: "3 hours",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      title: "IELTS Speaking Practice",
      host: "Dr. Sarah Wilson",
      hostAvatar: "SW",
      hostPoints: 2100,
      hostBadges: ["Language Expert", "Verified Mentor"],
      hostScore: 4.9,
      participants: 6,
      maxParticipants: 10,
      isLive: false,
      category: "Daily Practice",
      type: "exam",
      scheduledTime: "Dec 18, 2024 10:00 AM",
      duration: "2 hours",
    },
    {
      id: "3",
      title: "Data Science Project Collaboration",
      host: "Arjun Patel",
      hostAvatar: "AP",
      hostPoints: 890,
      hostBadges: ["Project Leader"],
      hostScore: 4.6,
      participants: 3,
      maxParticipants: 6,
      isLive: true,
      category: "Project",
      type: "project",
      duration: "4 hours",
    },
    {
      id: "4",
      title: "Java Programming Deep Dive",
      host: "Rahul Kumar",
      hostAvatar: "RK",
      hostPoints: 1450,
      hostBadges: ["Java Expert", "Mentor"],
      hostScore: 4.7,
      participants: 5,
      maxParticipants: 12,
      isLive: true,
      category: "Study",
      type: "study",
      duration: "2 hours",
      createdAt: "1 hour ago",
    },
    {
      id: "5",
      title: "GRE Quantitative Reasoning",
      host: "Meera Singh",
      hostAvatar: "MS",
      hostPoints: 1890,
      hostBadges: ["GRE Expert", "Top Scorer"],
      hostScore: 4.9,
      participants: 8,
      maxParticipants: 15,
      isLive: false,
      category: "Exam Preparation",
      type: "exam",
      scheduledTime: "Dec 19, 2024 2:00 PM",
      duration: "3 hours",
    },
    {
      id: "6",
      title: "React & Next.js Project Workshop",
      host: "Vikram Reddy",
      hostAvatar: "VR",
      hostPoints: 1320,
      hostBadges: ["Full Stack Developer"],
      hostScore: 4.8,
      participants: 7,
      maxParticipants: 10,
      isLive: true,
      category: "Project",
      type: "project",
      duration: "5 hours",
      createdAt: "30 mins ago",
    },
    {
      id: "7",
      title: "GMAT Verbal Section Mastery",
      host: "Anjali Deshmukh",
      hostAvatar: "AD",
      hostPoints: 2200,
      hostBadges: ["GMAT Expert", "MBA Counselor"],
      hostScore: 5.0,
      participants: 4,
      maxParticipants: 8,
      isLive: false,
      category: "Exam Preparation",
      type: "exam",
      scheduledTime: "Dec 20, 2024 6:00 PM",
      duration: "2 hours",
    },
    {
      id: "8",
      title: "Python for Data Analysis",
      host: "Karthik Menon",
      hostAvatar: "KM",
      hostPoints: 1650,
      hostBadges: ["Data Scientist", "Python Expert"],
      hostScore: 4.7,
      participants: 9,
      maxParticipants: 15,
      isLive: true,
      category: "Study",
      type: "study",
      duration: "3 hours",
      createdAt: "45 mins ago",
    },
    {
      id: "9",
      title: "Research Paper Writing Workshop",
      host: "Dr. Pradeep Nair",
      hostAvatar: "PN",
      hostPoints: 2500,
      hostBadges: ["PhD Guide", "Research Expert"],
      hostScore: 4.9,
      participants: 5,
      maxParticipants: 10,
      isLive: false,
      category: "Discussion",
      type: "discussion",
      scheduledTime: "Dec 21, 2024 10:00 AM",
      duration: "4 hours",
    },
    {
      id: "10",
      title: "CAT Preparation - Logical Reasoning",
      host: "Sneha Gupta",
      hostAvatar: "SG",
      hostPoints: 1780,
      hostBadges: ["CAT Expert", "IIM Alumni"],
      hostScore: 4.8,
      participants: 12,
      maxParticipants: 20,
      isLive: true,
      category: "Exam Preparation",
      type: "exam",
      duration: "2 hours",
      createdAt: "15 mins ago",
    },
    {
      id: "11",
      title: "Machine Learning Algorithm Study",
      host: "Rohan Chatterjee",
      hostAvatar: "RC",
      hostPoints: 1420,
      hostBadges: ["ML Engineer"],
      hostScore: 4.6,
      participants: 6,
      maxParticipants: 10,
      isLive: false,
      category: "Study",
      type: "study",
      scheduledTime: "Dec 22, 2024 4:00 PM",
      duration: "3 hours",
    },
    {
      id: "12",
      title: "Final Year Project Guidance",
      host: "Prof. Ramesh Kumar",
      hostAvatar: "RK",
      hostPoints: 3100,
      hostBadges: ["Professor", "Project Guide"],
      hostScore: 5.0,
      participants: 8,
      maxParticipants: 12,
      isLive: true,
      category: "Project",
      type: "project",
      duration: "6 hours",
      createdAt: "3 hours ago",
    },
  ]

  const activeStudySessions = [
    {
      id: "session-1",
      title: "Calculus Problem Solving",
      participants: ["You", "Rahul K", "Meera S"],
      duration: "1h 23m",
      isRecording: true,
    },
    {
      id: "session-2",
      title: "MBA Case Study Discussion",
      participants: ["You", "Ankit P", "Divya R", "Karan M"],
      duration: "45m",
      isRecording: false,
    },
  ]

  const handleJoinRoom = (roomId: string) => {
    setSelectedRoom(roomId)
    setShowStudyRoomInterface(true)
  }

  const handleRejoinSession = (sessionId: string) => {
    console.log("[v0] Rejoining session:", sessionId)
    setShowStudyRoomInterface(true)
  }

  const categories = [
    { id: "all", name: "All Topics", color: "bg-gray-500" },
    { id: "computer-science", name: "Computer Science", color: "bg-blue-500" },
    { id: "law", name: "Law", color: "bg-purple-500" },
    { id: "agriculture", name: "Agriculture", color: "bg-green-500" },
    { id: "test-prep", name: "Test Prep", color: "bg-orange-500" },
  ]

  const discussionTopics = [
    {
      id: "usa-safety",
      name: "USA Is SAFE for Higher Education in 2025?",
      date: "Dec 15, 2024",
      participants: 156,
      status: "active",
      messages: 89,
      category: "computer-science",
    },
    {
      id: "mba-india",
      name: "Study MBA in India - Worth it or Worthless?",
      date: "Dec 12, 2024",
      participants: 134,
      status: "active",
      messages: 67,
      category: "computer-science",
    },
    {
      id: "r-software",
      name: "How many agree R software is Important in Data Analytics?",
      date: "Dec 10, 2024",
      participants: 98,
      status: "closed",
      messages: 45,
      category: "computer-science",
    },
    {
      id: "germany-canada",
      name: "Germany vs Canada: Best for Engineering Masters?",
      date: "Dec 8, 2024",
      participants: 87,
      status: "active",
      messages: 34,
      category: "computer-science",
    },
    {
      id: "ielts-toefl",
      name: "IELTS vs TOEFL: Which is easier in 2025?",
      date: "Dec 5, 2024",
      participants: 76,
      status: "closed",
      messages: 28,
      category: "test-prep",
    },
    {
      id: "law-career",
      name: "Corporate Law vs Criminal Law: Career Prospects",
      date: "Dec 3, 2024",
      participants: 45,
      status: "active",
      messages: 23,
      category: "law",
    },
    {
      id: "agri-tech",
      name: "Modern Agriculture Technology Trends 2025",
      date: "Dec 1, 2024",
      participants: 67,
      status: "active",
      messages: 31,
      category: "agriculture",
    },
  ]

  const messages = [
    {
      id: "1",
      user: {
        name: "Priya Sharma",
        avatar: "PS",
        degree: "B.Tech Computer Science",
        year: "Final Year",
        university: "IIT Delhi",
        type: "student",
      },
      content:
        "I've been researching this extensively. Based on recent data, USA remains one of the safest destinations for international students. The key is choosing the right location and university.",
      timestamp: "2 hours ago",
      loves: 23,
      connects: 12,
      stars: 8,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Dr. Rajesh Kumar",
            avatar: "RK",
            title: "Study Abroad Counselor",
            experience: "15+ years",
            type: "faculty",
          },
          content:
            "@Priya Sharma Absolutely correct! I've guided 500+ students to USA. Safety largely depends on the city and campus you choose.",
          timestamp: "1 hour ago",
          loves: 15,
          connects: 8,
          stars: 12,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Arjun Patel",
        avatar: "AP",
        degree: "MBA",
        year: "2nd Year",
        university: "ISB Hyderabad",
        type: "student",
      },
      content:
        "I disagree. With recent policy changes and increasing costs, I think students should consider alternatives like Canada or Germany. What do you all think?",
      timestamp: "3 hours ago",
      loves: 18,
      connects: 9,
      stars: 5,
      replies: [],
    },
    {
      id: "3",
      user: {
        name: "Sarah Johnson",
        avatar: "SJ",
        title: "Software Engineer",
        company: "Google",
        experience: "8 years",
        type: "professional",
      },
      content:
        "As someone who studied in USA and now works here, I can share that the experience was transformative. Yes, there are challenges, but the opportunities outweigh them.",
      timestamp: "4 hours ago",
      loves: 31,
      connects: 19,
      stars: 15,
      replies: [],
    },
  ]

  const participants = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: "PS",
      degree: "B.Tech Computer Science",
      year: "Final Year",
      university: "IIT Delhi",
      type: "student",
      contributions: 12,
      expertise: ["Programming", "AI/ML"],
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      avatar: "RK",
      degree: "Study Abroad Counselor",
      experience: "15+ years",
      institution: "MeritCap Education",
      type: "faculty",
      contributions: 8,
      expertise: ["USA", "Canada", "Admissions"],
    },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar: "SJ",
      title: "Software Engineer",
      company: "Google",
      experience: "8 years",
      type: "professional",
      contributions: 5,
      expertise: ["Tech Career", "USA Work Culture"],
    },
  ]

  const filteredTopics =
    selectedCategory === "all"
      ? discussionTopics
      : discussionTopics.filter((topic) => topic.category === selectedCategory)

  const currentTopic = discussionTopics.find((topic) => topic.id === selectedTopic)

  // State variables for study room interface
  const [activeContentTab, setActiveContentTab] = useState<"screen" | "documents" | "whiteboard">("screen")
  const [sharedDocuments, setSharedDocuments] = useState([
    {
      id: "doc-1",
      name: "Neural Networks Basics.pdf",
      type: "pdf",
      uploadedBy: "Priya Sharma",
      url: "/placeholder.svg",
    },
    {
      id: "doc-2",
      name: "AI Cheat Sheet.jpg",
      type: "image",
      uploadedBy: "You",
      url: "/placeholder.svg",
    },
  ])
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  // Whiteboard state and functions
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [whiteboardTool, setWhiteboardTool] = useState<"pen" | "eraser" | "text">("pen")
  const [drawingColor, setDrawingColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.strokeStyle = drawingColor

    if (whiteboardTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.strokeStyle = "rgba(0,0,0,1)" // Use white color for erasing
    } else {
      ctx.globalCompositeOperation = "source-over"
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handlePrevCategories = () => {
    setCategoryStartIndex(Math.max(0, categoryStartIndex - 10))
  }

  const handleNextCategories = () => {
    setCategoryStartIndex(Math.min(allCategories.length - 10, categoryStartIndex + 10))
  }

  const visibleCategories = allCategories.slice(categoryStartIndex, categoryStartIndex + 10)

  const [expertFilter, setExpertFilter] = useState("all")
  const [expertSort, setExpertSort] = useState("rating")
  const [showQABrowse, setShowQABrowse] = useState(false)
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState("all")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState<any>(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedSupportType, setSelectedSupportType] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const newExperts = [
    {
      id: "new1",
      name: "Rajesh",
      category: "industry",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      borderColor: "from-blue-500 to-blue-600",
    },
    {
      id: "new2",
      name: "Meera",
      category: "subject",
      icon: "📚",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
      borderColor: "from-purple-500 to-purple-600",
    },
    {
      id: "new3",
      name: "Amit",
      category: "student",
      icon: "🎓",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917f423e5?w=200&h=200&fit=crop",
      borderColor: "from-green-500 to-green-600",
    },
    {
      id: "new4",
      name: "Priya",
      category: "industry",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
      borderColor: "from-blue-500 to-blue-600",
    },
    {
      id: "new5",
      name: "Anand",
      category: "subject",
      icon: "📚",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      borderColor: "from-purple-500 to-purple-600",
    },
    {
      id: "new6",
      name: "Sneha",
      category: "student",
      icon: "🎓",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      borderColor: "from-green-500 to-green-600",
    },
    {
      id: "new7",
      name: "Vikram",
      category: "industry",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      borderColor: "from-blue-500 to-blue-600",
    },
    {
      id: "new8",
      name: "Ritu",
      category: "subject",
      icon: "📚",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      borderColor: "from-purple-500 to-purple-600",
    },
    {
      id: "new9",
      name: "Rahul",
      category: "student",
      icon: "🎓",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      borderColor: "from-green-500 to-green-600",
    },
    {
      id: "new10",
      name: "Sarah",
      category: "industry",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      borderColor: "from-blue-500 to-blue-600",
    },
  ]

  const industryExperts = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      title: "Senior AI Architect",
      company: "Google",
      category: "Industry Expert",
      categoryColor: "blue",
      experience: "15 Years",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      specialties: ["AI/ML", "Career Guidance", "Tech Leadership"],
      rating: 4.9,
      reviews: 250,
      responseTime: "2 hours",
      sessionsCompleted: 500,
      price: 2000,
      isOnline: true,
      nextAvailable: "Today 3:00 PM",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Product Manager",
      company: "Microsoft",
      category: "Industry Expert",
      categoryColor: "blue",
      experience: "12 Years",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      specialties: ["Product Management", "Career Switch", "Interview Prep"],
      rating: 4.8,
      reviews: 180,
      responseTime: "3 hours",
      sessionsCompleted: 350,
      price: 1800,
      isOnline: false,
      nextAvailable: "Tomorrow 10:00 AM",
    },
    {
      id: 3,
      name: "Vikram Singh",
      title: "Data Scientist",
      company: "Amazon",
      category: "Industry Expert",
      categoryColor: "blue",
      experience: "10 Years",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      specialties: ["Data Science", "Analytics", "Machine Learning"],
      rating: 4.7,
      reviews: 160,
      responseTime: "4 hours",
      sessionsCompleted: 280,
      price: 1500,
      isOnline: true,
      nextAvailable: "Today 5:00 PM",
    },
    {
      id: 4,
      name: "Priya Sharma",
      title: "Software Engineer",
      company: "Meta",
      category: "Industry Expert",
      categoryColor: "blue",
      experience: "8 Years",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      specialties: ["Full Stack", "System Design", "Coding Interview"],
      rating: 4.9,
      reviews: 220,
      responseTime: "2 hours",
      sessionsCompleted: 420,
      price: 1600,
      isOnline: true,
      nextAvailable: "Today 4:00 PM",
    },
  ]

  const subjectExperts = [
    {
      id: 5,
      name: "Prof. Meera Sharma",
      title: "Mathematics Professor",
      company: "IIT Delhi",
      category: "Subject Expert",
      categoryColor: "purple",
      experience: "Ph.D in Applied Mathematics",
      profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      specialties: ["Calculus", "Linear Algebra", "Statistics"],
      rating: 5.0,
      reviews: 180,
      responseTime: "1 hour",
      sessionsCompleted: 600,
      price: 1500,
      isOnline: true,
      nextAvailable: "Tomorrow 10:00 AM",
    },
    {
      id: 6,
      name: "Dr. Anand Patel",
      title: "Physics Faculty",
      company: "Allen Coaching",
      category: "Subject Expert",
      categoryColor: "purple",
      experience: "20 Years Teaching",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      specialties: ["Mechanics", "Thermodynamics", "JEE Physics"],
      rating: 4.9,
      reviews: 320,
      responseTime: "2 hours",
      sessionsCompleted: 850,
      price: 1200,
      isOnline: false,
      nextAvailable: "Today 6:00 PM",
    },
    {
      id: 7,
      name: "Ritu Verma",
      title: "Chemistry Instructor",
      company: "FIITJEE",
      category: "Subject Expert",
      categoryColor: "purple",
      experience: "15 Years Teaching",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      specialties: ["Organic Chemistry", "NEET Prep", "Doubt Clearing"],
      rating: 4.8,
      reviews: 240,
      responseTime: "3 hours",
      sessionsCompleted: 720,
      price: 1000,
      isOnline: true,
      nextAvailable: "Today 7:00 PM",
    },
    {
      id: 8,
      name: "Prof. Suresh Kumar",
      title: "English Literature Professor",
      company: "Delhi University",
      category: "Subject Expert",
      categoryColor: "purple",
      experience: "Ph.D in English Literature",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      specialties: ["Essay Writing", "Literature", "IELTS"],
      rating: 4.7,
      reviews: 190,
      responseTime: "4 hours",
      sessionsCompleted: 450,
      price: 800,
      isOnline: false,
      nextAvailable: "Tomorrow 11:00 AM",
    },
  ]

  const studentMentors = [
    {
      id: 9,
      name: "Amit Patel",
      title: "Software Engineer",
      company: "Microsoft",
      category: "Student Mentor",
      categoryColor: "green",
      experience: "B.Tech CSE 2021, IIT Bombay",
      profileImage: "https://images.unsplash.com/photo-1519345182560-3f2917f423e5?w=400&h=400&fit=crop",
      specialties: ["Java", "DSA", "Placement Prep", "Projects"],
      rating: 4.8,
      reviews: 95,
      responseTime: "30 min",
      sessionsCompleted: 180,
      price: 500,
      isFree: true,
      isOnline: true,
      nextAvailable: "Today 6:00 PM",
    },
    {
      id: 10,
      name: "Sneha Gupta",
      title: "Data Analyst",
      company: "Google",
      category: "Student Mentor",
      categoryColor: "green",
      experience: "B.Tech ECE 2020, IIT Delhi",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      specialties: ["Python", "Data Analysis", "Career Guidance", "Resume"],
      rating: 4.9,
      reviews: 120,
      responseTime: "1 hour",
      sessionsCompleted: 220,
      price: 600,
      isFree: false,
      isOnline: true,
      nextAvailable: "Today 8:00 PM",
    },
    {
      id: 11,
      name: "Rahul Mehta",
      title: "Product Manager",
      company: "Flipkart",
      category: "Student Mentor",
      categoryColor: "green",
      experience: "MBA 2022, IIM Ahmedabad",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      specialties: ["MBA Prep", "CAT", "Case Studies", "Interviews"],
      rating: 4.7,
      reviews: 85,
      sessionsCompleted: 150,
      price: 0,
      isFree: true,
      isOnline: false,
      nextAvailable: "Tomorrow 4:00 PM",
    },
    {
      id: 12,
      name: "Anjali Singh",
      title: "Research Scholar",
      company: "Stanford University",
      category: "Student Mentor",
      categoryColor: "green",
      experience: "MS CS 2023, Stanford",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      specialties: ["GRE", "MS Applications", "SOP", "Study Abroad"],
      rating: 5.0,
      reviews: 140,
      sessionsCompleted: 280,
      price: 800,
      isFree: false,
      isOnline: true,
      nextAvailable: "Today 9:00 PM",
    },
  ]

  const handleNextStep = () => {
    if (createRoomStep < 3) {
      setCreateRoomStep(createRoomStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (createRoomStep > 1) {
      setCreateRoomStep(createRoomStep - 1)
    }
  }

  const handleCreateRoom = () => {
    console.log("[v0] Creating room with:", {
      type: roomType,
      topic: roomTopic,
      duration: roomDuration,
      title: roomTitle,
      description: roomDescription,
      privacy: roomPrivacy,
    })
    setShowCreateRoom(false)
    setCreateRoomStep(1)
  }

  // Filter rooms based on selected filter
  const filteredRooms = roomFilter === "all" ? studyRooms : studyRooms.filter((room) => room.type === roomFilter)

  const [chatMessages, setChatMessages] = useState([
    { id: "1", name: "Priya", message: "Let's start with neural network basics", time: "2:30 PM", isOwn: false },
    { id: "2", name: "You", message: "Sounds good! I have some questions", time: "2:31 PM", isOwn: true },
    { id: "3", name: "Rahul", message: "Can we cover backpropagation?", time: "2:32 PM", isOwn: false },
  ])
  const [newChatMessage, setNewChatMessage] = useState("")
  const [inviteMethod, setInviteMethod] = useState<"email" | "whatsapp" | "app">("email")
  const [inviteEmails, setInviteEmails] = useState("")

  const handleSendMessage = () => {
    if (newChatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        name: "You",
        message: newChatMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setChatMessages([...chatMessages, newMessage])
      setNewChatMessage("")
    }
  }

  const handleSendInvites = () => {
    console.log("[v0] Sending invites via", inviteMethod, "to:", inviteEmails)
    setShowInviteModal(false)
    setInviteEmails("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <section className="relative py-12 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">1,247 members online now</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Student Community</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6 text-balance">
              Connect, Learn, and Grow Together with Students Worldwide
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions, rooms, or topics..."
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                />
              </div>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="font-semibold">5,000+ Discussions</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-semibold">100K+ Members</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span className="font-semibold">50+ Experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("discussions")}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${
                  activeTab === "discussions"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Discussions</span>
              </button>
              <button
                onClick={() => setActiveTab("rooms")}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${
                  activeTab === "rooms"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Study Rooms</span>
              </button>
              <button
                onClick={() => setActiveTab("experts")}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${
                  activeTab === "experts"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Ask Experts</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === "discussions" && (
          <div>
            {/* Clean Category Pills */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevCategories}
                  disabled={categoryStartIndex === 0}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border ${
                    categoryStartIndex === 0
                      ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 px-4">
                  {visibleCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all border ${
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-2xl">{category.icon}</div>
                      <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextCategories}
                  disabled={categoryStartIndex + 10 >= allCategories.length}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border ${
                    categoryStartIndex + 10 >= allCategories.length
                      ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Sidebar - Topics List */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-base">Topics</h3>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-xs px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="law">Law</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="test-prep">Test Prep</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowCreateTopic(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium mb-4 transition-colors"
                  >
                    + New Topic
                  </button>

                  <div className="space-y-1">
                    {filteredTopics.map((topic) => {
                      const category = categories.find((cat) => cat.id === topic.category)
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all border ${
                            selectedTopic === topic.id
                              ? "bg-blue-50 border-blue-200"
                              : "border-transparent hover:bg-gray-50"
                          }`}
                        >
                          <div className="mb-2">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium text-white ${
                                category?.color || "bg-gray-500"
                              }`}
                            >
                              {category?.name || "General"}
                            </span>
                          </div>
                          <h4 className="font-medium text-sm mb-1.5 text-gray-900 leading-snug">{topic.name}</h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {topic.participants}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {topic.messages}
                            </span>
                            <span
                              className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${
                                topic.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {topic.status}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Main Content - Messages */}
              <div className={showParticipants ? "lg:col-span-6" : "lg:col-span-9"}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Topic Header */}
                  <div className="p-5 border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">{currentTopic?.name}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {currentTopic?.participants} participants
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4" />
                            {currentTopic?.messages} messages
                          </span>
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-medium ${
                              currentTopic?.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {currentTopic?.status}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowParticipants(!showParticipants)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {showParticipants ? "Hide" : "Show"} Participants
                      </button>
                    </div>
                  </div>

                  {/* Messages Container */}
                  <div className="p-5 space-y-5 max-h-[500px] overflow-y-auto">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-3">
                        {/* Main Message */}
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">{message.user.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-semibold text-gray-900 text-sm">{message.user.name}</span>
                              <span className="text-xs text-gray-500">
                                {message.user.type === "student" &&
                                  `${message.user.degree}, ${message.user.university}`}
                                {message.user.type === "faculty" && `${message.user.title}, ${message.user.experience}`}
                                {message.user.type === "professional" &&
                                  `${message.user.title}, ${message.user.company}`}
                              </span>
                              <span className="text-xs text-gray-400 ml-auto">{message.timestamp}</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-2 border border-gray-100">
                              <p className="text-gray-700 text-sm leading-relaxed">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors">
                                <span>❤️</span>
                                <span className="text-xs">{message.loves}</span>
                              </button>
                              <button className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors">
                                <span>🤝</span>
                                <span className="text-xs">{message.connects}</span>
                              </button>
                              <button className="flex items-center gap-1.5 text-gray-600 hover:text-yellow-600 transition-colors">
                                <span>⭐</span>
                                <span className="text-xs">{message.stars}</span>
                              </button>
                              <button className="text-gray-600 hover:text-blue-600 text-xs font-medium transition-colors">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Replies */}
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="ml-12 flex gap-3 pl-4 border-l-2 border-gray-200">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-semibold text-xs">{reply.user.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-semibold text-gray-900 text-sm">{reply.user.name}</span>
                                <span className="text-xs text-gray-500">
                                  {reply.user.title}, {reply.user.experience}
                                </span>
                                <span className="text-xs text-gray-400 ml-auto">{reply.timestamp}</span>
                              </div>
                              <div className="bg-purple-50 rounded-lg p-3 mb-2 border border-purple-100">
                                <p className="text-gray-700 text-sm leading-relaxed">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-3 text-sm">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors">
                                  <span>❤️</span>
                                  <span className="text-xs">{reply.loves}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                                  <span>🤝</span>
                                  <span className="text-xs">{reply.connects}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-600 hover:text-yellow-600 transition-colors">
                                  <span>⭐</span>
                                  <span className="text-xs">{reply.stars}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-5 border-t border-gray-200 bg-gray-50">
                    {currentTopic?.status === "closed" ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🔒</span>
                        </div>
                        <p className="text-gray-700 mb-3 font-medium">This topic is closed for new messages</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                          Request to Reopen (12 requests needed)
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">You</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-2.5 focus-within:border-blue-500 transition-colors">
                          <input
                            type="text"
                            placeholder="Share your thoughts..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
                          />
                          <button className="text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-blue-50 transition-colors">
                            <span className="text-lg">📎</span>
                          </button>
                          <button className="text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-blue-50 transition-colors">
                            <span className="text-lg">🖼️</span>
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm">
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Participants */}
              {showParticipants && (
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
                    <h3 className="font-semibold text-gray-900 mb-4 text-base">Participants ({participants.length})</h3>
                    <div className="space-y-2">
                      {participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">{participant.avatar}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm">{participant.name}</h4>
                            <p className="text-xs text-gray-600">
                              {participant.type === "student" && `${participant.degree} ${participant.year}`}
                              {participant.type === "faculty" && `${participant.title}`}
                              {participant.type === "professional" && `${participant.title}`}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {participant.contributions} contributions
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "rooms" && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Rooms</h2>
                  <p className="text-gray-600">
                    Join live study sessions or create your own collaborative learning space
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateRoom(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Room
                </button>
              </div>
            </div>

            {/* Active Sessions (if user has any) */}
            {activeUserSessions.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">Your Active Sessions</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeUserSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-2">{session.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              Duration: {session.duration}
                            </span>
                            {session.recording && (
                              <span className="flex items-center gap-1.5 text-red-600">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                Recording
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Participants:</p>
                        <p className="text-sm font-medium text-gray-900">{session.participants.join(", ")}</p>
                      </div>
                      <button
                        onClick={() => handleRejoinSession(session.id.toString())}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] shadow-md"
                      >
                        Rejoin Session
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setRoomFilter("all")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  roomFilter === "all"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                All Rooms
              </button>
              <button
                onClick={() => setRoomFilter("study")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  roomFilter === "study"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Study
              </button>
              <button
                onClick={() => setRoomFilter("exam")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  roomFilter === "exam"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Target className="w-4 h-4" />
                Exam Prep
              </button>
              <button
                onClick={() => setRoomFilter("project")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  roomFilter === "project"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Projects
              </button>
              <button
                onClick={() => setRoomFilter("discussion")}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  roomFilter === "discussion"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Discussion
              </button>
            </div>

            {/* Live Rooms Section */}
            {filteredRooms.filter((room) => room.isLive).length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-red-600">LIVE NOW</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Active Study Sessions</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms
                    .filter((room) => room.isLive)
                    .map((room) => (
                      <div
                        key={room.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-100">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-red-500 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-white">LIVE</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200">
                                <Users className="w-3.5 h-3.5 text-gray-600" />
                                <span className="text-xs font-semibold text-gray-700">
                                  {room.participants}/{room.maxParticipants}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{room.duration} left</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                          <h4 className="font-bold text-gray-900 text-lg mb-3 leading-tight">{room.title}</h4>

                          {/* Host Info */}
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{room.hostAvatar}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">{room.host}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {room.hostBadges[0]}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span className="text-xs font-semibold text-gray-700">{room.hostScore}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Category & Timing */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <BookOpen className="w-4 h-4 text-green-600" />
                              <span className="font-medium">{room.category}</span>
                            </div>
                            {room.createdAt && (
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Started {room.createdAt}</span>
                              </div>
                            )}
                          </div>

                          {/* Join Button */}
                          <button
                            onClick={() => handleJoinRoom(room.id)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] shadow-md"
                          >
                            Join Now
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Scheduled Rooms Section */}
            {filteredRooms.filter((room) => !room.isLive && room.scheduledTime).length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Sessions</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms
                    .filter((room) => !room.isLive && room.scheduledTime)
                    .map((room) => (
                      <div
                        key={room.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-blue-500 px-3 py-1 rounded-full">
                                <Calendar className="w-3.5 h-3.5 text-white" />
                                <span className="text-xs font-bold text-white">SCHEDULED</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200">
                                <Users className="w-3.5 h-3.5 text-gray-600" />
                                <span className="text-xs font-semibold text-gray-700">
                                  {room.participants}/{room.maxParticipants}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                          <h4 className="font-bold text-gray-900 text-lg mb-3 leading-tight">{room.title}</h4>

                          {/* Host Info */}
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{room.hostAvatar}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">{room.host}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {room.hostBadges[0]}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span className="text-xs font-semibold text-gray-700">{room.hostScore}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Scheduled Time */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                              <Clock className="w-4 h-4" />
                              <span>{room.scheduledTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">{room.category}</span>
                            </div>
                          </div>

                          {/* Schedule Button */}
                          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] shadow-md">
                            Set Reminder
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredRooms.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Study Rooms Available</h3>
                <p className="text-gray-600 mb-6">Be the first to create a study room and start learning together!</p>
                <button
                  onClick={() => setShowCreateRoom(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Room
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "experts" && (
          <div>
            {/* Header Section */}
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ask Experts
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Connect with Industry Experts, Subject Specialists, and Student Mentors for personalized guidance
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search experts by name, specialty, or company..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all">
                    <option value="all">All Categories</option>
                    <option value="industry">Industry Experts</option>
                    <option value="subject">Subject Experts</option>
                    <option value="student">Student Mentors</option>
                  </select>
                  <select className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all">
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4+ Stars</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 mt-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-800">New Experts This Week</h3>
                </div>
                <span className="text-sm text-purple-600 font-semibold">8 New</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {newExperts.slice(0, 8).map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-white rounded-xl p-3 border border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-0.5 rounded-full bg-gradient-to-br ${expert.borderColor}`}>
                        <img
                          src={expert.image || "/placeholder.svg"}
                          alt={expert.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <div className="text-center w-full">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {expert.name}
                        </p>
                        <p className="text-[10px] text-gray-500 capitalize mt-0.5">
                          {expert.category === "industry" && "Industry"}
                          {expert.category === "subject" && "Subject"}
                          {expert.category === "student" && "Student"}
                        </p>
                        <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-0.5 rounded-full text-[9px] font-bold mt-1">
                          NEW
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Experts Section */}
            <div className="space-y-6 mt-12">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Real Industry Experts</h3>
                  </div>
                  <p className="text-gray-600 ml-13">
                    Get career guidance and industry insights from professionals working in top companies
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                  View All
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {industryExperts.map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="white" opacity="0.3" />
                          <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="white" opacity="0.2" />
                        </svg>
                      </div>
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {expert.isOnline && (
                          <div className="bg-white/90 backdrop-blur-sm text-green-600 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            Available
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-yellow-400 p-1.5 rounded-full">
                          <Award className="w-4 h-4 text-yellow-700" />
                        </div>
                      </div>
                    </div>

                    <div className="relative px-5 pb-5">
                      <div className="flex justify-center -mt-10 mb-4">
                        <img
                          src={expert.profileImage || "/placeholder.svg"}
                          alt={expert.name}
                          className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-base font-bold text-gray-800">{expert.rating}</span>
                      </div>

                      <div className="text-center mb-3">
                        <h4 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{expert.name}</h4>
                        <p className="text-sm text-gray-600 mb-0.5 line-clamp-1">{expert.title}</p>
                        <p className="text-xs text-blue-600 font-semibold line-clamp-1">@ {expert.company}</p>
                      </div>

                      <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold text-sm transition-all transform group-hover:scale-105">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Matter Experts Section */}
            <div className="space-y-6 mt-12">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Subject Matter Experts</h3>
                  </div>
                  <p className="text-gray-600 ml-13">
                    Learn from experienced faculty and trainers who specialize in teaching
                  </p>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2">
                  View All
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjectExperts.map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-white rounded-2xl shadow-md border-2 border-purple-100 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Academic header with book pattern */}
                    <div className="relative h-24 bg-gradient-to-br from-purple-100 via-purple-50 to-white overflow-hidden border-b-2 border-purple-200">
                      <div className="absolute inset-0">
                        <div className="absolute top-2 left-2 w-8 h-8 border-2 border-purple-300 rounded opacity-20"></div>
                        <div className="absolute top-4 right-4 w-6 h-6 border-2 border-purple-300 rounded opacity-20"></div>
                        <div className="absolute bottom-2 left-1/2 w-10 h-10 border-2 border-purple-300 rounded opacity-20"></div>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        {expert.isOnline && (
                          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            Online
                          </div>
                        )}
                        <div className="bg-purple-500 p-1.5 rounded-full shadow-sm">
                          <Award className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="relative px-4 pb-5 pt-2">
                      {/* Profile section */}
                      <div className="flex items-start gap-3 mb-3 -mt-8">
                        <img
                          src={expert.profileImage || "/placeholder.svg"}
                          alt={expert.name}
                          className="w-16 h-16 rounded-xl border-3 border-white shadow-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 pt-8">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-gray-800">{expert.rating}</span>
                            <BookOpen className="w-3 h-3 text-purple-500 ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Info section */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-base font-bold text-gray-800 line-clamp-1">{expert.name}</h4>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600 line-clamp-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                            {expert.title}
                          </p>
                          <p className="text-xs text-purple-600 font-semibold line-clamp-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                            {expert.company}
                          </p>
                        </div>
                      </div>

                      <button className="w-full py-2.5 bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white rounded-xl font-semibold text-sm transition-all transform group-hover:scale-105">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Mentors Section */}
            <div className="space-y-6 mt-12">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Student Mentors</h3>
                  </div>
                  <p className="text-gray-600 ml-13">
                    Connect with successful students who understand your journey and can guide you
                  </p>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                  View All
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {studentMentors.map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative h-20 bg-gradient-to-br from-green-400 via-green-500 to-green-600 overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="white" opacity="0.3" />
                          <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="white" opacity="0.2" />
                        </svg>
                      </div>
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {expert.isOnline && (
                          <div className="bg-white/90 backdrop-blur-sm text-green-600 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            Available
                          </div>
                        )}
                        {expert.isFree && (
                          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                            FREE
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-yellow-400 p-1.5 rounded-full">
                          <Award className="w-4 h-4 text-yellow-700" />
                        </div>
                      </div>
                    </div>

                    <div className="relative px-5 pb-5">
                      <div className="flex justify-center -mt-10 mb-4">
                        <img
                          src={expert.profileImage || "/placeholder.svg"}
                          alt={expert.name}
                          className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-base font-bold text-gray-800">{expert.rating}</span>
                      </div>

                      <div className="text-center mb-3">
                        <h4 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{expert.name}</h4>
                        <p className="text-sm text-gray-600 mb-0.5 line-clamp-1">{expert.title}</p>
                        <p className="text-xs text-green-600 font-semibold line-clamp-1">@ {expert.company}</p>
                      </div>

                      <button className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold text-sm transition-all transform group-hover:scale-105">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showCreateRoom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Create Study Room</h3>
                <button
                  onClick={() => {
                    setShowCreateRoom(false)
                    setCreateRoomStep(1)
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Progress Indicator */}
              <div className="flex gap-2 mt-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      createRoomStep >= step ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
              {/* Step 1: Room Type & Topic */}
              {createRoomStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Room Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "study", icon: "📚", label: "Study" },
                        { id: "exam", icon: "🎯", label: "Exam Prep" },
                        { id: "project", icon: "📝", label: "Project" },
                        { id: "discussion", icon: "🧠", label: "Discussion" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setRoomType(type.id as any)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            roomType === type.id
                              ? "border-emerald-500 bg-emerald-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-1">{type.icon}</div>
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Study Topic</label>
                    <select
                      value={roomTopic}
                      onChange={(e) => setRoomTopic(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select a topic...</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="data-science">Data Science</option>
                      <option value="web-dev">Web Development</option>
                      <option value="mobile-dev">Mobile Development</option>
                      <option value="ielts">IELTS Preparation</option>
                      <option value="gre">GRE Preparation</option>
                      <option value="gmat">GMAT Preparation</option>
                      <option value="cat">CAT Preparation</option>
                      <option value="project">Project Development</option>
                      <option value="research">Research Writing</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Duration & Privacy */}
              {createRoomStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Duration</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1", "2", "4", "8"].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setRoomDuration(duration)}
                          className={`py-3 rounded-lg border-2 transition-all ${
                            roomDuration === duration
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-lg font-bold">{duration}h</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Privacy</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setRoomPrivacy("public")}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                          roomPrivacy === "public"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Globe className="w-5 h-5 text-emerald-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">Public</div>
                          <div className="text-xs text-gray-600">Anyone can join</div>
                        </div>
                        {roomPrivacy === "public" && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => setRoomPrivacy("private")}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                          roomPrivacy === "private"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Lock className="w-5 h-5 text-emerald-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">Private</div>
                          <div className="text-xs text-gray-600">Invite only</div>
                        </div>
                        {roomPrivacy === "private" && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      </button>
                    </div>

                    {roomPrivacy === "private" && (
                      <button
                        onClick={() => setShowInviteModal(true)}
                        className="w-full mt-3 px-4 py-2.5 bg-white border-2 border-emerald-500 text-emerald-700 rounded-lg hover:bg-emerald-50 font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        Invite Participants
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Title & Description */}
              {createRoomStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Room Title</label>
                    <input
                      type="text"
                      value={roomTitle}
                      onChange={(e) => setRoomTitle(e.target.value)}
                      placeholder="e.g., AI Study Group - Neural Networks"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      maxLength={100}
                    />
                    <p className="text-xs text-gray-500 mt-1">{roomTitle.length}/100</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={roomDescription}
                      onChange={(e) => setRoomDescription(e.target.value)}
                      placeholder="What will you be studying?"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">{roomDescription.length}/500</p>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Summary</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium capitalize">{roomType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{roomDuration}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Privacy:</span>
                        <span className="font-medium capitalize">{roomPrivacy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t flex gap-3">
              <button
                onClick={() => {
                  if (createRoomStep === 1) {
                    setShowCreateRoom(false)
                    setCreateRoomStep(1)
                  } else {
                    setCreateRoomStep(createRoomStep - 1)
                  }
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-all"
              >
                {createRoomStep === 1 ? "Cancel" : "Back"}
              </button>
              <button
                onClick={() => {
                  if (createRoomStep === 3) {
                    handleCreateRoom()
                  } else {
                    setCreateRoomStep(createRoomStep + 1)
                  }
                }}
                disabled={
                  (createRoomStep === 1 && !roomTopic) || (createRoomStep === 3 && (!roomTitle || !roomDescription))
                }
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createRoomStep === 3 ? "Create Room" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Invite Participants</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Invite Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setInviteMethod("email")}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      inviteMethod === "email"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Mail className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <div className="text-xs font-medium">Email</div>
                  </button>
                  <button
                    onClick={() => setInviteMethod("whatsapp")}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      inviteMethod === "whatsapp"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <MessageCircle className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <div className="text-xs font-medium">WhatsApp</div>
                  </button>
                  <button
                    onClick={() => setInviteMethod("app")}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      inviteMethod === "app"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <div className="text-xs font-medium">In App</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {inviteMethod === "email" && "Email Addresses"}
                  {inviteMethod === "whatsapp" && "Phone Numbers"}
                  {inviteMethod === "app" && "Usernames"}
                </label>
                <textarea
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder={
                    inviteMethod === "email"
                      ? "Enter emails separated by commas\ne.g., user1@email.com, user2@email.com"
                      : inviteMethod === "whatsapp"
                        ? "Enter phone numbers separated by commas\ne.g., +919876543210, +919876543211"
                        : "Enter usernames separated by commas\ne.g., @rahul_k, @meera_s"
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  {inviteMethod === "email" && "Participants will receive an email invitation with a join link"}
                  {inviteMethod === "whatsapp" && "Participants will receive a WhatsApp message with the room details"}
                  {inviteMethod === "app" && "Participants will receive an in-app notification"}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t rounded-b-xl flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvites}
                disabled={!inviteEmails.trim()}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Invites
              </button>
            </div>
          </div>
        </div>
      )}

      {showStudyRoomInterface && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">AI & Machine Learning Study Group</h3>
                <div className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">LIVE</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>1:23:45</span>
                </div>
              </div>
              <button
                onClick={() => setShowStudyRoomInterface(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Side - Content Area */}
              <div className="flex-1 flex flex-col bg-gray-900">
                {/* Content Tabs */}
                <div className="flex border-b border-gray-700 bg-gray-800">
                  <button
                    onClick={() => setActiveContentTab("screen")}
                    className={`px-6 py-3 text-sm font-semibold flex items-center gap-2 transition-all ${
                      activeContentTab === "screen"
                        ? "border-b-2 border-blue-500 text-blue-400 bg-gray-900"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Screen Share
                  </button>
                  <button
                    onClick={() => setActiveContentTab("documents")}
                    className={`px-6 py-3 text-sm font-semibold flex items-center gap-2 transition-all ${
                      activeContentTab === "documents"
                        ? "border-b-2 border-blue-500 text-blue-400 bg-gray-900"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveContentTab("whiteboard")}
                    className={`px-6 py-3 text-sm font-semibold flex items-center gap-2 transition-all ${
                      activeContentTab === "whiteboard"
                        ? "border-b-2 border-blue-500 text-blue-400 bg-gray-900"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Whiteboard
                  </button>
                </div>

                {/* Content Display Area */}
                <div className="flex-1 bg-gray-900 relative overflow-hidden">
                  {activeContentTab === "screen" && (
                    <div className="h-full flex items-center justify-center animate-in fade-in duration-300">
                      <div className="text-white text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                          <Video className="w-16 h-16" />
                        </div>
                        <p className="text-xl mb-6 text-gray-300">Screen sharing will appear here</p>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105">
                          Start Screen Share
                        </button>
                      </div>
                    </div>
                  )}

                  {activeContentTab === "documents" && (
                    <div className="h-full bg-gray-800 flex flex-col animate-in fade-in duration-300">
                      <div className="p-4 border-b border-gray-700 bg-gray-900">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white">Shared Documents (3)</h4>
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105">
                            <Upload className="w-4 h-4" />
                            Upload
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 p-6 overflow-y-auto">
                        <div className="grid gap-4">
                          {[
                            { name: "Neural Networks Presentation.pdf", size: "2.3 MB", uploadedBy: "Priya S." },
                            { name: "Machine Learning Notes.docx", size: "856 KB", uploadedBy: "You" },
                            { name: "Dataset Analysis.xlsx", size: "1.1 MB", uploadedBy: "Rahul K." },
                          ].map((doc, index) => (
                            <div
                              key={index}
                              className="bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition-all duration-200 cursor-pointer border border-gray-600"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                  <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-white">{doc.name}</h5>
                                  <p className="text-sm text-gray-400">
                                    {doc.size} • Uploaded by {doc.uploadedBy}
                                  </p>
                                </div>
                                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">Open</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeContentTab === "whiteboard" && (
                    <div className="h-full bg-white flex flex-col animate-in fade-in duration-300">
                      <div className="p-3 border-b bg-gray-50 flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                          <div className="w-6 h-6 bg-black rounded"></div>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                          <div className="w-6 h-6 border-2 border-black rounded"></div>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                          <div className="w-6 h-6 border-2 border-black rounded-full"></div>
                        </button>
                        <div className="h-6 w-px bg-gray-300 mx-2"></div>
                        <button className="px-3 py-1 hover:bg-gray-200 rounded-lg text-sm font-medium transition-all">
                          Clear
                        </button>
                      </div>
                      <div className="flex-1 bg-white relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="text-6xl mb-4">✏️</div>
                            <p>Start drawing on the whiteboard</p>
                          </div>
                        </div>
                        {/* Canvas element would go here for actual drawing */}
                        {/* <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} className="absolute inset-0 w-full h-full"></canvas> */}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-gray-800 border-t border-gray-700">
                  <div className="flex items-center justify-center gap-4">
                    <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-lg">
                      <Phone className="w-6 h-6" />
                    </button>
                    <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Participants & Chat */}
              <div className="w-80 bg-white border-l flex flex-col">
                {/* Participants */}
                <div className="p-4 border-b">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Participants (4/8)
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        name: "Priya Sharma",
                        status: "Host",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                      },
                      {
                        name: "You",
                        status: "Speaking",
                        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
                      },
                      {
                        name: "Rahul Kumar",
                        status: "Online",
                        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
                      },
                      {
                        name: "Meera Shah",
                        status: "Online",
                        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                      },
                    ].map((participant, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all"
                      >
                        <img
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-800">{participant.name}</p>
                          <p className="text-xs text-gray-500">{participant.status}</p>
                        </div>
                        {participant.status === "Speaking" && (
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse delay-75"></div>
                            <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse delay-150"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b bg-gray-50">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                      Chat
                    </h4>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                    {chatMessages.map((chat) => (
                      <div key={chat.id} className={`text-sm ${chat.isOwn ? "flex justify-end" : ""}`}>
                        <div
                          className={`max-w-[80%] ${chat.isOwn ? "bg-emerald-600 text-white" : "bg-white"} rounded-lg p-3 shadow-sm`}
                        >
                          {!chat.isOwn && (
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-emerald-600 text-xs">{chat.name}</p>
                              <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                          )}
                          <p className={chat.isOwn ? "text-white" : "text-gray-700"}>{chat.message}</p>
                          {chat.isOwn && <div className="text-xs text-emerald-100 mt-1 text-right">{chat.time}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newChatMessage}
                        onChange={(e) => setNewChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newChatMessage.trim()}
                        className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDocumentUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Upload Document</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer inline-block"
                >
                  Choose Files
                </label>
              </div>
              <div className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDocumentUpload(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

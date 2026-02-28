"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { UnauthorizedAccess } from "@/components/unauthorized-access"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  MessageSquare,
  Settings,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  GraduationCap,
  Bell,
  Download,
  User,
  MapPin,
  Phone,
  Mail,
  LogOut,
} from "lucide-react"

interface StudentApplication {
  id: string
  studentName: string
  email: string
  phone: string
  program: string
  country: string
  applicationDate: string
  status: "pending" | "under-review" | "accepted" | "rejected" | "waitlisted"
  documents: {
    academic: number
    personal: number
    financial: number
    total: number
  }
  gpa: string
  testScores: {
    ielts?: string
    toefl?: string
    gre?: string
    gmat?: string
  }
  priority: "high" | "medium" | "low"
  lastActivity: string
  profileCompletion: number
}

export default function CollegeDashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [collegeData, setCollegeData] = useState<any>(null)
  const [applications, setApplications] = useState<StudentApplication[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [hasUnauthorizedAccess, setHasUnauthorizedAccess] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return
    }

    // Check authentication with new auth context
    if (!user) {
      router.push("/login")
      return
    }

    // Check if user has COLLEGE role
    if (user.role !== "COLLEGE") {
      setHasUnauthorizedAccess(true)
      return
    }

    setHasUnauthorizedAccess(false)

    // Set college data from user
    setCollegeData({
      email: user.email,
      name: user.name || user.username,
      role: user.role,
      collegeId: user.user_id,
      collegeName: user.name || "College Partner",
      pendingApplications: 45,
      loginTime: new Date().toISOString(),
    })

    // Mock applications data
    const mockApplications: StudentApplication[] = [
      {
        id: "APP001",
        studentName: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        phone: "+91 9876543210",
        program: "Master of Computer Science",
        country: "India",
        applicationDate: "2024-01-15",
        status: "pending",
        documents: { academic: 3, personal: 2, financial: 1, total: 6 },
        gpa: "8.5/10",
        testScores: { ielts: "7.5", gre: "325" },
        priority: "high",
        lastActivity: "2 hours ago",
        profileCompletion: 95,
      },
      {
        id: "APP002",
        studentName: "Priya Patel",
        email: "priya.patel@email.com",
        phone: "+91 9876543211",
        program: "MBA",
        country: "India",
        applicationDate: "2024-01-14",
        status: "under-review",
        documents: { academic: 4, personal: 2, financial: 2, total: 8 },
        gpa: "9.2/10",
        testScores: { ielts: "8.0", gmat: "720" },
        priority: "high",
        lastActivity: "1 day ago",
        profileCompletion: 100,
      },
      {
        id: "APP003",
        studentName: "David Chen",
        email: "david.chen@email.com",
        phone: "+1 555-0123",
        program: "Master of Engineering",
        country: "USA",
        applicationDate: "2024-01-13",
        status: "accepted",
        documents: { academic: 4, personal: 3, financial: 2, total: 9 },
        gpa: "3.8/4.0",
        testScores: { toefl: "110", gre: "330" },
        priority: "medium",
        lastActivity: "3 days ago",
        profileCompletion: 100,
      },
    ]

    setApplications(mockApplications)
    setLoading(false)
  }, [router, user, authLoading])

  const handleStatusUpdate = (applicationId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus as any } : app)),
    )

    const statusUpdate = {
      applicationId,
      status: newStatus,
      timestamp: new Date().toISOString(),
      collegeName: collegeData?.collegeName || "University",
    }

    // Store status update for student dashboard to pick up
    const existingUpdates = JSON.parse(localStorage.getItem("application_status_updates") || "[]")
    existingUpdates.push(statusUpdate)
    localStorage.setItem("application_status_updates", JSON.stringify(existingUpdates))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under-review":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "waitlisted":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "applications", label: "Applications", icon: Users },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "communications", label: "Communications", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Show loading while authentication is being checked or data is loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <p className="text-gray-600">Loading college dashboard...</p>
        </div>
      </div>
    )
  }

  // Show unauthorized access page if user doesn't have college role
  if (hasUnauthorizedAccess) {
    return (
      <UnauthorizedAccess
        message="College Access Required"
        allowedRoles={["College Partner"]}
        userRole={user?.role}
      />
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar - Fixed Left Navigation */}
      <div className="w-64 bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 text-white flex flex-col shadow-2xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-purple-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-xl border border-white/30">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MeritCap</h1>
              <p className="text-xs text-purple-100">College Portal</p>
            </div>
          </div>
        </div>

        {/* College Info */}
        <div className="px-6 py-4 bg-white/10 border-b border-purple-500/30">
          <p className="text-sm font-medium text-purple-100">Logged in as:</p>
          <p className="text-base font-semibold text-white truncate">{collegeData?.collegeName}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${isActive
                      ? "bg-white text-purple-600 shadow-lg font-semibold"
                      : "text-purple-100 hover:bg-purple-500/20 hover:text-white"
                      }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-purple-200"}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-purple-500/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-purple-100 hover:bg-red-500/20 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "applications" && "Applications Management"}
                {activeTab === "documents" && "Documents"}
                {activeTab === "analytics" && "Analytics & Reports"}
                {activeTab === "communications" && "Communications"}
                {activeTab === "settings" && "Settings"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {collegeData?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{collegeData?.name?.charAt(0) || "C"}</span>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{collegeData?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || "College"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">{activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Review</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {applications.filter((app) => app.status === "pending").length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Accepted</p>
                      <p className="text-2xl font-bold text-green-600">
                        {applications.filter((app) => app.status === "accepted").length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-blue-600">128</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{app.studentName}</h4>
                          <p className="text-sm text-gray-500">{app.program}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace("-", " ").toUpperCase()}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => setActiveTab("applications")}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Student Applications</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search applications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under-review">Under Review</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredApplications.map((app) => (
                  <Card key={app.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{app.studentName}</h3>
                            <p className="text-gray-600">{app.program}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{app.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{app.phone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{app.country}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className={`w-4 h-4 ${getPriorityColor(app.priority)}`} />
                          <Badge className={getStatusColor(app.status)}>
                            {app.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">GPA</p>
                          <p className="font-semibold text-gray-900">{app.gpa}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Documents</p>
                          <p className="font-semibold text-gray-900">{app.documents.total}/10</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Profile</p>
                          <p className="font-semibold text-gray-900">{app.profileCompletion}%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Applied</p>
                          <p className="font-semibold text-gray-900">{app.applicationDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {Object.entries(app.testScores).map(([test, score]) => (
                            <div key={test} className="text-sm">
                              <span className="text-gray-600">{test.toUpperCase()}:</span>
                              <span className="font-medium ml-1">{score}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Documents
                          </Button>
                          {app.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusUpdate(app.id, "accepted")}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusUpdate(app.id, "rejected")}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

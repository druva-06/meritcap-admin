"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Phone, Mail, Edit, Download, FileText, GraduationCap, Globe, DollarSign, CheckCircle, Clock, AlertCircle, User, Building2, Upload, MessageSquare } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration purposes
const mockData = {
  leads: [
    {
      id: "STU-1247",
      qualification: {
        verticals: ["study-abroad"],
        countries: ["USA"],
      },
    },
  ],
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [statusNotes, setStatusNotes] = useState("")

  // Sample application data
  const application = {
    id: params.id,
    applicationNumber: "APP-2024-001",
    status: "Under Review",
    progress: 65,
    submittedDate: "2024-01-15",
    lastUpdated: "2024-03-20",
    deadline: "2024-04-30",
    student: {
      id: "STU-1247",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    college: {
      id: "COL-001",
      name: "Harvard University",
      country: "USA",
      city: "Cambridge, MA",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Harvard",
      ranking: "#1 in USA",
    },
    course: {
      name: "Master of Business Administration (MBA)",
      duration: "2 years",
      intake: "Fall 2025",
      startDate: "September 2025",
      tuitionFee: "$73,440/year",
      applicationFee: "$250",
    },
    commission: {
      collegeCommission: "$5,000",
      subAgentCommission: "$1,500",
      meritcapRevenue: "$3,500",
      totalCommission: "$5,000",
      commissionStatus: "Pending",
      paymentTerms: "After enrollment confirmation",
    },
    counselor: {
      name: "Amit Kumar",
      email: "amit.kumar@meritcap.com",
      phone: "+91 98765 00001",
    },
    subAgent: {
      name: "Global Education Partners",
      contactPerson: "Rajesh Gupta",
      email: "rajesh@globaledu.com",
    },
  }

  // Application timeline
  const timeline = [
    {
      id: 1,
      status: "Draft Created",
      date: "2024-01-10",
      time: "10:30 AM",
      user: "Amit Kumar",
      notes: "Application draft created for Priya Sharma",
      icon: FileText,
      color: "bg-gray-100 text-gray-700",
    },
    {
      id: 2,
      status: "Documents Uploaded",
      date: "2024-01-12",
      time: "02:15 PM",
      user: "Priya Sharma",
      notes: "All required documents uploaded by student",
      icon: Upload,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      status: "Application Submitted",
      date: "2024-01-15",
      time: "11:00 AM",
      user: "Amit Kumar",
      notes: "Application submitted to Harvard University",
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      status: "Under Review",
      date: "2024-01-20",
      time: "09:30 AM",
      user: "Harvard Admissions",
      notes: "Application is under review by admissions committee",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 5,
      status: "Additional Documents Requested",
      date: "2024-02-05",
      time: "03:45 PM",
      user: "Harvard Admissions",
      notes: "Requested updated bank statement and recommendation letter",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 6,
      status: "Documents Submitted",
      date: "2024-02-10",
      time: "10:20 AM",
      user: "Priya Sharma",
      notes: "Additional documents submitted",
      icon: Upload,
      color: "bg-blue-100 text-blue-700",
    },
  ]

  // Required documents
  const documents = [
    { id: 1, name: "Passport Copy", status: "Verified", uploadedDate: "2024-01-12", size: "2.3 MB" },
    { id: 2, name: "Academic Transcripts", status: "Verified", uploadedDate: "2024-01-12", size: "1.8 MB" },
    { id: 3, name: "Degree Certificate", status: "Verified", uploadedDate: "2024-01-12", size: "1.2 MB" },
    { id: 4, name: "IELTS Score Report", status: "Verified", uploadedDate: "2024-01-12", size: "0.8 MB" },
    { id: 5, name: "GRE Score Report", status: "Verified", uploadedDate: "2024-01-12", size: "0.6 MB" },
    { id: 6, name: "Statement of Purpose", status: "Verified", uploadedDate: "2024-01-12", size: "0.5 MB" },
    { id: 7, name: "Letter of Recommendation 1", status: "Verified", uploadedDate: "2024-01-12", size: "0.4 MB" },
    { id: 8, name: "Letter of Recommendation 2", status: "Verified", uploadedDate: "2024-01-12", size: "0.4 MB" },
    { id: 9, name: "Resume/CV", status: "Verified", uploadedDate: "2024-01-12", size: "0.3 MB" },
    { id: 10, name: "Bank Statement", status: "Verified", uploadedDate: "2024-02-10", size: "1.5 MB" },
    { id: 11, name: "Financial Affidavit", status: "Pending", uploadedDate: "-", size: "-" },
    { id: 12, name: "Passport Size Photos", status: "Verified", uploadedDate: "2024-01-12", size: "0.2 MB" },
  ]

  // Communication history
  const communications = [
    {
      id: 1,
      type: "email",
      date: "2024-03-20",
      time: "10:30 AM",
      from: "Amit Kumar",
      to: "Priya Sharma",
      subject: "Application Status Update",
      message: "Your application is progressing well. The admissions committee is reviewing your profile.",
    },
    {
      id: 2,
      type: "call",
      date: "2024-03-15",
      time: "02:15 PM",
      from: "Amit Kumar",
      to: "Priya Sharma",
      subject: "Document Submission Confirmation",
      message: "Confirmed receipt of additional documents. Application is back under review.",
    },
    {
      id: 3,
      type: "email",
      date: "2024-02-05",
      time: "04:00 PM",
      from: "Harvard Admissions",
      to: "Amit Kumar",
      subject: "Additional Documents Required",
      message: "Please submit updated bank statement and an additional recommendation letter.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
      case "Approved":
      case "Offer Received":
      case "Accepted":
      case "Enrolled":
        return "bg-green-100 text-green-700"
      case "Under Review":
      case "Submitted":
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Pending":
      case "Documents Requested":
        return "bg-yellow-100 text-yellow-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleStatusUpdate = () => {
    console.log("[v0] Updating status to:", newStatus, "with notes:", statusNotes)
    setStatusUpdateOpen(false)
    setNewStatus("")
    setStatusNotes("")
  }

  // Dynamic workflow stages based on vertical
  const getWorkflowStages = () => {
    // Get lead data to determine vertical
    const leadData = mockData.leads.find(lead => lead.id === application.student.id)
    const verticals = leadData?.qualification?.verticals || []
    const country = leadData?.qualification?.countries?.[0] || 'USA'

    // Workflow templates from settings (in production, this would come from API/database)
    const workflowTemplates: any = {
      'study-abroad-USA': [
        { name: 'Lead Qualification', completed: true },
        { name: 'Counseling Session', completed: true },
        { name: 'University Application', completed: true },
        { name: 'Document Verification', completed: true },
        { name: 'Financial Verification', completed: false },
        { name: 'Fees Payment', completed: false },
        { name: 'Visa Application', completed: false },
        { name: 'Visa Interview', completed: false },
        { name: 'Visa Approval', completed: false },
        { name: 'Pre-departure Training', completed: false },
        { name: 'Enrollment', completed: false },
      ],
      'study-abroad-UK': [
        { name: 'Lead Qualification', completed: true },
        { name: 'Counseling Session', completed: true },
        { name: 'University Application', completed: true },
        { name: 'Document Verification', completed: true },
        { name: 'Financial Verification', completed: false },
        { name: 'Fees Payment', completed: false },
        { name: 'Visa Application', completed: false },
        { name: 'Visa Approval', completed: false },
        { name: 'Enrollment', completed: false },
      ],
      'study-abroad-default': [
        { name: 'Lead Qualification', completed: true },
        { name: 'Counseling Session', completed: true },
        { name: 'University Application', completed: true },
        { name: 'Document Verification', completed: true },
        { name: 'Financial Verification', completed: false },
        { name: 'Fees Payment', completed: false },
        { name: 'Visa Application', completed: false },
        { name: 'Visa Interview', completed: false },
        { name: 'Visa Approval', completed: false },
        { name: 'Enrollment', completed: false },
      ],
      'study-india': [
        { name: 'Lead Qualification', completed: true },
        { name: 'Counseling Session', completed: true },
        { name: 'College Application', completed: true },
        { name: 'Entrance Exam Preparation', completed: true },
        { name: 'Document Verification', completed: false },
        { name: 'Fees Payment', completed: false },
        { name: 'Enrollment', completed: false },
      ],
      'study-online': [
        { name: 'Lead Qualification', completed: true },
        { name: 'Counseling Session', completed: true },
        { name: 'Program Selection', completed: true },
        { name: 'Document Verification', completed: false },
        { name: 'Fees Payment', completed: false },
        { name: 'Enrollment', completed: false },
      ],
    }

    // Select appropriate workflow template
    if (verticals.includes('study-abroad')) {
      const templateKey = `study-abroad-${country}`
      return workflowTemplates[templateKey] || workflowTemplates['study-abroad-default']
    } else if (verticals.includes('study-india')) {
      return workflowTemplates['study-india']
    } else if (verticals.includes('study-online')) {
      return workflowTemplates['study-online']
    }

    // Default fallback
    return workflowTemplates['study-abroad-default']
  }

  const workflowStages = getWorkflowStages()
  const completedStages = workflowStages.filter(stage => stage.completed).length
  const totalStages = workflowStages.length
  const workflowProgress = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{application.applicationNumber}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {application.student.name} → {application.college.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
            onClick={() => router.push(`/admin/applications/${params.id}/edit`)}
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Application Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-semibold text-blue-600">{workflowProgress}%</span>
            </div>
            <Progress value={workflowProgress} className="h-2" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
              {workflowStages.map((stage, index) => (
                <div key={index} className={`p-3 rounded-lg border-2 ${stage.completed ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {stage.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-xs font-medium ${stage.completed ? 'text-green-700' : 'text-gray-600'}`}>
                      Step {index + 1}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${stage.completed ? 'text-green-900' : 'text-gray-700'}`}>
                    {stage.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                <p className="text-xs text-gray-500 mt-2">Updated {application.lastUpdated}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Progress</p>
                <p className="text-lg font-bold text-blue-600">{application.progress}%</p>
                <Progress value={application.progress} className="h-1 mt-2" />
                <p className="text-xs text-gray-500 mt-1">On track</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Documents</p>
                <p className="text-lg font-bold text-green-600">
                  {documents.filter((d) => d.status === "Verified").length}/{documents.length}
                </p>
                <Progress
                  value={(documents.filter((d) => d.status === "Verified").length / documents.length) * 100}
                  className="h-1 mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Verified</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Commission</p>
                <p className="text-lg font-bold text-orange-600">{application.commission.totalCommission}</p>
                <Badge className="mt-2 bg-orange-100 text-orange-700">{application.commission.commissionStatus}</Badge>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <Phone className="w-4 h-4" />
              Call Student
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Mail className="w-4 h-4" />
              Email Student
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <MessageSquare className="w-4 h-4" />
              Contact College
            </Button>
            <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                  <Edit className="w-4 h-4" />
                  Update Status
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Application Status</DialogTitle>
                  <DialogDescription>Change the status of this application and add notes.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Status</label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Under Review">Under Review</SelectItem>
                        <SelectItem value="Documents Requested">Documents Requested</SelectItem>
                        <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                        <SelectItem value="Offer Received">Offer Received</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      placeholder="Add notes about this status change..."
                      value={statusNotes}
                      onChange={(e) => setStatusNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setStatusUpdateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleStatusUpdate} className="bg-blue-600 hover:bg-blue-700">
                    Update Status
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
              onClick={() => router.push(`/admin/applications/${params.id}/documents`)}
            >
              <FileText className="w-4 h-4" />
              Manage Documents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <FileText className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-2">
            <Clock className="w-4 h-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="commission" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Commission
          </TabsTrigger>
          <TabsTrigger value="communication" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Communication
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={application.student.photo || "/placeholder.svg"}
                    alt={application.student.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{application.student.name}</p>
                    <p className="text-sm text-gray-500">{application.student.id}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{application.student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{application.student.phone}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => router.push(`/admin/students/${application.student.id}`)}
                >
                  View Student Profile
                </Button>
              </CardContent>
            </Card>

            {/* College Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  College Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={application.college.logo || "/placeholder.svg"}
                    alt={application.college.name}
                    className="w-12 h-12 rounded-lg border border-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{application.college.name}</p>
                    <p className="text-sm text-gray-500">{application.college.ranking}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {application.college.city}, {application.college.country}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => router.push(`/admin/colleges/${application.college.id}`)}
                >
                  View College Profile
                </Button>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Course Name</p>
                  <p className="text-sm font-medium text-gray-900">{application.course.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium">{application.course.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Intake</p>
                    <p className="text-sm font-medium">{application.course.intake}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="text-sm font-medium">{application.course.startDate}</p>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Tuition Fee</p>
                    <p className="text-lg font-bold text-blue-600">{application.course.tuitionFee}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">Application Fee</p>
                    <p className="text-sm font-semibold text-gray-700">{application.course.applicationFee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Application Number</p>
                    <p className="text-sm font-medium">{application.applicationNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Submitted Date</p>
                    <p className="text-sm font-medium">{application.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="text-sm font-medium">{application.deadline}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium">{application.lastUpdated}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-2">Counselor</p>
                  <p className="text-sm font-medium">{application.counselor.name}</p>
                  <p className="text-xs text-gray-500">{application.counselor.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => {
                  const Icon = event.icon
                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {index < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-semibold text-gray-900">{event.status}</p>
                          <Badge className={event.color}>{event.date}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{event.notes}</p>
                        <p className="text-xs text-gray-500">
                          {event.time} • {event.user}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Required Documents</CardTitle>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push(`/admin/applications/${params.id}/documents`)}
              >
                Manage Documents
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {doc.status === "Verified" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.uploadedDate !== "-" ? `Uploaded: ${doc.uploadedDate}` : "Not uploaded"} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commission Tab */}
        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Commission Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">College Commission</p>
                  <p className="text-2xl font-bold text-blue-600">{application.commission.collegeCommission}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Sub-Agent Commission</p>
                  <p className="text-2xl font-bold text-purple-600">{application.commission.subAgentCommission}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">MeritCap Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{application.commission.meritcapRevenue}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Commission</p>
                  <p className="text-2xl font-bold text-orange-600">{application.commission.totalCommission}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Commission Status</p>
                  <Badge className="bg-orange-100 text-orange-700">{application.commission.commissionStatus}</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Payment Terms: <span className="font-medium">{application.commission.paymentTerms}</span>
                </p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-900 mb-3">Sub-Agent Details</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">Name:</span> {application.subAgent.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">Contact Person:</span> {application.subAgent.contactPerson}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="text-gray-500">Email:</span> {application.subAgent.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communications.map((comm) => (
                  <div key={comm.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={
                              comm.type === "call" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }
                          >
                            {comm.type.toUpperCase()}
                          </Badge>
                          <p className="font-semibold text-sm text-gray-900">{comm.subject}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{comm.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {comm.date} at {comm.time} • From: {comm.from} → To: {comm.to}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

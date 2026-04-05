"use client"

import { useState } from "react"
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
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Edit,
  Download,
  FileText,
  GraduationCap,
  Plane,
  CreditCard,
  CheckCircle,
  Clock,
  User,
  Globe,
  BookOpen,
  Award,
  Briefcase,
  MessageSquare,
  Trash2,
  Loader2,
} from "lucide-react"
import { deleteUser } from "@/lib/api/users"
import { toast } from "@/hooks/use-toast"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Handle student deletion
  const handleDeleteStudent = async () => {
    try {
      setIsDeleting(true)
      await deleteUser(Number(params.id))
      toast({
        title: "Student Deleted",
        description: "The student has been successfully deleted.",
      })
      // Redirect to students list after successful deletion
      router.push("/admin/students")
    } catch (error: any) {
      console.error("Error deleting student:", error)
      toast({
        title: "Error",
        description: error?.message || "Failed to delete student. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  // Sample student data
  const student = {
    id: params.id,
    name: "Priya Sharma",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 98765 43211",
    dateOfBirth: "15/03/2000",
    age: 25,
    gender: "Female",
    nationality: "Indian",
    passportNumber: "M1234567",
    passportExpiry: "2030-05-15",
    address: "123, Andheri West, Mumbai - 400058",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400058",
    emergencyContact: {
      name: "Rajesh Sharma",
      relation: "Father",
      phone: "+91 98765 43200",
    },
    status: "Active",
    enrollmentDate: "2024-01-15",
    counselor: "Amit Kumar",
    branch: "Mumbai",
    academicBackground: {
      degree: "B.Tech in Computer Science",
      university: "Mumbai University",
      percentage: "85%",
      cgpa: "8.5/10",
      yearOfPassing: "2020",
    },
    testScores: {
      ielts: { score: "7.5", date: "2023-12-10", validity: "2025-12-10" },
      gre: { score: "320", date: "2023-11-15", validity: "2028-11-15" },
      toefl: { score: "Not Taken", date: "-", validity: "-" },
    },
    workExperience: "3 years at TCS as Software Engineer",
    enrolledProgram: {
      college: "Harvard University",
      course: "MS in Computer Science",
      country: "USA",
      intake: "Fall 2025",
      duration: "2 years",
      tuitionFee: "$50,000/year",
      status: "Enrolled",
    },
    visaStatus: {
      status: "Approved",
      type: "F-1 Student Visa",
      applicationDate: "2024-02-01",
      approvalDate: "2024-03-15",
      interviewDate: "2024-03-10",
      travelDate: "2024-08-15",
    },
    financials: {
      totalFees: "$100,000",
      paidAmount: "$25,000",
      pendingAmount: "$75,000",
      commissionEarned: "$5,000",
      commissionPending: "$2,500",
    },
  }

  // Applications history
  const applications = [
    {
      id: "APP-001",
      college: "Harvard University",
      course: "MS in Computer Science",
      country: "USA",
      intake: "Fall 2025",
      status: "Offer Received",
      appliedDate: "2024-01-20",
      offerDate: "2024-02-28",
      tuitionFee: "$50,000/year",
    },
    {
      id: "APP-002",
      college: "Stanford University",
      course: "MS in Computer Science",
      country: "USA",
      intake: "Fall 2025",
      status: "Submitted",
      appliedDate: "2024-01-22",
      offerDate: "-",
      tuitionFee: "$52,000/year",
    },
    {
      id: "APP-003",
      college: "MIT",
      course: "MS in Computer Science",
      country: "USA",
      intake: "Fall 2025",
      status: "In Progress",
      appliedDate: "2024-01-25",
      offerDate: "-",
      tuitionFee: "$53,000/year",
    },
  ]

  // Documents
  const documents = [
    {
      id: 1,
      name: "Passport",
      status: "Verified",
      uploadedDate: "2024-01-16",
      expiryDate: "2030-05-15",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 2,
      name: "10th Marksheet",
      status: "Verified",
      uploadedDate: "2024-01-16",
      marks: "85%",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 3,
      name: "12th Marksheet",
      status: "Verified",
      uploadedDate: "2024-01-16",
      marks: "88%",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 4,
      name: "Degree Certificate",
      status: "Verified",
      uploadedDate: "2024-01-16",
      cgpa: "8.5/10",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 5,
      name: "IELTS Score Card",
      status: "Verified",
      uploadedDate: "2024-01-17",
      score: "7.5",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 6,
      name: "GRE Score Report",
      status: "Verified",
      uploadedDate: "2024-01-17",
      score: "320",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 7,
      name: "Bank Statement",
      status: "Verified",
      uploadedDate: "2024-01-18",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 8,
      name: "Statement of Purpose",
      status: "Verified",
      uploadedDate: "2024-01-19",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 9,
      name: "Letter of Recommendation 1",
      status: "Verified",
      uploadedDate: "2024-01-19",
      verifiedBy: "Amit Kumar",
    },
    {
      id: 10,
      name: "Letter of Recommendation 2",
      status: "Verified",
      uploadedDate: "2024-01-19",
      verifiedBy: "Amit Kumar",
    },
  ]

  // Payment history
  const payments = [
    {
      id: 1,
      date: "2024-02-01",
      description: "Application Fee - Harvard",
      amount: "$150",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-02-01",
      description: "Application Fee - Stanford",
      amount: "$150",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-03-01",
      description: "Tuition Fee Deposit - Harvard",
      amount: "$25,000",
      method: "Wire Transfer",
      status: "Completed",
    },
    {
      id: 4,
      date: "2024-04-01",
      description: "Visa Application Fee",
      amount: "$185",
      method: "Credit Card",
      status: "Completed",
    },
  ]

  // Communication logs
  const communications = [
    {
      id: 1,
      type: "call",
      date: "2024-03-20",
      time: "10:30 AM",
      subject: "Visa Interview Preparation",
      notes: "Discussed visa interview questions and preparation tips",
      counselor: "Amit Kumar",
    },
    {
      id: 2,
      type: "email",
      date: "2024-03-15",
      time: "03:45 PM",
      subject: "Visa Approval Confirmation",
      notes: "Sent visa approval confirmation and next steps",
      counselor: "Amit Kumar",
    },
    {
      id: 3,
      type: "meeting",
      date: "2024-02-28",
      time: "11:00 AM",
      subject: "Offer Acceptance Counseling",
      notes: "Discussed offer acceptance and deposit payment process",
      counselor: "Amit Kumar",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Verified":
      case "Approved":
      case "Completed":
      case "Offer Received":
        return "bg-green-100 text-green-700"
      case "Pending":
      case "In Progress":
      case "Submitted":
        return "bg-yellow-100 text-yellow-700"
      case "Rejected":
      case "Expired":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <img
              src={student.photo || "/placeholder.svg"}
              alt={student.name}
              className="w-16 h-16 rounded-full border-2 border-blue-200"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-sm text-gray-600 mt-1">Student ID: {student.id}</p>
            </div>
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
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Student</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <strong>{student.name}</strong>? This action cannot be undone.
                  All associated data including documents, applications, and records will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteStudent}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Student"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                <p className="text-xs text-gray-500 mt-2">Since {student.enrollmentDate}</p>
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
                <p className="text-xs text-gray-600 mb-1">Visa Status</p>
                <Badge className={getStatusColor(student.visaStatus.status)}>{student.visaStatus.status}</Badge>
                <p className="text-xs text-gray-500 mt-2">{student.visaStatus.type}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Payment Progress</p>
                <p className="text-lg font-bold text-blue-600">{Math.round((25000 / 100000) * 100)}%</p>
                <Progress value={25} className="h-1 mt-2" />
                <p className="text-xs text-gray-500 mt-1">$25K / $100K</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
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
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-600" />
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
              Send Email
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Meeting
            </Button>
            <Button
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
              onClick={() => router.push(`/admin/students/${student.id}/documents`)}
            >
              <FileText className="w-4 h-4" />
              Manage Documents
            </Button>
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
              onClick={() => router.push(`/admin/students/${student.id}/visa`)}
            >
              <Plane className="w-4 h-4" />
              Visa Tracking
            </Button>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
              onClick={() => router.push(`/admin/students/${student.id}/pre-departure`)}
            >
              <Globe className="w-4 h-4" />
              Pre-Departure
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="overview" className="gap-2">
            <User className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="academic" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="w-4 h-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="communication" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Communication
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm font-medium">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm font-medium">{student.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm font-medium">{student.age} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-sm font-medium">{student.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Nationality</p>
                    <p className="text-sm font-medium">{student.nationality}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Passport</p>
                    <p className="text-sm font-medium">{student.passportNumber}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium">{student.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {student.city}, {student.state} - {student.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Primary Phone</p>
                  <p className="text-sm font-medium">{student.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Alternate Phone</p>
                  <p className="text-sm font-medium">{student.alternatePhone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{student.email}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-2">Emergency Contact</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{student.emergencyContact.name}</p>
                    <p className="text-xs text-gray-600">{student.emergencyContact.relation}</p>
                    <p className="text-sm text-gray-700">{student.emergencyContact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Program */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Enrolled Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">College</p>
                  <p className="text-sm font-medium">{student.enrolledProgram.college}</p>
                  <p className="text-xs text-gray-500">{student.enrolledProgram.country}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Course</p>
                  <p className="text-sm font-medium">{student.enrolledProgram.course}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Intake</p>
                    <p className="text-sm font-medium">{student.enrolledProgram.intake}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium">{student.enrolledProgram.duration}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tuition Fee</p>
                  <p className="text-sm font-medium">{student.enrolledProgram.tuitionFee}</p>
                </div>
                <Badge className={getStatusColor(student.enrolledProgram.status)}>
                  {student.enrolledProgram.status}
                </Badge>
              </CardContent>
            </Card>

            {/* Visa Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-600" />
                  Visa Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Visa Type</p>
                  <p className="text-sm font-medium">{student.visaStatus.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge className={getStatusColor(student.visaStatus.status)}>{student.visaStatus.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Application Date</p>
                    <p className="text-sm font-medium">{student.visaStatus.applicationDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Approval Date</p>
                    <p className="text-sm font-medium">{student.visaStatus.approvalDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Interview Date</p>
                    <p className="text-sm font-medium">{student.visaStatus.interviewDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Travel Date</p>
                    <p className="text-sm font-medium">{student.visaStatus.travelDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Fees</p>
                    <p className="text-lg font-bold text-gray-900">{student.financials.totalFees}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Paid Amount</p>
                    <p className="text-lg font-bold text-green-600">{student.financials.paidAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pending Amount</p>
                    <p className="text-lg font-bold text-orange-600">{student.financials.pendingAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Commission Earned</p>
                    <p className="text-lg font-bold text-blue-600">{student.financials.commissionEarned}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Commission Pending</p>
                    <p className="text-lg font-bold text-purple-600">{student.financials.commissionPending}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Payment Progress</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Counselor Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Counselor Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{student.counselor}</p>
                    <p className="text-xs text-gray-500">{student.branch} Branch</p>
                    <p className="text-xs text-gray-500 mt-1">Enrolled on: {student.enrollmentDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Academic Background */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Academic Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Degree</p>
                  <p className="text-sm font-medium">{student.academicBackground.degree}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">University</p>
                  <p className="text-sm font-medium">{student.academicBackground.university}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Percentage</p>
                    <p className="text-sm font-medium">{student.academicBackground.percentage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CGPA</p>
                    <p className="text-sm font-medium">{student.academicBackground.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Year</p>
                    <p className="text-sm font-medium">{student.academicBackground.yearOfPassing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Test Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">IELTS</p>
                    <Badge className="bg-blue-600 text-white">{student.testScores.ielts.score}</Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Test Date: {student.testScores.ielts.date}</p>
                    <p>Valid Until: {student.testScores.ielts.validity}</p>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">GRE</p>
                    <Badge className="bg-purple-600 text-white">{student.testScores.gre.score}</Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Test Date: {student.testScores.gre.date}</p>
                    <p>Valid Until: {student.testScores.gre.validity}</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">TOEFL</p>
                    <Badge variant="outline">{student.testScores.toefl.score}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{student.workExperience}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm text-gray-900">{app.college}</p>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{app.course}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {app.country} • {app.intake}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => router.push(`/admin/applications/${app.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div>
                        <p className="text-gray-500">Application ID</p>
                        <p className="font-medium">{app.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Applied Date</p>
                        <p className="font-medium">{app.appliedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tuition Fee</p>
                        <p className="font-medium">{app.tuitionFee}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Documents</CardTitle>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push(`/admin/students/${student.id}/documents`)}
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
                        <p className="text-xs text-gray-500">Uploaded: {doc.uploadedDate}</p>
                        {doc.marks && <p className="text-xs text-gray-600">Marks: {doc.marks}</p>}
                        {doc.cgpa && <p className="text-xs text-gray-600">CGPA: {doc.cgpa}</p>}
                        {doc.score && <p className="text-xs text-gray-600">Score: {doc.score}</p>}
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{payment.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {payment.date} • {payment.method}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{payment.amount}</p>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
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
                              comm.type === "call"
                                ? "bg-green-100 text-green-700"
                                : comm.type === "email"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                            }
                          >
                            {comm.type.toUpperCase()}
                          </Badge>
                          <p className="font-semibold text-sm text-gray-900">{comm.subject}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{comm.notes}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {comm.date} at {comm.time} • {comm.counselor}
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

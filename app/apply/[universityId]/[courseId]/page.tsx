"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardTitle, Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Upload,
  FileText,
  Download,
  Crown,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Edit2,
  Save,
  X,
  Shield,
  GraduationCap,
  Award,
} from "lucide-react"
import { studyAbroadUniversities } from "@/lib/sample-data"

interface ApplicationFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string

  // KYC Information
  aadharNumber: string
  passportNumber: string

  // Academic Information - 10th
  tenth: {
    board: string
    school: string
    year: string
    percentage: string
  }

  // Academic Information - 12th
  twelfth: {
    board: string
    school: string
    year: string
    percentage: string
    stream: string
  }

  // Academic Information - UG/Diploma
  undergraduate: {
    degree: string
    university: string
    year: string
    cgpa: string
    specialization: string
  }

  // Program Information
  preferredIntake: string

  // Documents
  documents: {
    transcripts: File | null
    passport: File | null
    bankStatement: File | null
    sop: File | null
    customDocuments: Array<{
      id: string
      name: string
      file: File
    }>
  }
}

const initialFormData: ApplicationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  aadharNumber: "",
  passportNumber: "",
  tenth: {
    board: "",
    school: "",
    year: "",
    percentage: "",
  },
  twelfth: {
    board: "",
    school: "",
    year: "",
    percentage: "",
    stream: "",
  },
  undergraduate: {
    degree: "",
    university: "",
    year: "",
    cgpa: "",
    specialization: "",
  },
  preferredIntake: "",
  documents: {
    transcripts: null,
    passport: null,
    bankStatement: null,
    sop: null,
    customDocuments: [],
  },
}

export default function ApplicationPage({ params }: { params: { universityId: string; courseId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const autofill = searchParams.get("autofill") === "true"

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData)
  const [university, setUniversity] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [editingDoc, setEditingDoc] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const totalSteps = 4 // Reduced to 4 steps: Program Confirmation, Personal Info + KYC, Academic Info, Documents
  const progress = (currentStep / totalSteps) * 100

  const getRequiredDocuments = () => {
    const country = university?.country?.toLowerCase()
    const isOnline = params.universityId.includes("online")

    if (isOnline) {
      return [
        { id: "sop", name: "Statement of Purpose", required: true },
        { id: "transcripts", name: "Academic Transcripts", required: true },
        { id: "resume", name: "Resume/CV", required: true },
      ]
    }

    if (country === "usa") {
      return [
        { id: "sop", name: "Statement of Purpose", required: true },
        { id: "lor", name: "Letters of Recommendation (3)", required: true },
        { id: "transcripts", name: "Official Transcripts", required: true },
        { id: "passport", name: "Passport Copy", required: true },
        { id: "bankStatement", name: "Bank Statement", required: true },
      ]
    } else if (country === "uk") {
      return [
        { id: "sop", name: "Personal Statement", required: true },
        { id: "lor", name: "Letters of Recommendation (2)", required: true },
        { id: "transcripts", name: "Academic Transcripts", required: true },
        { id: "passport", name: "Passport Copy", required: true },
      ]
    } else {
      return [
        { id: "sop", name: "Statement of Purpose", required: true },
        { id: "transcripts", name: "Academic Transcripts", required: true },
        { id: "passport", name: "Identity Proof", required: false },
      ]
    }
  }

  const sampleDocuments = [
    { id: "sop-sample", name: "SOP Sample", description: "Statement of Purpose template" },
    { id: "lor-sample", name: "LOR Sample", description: "Letter of Recommendation template" },
    { id: "resume-sample", name: "Resume Sample", description: "Professional resume template" },
  ]

  const handleFileUpload = (field: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }))
  }

  const handleCustomDocumentUpload = (file: File, name: string) => {
    const customDoc = {
      id: Date.now().toString(),
      name: name || file.name,
      file,
    }

    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        customDocuments: [...prev.documents.customDocuments, customDoc],
      },
    }))
  }

  const handleEditDocument = (docId: string, newName: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        customDocuments: prev.documents.customDocuments.map((doc) =>
          doc.id === docId ? { ...doc, name: newName } : doc,
        ),
      },
    }))
    setEditingDoc(null)
    setEditingName("")
  }

  const handleDeleteDocument = (docId: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        customDocuments: prev.documents.customDocuments.filter((doc) => doc.id !== docId),
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      const requiredFields = ["firstName", "lastName", "email", "phone"]
      const missingFields = requiredFields.filter((field) => !formData[field as keyof ApplicationFormData])

      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(", ")}`)
        setIsSubmitting(false)
        return
      }

      // Store comprehensive application data
      const applicationData = {
        ...formData,
        universityId: params.universityId,
        courseId: params.courseId,
        universityName: university?.name,
        courseName: course?.name,
        submittedAt: new Date().toISOString(),
        applicationId: `APP-${Date.now()}`,
      }

      // Save to localStorage for future use
      localStorage.setItem("meritcap_application_data", JSON.stringify(applicationData))
      localStorage.setItem(
        "meritcap_user",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          name: `${formData.firstName} ${formData.lastName}`,
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.nationality,
        }),
      )

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Instead of redirecting to login, check if user has complete profile
      const hasCompleteProfile = formData.firstName && formData.lastName && formData.email && formData.phone

      if (hasCompleteProfile) {
        // Redirect to dashboard or success page instead of login
        router.push(`/dashboard?application=${applicationData.applicationId}`)
      } else {
        // Only redirect to login if profile is incomplete
        router.push("/login?redirect=dashboard")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Find university and course
        const foundUniversity = studyAbroadUniversities.find((u) => u.id === params.universityId)
        const foundCourse = foundUniversity?.courses?.find((c) => c.id === params.courseId)

        if (!foundUniversity || !foundCourse) {
          router.push("/search-results")
          return
        }

        setUniversity(foundUniversity)
        setCourse(foundCourse)

        // Load user data from multiple sources and auto-fill form
        const user = localStorage.getItem("meritcap_user")
        const leadData = localStorage.getItem("meritcap_lead_data")
        const applicationData = localStorage.getItem("meritcap_application_data")

        if (user || leadData || applicationData) {
          const parsedUser = user ? JSON.parse(user) : null
          const parsedLeadData = leadData ? JSON.parse(leadData) : null
          const parsedApplicationData = applicationData ? JSON.parse(applicationData) : null

          // Combine data from all sources, prioritizing most recent
          const combinedUserData = {
            ...parsedUser,
            ...parsedLeadData,
            ...parsedApplicationData,
          }

          setUserData(combinedUserData)

          // Auto-fill form with available data
          if (combinedUserData) {
            setFormData((prev) => ({
              ...prev,
              firstName: combinedUserData.firstName || combinedUserData.name?.split(" ")[0] || "",
              lastName: combinedUserData.lastName || combinedUserData.name?.split(" ").slice(1).join(" ") || "",
              email: combinedUserData.email || "",
              phone: combinedUserData.phone || "",
              dateOfBirth: combinedUserData.dateOfBirth || "",
              nationality: combinedUserData.nationality || "India",
              aadharNumber: combinedUserData.aadharNumber || "",
              passportNumber: combinedUserData.passportNumber || "",
              // Academic data
              previousEducation: combinedUserData.previousEducation || "",
              gpa: combinedUserData.gpa || "",
              testScores: combinedUserData.testScores || "",
              workExperience: combinedUserData.workExperience || "",
            }))
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Error loading application data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [params.universityId, params.courseId, router])

  if (loading) {
    return (
      <div className="app-form-container flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading application form...</p>
        </div>
      </div>
    )
  }

  if (!university || !course) {
    return (
      <div className="app-form-container flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Program Not Found</h2>
          <p className="text-gray-600 mb-4">The requested program could not be found.</p>
          <Button onClick={() => router.back()} className="app-form-button-primary">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-form-container">
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-blue-800/90" />
        <div className="relative z-10 container mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{university?.name}</h1>
            <p className="text-xl text-blue-100">Apply for {course?.name} program</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
              <span>Application Progress</span>
              <span>Step {currentStep} of 4</span>
            </div>
            <div className="w-full bg-blue-800/50 rounded-full h-2">
              <div
                className="bg-blue-200 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between mt-4 text-xs">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-blue-200" : "text-blue-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep >= 1 ? "bg-blue-200 text-blue-800" : "bg-blue-700 text-blue-300"
                }`}
              >
                1
              </div>
              <span>Program Details</span>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-blue-200" : "text-blue-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep >= 2 ? "bg-blue-200 text-blue-800" : "bg-blue-700 text-blue-300"
                }`}
              >
                2
              </div>
              <span>Personal & KYC</span>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-blue-200" : "text-blue-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep >= 3 ? "bg-blue-200 text-blue-800" : "bg-blue-700 text-blue-300"
                }`}
              >
                3
              </div>
              <span>Academic History</span>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-blue-200" : "text-blue-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep >= 4 ? "bg-blue-200 text-blue-800" : "bg-blue-700 text-blue-300"
                }`}
              >
                4
              </div>
              <span>Documents</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 app-form-animate-in">
          {currentStep === 1 && (
            <div className="app-form-card">
              <div className="app-form-card-header">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Program Confirmation
                </CardTitle>
                <p className="text-emerald-100 mt-2">Review your selected program details</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-900">{course?.name}</h3>
                            <p className="text-blue-700">{university?.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="bg-slate-50 rounded-xl p-6 space-y-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        Program Details
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Duration:</span>
                          <span className="font-bold text-slate-900">{course?.duration || "2 years"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Mode:</span>
                          <span className="font-bold text-slate-900">
                            {params.universityId.includes("online") ? "Full Time - Online" : "Full Time"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-slate-600 font-medium">Location:</span>
                          <span className="font-bold text-slate-900">
                            {university?.city}, {university?.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="preferredIntake" className="text-base font-bold text-slate-900">
                      {params.universityId.includes("online") ? "Preferred Start Month" : "Preferred Intake"}
                    </Label>
                    <Select
                      value={formData.preferredIntake}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredIntake: value }))}
                    >
                      <SelectTrigger className="app-form-input h-12">
                        <SelectValue placeholder="Select intake" />
                      </SelectTrigger>
                      <SelectContent>
                        {params.universityId.includes("online") ? (
                          <>
                            <SelectItem value="january-2025">January 2025</SelectItem>
                            <SelectItem value="march-2025">March 2025</SelectItem>
                            <SelectItem value="may-2025">May 2025</SelectItem>
                            <SelectItem value="july-2025">July 2025</SelectItem>
                            <SelectItem value="september-2025">September 2025</SelectItem>
                            <SelectItem value="november-2025">November 2025</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="fall-2024">Fall 2024</SelectItem>
                            <SelectItem value="spring-2025">Spring 2025</SelectItem>
                            <SelectItem value="summer-2025">Summer 2025</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {currentStep === 2 && (
            <div className="app-form-card">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Personal & KYC Information
                </CardTitle>
                <p className="text-blue-100 mt-2">Provide your personal details and identity verification</p>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b-2 border-emerald-200 pb-2">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-base font-semibold text-slate-900">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-base font-semibold text-slate-900">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold text-slate-900">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-semibold text-slate-900">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-base font-semibold text-slate-900">
                        Date of Birth *
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality" className="text-base font-semibold text-slate-900">
                        Nationality *
                      </Label>
                      <Select
                        value={formData.nationality}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, nationality: value }))}
                      >
                        <SelectTrigger className="app-form-input h-12">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="app-form-kyc-section">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    KYC Verification
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="aadharNumber" className="text-base font-semibold text-slate-900">
                        Aadhar Number *
                      </Label>
                      <Input
                        id="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, aadharNumber: e.target.value }))}
                        placeholder="Enter your 12-digit Aadhar number"
                        className="app-form-input h-12"
                        maxLength={12}
                      />
                      <p className="text-xs text-slate-500">Required for Indian citizens</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passportNumber" className="text-base font-semibold text-slate-900">
                        Passport Number
                      </Label>
                      <Input
                        id="passportNumber"
                        value={formData.passportNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, passportNumber: e.target.value }))}
                        placeholder="Enter your passport number"
                        className="app-form-input h-12"
                      />
                      <p className="text-xs text-slate-500">Required for international applications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {currentStep === 3 && (
            <div className="app-form-card">
              <div className="app-form-card-header">
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <GraduationCap className="w-6 h-6" />
                  Academic History
                </CardTitle>
                <p className="text-emerald-100 mt-2">Provide details of your educational background</p>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="app-form-academic-card">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    10th Standard
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Board *</Label>
                      <Select
                        value={formData.tenth.board}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            tenth: { ...prev.tenth, board: value },
                          }))
                        }
                      >
                        <SelectTrigger className="app-form-input h-12">
                          <SelectValue placeholder="Select board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cbse">CBSE</SelectItem>
                          <SelectItem value="icse">ICSE</SelectItem>
                          <SelectItem value="state">State Board</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">School Name *</Label>
                      <Input
                        value={formData.tenth.school}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tenth: { ...prev.tenth, school: e.target.value },
                          }))
                        }
                        placeholder="Enter school name"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Year of Passing *</Label>
                      <Input
                        value={formData.tenth.year}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tenth: { ...prev.tenth, year: e.target.value },
                          }))
                        }
                        placeholder="Enter year"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Percentage/CGPA *</Label>
                      <Input
                        value={formData.tenth.percentage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tenth: { ...prev.tenth, percentage: e.target.value },
                          }))
                        }
                        placeholder="Enter percentage or CGPA"
                        className="app-form-input h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="app-form-academic-card">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    12th Standard
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Board *</Label>
                      <Select
                        value={formData.twelfth.board}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            twelfth: { ...prev.twelfth, board: value },
                          }))
                        }
                      >
                        <SelectTrigger className="app-form-input h-12">
                          <SelectValue placeholder="Select board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cbse">CBSE</SelectItem>
                          <SelectItem value="icse">ICSE</SelectItem>
                          <SelectItem value="state">State Board</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">School Name *</Label>
                      <Input
                        value={formData.twelfth.school}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            twelfth: { ...prev.twelfth, school: e.target.value },
                          }))
                        }
                        placeholder="Enter school name"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Stream *</Label>
                      <Select
                        value={formData.twelfth.stream}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            twelfth: { ...prev.twelfth, stream: value },
                          }))
                        }
                      >
                        <SelectTrigger className="app-form-input h-12">
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="commerce">Commerce</SelectItem>
                          <SelectItem value="arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Year of Passing *</Label>
                      <Input
                        value={formData.twelfth.year}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            twelfth: { ...prev.twelfth, year: e.target.value },
                          }))
                        }
                        placeholder="Enter year"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Percentage/CGPA *</Label>
                      <Input
                        value={formData.twelfth.percentage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            twelfth: { ...prev.twelfth, percentage: e.target.value },
                          }))
                        }
                        placeholder="Enter percentage or CGPA"
                        className="app-form-input h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="app-form-academic-card">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                    Undergraduate/Diploma
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Degree Type *</Label>
                      <Select
                        value={formData.undergraduate.degree}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            undergraduate: { ...prev.undergraduate, degree: value },
                          }))
                        }
                      >
                        <SelectTrigger className="app-form-input h-12">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech</SelectItem>
                          <SelectItem value="be">B.E</SelectItem>
                          <SelectItem value="bsc">B.Sc</SelectItem>
                          <SelectItem value="bcom">B.Com</SelectItem>
                          <SelectItem value="ba">B.A</SelectItem>
                          <SelectItem value="bba">BBA</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">University/College *</Label>
                      <Input
                        value={formData.undergraduate.university}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            undergraduate: { ...prev.undergraduate, university: e.target.value },
                          }))
                        }
                        placeholder="Enter university/college name"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Specialization *</Label>
                      <Input
                        value={formData.undergraduate.specialization}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            undergraduate: { ...prev.undergraduate, specialization: e.target.value },
                          }))
                        }
                        placeholder="Enter specialization"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">Year of Passing *</Label>
                      <Input
                        value={formData.undergraduate.year}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            undergraduate: { ...prev.undergraduate, year: e.target.value },
                          }))
                        }
                        placeholder="Enter year"
                        className="app-form-input h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-semibold text-slate-900">CGPA/Percentage *</Label>
                      <Input
                        value={formData.undergraduate.cgpa}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            undergraduate: { ...prev.undergraduate, cgpa: e.target.value },
                          }))
                        }
                        placeholder="Enter CGPA or percentage"
                        className="app-form-input h-12"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {currentStep === 4 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="app-form-card">
                  <div className="app-form-card-header">
                    <CardTitle className="text-xl font-semibold flex items-center gap-3">
                      <Upload className="w-6 h-6" />
                      Documents Upload
                    </CardTitle>
                    <p className="text-emerald-100 mt-2">
                      Upload all required documents including your Statement of Purpose
                    </p>
                  </div>
                  <CardContent className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {getRequiredDocuments().map((doc) => (
                        <div
                          key={doc.id}
                          className="border-2 border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition-all duration-200"
                        >
                          <Label className="text-base font-bold text-slate-900 mb-3 block">
                            {doc.name} {doc.required && <span className="text-red-500">*</span>}
                          </Label>
                          <div className="app-form-upload-area p-6 text-center">
                            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                            <p className="text-sm text-slate-600 mb-2">
                              Drag and drop or{" "}
                              <span className="text-emerald-600 cursor-pointer font-medium">browse files</span>
                            </p>
                            <p className="text-xs text-slate-500">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileUpload(doc.id, file)
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="app-form-section-divider"></div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        Additional Documents
                      </h4>
                      <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50">
                        <div className="flex gap-4 mb-4">
                          <Input
                            placeholder="Document name"
                            className="flex-1 app-form-input h-12"
                            id="customDocName"
                          />
                          <Button
                            className="app-form-button-secondary h-12 px-6"
                            onClick={() => {
                              const input = document.getElementById("customDocFile") as HTMLInputElement
                              input?.click()
                            }}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                          <input
                            id="customDocFile"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              const nameInput = document.getElementById("customDocName") as HTMLInputElement
                              if (file && nameInput) {
                                handleCustomDocumentUpload(file, nameInput.value)
                                nameInput.value = ""
                              }
                            }}
                          />
                        </div>
                      </div>

                      {formData.documents.customDocuments.length > 0 && (
                        <div className="mt-8 space-y-4">
                          <h4 className="text-lg font-bold text-slate-900">Uploaded Additional Documents:</h4>
                          {formData.documents.customDocuments.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                  {editingDoc === doc.id ? (
                                    <div className="flex items-center gap-2">
                                      <Input
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="h-8 text-sm app-form-input"
                                      />
                                      <Button
                                        size="sm"
                                        onClick={() => handleEditDocument(doc.id, editingName)}
                                        className="h-8 px-3 bg-blue-600 hover:bg-blue-700"
                                      >
                                        <Save className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setEditingDoc(null)
                                          setEditingName("")
                                        }}
                                        className="h-8 px-3"
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="font-bold text-slate-900">{doc.name}</p>
                                      <p className="text-sm text-slate-500">{doc.file.name}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                              {editingDoc !== doc.id && (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      setEditingDoc(doc.id)
                                      setEditingName(doc.name)
                                    }}
                                    className="h-8 px-3 text-slate-600 hover:text-slate-900"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteDocument(doc.id)}
                                    className="h-8 px-3 text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>

              <div className="space-y-6">
                <div className="app-form-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      Required Documents for {university?.country}
                    </h3>
                    <div className="space-y-4">
                      {getRequiredDocuments().map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                            {doc.required && <span className="text-xs text-red-500 ml-2">Required</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="app-form-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                      Sample Documents
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Download sample documents to help you prepare your application
                    </p>
                    <div className="space-y-3">
                      {sampleDocuments.map((sample) => (
                        <div
                          key={sample.id}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">{sample.name}</p>
                              <p className="text-xs text-slate-500">{sample.description}</p>
                            </div>
                          </div>
                          {userData?.isPremium ? (
                            <Button className="app-form-button-secondary text-xs" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled className="text-xs bg-transparent">
                              Premium Only
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                {!userData?.isPremium && (
                  <div className="app-form-card bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Crown className="w-6 h-6 text-yellow-600" />
                        <h3 className="text-lg font-bold text-slate-900">Unlock Premium Benefits</h3>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        Upgrade to premium to access exclusive features and resources to boost your application
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 mb-4">
                        <li>Access to premium document samples</li>
                        <li>Personalized application guidance</li>
                        <li>Priority support</li>
                      </ul>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </CardContent>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg border-0">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 h-12 px-8"
          >
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

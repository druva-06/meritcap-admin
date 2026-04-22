"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  GraduationCap,
  Target,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  TrendingUp,
  DollarSign,
  Users,
  Flame,
  ThermometerSun,
  Snowflake,
  CheckCircle2,
  XCircle,
  Search
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { api } from "@/lib/api-client"

interface Counselor {
  id: number
  name: string
  email: string
  phone_number: string
}

export default function AddNewLeadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [counselorSearch, setCounselorSearch] = useState("")
  const totalSteps = 3

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    leadStatus: "WARM",

    // Step 2: Academic Background
    currentEducation: "",
    degree: "",
    university: "",
    percentage: "",
    yearOfPassing: "",
    workExperience: "",
    ielts: "",
    toefl: "",
    gre: "",
    gmat: "",

    // Step 3: Preferences & Budget
    preferredCountries: [] as string[],
    preferredCourses: [] as string[],
    preferredCollege: "",
    intake: "",
    budget: "",
    source: "",
    assignedTo: "",
    notes: "",
  })

  // Fetch counselors on component mount
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await api.get("/api/user/counselors")
        if (response.success && response.data) {
          setCounselors(response.data)
        }
      } catch (error) {
        console.error("Error fetching counselors:", error)
        toast({
          title: "Error",
          description: "Failed to load counselors",
          variant: "destructive",
        })
      }
    }
    fetchCounselors()
  }, [])

  // Filter counselors based on search
  const filteredCounselors = counselors.filter((counselor) => {
    const searchLower = counselorSearch.toLowerCase()
    return counselor.name.toLowerCase().includes(searchLower) || counselor.email.toLowerCase().includes(searchLower)
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMultiSelectChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field as keyof typeof prev] as string[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      return { ...prev, [field]: newValues }
    })
  }

  // Validate current step before moving forward
  const validateCurrentStep = (): boolean => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all required fields: First Name, Last Name, Email, and Phone Number",
          variant: "destructive",
        })
        return false
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        })
        return false
      }
      // Phone validation (basic)
      if (formData.phone.length < 10) {
        toast({
          title: "Invalid Phone",
          description: "Please enter a valid phone number",
          variant: "destructive",
        })
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.currentEducation) {
        toast({
          title: "Required Field Missing",
          description: "Please select the current education level",
          variant: "destructive",
        })
        return false
      }
    } else if (currentStep === 3) {
      if (
        formData.preferredCountries.length === 0 ||
        formData.preferredCourses.length === 0 ||
        !formData.intake ||
        !formData.budget ||
        !formData.source ||
        !formData.assignedTo
      ) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all required fields: Preferred Countries, Courses, Intake, Budget, Source, and Assign To",
          variant: "destructive",
        })
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare personal details for encryption
      const personalDetails = {
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        alternate_phone: formData.alternatePhone,
      }

      // Prepare academic details for encryption
      const academicDetails = {
        current_education: formData.currentEducation,
        degree: formData.degree,
        university: formData.university,
        percentage: formData.percentage,
        year_of_passing: formData.yearOfPassing,
        work_experience: formData.workExperience,
        ielts: formData.ielts,
        toefl: formData.toefl,
        gre: formData.gre,
        gmat: formData.gmat,
      }

      // Prepare preferences for encryption
      const preferences = {
        preferred_college: formData.preferredCollege,
        notes: formData.notes,
      }

      // Create tags from preferred courses
      const tags = formData.preferredCourses

      // Prepare the request payload matching backend API
      const requestBody = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        country: formData.country,
        status: formData.leadStatus,
        lead_source: formData.source,
        budget_range: formData.budget,
        intake: formData.intake,
        preferred_countries: formData.preferredCountries.join(","),
        preferred_courses: formData.preferredCourses.join(","),
        tags: tags,
        assigned_to: parseInt(formData.assignedTo),
        encrypted_personal_details: JSON.stringify(personalDetails),
        encrypted_academic_details: JSON.stringify(academicDetails),
        encrypted_preferences: JSON.stringify(preferences),
      }

      // Make API call using the api client
      const response = await api.post("/api/leads/add", requestBody)

      if (response.success) {
        toast({
          title: "Success! 🎉",
          description: "Lead has been added successfully to the system",
        })
        // Clear draft from localStorage if exists
        localStorage.removeItem("lead_draft")
        router.push("/admin/leads")
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to add lead. Please try again.",
          variant: "destructive",
        })

        // If unauthorized, redirect to login
        if (response.statusCode === 401 || response.statusCode === 403) {
          router.push("/login")
        }
      }
    } catch (error) {
      console.error("Error adding lead:", error)
      toast({
        title: "Error",
        description: "An error occurred while adding the lead. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem("lead_draft", JSON.stringify(formData))
    toast({
      title: "Draft Saved 💾",
      description: "Your progress has been saved and can be resumed later.",
    })
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  const steps = [
    { number: 1, title: "Personal Info", subtitle: "Basic details", icon: User, color: "bg-blue-500" },
    { number: 2, title: "Education", subtitle: "Academic background", icon: GraduationCap, color: "bg-purple-500" },
    { number: 3, title: "Preferences", subtitle: "Goals & budget", icon: Target, color: "bg-orange-500" },
  ]

  const getLeadStatusIcon = (status: string) => {
    switch (status) {
      case "HOT": return <Flame className="w-4 h-4" />
      case "IMMEDIATE_HOT": return <Flame className="w-4 h-4" />
      case "WARM": return <ThermometerSun className="w-4 h-4" />
      case "COLD": return <Snowflake className="w-4 h-4" />
      case "FEATURE_LEAD": return <TrendingUp className="w-4 h-4" />
      case "CONTACTED": return <CheckCircle2 className="w-4 h-4" />
      default: return <ThermometerSun className="w-4 h-4" />
    }
  }

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case "HOT": return "bg-red-100 text-red-700 border-red-300"
      case "IMMEDIATE_HOT": return "bg-red-200 text-red-800 border-red-400"
      case "WARM": return "bg-orange-100 text-orange-700 border-orange-300"
      case "COLD": return "bg-blue-100 text-blue-700 border-blue-300"
      case "FEATURE_LEAD": return "bg-purple-100 text-purple-700 border-purple-300"
      case "CONTACTED": return "bg-green-100 text-green-700 border-green-300"
      default: return "bg-orange-100 text-orange-700 border-orange-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 mb-4 hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Lead
              </h1>
              <p className="text-gray-600 mt-2">Fill in the information step by step to create a new lead</p>
            </div>
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="bg-white hover:bg-gray-50 shadow-sm"
            >
              💾 Save Draft
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-gray-100" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between items-start">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = currentStep > step.number
                const isCurrent = currentStep === step.number
                const isUpcoming = currentStep < step.number

                return (
                  <div key={step.number} className="flex items-start flex-1">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${isCompleted
                          ? "bg-gradient-to-br from-green-500 to-green-600 text-white scale-100"
                          : isCurrent
                            ? `${step.color} text-white scale-110 shadow-lg`
                            : "bg-gray-200 text-gray-400 scale-95"
                          }`}
                      >
                        {isCompleted ? (
                          <Check className="w-7 h-7" />
                        ) : (
                          <Icon className="w-7 h-7" />
                        )}
                      </div>
                      <div className="text-center mt-3 hidden sm:block">
                        <p
                          className={`text-sm font-semibold transition-colors ${isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                            }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{step.subtitle}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mt-7 mx-2 rounded-full transition-all duration-500 ${isCompleted ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gray-200"
                          }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur animate-in fade-in duration-500">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Personal Information</CardTitle>
                  <CardDescription className="text-blue-100">
                    Enter the lead's basic contact details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Alternate Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="+91 98765 43211"
                        value={formData.alternatePhone}
                        onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">🇮🇳 India</SelectItem>
                        <SelectItem value="USA">🇺🇸 USA</SelectItem>
                        <SelectItem value="UK">🇬🇧 UK</SelectItem>
                        <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                        <SelectItem value="Australia">🇦🇺 Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-700 font-medium">
                      Lead Status <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.leadStatus}
                      onValueChange={(value) => handleInputChange("leadStatus", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOT">
                          <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-red-500" />
                            <span>HOT - High Priority</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="IMMEDIATE_HOT">
                          <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-red-700" />
                            <span>IMMEDIATE HOT - Urgent</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="WARM">
                          <div className="flex items-center gap-2">
                            <ThermometerSun className="w-4 h-4 text-orange-500" />
                            <span>WARM - Moderate Interest</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="COLD">
                          <div className="flex items-center gap-2">
                            <Snowflake className="w-4 h-4 text-blue-500" />
                            <span>COLD - Low Interest</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="FEATURE_LEAD">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                            <span>FEATURE LEAD - Premium</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="CONTACTED">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>CONTACTED - Already Reached</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="mt-2">
                      <Badge className={`${getLeadStatusColor(formData.leadStatus)} border`}>
                        <span className="flex items-center gap-1">
                          {getLeadStatusIcon(formData.leadStatus)}
                          {formData.leadStatus}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Address Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Full Address</Label>
                    <Textarea
                      placeholder="Enter complete address..."
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      rows={3}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">City</Label>
                      <Input
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">State/Province</Label>
                      <Input
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">Pincode/ZIP</Label>
                      <Input
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Academic Background */}
        {currentStep === 2 && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur animate-in fade-in duration-500">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Academic Background</CardTitle>
                  <CardDescription className="text-purple-100">
                    Educational qualifications and test scores
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Education Details */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Education Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Current Education Level <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.currentEducation}
                      onValueChange={(value) => handleInputChange("currentEducation", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12th">🎓 12th Grade</SelectItem>
                        <SelectItem value="diploma">📜 Diploma</SelectItem>
                        <SelectItem value="bachelors">🎓 Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">🎓 Master's Degree</SelectItem>
                        <SelectItem value="phd">🎓 PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Degree/Course</Label>
                    <Input
                      placeholder="e.g., B.Tech in Computer Science"
                      value={formData.degree}
                      onChange={(e) => handleInputChange("degree", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">University/College</Label>
                    <Input
                      placeholder="Enter university name"
                      value={formData.university}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Percentage/CGPA</Label>
                    <Input
                      placeholder="e.g., 85% or 8.5 CGPA"
                      value={formData.percentage}
                      onChange={(e) => handleInputChange("percentage", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Year of Passing</Label>
                    <Input
                      placeholder="e.g., 2024"
                      value={formData.yearOfPassing}
                      onChange={(e) => handleInputChange("yearOfPassing", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Work Experience</Label>
                    <Input
                      placeholder="e.g., 3 years at TCS"
                      value={formData.workExperience}
                      onChange={(e) => handleInputChange("workExperience", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Test Scores */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Standardized Test Scores</h3>
                  <span className="text-sm text-gray-500">(Optional)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">IELTS Score</Label>
                    <Input
                      placeholder="e.g., 7.5"
                      value={formData.ielts}
                      onChange={(e) => handleInputChange("ielts", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">TOEFL Score</Label>
                    <Input
                      placeholder="e.g., 100"
                      value={formData.toefl}
                      onChange={(e) => handleInputChange("toefl", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">GRE Score</Label>
                    <Input
                      placeholder="e.g., 320"
                      value={formData.gre}
                      onChange={(e) => handleInputChange("gre", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">GMAT Score</Label>
                    <Input
                      placeholder="e.g., 700"
                      value={formData.gmat}
                      onChange={(e) => handleInputChange("gmat", e.target.value)}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preferences & Budget - Continuing in next message due to length */}
        {currentStep === 3 && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur animate-in fade-in duration-500">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Preferences & Budget</CardTitle>
                  <CardDescription className="text-orange-100">
                    Study goals, budget, and assignment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Study Preferences */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Study Preferences</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Preferred Countries <span className="text-red-500">*</span>
                    </Label>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto space-y-2">
                      {["USA", "UK", "Canada", "Australia", "Germany", "Ireland", "New Zealand", "Singapore"].map((country) => (
                        <label
                          key={country}
                          className="flex items-center space-x-3 p-2 hover:bg-white rounded-md cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.preferredCountries.includes(country)}
                            onChange={() => handleMultiSelectChange("preferredCountries", country)}
                            className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                          />
                          <span className="text-sm font-medium">{country}</span>
                        </label>
                      ))}
                    </div>
                    {formData.preferredCountries.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.preferredCountries.map((country) => (
                          <Badge key={country} className="bg-orange-100 text-orange-700 border-orange-300">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Preferred Courses <span className="text-red-500">*</span>
                    </Label>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto space-y-2">
                      {["Computer Science", "Data Science", "AI/ML", "MBA", "Engineering", "Medicine", "Law", "Business Analytics"].map(
                        (course) => (
                          <label
                            key={course}
                            className="flex items-center space-x-3 p-2 hover:bg-white rounded-md cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.preferredCourses.includes(course)}
                              onChange={() => handleMultiSelectChange("preferredCourses", course)}
                              className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                            />
                            <span className="text-sm font-medium">{course}</span>
                          </label>
                        ),
                      )}
                    </div>
                    {formData.preferredCourses.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.preferredCourses.map((course) => (
                          <Badge key={course} className="bg-orange-100 text-orange-700 border-orange-300">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Preferences */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Additional Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Preferred College</Label>
                    <Input
                      placeholder="e.g., Harvard University"
                      value={formData.preferredCollege}
                      onChange={(e) => handleInputChange("preferredCollege", e.target.value)}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Intake <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.intake} onValueChange={(value) => handleInputChange("intake", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select intake period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fall2024">🍂 Fall 2024</SelectItem>
                        <SelectItem value="spring2025">🌸 Spring 2025</SelectItem>
                        <SelectItem value="fall2025">🍂 Fall 2025</SelectItem>
                        <SelectItem value="spring2026">🌸 Spring 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Budget & Assignment */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Budget & Assignment</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Budget Range <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-15">💰 ₹10-15 Lakhs</SelectItem>
                        <SelectItem value="15-20">💰 ₹15-20 Lakhs</SelectItem>
                        <SelectItem value="20-25">💰 ₹20-25 Lakhs</SelectItem>
                        <SelectItem value="25-30">💰 ₹25-30 Lakhs</SelectItem>
                        <SelectItem value="30+">💰 ₹30+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Lead Source <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">🌐 Website</SelectItem>
                        <SelectItem value="facebook">📘 Facebook Ads</SelectItem>
                        <SelectItem value="google">🔍 Google Ads</SelectItem>
                        <SelectItem value="instagram">📸 Instagram</SelectItem>
                        <SelectItem value="referral">👥 Referral</SelectItem>
                        <SelectItem value="walkin">🚶 Walk-in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-700 font-medium">
                      Assign To Counselor <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Select counselor" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search counselors..."
                              value={counselorSearch}
                              onChange={(e) => setCounselorSearch(e.target.value)}
                              className="pl-8"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        {filteredCounselors.length > 0 ? (
                          filteredCounselors.map((counselor) => (
                            <SelectItem key={counselor.id} value={counselor.id.toString()}>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  <span className="font-medium">{counselor.name}</span>
                                </div>
                                <span className="text-xs text-gray-500 ml-6">{counselor.email}</span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-4 text-center text-sm text-gray-500">
                            No counselors found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Additional Notes</Label>
                <Textarea
                  placeholder="Add any additional comments, special requirements, or important information..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur sticky bottom-4">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isSubmitting}
                className="gap-2 bg-white hover:bg-gray-50 px-6 py-6 text-base font-semibold shadow-sm w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </Button>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="gap-2 bg-white hover:bg-gray-50 px-6 py-6 text-base shadow-sm flex-1 sm:flex-none"
                >
                  💾 Save Draft
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-base font-semibold shadow-lg flex-1 sm:flex-none"
                  >
                    Next Step
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-base font-semibold shadow-lg flex-1 sm:flex-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Submit Lead
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

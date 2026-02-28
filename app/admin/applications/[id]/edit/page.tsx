"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Save, CheckCircle, Search } from "lucide-react"

export default function EditApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Pre-filled form data (simulating existing application data)
  const [formData, setFormData] = useState({
    // Step 1: Student Selection
    studentId: "STU-1247",
    studentName: "Priya Sharma",
    studentEmail: "priya.sharma@email.com",
    studentPhone: "+91 98765 43210",
    // Step 2: College & Course
    collegeId: "COL-001",
    collegeName: "Harvard University",
    courseId: "CRS-001",
    courseName: "MBA",
    intake: "Fall 2025",
    duration: "2 years",
    tuitionFee: "$73,440/year",
    applicationFee: "$250",
    // Step 3: Application Details
    applicationDate: "2024-01-15",
    deadline: "2024-04-30",
    counselorId: "CNS-001",
    subAgentId: "SA-001",
    priority: "high",
    notes: "High priority application. Student has excellent academic background.",
    // Step 4: Commission & Payment
    collegeCommission: "5000",
    subAgentCommission: "1500",
    meritcapRevenue: "3500",
    paymentTerms: "enrollment",
  })

  // Sample students
  const students = [
    { id: "STU-1247", name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210" },
    { id: "STU-1248", name: "Rahul Verma", email: "rahul@email.com", phone: "+91 98765 43211" },
    { id: "STU-1249", name: "Sneha Patel", email: "sneha@email.com", phone: "+91 98765 43212" },
  ]

  // Sample colleges
  const colleges = [
    { id: "COL-001", name: "Harvard University", country: "USA", ranking: "#1" },
    { id: "COL-002", name: "Stanford University", country: "USA", ranking: "#2" },
    { id: "COL-003", name: "MIT", country: "USA", ranking: "#3" },
  ]

  // Sample courses
  const courses = [
    { id: "CRS-001", name: "MBA", duration: "2 years", tuitionFee: "$73,440/year", applicationFee: "$250" },
    {
      id: "CRS-002",
      name: "MS Computer Science",
      duration: "2 years",
      tuitionFee: "$55,000/year",
      applicationFee: "$200",
    },
    { id: "CRS-003", name: "MS Data Science", duration: "2 years", tuitionFee: "$60,000/year", applicationFee: "$200" },
  ]

  const steps = [
    { number: 1, title: "Student Info", description: "Student details" },
    { number: 2, title: "College & Course", description: "Program selection" },
    { number: 3, title: "Application Details", description: "Application information" },
    { number: 4, title: "Commission", description: "Commission structure" },
  ]

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveDraft = () => {
    console.log("[v0] Saving draft:", formData)
    router.push(`/admin/applications/${params.id}`)
  }

  const handleUpdate = () => {
    console.log("[v0] Updating application:", formData)
    router.push(`/admin/applications/${params.id}`)
  }

  const handleStudentSelect = (student: any) => {
    setFormData({
      ...formData,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      studentPhone: student.phone,
    })
  }

  const handleCollegeSelect = (college: any) => {
    setFormData({
      ...formData,
      collegeId: college.id,
      collegeName: college.name,
    })
  }

  const handleCourseSelect = (course: any) => {
    setFormData({
      ...formData,
      courseId: course.id,
      courseName: course.name,
      duration: course.duration,
      tuitionFee: course.tuitionFee,
      applicationFee: course.applicationFee,
    })
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
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Application</h1>
            <p className="text-sm text-gray-600 mt-1">Update application details for {formData.studentName}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleSaveDraft}>
          <Save className="w-4 h-4" />
          Save Draft
        </Button>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`text-center ${step.number === currentStep ? "opacity-100" : "opacity-50"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-semibold ${
                    step.number <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Student Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{formData.studentName}</p>
                    <p className="text-sm text-gray-600">{formData.studentId}</p>
                    <p className="text-sm text-gray-600">{formData.studentEmail}</p>
                    <p className="text-sm text-gray-600">{formData.studentPhone}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData({ ...formData, studentId: "", studentName: "", studentEmail: "", studentPhone: "" })
                    }
                  >
                    Change Student
                  </Button>
                </div>
              </div>

              {!formData.studentId && (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search students by name, email, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Select from existing students:</p>
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleStudentSelect(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.id}</p>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: College & Course */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>College</Label>
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{formData.collegeName}</p>
                      <p className="text-sm text-gray-600">{formData.collegeId}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, collegeId: "", collegeName: "" })}
                    >
                      Change
                    </Button>
                  </div>
                </div>

                {!formData.collegeId && (
                  <div className="space-y-3">
                    {colleges.map((college) => (
                      <div
                        key={college.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCollegeSelect(college)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{college.name}</p>
                            <p className="text-sm text-gray-600">
                              {college.country} • Ranking: {college.ranking}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Select
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Course</Label>
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{formData.courseName}</p>
                      <p className="text-sm text-gray-600">{formData.courseId}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          courseId: "",
                          courseName: "",
                          duration: "",
                          tuitionFee: "",
                          applicationFee: "",
                        })
                      }
                    >
                      Change
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{formData.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tuition Fee</p>
                      <p className="font-medium">{formData.tuitionFee}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Application Fee</p>
                      <p className="font-medium">{formData.applicationFee}</p>
                    </div>
                  </div>
                </div>

                {!formData.courseId && (
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCourseSelect(course)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{course.name}</p>
                            <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Select
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Tuition: {course.tuitionFee}</span>
                          <span>Application Fee: {course.applicationFee}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="intake">Intake</Label>
                    <Select
                      value={formData.intake}
                      onValueChange={(value) => setFormData({ ...formData, intake: value })}
                    >
                      <SelectTrigger id="intake">
                        <SelectValue placeholder="Select intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                        <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                        <SelectItem value="Fall 2026">Fall 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Application Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applicationDate">Application Date</Label>
                  <Input
                    id="applicationDate"
                    type="date"
                    value={formData.applicationDate}
                    onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="counselor">Assigned Counselor</Label>
                  <Select
                    value={formData.counselorId}
                    onValueChange={(value) => setFormData({ ...formData, counselorId: value })}
                  >
                    <SelectTrigger id="counselor">
                      <SelectValue placeholder="Select counselor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CNS-001">Amit Kumar</SelectItem>
                      <SelectItem value="CNS-002">Priya Singh</SelectItem>
                      <SelectItem value="CNS-003">Rahul Sharma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subAgent">Sub-Agent (Optional)</Label>
                  <Select
                    value={formData.subAgentId}
                    onValueChange={(value) => setFormData({ ...formData, subAgentId: value })}
                  >
                    <SelectTrigger id="subAgent">
                      <SelectValue placeholder="Select sub-agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SA-001">Global Education Partners</SelectItem>
                      <SelectItem value="SA-002">Study Abroad Consultants</SelectItem>
                      <SelectItem value="SA-003">International Education Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes or comments..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 4: Commission & Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-3">Application Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student:</span>
                    <span className="font-medium">{formData.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">College:</span>
                    <span className="font-medium">{formData.collegeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{formData.courseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Intake:</span>
                    <span className="font-medium">{formData.intake}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Commission Structure</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="collegeCommission">College Commission ($)</Label>
                    <Input
                      id="collegeCommission"
                      type="number"
                      placeholder="5000"
                      value={formData.collegeCommission}
                      onChange={(e) => setFormData({ ...formData, collegeCommission: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subAgentCommission">Sub-Agent Commission ($)</Label>
                    <Input
                      id="subAgentCommission"
                      type="number"
                      placeholder="1500"
                      value={formData.subAgentCommission}
                      onChange={(e) => setFormData({ ...formData, subAgentCommission: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meritcapRevenue">MeritCap Revenue ($)</Label>
                  <Input
                    id="meritcapRevenue"
                    type="number"
                    placeholder="3500"
                    value={formData.meritcapRevenue}
                    onChange={(e) => setFormData({ ...formData, meritcapRevenue: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={formData.paymentTerms}
                  onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}
                >
                  <SelectTrigger id="paymentTerms">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enrollment">After Enrollment Confirmation</SelectItem>
                    <SelectItem value="offer">After Offer Letter</SelectItem>
                    <SelectItem value="visa">After Visa Approval</SelectItem>
                    <SelectItem value="arrival">After Student Arrival</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Commission</span>
                  <span className="text-2xl font-bold text-green-600">
                    $
                    {(
                      Number.parseFloat(formData.collegeCommission || "0") +
                      Number.parseFloat(formData.subAgentCommission || "0") +
                      Number.parseFloat(formData.meritcapRevenue || "0")
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSaveDraft} className="gap-2 bg-transparent">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleUpdate} className="gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Update Application
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

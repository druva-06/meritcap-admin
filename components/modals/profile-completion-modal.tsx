"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  Target,
  TrendingUp,
  X,
  Calendar,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
  MapPin,
  Clock,
} from "lucide-react"
import type { UnifiedUserProfile } from "@/types/user"

interface ProfileCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (profileData: UnifiedUserProfile) => void
  onSkip: () => void
  userData: any
}

export function ProfileCompletionModal({ isOpen, onClose, onComplete, onSkip, userData }: ProfileCompletionModalProps) {
  const [profileData, setProfileData] = useState<Partial<UnifiedUserProfile>>({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    hasAcademicGap: false,
    gapStartDate: "",
    gapEndDate: "",
    gapReason: "",
    lastDegreeType: "",
    lastDegreeUniversity: "",
    lastDegreePercentage: "",
    backlogCount: "0",
    testStatus: "",
    testType: "",
    testOverallScore: "",
    testListening: "",
    testReading: "",
    testWriting: "",
    testSpeaking: "",
    workExperience: "",
    relevantProjects: "",
    entranceExamStatus: "",
    entranceExamDetails: "",
    statePreference: "",
    courseDuration: "",
    budgetRange: "",
    learningSchedule: "",
    certificationTypePreference: "",
    industryFocus: "",
    documentPreferences: {
      autoNaming: true,
      categoryPreference: "academic-first",
      uploadReminders: true,
    },
    applicationPreferences: {
      autoFillFromProfile: true,
      saveAsDraft: true,
      reminderFrequency: "weekly",
    },
  })

  const getCurrentCategory = () => {
    const searchParams = JSON.parse(localStorage.getItem("search_parameters") || "{}")
    if (searchParams.vertical) {
      if (searchParams.vertical === "study-india" || searchParams.vertical === "india") {
        return "india"
      }
      if (searchParams.vertical === "study-online" || searchParams.vertical === "online") {
        return "online"
      }
      if (searchParams.vertical === "study-abroad" || searchParams.vertical === "abroad") {
        return "abroad"
      }
    }

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const vertical = urlParams.get("vertical")
      if (vertical) {
        if (vertical === "study-india" || vertical === "india") {
          return "india"
        }
        if (vertical === "study-online" || vertical === "online") {
          return "online"
        }
        if (vertical === "study-abroad" || vertical === "abroad") {
          return "abroad"
        }
      }
    }

    if (typeof window !== "undefined") {
      const path = window.location.pathname
      if (path.includes("/study/india") || path.includes("vertical=india")) {
        return "india"
      }
      if (path.includes("/study/online") || path.includes("vertical=online")) {
        return "online"
      }
      if (path.includes("/study/abroad") || path.includes("vertical=abroad")) {
        return "abroad"
      }
    }

    return "abroad"
  }

  const currentCategory = getCurrentCategory()

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplete = () => {
    const completeProfile: UnifiedUserProfile = {
      name: profileData.name || "",
      email: profileData.email || "",
      phone: profileData.phone || "",
      dateOfBirth: "",
      nationality: "",
      currentLocation: "",
      lastEducation: profileData.lastDegreeType || "",
      lastEducationPercentage: profileData.lastDegreePercentage || "",
      lastEducationYear: "",
      lastEducationInstitution: profileData.lastDegreeUniversity || "",
      tenth_year: "",
      tenth_percentage: "",
      twelfth_year: "",
      twelfth_percentage: "",
      current_degree_type: profileData.lastDegreeType || "",
      current_degree_year: "",
      current_degree_percentage: profileData.lastDegreePercentage || "",
      budget_range: profileData.budgetRange || "",
      preferred_countries: [],
      alternate_countries: [],
      work_experience: profileData.workExperience || "",
      projects: profileData.relevantProjects || "",
      overall_test_score: profileData.testOverallScore || "",
      listening_score: profileData.testListening || "",
      reading_score: profileData.testReading || "",
      writing_score: profileData.testWriting || "",
      speaking_score: profileData.testSpeaking || "",
      hasTestScores: profileData.testStatus === "yes",
      testScores: [],
      hasAcademicGap: profileData.hasAcademicGap || false,
      gapDetails: profileData.hasAcademicGap
        ? {
            startDate: profileData.gapStartDate,
            endDate: profileData.gapEndDate,
            reason: profileData.gapReason,
          }
        : undefined,
      backlogCount: Number.parseInt(profileData.backlogCount || "0"),
      testStatus: profileData.testStatus || "",
      profileCompleted: true,
      profileCompletion: 90,
      profileStage: "comprehensive",
      studentId: userData?.studentId || `WC${Date.now()}`,
      loginTime: userData?.loginTime,
      signupTime: userData?.signupTime || new Date().toISOString(),
      documentPreferences: profileData.documentPreferences,
      applicationPreferences: profileData.applicationPreferences,
      verticalPreferences: {
        primary: currentCategory,
        interests: [currentCategory],
        experienceLevel: profileData.workExperience ? "experienced" : "beginner",
      },
    }

    localStorage.setItem("meritcap_user", JSON.stringify(completeProfile))
    localStorage.setItem("meritcap_profile_completion_date", new Date().toISOString())
    localStorage.setItem("meritcap_vertical_preference", currentCategory)

    onComplete(completeProfile)
  }

  const handleSkipProfile = () => {
    const skippedProfile: UnifiedUserProfile = {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      dateOfBirth: "",
      nationality: "",
      currentLocation: "",
      lastEducation: "",
      lastEducationPercentage: "",
      lastEducationYear: "",
      lastEducationInstitution: "",
      hasTestScores: false,
      testScores: [],
      profileCompleted: false,
      profileSkipped: true,
      profileCompletion: 25,
      profileStage: "basic",
      studentId: userData?.studentId || `WC${Date.now()}`,
      loginTime: userData?.loginTime,
      signupTime: userData?.signupTime || new Date().toISOString(),
    }

    localStorage.setItem("meritcap_user", JSON.stringify(skippedProfile))
    onSkip()
  }

  const renderCategoryQuestions = () => {
    if (currentCategory === "india") {
      return (
        <>
          {/* Study India Q1: Entrance Exam Status */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-800">Q1. Have you appeared for any entrance exams?</h3>
            </div>
            <p className="text-sm text-blue-600 mb-3">JEE, NEET, CAT, GATE, etc.</p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={profileData.entranceExamStatus === "yes" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("entranceExamStatus", "yes")}
                  className={
                    profileData.entranceExamStatus === "yes"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                      : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                  }
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={profileData.entranceExamStatus === "no" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("entranceExamStatus", "no")}
                  className={
                    profileData.entranceExamStatus === "no"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                      : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                  }
                >
                  No
                </Button>
              </div>

              {profileData.entranceExamStatus === "yes" && (
                <div>
                  <Label className="text-sm font-medium text-blue-700 mb-1 block">Exam Details & Scores</Label>
                  <Input
                    placeholder="JEE Main - 95 percentile, GATE - 720/1000"
                    value={profileData.entranceExamDetails || ""}
                    onChange={(e) => handleInputChange("entranceExamDetails", e.target.value)}
                    className="h-9 bg-white border-blue-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Study India Q2: State Preference */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-800">
                Q2. Do you prefer studying in your home state or open to other states?
              </h3>
            </div>

            <Select
              value={profileData.statePreference || ""}
              onValueChange={(value) => handleInputChange("statePreference", value)}
            >
              <SelectTrigger className="h-10 bg-white border-purple-300 max-w-md">
                <SelectValue placeholder="Select your preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home-state">Prefer Home State</SelectItem>
                <SelectItem value="open-to-all">Open to All States</SelectItem>
                <SelectItem value="specific-states">Specific States Only</SelectItem>
                <SelectItem value="metro-cities">Metro Cities Preferred</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Study India Q3: Course Duration */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-800">
                Q3. Are you looking for regular degree programs or short-term certification courses?
              </h3>
            </div>

            <Select
              value={profileData.courseDuration || ""}
              onValueChange={(value) => handleInputChange("courseDuration", value)}
            >
              <SelectTrigger className="h-10 bg-white border-blue-300 max-w-md">
                <SelectValue placeholder="Select course type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular-degree">Regular Degree Programs (3-4 years)</SelectItem>
                <SelectItem value="short-term">Short-term Certification (6 months - 1 year)</SelectItem>
                <SelectItem value="diploma">Diploma Programs (1-2 years)</SelectItem>
                <SelectItem value="both">Open to Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Study India Q4: Budget Range */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-800">Q4. What's your annual budget for education?</h3>
            </div>

            <Select
              value={profileData.budgetRange || ""}
              onValueChange={(value) => handleInputChange("budgetRange", value)}
            >
              <SelectTrigger className="h-10 bg-white border-purple-300 max-w-md">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1L-3L">₹1L - ₹3L per year</SelectItem>
                <SelectItem value="3L-8L">₹3L - ₹8L per year</SelectItem>
                <SelectItem value="10L-15L">₹10L - ₹15L per year</SelectItem>
                <SelectItem value="15L+">₹15L+ per year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )
    } else if (currentCategory === "online") {
      return (
        <>
          {/* Study Online Q1: Current Work Status */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-800">Q1. Are you currently working?</h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                type="button"
                variant={profileData.workStatus === "full-time" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("workStatus", "full-time")}
                className={
                  profileData.workStatus === "full-time"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Full-time
              </Button>
              <Button
                type="button"
                variant={profileData.workStatus === "part-time" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("workStatus", "part-time")}
                className={
                  profileData.workStatus === "part-time"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Part-time
              </Button>
              <Button
                type="button"
                variant={profileData.workStatus === "student" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("workStatus", "student")}
                className={
                  profileData.workStatus === "student"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Student
              </Button>
              <Button
                type="button"
                variant={profileData.workStatus === "between-jobs" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("workStatus", "between-jobs")}
                className={
                  profileData.workStatus === "between-jobs"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Between jobs
              </Button>
            </div>
          </div>

          {/* Study Online Q2: Time Availability */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-800">
                Q2. How many hours per week can you dedicate to studies?
              </h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                type="button"
                variant={profileData.timeAvailability === "5-10hrs" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("timeAvailability", "5-10hrs")}
                className={
                  profileData.timeAvailability === "5-10hrs"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                5-10 hours
              </Button>
              <Button
                type="button"
                variant={profileData.timeAvailability === "10-20hrs" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("timeAvailability", "10-20hrs")}
                className={
                  profileData.timeAvailability === "10-20hrs"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                10-20 hours
              </Button>
              <Button
                type="button"
                variant={profileData.timeAvailability === "20+hrs" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("timeAvailability", "20+hrs")}
                className={
                  profileData.timeAvailability === "20+hrs"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                20+ hours
              </Button>
            </div>
          </div>

          {/* Study Online Q3: Career Goal */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-800">Q3. What's your primary goal?</h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                type="button"
                variant={profileData.careerGoal === "career-change" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("careerGoal", "career-change")}
                className={
                  profileData.careerGoal === "career-change"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Career change
              </Button>
              <Button
                type="button"
                variant={profileData.careerGoal === "skill-upgrade" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("careerGoal", "skill-upgrade")}
                className={
                  profileData.careerGoal === "skill-upgrade"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Skill upgrade
              </Button>
              <Button
                type="button"
                variant={profileData.careerGoal === "promotion" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("careerGoal", "promotion")}
                className={
                  profileData.careerGoal === "promotion"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Promotion
              </Button>
              <Button
                type="button"
                variant={profileData.careerGoal === "start-business" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("careerGoal", "start-business")}
                className={
                  profileData.careerGoal === "start-business"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Start business
              </Button>
            </div>
          </div>

          {/* Study Online Q4: Budget Range */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-800">Q4. What's your budget for the entire program?</h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                type="button"
                variant={profileData.budgetRange === "50K-2L" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("budgetRange", "50K-2L")}
                className={
                  profileData.budgetRange === "50K-2L"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                ₹50K - ₹2L
              </Button>
              <Button
                type="button"
                variant={profileData.budgetRange === "2L-5L" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("budgetRange", "2L-5L")}
                className={
                  profileData.budgetRange === "2L-5L"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                ₹2L - ₹5L
              </Button>
              <Button
                type="button"
                variant={profileData.budgetRange === "5L+" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("budgetRange", "5L+")}
                className={
                  profileData.budgetRange === "5L+"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                ₹5L+
              </Button>
            </div>
          </div>
        </>
      )
    }

    // Default questions for Study Abroad
    return (
      <>
        {/* Q1: Academic Gap */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-blue-800">Q1. Do you have any Gap in Academics?</h3>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={profileData.hasAcademicGap === false ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("hasAcademicGap", false)}
                className={
                  profileData.hasAcademicGap === false
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                No
              </Button>
              <Button
                type="button"
                variant={profileData.hasAcademicGap === true ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("hasAcademicGap", true)}
                className={
                  profileData.hasAcademicGap === true
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Yes
              </Button>
            </div>

            {profileData.hasAcademicGap && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label className="text-sm font-medium text-blue-700 mb-1 block">From (Month/Year)</Label>
                  <Input
                    placeholder="06/2020"
                    value={profileData.gapStartDate || ""}
                    onChange={(e) => handleInputChange("gapStartDate", e.target.value)}
                    className="h-9 bg-white border-blue-300"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-blue-700 mb-1 block">To (Month/Year)</Label>
                  <Input
                    placeholder="12/2020"
                    value={profileData.gapEndDate || ""}
                    onChange={(e) => handleInputChange("gapEndDate", e.target.value)}
                    className="h-9 bg-white border-blue-300"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-blue-700 mb-1 block">Reason for Gap</Label>
                  <Input
                    placeholder="Preparation for competitive exams"
                    value={profileData.gapReason || ""}
                    onChange={(e) => handleInputChange("gapReason", e.target.value)}
                    className="h-9 bg-white border-blue-300"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Q2: Last Degree */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-800">Q2. What is your last degree?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-sm font-medium text-purple-700 mb-1 block">Course Name</Label>
              <Input
                placeholder="B.Tech Computer Science"
                value={profileData.lastDegreeType || ""}
                onChange={(e) => handleInputChange("lastDegreeType", e.target.value)}
                className="h-9 bg-white border-purple-300"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-purple-700 mb-1 block">University</Label>
              <Input
                placeholder="JNTU Hyderabad"
                value={profileData.lastDegreeUniversity || ""}
                onChange={(e) => handleInputChange("lastDegreeUniversity", e.target.value)}
                className="h-9 bg-white border-purple-300"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-purple-700 mb-1 block">Percentage/CGPA</Label>
              <Input
                placeholder="85% or 8.5 CGPA"
                value={profileData.lastDegreePercentage || ""}
                onChange={(e) => handleInputChange("lastDegreePercentage", e.target.value)}
                className="h-9 bg-white border-purple-300"
              />
            </div>
          </div>
        </div>

        {/* Q3: Backlog Count */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-blue-800">Q3. Backlog Count</h3>
          </div>

          <Select
            value={profileData.backlogCount || "0"}
            onValueChange={(value) => handleInputChange("backlogCount", value)}
          >
            <SelectTrigger className="h-10 bg-white border-blue-300 max-w-xs">
              <SelectValue placeholder="Select backlog count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No Backlogs</SelectItem>
              <SelectItem value="1">1 Backlog</SelectItem>
              <SelectItem value="2">2 Backlogs</SelectItem>
              <SelectItem value="3">3 Backlogs</SelectItem>
              <SelectItem value="4">4 Backlogs</SelectItem>
              <SelectItem value="5+">5+ Backlogs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Q4: Test Scores */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-800">Q4. Have you written any test?</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={profileData.testStatus === "yes" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("testStatus", "yes")}
                className={
                  profileData.testStatus === "yes"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={profileData.testStatus === "about-to-write" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("testStatus", "about-to-write")}
                className={
                  profileData.testStatus === "about-to-write"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                About to write
              </Button>
              <Button
                type="button"
                variant={profileData.testStatus === "not-interested" ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("testStatus", "not-interested")}
                className={
                  profileData.testStatus === "not-interested"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
                    : "border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 bg-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                }
              >
                No, not interested
              </Button>
            </div>

            {profileData.testStatus === "yes" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-purple-700 mb-1 block">Test Type</Label>
                    <Select
                      value={profileData.testType || ""}
                      onValueChange={(value) => handleInputChange("testType", value)}
                    >
                      <SelectTrigger className="h-9 bg-white border-purple-300">
                        <SelectValue placeholder="Select test" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IELTS">IELTS</SelectItem>
                        <SelectItem value="TOEFL">TOEFL</SelectItem>
                        <SelectItem value="GRE">GRE</SelectItem>
                        <SelectItem value="GMAT">GMAT</SelectItem>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="PTE">PTE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-purple-700 mb-1 block">Overall Score</Label>
                    <Input
                      placeholder="7.5 or 320"
                      value={profileData.testOverallScore || ""}
                      onChange={(e) => handleInputChange("testOverallScore", e.target.value)}
                      className="h-9 bg-white border-purple-300"
                    />
                  </div>
                </div>

                {(profileData.testType === "IELTS" ||
                  profileData.testType === "TOEFL" ||
                  profileData.testType === "PTE") && (
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <Label className="text-sm font-medium text-purple-700 mb-1 block">Listening</Label>
                      <Input
                        placeholder="7.0"
                        value={profileData.testListening || ""}
                        onChange={(e) => handleInputChange("testListening", e.target.value)}
                        className="h-9 bg-white border-purple-300"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-purple-700 mb-1 block">Reading</Label>
                      <Input
                        placeholder="7.5"
                        value={profileData.testReading || ""}
                        onChange={(e) => handleInputChange("testReading", e.target.value)}
                        className="h-9 bg-white border-purple-300"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-purple-700 mb-1 block">Writing</Label>
                      <Input
                        placeholder="6.5"
                        value={profileData.testWriting || ""}
                        onChange={(e) => handleInputChange("testWriting", e.target.value)}
                        className="h-9 bg-white border-purple-300"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-purple-700 mb-1 block">Speaking</Label>
                      <Input
                        placeholder="7.0"
                        value={profileData.testSpeaking || ""}
                        onChange={(e) => handleInputChange("testSpeaking", e.target.value)}
                        className="h-9 bg-white border-purple-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Q5: Work Experience & Projects */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-blue-800">
              Q5. Do you have any Relevant Projects or Work Experience?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-blue-700 mb-1 block">Work Experience</Label>
              <Input
                placeholder="2 years as Software Developer at TCS"
                value={profileData.workExperience || ""}
                onChange={(e) => handleInputChange("workExperience", e.target.value)}
                className="h-9 bg-white border-blue-300"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-blue-700 mb-1 block">Relevant Projects</Label>
              <Input
                placeholder="E-commerce website, Machine Learning model"
                value={profileData.relevantProjects || ""}
                onChange={(e) => handleInputChange("relevantProjects", e.target.value)}
                className="h-9 bg-white border-blue-300"
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const isFormValid = () => {
    if (currentCategory === "india") {
      return !!(
        profileData.entranceExamStatus &&
        profileData.statePreference &&
        profileData.courseDuration &&
        profileData.budgetRange
      )
    } else if (currentCategory === "online") {
      return !!(
        profileData.workStatus &&
        profileData.timeAvailability &&
        profileData.careerGoal &&
        profileData.budgetRange
      )
    }

    return !!(profileData.lastDegreeType && profileData.lastDegreePercentage && profileData.backlogCount !== undefined)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-xl p-0">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 rounded-t-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">Answer few Questions</DialogTitle>
            <p className="text-blue-100 text-base mb-1">Get Personalized University Recommendations</p>
            <div className="flex items-center justify-center gap-2 text-sm bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 inline-flex">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>takes 2 minutes | For Accurate results</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">{renderCategoryQuestions()}</div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 rounded-b-lg border-t border-blue-200">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleSkipProfile}
              className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-white px-4 py-2"
            >
              Skip for Now
            </Button>

            <div className="text-center">
              <Button
                onClick={handleComplete}
                disabled={!isFormValid()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Show My Matches
              </Button>
              <p className="text-xs text-blue-600 mt-1">Get personalized university recommendations</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

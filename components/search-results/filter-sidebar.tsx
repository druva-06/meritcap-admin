"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  X,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Target,
  Brain,
  Crown,
  Star,
  Users,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Zap,
} from "lucide-react"
import { Briefcase } from "lucide-react"

interface FilterState {
  countries: string[]
  levels: string[]
  duration: [number, number]
  exams: string[]
  feeRange: [number, number]
  deadline: Date | undefined
  mode: string[]
  // Advanced AI filters
  smartMatching: boolean
  successPrediction: boolean
  scholarshipIntelligence: boolean
  timelineOptimization: boolean
  admissionTrends: boolean
  competitionAnalysis: boolean
  seasonalInsights: boolean
  discountRequests: boolean
  placementRates: boolean
  researchOpportunities: boolean
  safetyMatchReach: boolean
  alternativeSuggestions: boolean
  hiddenGems: boolean
  costOptimization: boolean
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
  vertical: string
}

export function FilterSidebar({ onFilterChange, vertical }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    countries: [],
    levels: [],
    duration: [1, 4],
    exams: [],
    feeRange: [0, 100000],
    deadline: undefined,
    mode: [],
    // Advanced AI filters
    smartMatching: false,
    successPrediction: false,
    scholarshipIntelligence: false,
    timelineOptimization: false,
    admissionTrends: false,
    competitionAnalysis: false,
    seasonalInsights: false,
    discountRequests: false,
    placementRates: false,
    researchOpportunities: false,
    safetyMatchReach: false,
    alternativeSuggestions: false,
    hiddenGems: false,
    costOptimization: false,
  })

  const [openSections, setOpenSections] = useState({
    countries: true,
    levels: true,
    duration: true,
    exams: true,
    fees: true,
    aiPowered: false,
    marketIntel: false,
    universityData: false,
    recommendations: false,
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userTier, setUserTier] = useState<"free" | "premium">("free")

  useEffect(() => {
    // Check user login status and tier
    const user = localStorage.getItem("meritcap_user")
    if (user) {
      setIsLoggedIn(true)
      const userData = JSON.parse(user)
      setUserTier(userData.tier || "free")
    }
  }, [])

  // Filter options based on vertical
  const getFilterOptions = () => {
    switch (vertical) {
      case "study-abroad":
        return {
          countries: ["USA", "UK", "Canada", "Australia", "Germany", "France", "Netherlands", "Ireland"],
          levels: ["Undergraduate", "Postgraduate", "PhD", "Diploma"],
          exams: ["IELTS", "TOEFL", "GRE", "GMAT", "SAT", "PTE"],
        }
      case "study-india":
        return {
          countries: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"],
          levels: ["Undergraduate", "Postgraduate", "PhD", "Diploma"],
          exams: ["JEE", "NEET", "CAT", "GATE", "XAT", "MAT"],
        }
      case "study-online":
        return {
          countries: ["Global", "USA", "UK", "India", "Canada"],
          levels: ["Certificate", "Diploma", "Undergraduate", "Postgraduate"],
          exams: ["No Exam Required", "Entrance Test", "Interview"],
        }
      default:
        return {
          countries: ["USA", "UK", "Canada", "Australia"],
          levels: ["Undergraduate", "Postgraduate"],
          exams: ["IELTS", "TOEFL"],
        }
    }
  }

  const filterOptions = getFilterOptions()

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleArrayFilter = (key: "countries" | "levels" | "exams" | "mode", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
    }))
  }

  const toggleAdvancedFilter = (key: keyof FilterState) => {
    if (userTier === "free") {
      // Show upgrade modal or message
      alert("This feature is available for Premium users. Upgrade to access AI-powered insights!")
      return
    }
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const clearAllFilters = () => {
    setFilters({
      countries: [],
      levels: [],
      duration: [1, 4],
      exams: [],
      feeRange: [0, 100000],
      deadline: undefined,
      mode: [],
      smartMatching: false,
      successPrediction: false,
      scholarshipIntelligence: false,
      timelineOptimization: false,
      admissionTrends: false,
      competitionAnalysis: false,
      seasonalInsights: false,
      discountRequests: false,
      placementRates: false,
      researchOpportunities: false,
      safetyMatchReach: false,
      alternativeSuggestions: false,
      hiddenGems: false,
      costOptimization: false,
    })
  }

  const getActiveFiltersCount = () => {
    const basicFilters =
      filters.countries.length +
      filters.levels.length +
      filters.exams.length +
      (filters.duration[0] !== 1 || filters.duration[1] !== 4 ? 1 : 0) +
      (filters.feeRange[0] !== 0 || filters.feeRange[1] !== 100000 ? 1 : 0)

    const advancedFilters = Object.keys(filters)
      .filter(
        (key) =>
          key.includes("smart") ||
          key.includes("success") ||
          key.includes("scholarship") ||
          key.includes("timeline") ||
          key.includes("admission") ||
          key.includes("competition") ||
          key.includes("seasonal") ||
          key.includes("discount") ||
          key.includes("placement") ||
          key.includes("research") ||
          key.includes("safety") ||
          key.includes("alternative") ||
          key.includes("hidden") ||
          key.includes("cost"),
      )
      .filter((key) => filters[key as keyof FilterState]).length

    return basicFilters + advancedFilters
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const removeFilter = (type: string, value: string) => {
    if (type === "countries" || type === "levels" || type === "exams") {
      toggleArrayFilter(type as "countries" | "levels" | "exams", value)
    }
  }

  const getActiveFilterBadges = () => {
    const badges = []
    filters.countries.forEach((country) => badges.push({ type: "countries", value: country, label: country }))
    filters.levels.forEach((level) => badges.push({ type: "levels", value: level, label: level }))
    filters.exams.forEach((exam) => badges.push({ type: "exams", value: exam, label: exam }))

    // Add advanced filter badges
    if (filters.smartMatching) badges.push({ type: "advanced", value: "smartMatching", label: "Smart Matching" })
    if (filters.successPrediction)
      badges.push({ type: "advanced", value: "successPrediction", label: "Success Prediction" })
    if (filters.scholarshipIntelligence)
      badges.push({ type: "advanced", value: "scholarshipIntelligence", label: "Scholarship Intel" })

    return badges
  }

  const PremiumFeature = ({ children, feature }: { children: React.ReactNode; feature: string }) => (
    <div className={`relative ${userTier === "free" ? "opacity-60" : ""}`}>
      {children}
      {userTier === "free" && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Crown className="w-4 h-4 text-amber-600 mr-1" />
          <span className="text-xs font-medium text-amber-700">Premium</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="w-[280px] space-y-4">
      {/* Filter Header */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              Filters
            </CardTitle>
            {getActiveFiltersCount() > 0 && (
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">{getActiveFiltersCount()}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs px-2 py-1 h-6"
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Filter Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger value="basic" className="text-sm">
            Basic Filters
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Filters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          {/* Active Filters */}
          {getActiveFilterBadges().length > 0 && (
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {getActiveFilterBadges().map((badge, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-50 text-blue-700 border-blue-200 text-xs flex items-center gap-1 px-2 py-1"
                    >
                      {badge.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-3 w-3 p-0 hover:bg-blue-200 ml-1"
                        onClick={() => removeFilter(badge.type, badge.value)}
                      >
                        <X className="w-2 h-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Countries/Cities Filter */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.countries} onOpenChange={() => toggleSection("countries")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">
                      {vertical === "study-india" ? "Cities" : "Countries"}
                    </CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.countries ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  {filterOptions.countries.map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country}`}
                        checked={filters.countries.includes(country)}
                        onCheckedChange={() => toggleArrayFilter("countries", country)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`country-${country}`}
                        className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      >
                        {country}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Study Level Filter */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.levels} onOpenChange={() => toggleSection("levels")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Study Level</CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.levels ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  {filterOptions.levels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={filters.levels.includes(level)}
                        onCheckedChange={() => toggleArrayFilter("levels", level)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`level-${level}`}
                        className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Duration Filter */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.duration} onOpenChange={() => toggleSection("duration")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Duration</CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.duration ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-4">
                  <div className="px-2">
                    <Slider
                      value={filters.duration}
                      onValueChange={(value) => updateFilter("duration", value as [number, number])}
                      max={6}
                      min={1}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>
                      {filters.duration[0]} year{filters.duration[0] !== 1 ? "s" : ""}
                    </span>
                    <span>
                      {filters.duration[1]} year{filters.duration[1] !== 1 ? "s" : ""}
                    </span>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Required Exams Filter */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.exams} onOpenChange={() => toggleSection("exams")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">Required Exams</CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.exams ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  {filterOptions.exams.map((exam) => (
                    <div key={exam} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exam-${exam}`}
                        checked={filters.exams.includes(exam)}
                        onCheckedChange={() => toggleArrayFilter("exams", exam)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`exam-${exam}`}
                        className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      >
                        {exam}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Tuition Fees Filter */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.fees} onOpenChange={() => toggleSection("fees")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800">
                      Tuition Fees ({vertical === "study-india" ? "₹" : "$"})
                    </CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.fees ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-4">
                  <div className="px-2">
                    <Slider
                      value={filters.feeRange}
                      onValueChange={(value) => updateFilter("feeRange", value as [number, number])}
                      max={100000}
                      min={0}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>
                      {vertical === "study-india" ? "₹" : "$"}
                      {filters.feeRange[0].toLocaleString()}
                    </span>
                    <span>
                      {vertical === "study-india" ? "₹" : "$"}
                      {filters.feeRange[1].toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          {/* Premium Upgrade Banner for Free Users */}
          {userTier === "free" && (
            <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold text-amber-800 mb-1">Unlock AI-Powered Insights</h3>
                <p className="text-xs text-amber-700 mb-3">Get personalized recommendations and market intelligence</p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-4 py-2">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}

          {/* AI-Powered Intelligence */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.aiPowered} onOpenChange={() => toggleSection("aiPowered")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      AI-Powered Intelligence
                    </CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.aiPowered ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  <PremiumFeature feature="smartMatching">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smart-matching"
                        checked={filters.smartMatching}
                        onCheckedChange={() => toggleAdvancedFilter("smartMatching")}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="smart-matching"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Smart Matching
                        </label>
                        <p className="text-xs text-gray-500">Universities where students like you got admitted</p>
                        {filters.smartMatching && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <Target className="w-3 h-3" />
                              <span>87% match found</span>
                            </div>
                            <Progress value={87} className="h-1 mt-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="successPrediction">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="success-prediction"
                        checked={filters.successPrediction}
                        onCheckedChange={() => toggleAdvancedFilter("successPrediction")}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="success-prediction"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Success Prediction
                        </label>
                        <p className="text-xs text-gray-500">Your admission probability based on similar profiles</p>
                        {filters.successPrediction && (
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-green-600">High: 12 universities</span>
                              <span className="text-amber-600">Medium: 8 universities</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="scholarshipIntelligence">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="scholarship-intelligence"
                        checked={filters.scholarshipIntelligence}
                        onCheckedChange={() => toggleAdvancedFilter("scholarshipIntelligence")}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="scholarship-intelligence"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Scholarship Intelligence
                        </label>
                        <p className="text-xs text-gray-500">Scholarships you're likely to get based on your profile</p>
                        {filters.scholarshipIntelligence && (
                          <div className="mt-2">
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              <span>$15K-$25K potential scholarships</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="timelineOptimization">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="timeline-optimization"
                        checked={filters.timelineOptimization}
                        onCheckedChange={() => toggleAdvancedFilter("timelineOptimization")}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="timeline-optimization"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Timeline Optimization
                        </label>
                        <p className="text-xs text-gray-500">Best application timeline for your profile</p>
                        {filters.timelineOptimization && (
                          <div className="mt-2">
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Apply by Feb 15 for best results</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Market Intelligence */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.marketIntel} onOpenChange={() => toggleSection("marketIntel")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Market Intelligence
                    </CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.marketIntel ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  <PremiumFeature feature="admissionTrends">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="admission-trends"
                        checked={filters.admissionTrends}
                        onCheckedChange={() => toggleAdvancedFilter("admissionTrends")}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="admission-trends"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Admission Trends
                        </label>
                        <p className="text-xs text-gray-500">Acceptance rates trending up/down</p>
                        {filters.admissionTrends && (
                          <div className="mt-2">
                            <div className="text-xs text-green-600 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>15% increase in acceptance rates</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="competitionAnalysis">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="competition-analysis"
                        checked={filters.competitionAnalysis}
                        onCheckedChange={() => toggleAdvancedFilter("competitionAnalysis")}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="competition-analysis"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Competition Analysis
                        </label>
                        <p className="text-xs text-gray-500">How many students with similar profiles applied</p>
                        {filters.competitionAnalysis && (
                          <div className="mt-2">
                            <div className="text-xs text-amber-600 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>Medium competition: 1,200 similar profiles</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="seasonalInsights">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="seasonal-insights"
                        checked={filters.seasonalInsights}
                        onCheckedChange={() => toggleAdvancedFilter("seasonalInsights")}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="seasonal-insights"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Seasonal Insights
                        </label>
                        <p className="text-xs text-gray-500">Best time to apply based on historical data</p>
                        {filters.seasonalInsights && (
                          <div className="mt-2">
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Early applications have 23% higher success</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="discountRequests">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="discount-requests"
                        checked={filters.discountRequests}
                        onCheckedChange={() => toggleAdvancedFilter("discountRequests")}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="discount-requests"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Request for Discount
                        </label>
                        <p className="text-xs text-gray-500">Universities offering fee waivers and discounts</p>
                        {filters.discountRequests && (
                          <div className="mt-2">
                            <div className="text-xs text-green-600 flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>12 universities offer fee discounts</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Hidden University Data */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.universityData} onOpenChange={() => toggleSection("universityData")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-600" />
                      Hidden University Data
                    </CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.universityData ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  <PremiumFeature feature="placementRates">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="placement-rates"
                        checked={filters.placementRates}
                        onCheckedChange={() => toggleAdvancedFilter("placementRates")}
                        className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="placement-rates"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Industry Placement Rates
                        </label>
                        <p className="text-xs text-gray-500">Placement rates for your background</p>
                        {filters.placementRates && (
                          <div className="mt-2">
                            <div className="text-xs text-green-600 flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              <span>92% placement rate in your field</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="researchOpportunities">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="research-opportunities"
                        checked={filters.researchOpportunities}
                        onCheckedChange={() => toggleAdvancedFilter("researchOpportunities")}
                        className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="research-opportunities"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Research Opportunities
                        </label>
                        <p className="text-xs text-gray-500">Research opportunities matching your interests</p>
                        {filters.researchOpportunities && (
                          <div className="mt-2">
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              <span>8 research labs match your interests</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Personalized Recommendations */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <Collapsible open={openSections.recommendations} onOpenChange={() => toggleSection("recommendations")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-600" />
                      Personalized Recommendations
                    </CardTitle>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${openSections.recommendations ? "rotate-180" : ""}`}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4 space-y-3">
                  <PremiumFeature feature="safetyMatchReach">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="safety-match-reach"
                        checked={filters.safetyMatchReach}
                        onCheckedChange={() => toggleAdvancedFilter("safetyMatchReach")}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="safety-match-reach"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Safety/Match/Reach Schools
                        </label>
                        <p className="text-xs text-gray-500">University categorization based on your profile</p>
                        {filters.safetyMatchReach && (
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-green-600">Safety: 8</span>
                              <span className="text-amber-600">Match: 12</span>
                              <span className="text-red-600">Reach: 5</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="alternativeSuggestions">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alternative-suggestions"
                        checked={filters.alternativeSuggestions}
                        onCheckedChange={() => toggleAdvancedFilter("alternativeSuggestions")}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="alternative-suggestions"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Alternative Suggestions
                        </label>
                        <p className="text-xs text-gray-500">Similar programs you might like</p>
                        {filters.alternativeSuggestions && (
                          <div className="mt-2">
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              <span>6 alternative programs found</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="hiddenGems">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hidden-gems"
                        checked={filters.hiddenGems}
                        onCheckedChange={() => toggleAdvancedFilter("hiddenGems")}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <label htmlFor="hidden-gems" className="text-sm font-medium text-gray-700 cursor-pointer block">
                          Hidden Gems
                        </label>
                        <p className="text-xs text-gray-500">Underrated universities with great outcomes</p>
                        {filters.hiddenGems && (
                          <div className="mt-2">
                            <div className="text-xs text-purple-600 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>4 hidden gem universities identified</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>

                  <PremiumFeature feature="costOptimization">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cost-optimization"
                        checked={filters.costOptimization}
                        onCheckedChange={() => toggleAdvancedFilter("costOptimization")}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="cost-optimization"
                          className="text-sm font-medium text-gray-700 cursor-pointer block"
                        >
                          Cost Optimization
                        </label>
                        <p className="text-xs text-gray-500">Cheaper alternatives with similar outcomes</p>
                        {filters.costOptimization && (
                          <div className="mt-2">
                            <div className="text-xs text-green-600 flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>Save up to $20K with alternatives</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </PremiumFeature>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

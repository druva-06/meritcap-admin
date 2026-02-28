"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  ArrowUpDown,
  X,
  Heart,
  MapPin,
  Clock,
  User,
  Calendar,
  DollarSign,
  Award,
  BookOpen,
  Check,
} from "lucide-react"
import { studyOnlineCourses } from "@/lib/sample-data"
import { AuthLoginModal } from "@/components/modals/auth-login-modal"
import { ProfileCompletionModal } from "@/components/modals/profile-completion-modal"
import { TopBanner } from "@/components/search-results/top-banner"
import { AdBanner } from "@/components/search-results/ad-banner"
import { HorizontalFilters } from "@/components/search-results/horizontal-filters"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { UnifiedUserProfile } from "@/types/user"

interface FilterState {
  countries: string[]
  levels: string[]
  duration: [number, number]
  exams: string[]
  feeRange: [number, number]
}

const initialFilters: FilterState = {
  countries: [],
  levels: [],
  duration: [0, 10],
  exams: [],
  feeRange: [0, 5000000],
}

function StudyOnlineSearchContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vertical = "study-online"
  const queryFromUrl = searchParams.get("q") || ""

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [searchInput, setSearchInput] = useState(queryFromUrl)
  const [searchQuery, setSearchQuery] = useState(queryFromUrl)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UnifiedUserProfile | null>(null)
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(5)
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [comparisonList, setComparisonList] = useState<string[]>([])
  const [pendingApplication, setPendingApplication] = useState<{ universityId: string; courseId: string } | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("meritcap_user")
    if (user) {
      const parsedUser = JSON.parse(user) as UnifiedUserProfile
      setIsLoggedIn(true)
      setUserData(parsedUser)
      setAuthLoading(false)
    } else {
      setAuthLoading(false)
      setShowLoginModal(true)
    }

    const savedFavorites = localStorage.getItem("meritcap_favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    const savedComparison = localStorage.getItem("meritcap_comparison")
    if (savedComparison) {
      setComparisonList(JSON.parse(savedComparison))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("meritcap_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("meritcap_comparison", JSON.stringify(comparisonList))
  }, [comparisonList])

  const handleLoginComplete = (newUserData: UnifiedUserProfile) => {
    setIsLoggedIn(true)
    setUserData(newUserData)
    setShowLoginModal(false)

    localStorage.setItem("meritcap_user", JSON.stringify(newUserData))
    window.dispatchEvent(new Event("authStateChanged"))

    if (!newUserData.profileCompleted) {
      setTimeout(() => {
        setShowProfileModal(true)
      }, 100)
    } else if (pendingApplication) {
      router.push(`/apply/${pendingApplication.universityId}/${pendingApplication.courseId}?autofill=true`)
    }
  }

  const handleProfileComplete = (completeProfileData: UnifiedUserProfile) => {
    setUserData(completeProfileData)
    setShowProfileModal(false)
    window.dispatchEvent(new Event("authStateChanged"))

    if (pendingApplication) {
      router.push(`/apply/${pendingApplication.universityId}/${pendingApplication.courseId}?autofill=true`)
    }
  }

  const handleProfileSkip = () => {
    setShowProfileModal(false)

    if (pendingApplication) {
      router.push(`/apply/${pendingApplication.universityId}/${pendingApplication.courseId}?collect=true`)
    }
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleAdvancedFiltersClick = () => {
    // Handle advanced filters modal
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleComparison = (id: string) => {
    setComparisonList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else if (prev.length < 3) {
        return [...prev, id]
      } else {
        alert("You can compare maximum 3 courses at a time")
        return prev
      }
    })
  }

  const getAllCourses = () => {
    return studyOnlineCourses.flatMap((course) => [
      {
        id: course.id,
        courseId: course.id,
        universityId: course.university || "online-university",
        courseName: course.name,
        universityName: course.university || "Online Learning Platform",
        location: "Online, Global",
        country: "Global",
        city: "Online",
        fee:
          typeof course.fees === "string" ? Number.parseInt(course.fees.replace(/[^0-9]/g, "")) || 0 : course.fees || 0,
        duration: course.duration || "6 months",
        level: course.level || "Graduate",
        intake: "Rolling Admissions",
        universityLogo: "/placeholder.svg?height=60&width=120&text=Online-University",
        universityRanking: 999,
        rating: course.rating || 4.5,
        reviewCount: course.reviews || 120,
        scholarshipAvailable: course.scholarships || false,
        applicationDeadline: "Rolling admissions",
        accreditations: ["Online Accredited", "Globally Recognized"],
        campusImage: course.image || `/placeholder.svg?height=400&width=600&text=Online-Course`,
        courseImage:
          course.image ||
          `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(course.name)}&query=online course ${course.name.toLowerCase()}`,
        courseAge: "Recently Updated",
        lastUpdated: "2024-01-01",
      },
    ])
  }

  const applyFilters = (courses: any[]) => {
    return courses.filter((course) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          course.courseName?.toLowerCase().includes(query) ||
          course.universityName?.toLowerCase().includes(query) ||
          course.location?.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      if (filters.countries.length > 0 && !filters.countries.includes(course.country)) {
        return false
      }

      if (
        filters.levels.length > 0 &&
        !filters.levels.some((level) => course.level?.toLowerCase().includes(level.toLowerCase()))
      ) {
        return false
      }

      if (course.fee < filters.feeRange[0] || course.fee > filters.feeRange[1]) {
        return false
      }

      const durationMonths = Number.parseFloat(course.duration?.replace(/[^0-9.]/g, "")) || 6
      if (durationMonths < filters.duration[0] || durationMonths > filters.duration[1]) {
        return false
      }

      return true
    })
  }

  const sortCourses = (courses: any[]) => {
    const sorted = [...courses]
    switch (sortBy) {
      case "ranking":
        return sorted.sort((a, b) => (a.universityRanking || 999) - (b.universityRanking || 999))
      case "fees-low":
        return sorted.sort((a, b) => (a.fee || 0) - (b.fee || 0))
      case "fees-high":
        return sorted.sort((a, b) => (b.fee || 0) - (a.fee || 0))
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return sorted
    }
  }

  const allCourses = getAllCourses()
  const filteredCourses = applyFilters(allCourses)
  const sortedCourses = sortCourses(filteredCourses)

  const totalPages = Math.ceil(sortedCourses.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = Math.min(startIndex + resultsPerPage, sortedCourses.length)
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    }
  }

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams)
    params.set("q", searchInput)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleClearAllFilters = () => {
    setSearchInput("")
    setSearchQuery("")
    setFilters(initialFilters)
    setCurrentPage(1)
    router.push(pathname + `?vertical=${vertical}`)
  }

  const areFiltersActive = searchQuery !== "" || JSON.stringify(filters) !== JSON.stringify(initialFilters)

  const formatFee = (fee: number) => {
    if (fee === 0) return "Contact for fees"
    return `₹${(fee).toLocaleString()}/year`
  }

  const formatIntake = (intake: string) => {
    return "Rolling Admissions"
  }

  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleApplyNow = (universityId: string, courseId: string) => {
    setPendingApplication({ universityId, courseId })

    const searchData = {
      query: searchQuery,
      vertical: vertical,
      country: searchParams.get("country") || "all",
      city: searchParams.get("city") || "all",
      level: searchParams.get("level") || "all",
      intake: searchParams.get("intake") || "all",
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("search_parameters", JSON.stringify(searchData))

    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    router.push(`/apply/${universityId}/${courseId}?autofill=true`)
  }

  useEffect(() => {
    const query = searchParams.get("q") || ""
    const level = searchParams.get("level") || ""
    const year = searchParams.get("year") || ""

    setSearchQuery(query)
    setSearchInput(query)

    if (level || year) {
      setFilters((prev) => ({
        ...prev,
        levels: level && level !== "all" ? [level] : [],
      }))
    }
  }, [searchParams])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthLoginModal
          isOpen={showLoginModal}
          onClose={() => {
            router.push("/")
          }}
          onLoginComplete={handleLoginComplete}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <TopBanner />
      </div>

      <div className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search online courses, universities, programs..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-12 pr-28 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
              />
              <Button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2">
                Search
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-gray-300">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="ranking">University Ranking</SelectItem>
                  <SelectItem value="fees-low">Fees: Low to High</SelectItem>
                  <SelectItem value="fees-high">Fees: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              {areFiltersActive && (
                <Button variant="ghost" onClick={handleClearAllFilters} className="text-sm text-blue-600">
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <HorizontalFilters
        onFilterChange={handleFilterChange}
        vertical={vertical}
        onAdvancedFiltersClick={handleAdvancedFiltersClick}
      />

      {comparisonList.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-900">Compare ({comparisonList.length}/3):</span>
                <div className="flex gap-2">
                  {comparisonList.map((id) => {
                    const course = sortedCourses.find((c) => c.id === id)
                    return course ? (
                      <span key={id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {course.courseName.substring(0, 20)}...
                      </span>
                    ) : null
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Compare Now
                </Button>
                <Button size="sm" variant="outline" onClick={() => setComparisonList([])}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-48 h-36 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedCourses.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {startIndex + 1}-{endIndex} of {sortedCourses.length} courses
                </div>

                <div className="space-y-4">
                  {paginatedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 course-card"
                    >
                      <div className="flex search-result-card">
                        <div className="w-48 relative flex-shrink-0 h-48 leading-8">
                          <Image
                            src={course.courseImage || course.campusImage || "/placeholder.svg"}
                            alt={`${course.courseName} at ${course.universityName}`}
                            fill
                            className="object-cover"
                          />

                          <div className="absolute top-2 left-2">
                            <button
                              onClick={() => toggleComparison(course.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors comparison-checkbox ${
                                comparisonList.includes(course.id)
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "bg-white border-gray-300 hover:border-blue-400"
                              }`}
                            >
                              {comparisonList.includes(course.id) && <Check className="w-3 h-3" />}
                            </button>
                          </div>

                          <div className="absolute bottom-2 left-2 bg-white p-1 rounded shadow-sm">
                            <Image
                              src={
                                course.universityLogo || "/placeholder.svg?height=60&width=120&text=Online-University"
                              }
                              alt={`${course.universityName} logo`}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <Link href={`/courses/${createSlug(course.courseName)}-${course.courseId}`}>
                                <h2 className="text-base font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer mb-1 leading-tight">
                                  {course.courseName}
                                </h2>
                              </Link>

                              <Link href={`/universities/${course.universityId}`}>
                                <h3 className="text-sm text-gray-600 hover:text-blue-600 hover:underline cursor-pointer mb-2">
                                  {course.universityName}
                                </h3>
                              </Link>

                              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-blue-500" />
                                  <span>{course.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-blue-500" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-green-500" />
                                  <span className="text-green-600 font-medium">{course.courseAge}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleFavorite(course.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 flex items-center gap-1 favorite-button"
                              >
                                <Heart
                                  className={`w-4 h-4 ${favorites.includes(course.id) ? "fill-red-500 text-red-500" : ""}`}
                                />
                                <span className="text-xs text-gray-500 hidden sm:inline">Add to list</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-gray-500">Fees:</span>
                              <span className="font-medium text-xs text-gray-900">{formatFee(course.fee)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-gray-500">Intake:</span>
                              <span className="font-medium text-xs text-gray-900">{formatIntake(course.intake)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-orange-600" />
                              <span className="text-xs text-gray-500">Rating:</span>
                              <span className="font-medium text-xs text-gray-900">{course.rating}/5.0</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3 h-3 text-purple-600" />
                              <span className="text-xs text-gray-500">Accreditations:</span>
                              <div className="flex gap-1">
                                {course.accreditations.slice(0, 2).map((acc, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-1 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded text-[10px]"
                                  >
                                    {acc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs font-medium h-7 rounded"
                              onClick={() => handleApplyNow(course.universityId, course.courseId)}
                            >
                              Apply Now
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center gap-1 px-2 py-1 text-xs border-gray-300 hover:bg-gray-50 bg-transparent h-7 rounded"
                              onClick={() => console.log("AI Agent clicked")}
                            >
                              <User className="w-3 h-3" />
                              AI Agent
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center gap-1 px-2 py-1 text-xs border-gray-300 hover:bg-gray-50 bg-transparent h-7 rounded"
                              onClick={() => console.log("Counselor clicked")}
                            >
                              <User className="w-3 h-3" />
                              Counselor
                            </Button>
                            <Button
                              variant="outline"
                              className="px-2 py-1 text-xs border-gray-300 hover:bg-gray-50 bg-transparent h-7 rounded"
                              onClick={() => console.log("Brochure clicked")}
                            >
                              <BookOpen className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4 bg-white rounded-lg border border-gray-200 pagination-container">
                    <div className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages} ({sortedCourses.length} total courses)
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        size="sm"
                        className="hidden sm:inline-flex"
                      >
                        First
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        size="sm"
                      >
                        Previous
                      </Button>

                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (currentPage <= 3) {
                            pageNum = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = currentPage - 2 + i
                          }

                          if (pageNum < 1 || pageNum > totalPages) return null

                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              onClick={() => handlePageChange(pageNum)}
                              size="sm"
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          )
                        })}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        size="sm"
                      >
                        Next
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        size="sm"
                        className="hidden sm:inline-flex"
                      >
                        Last
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold">No Courses Found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1 space-y-4">
            <AdBanner type="loan" />
            <AdBanner type="scholarship" />
            <AdBanner type="counseling" />
          </div>
        </div>
      </div>

      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
        userData={userData}
      />
    </div>
  )
}

export default function StudyOnlineSearchPage() {
  return <StudyOnlineSearchContent />
}

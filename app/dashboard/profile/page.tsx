"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Edit3,
  ArrowLeft,
  Award,
  Globe,
  FileText,
  Camera,
  Trophy,
  Target,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Gift,
  Medal,
  Coins,
  Flame,
} from "lucide-react"

export default function ViewProfilePage() {
  const router = useRouter()

  const user = {
    name: "Shiva Mantri",
    email: "mantrishivaramakrishna1@gmail.com",
    phone: "9849943319",
    dateOfBirth: "1995-06-15",
    nationality: "Indian",
    address: "Hyderabad, Telangana, India",
    profileImage: "/placeholder.svg?height=120&width=120",
    joinedDate: "2024-01-15",
    education: {
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      institution: "JNTU Hyderabad",
      graduationYear: "2017",
      cgpa: "8.5",
    },
    preferences: {
      studyDestination: "USA, Canada, UK",
      interestedFields: "Computer Science, Data Science, AI/ML",
      budgetRange: "$40,000 - $60,000",
      intakePreference: "Fall 2024, Spring 2025",
    },
    documents: {
      passport: "Available",
      transcripts: "Available",
      lor: "2 of 3 completed",
      sop: "Draft ready",
      resume: "Updated",
    },
    achievements: [
      { title: "Profile Completed", date: "2024-01-20", type: "milestone" },
      { title: "First Application Submitted", date: "2024-02-15", type: "application" },
      { title: "IELTS Score: 7.5", date: "2024-03-10", type: "test" },
      { title: "University Shortlisted", date: "2024-03-25", type: "milestone" },
    ],
    stats: {
      applicationsSubmitted: 5,
      universitiesShortlisted: 12,
      documentsCompleted: 85,
      profileStrength: 92,
    },
    gamification: {
      totalPoints: 2450,
      currentStreak: 12,
      badges: [
        { id: 1, name: "Early Bird", description: "Joined in first month", icon: "🌅", earned: true, rarity: "common" },
        {
          id: 2,
          name: "Profile Master",
          description: "100% profile completion",
          icon: "⭐",
          earned: true,
          rarity: "rare",
        },
        { id: 3, name: "Test Ace", description: "IELTS score above 7.0", icon: "🎯", earned: true, rarity: "epic" },
        {
          id: 4,
          name: "Application Pro",
          description: "Submit 5+ applications",
          icon: "📝",
          earned: true,
          rarity: "rare",
        },
        {
          id: 5,
          name: "Research Expert",
          description: "Shortlist 10+ universities",
          icon: "🔍",
          earned: false,
          rarity: "legendary",
        },
        {
          id: 6,
          name: "Document Ninja",
          description: "Upload all documents",
          icon: "📄",
          earned: false,
          rarity: "epic",
        },
      ],
      coupons: [
        { id: 1, title: "Free IELTS Mock Test", discount: "100%", expiry: "2024-12-31", used: false, type: "test" },
        {
          id: 2,
          title: "University Application Fee",
          discount: "$50",
          expiry: "2024-11-30",
          used: false,
          type: "application",
        },
        {
          id: 3,
          title: "Premium Counseling Session",
          discount: "50%",
          expiry: "2024-10-15",
          used: true,
          type: "counseling",
        },
      ],
      achievements: [
        { title: "Study Streak Champion", points: 500, date: "2024-03-20", type: "streak" },
        { title: "Profile Perfectionist", points: 300, date: "2024-02-28", type: "completion" },
        { title: "Application Speedster", points: 200, date: "2024-03-15", type: "application" },
      ],
    },
    timeline: [
      {
        date: "2024-01-15",
        title: "Joined MeritCap",
        description: "Started your study abroad journey",
        status: "completed",
      },
      {
        date: "2024-01-20",
        title: "Profile Setup",
        description: "Completed basic profile information",
        status: "completed",
      },
      {
        date: "2024-02-15",
        title: "First Application",
        description: "Submitted application to Harvard University",
        status: "completed",
      },
      { date: "2024-03-10", title: "IELTS Exam", description: "Achieved band score of 7.5", status: "completed" },
      {
        date: "2024-04-01",
        title: "Document Review",
        description: "All documents under review",
        status: "in-progress",
      },
      {
        date: "2024-05-15",
        title: "University Response",
        description: "Awaiting responses from universities",
        status: "pending",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
                  alt="Profile"
                  className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{user.name}</h1>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-full shadow-md">
                    <div className="w-8 h-8 relative">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="14" stroke="rgb(219 234 254)" strokeWidth="3" fill="none" />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="rgb(255 255 255)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${(user.stats.profileStrength / 100) * 87.96} 87.96`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{user.stats.profileStrength}%</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-white">Complete</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-2">{user.education.field} Graduate</p>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Member since{" "}
                      {new Date(user.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.address.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => router.push("/dashboard/profile/edit")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{user.stats.applicationsSubmitted}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Applications Submitted</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{user.stats.universitiesShortlisted}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Universities Shortlisted</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{user.stats.documentsCompleted}%</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Documents Complete</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{user.stats.profileStrength}%</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Profile Strength</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                Rewards & Achievements
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Coins className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{user.gamification.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Flame className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{user.gamification.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Medal className="w-4 h-4" />
                  Achievement Badges
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {user.gamification.badges
                    .filter((badge) => badge.earned)
                    .map((badge) => (
                      <div key={badge.id} className="text-center p-3 bg-gray-50 rounded-lg border">
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-medium text-gray-900">{badge.name}</div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full mt-1 ${
                            badge.rarity === "legendary"
                              ? "bg-yellow-100 text-yellow-800"
                              : badge.rarity === "epic"
                                ? "bg-purple-100 text-purple-800"
                                : badge.rarity === "rare"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {badge.rarity}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Available Rewards
                </h4>
                <div className="space-y-2">
                  {user.gamification.coupons
                    .filter((coupon) => !coupon.used)
                    .map((coupon) => (
                      <div key={coupon.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{coupon.title}</div>
                            <div className="text-xs text-gray-600">
                              Expires: {new Date(coupon.expiry).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-blue-600">{coupon.discount}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{user.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{user.nationality}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{new Date(user.dateOfBirth).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Recent Milestones
              </h3>
              <div className="space-y-3">
                {user.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Academic Journey Timeline
              </h3>
              <div className="space-y-6">
                {user.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "completed"
                            ? "bg-blue-600"
                            : item.status === "in-progress"
                              ? "bg-blue-400"
                              : "bg-gray-300"
                        }`}
                      ></div>
                      {index < user.timeline.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "in-progress"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status === "completed"
                            ? "Completed"
                            : item.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Education Background
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Degree</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.education.degree}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Field of Study</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.education.field}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Institution</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.education.institution}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Graduation Year</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.education.graduationYear}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">CGPA</label>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-lg font-medium text-gray-900">{user.education.cgpa}/10</p>
                    <div className="flex-1 max-w-48 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${(Number.parseFloat(user.education.cgpa) / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.round((Number.parseFloat(user.education.cgpa) / 10) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Study Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Preferred Destinations
                  </label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.preferences.studyDestination}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Interested Fields</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.preferences.interestedFields}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Budget Range</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.preferences.budgetRange}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Intake Preference</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{user.preferences.intakePreference}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Document Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(user.documents).map(([key, status]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          status.includes("Available") || status.includes("Updated") ? "bg-blue-600" : "bg-gray-400"
                        }`}
                      >
                        {status.includes("Available") || status.includes("Updated") ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        status.includes("Available") || status.includes("Updated")
                          ? "bg-blue-100 text-blue-800"
                          : status.includes("Draft") || status.includes("completed")
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

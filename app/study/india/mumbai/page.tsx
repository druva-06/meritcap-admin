"use client"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  Globe,
  Users,
  Award,
  TrendingUp,
  Star,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  BookOpen,
  Building,
  FileText,
  Landmark,
} from "lucide-react"

const collegePartners = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    logo: "/placeholder.svg?height=60&width=120&text=IIT+Bombay",
    defaultCourse: "computer-science-engineering",
  },
  {
    id: "jbims",
    name: "JBIMS",
    logo: "/placeholder.svg?height=60&width=120&text=JBIMS",
    defaultCourse: "mba",
  },
  {
    id: "vjti",
    name: "VJTI Mumbai",
    logo: "/placeholder.svg?height=60&width=120&text=VJTI",
    defaultCourse: "engineering",
  },
  {
    id: "tiss",
    name: "TISS Mumbai",
    logo: "/placeholder.svg?height=60&width=120&text=TISS",
    defaultCourse: "social-work",
  },
  {
    id: "nift-mumbai",
    name: "NIFT Mumbai",
    logo: "/placeholder.svg?height=60&width=120&text=NIFT",
    defaultCourse: "fashion-design",
  },
  {
    id: "st-xaviers",
    name: "St. Xavier's College",
    logo: "/placeholder.svg?height=60&width=120&text=St+Xaviers",
    defaultCourse: "arts",
  },
  {
    id: "hr-college",
    name: "HR College of Commerce",
    logo: "/placeholder.svg?height=60&width=120&text=HR+College",
    defaultCourse: "commerce",
  },
  {
    id: "kj-somaiya",
    name: "K.J. Somaiya College",
    logo: "/placeholder.svg?height=60&width=120&text=KJ+Somaiya",
    defaultCourse: "engineering",
  },
  {
    id: "mithibai",
    name: "Mithibai College",
    logo: "/placeholder.svg?height=60&width=120&text=Mithibai",
    defaultCourse: "arts",
  },
  {
    id: "wilson-college",
    name: "Wilson College",
    logo: "/placeholder.svg?height=60&width=120&text=Wilson",
    defaultCourse: "science",
  },
  {
    id: "jai-hind",
    name: "Jai Hind College",
    logo: "/placeholder.svg?height=60&width=120&text=Jai+Hind",
    defaultCourse: "arts",
  },
  {
    id: "ruia-college",
    name: "Ruia College",
    logo: "/placeholder.svg?height=60&width=120&text=Ruia",
    defaultCourse: "science",
  },
  {
    id: "sp-jain",
    name: "SP Jain Institute",
    logo: "/placeholder.svg?height=60&width=120&text=SP+Jain",
    defaultCourse: "management",
  },
  {
    id: "nmims",
    name: "NMIMS Mumbai",
    logo: "/placeholder.svg?height=60&width=120&text=NMIMS",
    defaultCourse: "engineering",
  },
  {
    id: "mumbai-university",
    name: "University of Mumbai",
    logo: "/placeholder.svg?height=60&width=120&text=Mumbai+Uni",
    defaultCourse: "arts",
  },
  {
    id: "sydenham",
    name: "Sydenham College",
    logo: "/placeholder.svg?height=60&width=120&text=Sydenham",
    defaultCourse: "commerce",
  },
  {
    id: "dj-sanghvi",
    name: "DJ Sanghvi College",
    logo: "/placeholder.svg?height=60&width=120&text=DJ+Sanghvi",
    defaultCourse: "engineering",
  },
  {
    id: "sophia-college",
    name: "Sophia College",
    logo: "/placeholder.svg?height=60&width=120&text=Sophia",
    defaultCourse: "arts",
  },
  {
    id: "ramnarain-ruia",
    name: "Ramnarain Ruia College",
    logo: "/placeholder.svg?height=60&width=120&text=RR+Ruia",
    defaultCourse: "science",
  },
  {
    id: "kc-college",
    name: "KC College",
    logo: "/placeholder.svg?height=60&width=120&text=KC+College",
    defaultCourse: "commerce",
  },
  {
    id: "thakur-college",
    name: "Thakur College",
    logo: "/placeholder.svg?height=60&width=120&text=Thakur",
    defaultCourse: "engineering",
  },
  {
    id: "vivekanand",
    name: "Vivekanand College",
    logo: "/placeholder.svg?height=60&width=120&text=Vivekanand",
    defaultCourse: "arts",
  },
  {
    id: "sies-college",
    name: "SIES College",
    logo: "/placeholder.svg?height=60&width=120&text=SIES",
    defaultCourse: "science",
  },
  {
    id: "mumbai-educational",
    name: "Mumbai Educational Trust",
    logo: "/placeholder.svg?height=60&width=120&text=MET",
    defaultCourse: "engineering",
  },
]

export default function StudyMumbaiPage() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)

  const logosPerPage = 12
  const totalPages = Math.ceil(collegePartners.length / logosPerPage)

  const nextLogos = () => {
    setCurrentLogoIndex((prev) => (prev + logosPerPage) % collegePartners.length)
  }

  const prevLogos = () => {
    setCurrentLogoIndex((prev) => (prev - logosPerPage + collegePartners.length) % collegePartners.length)
  }

  const currentLogos = collegePartners.slice(currentLogoIndex, currentLogoIndex + logosPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight mt-4">
                Study Mumbai
                <span className="block text-purple-200 text-5xl md:text-6xl mt-2">India's Financial Capital</span>
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Join 800,000+ students in India's commercial capital. Experience world-class education, vibrant culture,
                and unlimited career opportunities in the City of Dreams.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-purple-200 text-sm">Top Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">₹50K-15L</div>
                  <div className="text-purple-200 text-sm">Annual Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">97%</div>
                  <div className="text-purple-200 text-sm">Placement Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Mumbai Journey</h3>
                <p className="text-gray-600">Get personalized guidance from our experts</p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="Arjun" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Sharma" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address
                  </Label>
                  <Input id="email" type="email" placeholder="arjun@example.com" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone Number
                  </Label>
                  <Input id="phone" placeholder="+91 98765 43210" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="program" className="text-gray-700">
                    Preferred Program
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select program level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="intake" className="text-gray-700">
                    Preferred Course
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="media">Media & Entertainment</SelectItem>
                      <SelectItem value="fashion">Fashion & Design</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  Get Free Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Study in Mumbai?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why millions of students choose Mumbai for their higher education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Financial Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Home to BSE, NSE, RBI, and all major banks & financial institutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Home to IIT Bombay, TISS, NITIE, and 300+ premier institutions offering world-class education.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Bollywood & Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Entertainment capital with film, TV, advertising, and media opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Corporate Headquarters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">Maximum MNCs and Fortune 500 companies have offices here.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Highest Salaries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">97% placement rate with average package of ₹15 LPA.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Cosmopolitan Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Most accepting city in India with diverse culture and opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* College Partners Section with Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our 300+ College Partners in Mumbai</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our extensive network of partner colleges across Mumbai
            </p>
          </div>

          {/* College Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {currentLogos.map((college) => (
              <Link key={college.id} href={`/university/${college.id}/${college.defaultCourse}`} className="group">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                  <div className="aspect-[3/2] relative mb-4">
                    <img
                      src={college.logo || "/placeholder.svg"}
                      alt={college.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-purple-600 transition-colors leading-tight">
                    {college.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevLogos}
              className="flex items-center gap-2 hover:bg-purple-50 bg-transparent"
              disabled={currentLogoIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {Math.floor(currentLogoIndex / logosPerPage) + 1} of {totalPages}
              </span>

              {/* Pagination Dots */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLogoIndex(index * logosPerPage)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      Math.floor(currentLogoIndex / logosPerPage) === index
                        ? "bg-purple-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextLogos}
              className="flex items-center gap-2 hover:bg-purple-50 bg-transparent"
              disabled={currentLogoIndex + logosPerPage >= collegePartners.length}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Cost of Living Section */}
      <section className="py-20 bg-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cost of Living & Financial Planning</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Plan your budget effectively with our comprehensive cost breakdown for studying in Mumbai
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side - Average Annual Expenses */}
            <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Average Annual Expenses</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tuition Fees</h4>
                      <p className="text-sm text-gray-600">Government vs Private Colleges</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹50K - ₹15L</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Accommodation</h4>
                      <p className="text-sm text-gray-600">Hostels & PG</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹3L - ₹8L</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Living Expenses</h4>
                      <p className="text-sm text-gray-600">Food, Transport, Personal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹4L - ₹8L</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Books & Supplies</h4>
                      <p className="text-sm text-gray-600">Study materials</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹20K - ₹50K</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Financial Aid Options */}
            <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Financial Aid Options</h3>
              <div className="space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Merit-Based Scholarships</h4>
                    <p className="text-gray-600 mb-4">Up to ₹5 lakhs per year based on academic excellence</p>
                    <div className="flex items-center text-green-600">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-semibold">75% of students receive some form of aid</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Government Schemes</h4>
                    <p className="text-gray-600 mb-4">Central and state government scholarship programs</p>
                    <div className="flex items-center text-blue-600">
                      <Landmark className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Multiple schemes available</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Education Loans</h4>
                    <p className="text-gray-600 mb-4">Competitive interest rates and flexible repayment</p>
                    <div className="flex items-center text-purple-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Up to 100% financing available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MeritCap Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MeritCap?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your end-to-end partner for studying in Mumbai with personalized guidance and proven success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">End-to-End Journey Support</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">AI-Powered College Matching</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our advanced AI analyzes your profile and matches you with the best-fit colleges based on your
                      goals, budget, and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Application & Document Support</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Expert guidance on application forms, document preparation, and complete submission with 99%
                      success rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Interview Preparation</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Comprehensive interview sessions with college admission experts to boost your confidence and
                      success rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Scholarship & Financial Aid</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Access to ₹50Cr+ in scholarships and financial aid opportunities. We help you secure maximum
                      funding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Campus Visit Coordination</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Organize campus visits to help you make informed decisions about your college choice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Accommodation & Support</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Help with hostel bookings, PG arrangements, and ongoing support throughout your studies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Student Success Videos</h4>
                <p className="text-gray-600">Watch real student experiences and expert guidance</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/ZegcomegkKo"
                      title="Why Study in Mumbai? Expert Guidance"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Why Study in Mumbai? Expert Guidance</h5>
                  <p className="text-sm text-gray-600">
                    Comprehensive guide on studying in Mumbai and career opportunities
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/ZegcomegkKo"
                      title="Mumbai College Application Process"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Mumbai College Application Process</h5>
                  <p className="text-sm text-gray-600">
                    Step-by-step guide to applying for top Mumbai colleges and securing admissions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">25K+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">₹55Cr+</div>
                  <div className="text-sm text-gray-600">Scholarships Won</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">97%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mumbai Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Mumbai</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who made their dreams come true with MeritCap's guidance in Mumbai
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src="/placeholder.svg?height=80&width=80&text=Arjun"
                    alt="Arjun Sharma"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Arjun Sharma</h3>
                    <p className="text-blue-600 font-medium">Investment Banker at Goldman Sachs</p>
                    <p className="text-gray-600">IIT Bombay, Computer Science</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "MeritCap made my IIT Bombay dream a reality. From college selection to JEE preparation, their
                  AI-powered matching and expert guidance were incredible. Now I'm working at Goldman Sachs with a ₹50L
                  package and living my dream in the financial capital!"
                </blockquote>
                <div className="flex items-center space-x-6">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Key Achievement:</span> ₹3L Scholarship + Top Job
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600">₹50L</div>
                  <div className="text-sm text-gray-600">Annual Package</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">IIT Bombay</div>
                  <div className="text-sm text-gray-600">Top College</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">₹3L</div>
                  <div className="text-sm text-gray-600">Scholarship Won</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">97%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Priya"
                    alt="Priya Patel"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Priya Patel</h4>
                    <p className="text-sm text-gray-600">JBIMS MBA</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "From Ahmedabad to JBIMS! MeritCap's counselors helped me navigate the complex MBA admission process.
                  Now I'm at McKinsey with ₹40L package."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">McKinsey</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Rohan"
                    alt="Rohan Gupta"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Rohan Gupta</h4>
                    <p className="text-sm text-gray-600">NIFT Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "MeritCap's fashion guidance was spot-on! Got into NIFT with their expert portfolio preparation. Their
                  support made all the difference for my fashion career."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Fashion</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Sneha"
                    alt="Sneha Singh"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sneha Singh</h4>
                    <p className="text-sm text-gray-600">TISS Social Work</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "Working at UN now! MeritCap connected me with the right social work program at TISS and helped secure
                  my dream international career."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">UN</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Karan"
                    alt="Karan Mehta"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Karan Mehta</h4>
                    <p className="text-sm text-gray-600">St. Xavier's College</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "Started my own fintech startup! MeritCap's network and guidance were invaluable for my entrepreneurial
                  journey from St. Xavier's."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Startup</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Mumbai Journey?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who chose MeritCap for their Mumbai education dream. Get personalized
            guidance from our expert counselors today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 px-8">
              <MessageCircle className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91-22-MERITCAP
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 bg-transparent"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Support
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">🚀 No Hidden Fees</div>
              <p className="text-purple-100">Transparent pricing with no surprise charges</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">👨‍🎓 Expert Guidance</div>
              <p className="text-purple-100">15+ years of experience in Mumbai admissions</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">⚡ Fast Processing</div>
              <p className="text-purple-100">Quick turnaround on applications and documents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

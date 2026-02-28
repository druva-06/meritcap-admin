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
  Video,
  MapPin,
  DollarSign,
  BookOpen,
  Building,
  FileText,
  Landmark,
  Shield,
} from "lucide-react"

// College partners data - expanded for carousel
const collegePartners = [
  {
    id: "iit-hyderabad",
    name: "IIT Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=IIT+Hyderabad",
    defaultCourse: "computer-science-engineering",
  },
  {
    id: "isb",
    name: "Indian School of Business",
    logo: "/placeholder.svg?height=60&width=120&text=ISB",
    defaultCourse: "mba",
  },
  {
    id: "niper",
    name: "NIPER Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=NIPER",
    defaultCourse: "pharmacy",
  },
  {
    id: "nalsar",
    name: "NALSAR University",
    logo: "/placeholder.svg?height=60&width=120&text=NALSAR",
    defaultCourse: "law",
  },
  {
    id: "iiit-hyderabad",
    name: "IIIT Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=IIIT+Hyderabad",
    defaultCourse: "computer-science",
  },
  {
    id: "osmania",
    name: "Osmania University",
    logo: "/placeholder.svg?height=60&width=120&text=Osmania",
    defaultCourse: "arts",
  },
  {
    id: "jntu",
    name: "JNTU Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=JNTU",
    defaultCourse: "engineering",
  },
  {
    id: "icfai",
    name: "ICFAI Business School",
    logo: "/placeholder.svg?height=60&width=120&text=ICFAI",
    defaultCourse: "mba",
  },
  {
    id: "bits-hyderabad",
    name: "BITS Pilani Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=BITS+Hyderabad",
    defaultCourse: "engineering",
  },
  {
    id: "cbit",
    name: "CBIT Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=CBIT",
    defaultCourse: "engineering",
  },
  {
    id: "mvsr",
    name: "MVSR Engineering College",
    logo: "/placeholder.svg?height=60&width=120&text=MVSR",
    defaultCourse: "engineering",
  },
  {
    id: "cmr",
    name: "CMR Institute of Technology",
    logo: "/placeholder.svg?height=60&width=120&text=CMR",
    defaultCourse: "engineering",
  },
  {
    id: "gitam-hyderabad",
    name: "GITAM Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=GITAM",
    defaultCourse: "engineering",
  },
  {
    id: "vit-hyderabad",
    name: "VIT Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=VIT+Hyderabad",
    defaultCourse: "engineering",
  },
  {
    id: "mahindra-university",
    name: "Mahindra University",
    logo: "/placeholder.svg?height=60&width=120&text=Mahindra",
    defaultCourse: "engineering",
  },
  {
    id: "woxsen",
    name: "Woxsen University",
    logo: "/placeholder.svg?height=60&width=120&text=Woxsen",
    defaultCourse: "business",
  },
  {
    id: "snist",
    name: "SNIST Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=SNIST",
    defaultCourse: "engineering",
  },
  {
    id: "vasavi",
    name: "Vasavi College of Engineering",
    logo: "/placeholder.svg?height=60&width=120&text=Vasavi",
    defaultCourse: "engineering",
  },
  {
    id: "griet",
    name: "GRIET Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=GRIET",
    defaultCourse: "engineering",
  },
  {
    id: "mgit",
    name: "MGIT Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=MGIT",
    defaultCourse: "engineering",
  },
  {
    id: "cvsr",
    name: "CVSR College of Engineering",
    logo: "/placeholder.svg?height=60&width=120&text=CVSR",
    defaultCourse: "engineering",
  },
  {
    id: "kitsw",
    name: "KITS Warangal",
    logo: "/placeholder.svg?height=60&width=120&text=KITS",
    defaultCourse: "engineering",
  },
  {
    id: "nit-warangal",
    name: "NIT Warangal",
    logo: "/placeholder.svg?height=60&width=120&text=NIT+Warangal",
    defaultCourse: "engineering",
  },
  {
    id: "kakatiya",
    name: "Kakatiya University",
    logo: "/placeholder.svg?height=60&width=120&text=Kakatiya",
    defaultCourse: "arts",
  },
  {
    id: "aurora",
    name: "Aurora's Engineering College",
    logo: "/placeholder.svg?height=60&width=120&text=Aurora",
    defaultCourse: "engineering",
  },
  {
    id: "stanley",
    name: "Stanley College of Engineering",
    logo: "/placeholder.svg?height=60&width=120&text=Stanley",
    defaultCourse: "engineering",
  },
  {
    id: "vardhaman",
    name: "Vardhaman College of Engineering",
    logo: "/placeholder.svg?height=60&width=120&text=Vardhaman",
    defaultCourse: "engineering",
  },
  {
    id: "bvrit",
    name: "BVRIT Hyderabad",
    logo: "/placeholder.svg?height=60&width=120&text=BVRIT",
    defaultCourse: "engineering",
  },
  {
    id: "mlr",
    name: "MLR Institute of Technology",
    logo: "/placeholder.svg?height=60&width=120&text=MLR",
    defaultCourse: "engineering",
  },
  {
    id: "sreenidhi",
    name: "Sreenidhi Institute of Science",
    logo: "/placeholder.svg?height=60&width=120&text=Sreenidhi",
    defaultCourse: "engineering",
  },
]

export default function StudyHyderabadPage() {
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
                Study Hyderabad
                <span className="block text-purple-200 text-5xl md:text-6xl mt-2">India's Pharma Capital</span>
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Join 700,000+ students in India's pharma and tech hub. Experience world-class education, rich culture,
                and unlimited career opportunities in the City of Pearls.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-purple-200 text-sm">Top Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">₹50K-25L</div>
                  <div className="text-purple-200 text-sm">Annual Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">96%</div>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Hyderabad Journey</h3>
                <p className="text-gray-600">Get personalized guidance from our experts</p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="Priya" className="mt-1" />
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
                  <Input id="email" type="email" placeholder="priya@example.com" className="mt-1" />
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
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                      <SelectItem value="arts">Arts & Sciences</SelectItem>
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

      {/* Why Study in Hyderabad Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Study in Hyderabad?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why millions of students choose Hyderabad for their higher education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Pharma Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  World's largest pharmaceutical hub with 800+ companies and research centers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Home to IIT Hyderabad, ISB, NIPER, and 300+ premier institutions offering world-class education.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">IT & Tech Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Major IT destination with Google, Microsoft, Amazon, and 2000+ tech companies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Global Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  International companies, research collaborations, and global business opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Cultural Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Rich history, diverse culture, and the famous Charminar creating a vibrant student life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Career Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  96% placement rate with access to pharma, IT, biotech, and multinational companies.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our 300+ College Partners in Hyderabad</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our extensive network of partner colleges across Hyderabad and Telangana
            </p>
          </div>

          {/* College Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {currentLogos.map((college) => (
              <Link key={college.id} href={`/college/${college.id}/${college.defaultCourse}`} className="group">
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

      {/* Cost of Living & Financial Planning Section */}
      <section className="py-20 bg-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cost of Living & Financial Planning</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Plan your budget effectively with our comprehensive cost breakdown for studying in Hyderabad
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
                    <div className="font-bold text-gray-900">₹50K - ₹25L</div>
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
                    <div className="font-bold text-gray-900">₹2L - ₹6L</div>
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
                    <div className="font-bold text-gray-900">₹3L - ₹6L</div>
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
                    <div className="font-bold text-gray-900">₹15K - ₹40K</div>
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
                      <span className="font-semibold">80% of students receive some form of aid</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Government Schemes</h4>
                    <p className="text-gray-600 mb-4">Central and state government scholarship programs</p>
                    <div className="flex items-center text-purple-600">
                      <Landmark className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Multiple schemes available</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Education Loans</h4>
                    <p className="text-gray-600 mb-4">Competitive interest rates and flexible repayment</p>
                    <div className="flex items-center text-blue-600">
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
              Your end-to-end partner for studying in Hyderabad with personalized guidance and proven success
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
                    <Video className="w-5 h-5 text-purple-600" />
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
                    <MapPin className="w-5 h-5 text-purple-600" />
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

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Student Success Videos</h4>
                <p className="text-gray-600">Watch real student experiences and expert guidance</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/ZegcomegkKo"
                      title="Why Study in Hyderabad? Expert Guidance"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Why Study in Hyderabad? Expert Guidance</h5>
                  <p className="text-sm text-gray-600">
                    Comprehensive guide on studying in Hyderabad and career opportunities
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/ZegcomegkKo"
                      title="Hyderabad College Application Process"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Hyderabad College Application Process</h5>
                  <p className="text-sm text-gray-600">
                    Step-by-step guide to applying for top Hyderabad colleges and securing admissions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">20K+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">₹40Cr+</div>
                  <div className="text-sm text-gray-600">Scholarships Won</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">96%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hyderabad Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Hyderabad</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who made their dreams come true with MeritCap's guidance in Hyderabad
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src="/placeholder.svg?height=80&width=80&text=Priya"
                    alt="Priya Sharma"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Priya Sharma</h3>
                    <p className="text-purple-600 font-medium">Pharma Scientist at Dr. Reddy's</p>
                    <p className="text-gray-600">NIPER Hyderabad, Pharmacy</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "MeritCap made my NIPER dream a reality. From college selection to entrance exam preparation, their
                  AI-powered matching and expert guidance were incredible. Now I'm working at Dr. Reddy's with a ₹25L
                  package and contributing to global healthcare!"
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
                  <div className="text-2xl font-bold text-green-600">₹25L</div>
                  <div className="text-sm text-gray-600">Annual Package</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">NIPER</div>
                  <div className="text-sm text-gray-600">Top College</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">₹3L</div>
                  <div className="text-sm text-gray-600">Scholarship Won</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">96%</div>
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
                    src="/placeholder.svg?height=50&width=50&text=Arjun"
                    alt="Arjun Kumar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Arjun Kumar</h4>
                    <p className="text-sm text-gray-600">IIT Hyderabad CS</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "From Warangal to IIT Hyderabad! MeritCap's counselors helped me navigate the complex JEE process. Now
                  I'm at Google with ₹42L package."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">IIT</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Sneha"
                    alt="Sneha Reddy"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sneha Reddy</h4>
                    <p className="text-sm text-gray-600">ISB MBA</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "MeritCap's ISB guidance was spot-on! Got into ISB with their expert GMAT prep recommendations. Their
                  support made all the difference."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">MBA</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Kiran"
                    alt="Kiran Patel"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Kiran Patel</h4>
                    <p className="text-sm text-gray-600">NALSAR Law</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "Working at Supreme Court now! MeritCap connected me with the right program at NALSAR and helped secure
                  my dream legal career."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Law</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50&text=Divya"
                    alt="Divya Singh"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Divya Singh</h4>
                    <p className="text-sm text-gray-600">IIIT Hyderabad</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-4">
                  "Started my own AI startup! MeritCap's network and guidance were invaluable for my entrepreneurial
                  journey from IIIT Hyderabad."
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
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Hyderabad Journey?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who chose MeritCap for their Hyderabad education dream. Get personalized
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
              Call +91-40-MERITCAP
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
              <p className="text-purple-100">15+ years of experience in Hyderabad admissions</p>
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

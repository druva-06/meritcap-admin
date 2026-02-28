"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernLeadForm } from "@/components/modern-lead-form"
import {
  GraduationCap,
  Globe,
  Users,
  Award,
  TrendingUp,
  Clock,
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
} from "lucide-react"
import { studyAbroadUniversities } from "@/lib/sample-data"

const keyStats = [
  { icon: <Users className="h-8 w-8" />, label: "International Students", value: "180,000+" },
  { icon: <GraduationCap className="h-8 w-8" />, label: "Universities", value: "30+" },
  { icon: <TrendingUp className="h-8 w-8" />, label: "Employment Rate", value: "89%" },
]

const whyStudyPoints = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "World-Class Education",
    description:
      "Home to top-ranked universities like NUS and NTU. Experience cutting-edge research and innovative teaching methods in Asia's education hub.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Gateway to Asia",
    description:
      "Strategic location connecting East and West. Perfect for international business careers with access to Asian markets.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Career Opportunities",
    description:
      "Strong job market with high employment rates. Access to multinational companies and startup ecosystem.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Scholarships Available",
    description:
      "Merit-based and need-based scholarships available. Government and university funding opportunities for international students.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Multicultural Society",
    description:
      "Diverse, English-speaking environment. Experience a melting pot of cultures with students from 100+ countries.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Safe & Modern",
    description:
      "One of the world's safest countries with excellent infrastructure, modern facilities, and high quality of life.",
  },
]

const successStories = [
  {
    name: "Priya Sharma",
    program: "MBA at NUS",
    image: "/student-avatar.png",
    story: "Landed a senior consultant role at McKinsey Singapore within 3 months of graduation",
    achievement: "200% salary increase",
  },
  {
    name: "David Chen",
    program: "Computer Science at NTU",
    image: "/male-student-avatar.png",
    story: "Founded a successful fintech startup that raised $5M in Series A funding",
    achievement: "Entrepreneur of the Year 2023",
  },
  {
    name: "Sarah Williams",
    program: "Finance at SMU",
    image: "/female-student-avatar.png",
    story: "Secured a position at Goldman Sachs Asia Pacific headquarters",
    achievement: "Top 1% of graduating class",
  },
]

const applicationSteps = [
  {
    step: "1",
    title: "Choose Your Program",
    description: "Research universities and programs that align with your career goals",
    timeline: "6-12 months before",
  },
  {
    step: "2",
    title: "Prepare Documents",
    description: "Gather transcripts, test scores, essays, and recommendation letters",
    timeline: "4-6 months before",
  },
  {
    step: "3",
    title: "Submit Applications",
    description: "Apply through university portals and pay application fees",
    timeline: "2-4 months before",
  },
  {
    step: "4",
    title: "Secure Funding",
    description: "Apply for scholarships, loans, and explore funding options",
    timeline: "2-3 months before",
  },
  {
    step: "5",
    title: "Visa Application",
    description: "Apply for student visa once you receive admission offer",
    timeline: "1-2 months before",
  },
  {
    step: "6",
    title: "Pre-Departure",
    description: "Arrange accommodation, book flights, and prepare for departure",
    timeline: "1 month before",
  },
]

export default function StudySingaporePage() {
  const singaporeUniversities = studyAbroadUniversities.filter((uni) => uni.country === "Singapore")
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const logosPerPage = 12
  const totalPages = Math.ceil(singaporeUniversities.length / logosPerPage)

  const nextLogos = () => {
    if (currentLogoIndex + logosPerPage < singaporeUniversities.length) {
      setCurrentLogoIndex((prev) => prev + logosPerPage)
    }
  }

  const prevLogos = () => {
    if (currentLogoIndex - logosPerPage >= 0) {
      setCurrentLogoIndex((prev) => prev - logosPerPage)
    }
  }

  const currentLogos = singaporeUniversities.slice(currentLogoIndex, currentLogoIndex + logosPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl mb-6 leading-tight mt-2 md:text-6xl lg:text-7xl font-bold">
                Study Singapore
                <span className="block text-blue-200 text-5xl md:text-6xl mt-2">Gateway to Asia</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Experience world-class education in Asia's most dynamic city-state. Join thousands of international
                students at top-ranked universities with cutting-edge research and unlimited career opportunities.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">30+</div>
                  <div className="text-blue-200 text-sm">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">SGD 25-55K</div>
                  <div className="text-blue-200 text-sm">Annual Tuition</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">89%</div>
                  <div className="text-blue-200 text-sm">Employment Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Right Form */}
            <ModernLeadForm countryName="Singapore" />
          </div>
        </div>
      </section>

      {/* Why Study in Singapore */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Study in Singapore?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why millions of students choose Singapore for their higher education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyStudyPoints.map((point, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {point.icon}
                  </div>
                  <CardTitle className="text-xl">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our University Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our extensive network of partner universities across Singapore
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {currentLogos.map((university) => (
              <Link key={university.id} href={`/universities/${university.id}`} className="group">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                  <div className="aspect-[3/2] relative mb-4">
                    <Image
                      src={university.logo || "/placeholder.svg"}
                      alt={`${university.name} logo`}
                      width={120}
                      height={60}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors leading-tight">
                    {university.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevLogos}
              className="flex items-center gap-2 hover:bg-blue-50 bg-transparent"
              disabled={currentLogoIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {Math.floor(currentLogoIndex / logosPerPage) + 1} of {totalPages}
              </span>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLogoIndex(index * logosPerPage)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      Math.floor(currentLogoIndex / logosPerPage) === index
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextLogos}
              className="flex items-center gap-2 hover:bg-blue-50 bg-transparent"
              disabled={currentLogoIndex + logosPerPage >= singaporeUniversities.length}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Cost of Living & Financial Planning Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cost of Living & Financial Planning</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Plan your budget effectively with our comprehensive cost breakdown for studying in Singapore
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Average Annual Expenses</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tuition Fees</h4>
                      <p className="text-sm text-gray-600">Public vs Private Universities</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">SGD 17K - 45K</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Accommodation</h4>
                      <p className="text-sm text-gray-600">On-campus & Off-campus</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">SGD 6K - 24K</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Living Expenses</h4>
                      <p className="text-sm text-gray-600">Food, Transport, Personal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">SGD 6K - 9K</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Health Insurance</h4>
                      <p className="text-sm text-gray-600">Mandatory for all students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">SGD 500 - 1K</div>
                    <div className="text-sm text-gray-600">per year</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Financial Aid Options</h3>
              <div className="space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Merit-Based Scholarships</h4>
                    <p className="text-gray-600 mb-4">Up to SGD 30,000 per year based on academic excellence</p>
                    <div className="flex items-center text-green-600">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-semibold">70% of students receive some form of aid</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Work Opportunities</h4>
                    <p className="text-gray-600 mb-4">Part-time work and internship opportunities</p>
                    <div className="flex items-center text-blue-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Up to 16 hours/week during studies</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Education Loans</h4>
                    <p className="text-gray-600 mb-4">Competitive interest rates and flexible repayment</p>
                    <div className="flex items-center text-purple-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Up to 90% financing available</span>
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
              Your end-to-end partner for studying in Singapore with personalized guidance and proven success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">End-to-End Journey Support</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">AI-Powered University Matching</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our advanced AI analyzes your profile and matches you with the best-fit universities based on your
                      goals, budget, and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Application & Document Support</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Expert guidance on SOP writing, LOR collection, and complete application submission with 99%
                      success rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Video className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Mock Interview Preparation</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Comprehensive mock interview sessions with university admission experts to boost your confidence
                      and success rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Scholarship & Financial Aid</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Access to SGD 20M+ in scholarships and financial aid opportunities. We help you secure maximum
                      funding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Campus Visit Coordination</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Organize virtual and in-person campus visits to help you make informed decisions about your
                      university choice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Visa & Pre-Departure Support</h4>
                    <p className="text-gray-600 leading-relaxed">
                      95% visa success rate with comprehensive interview preparation and pre-departure orientation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Student Success Videos</h4>
                <p className="text-gray-600">Watch real student experiences and expert guidance</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/ZegcomegkKo"
                      title="Why Study in Singapore? Expert Guidance"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Why Study in Singapore? Expert Guidance</h5>
                  <p className="text-sm text-gray-600">
                    Comprehensive guide on studying in Singapore benefits and career opportunities
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.youtube.com/embed/ZegcomegkKo"
                      title="Singapore University Application Process"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Singapore University Application Process</h5>
                  <p className="text-sm text-gray-600">
                    Step-by-step guide to applying for top Singapore universities and securing admissions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">8K+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">SGD 20M+</div>
                  <div className="text-sm text-gray-600">Scholarships Won</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Visa Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Singapore</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who made their Singapore dream come true with MeritCap's guidance
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=Priya"
                    alt="Priya Sharma"
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Priya Sharma</h3>
                    <p className="text-blue-600 font-medium">Senior Consultant at McKinsey</p>
                    <p className="text-gray-600">NUS Business School, MBA</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "MeritCap made my Singapore dream a reality. From university selection to visa approval, their
                  AI-powered matching and expert guidance were incredible. Now I'm working at McKinsey with a SGD 120K
                  package and loving life in Singapore!"
                </blockquote>
                <div className="flex items-center space-x-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Key Achievement:</span> SGD 30K Scholarship + Work Visa
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600">SGD 120K</div>
                  <div className="text-sm text-gray-600">Annual Package</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">2 Years</div>
                  <div className="text-sm text-gray-600">Work Visa</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">SGD 30K</div>
                  <div className="text-sm text-gray-600">Scholarship Won</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">95%</div>
                  <div className="text-sm text-gray-600">Visa Success</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Large testimonial card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=60&text=David"
                  alt="David Chen"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-blue-200"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">David Chen</h4>
                  <p className="text-blue-600 font-medium">Fintech Entrepreneur</p>
                  <p className="text-sm text-gray-600">NTU Computer Science</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "Founded a successful fintech startup that raised $5M in Series A funding. Singapore's startup ecosystem
                and NTU's innovation programs were game-changers for my entrepreneurial journey."
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-sm font-semibold text-green-600">Entrepreneur of the Year 2023</div>
              </div>
            </div>

            {/* Regular testimonial cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50&text=Sarah"
                  alt="Sarah Williams"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-blue-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Williams</h4>
                  <p className="text-sm text-blue-600">Goldman Sachs</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-700 italic mb-3">
                "Secured a position at Goldman Sachs Asia Pacific headquarters. SMU's finance program opened doors I
                never imagined."
              </blockquote>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50&text=Raj"
                  alt="Raj Kumar"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-blue-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Raj Kumar</h4>
                  <p className="text-sm text-blue-600">Data Scientist</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-700 italic mb-3">
                "Landed a data scientist role at Grab with SGD 85K package. NUS's AI program and MeritCap's guidance made
                it possible."
              </blockquote>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Singapore Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who chose MeritCap for their Singapore dream. Get personalized guidance
            from our expert counselors today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8">
              <MessageCircle className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 bg-transparent"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +65-MERITCAP
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 bg-transparent"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Support
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">🚀 No Hidden Fees</div>
              <p className="text-blue-100">Transparent pricing with no surprise charges</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">👨‍🎓 Expert Guidance</div>
              <p className="text-blue-100">10+ years of experience in Singapore admissions</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">⚡ Fast Processing</div>
              <p className="text-blue-100">Quick turnaround on applications and documents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

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
  DollarSign,
  BookOpen,
  Building,
} from "lucide-react"
import { studyAbroadUniversities } from "@/lib/sample-data"

export default function StudyNewZealandPage() {
  const newZealandUniversities = studyAbroadUniversities.filter((uni) => uni.country === "New Zealand")
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const logosPerPage = 12
  const totalPages = Math.ceil(newZealandUniversities.length / logosPerPage)

  const nextLogos = () => {
    if (currentLogoIndex + logosPerPage < newZealandUniversities.length) {
      setCurrentLogoIndex((prev) => prev + logosPerPage)
    }
  }

  const prevLogos = () => {
    if (currentLogoIndex - logosPerPage >= 0) {
      setCurrentLogoIndex((prev) => prev - logosPerPage)
    }
  }

  const currentLogos = newZealandUniversities.slice(currentLogoIndex, currentLogoIndex + logosPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl mb-6 leading-tight mt-2 md:text-6xl lg:text-7xl font-bold">
                Study New Zealand
                <span className="block text-blue-200 text-5xl md:text-6xl mt-2">Land of Opportunities</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Experience world-class education in one of the world's most beautiful countries. Join international
                students at top-ranked universities with innovative research and clear pathways to residency.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">8+</div>
                  <div className="text-blue-200 text-sm">Universities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">NZD 32-55K</div>
                  <div className="text-blue-200 text-sm">Annual Tuition</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">3 Years</div>
                  <div className="text-blue-200 text-sm">Work Rights</div>
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
            <ModernLeadForm countryName="New Zealand" />
          </div>
        </div>
      </section>

      {/* Why Study in New Zealand Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Study in New Zealand?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why millions of students choose New Zealand for their higher education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">World-Class Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  All 8 universities rank in top 3% globally. Experience cutting-edge research and innovative teaching
                  methods in stunning natural settings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Post-Study Work Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Graduate with up to 3 years of post-study work rights and clear pathways to permanent residency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Innovation Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Leading in agricultural technology, renewable energy, and environmental sciences with strong research
                  opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Scholarships Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Merit-based scholarships and government funding available. Financial support for international
                  students.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Safe & Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  One of the world's safest countries with friendly locals and welcoming attitude towards international
                  students.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Natural Beauty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Study in stunning landscapes with clean environment, outdoor adventures, and high quality of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* University Partners Section with Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our University Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our extensive network of partner universities across New Zealand
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
              disabled={currentLogoIndex + logosPerPage >= newZealandUniversities.length}
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
              Plan your budget effectively with our comprehensive cost breakdown for studying in New Zealand
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
                      <p className="text-sm text-gray-600">Universities & Institutes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">NZD 32K - 55K</div>
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
                    <div className="font-bold text-gray-900">NZD 12K - 20K</div>
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
                    <div className="font-bold text-gray-900">NZD 15K - 20K</div>
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
                    <div className="font-bold text-gray-900">NZD 700 - 1K</div>
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
                    <p className="text-gray-600 mb-4">Up to NZD 25,000 per year based on academic excellence</p>
                    <div className="flex items-center text-green-600">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-semibold">60% of students receive some form of aid</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Work Opportunities</h4>
                    <p className="text-gray-600 mb-4">Part-time work and post-study work rights</p>
                    <div className="flex items-center text-blue-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Up to 20 hours/week during studies</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Education Loans</h4>
                    <p className="text-gray-600 mb-4">Competitive interest rates and flexible repayment</p>
                    <div className="flex items-center text-purple-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Up to 85% financing available</span>
                    </div>
                  </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from New Zealand</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who made their New Zealand dream come true with MeritCap's guidance
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=Aditya"
                    alt="Aditya Patel"
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Aditya Patel</h3>
                    <p className="text-blue-600 font-medium">Software Engineer at Xero</p>
                    <p className="text-gray-600">University of Auckland, MS Software Engineering</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-6">
                  "MeritCap made my New Zealand dream a reality. From university selection to visa approval, their
                  AI-powered matching and expert guidance were incredible. Now I'm working at Xero with a NZD 95K
                  package and have permanent residency!"
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
                    <span className="font-semibold">Key Achievement:</span> NZD 20K Scholarship + Residency
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600">NZD 95K</div>
                  <div className="text-sm text-gray-600">Annual Package</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">Permanent</div>
                  <div className="text-sm text-gray-600">Residency</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">NZD 20K</div>
                  <div className="text-sm text-gray-600">Scholarship Won</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">94%</div>
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
                  src="/placeholder.svg?height=60&width=60&text=Emma"
                  alt="Emma Thompson"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-blue-200"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Emma Thompson</h4>
                  <p className="text-blue-600 font-medium">Environmental Scientist</p>
                  <p className="text-sm text-gray-600">University of Otago, PhD Environmental Science</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "Completed my PhD in Environmental Science and now leading climate research projects. New Zealand's
                focus on sustainability and Otago's research facilities were perfect for my career goals."
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-sm font-semibold text-green-600">Research Excellence Award 2023</div>
              </div>
            </div>

            {/* Regular testimonial cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50&text=Mike"
                  alt="Mike Johnson"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-blue-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Mike Johnson</h4>
                  <p className="text-sm text-blue-600">Marketing Manager</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-700 italic mb-3">
                "Got permanent residency and working at Kiwibank. Victoria University's business program and MeritCap's
                support were amazing."
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
                  src="/placeholder.svg?height=50&width=50&text=Lisa"
                  alt="Lisa Chen"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-blue-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Lisa Chen</h4>
                  <p className="text-sm text-blue-600">Nurse Practitioner</p>
                </div>
              </div>
              <blockquote className="text-sm text-gray-700 italic mb-3">
                "Massey University's nursing program led to immediate job placement. Now working in Auckland with NZD
                75K package."
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
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your New Zealand Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who chose MeritCap for their New Zealand dream. Get personalized
            guidance from our expert counselors today.
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
              Call +64-MERITCAP-NZ
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
              <p className="text-blue-100">8+ years of experience in New Zealand admissions</p>
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

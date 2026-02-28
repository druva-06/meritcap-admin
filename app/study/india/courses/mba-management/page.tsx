"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  TrendingUp,
  Users,
  Award,
  MapPin,
  Building,
  Star,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Briefcase,
  DollarSign,
  BookOpen,
  Target,
  Globe,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function MBAManagementPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "MBA & Management",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const specializations = [
    {
      title: "MBA Finance",
      description: "Master financial management, investment banking, and corporate finance",
      icon: DollarSign,
      avgSalary: "₹12-25 LPA",
      jobRoles: "Financial Analyst, Investment Banker, CFO",
      href: "/study/india/courses/mba-finance",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "MBA Marketing",
      description: "Learn digital marketing, brand management, and consumer behavior",
      icon: Target,
      avgSalary: "₹10-22 LPA",
      jobRoles: "Marketing Manager, Brand Manager, CMO",
      href: "/study/india/courses/mba-marketing",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "MBA HR",
      description: "Specialize in human resource management and organizational behavior",
      icon: Users,
      avgSalary: "₹8-20 LPA",
      jobRoles: "HR Manager, Talent Acquisition, CHRO",
      href: "/study/india/courses/mba-hr",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "MBA Operations",
      description: "Focus on supply chain, operations management, and process optimization",
      icon: Briefcase,
      avgSalary: "₹10-24 LPA",
      jobRoles: "Operations Manager, Supply Chain Manager, COO",
      href: "/study/india/courses/mba-operations",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "MBA Digital Marketing",
      description: "Master digital strategies, social media, and online marketing",
      icon: Globe,
      avgSalary: "₹9-20 LPA",
      jobRoles: "Digital Marketing Manager, SEO Specialist, Growth Hacker",
      href: "/study/india/courses/mba-digital-marketing",
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "MBA International Business",
      description: "Learn global trade, international finance, and cross-cultural management",
      icon: Globe,
      avgSalary: "₹12-28 LPA",
      jobRoles: "International Business Manager, Export Manager, Global Strategist",
      href: "/study/india/courses/mba-international-business",
      color: "from-teal-500 to-cyan-600",
    },
  ]

  const topCities = [
    {
      name: "Mumbai",
      colleges: "150+ Colleges",
      avgFees: "₹8-25 Lakhs",
      topColleges: ["JBIMS", "NMIMS", "SIMSREE"],
      livingCost: "₹4-8 Lakhs/year",
      jobOpportunities: "Financial Capital - Banking, Finance, Consulting",
      href: "/study/india/mumbai?course=mba",
    },
    {
      name: "Delhi NCR",
      colleges: "200+ Colleges",
      avgFees: "₹6-30 Lakhs",
      topColleges: ["FMS Delhi", "MDI Gurgaon", "IMT Ghaziabad"],
      livingCost: "₹3-7 Lakhs/year",
      jobOpportunities: "Corporate Hub - MNCs, Government, Startups",
      href: "/study/india/delhi?course=mba",
    },
    {
      name: "Bangalore",
      colleges: "120+ Colleges",
      avgFees: "₹7-22 Lakhs",
      topColleges: ["IIM Bangalore", "IISC", "Christ University"],
      livingCost: "₹3-6 Lakhs/year",
      jobOpportunities: "Tech Hub - IT, Startups, Innovation",
      href: "/study/india/bangalore?course=mba",
    },
    {
      name: "Hyderabad",
      colleges: "80+ Colleges",
      avgFees: "₹5-18 Lakhs",
      topColleges: ["ISB Hyderabad", "ICFAI", "Osmania University"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Emerging Hub - Pharma, IT, Biotech",
      href: "/study/india/hyderabad?course=mba",
    },
  ]

  const collegePartners = [
    {
      name: "IIM Ahmedabad",
      ranking: "#1",
      fees: "₹25 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=IIM-A",
    },
    {
      name: "IIM Bangalore",
      ranking: "#2",
      fees: "₹24 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=IIM-B",
    },
    { name: "IIM Calcutta", ranking: "#3", fees: "₹27 Lakhs", logo: "/placeholder.svg?height=60&width=120&text=IIM-C" },
    {
      name: "XLRI Jamshedpur",
      ranking: "#4",
      fees: "₹26 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=XLRI",
    },
    { name: "FMS Delhi", ranking: "#5", fees: "₹2 Lakhs", logo: "/placeholder.svg?height=60&width=120&text=FMS" },
    { name: "JBIMS Mumbai", ranking: "#6", fees: "₹5 Lakhs", logo: "/placeholder.svg?height=60&width=120&text=JBIMS" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-300/10 to-cyan-300/10 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  <GraduationCap className="w-4 h-4" />
                  <span>Master of Business Administration</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  MBA & Management
                  <span className="block text-teal-300">in India</span>
                </h1>
                <p className="text-xl text-teal-100 leading-relaxed max-w-2xl">
                  Transform your career with India's top MBA programs. Choose from diverse specializations and study in
                  premier business schools across the country.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">500+</div>
                  <div className="text-sm text-teal-200">Business Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">₹8-30L</div>
                  <div className="text-sm text-teal-200">Average Package</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">95%</div>
                  <div className="text-sm text-teal-200">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">2 Years</div>
                  <div className="text-sm text-teal-200">Duration</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 shadow-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:ml-8">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Counseling</h3>
                    <p className="text-gray-600">Connect with our MBA experts and find your perfect program</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">Preferred City</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi NCR</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your MBA goals..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Get Free Counseling Call
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to our Terms & Privacy Policy
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MBA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MBA in India?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India offers world-class business education with diverse specializations, excellent ROI, and strong
              industry connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "High ROI",
                description:
                  "Average salary increase of 200-400% post-MBA with quick career advancement opportunities.",
              },
              {
                icon: Building,
                title: "Industry Connect",
                description: "Strong ties with top companies, guaranteed internships, and excellent placement records.",
              },
              {
                icon: Globe,
                title: "Global Recognition",
                description: "Indian MBA degrees recognized worldwide with opportunities for international careers.",
              },
              {
                icon: Users,
                title: "Diverse Network",
                description: "Build lifelong connections with peers, alumni, and industry leaders across sectors.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MBA Specializations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your MBA Specialization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse MBA specializations and find the perfect match for your career goals and interests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${spec.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${spec.color} rounded-lg flex items-center justify-center`}
                      >
                        <spec.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{spec.title}</h3>
                        <p className="text-teal-600 font-semibold">{spec.avgSalary}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-teal-500" />
                        <span className="text-gray-700">{spec.jobRoles}</span>
                      </div>
                    </div>

                    <Link href={spec.href}>
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white group-hover:shadow-lg transition-all duration-300">
                        Explore {spec.title}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
            >
              View All MBA Specializations
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Cities for MBA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Cities for MBA in India</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from India's premier business education hubs, each offering unique advantages and opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCities.map((city, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-teal-600 font-semibold">{city.colleges}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Fees:</span>
                      <span className="font-semibold text-gray-900">{city.avgFees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Living Cost:</span>
                      <span className="font-semibold text-gray-900">{city.livingCost}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Top Colleges:</h4>
                    <div className="space-y-1">
                      {city.topColleges.map((college, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-sm text-gray-700">{college}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">{city.jobOpportunities}</p>
                  </div>

                  <Link href={city.href}>
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore MBA in {city.name}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* College Partners Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top MBA College Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get direct admission assistance to India's premier business schools with our expert guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collegePartners.map((college, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <img
                      src={college.logo || "/placeholder.svg"}
                      alt={college.name}
                      className="h-16 mx-auto mb-4 object-contain"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{college.name}</h3>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold">
                        Rank {college.ranking}
                      </span>
                      <span className="text-gray-600">{college.fees}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white group-hover:shadow-lg transition-all duration-300">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
            >
              View All Partner Colleges
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Career Outcomes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MBA Career Outcomes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the career transformation and opportunities that await MBA graduates in India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Average Salary Hike", value: "300%", icon: TrendingUp },
              { label: "Placement Rate", value: "95%", icon: CheckCircle },
              { label: "Top Companies", value: "500+", icon: Building },
              { label: "Career Growth", value: "2-3x Faster", icon: Award },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Top Recruiting Companies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "McKinsey & Company",
                    "Boston Consulting Group",
                    "Deloitte",
                    "PwC",
                    "Goldman Sachs",
                    "JP Morgan",
                    "Google",
                    "Microsoft",
                    "Amazon",
                    "Flipkart",
                    "Tata Group",
                    "Reliance Industries",
                  ].map((company, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-500" />
                      <span className="text-gray-700 font-medium">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Career?</h4>
                  <p className="text-gray-600 mb-6">Get personalized MBA guidance from our experts</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Career Counseling
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MBA Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from MBA graduates who transformed their careers with our guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Senior Manager, McKinsey & Company",
                college: "IIM Ahmedabad",
                specialization: "MBA Strategy",
                salaryHike: "400%",
                story:
                  "From a software engineer earning ₹8 LPA to a strategy consultant at ₹32 LPA. MBA opened doors I never imagined.",
                image: "/placeholder.svg?height=100&width=100&text=PS",
              },
              {
                name: "Rahul Gupta",
                role: "VP Finance, Goldman Sachs",
                college: "IIM Bangalore",
                specialization: "MBA Finance",
                salaryHike: "350%",
                story:
                  "MeritCap's guidance helped me get into IIM-B. Today, I'm leading financial strategies for global clients.",
                image: "/placeholder.svg?height=100&width=100&text=RG",
              },
              {
                name: "Sneha Patel",
                role: "Chief Marketing Officer, Flipkart",
                college: "XLRI Jamshedpur",
                specialization: "MBA Marketing",
                salaryHike: "300%",
                story:
                  "The comprehensive support from application to placement made my MBA journey smooth and successful.",
                image: "/placeholder.svg?height=100&width=100&text=SP",
              },
            ].map((story, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-teal-600 font-semibold mb-1">{story.role}</p>
                    <p className="text-gray-600 text-sm">
                      {story.college} • {story.specialization}
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{story.salaryHike} Salary Hike</span>
                    </div>
                  </div>

                  <blockquote className="text-gray-600 italic text-center leading-relaxed">"{story.story}"</blockquote>

                  <div className="flex justify-center mt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your MBA Journey?</h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Join thousands of successful MBA graduates who chose MeritCap for their business education journey. Get
              expert guidance, college selection support, and career counseling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 shadow-xl px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Get Free MBA Counseling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download MBA Guide
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-teal-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free Counseling</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>100% Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

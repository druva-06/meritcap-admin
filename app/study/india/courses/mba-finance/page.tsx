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
  DollarSign,
  TrendingUp,
  Building,
  Award,
  MapPin,
  Star,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Globe,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  Calculator,
  LineChart,
} from "lucide-react"
import Link from "next/link"

export default function MBAFinancePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "MBA Finance",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const courseModules = [
    {
      semester: "Semester 1",
      subjects: [
        "Financial Accounting",
        "Microeconomics",
        "Statistics",
        "Business Communication",
        "Organizational Behavior",
      ],
    },
    {
      semester: "Semester 2",
      subjects: [
        "Macroeconomics",
        "Marketing Management",
        "Operations Management",
        "Human Resource Management",
        "Business Law",
      ],
    },
    {
      semester: "Semester 3",
      subjects: [
        "Corporate Finance",
        "Investment Analysis",
        "Financial Markets",
        "Risk Management",
        "International Finance",
      ],
    },
    {
      semester: "Semester 4",
      subjects: [
        "Portfolio Management",
        "Derivatives",
        "Financial Modeling",
        "Mergers & Acquisitions",
        "Capstone Project",
      ],
    },
  ]

  const careerPaths = [
    {
      role: "Investment Banking Analyst",
      salary: "₹15-25 LPA",
      companies: ["Goldman Sachs", "JP Morgan", "Morgan Stanley"],
      description: "Analyze financial data, create financial models, and support M&A transactions.",
      icon: BarChart3,
    },
    {
      role: "Financial Analyst",
      salary: "₹8-18 LPA",
      companies: ["Deloitte", "PwC", "EY", "KPMG"],
      description: "Evaluate investment opportunities, prepare financial reports, and provide recommendations.",
      icon: PieChart,
    },
    {
      role: "Corporate Finance Manager",
      salary: "₹12-22 LPA",
      companies: ["Tata Group", "Reliance", "Infosys"],
      description: "Manage company finances, capital structure, and strategic financial planning.",
      icon: Building,
    },
    {
      role: "Risk Manager",
      salary: "₹10-20 LPA",
      companies: ["HDFC Bank", "ICICI Bank", "Axis Bank"],
      description: "Identify, analyze, and mitigate financial risks across business operations.",
      icon: Target,
    },
    {
      role: "Portfolio Manager",
      salary: "₹18-35 LPA",
      companies: ["Mutual Funds", "Hedge Funds", "Asset Management"],
      description: "Manage investment portfolios and make strategic investment decisions.",
      icon: LineChart,
    },
    {
      role: "Financial Consultant",
      salary: "₹12-25 LPA",
      companies: ["McKinsey", "BCG", "Bain & Company"],
      description: "Provide strategic financial advice to corporations and high-net-worth individuals.",
      icon: Calculator,
    },
  ]

  const topCities = [
    {
      name: "Mumbai",
      colleges: "80+ Colleges",
      avgFees: "₹8-25 Lakhs",
      topColleges: ["JBIMS", "NMIMS", "SIMSREE"],
      livingCost: "₹4-8 Lakhs/year",
      jobOpportunities: "Financial Capital - Investment Banking, Mutual Funds, Stock Exchanges",
      financeJobs: "15,000+ Finance Jobs",
      href: "/study/india/mumbai?course=mba-finance",
    },
    {
      name: "Delhi NCR",
      colleges: "100+ Colleges",
      avgFees: "₹6-30 Lakhs",
      topColleges: ["FMS Delhi", "MDI Gurgaon", "IMT Ghaziabad"],
      livingCost: "₹3-7 Lakhs/year",
      jobOpportunities: "Corporate Hub - Banking, Insurance, Financial Services",
      financeJobs: "12,000+ Finance Jobs",
      href: "/study/india/delhi?course=mba-finance",
    },
    {
      name: "Bangalore",
      colleges: "60+ Colleges",
      avgFees: "₹7-22 Lakhs",
      topColleges: ["IIM Bangalore", "IISC", "Christ University"],
      livingCost: "₹3-6 Lakhs/year",
      jobOpportunities: "Tech Finance Hub - Fintech, Digital Banking, Investment Tech",
      financeJobs: "8,000+ Finance Jobs",
      href: "/study/india/bangalore?course=mba-finance",
    },
    {
      name: "Hyderabad",
      colleges: "40+ Colleges",
      avgFees: "₹5-18 Lakhs",
      topColleges: ["ISB Hyderabad", "ICFAI", "Osmania University"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Emerging Finance Hub - Banking, Insurance, Fintech",
      financeJobs: "5,000+ Finance Jobs",
      href: "/study/india/hyderabad?course=mba-finance",
    },
  ]

  const collegePartners = [
    {
      name: "IIM Ahmedabad",
      ranking: "#1",
      fees: "₹25 Lakhs",
      avgPackage: "₹35 LPA",
      logo: "/placeholder.svg?height=60&width=120&text=IIM-A",
    },
    {
      name: "IIM Bangalore",
      ranking: "#2",
      fees: "₹24 Lakhs",
      avgPackage: "₹32 LPA",
      logo: "/placeholder.svg?height=60&width=120&text=IIM-B",
    },
    {
      name: "IIM Calcutta",
      ranking: "#3",
      fees: "₹27 Lakhs",
      avgPackage: "₹30 LPA",
      logo: "/placeholder.svg?height=60&width=120&text=IIM-C",
    },
    {
      name: "XLRI Jamshedpur",
      ranking: "#4",
      fees: "₹26 Lakhs",
      avgPackage: "₹28 LPA",
      logo: "/placeholder.svg?height=60&width=120&text=XLRI",
    },
    {
      name: "FMS Delhi",
      ranking: "#5",
      fees: "₹2 Lakhs",
      avgPackage: "₹26 LPA",
      logo: "/placeholder.svg?height=60&width=120&text=FMS",
    },
    {
      name: "JBIMS Mumbai",
      ranking: "#6",
      fees: "₹5 Lakhs",
      avgPackage: "₹24 LPA",
      logo: "/placeholder.svg?height=60&width=120&text=JBIMS",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-emerald-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-green-300/10 to-emerald-300/10 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  <DollarSign className="w-4 h-4" />
                  <span>MBA Finance Specialization</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  MBA Finance
                  <span className="block text-green-300">Master Your Financial Future</span>
                </h1>
                <p className="text-xl text-green-100 leading-relaxed max-w-2xl">
                  Become a finance leader with comprehensive knowledge in corporate finance, investment banking, risk
                  management, and financial analysis. Launch your career in India's thriving financial sector.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">₹12-35L</div>
                  <div className="text-sm text-green-200">Average Package</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">98%</div>
                  <div className="text-sm text-green-200">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">200+</div>
                  <div className="text-sm text-green-200">Partner Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">2 Years</div>
                  <div className="text-sm text-green-200">Duration</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 shadow-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Finance Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Download Finance Guide
                </Button>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:ml-8">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free MBA Finance Counseling</h3>
                    <p className="text-gray-600">Connect with our finance experts and plan your career path</p>
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
                        placeholder="Tell us about your finance career goals..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Get Free Finance Counseling Call
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

      {/* What is MBA Finance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What is MBA Finance?</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                MBA Finance is a specialized master's degree that focuses on financial management, investment analysis,
                corporate finance, and risk management. This program prepares you to become a financial leader capable
                of making strategic decisions that drive business growth and profitability.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Master corporate finance and capital structure decisions",
                  "Learn investment banking and financial markets operations",
                  "Develop expertise in risk management and financial modeling",
                  "Understand international finance and global markets",
                  "Gain skills in portfolio management and asset allocation",
                  "Build proficiency in financial analysis and valuation",
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Download Detailed Curriculum
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: DollarSign,
                  title: "Corporate Finance",
                  desc: "Capital budgeting, financial planning, and strategic decisions",
                },
                { icon: BarChart3, title: "Investment Banking", desc: "M&A, IPOs, and capital market transactions" },
                { icon: Target, title: "Risk Management", desc: "Financial risk assessment and mitigation strategies" },
                { icon: LineChart, title: "Portfolio Management", desc: "Asset allocation and investment strategies" },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MBA Finance Career Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse career paths in finance with excellent growth prospects and competitive salaries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((career, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <career.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{career.role}</h3>
                      <p className="text-green-600 font-semibold">{career.salary}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{career.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Top Companies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.companies.map((company, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group-hover:shadow-lg transition-all duration-300">
                    Explore This Career
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MBA Finance Curriculum</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum designed to build strong foundation in finance and develop practical skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseModules.map((module, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{module.semester}</h3>
                  </div>

                  <div className="space-y-2">
                    {module.subjects.map((subject, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              Download Complete Syllabus
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Cities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Cities for MBA Finance in India</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from India's top financial hubs offering excellent MBA Finance programs and career opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCities.map((city, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-green-600 font-semibold">{city.colleges}</p>
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
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Finance Jobs:</span>
                      <span className="font-semibold text-green-600">{city.financeJobs}</span>
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
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore MBA Finance in {city.name}
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top MBA Finance Colleges</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get direct admission assistance to India's premier business schools with strong finance programs.
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
                    <div className="flex items-center justify-center space-x-4 text-sm mb-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        Rank {college.ranking}
                      </span>
                      <span className="text-gray-600">{college.fees}</span>
                    </div>
                    <div className="text-green-600 font-semibold">Avg Package: {college.avgPackage}</div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group-hover:shadow-lg transition-all duration-300">
                    Apply for MBA Finance
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
              className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              View All Finance Colleges
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Growth Opportunities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MBA Finance Growth Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exceptional career growth and advancement opportunities in the finance sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Average Salary Hike", value: "350%", icon: TrendingUp },
              { label: "Finance Job Growth", value: "25%", icon: BarChart3 },
              { label: "Leadership Roles", value: "80%", icon: Award },
              { label: "Global Opportunities", value: "60%", icon: Globe },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Finance Sector is Booming?</h3>
                <div className="space-y-4">
                  {[
                    "Digital transformation in banking and fintech",
                    "Growing investment in capital markets",
                    "Expansion of insurance and mutual fund sectors",
                    "Increasing demand for financial advisory services",
                    "Government initiatives in financial inclusion",
                    "Rise of cryptocurrency and blockchain finance",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Lead in Finance?</h4>
                  <p className="text-gray-600 mb-6">Get personalized MBA Finance guidance from our experts</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Finance Counseling
                  </Button>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">MBA Finance Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from MBA Finance graduates who achieved remarkable career transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Mehta",
                role: "VP Investment Banking, Goldman Sachs",
                college: "IIM Ahmedabad",
                previousRole: "Software Engineer",
                salaryJump: "₹8L → ₹35L",
                story:
                  "From coding to closing million-dollar deals. MBA Finance opened doors to investment banking that I never imagined possible.",
                image: "/placeholder.svg?height=100&width=100&text=AM",
              },
              {
                name: "Priya Agarwal",
                role: "Chief Financial Officer, Flipkart",
                college: "XLRI Jamshedpur",
                previousRole: "Accountant",
                salaryJump: "₹5L → ₹45L",
                story:
                  "MeritCap's guidance helped me transition from traditional accounting to strategic finance leadership at India's top e-commerce company.",
                image: "/placeholder.svg?height=100&width=100&text=PA",
              },
              {
                name: "Rohit Sharma",
                role: "Portfolio Manager, HDFC Mutual Fund",
                college: "FMS Delhi",
                previousRole: "Bank Officer",
                salaryJump: "₹6L → ₹28L",
                story:
                  "The comprehensive finance curriculum and industry connections helped me become a successful portfolio manager managing ₹500+ crores.",
                image: "/placeholder.svg?height=100&width=100&text=RS",
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
                    <p className="text-green-600 font-semibold mb-1">{story.role}</p>
                    <p className="text-gray-600 text-sm mb-2">{story.college}</p>
                    <p className="text-sm text-gray-500">{story.previousRole} → Current Role</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{story.salaryJump}</span>
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
      <section className="py-20 bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Master Finance?</h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join thousands of successful finance professionals who chose MeritCap for their MBA Finance journey. Get
              expert guidance, college selection support, and specialized finance career counseling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 shadow-xl px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Get Free Finance Counseling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download Finance Career Guide
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Expert Finance Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Top College Admissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Career Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

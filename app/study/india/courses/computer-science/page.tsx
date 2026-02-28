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
  BookOpen,
  Target,
  Globe,
  Phone,
  Mail,
  Calendar,
  Code,
  Database,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

export default function ComputerSciencePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "Computer Science",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const specializations = [
    {
      title: "Software Engineering",
      description: "Design and develop software applications and systems",
      icon: Code,
      avgSalary: "₹8-30 LPA",
      jobRoles: "Software Engineer, Full Stack Developer, Tech Lead",
      href: "/study/india/courses/software-engineering",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Data Science & AI",
      description: "Machine learning, artificial intelligence, and data analytics",
      icon: Database,
      avgSalary: "₹10-35 LPA",
      jobRoles: "Data Scientist, ML Engineer, AI Researcher",
      href: "/study/india/courses/data-science",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Cybersecurity",
      description: "Information security, ethical hacking, and network security",
      icon: Target,
      avgSalary: "₹8-28 LPA",
      jobRoles: "Security Analyst, Ethical Hacker, Security Consultant",
      href: "/study/india/courses/cybersecurity",
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Mobile App Development",
      description: "iOS and Android application development",
      icon: Smartphone,
      avgSalary: "₹6-25 LPA",
      jobRoles: "Mobile Developer, App Developer, iOS/Android Engineer",
      href: "/study/india/courses/mobile-development",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Cloud Computing",
      description: "AWS, Azure, Google Cloud platforms and services",
      icon: Globe,
      avgSalary: "₹9-32 LPA",
      jobRoles: "Cloud Engineer, DevOps Engineer, Cloud Architect",
      href: "/study/india/courses/cloud-computing",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Web Development",
      description: "Frontend and backend web technologies",
      icon: Code,
      avgSalary: "₹5-22 LPA",
      jobRoles: "Web Developer, Frontend Developer, Backend Developer",
      href: "/study/india/courses/web-development",
      color: "from-teal-500 to-cyan-600",
    },
  ]

  const topCities = [
    {
      name: "Bangalore",
      colleges: "300+ Colleges",
      avgFees: "₹2-20 Lakhs",
      topColleges: ["IISc Bangalore", "IIIT Bangalore", "RV College"],
      livingCost: "₹3-6 Lakhs/year",
      jobOpportunities: "Silicon Valley of India - Tech Giants, Startups",
      href: "/study/india/bangalore?course=computer-science",
    },
    {
      name: "Hyderabad",
      colleges: "200+ Colleges",
      avgFees: "₹1.5-15 Lakhs",
      topColleges: ["IIIT Hyderabad", "ISB", "BITS Pilani Hyderabad"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Cyberabad - Microsoft, Google, Amazon",
      href: "/study/india/hyderabad?course=computer-science",
    },
    {
      name: "Pune",
      colleges: "180+ Colleges",
      avgFees: "₹2-18 Lakhs",
      topColleges: ["COEP", "VIT Pune", "MIT Pune"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "IT Hub - TCS, Infosys, Wipro",
      href: "/study/india/pune?course=computer-science",
    },
    {
      name: "Chennai",
      colleges: "150+ Colleges",
      avgFees: "₹1-12 Lakhs",
      topColleges: ["IIT Madras", "Anna University", "SRM University"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Detroit of India - Automotive Tech, IT Services",
      href: "/study/india/chennai?course=computer-science",
    },
  ]

  const collegePartners = [
    {
      name: "IIT Bombay",
      ranking: "#1",
      fees: "₹10 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=IIT-B",
    },
    {
      name: "IIT Delhi",
      ranking: "#2",
      fees: "₹10 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=IIT-D",
    },
    {
      name: "IIIT Hyderabad",
      ranking: "#3",
      fees: "₹12 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=IIIT-H",
    },
    {
      name: "BITS Pilani",
      ranking: "#4",
      fees: "₹20 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=BITS",
    },
    {
      name: "VIT Vellore",
      ranking: "#5",
      fees: "₹8 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=VIT",
    },
    {
      name: "SRM University",
      ranking: "#6",
      fees: "₹6 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=SRM",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-purple-300/10 to-blue-300/10 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Computer Science
                  <span className="block text-blue-300">in India</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                  Code the future with India's premier computer science programs. Choose from cutting-edge
                  specializations and study in top tech institutes across the country.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">2000+</div>
                  <div className="text-sm text-blue-200">CS Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">₹5-35L</div>
                  <div className="text-sm text-blue-200">Average Package</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">95%</div>
                  <div className="text-sm text-blue-200">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">4 Years</div>
                  <div className="text-sm text-blue-200">Duration</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free CS Counseling</h3>
                    <p className="text-gray-600">
                      Connect with our computer science experts and find your perfect program
                    </p>
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
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi NCR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your programming interests..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
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

      {/* Why Choose Computer Science Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Computer Science in India?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India is the global IT powerhouse with world-class computer science education, cutting-edge research, and
              unmatched career opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Highest Demand",
                description:
                  "Computer science graduates are in highest demand globally with excellent salary packages and career growth.",
              },
              {
                icon: Building,
                title: "Tech Hub",
                description:
                  "India is home to global tech giants and innovative startups offering world-class opportunities.",
              },
              {
                icon: Globe,
                title: "Global Opportunities",
                description: "Indian CS education is globally recognized, opening doors to international tech careers.",
              },
              {
                icon: Users,
                title: "Innovation Ecosystem",
                description: "Be part of India's thriving tech ecosystem and contribute to cutting-edge innovations.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* CS Specializations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your CS Specialization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore cutting-edge computer science specializations and find the perfect match for your tech interests.
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
                        <p className="text-blue-600 font-semibold">{spec.avgSalary}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">{spec.jobRoles}</span>
                      </div>
                    </div>

                    <Link href={spec.href}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white group-hover:shadow-lg transition-all duration-300">
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
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              View All CS Specializations
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Cities for CS Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Cities for Computer Science in India</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from India's premier tech hubs, each offering unique advantages and career opportunities in
              computer science.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCities.map((city, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-blue-600 font-semibold">{city.colleges}</p>
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
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore CS in {city.name}
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top CS College Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get direct admission assistance to India's premier computer science institutes with our expert guidance.
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
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                        Rank {college.ranking}
                      </span>
                      <span className="text-gray-600">{college.fees}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white group-hover:shadow-lg transition-all duration-300">
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
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">CS Career Outcomes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exceptional career opportunities and growth prospects that await computer science graduates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Average Starting Salary", value: "₹12 LPA", icon: TrendingUp },
              { label: "Placement Rate", value: "95%", icon: CheckCircle },
              { label: "Tech Companies", value: "10,000+", icon: Building },
              { label: "Career Growth", value: "Exponential", icon: Award },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Top Tech Employers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Google",
                    "Microsoft",
                    "Amazon",
                    "Apple",
                    "Meta",
                    "Netflix",
                    "TCS",
                    "Infosys",
                    "Wipro",
                    "Accenture",
                    "Flipkart",
                    "Zomato",
                  ].map((company, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700 font-medium">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Code Your Future?</h4>
                  <p className="text-gray-600 mb-6">Get personalized computer science guidance from our experts</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Code Your Future?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of successful software engineers who chose MeritCap for their computer science education
              journey. Get expert guidance, college selection support, and career counseling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Get Free CS Counseling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download CS Guide
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-blue-200">
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

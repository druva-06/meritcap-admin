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
  Scale,
  Gavel,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function LawPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "Law",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const specializations = [
    {
      title: "LLB (Bachelor of Laws)",
      description: "Comprehensive legal education covering all aspects of law",
      icon: Scale,
      avgSalary: "₹4-20 LPA",
      jobRoles: "Lawyer, Legal Advisor, Advocate",
      href: "/study/india/courses/llb",
      color: "from-amber-500 to-yellow-600",
    },
    {
      title: "BA LLB (Integrated)",
      description: "5-year integrated program combining arts and law",
      icon: Gavel,
      avgSalary: "₹5-25 LPA",
      jobRoles: "Corporate Lawyer, Legal Consultant, Judge",
      href: "/study/india/courses/ba-llb",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "BBA LLB (Integrated)",
      description: "Business administration with legal studies",
      icon: Building,
      avgSalary: "₹6-30 LPA",
      jobRoles: "Corporate Counsel, Business Lawyer, Legal Manager",
      href: "/study/india/courses/bba-llb",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "LLM (Master of Laws)",
      description: "Advanced legal studies and specialization",
      icon: FileText,
      avgSalary: "₹8-35 LPA",
      jobRoles: "Senior Advocate, Legal Scholar, Law Professor",
      href: "/study/india/courses/llm",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Cyber Law",
      description: "Specialization in internet and technology law",
      icon: Target,
      avgSalary: "₹7-28 LPA",
      jobRoles: "Cyber Lawyer, IT Legal Consultant, Privacy Officer",
      href: "/study/india/courses/cyber-law",
      color: "from-red-500 to-pink-600",
    },
    {
      title: "International Law",
      description: "Focus on global legal systems and international relations",
      icon: Globe,
      avgSalary: "₹10-40 LPA",
      jobRoles: "International Lawyer, Diplomat, Legal Researcher",
      href: "/study/india/courses/international-law",
      color: "from-teal-500 to-cyan-600",
    },
  ]

  const topCities = [
    {
      name: "Delhi NCR",
      colleges: "150+ Colleges",
      avgFees: "₹2-20 Lakhs",
      topColleges: ["Faculty of Law DU", "Jamia Millia Islamia", "NLUD"],
      livingCost: "₹3-7 Lakhs/year",
      jobOpportunities: "Supreme Court, High Court, Corporate Law Firms",
      href: "/study/india/delhi?course=law",
    },
    {
      name: "Mumbai",
      colleges: "100+ Colleges",
      avgFees: "₹3-25 Lakhs",
      topColleges: ["GLC Mumbai", "Pravin Gandhi College", "KC Law College"],
      livingCost: "₹4-8 Lakhs/year",
      jobOpportunities: "Corporate Law, Banking Law, Maritime Law",
      href: "/study/india/mumbai?course=law",
    },
    {
      name: "Bangalore",
      colleges: "80+ Colleges",
      avgFees: "₹2-18 Lakhs",
      topColleges: ["NLSIU Bangalore", "Christ University", "BMS Law College"],
      livingCost: "₹3-6 Lakhs/year",
      jobOpportunities: "IT Law, Corporate Legal, Intellectual Property",
      href: "/study/india/bangalore?course=law",
    },
    {
      name: "Hyderabad",
      colleges: "60+ Colleges",
      avgFees: "₹1.5-15 Lakhs",
      topColleges: ["NALSAR", "Osmania University", "ICFAI Law School"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Corporate Law, Pharma Legal, Real Estate Law",
      href: "/study/india/hyderabad?course=law",
    },
  ]

  const collegePartners = [
    {
      name: "NLSIU Bangalore",
      ranking: "#1",
      fees: "₹3 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=NLSIU",
    },
    {
      name: "NALSAR Hyderabad",
      ranking: "#2",
      fees: "₹4 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=NALSAR",
    },
    {
      name: "Faculty of Law DU",
      ranking: "#3",
      fees: "₹50K",
      logo: "/placeholder.svg?height=60&width=120&text=DU-LAW",
    },
    {
      name: "GLC Mumbai",
      ranking: "#4",
      fees: "₹30K",
      logo: "/placeholder.svg?height=60&width=120&text=GLC",
    },
    {
      name: "Jamia Millia Islamia",
      ranking: "#5",
      fees: "₹1 Lakh",
      logo: "/placeholder.svg?height=60&width=120&text=JMI",
    },
    {
      name: "Christ University",
      ranking: "#6",
      fees: "₹8 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=CHRIST",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900 via-yellow-800 to-orange-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-orange-300/10 to-amber-300/10 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Law
                  <span className="block text-amber-300">in India</span>
                </h1>
                <p className="text-xl text-amber-100 leading-relaxed max-w-2xl">
                  Champion justice with India's premier law programs. Choose from diverse legal specializations and
                  study in top law schools across the country.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">1500+</div>
                  <div className="text-sm text-amber-200">Law Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">₹30K-25L</div>
                  <div className="text-sm text-amber-200">Course Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">85%</div>
                  <div className="text-sm text-amber-200">Employment Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">3-5 Years</div>
                  <div className="text-sm text-amber-200">Duration</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 shadow-xl">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Law Counseling</h3>
                    <p className="text-gray-600">
                      Connect with our legal education experts and find your perfect program
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
                          <SelectItem value="delhi">Delhi NCR</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
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
                        placeholder="Tell us about your legal career goals..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg"
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

      {/* Why Choose Law Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Law in India?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India offers comprehensive legal education with diverse career opportunities, strong judicial system, and
              growing demand for legal professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Growing Demand",
                description:
                  "Legal professionals are in high demand across corporate, government, and private sectors with excellent growth prospects.",
              },
              {
                icon: Building,
                title: "Diverse Opportunities",
                description:
                  "From corporate law to human rights, India offers diverse legal career paths and specializations.",
              },
              {
                icon: Globe,
                title: "Global Recognition",
                description:
                  "Indian law degrees are recognized internationally, opening doors to global legal careers.",
              },
              {
                icon: Users,
                title: "Social Impact",
                description: "Make a difference in society by upholding justice and protecting rights of citizens.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* Law Specializations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Law Specialization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse legal specializations and find the perfect match for your interests and career
              aspirations.
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
                        <p className="text-amber-600 font-semibold">{spec.avgSalary}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-700">{spec.jobRoles}</span>
                      </div>
                    </div>

                    <Link href={spec.href}>
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white group-hover:shadow-lg transition-all duration-300">
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
              className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
            >
              View All Law Specializations
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Cities for Law Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Cities for Law in India</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from India's premier legal education hubs, each offering unique advantages and career
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCities.map((city, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-amber-600 font-semibold">{city.colleges}</p>
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
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore Law in {city.name}
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Law College Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get direct admission assistance to India's premier law schools with our expert guidance.
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
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                        Rank {college.ranking}
                      </span>
                      <span className="text-gray-600">{college.fees}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white group-hover:shadow-lg transition-all duration-300">
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
              className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Law Career Outcomes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the career opportunities and impact that await law graduates in India's legal ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Average Starting Salary", value: "₹6 LPA", icon: TrendingUp },
              { label: "Employment Rate", value: "85%", icon: CheckCircle },
              { label: "Law Firms", value: "10,000+", icon: Building },
              { label: "Career Growth", value: "Excellent", icon: Award },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Top Legal Employers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Khaitan & Co",
                    "AZB & Partners",
                    "Cyril Amarchand Mangaldas",
                    "Shardul Amarchand Mangaldas",
                    "JSA",
                    "Trilegal",
                    "Luthra & Luthra",
                    "Nishith Desai Associates",
                    "Supreme Court of India",
                    "High Courts",
                    "Corporate Legal Depts",
                    "Government Legal Services",
                  ].map((employer, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-gray-700 font-medium">{employer}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Legal Journey?</h4>
                  <p className="text-gray-600 mb-6">Get personalized law education guidance from our experts</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg"
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
      <section className="py-20 bg-gradient-to-r from-amber-900 via-yellow-800 to-orange-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Champion Justice?</h2>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Join thousands of successful lawyers who chose MeritCap for their legal education journey. Get expert
              guidance, college selection support, and career counseling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 shadow-xl px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Get Free Law Counseling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download Law Guide
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-amber-200">
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

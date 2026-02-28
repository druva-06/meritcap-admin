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
  Heart,
  Stethoscope,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function MedicinePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "Medicine & Healthcare",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const specializations = [
    {
      title: "MBBS",
      description: "Bachelor of Medicine and Bachelor of Surgery - Core medical degree",
      icon: Stethoscope,
      avgSalary: "₹8-25 LPA",
      jobRoles: "Doctor, Physician, Medical Officer",
      href: "/study/mbbs",
      color: "from-red-500 to-pink-600",
    },
    {
      title: "BDS (Dentistry)",
      description: "Bachelor of Dental Surgery - Comprehensive dental care",
      icon: Heart,
      avgSalary: "₹6-20 LPA",
      jobRoles: "Dentist, Oral Surgeon, Dental Consultant",
      href: "/study/india/courses/bds",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Pharmacy",
      description: "Bachelor of Pharmacy - Drug development and pharmaceutical sciences",
      icon: Activity,
      avgSalary: "₹4-15 LPA",
      jobRoles: "Pharmacist, Drug Inspector, Research Scientist",
      href: "/study/india/courses/pharmacy",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Nursing",
      description: "Bachelor of Science in Nursing - Patient care and healthcare management",
      icon: Heart,
      avgSalary: "₹3-12 LPA",
      jobRoles: "Nurse, Healthcare Manager, Clinical Coordinator",
      href: "/study/india/courses/nursing",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Physiotherapy",
      description: "Bachelor of Physiotherapy - Rehabilitation and physical therapy",
      icon: Activity,
      avgSalary: "₹4-18 LPA",
      jobRoles: "Physiotherapist, Sports Therapist, Rehabilitation Specialist",
      href: "/study/india/courses/physiotherapy",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Medical Technology",
      description: "Bachelor of Medical Laboratory Technology - Diagnostic and lab sciences",
      icon: Target,
      avgSalary: "₹3-15 LPA",
      jobRoles: "Lab Technician, Medical Technologist, Research Assistant",
      href: "/study/india/courses/medical-technology",
      color: "from-teal-500 to-cyan-600",
    },
  ]

  const topCities = [
    {
      name: "Delhi NCR",
      colleges: "100+ Colleges",
      avgFees: "₹5-50 Lakhs",
      topColleges: ["AIIMS Delhi", "MAMC", "UCMS"],
      livingCost: "₹3-7 Lakhs/year",
      jobOpportunities: "Government Hospitals, Private Healthcare, Research",
      href: "/study/india/delhi?course=medicine",
    },
    {
      name: "Mumbai",
      colleges: "80+ Colleges",
      avgFees: "₹8-60 Lakhs",
      topColleges: ["KEM Hospital", "Grant Medical College", "Tata Memorial"],
      livingCost: "₹4-8 Lakhs/year",
      jobOpportunities: "Corporate Hospitals, Pharmaceutical Companies",
      href: "/study/india/mumbai?course=medicine",
    },
    {
      name: "Bangalore",
      colleges: "70+ Colleges",
      avgFees: "₹6-40 Lakhs",
      topColleges: ["St. John's Medical College", "BMCRI", "KIMS"],
      livingCost: "₹3-6 Lakhs/year",
      jobOpportunities: "Healthcare IT, Medical Research, Biotech",
      href: "/study/india/bangalore?course=medicine",
    },
    {
      name: "Chennai",
      colleges: "90+ Colleges",
      avgFees: "₹4-35 Lakhs",
      topColleges: ["CMC Vellore", "JIPMER", "Stanley Medical College"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Medical Tourism, Healthcare Services, Pharma",
      href: "/study/india/chennai?course=medicine",
    },
  ]

  const collegePartners = [
    {
      name: "AIIMS Delhi",
      ranking: "#1",
      fees: "₹5 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=AIIMS",
    },
    {
      name: "CMC Vellore",
      ranking: "#2",
      fees: "₹8 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=CMC",
    },
    {
      name: "JIPMER",
      ranking: "#3",
      fees: "₹3 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=JIPMER",
    },
    {
      name: "KMC Manipal",
      ranking: "#4",
      fees: "₹25 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=KMC",
    },
    {
      name: "St. John's Medical",
      ranking: "#5",
      fees: "₹20 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=SJMC",
    },
    {
      name: "Grant Medical College",
      ranking: "#6",
      fees: "₹2 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=GMC",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-pink-800 to-rose-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-rose-300/10 to-red-300/10 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Medicine & Healthcare
                  <span className="block text-red-300">in India</span>
                </h1>
                <p className="text-xl text-red-100 leading-relaxed max-w-2xl">
                  Heal the world with India's premier medical education. Choose from diverse healthcare specializations
                  and study in top medical colleges across the country.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-300">600+</div>
                  <div className="text-sm text-red-200">Medical Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-300">₹3-60L</div>
                  <div className="text-sm text-red-200">Course Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-300">95%</div>
                  <div className="text-sm text-red-200">Employment Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-300">4-6 Years</div>
                  <div className="text-sm text-red-200">Duration</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-red-900 hover:bg-red-50 shadow-xl">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Medical Counseling</h3>
                    <p className="text-gray-600">
                      Connect with our medical education experts and find your perfect program
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
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your medical career goals..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg"
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

      {/* Why Choose Medicine Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Medicine in India?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India offers world-class medical education with diverse specializations, excellent clinical exposure, and
              strong healthcare infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Noble Profession",
                description:
                  "Medicine is one of the most respected and rewarding careers with the opportunity to save lives and serve humanity.",
              },
              {
                icon: Building,
                title: "Clinical Excellence",
                description:
                  "India's medical colleges offer excellent clinical exposure with diverse patient cases and advanced medical facilities.",
              },
              {
                icon: Globe,
                title: "Global Recognition",
                description:
                  "Indian medical degrees are recognized worldwide, opening doors to practice medicine internationally.",
              },
              {
                icon: Users,
                title: "Healthcare Innovation",
                description:
                  "Be part of India's growing healthcare sector and contribute to medical research and innovation.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* Medical Specializations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Medical Specialization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse medical and healthcare specializations and find the perfect match for your passion and
              career goals.
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
                        <p className="text-red-600 font-semibold">{spec.avgSalary}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700">{spec.jobRoles}</span>
                      </div>
                    </div>

                    <Link href={spec.href}>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white group-hover:shadow-lg transition-all duration-300">
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
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
              View All Medical Specializations
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Cities for Medicine Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Cities for Medicine in India</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from India's premier medical education hubs, each offering unique advantages and clinical
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCities.map((city, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-red-600 font-semibold">{city.colleges}</p>
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
                    <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore Medicine in {city.name}
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Medical College Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get direct admission assistance to India's premier medical colleges with our expert guidance.
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
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
                        Rank {college.ranking}
                      </span>
                      <span className="text-gray-600">{college.fees}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white group-hover:shadow-lg transition-all duration-300">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Medical Career Outcomes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the career opportunities and impact that await medical graduates in India's healthcare sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Average Starting Salary", value: "₹8 LPA", icon: TrendingUp },
              { label: "Employment Rate", value: "95%", icon: CheckCircle },
              { label: "Healthcare Facilities", value: "50,000+", icon: Building },
              { label: "Job Security", value: "Excellent", icon: Award },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Top Healthcare Employers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "AIIMS",
                    "Apollo Hospitals",
                    "Fortis Healthcare",
                    "Max Healthcare",
                    "Manipal Hospitals",
                    "Narayana Health",
                    "Medanta",
                    "Asian Heart Institute",
                    "Tata Memorial",
                    "PGIMER",
                    "JIPMER",
                    "Sankara Nethralaya",
                  ].map((employer, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span className="text-gray-700 font-medium">{employer}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Medical Journey?</h4>
                  <p className="text-gray-600 mb-6">Get personalized medical education guidance from our experts</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg"
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
      <section className="py-20 bg-gradient-to-r from-red-900 via-pink-800 to-rose-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Heal the World?</h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Join thousands of successful doctors who chose MeritCap for their medical education journey. Get expert
              guidance, college selection support, and career counseling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-red-900 hover:bg-red-50 shadow-xl px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Get Free Medical Counseling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download Medical Guide
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-red-200">
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

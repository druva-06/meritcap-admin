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
  Palette,
  Camera,
  Brush,
} from "lucide-react"
import Link from "next/link"

export default function DesignPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "Design & Arts",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const specializations = [
    {
      title: "Fashion Design",
      description: "Create innovative fashion and apparel designs",
      icon: Palette,
      avgSalary: "₹4-18 LPA",
      jobRoles: "Fashion Designer, Stylist, Creative Director",
      href: "/study/india/courses/fashion-design",
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Graphic Design",
      description: "Visual communication through digital and print media",
      icon: Brush,
      avgSalary: "₹3-15 LPA",
      jobRoles: "Graphic Designer, Art Director, Brand Designer",
      href: "/study/india/courses/graphic-design",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Interior Design",
      description: "Design functional and aesthetic interior spaces",
      icon: Building,
      avgSalary: "₹4-20 LPA",
      jobRoles: "Interior Designer, Space Planner, Design Consultant",
      href: "/study/india/courses/interior-design",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Product Design",
      description: "Design innovative products and user experiences",
      icon: Target,
      avgSalary: "₹5-25 LPA",
      jobRoles: "Product Designer, UX Designer, Design Engineer",
      href: "/study/india/courses/product-design",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Animation & VFX",
      description: "Create animated content and visual effects",
      icon: Camera,
      avgSalary: "₹4-22 LPA",
      jobRoles: "Animator, VFX Artist, Motion Graphics Designer",
      href: "/study/india/courses/animation-vfx",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Fine Arts",
      description: "Traditional and contemporary art forms",
      icon: Brush,
      avgSalary: "₹3-12 LPA",
      jobRoles: "Artist, Art Teacher, Gallery Curator",
      href: "/study/india/courses/fine-arts",
      color: "from-teal-500 to-cyan-600",
    },
  ]

  const topCities = [
    {
      name: "Mumbai",
      colleges: "100+ Colleges",
      avgFees: "₹2-15 Lakhs",
      topColleges: ["JJ School of Art", "NIFT Mumbai", "Sophia College"],
      livingCost: "₹4-8 Lakhs/year",
      jobOpportunities: "Fashion Industry, Film Industry, Advertising",
      href: "/study/india/mumbai?course=design",
    },
    {
      name: "Delhi NCR",
      colleges: "120+ Colleges",
      avgFees: "₹1.5-12 Lakhs",
      topColleges: ["NIFT Delhi", "Pearl Academy", "Jamia Millia Islamia"],
      livingCost: "₹3-7 Lakhs/year",
      jobOpportunities: "Fashion Brands, Design Studios, Media Houses",
      href: "/study/india/delhi?course=design",
    },
    {
      name: "Bangalore",
      colleges: "80+ Colleges",
      avgFees: "₹2-10 Lakhs",
      topColleges: ["NIFT Bangalore", "Srishti Institute", "Chitrakala Parishath"],
      livingCost: "₹3-6 Lakhs/year",
      jobOpportunities: "Tech Design, Product Design, Gaming Industry",
      href: "/study/india/bangalore?course=design",
    },
    {
      name: "Chennai",
      colleges: "60+ Colleges",
      avgFees: "₹1-8 Lakhs",
      topColleges: ["NIFT Chennai", "Stella Maris College", "Government College of Fine Arts"],
      livingCost: "₹2.5-5 Lakhs/year",
      jobOpportunities: "Textile Design, Automotive Design, Film Industry",
      href: "/study/india/chennai?course=design",
    },
  ]

  const collegePartners = [
    {
      name: "NIFT Delhi",
      ranking: "#1",
      fees: "₹2 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=NIFT",
    },
    {
      name: "Pearl Academy",
      ranking: "#2",
      fees: "₹8 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=PEARL",
    },
    {
      name: "JJ School of Art",
      ranking: "#3",
      fees: "₹50K",
      logo: "/placeholder.svg?height=60&width=120&text=JJ-ART",
    },
    {
      name: "Srishti Institute",
      ranking: "#4",
      fees: "₹6 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=SRISHTI",
    },
    {
      name: "MIT Institute of Design",
      ranking: "#5",
      fees: "₹10 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=MIT-ID",
    },
    {
      name: "Symbiosis Institute",
      ranking: "#6",
      fees: "₹7 Lakhs",
      logo: "/placeholder.svg?height=60&width=120&text=SID",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900 via-purple-800 to-indigo-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-indigo-300/10 to-pink-300/10 rounded-full blur-xl animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Design & Arts
                  <span className="block text-pink-300">in India</span>
                </h1>
                <p className="text-xl text-pink-100 leading-relaxed max-w-2xl">
                  Create the future with India's premier design programs. Choose from diverse creative specializations
                  and study in top design institutes across the country.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-300">800+</div>
                  <div className="text-sm text-pink-200">Design Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-300">₹50K-15L</div>
                  <div className="text-sm text-pink-200">Course Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-300">80%</div>
                  <div className="text-sm text-pink-200">Employment Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-300">3-4 Years</div>
                  <div className="text-sm text-pink-200">Duration</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-pink-900 hover:bg-pink-50 shadow-xl">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Design Counseling</h3>
                    <p className="text-gray-600">
                      Connect with our design education experts and find your perfect program
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
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi NCR</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your design interests..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
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

      {/* Why Choose Design Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Design & Arts in India?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India offers rich creative heritage with modern design education, diverse career opportunities, and
              growing creative industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Growing Industry",
                description:
                  "Creative industries are booming in India with increasing demand for skilled designers and artists.",
              },
              {
                icon: Building,
                title: "Diverse Opportunities",
                description:
                  "From fashion to digital design, India offers diverse creative career paths and specializations.",
              },
              {
                icon: Globe,
                title: "Global Recognition",
                description:
                  "Indian design education is gaining international recognition with global career opportunities.",
              },
              {
                icon: Users,
                title: "Creative Expression",
                description:
                  "Express your creativity while building a sustainable career in the growing creative economy.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* Design Specializations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Design Specialization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse design and arts specializations and find the perfect match for your creative passion.
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
                        <p className="text-pink-600 font-semibold">{spec.avgSalary}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{spec.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <Briefcase className="w-4 h-4 text-pink-500" />
                        <span className="text-gray-700">{spec.jobRoles}</span>
                      </div>
                    </div>

                    <Link href={spec.href}>
                      <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white group-hover:shadow-lg transition-all duration-300">
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
              className="border-pink-600 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              View All Design Specializations
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Cities for Design Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Cities for Design in India</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from India's premier design education hubs, each offering unique creative opportunities and
              industry connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCities.map((city, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-pink-600 font-semibold">{city.colleges}</p>
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
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white group-hover:shadow-lg transition-all duration-300">
                      Explore Design in {city.name}
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Design College Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get direct admission assistance to India's premier design institutes with our expert guidance.
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
                      <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-semibold">
                        Rank {college.ranking}
                      </span>
                      <span className="text-gray-600">{college.fees}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white group-hover:shadow-lg transition-all duration-300">
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
              className="border-pink-600 text-pink-600 hover:bg-pink-50 bg-transparent"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Career Outcomes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the creative opportunities and career growth that await design graduates in India's creative
              industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Average Starting Salary", value: "₹4 LPA", icon: TrendingUp },
              { label: "Employment Rate", value: "80%", icon: CheckCircle },
              { label: "Creative Companies", value: "5,000+", icon: Building },
              { label: "Career Growth", value: "Excellent", icon: Award },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Top Creative Employers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Ogilvy",
                    "Leo Burnett",
                    "Wunderman Thompson",
                    "Publicis Sapient",
                    "Godrej Design Lab",
                    "Titan Design Studio",
                    "Myntra",
                    "Flipkart Design",
                    "Zomato",
                    "Swiggy",
                    "Byju's Design",
                    "Paytm Design",
                  ].map((employer, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-pink-500" />
                      <span className="text-gray-700 font-medium">{employer}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Creative Journey?</h4>
                  <p className="text-gray-600 mb-6">Get personalized design education guidance from our experts</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
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
      <section className="py-20 bg-gradient-to-r from-pink-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Create Your Future?</h2>
            <p className="text-xl text-pink-100 mb-8 leading-relaxed">
              Join thousands of successful designers who chose MeritCap for their creative education journey. Get expert
              guidance, college selection support, and career counseling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-pink-900 hover:bg-pink-50 shadow-xl px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Get Free Design Counseling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                <Mail className="w-5 h-5 mr-2" />
                Download Design Guide
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-pink-200">
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

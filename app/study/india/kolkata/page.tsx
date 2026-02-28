"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  GraduationCap,
  Users,
  Star,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  DollarSign,
  Home,
  Utensils,
  Car,
  Wifi,
  Heart,
  Target,
  UserCheck,
  FileText,
} from "lucide-react"

const collegePartners = [
  {
    id: 1,
    name: "Jadavpur University",
    logo: "/placeholder.svg?height=80&width=120&text=JU",
    ranking: "#1 State University",
    courses: ["Engineering", "Arts", "Science"],
    fees: "₹50,000 - ₹2,00,000",
    rating: 4.8,
  },
  {
    id: 2,
    name: "University of Calcutta",
    logo: "/placeholder.svg?height=80&width=120&text=CU",
    ranking: "#2 in West Bengal",
    courses: ["Arts", "Science", "Commerce"],
    fees: "₹30,000 - ₹1,50,000",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Indian Statistical Institute",
    logo: "/placeholder.svg?height=80&width=120&text=ISI",
    ranking: "#1 Statistics Institute",
    courses: ["Statistics", "Mathematics", "Computer Science"],
    fees: "₹1,00,000 - ₹3,00,000",
    rating: 4.9,
  },
  {
    id: 4,
    name: "West Bengal University of Technology",
    logo: "/placeholder.svg?height=80&width=120&text=WBUT",
    ranking: "#3 Technical University",
    courses: ["Engineering", "Technology", "Management"],
    fees: "₹80,000 - ₹2,50,000",
    rating: 4.4,
  },
  {
    id: 5,
    name: "Presidency University",
    logo: "/placeholder.svg?height=80&width=120&text=PU",
    ranking: "#1 Liberal Arts",
    courses: ["Liberal Arts", "Science", "Economics"],
    fees: "₹60,000 - ₹2,00,000",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Indian Institute of Management Calcutta",
    logo: "/placeholder.svg?height=80&width=120&text=IIMC",
    ranking: "#3 IIM",
    courses: ["MBA", "Executive Programs", "PhD"],
    fees: "₹25,00,000 - ₹30,00,000",
    rating: 4.9,
  },
]

const testimonials = [
  {
    name: "Arjun Chatterjee",
    course: "Engineering at Jadavpur University",
    image: "/placeholder.svg?height=60&width=60&text=AC",
    rating: 5,
    text: "MeritCap made my admission to JU seamless. Their guidance throughout the process was exceptional.",
  },
  {
    name: "Priya Banerjee",
    course: "MBA at IIM Calcutta",
    image: "/placeholder.svg?height=60&width=60&text=PB",
    rating: 5,
    text: "Thanks to MeritCap, I got into IIM Calcutta with a full scholarship. Their support was incredible.",
  },
  {
    name: "Rohit Ghosh",
    course: "Statistics at ISI",
    image: "/placeholder.svg?height=60&width=60&text=RG",
    rating: 5,
    text: "The counselors at MeritCap helped me navigate the complex admission process at ISI perfectly.",
  },
]

export default function KolkataStudyPage() {
  const [currentPartner, setCurrentPartner] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  })

  const nextPartner = () => {
    setCurrentPartner((prev) => (prev + 1) % Math.ceil(collegePartners.length / 3))
  }

  const prevPartner = () => {
    setCurrentPartner(
      (prev) => (prev - 1 + Math.ceil(collegePartners.length / 3)) % Math.ceil(collegePartners.length / 3),
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-purple-300" />
                <span className="text-purple-200">Kolkata, West Bengal</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Study in Kolkata
                <span className="block text-purple-300">City of Joy & Learning</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100 leading-relaxed">
                Discover world-class education in Kolkata's prestigious universities. From Jadavpur University to IIM
                Calcutta, find your perfect academic match in India's cultural capital.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>50+ Universities</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="h-5 w-5" />
                  <span>2L+ Students</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Star className="h-5 w-5" />
                  <span>Top Rankings</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Free Counseling
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 bg-transparent"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Campus Visit
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Quick Admission Form</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                  />
                  <Input
                    name="course"
                    placeholder="Interested Course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/30 text-white placeholder:text-purple-200"
                  />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Get Free Consultation
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Partners Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our College Partners in Kolkata</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've partnered with Kolkata's most prestigious institutions to bring you the best educational
              opportunities
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPartner}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(collegePartners.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPartner(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentPartner === index ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPartner}
                className="flex items-center gap-2 bg-transparent"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {collegePartners.slice(currentPartner * 3, (currentPartner + 1) * 3).map((college) => (
                <Card key={college.id} className="hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
                  <CardHeader className="text-center">
                    <img
                      src={college.logo || "/placeholder.svg"}
                      alt={college.name}
                      className="w-20 h-16 mx-auto mb-4 object-contain"
                    />
                    <CardTitle className="text-lg">{college.name}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {college.ranking}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{college.rating}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Popular Courses:</p>
                        <div className="flex flex-wrap gap-1">
                          {college.courses.map((course, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Annual Fees:</p>
                        <p className="font-semibold text-purple-600">{college.fees}</p>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Living & Financial Planning */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cost of Living & Financial Planning</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your budget effectively with our comprehensive cost breakdown for studying in Kolkata
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Home className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">Accommodation</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hostel</span>
                        <span className="font-semibold">₹8,000-15,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">PG</span>
                        <span className="font-semibold">₹12,000-25,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Flat Sharing</span>
                        <span className="font-semibold">₹15,000-30,000/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Utensils className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">Food & Dining</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Mess</span>
                        <span className="font-semibold">₹4,000-8,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Outside Food</span>
                        <span className="font-semibold">₹8,000-15,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Groceries</span>
                        <span className="font-semibold">₹3,000-6,000/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Car className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">Transportation</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Metro Pass</span>
                        <span className="font-semibold">₹1,500-2,500/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bus Pass</span>
                        <span className="font-semibold">₹800-1,500/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Auto/Taxi</span>
                        <span className="font-semibold">₹2,000-4,000/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Wifi className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">Utilities & Others</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Internet</span>
                        <span className="font-semibold">₹500-1,000/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Mobile</span>
                        <span className="font-semibold">₹300-800/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Entertainment</span>
                        <span className="font-semibold">₹2,000-5,000/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Monthly Budget Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">₹25,000 - ₹50,000</div>
                    <p className="text-gray-600">Average monthly expenses</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">Basic Living</span>
                      <span className="text-purple-600 font-semibold">₹15,000 - ₹25,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">Comfortable Living</span>
                      <span className="text-purple-600 font-semibold">₹25,000 - ₹40,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <span className="font-medium">Premium Living</span>
                      <span className="text-purple-600 font-semibold">₹40,000 - ₹60,000</span>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">💡 Money-Saving Tips</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Use student discounts for metro and bus passes</li>
                      <li>• Cook meals to save on food expenses</li>
                      <li>• Share accommodation to reduce costs</li>
                      <li>• Take advantage of free cultural events</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Get Personalized Budget Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MeritCap */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MeritCap for Kolkata Admissions?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for seamless college admissions in the City of Joy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Personalized College Matching
                    </h3>
                    <p className="text-gray-600">
                      Our AI-powered system matches you with the perfect colleges in Kolkata based on your academic
                      profile, interests, and career goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-purple-600" />
                      Expert Counseling
                    </h3>
                    <p className="text-gray-600">
                      Get guidance from experienced counselors who know Kolkata's education landscape inside out. From
                      JU to IIM Calcutta, we've got you covered.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Application Support
                    </h3>
                    <p className="text-gray-600">
                      Complete assistance with application forms, document preparation, and submission. We ensure your
                      application stands out from the crowd.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-lg">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-purple-600" />
                      Post-Admission Care
                    </h3>
                    <p className="text-gray-600">
                      Our support doesn't end with admission. We help with accommodation, local guidance, and settling
                      into Kolkata's vibrant student life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8">
                <div className="relative bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Watch Success Stories</h3>
                  <p className="text-gray-600 text-center mb-6">
                    See how MeritCap helped students get into top Kolkata colleges
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Play className="mr-2 h-4 w-4" />
                    Play Video
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">5000+</div>
                <p className="text-gray-600">Students Placed</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-600">Partner Colleges</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                <p className="text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-600">Support Available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from students who achieved their dreams with MeritCap
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.course}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey in Kolkata?</h2>
          <p className="text-xl mb-8 text-purple-200 max-w-3xl mx-auto">
            Join thousands of students who have successfully secured admissions in Kolkata's top colleges with MeritCap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91-9876543210
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 bg-transparent"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

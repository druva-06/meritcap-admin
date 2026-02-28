"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  DollarSign,
  Shield,
  Clock,
  Calculator,
  Upload,
  Star,
  Play,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function EducationLoanPage() {
  const [currentBankIndex, setCurrentBankIndex] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [tenure, setTenure] = useState("")
  const [emi, setEmi] = useState(0)
  const [currency, setCurrency] = useState("INR")
  const [eligibilityResult, setEligibilityResult] = useState("")
  const [studentType, setStudentType] = useState("")

  // Bank logos data
  const banks = [
    "SBI",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra",
    "Yes Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Punjab National Bank",
    "Union Bank",
    "IDFC First Bank",
    "IndusInd Bank",
    "Federal Bank",
    "South Indian Bank",
    "Karur Vysya Bank",
    "Tamilnad Mercantile Bank",
    "City Union Bank",
    "Dhanlaxmi Bank",
    "ESAF Small Finance Bank",
    "Equitas Small Finance Bank",
    "Jana Small Finance Bank",
    "Ujjivan Small Finance Bank",
    "AU Small Finance Bank",
    "Suryoday Small Finance Bank",
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      photo: "/placeholder.svg?height=80&width=80",
      quote: "MeritCap helped me secure a ₹25 lakh loan for my MS in Canada. The process was so smooth!",
      details: "Canada • ₹25 Lakhs • SBI",
      rating: 5,
    },
    {
      name: "Rahul Patel",
      photo: "/placeholder.svg?height=80&width=80",
      quote: "Got my education loan approved in just 7 days. Amazing support from the team!",
      details: "USA • ₹40 Lakhs • HDFC Credila",
      rating: 5,
    },
    {
      name: "Ananya Singh",
      photo: "/placeholder.svg?height=80&width=80",
      quote: "No collateral needed for my ₹15 lakh loan. MeritCap made it possible!",
      details: "UK • ₹15 Lakhs • Axis Bank",
      rating: 5,
    },
  ]

  // Auto-rotate bank logos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBankIndex((prev) => (prev + 1) % Math.ceil(banks.length / 6))
    }, 3000)
    return () => clearInterval(interval)
  }, [banks.length])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // EMI Calculator
  useEffect(() => {
    if (loanAmount && interestRate && tenure) {
      const P = Number.parseFloat(loanAmount)
      const r = Number.parseFloat(interestRate) / 100 / 12
      const n = Number.parseFloat(tenure)

      if (P > 0 && r > 0 && n > 0) {
        const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        setEmi(Math.round(emiValue))
      }
    }
  }, [loanAmount, interestRate, tenure])

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Thank you!",
      description: "Our Loan Advisor will reach out shortly.",
      duration: 5000,
    })
  }

  const handleEligibilityCheck = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo logic
    const isEligible = Math.random() > 0.3
    setEligibilityResult(isEligible ? "You're likely eligible!" : "Please contact our Loan Expert.")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300 rounded-full animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-yellow-400 text-blue-800 text-lg px-6 py-2">Education Financing Made Easy</Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Get Your Education Loan
            <span className="block text-yellow-300">Approved – Fast & Easy</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            MeritCap is partnered with 24+ banks to get you the best deal
          </p>

          {/* Money Funnel Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 border-8 border-yellow-300 rounded-full flex items-center justify-center animate-pulse">
                <DollarSign className="w-16 h-16 text-yellow-300" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-300"></div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Check Eligibility Now
          </Button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* EMI Calculator Section */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Estimate Your EMI</h2>
              <p className="text-xl text-gray-600">Calculate your monthly payments instantly</p>
            </div>

            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardContent className="p-8">
                <div className="grid gap-6">
                  <div className="flex gap-4 mb-4">
                    <Button
                      variant={currency === "INR" ? "default" : "outline"}
                      onClick={() => setCurrency("INR")}
                      className="flex-1"
                    >
                      ₹ INR
                    </Button>
                    <Button
                      variant={currency === "USD" ? "default" : "outline"}
                      onClick={() => setCurrency("USD")}
                      className="flex-1"
                    >
                      $ USD
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount</label>
                    <Input
                      type="number"
                      placeholder={`${currency === "INR" ? "₹" : "$"} Enter amount`}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="text-lg py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 8.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="text-lg py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tenure (Months)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 120"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="text-lg py-3"
                    />
                  </div>

                  {emi > 0 && (
                    <div className="bg-green-50 p-6 rounded-lg text-center">
                      <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-green-600 mb-2">
                        Monthly EMI: {currency === "INR" ? "₹" : "$"}
                        {emi.toLocaleString()}
                      </h3>
                      <p className="text-sm text-gray-600">*Indicative only. Actual EMI depends on bank policies.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Dynamic Eligibility Checker */}
          <section className="py-16 bg-gray-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Check If You're Eligible</h2>
              <p className="text-xl text-gray-600">Quick eligibility assessment</p>
            </div>

            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleEligibilityCheck} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Student Type</label>
                    <Select value={studentType} onValueChange={setStudentType}>
                      <SelectTrigger className="text-lg py-3">
                        <SelectValue placeholder="Select student type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian">Indian Student</SelectItem>
                        <SelectItem value="international">International Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {studentType === "indian" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">NEET/JEE Score</label>
                        <Input placeholder="Enter your score" className="text-lg py-3" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CIBIL Score (Optional)</label>
                        <Input placeholder="Enter CIBIL score" className="text-lg py-3" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Course Type</label>
                        <Select>
                          <SelectTrigger className="text-lg py-3">
                            <SelectValue placeholder="Select course type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {studentType === "international" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Admission Offer Letter</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload or drag and drop</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Fee Structure</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Upload fee structure document</p>
                        </div>
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg">
                    Check Eligibility
                  </Button>

                  {eligibilityResult && (
                    <div
                      className={`p-4 rounded-lg text-center ${
                        eligibilityResult.includes("likely")
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      <p className="font-semibold">{eligibilityResult}</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Partner Bank Logos Carousel */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Banking Partners</h2>
              <p className="text-xl text-gray-600">Trusted by 24+ leading banks and financial institutions</p>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentBankIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(banks.length / 6) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {banks.slice(slideIndex * 6, (slideIndex + 1) * 6).map((bank, index) => (
                        <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-blue-600 font-bold text-xs">{bank.slice(0, 3)}</span>
                            </div>
                            <p className="text-sm font-medium">{bank}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Slider */}
          <section className="py-16 bg-blue-50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
              <p className="text-xl text-gray-600">Success stories from our loan recipients</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <img
                      src={testimonials[currentTestimonial].photo || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />

                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-xl italic text-gray-700 mb-4">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>

                    <div className="text-lg font-semibold text-blue-600 mb-2">
                      {testimonials[currentTestimonial].name}
                    </div>

                    <div className="text-gray-600">{testimonials[currentTestimonial].details}</div>

                    {/* Video Testimonial Placeholder */}
                    <div className="mt-6">
                      <div className="relative bg-gray-200 rounded-lg p-8 cursor-pointer hover:bg-gray-300 transition-colors">
                        <Play className="w-12 h-12 text-blue-600 mx-auto" />
                        <p className="text-gray-600 mt-2">Watch Video Testimonial</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* FAQs Accordion */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Get answers to common loan queries</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Do I need a co-signer for my education loan?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    For loans up to ₹7.5 lakhs, most banks don't require a co-signer. For higher amounts, a co-signer
                    with good credit history is typically required. We help you understand each bank's specific
                    requirements.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Can I get 100% loan including living expenses?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, many banks offer up to 100% financing covering tuition fees, living expenses, travel costs, and
                    other study-related expenses. The exact coverage depends on the bank and your profile.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What is the processing time for loan approval?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    With complete documentation, most banks process education loans within 15-30 days. Our streamlined
                    process and bank partnerships help expedite approvals, often within 7-15 days.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    What interest rates can I expect?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Interest rates typically range from 8.5% to 15% depending on the bank, loan amount, and your
                    profile. We help you compare rates from multiple banks to get the best deal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    When do I start repaying the loan?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most education loans have a moratorium period during your studies plus 6-12 months after course
                    completion. You can choose to pay only interest during studies or defer all payments until the
                    moratorium ends.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>

        {/* Sticky Right-side Lead Form */}
        <div className="lg:w-96">
          <div className="sticky top-8">
            <Card className="shadow-2xl border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">Get Your Loan Quote</h3>
                  <p className="text-gray-600">Fill the form for instant assistance</p>
                </div>

                <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                  <Input placeholder="Full Name" required className="py-3" />

                  <Input type="email" placeholder="Email Address" required className="py-3" />

                  <Input type="tel" placeholder="Mobile Number" required className="py-3" />

                  <Select>
                    <SelectTrigger className="py-3">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="py-3">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="ms">MS/Masters</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Select defaultValue="inr">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">₹</SelectItem>
                        <SelectItem value="usd">$</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="number" placeholder="Loan Amount Needed" required className="flex-1 py-3" />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold">
                    Get Instant Quote
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>+91-9876543210</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>loans@meritcap.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Available 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA Footer */}
      <section
        className="py-20 px-4 text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/placeholder.svg?height=400&width=1200')`,
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Still have doubts?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Let our Loan Experts help you today.</p>

          <Button
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Book Free Consultation
          </Button>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>100% Free Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-400" />
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

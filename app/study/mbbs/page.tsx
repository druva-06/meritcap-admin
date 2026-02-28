"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Star,
  Globe,
  Users,
  Award,
  BookOpen,
  Phone,
  Mail,
  Eye,
  Send,
  ArrowUp,
  Shield,
  Target,
  Heart,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function StudyMBBSPage() {
  const [selectedCountry, setSelectedCountry] = useState("russia")
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  // University data for each country
  const universitiesData = {
    russia: [
      {
        id: 1,
        name: "First Moscow State Medical University",
        location: "Moscow, Russia",
        duration: "6 years",
        tuitionFee: "USD 7,000/year",
        recognition: ["MCI Approved", "WHO Listed", "WDOMS Listed"],
        ranking: "#1 Medical University in Russia",
        established: "1758",
        students: "10,000+",
        details: {
          overview:
            "One of the oldest and most prestigious medical universities in Russia with over 260 years of excellence.",
          facilities: ["Modern laboratories", "Digital library", "Research centers", "International student support"],
          admission: "NEET qualification required for Indian students",
          hostel: "On-campus accommodation available",
        },
      },
      {
        id: 2,
        name: "Kazan Federal University",
        location: "Kazan, Russia",
        duration: "6 years",
        tuitionFee: "USD 5,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#3 Medical University in Russia",
        established: "1804",
        students: "8,500+",
        details: {
          overview: "A leading federal university with strong medical programs and international recognition.",
          facilities: ["State-of-the-art labs", "Medical simulation center", "Research facilities"],
          admission: "NEET qualification required",
          hostel: "Comfortable hostel facilities",
        },
      },
      {
        id: 3,
        name: "Peoples' Friendship University",
        location: "Moscow, Russia",
        duration: "6 years",
        tuitionFee: "USD 6,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top 5 in Russia",
        established: "1960",
        students: "7,000+",
        details: {
          overview: "Known for its diverse international student community and quality medical education.",
          facilities: ["Modern campus", "International student center", "Medical training facilities"],
          admission: "NEET qualification required",
          hostel: "International student hostels",
        },
      },
      {
        id: 4,
        name: "Bashkir State Medical University",
        location: "Ufa, Russia",
        duration: "6 years",
        tuitionFee: "USD 4,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top 10 in Russia",
        established: "1932",
        students: "6,500+",
        details: {
          overview: "A well-established medical university with affordable fees and quality education.",
          facilities: ["Clinical training centers", "Research labs", "Digital resources"],
          admission: "NEET qualification required",
          hostel: "Affordable accommodation",
        },
      },
    ],
    uzbekistan: [
      {
        id: 5,
        name: "Tashkent Medical Academy",
        location: "Tashkent, Uzbekistan",
        duration: "6 years",
        tuitionFee: "USD 3,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical University in Uzbekistan",
        established: "1919",
        students: "5,000+",
        details: {
          overview:
            "The premier medical institution in Uzbekistan with over 100 years of medical education excellence.",
          facilities: ["Modern medical labs", "Clinical training centers", "International programs"],
          admission: "NEET qualification required",
          hostel: "International student accommodation",
        },
      },
      {
        id: 6,
        name: "Samarkand State Medical Institute",
        location: "Samarkand, Uzbekistan",
        duration: "6 years",
        tuitionFee: "USD 3,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top 3 in Uzbekistan",
        established: "1930",
        students: "4,200+",
        details: {
          overview: "A historic medical institute in the ancient city of Samarkand with modern facilities.",
          facilities: ["Updated laboratories", "Clinical departments", "Research centers"],
          admission: "NEET qualification required",
          hostel: "Comfortable student housing",
        },
      },
      {
        id: 7,
        name: "Andijan State Medical Institute",
        location: "Andijan, Uzbekistan",
        duration: "6 years",
        tuitionFee: "USD 3,000/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Recognized Medical Institute",
        established: "1955",
        students: "3,800+",
        details: {
          overview: "A growing medical institute with focus on practical medical training and research.",
          facilities: ["Medical simulation labs", "Clinical training", "Modern infrastructure"],
          admission: "NEET qualification required",
          hostel: "Student-friendly accommodation",
        },
      },
      {
        id: 8,
        name: "Bukhara State Medical Institute",
        location: "Bukhara, Uzbekistan",
        duration: "6 years",
        tuitionFee: "USD 2,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Emerging Medical Institute",
        established: "1990",
        students: "3,200+",
        details: {
          overview: "A newer medical institute with modern curriculum and international standards.",
          facilities: ["Contemporary labs", "Digital learning resources", "Clinical partnerships"],
          admission: "NEET qualification required",
          hostel: "Modern hostel facilities",
        },
      },
    ],
    kyrgyzstan: [
      {
        id: 9,
        name: "Kyrgyz State Medical Academy",
        location: "Bishkek, Kyrgyzstan",
        duration: "6 years",
        tuitionFee: "USD 4,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical University in Kyrgyzstan",
        established: "1939",
        students: "4,500+",
        details: {
          overview: "The leading medical academy in Kyrgyzstan with strong international programs.",
          facilities: ["Advanced medical labs", "Clinical training centers", "Research facilities"],
          admission: "NEET qualification required",
          hostel: "International student hostels",
        },
      },
      {
        id: 10,
        name: "Osh State University Medical Faculty",
        location: "Osh, Kyrgyzstan",
        duration: "6 years",
        tuitionFee: "USD 3,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top Medical Faculty",
        established: "1951",
        students: "3,500+",
        details: {
          overview: "A well-established medical faculty with comprehensive medical education programs.",
          facilities: ["Medical laboratories", "Clinical departments", "Student support services"],
          admission: "NEET qualification required",
          hostel: "Affordable student accommodation",
        },
      },
      {
        id: 11,
        name: "International School of Medicine",
        location: "Bishkek, Kyrgyzstan",
        duration: "6 years",
        tuitionFee: "USD 4,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "International Recognition",
        established: "2003",
        students: "2,800+",
        details: {
          overview: "A modern international medical school with English-medium instruction.",
          facilities: ["State-of-the-art facilities", "International faculty", "Modern curriculum"],
          admission: "NEET qualification required",
          hostel: "Premium student housing",
        },
      },
      {
        id: 12,
        name: "Jalal-Abad State University",
        location: "Jalal-Abad, Kyrgyzstan",
        duration: "6 years",
        tuitionFee: "USD 3,600/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Regional Medical Center",
        established: "1993",
        students: "2,200+",
        details: {
          overview: "A regional university with growing medical programs and modern facilities.",
          facilities: ["Medical training centers", "Clinical partnerships", "Research opportunities"],
          admission: "NEET qualification required",
          hostel: "Student-friendly facilities",
        },
      },
    ],
    china: [
      {
        id: 13,
        name: "China Medical University",
        location: "Shenyang, China",
        duration: "6 years",
        tuitionFee: "USD 4,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical University for International Students",
        established: "1931",
        students: "15,000+",
        details: {
          overview: "One of China's most prestigious medical universities with excellent international programs.",
          facilities: ["World-class hospitals", "Research institutes", "Modern laboratories"],
          admission: "NEET qualification required",
          hostel: "International student dormitories",
        },
      },
      {
        id: 14,
        name: "Jilin University Medical School",
        location: "Changchun, China",
        duration: "6 years",
        tuitionFee: "USD 4,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top 5 Medical Schools in China",
        established: "1946",
        students: "12,000+",
        details: {
          overview: "A comprehensive medical school with strong research programs and clinical training.",
          facilities: ["Teaching hospitals", "Research centers", "International programs"],
          admission: "NEET qualification required",
          hostel: "Modern accommodation facilities",
        },
      },
      {
        id: 15,
        name: "Dalian Medical University",
        location: "Dalian, China",
        duration: "6 years",
        tuitionFee: "USD 5,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Premier Medical University",
        established: "1947",
        students: "10,000+",
        details: {
          overview: "A coastal medical university known for its international programs and modern facilities.",
          facilities: ["Advanced medical equipment", "International faculty", "Clinical training"],
          admission: "NEET qualification required",
          hostel: "Comfortable student housing",
        },
      },
      {
        id: 16,
        name: "Harbin Medical University",
        location: "Harbin, China",
        duration: "6 years",
        tuitionFee: "USD 4,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top Medical University",
        established: "1926",
        students: "8,500+",
        details: {
          overview: "One of the oldest medical universities in China with strong international reputation.",
          facilities: ["Medical research centers", "Teaching hospitals", "Modern infrastructure"],
          admission: "NEET qualification required",
          hostel: "International student facilities",
        },
      },
    ],
    georgia: [
      {
        id: 17,
        name: "Tbilisi State Medical University",
        location: "Tbilisi, Georgia",
        duration: "6 years",
        tuitionFee: "USD 8,000/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical University in Georgia",
        established: "1918",
        students: "6,000+",
        details: {
          overview: "The premier medical university in Georgia with over 100 years of medical education excellence.",
          facilities: ["Modern medical facilities", "Research laboratories", "International programs"],
          admission: "NEET qualification required",
          hostel: "Premium student accommodation",
        },
      },
      {
        id: 18,
        name: "Batumi Shota Rustaveli State University",
        location: "Batumi, Georgia",
        duration: "6 years",
        tuitionFee: "USD 6,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top Medical Faculty",
        established: "1945",
        students: "4,200+",
        details: {
          overview: "A coastal university with modern medical programs and beautiful campus.",
          facilities: ["Medical laboratories", "Clinical training centers", "Modern campus"],
          admission: "NEET qualification required",
          hostel: "Seaside student housing",
        },
      },
      {
        id: 19,
        name: "University of Georgia",
        location: "Tbilisi, Georgia",
        duration: "6 years",
        tuitionFee: "USD 7,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "International Recognition",
        established: "2004",
        students: "3,800+",
        details: {
          overview: "A modern private university with international standards and English-medium instruction.",
          facilities: ["State-of-the-art facilities", "International faculty", "Modern curriculum"],
          admission: "NEET qualification required",
          hostel: "Modern student facilities",
        },
      },
      {
        id: 20,
        name: "Caucasus International University",
        location: "Tbilisi, Georgia",
        duration: "6 years",
        tuitionFee: "USD 6,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Growing Medical School",
        established: "1995",
        students: "2,500+",
        details: {
          overview: "An international university with focus on medical education and research.",
          facilities: ["Medical simulation labs", "Research centers", "International programs"],
          admission: "NEET qualification required",
          hostel: "International student housing",
        },
      },
    ],
    philippines: [
      {
        id: 21,
        name: "University of Santo Tomas",
        location: "Manila, Philippines",
        duration: "6 years",
        tuitionFee: "USD 3,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical School in Philippines",
        established: "1871",
        students: "8,000+",
        details: {
          overview: "The oldest medical school in Asia with over 150 years of medical education excellence.",
          facilities: ["Historic campus", "Modern medical facilities", "Research centers"],
          admission: "NEET qualification required",
          hostel: "Campus accommodation available",
        },
      },
      {
        id: 22,
        name: "Far Eastern University",
        location: "Manila, Philippines",
        duration: "6 years",
        tuitionFee: "USD 3,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Top Medical University",
        established: "1928",
        students: "6,500+",
        details: {
          overview: "A prestigious private university with strong medical programs and modern facilities.",
          facilities: ["Medical laboratories", "Teaching hospitals", "Research facilities"],
          admission: "NEET qualification required",
          hostel: "Student dormitories available",
        },
      },
      {
        id: 23,
        name: "Cebu Institute of Medicine",
        location: "Cebu, Philippines",
        duration: "6 years",
        tuitionFee: "USD 3,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Premier Medical Institute",
        established: "1957",
        students: "4,800+",
        details: {
          overview: "A leading medical institute in the Visayas region with excellent clinical training.",
          facilities: ["Clinical training centers", "Medical laboratories", "Modern infrastructure"],
          admission: "NEET qualification required",
          hostel: "Affordable student housing",
        },
      },
      {
        id: 24,
        name: "Lyceum Northwestern University",
        location: "Dagupan, Philippines",
        duration: "6 years",
        tuitionFee: "USD 2,900/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Recognized Medical School",
        established: "1969",
        students: "3,200+",
        details: {
          overview: "A growing medical school with modern facilities and affordable education.",
          facilities: ["Medical training facilities", "Clinical partnerships", "Student support"],
          admission: "NEET qualification required",
          hostel: "Budget-friendly accommodation",
        },
      },
    ],
    kazakhstan: [
      {
        id: 25,
        name: "Kazakh National Medical University",
        location: "Almaty, Kazakhstan",
        duration: "6 years",
        tuitionFee: "USD 4,500/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical University in Kazakhstan",
        established: "1931",
        students: "7,000+",
        details: {
          overview: "The leading medical university in Kazakhstan with strong international programs.",
          facilities: ["Modern medical facilities", "Research institutes", "International programs"],
          admission: "NEET qualification required",
          hostel: "International student accommodation",
        },
      },
      {
        id: 26,
        name: "West Kazakhstan Medical University",
        location: "Aktobe, Kazakhstan",
        duration: "6 years",
        tuitionFee: "USD 3,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Regional Medical Center",
        established: "1957",
        students: "4,500+",
        details: {
          overview: "A regional medical university with comprehensive medical education programs.",
          facilities: ["Medical laboratories", "Clinical training", "Modern infrastructure"],
          admission: "NEET qualification required",
          hostel: "Student accommodation available",
        },
      },
      {
        id: 27,
        name: "South Kazakhstan Medical Academy",
        location: "Shymkent, Kazakhstan",
        duration: "6 years",
        tuitionFee: "USD 4,000/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Growing Medical Academy",
        established: "1979",
        students: "3,800+",
        details: {
          overview: "A medical academy with focus on practical training and international standards.",
          facilities: ["Clinical training centers", "Medical laboratories", "Research facilities"],
          admission: "NEET qualification required",
          hostel: "Comfortable student housing",
        },
      },
      {
        id: 28,
        name: "Astana Medical University",
        location: "Nur-Sultan, Kazakhstan",
        duration: "6 years",
        tuitionFee: "USD 5,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Capital Medical University",
        established: "1997",
        students: "5,500+",
        details: {
          overview: "The capital's premier medical university with modern facilities and international programs.",
          facilities: ["State-of-the-art facilities", "Research centers", "International faculty"],
          admission: "NEET qualification required",
          hostel: "Premium student facilities",
        },
      },
    ],
    armenia: [
      {
        id: 29,
        name: "Yerevan State Medical University",
        location: "Yerevan, Armenia",
        duration: "6 years",
        tuitionFee: "USD 4,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "#1 Medical University in Armenia",
        established: "1920",
        students: "5,000+",
        details: {
          overview: "The premier medical university in Armenia with over 100 years of excellence.",
          facilities: ["Modern medical facilities", "Research laboratories", "International programs"],
          admission: "NEET qualification required",
          hostel: "International student housing",
        },
      },
      {
        id: 30,
        name: "University of Traditional Medicine",
        location: "Yerevan, Armenia",
        duration: "6 years",
        tuitionFee: "USD 4,200/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Specialized Medical University",
        established: "1991",
        students: "2,800+",
        details: {
          overview: "A specialized medical university combining traditional and modern medical education.",
          facilities: ["Specialized laboratories", "Clinical training", "Research centers"],
          admission: "NEET qualification required",
          hostel: "Student accommodation available",
        },
      },
      {
        id: 31,
        name: "Saint Tereza Medical University",
        location: "Yerevan, Armenia",
        duration: "6 years",
        tuitionFee: "USD 3,800/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Private Medical University",
        established: "2003",
        students: "2,200+",
        details: {
          overview: "A private medical university with modern curriculum and international standards.",
          facilities: ["Modern laboratories", "Clinical partnerships", "International programs"],
          admission: "NEET qualification required",
          hostel: "Private student housing",
        },
      },
      {
        id: 32,
        name: "Haybusak University",
        location: "Yerevan, Armenia",
        duration: "6 years",
        tuitionFee: "USD 4,000/year",
        recognition: ["MCI Approved", "WHO Listed"],
        ranking: "Growing Medical School",
        established: "1990",
        students: "1,800+",
        details: {
          overview: "A growing medical school with focus on international students and modern education.",
          facilities: ["Medical simulation labs", "Modern infrastructure", "Student support"],
          admission: "NEET qualification required",
          hostel: "Affordable student housing",
        },
      },
    ],
  }

  const countries = [
    { id: "russia", name: "Russia", flag: "🇷🇺" },
    { id: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿" },
    { id: "kyrgyzstan", name: "Kyrgyzstan", flag: "🇰🇬" },
    { id: "china", name: "China", flag: "🇨🇳" },
    { id: "georgia", name: "Georgia", flag: "🇬🇪" },
    { id: "philippines", name: "Philippines", flag: "🇵🇭" },
    { id: "kazakhstan", name: "Kazakhstan", flag: "🇰🇿" },
    { id: "armenia", name: "Armenia", flag: "🇦🇲" },
  ]

  const handleApplyNow = (university: any) => {
    const leadForm = document.getElementById("lead-form")
    if (leadForm) {
      leadForm.scrollIntoView({ behavior: "smooth" })
      toast({
        title: "Application Started",
        description: `Please fill the form to apply for ${university.name}`,
        duration: 3000,
      })
    } else {
      setShowApplicationModal(true)
    }
  }

  const handleViewDetails = (university: any) => {
    setSelectedUniversity(university)
  }

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Application Submitted!",
      description: "Our counselor will contact you within 24 hours.",
      duration: 5000,
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sticky Lead Form */}
      <div className="fixed top-20 right-4 z-50 hidden lg:block">
        <Card id="lead-form" className="w-80 shadow-2xl border-2 border-blue-200 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Apply for MBBS</h3>
              <p className="text-sm text-gray-600">Get Free Counseling</p>
            </div>

            <form onSubmit={handleLeadFormSubmit} className="space-y-3">
              <Input placeholder="Full Name" required className="py-2" />
              <Input type="tel" placeholder="Mobile Number" required className="py-2" />
              <Input type="email" placeholder="Email Address" required className="py-2" />

              <Select>
                <SelectTrigger className="py-2">
                  <SelectValue placeholder="Country of Interest" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="py-2">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Under USD 4,000/year</SelectItem>
                  <SelectItem value="medium">USD 4,000-6,000/year</SelectItem>
                  <SelectItem value="high">Above USD 6,000/year</SelectItem>
                </SelectContent>
              </Select>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2">
                      Get Free Counseling
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Action not connected yet. Backend integration coming soon.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>

            <div className="mt-4 pt-4 border-t text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-1">
                <Phone className="w-3 h-3" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Mail className="w-3 h-3" />
                <span>mbbs@meritcap.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="sm"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-yellow-400 text-blue-800 text-lg px-6 py-2">Study MBBS Abroad</Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Study MBBS Abroad
            <span className="block text-yellow-300">Your Medical Career Starts Here</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Get admission in top medical universities worldwide with affordable fees and MCI approval
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg">MCI Approved Universities</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-300" />
              <span className="text-lg">8+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-300" />
              <span className="text-lg">WHO Listed</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Apply Now - Free Counseling
          </Button>
        </div>
      </section>

      {/* NEET/Abroad Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-700">NEET Qualified?</h3>
                <p className="text-gray-700 mb-6">
                  Great! You're eligible for MBBS abroad. Get direct admission in top medical universities.
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">Explore Options</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Action not connected yet. Backend integration coming soon.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-700">No NEET? No Problem!</h3>
                <p className="text-gray-700 mb-6">
                  Still pursue MBBS abroad! Many universities accept students without NEET qualification.
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                        Check Eligibility
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Action not connected yet. Backend integration coming soon.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost & Eligibility Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Cost & Eligibility</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Affordable Fees</h3>
                <p className="text-gray-600 mb-4">Starting from USD 2,800/year</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• No donation required</li>
                  <li>• Easy EMI options</li>
                  <li>• Scholarship available</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Simple Eligibility</h3>
                <p className="text-gray-600 mb-4">Minimum 50% in PCB</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• NEET qualified (preferred)</li>
                  <li>• Age: 17-25 years</li>
                  <li>• English proficiency</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Quick Process</h3>
                <p className="text-gray-600 mb-4">Admission in 15-30 days</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Document verification</li>
                  <li>• University application</li>
                  <li>• Visa assistance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top MBBS Destinations & Universities */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Top MBBS Destinations & Universities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the best medical universities across 8 countries with MCI approval and WHO recognition
            </p>
          </div>

          <Tabs value={selectedCountry} onValueChange={setSelectedCountry} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8 bg-white/80 backdrop-blur-sm">
              {countries.map((country) => (
                <TabsTrigger
                  key={country.id}
                  value={country.id}
                  className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-xs font-medium">{country.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {countries.map((country) => (
              <TabsContent key={country.id} value={country.id} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                  {universitiesData[country.id as keyof typeof universitiesData]?.map((university) => (
                    <Card
                      key={university.id}
                      className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{university.name}</h3>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{university.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-700">{university.ranking}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600">{university.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-semibold text-green-600">{university.tuitionFee}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {university.recognition.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
                          <div>Est. {university.established}</div>
                          <div>{university.students} Students</div>
                        </div>

                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewDetails(university)}
                                  className="flex-1 border-blue-200 hover:bg-blue-50"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Action not connected yet. Backend integration coming soon.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => handleApplyNow(university)}
                                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                  <Send className="w-4 h-4 mr-1" />
                                  Apply Now
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Action not connected yet. Backend integration coming soon.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* University Details Modal */}
      <Dialog open={!!selectedUniversity} onOpenChange={() => setSelectedUniversity(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedUniversity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-600">{selectedUniversity.name}</DialogTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedUniversity.location}</span>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Tuition Fee</div>
                    <div className="text-xl font-bold text-blue-600">{selectedUniversity.tuitionFee}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-xl font-bold text-green-600">{selectedUniversity.duration}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recognition & Approvals</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUniversity.recognition.map((tag: string, index: number) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Overview</h4>
                  <p className="text-gray-600">{selectedUniversity.details.overview}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Facilities</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedUniversity.details.facilities.map((facility: string, index: number) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Admission Requirements</h4>
                    <p className="text-gray-600 text-sm">{selectedUniversity.details.admission}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Accommodation</h4>
                    <p className="text-gray-600 text-sm">{selectedUniversity.details.hostel}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleApplyNow(selectedUniversity)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          Apply Now
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Action not connected yet. Backend integration coming soon.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button variant="outline" onClick={() => setSelectedUniversity(null)} className="flex-1">
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-600">Quick Application</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleLeadFormSubmit} className="space-y-4">
            <Input placeholder="Full Name" required />
            <Input type="tel" placeholder="Mobile Number" required />
            <Input type="email" placeholder="Email Address" required />

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Country of Interest" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Submit Application
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Action not connected yet. Backend integration coming soon.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button type="button" variant="outline" onClick={() => setShowApplicationModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="cursor-help">ℹ️ Action not connected yet. Backend integration coming soon.</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a demo form. Full functionality will be available after backend integration.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogContent>
      </Dialog>

      {/* Why Choose MBBS Abroad Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose MBBS Abroad?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">Direct Admission</h3>
                <p className="text-gray-600 text-sm">No entrance exams or donations required for most universities</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">Affordable Fees</h3>
                <p className="text-gray-600 text-sm">Much lower fees compared to private medical colleges in India</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">MCI Recognition</h3>
                <p className="text-gray-600 text-sm">All universities are MCI approved and WHO listed</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">Global Exposure</h3>
                <p className="text-gray-600 text-sm">International experience and diverse cultural exposure</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Dr. Priya Sharma</h3>
                <p className="text-sm text-gray-600 mb-3">MBBS from Russia • Now practicing in Mumbai</p>
                <p className="text-sm text-gray-700 italic">
                  "MeritCap made my dream of becoming a doctor come true. The guidance was exceptional throughout my
                  journey."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Dr. Rahul Patel</h3>
                <p className="text-sm text-gray-600 mb-3">MBBS from China • Cleared FMGE in first attempt</p>
                <p className="text-sm text-gray-700 italic">
                  "The university selection and visa process was smooth. I'm grateful for the continuous support."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Dr. Anita Singh</h3>
                <p className="text-sm text-gray-600 mb-3">MBBS from Georgia • Now in PG preparation</p>
                <p className="text-sm text-gray-700 italic">
                  "Quality education at affordable cost. The international exposure helped me grow personally and
                  professionally."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Medical Journey?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get free counseling and secure your admission in top medical universities
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg">100% Free Counseling</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-300" />
              <span className="text-lg">MCI Approved Universities</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-300" />
              <span className="text-lg">10,000+ Students Placed</span>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Free Counseling Now
          </Button>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Circle,
  Plane,
  Hotel,
  Phone,
  FileText,
  CreditCard,
  Heart,
  Book,
  MapPin,
  Calendar,
  Download,
  Mail,
} from "lucide-react"

export default function PreDeparturePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})

  // Pre-departure checklist
  const checklistCategories = [
    {
      category: "Travel Documents",
      icon: FileText,
      color: "blue",
      items: [
        { id: "doc1", task: "Valid passport (check expiry date)", checked: true, priority: "High" },
        { id: "doc2", task: "Visa stamp in passport", checked: true, priority: "High" },
        { id: "doc3", task: "I-20 form (original)", checked: true, priority: "High" },
        { id: "doc4", task: "Admission letter from university", checked: true, priority: "High" },
        { id: "doc5", task: "SEVIS fee payment receipt", checked: true, priority: "High" },
        { id: "doc6", task: "Flight tickets (print and digital)", checked: false, priority: "High" },
        { id: "doc7", task: "Travel insurance documents", checked: false, priority: "Medium" },
      ],
    },
    {
      category: "Academic Documents",
      icon: Book,
      color: "purple",
      items: [
        { id: "acad1", task: "Original transcripts and marksheets", checked: true, priority: "High" },
        { id: "acad2", task: "Degree certificates", checked: true, priority: "High" },
        { id: "acad3", task: "Test score reports (IELTS/GRE)", checked: true, priority: "Medium" },
        { id: "acad4", task: "Letters of recommendation", checked: true, priority: "Medium" },
      ],
    },
    {
      category: "Financial Preparation",
      icon: CreditCard,
      color: "green",
      items: [
        { id: "fin1", task: "International debit/credit card", checked: false, priority: "High" },
        { id: "fin2", task: "Forex card loaded with USD", checked: false, priority: "High" },
        { id: "fin3", task: "Cash (USD 500-1000)", checked: false, priority: "Medium" },
        { id: "fin4", task: "Bank statements (last 6 months)", checked: true, priority: "Medium" },
        { id: "fin5", task: "Scholarship/financial aid documents", checked: true, priority: "Low" },
      ],
    },
    {
      category: "Health & Insurance",
      icon: Heart,
      color: "red",
      items: [
        { id: "health1", task: "Medical check-up completed", checked: true, priority: "High" },
        { id: "health2", task: "Vaccination records", checked: true, priority: "High" },
        { id: "health3", task: "Health insurance policy", checked: false, priority: "High" },
        { id: "health4", task: "Prescription medicines (3 months)", checked: false, priority: "Medium" },
        { id: "health5", task: "Medical records and reports", checked: true, priority: "Low" },
      ],
    },
    {
      category: "Accommodation & Travel",
      icon: Hotel,
      color: "orange",
      items: [
        { id: "acc1", task: "University accommodation confirmed", checked: true, priority: "High" },
        { id: "acc2", task: "Airport pickup arranged", checked: true, priority: "High" },
        { id: "acc3", task: "Temporary accommodation (if needed)", checked: true, priority: "Medium" },
        { id: "acc4", task: "Local transport information", checked: false, priority: "Low" },
      ],
    },
  ]

  // Travel details
  const travelDetails = {
    departure: {
      date: "August 15, 2024",
      time: "11:30 PM",
      airport: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      terminal: "Terminal 2",
      checkInTime: "8:30 PM",
    },
    arrival: {
      date: "August 16, 2024",
      time: "10:45 AM (Local Time)",
      airport: "Boston Logan International Airport (BOS)",
      terminal: "Terminal E",
    },
    flight: {
      airline: "Air India",
      flightNumber: "AI 191",
      duration: "16h 15m",
      stops: "1 Stop (London)",
    },
  }

  // Accommodation details
  const accommodationDetails = {
    type: "University Dormitory",
    name: "Harvard Yard Dormitory",
    address: "Cambridge, MA 02138, USA",
    checkIn: "August 16, 2024",
    checkInTime: "2:00 PM onwards",
    roomType: "Single Room",
    facilities: ["WiFi", "Laundry", "Common Kitchen", "Study Room", "24/7 Security"],
    contact: {
      name: "Housing Office",
      phone: "+1-617-495-5000",
      email: "housing@harvard.edu",
    },
  }

  // Important contacts
  const importantContacts = [
    {
      category: "University",
      contacts: [
        { name: "International Student Office", phone: "+1-617-495-1000", email: "iso@harvard.edu" },
        { name: "Academic Advisor", phone: "+1-617-495-2000", email: "advisor@harvard.edu" },
        { name: "Housing Office", phone: "+1-617-495-5000", email: "housing@harvard.edu" },
      ],
    },
    {
      category: "Emergency",
      contacts: [
        { name: "Campus Police", phone: "911 (Emergency)", email: "police@harvard.edu" },
        { name: "Health Services", phone: "+1-617-495-5711", email: "health@harvard.edu" },
        { name: "Indian Embassy (USA)", phone: "+1-202-939-7000", email: "cons.washington@mea.gov.in" },
      ],
    },
    {
      category: "MeritCap Support",
      contacts: [
        { name: "Amit Kumar (Counselor)", phone: "+91 98765 43210", email: "amit@meritcap.com" },
        { name: "24/7 Support Helpline", phone: "+91 22 1234 5678", email: "support@meritcap.com" },
      ],
    },
  ]

  // Country-specific guidelines
  const countryGuidelines = {
    weather: "Boston weather in August: 20-28°C. Pack light summer clothes and a light jacket.",
    culture: "Americans are generally friendly and informal. Tipping is customary (15-20% in restaurants).",
    customs:
      "Declare all items at customs. Prohibited items include fresh fruits, meat products, and certain medications.",
    transportation: "Public transport: MBTA (T) subway and buses. Student discount available with ID.",
    communication: "Get a local SIM card (T-Mobile, AT&T, Verizon) or use international roaming.",
    banking: "Open a US bank account within first week. Bring passport, I-20, and proof of address.",
  }

  // Packing list
  const packingList = {
    documents: [
      "Passport with visa",
      "I-20 form",
      "Admission letter",
      "Academic documents",
      "Financial documents",
      "Health records",
      "Passport size photos (10-15)",
    ],
    clothing: [
      "Formal wear (2-3 sets)",
      "Casual wear (7-10 sets)",
      "Winter jacket",
      "Comfortable shoes (2-3 pairs)",
      "Traditional Indian wear (1-2 sets)",
    ],
    essentials: [
      "Laptop and charger",
      "Phone and charger",
      "Power adapter (US type)",
      "Toiletries (travel size)",
      "Medicines (3 months)",
      "Spectacles/Contact lenses",
    ],
  }

  const totalTasks = checklistCategories.reduce((acc, cat) => acc + cat.items.length, 0)
  const completedTasks = checklistCategories.reduce(
    (acc, cat) => acc + cat.items.filter((item) => item.checked).length,
    0,
  )
  const progressPercentage = (completedTasks / totalTasks) * 100

  const getIconColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "text-blue-600 bg-blue-100",
      purple: "text-purple-600 bg-purple-100",
      green: "text-green-600 bg-green-100",
      red: "text-red-600 bg-red-100",
      orange: "text-orange-600 bg-orange-100",
    }
    return colors[color] || "text-gray-600 bg-gray-100"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pre-Departure Briefing</h1>
            <p className="text-sm text-gray-600 mt-1">Student ID: {params.id} • Priya Sharma</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download Guide
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Mail className="w-4 h-4" />
            Email Checklist
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pre-Departure Preparation</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-2">{Math.round(progressPercentage)}%</Badge>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Departure Date: August 15, 2024</span>
              <span className="font-semibold text-orange-600">30 days remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Departure Checklist */}
      <div className="space-y-4">
        {checklistCategories.map((category) => {
          const Icon = category.icon
          const categoryCompleted = category.items.filter((item) => item.checked).length
          const categoryTotal = category.items.length
          const categoryProgress = (categoryCompleted / categoryTotal) * 100

          return (
            <Card key={category.category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(category.color)}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                      <p className="text-xs text-gray-600 mt-1">
                        {categoryCompleted}/{categoryTotal} completed
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-700">{Math.round(categoryProgress)}%</Badge>
                </div>
                <Progress value={categoryProgress} className="h-1 mt-3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={(checked) => {
                            setCheckedItems({ ...checkedItems, [item.id]: checked as boolean })
                          }}
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${item.checked ? "line-through text-gray-500" : "text-gray-900"}`}>
                            {item.task}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.priority === "High"
                            ? "text-red-600 border-red-300"
                            : item.priority === "Medium"
                              ? "text-yellow-600 border-yellow-300"
                              : "text-gray-600 border-gray-300"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Travel Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-600" />
            Travel Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-900">Departure</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {travelDetails.departure.date} at {travelDetails.departure.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Airport</p>
                  <p className="font-medium">{travelDetails.departure.airport}</p>
                  <p className="text-xs text-gray-600">{travelDetails.departure.terminal}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Check-in Time</p>
                  <p className="font-medium">{travelDetails.departure.checkInTime}</p>
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-900">Arrival</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {travelDetails.arrival.date} at {travelDetails.arrival.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Airport</p>
                  <p className="font-medium">{travelDetails.arrival.airport}</p>
                  <p className="text-xs text-gray-600">{travelDetails.arrival.terminal}</p>
                </div>
              </div>
            </div>

            {/* Flight Info */}
            <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Airline</p>
                  <p className="font-medium">{travelDetails.flight.airline}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Flight Number</p>
                  <p className="font-medium">{travelDetails.flight.flightNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="font-medium">{travelDetails.flight.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Stops</p>
                  <p className="font-medium">{travelDetails.flight.stops}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accommodation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Hotel className="w-5 h-5 text-orange-600" />
            Accommodation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium">{accommodationDetails.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm font-medium">{accommodationDetails.name}</p>
                <p className="text-xs text-gray-600 mt-1">{accommodationDetails.address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Check-in</p>
                <p className="text-sm font-medium">
                  {accommodationDetails.checkIn} ({accommodationDetails.checkInTime})
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Room Type</p>
                <p className="text-sm font-medium">{accommodationDetails.roomType}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2">Facilities</p>
                <div className="flex flex-wrap gap-2">
                  {accommodationDetails.facilities.map((facility, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500 mb-2">Contact Information</p>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{accommodationDetails.contact.name}</p>
                  <p className="text-gray-600">{accommodationDetails.contact.phone}</p>
                  <p className="text-gray-600">{accommodationDetails.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            Important Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importantContacts.map((category) => (
              <div key={category.category} className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900 pb-2 border-b">{category.category}</h4>
                <div className="space-y-3">
                  {category.contacts.map((contact, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{contact.phone}</p>
                      <p className="text-xs text-gray-600">{contact.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Country Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            USA - Country Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(countryGuidelines).map(([key, value]) => (
              <div key={key} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-sm text-gray-900 mb-2 capitalize">{key}</p>
                <p className="text-sm text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Packing List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Packing List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(packingList).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-900 capitalize pb-2 border-b">{category}</h4>
                <ul className="space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <Circle className="w-3 h-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => router.push(`/admin/students/${params.id}/visa`)}
            >
              <Plane className="w-4 h-4" />
              View Visa Status
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <Phone className="w-4 h-4" />
              Call Student
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Briefing Call
            </Button>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Download Complete Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Search, ExternalLink, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: "global-university-fair-2024",
      title: "Global University Fair 2024",
      description:
        "Meet representatives from 50+ top universities worldwide. Get direct admission guidance and scholarship information.",
      date: "2024-12-15",
      time: "10:00 AM - 6:00 PM",
      location: "Hyderabad International Convention Centre",
      category: "University Fair",
      featured: true,
      image: "/university-fair-students.png",
      expectedAttendees: 2000,
      status: "upcoming",
    },
    {
      id: "ielts-preparation-workshop",
      title: "IELTS Preparation Workshop",
      description:
        "Comprehensive IELTS preparation workshop with expert trainers. Learn strategies for all four modules.",
      date: "2024-12-20",
      time: "2:00 PM - 5:00 PM",
      location: "MeritCap Training Center, Bangalore",
      category: "Workshop",
      featured: false,
      image: "/ielts-classroom-study.png",
      expectedAttendees: 100,
      status: "upcoming",
    },
    {
      id: "scholarship-guidance-seminar",
      title: "Scholarship Guidance Seminar",
      description:
        "Learn about various scholarship opportunities for international education. Expert guidance on application process.",
      date: "2024-12-25",
      time: "11:00 AM - 1:00 PM",
      location: "Online Webinar",
      category: "Seminar",
      featured: false,
      image: "/scholarship-seminar.png",
      expectedAttendees: 500,
      status: "upcoming",
    },
    {
      id: "study-in-canada-session",
      title: "Study in Canada Information Session",
      description: "Detailed information about studying in Canada, visa process, and job opportunities.",
      date: "2025-01-05",
      time: "3:00 PM - 5:00 PM",
      location: "MeritCap Office, Mumbai",
      category: "Information Session",
      featured: false,
      image: "/canada-flag-campus-students.png",
      expectedAttendees: 150,
      status: "upcoming",
    },
    {
      id: "gre-preparation-bootcamp",
      title: "GRE Preparation Bootcamp",
      description: "Intensive 3-day GRE preparation bootcamp with practice tests and personalized feedback.",
      date: "2025-01-10",
      time: "9:00 AM - 5:00 PM",
      location: "MeritCap Training Center, Delhi",
      category: "Bootcamp",
      featured: true,
      image: "/gre-prep-students.png",
      expectedAttendees: 80,
      status: "upcoming",
    },
    {
      id: "mba-admission-strategy-workshop",
      title: "MBA Admission Strategy Workshop",
      description: "Learn strategies for MBA admissions to top business schools worldwide.",
      date: "2025-01-15",
      time: "1:00 PM - 4:00 PM",
      location: "Online Webinar",
      category: "Workshop",
      featured: false,
      image: "/mba-presentation.png",
      expectedAttendees: 300,
      status: "upcoming",
    },
  ]

  const categories = [
    { id: "all", label: "All Events" },
    { id: "University Fair", label: "University Fairs" },
    { id: "Workshop", label: "Workshops" },
    { id: "Seminar", label: "Seminars" },
    { id: "Bootcamp", label: "Bootcamps" },
    { id: "Information Session", label: "Info Sessions" },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Educational Events</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join our workshops, seminars, and university fairs to accelerate your academic journey
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-white/80 text-sm">Events This Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-white/80 text-sm">Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">200+</div>
              <div className="text-white/80 text-sm">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {event.featured && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                      <Star className="w-4 h-4 inline mr-1" />
                      Featured Event
                    </div>
                  )}
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-600 text-white">{event.category}</Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          <span>Expected: {event.expectedAttendees} attendees</span>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Details & Register
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No events found matching your criteria.</div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

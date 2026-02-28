"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId as string

  const eventData: { [key: string]: any } = {
    "global-university-fair-2024": {
      title: "Global University Fair 2024",
      description:
        "Meet representatives from 50+ top universities worldwide. Get direct admission guidance, scholarship information, and visa consultation all under one roof.",
      date: "2024-12-15",
      time: "10:00 AM - 6:00 PM",
      location: "Hyderabad International Convention Centre",
      category: "University Fair",
      featured: true,
      image: "/university-fair-students.png",
      expectedAttendees: 2000,
      universities: 52,
      highlights: [
        "Direct admission guidance from university representatives",
        "Scholarship opportunities worth ₹50+ Lakhs",
        "Free visa consultation sessions",
        "IELTS mock test and preparation guidance",
        "Study abroad loan assistance",
        "Career counseling sessions",
      ],
      agenda: [
        { time: "10:00 AM", activity: "Registration & Welcome" },
        { time: "10:30 AM", activity: "University Fair Opens" },
        { time: "12:00 PM", activity: "Scholarship Presentation" },
        { time: "2:00 PM", activity: "Visa Consultation Sessions" },
        { time: "4:00 PM", activity: "IELTS Preparation Workshop" },
        { time: "5:30 PM", activity: "Closing & Networking" },
      ],
    },
    "ielts-preparation-workshop": {
      title: "IELTS Preparation Workshop",
      description:
        "Comprehensive IELTS preparation workshop with expert trainers. Learn proven strategies for all four modules and boost your band score.",
      date: "2024-12-20",
      time: "2:00 PM - 5:00 PM",
      location: "MeritCap Training Center, Bangalore",
      category: "Workshop",
      image: "/ielts-classroom-study.png",
      expectedAttendees: 100,
      highlights: [
        "Expert trainers with 10+ years experience",
        "Comprehensive study materials included",
        "Practice tests and mock exams",
        "Individual feedback and improvement tips",
        "Speaking practice sessions",
        "Writing task strategies",
      ],
      agenda: [
        { time: "2:00 PM", activity: "Registration & Introduction" },
        { time: "2:30 PM", activity: "Listening Module Strategies" },
        { time: "3:15 PM", activity: "Reading Module Techniques" },
        { time: "4:00 PM", activity: "Writing Task Preparation" },
        { time: "4:30 PM", activity: "Speaking Practice Session" },
        { time: "5:00 PM", activity: "Q&A and Resources" },
      ],
    },
  }

  const event = eventData[eventId]

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Link href="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">{event.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-white/90 mb-6">{event.description}</p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  <span>Expected: {event.expectedAttendees} attendees</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-80">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Event Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {event.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {event.agenda && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Event Agenda</h2>
                    <div className="space-y-4">
                      {event.agenda.map((item: any, index: number) => (
                        <div key={index} className="flex items-center border-l-4 border-blue-500 pl-4">
                          <div className="font-semibold text-blue-600 w-20">{item.time}</div>
                          <div>{item.activity}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Register Now</h3>
                  <div className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      Register for Free
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <div className="text-center text-sm text-gray-500">Limited seats available</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

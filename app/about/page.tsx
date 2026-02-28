import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Target,
  Award,
  Globe,
  Lightbulb,
  Shield,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  GraduationCap,
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Star,
  MapPin,
  Clock,
} from "lucide-react"

export default function AboutPage() {
  const stats = [
    { number: "100,000+", label: "Students Guided" },
    { number: "500+", label: "Universities Partnered" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Countries Covered" },
  ]

  const educationToEmploymentProcess = [
    {
      step: "01",
      title: "Profile Assessment & Development",
      description:
        "We start by understanding your unique strengths, interests, and career aspirations through comprehensive assessments.",
      whatMakesUsDifferent: "AI-powered personality and aptitude analysis combined with one-on-one counseling sessions",
      icon: Users,
      color: "from-blue-500 to-purple-600",
    },
    {
      step: "02",
      title: "Strategic Course Selection",
      description:
        "Based on your profile, we recommend the perfect courses and universities that align with your career goals.",
      whatMakesUsDifferent: "Real-time industry demand analysis and personalized university matching algorithm",
      icon: BookOpen,
      color: "from-purple-500 to-pink-600",
    },
    {
      step: "03",
      title: "Application & Admission Support",
      description: "Complete guidance through application processes, documentation, and interview preparation.",
      whatMakesUsDifferent: "99% application success rate with dedicated admission specialists for each student",
      icon: GraduationCap,
      color: "from-pink-500 to-red-600",
    },
    {
      step: "04",
      title: "Financial Planning & Support",
      description: "Comprehensive assistance with education loans, scholarships, and financial planning.",
      whatMakesUsDifferent: "Partnerships with 50+ banks and exclusive scholarship opportunities worth ₹100+ crores",
      icon: TrendingUp,
      color: "from-red-500 to-orange-600",
    },
    {
      step: "05",
      title: "Pre-Departure & Settlement",
      description: "Complete support for visa processing, accommodation, and cultural orientation.",
      whatMakesUsDifferent: "24/7 support network in 50+ countries with local student ambassadors",
      icon: MapPin,
      color: "from-orange-500 to-yellow-600",
    },
    {
      step: "06",
      title: "Career Development & Placement",
      description: "Ongoing career guidance, internship support, and job placement assistance throughout your journey.",
      whatMakesUsDifferent: "Direct partnerships with 1000+ companies and lifetime career support guarantee",
      icon: Briefcase,
      color: "from-yellow-500 to-green-600",
    },
  ]

  const differentiators = [
    {
      title: "Personalized AI-Driven Approach",
      description:
        "Our proprietary AI system analyzes 200+ data points to create personalized education and career pathways.",
      icon: Lightbulb,
    },
    {
      title: "End-to-End Lifecycle Support",
      description: "From initial counseling to job placement - we're with you every step of your 4-8 year journey.",
      icon: Clock,
    },
    {
      title: "Global Network & Local Presence",
      description: "Physical presence in 15+ countries with local teams who understand regional opportunities.",
      icon: Globe,
    },
    {
      title: "Industry-First Guarantees",
      description: "Money-back guarantee on admissions and lifetime career support - we're invested in your success.",
      icon: Shield,
    },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: "Student-Centric Innovation",
      description: "Every decision we make is centered around what's best for our students' success and growth.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We build lasting relationships through honest communication and transparent processes.",
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description: "Our worldwide network ensures students get the best opportunities across the globe.",
    },
    {
      icon: Target,
      title: "Results-Driven Approach",
      description: "We measure our success by your achievements and career milestones.",
    },
  ]

  const team = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "15+ years in international education consulting",
      expertise: "Strategic Vision & Global Partnerships",
    },
    {
      name: "Priya Mehta",
      role: "Head of Counseling",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Expert in profile development and university admissions",
      expertise: "Student Psychology & Career Mapping",
    },
    {
      name: "Amit Sharma",
      role: "Financial Aid Specialist",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Specialist in education loans and financial planning",
      expertise: "Financial Planning & Scholarship Strategy",
    },
    {
      name: "Sarah Johnson",
      role: "International Relations",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Building bridges with global universities",
      expertise: "University Relations & Global Expansion",
    },
  ]

  const socialLinks = [
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@meritcap", color: "text-red-600" },
    { icon: Facebook, label: "Facebook", href: "https://facebook.com/meritcap", color: "text-blue-600" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/meritcap", color: "text-blue-400" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/meritcap", color: "text-pink-600" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/meritcap", color: "text-blue-700" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">Empowering Dreams Through Education</p>
          <p className="text-lg max-w-3xl mx-auto">
            We are dedicated to making quality education accessible to every student, providing comprehensive guidance
            and support throughout their educational journey.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education to Employment Process */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Education to Employment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive 6-step process that transforms students from education to successful employment. Here's
              how we're different at every step.
            </p>
          </div>

          <div className="space-y-12">
            {educationToEmploymentProcess.map((process, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < educationToEmploymentProcess.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-purple-300 to-blue-300 hidden md:block"></div>
                )}

                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${process.color} flex items-center justify-center mb-4`}
                        >
                          <process.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-300">{process.step}</div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">{process.title}</h3>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">{process.description}</p>

                        {/* What Makes Us Different */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
                          <div className="flex items-start gap-3">
                            <Star className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-purple-800 mb-2">What Makes Us Different:</h4>
                              <p className="text-purple-700">{process.whatMakesUsDifferent}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow for larger screens */}
                      {index < educationToEmploymentProcess.length - 1 && (
                        <div className="hidden lg:block">
                          <ArrowRight className="w-8 h-8 text-purple-400" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To democratize access to quality education by providing personalized guidance, comprehensive support,
                  and innovative solutions that help students achieve their academic and career aspirations, regardless
                  of their background or circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the world's most trusted educational platform, where every student can discover their potential,
                  access the best educational opportunities, and build a successful future through personalized guidance
                  and unwavering support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose MeritCap?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another education consultancy. Here's what sets us apart in the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                    <diff.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{diff.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.image || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                  <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">{member.expertise}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${social.color} hover:scale-110`}
              >
                <social.icon className="w-8 h-8" />
              </a>
            ))}
          </div>

          <Card className="border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-xl mb-8 text-purple-100">
                Join thousands of students who have achieved their dreams with our guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold">
                  Get Started Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                >
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

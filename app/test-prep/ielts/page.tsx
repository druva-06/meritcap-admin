import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Globe,
  TrendingUp,
  Star,
  Play,
  Download,
  MessageCircle,
  GraduationCap,
  Briefcase,
  MapPin,
  ChevronRight,
  Headphones,
  PenTool,
  Mic,
} from "lucide-react"

export default function IELTSPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Lead Form */}
      <section className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <Badge className="mb-4 md:mb-6 bg-blue-500 text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 border border-blue-400">
                Most Trusted IELTS Preparation Platform
              </Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Master IELTS & Unlock <span className="text-blue-200">Global Opportunities</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100">
                Join 100,000+ students who achieved their dream band scores and transformed their lives
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 text-xs md:text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-white/20">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-white/20">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
                  <span>100,000+ Students</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-white/20">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
                  <span>92% Success Rate</span>
                </div>
              </div>

              <div className="hidden lg:flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg bg-transparent"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Side - Lead Form */}
            <div>
              <Card className="bg-white text-gray-900 border-0 shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Get Your Free Demo Class</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      Start your IELTS journey today. No payment required!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Full Name *"
                        className="py-5 md:py-6 text-base border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Email Address *"
                        type="email"
                        className="py-5 md:py-6 text-base border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Phone Number *"
                        type="tel"
                        className="py-5 md:py-6 text-base border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Target Band Score (e.g., 7.5)"
                        className="py-5 md:py-6 text-base border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <select className="w-full border-2 border-gray-300 rounded-md px-4 py-3 md:py-4 text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white">
                        <option>Purpose of IELTS</option>
                        <option>Study Abroad</option>
                        <option>Immigration (PR)</option>
                        <option>Work Abroad</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 md:py-6 text-base md:text-lg font-semibold">
                      Request Free Demo Class
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>

                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center text-xs md:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Instant confirmation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Expert guidance</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-2 text-sm">Global Recognition</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why IELTS is Your Gateway to Success
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              IELTS opens doors to world-class education, global career opportunities, and international immigration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Study Abroad */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Study Abroad</h3>
                <p className="text-base text-gray-600 mb-4">
                  Accepted by 11,000+ universities worldwide including USA, UK, Canada, Australia, and Europe
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Top universities require 6.5-7.5 bands</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Scholarship eligibility with high scores</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-3xl font-bold text-blue-600">11,000+</div>
                  <div className="text-sm text-gray-600">Universities Worldwide</div>
                </div>
              </CardContent>
            </Card>

            {/* Career Growth */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Career Growth</h3>
                <p className="text-base text-gray-600 mb-4">
                  Boost your career with international job opportunities and higher salary packages
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Global companies prefer IELTS certified candidates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Access to international job markets</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-3xl font-bold text-blue-600">30-50%</div>
                  <div className="text-sm text-gray-600">Higher Salary Potential</div>
                </div>
              </CardContent>
            </Card>

            {/* Immigration */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Immigration</h3>
                <p className="text-base text-gray-600 mb-4">
                  Essential requirement for permanent residency in Canada, Australia, New Zealand, and UK
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Required for Express Entry (Canada)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Points-based immigration systems</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-3xl font-bold text-blue-600">4+</div>
                  <div className="text-sm text-gray-600">Countries for PR</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-blue-600 text-white px-4 py-2 text-sm">Complete Curriculum</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive IELTS Curriculum
            </h2>
            <p className="text-lg md:text-xl text-gray-600">Master all four modules with proven methodology</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Listening",
                icon: Headphones,
                topics: [
                  "Academic & General Listening",
                  "Note-taking Strategies",
                  "Multiple Accents Practice",
                  "40+ Practice Tests",
                ],
              },
              {
                title: "Reading",
                icon: BookOpen,
                topics: [
                  "Skimming & Scanning Techniques",
                  "Time Management",
                  "All Question Types",
                  "Vocabulary Building",
                ],
              },
              {
                title: "Writing",
                icon: PenTool,
                topics: [
                  "Task 1: Graphs, Charts, Diagrams",
                  "Task 2: Essay Writing",
                  "Band 8+ Sample Answers",
                  "Personalized Feedback",
                ],
              },
              {
                title: "Speaking",
                icon: Mic,
                topics: [
                  "Part 1, 2, 3 Strategies",
                  "Fluency & Pronunciation",
                  "Mock Interviews",
                  "Confidence Building",
                ],
              },
            ].map((module, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <module.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{module.title}</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-2 text-sm">Why MeritCap</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why MeritCap is the Best Choice
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Proven methodology, expert instructors, and guaranteed results
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Expert Instructors",
                description: "15+ years experience with IELTS certified trainers who understand the exam inside out",
              },
              {
                icon: Target,
                title: "Score Guarantee",
                description: "Improve by 1.5 bands or get 100% money back - we're that confident in our methods",
              },
              {
                icon: BookOpen,
                title: "Premium Study Materials",
                description: "Latest Cambridge books, exclusive practice tests, and comprehensive online resources",
              },
              {
                icon: Users,
                title: "Small Batch Sizes",
                description: "Maximum 15 students per batch ensuring personalized attention and faster progress",
              },
              {
                icon: Clock,
                title: "Flexible Timings",
                description: "Weekend, weekday, morning, and evening batches available both online and offline",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Weekly mock tests with detailed performance analysis and improvement roadmap",
              },
              {
                icon: MessageCircle,
                title: "24/7 Support",
                description: "Round-the-clock doubt clearing with dedicated mentors and one-on-one sessions",
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "92% of our students achieve their target scores within the first attempt",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Class Video Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Experience Our Teaching Methodology
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10 text-blue-100">
              Watch a sample class and see how we make IELTS preparation simple and effective
            </p>

            <div className="relative aspect-video bg-blue-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white hover:bg-blue-50 text-blue-600 rounded-full w-16 h-16 md:w-20 md:h-20"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:p-6">
                <p className="text-base md:text-lg font-semibold">Sample IELTS Writing Task 2 Class</p>
                <p className="text-xs md:text-sm text-blue-200">Learn how to write Band 8+ essays</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Choose Your Perfect Plan</h2>
            <p className="text-lg md:text-xl text-gray-600">Flexible packages designed for every student's needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                price: "₹9,999",
                duration: "2 months",
                features: [
                  "All 4 modules coverage",
                  "20 live classes",
                  "Study materials included",
                  "10 practice tests",
                  "Email support",
                ],
                popular: false,
              },
              {
                name: "Premium",
                price: "₹14,999",
                duration: "3 months",
                features: [
                  "Everything in Basic",
                  "30 live classes",
                  "One-on-one sessions (4)",
                  "20 practice tests",
                  "Speaking mock interviews",
                  "WhatsApp support",
                ],
                popular: true,
              },
              {
                name: "VIP",
                price: "₹24,999",
                duration: "4 months",
                features: [
                  "Everything in Premium",
                  "Unlimited live classes",
                  "One-on-one sessions (10)",
                  "Unlimited practice tests",
                  "Personal mentor",
                  "Score guarantee",
                  "24/7 priority support",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border-2 ${plan.popular ? "border-blue-600 shadow-xl md:scale-105" : "border-gray-200 shadow-lg"} relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 md:px-4 py-1 text-xs md:text-sm">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4 md:mb-6">
                    <span className="text-3xl md:text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-sm md:text-base text-gray-600 ml-2">/ {plan.duration}</span>
                  </div>
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"} text-white py-5 md:py-6 text-sm md:text-base`}
                  >
                    Request Demo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Real Success Stories, Real Results
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              See how our students achieved their dream scores and transformed their lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Priya Sharma", score: "6.0 → 8.5", time: "3 months", destination: "Canada PR", image: "PS" },
              { name: "Rahul Verma", score: "5.5 → 7.5", time: "2 months", destination: "UK Masters", image: "RV" },
              { name: "Anita Patel", score: "6.5 → 8.0", time: "2.5 months", destination: "Australia PR", image: "AP" },
            ].map((student, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0">
                      {student.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg text-gray-900">{student.name}</h3>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{student.score}</Badge>
                        <span>in {student.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mb-4">
                    "The structured approach and expert guidance helped me achieve my target score. Now I'm pursuing my
                    dream in {student.destination}!"
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-blue-500 fill-blue-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does it take to prepare for IELTS?",
                a: "Typically 2-4 months depending on your current English level and target score.",
              },
              {
                q: "What is the minimum score required for Canada PR?",
                a: "For Express Entry, you need minimum CLB 7 (IELTS 6.0 in each module).",
              },
              {
                q: "Do you offer online classes?",
                a: "Yes, we offer both online and offline classes with flexible timings.",
              },
              {
                q: "What if I don't achieve my target score?",
                a: "We offer a score guarantee - if you don't improve by 1.5 bands, we'll refund your fees.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm md:text-base text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Achieve Your Dream IELTS Score?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-blue-100">
            Join thousands of successful students and start your journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white hover:bg-blue-50 text-blue-600 font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
            >
              Get Free Demo Class
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg bg-transparent"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Chat with Counselor
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

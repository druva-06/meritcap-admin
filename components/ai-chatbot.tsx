"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Send, Minimize2, Maximize2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotProps {
  currentPage?: string
}

export default function AIChatbot({ currentPage }: ChatbotProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const [userBehavior, setUserBehavior] = useState({
    scrollCount: 0,
    timeOnPage: 0,
    backButtonClicks: 0,
    formInteractions: 0,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pageStartTime = useRef(Date.now())

  const getPageContext = () => {
    const path = pathname || currentPage || "home"

    if (path.includes("dashboard")) return "dashboard"
    if (path.includes("study") && path.includes("abroad")) return "study-abroad"
    if (path.includes("study") && path.includes("india")) return "study-india"
    if (path.includes("study") && path.includes("online")) return "study-online"
    if (path.includes("test-prep")) return "test-prep"
    if (path.includes("application")) return "applications"
    if (path.includes("document")) return "documents"
    if (path.includes("university") || path.includes("college")) return "university"
    if (path.includes("community")) return "community"
    if (path.includes("stories")) return "stories"
    if (path === "/" || path.includes("home")) return "home"

    return "general"
  }

  const getContextualWelcome = () => {
    const context = getPageContext()
    const timeOnPage = Math.floor((Date.now() - pageStartTime.current) / 1000)

    const welcomeMessages: Record<string, string[]> = {
      home: [
        "Hi! I'm MeritCap Bot and your career Assistant! Looking to study abroad? I can help you find the perfect program!",
        "Welcome to MeritCap! I'm MeritCap Bot and your career Assistant here to guide you through your study abroad journey. What are you most interested in?",
        "Hello! I'm MeritCap Bot and your career Assistant. Ready to explore amazing study opportunities? I can help you discover programs that match your goals!",
      ],
      dashboard: [
        "Welcome back! I'm MeritCap Bot and your career Assistant. I can help you track your applications, review deadlines, or answer questions about your progress.",
        "Great to see you again! I'm MeritCap Bot and your career Assistant. Need help with any of your applications or want to explore new opportunities?",
        "Hi there! I'm MeritCap Bot and your career Assistant. I notice you're managing your applications. Any questions about deadlines or next steps?",
      ],
      "study-abroad": [
        "Exploring study abroad options? Excellent choice! I'm MeritCap Bot and your career Assistant. I can help you understand requirements, costs, and application processes.",
        "International education opens amazing doors! I'm MeritCap Bot and your career Assistant here to help you find the perfect country and program.",
        "Studying abroad is life-changing! I'm MeritCap Bot and your career Assistant. I can guide you through choosing universities, applications, and visa processes.",
      ],
      "study-india": [
        "Interested in studying in India? Great decision! I'm MeritCap Bot and your career Assistant. I can guide you through top universities, courses, and admission requirements.",
        "India offers world-class education at affordable costs! I'm MeritCap Bot and your career Assistant here to help you explore the best options.",
        "Studying in India? I'm MeritCap Bot and your career Assistant. I can help you understand the admission process, top universities, and scholarship opportunities.",
      ],
      "study-online": [
        "Online education offers incredible flexibility! I'm MeritCap Bot and your career Assistant. I can help you find accredited programs that fit your schedule and goals.",
        "Exploring online learning? Smart choice! I'm MeritCap Bot and your career Assistant here to guide you through quality programs and career outcomes.",
        "Online degrees are increasingly valuable! I'm MeritCap Bot and your career Assistant. I can help you choose programs with strong industry recognition.",
      ],
      "test-prep": [
        "Test preparation is crucial for admissions! I'm MeritCap Bot and your career Assistant. I can provide guidance on IELTS, TOEFL, GRE, GMAT, and study strategies.",
        "Getting ready for entrance exams? I'm MeritCap Bot and your career Assistant with tips, resources, and strategies to help you achieve your target scores!",
        "Test prep can be overwhelming, but I'm MeritCap Bot and your career Assistant here to help! Which exam are you preparing for?",
      ],
      applications: [
        "Application process got you stressed? I'm MeritCap Bot and your career Assistant. I can guide you through each step and help you stay organized!",
        "I see you're working on applications! I'm MeritCap Bot and your career Assistant. Need help with deadlines, requirements, or document preparation?",
        "Applications can be complex, but I'm MeritCap Bot and your career Assistant here to simplify the process for you!",
      ],
      documents: [
        "Document preparation is key to successful applications! I'm MeritCap Bot and your career Assistant. I can help with SOPs, LORs, transcripts, and more.",
        "Getting your documents ready? I'm MeritCap Bot and your career Assistant with templates, tips, and guidance for all required materials!",
        "Document requirements can be confusing. I'm MeritCap Bot and your career Assistant here to help you understand what you need and how to prepare it!",
      ],
      university: [
        "Researching this university? Great choice! I'm MeritCap Bot and your career Assistant. I can tell you about admission requirements, deadlines, and application tips.",
        "Interested in learning more about this institution? I'm MeritCap Bot and your career Assistant. I can provide insights on programs, costs, and student life!",
        "This university looks interesting! I'm MeritCap Bot and your career Assistant. Want to know about admission chances, requirements, or campus life?",
      ],
    }

    const messages = welcomeMessages[context] || welcomeMessages.home

    // Add behavior-based context
    if (timeOnPage > 120) {
      // User has been on page for 2+ minutes
      return "I notice you've been exploring for a while. Can I help you find what you're looking for?"
    }

    if (userBehavior.scrollCount > 5) {
      return "Seems like you're looking for something specific! I'm here to help you find the right information."
    }

    // Return random message from context-appropriate array
    return messages[Math.floor(Math.random() * messages.length)]
  }

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout
    let behaviorTimer: NodeJS.Timeout

    const handleScroll = () => {
      setUserBehavior((prev) => ({ ...prev, scrollCount: prev.scrollCount + 1 }))

      // Clear existing timer and set new one
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        if (userBehavior.scrollCount > 3 && !isOpen && !hasShownWelcome) {
          triggerProactiveHelp("I notice you're scrolling around. Looking for something specific? I can help!")
        }
      }, 2000)
    }

    const handlePopState = () => {
      setUserBehavior((prev) => ({ ...prev, backButtonClicks: prev.backButtonClicks + 1 }))

      if (userBehavior.backButtonClicks > 2 && !isOpen) {
        triggerProactiveHelp("Having trouble finding what you need? I'm here to help guide you!")
      }
    }

    const handleFormFocus = () => {
      setUserBehavior((prev) => ({ ...prev, formInteractions: prev.formInteractions + 1 }))
    }

    // Time-based triggers
    behaviorTimer = setTimeout(() => {
      const timeOnPage = Math.floor((Date.now() - pageStartTime.current) / 1000)
      setUserBehavior((prev) => ({ ...prev, timeOnPage }))

      // Trigger after 45 seconds on complex pages
      const complexPages = ["applications", "documents", "university", "test-prep"]
      if (complexPages.includes(getPageContext()) && timeOnPage > 45 && !isOpen && !hasShownWelcome) {
        triggerProactiveHelp()
      }

      // Trigger after 90 seconds on any page
      if (timeOnPage > 90 && !isOpen && !hasShownWelcome) {
        triggerProactiveHelp()
      }
    }, 30000)

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("focusin", handleFormFocus)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("focusin", handleFormFocus)
      clearTimeout(scrollTimer)
      clearTimeout(behaviorTimer)
    }
  }, [isOpen, hasShownWelcome, userBehavior])

  const triggerProactiveHelp = (customMessage?: string) => {
    setHasShownWelcome(true)
    const chatButton = document.getElementById("chatbot-button")
    if (chatButton) {
      chatButton.classList.add("animate-bounce")
      setTimeout(() => chatButton.classList.remove("animate-bounce"), 3000)

      // Add a subtle notification pulse
      const notification = chatButton.querySelector(".notification-pulse")
      if (notification) {
        notification.classList.add("animate-ping")
      }
    }

    // If custom message provided, auto-open with that message
    if (customMessage) {
      setTimeout(() => {
        setIsOpen(true)
        const proactiveMessage: Message = {
          id: Date.now().toString(),
          text: customMessage,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages([proactiveMessage])
      }, 1000)
    }
  }

  const generateAIResponse = (userInput: string, context: string): string => {
    const input = userInput.toLowerCase()
    const pageContext = getPageContext()

    // Context-specific responses
    const contextResponses: Record<string, Record<string, string>> = {
      dashboard: {
        default:
          "I can help you with your dashboard! I can assist with tracking applications, reviewing deadlines, updating your profile, or exploring new opportunities. What would you like to focus on?",
        application:
          "I see you're in your dashboard! For applications, I can help you track status, prepare missing documents, or set deadline reminders. Which applications need attention?",
        deadline:
          "Deadlines are crucial! I can help you create a timeline, set reminders, and prioritize your applications. Would you like me to review your upcoming deadlines?",
      },
      "study-abroad": {
        default:
          "Studying abroad is an amazing opportunity! I can help you choose countries, understand costs, explore scholarships, and navigate application processes. What interests you most?",
        cost: "Study abroad costs vary significantly. US: $30k-60k/year, UK: £20k-40k/year, Canada: CAD 20k-35k/year, Australia: AUD 25k-45k/year. This includes tuition and living expenses. Would you like scholarship information?",
        country:
          "Popular study destinations include USA (research opportunities), UK (shorter programs), Canada (immigration-friendly), Australia (work opportunities), and Germany (affordable education). What's your priority?",
      },
      "test-prep": {
        default:
          "Test preparation is key to admission success! I can help with IELTS, TOEFL, GRE, GMAT, SAT strategies, study plans, and practice resources. Which test are you preparing for?",
        ielts:
          "IELTS preparation tips: Focus on all 4 skills equally, practice with official materials, take mock tests regularly, and aim for 6.5-7.5 for most universities. Need specific section help?",
        gre: "GRE strategy: Verbal (vocabulary + reading), Quantitative (practice daily), Writing (structure + examples). Target scores: 310+ for good programs, 320+ for top programs. Want a study plan?",
      },
    }

    // Get context-specific response
    const contextResponse = contextResponses[pageContext]
    if (contextResponse) {
      for (const [key, response] of Object.entries(contextResponse)) {
        if (key !== "default" && input.includes(key)) {
          return response
        }
      }
      return contextResponse.default
    }

    // Common responses based on keywords
    if (input.includes("application") || input.includes("apply")) {
      return "I'd be happy to help with your application! The typical process includes: 1) Choosing universities, 2) Preparing documents (SOP, LOR, transcripts), 3) Meeting language requirements, 4) Submitting applications. Which step would you like to know more about?"
    }

    if (input.includes("document") || input.includes("sop") || input.includes("lor")) {
      return "Document preparation is crucial! You'll typically need: Statement of Purpose (SOP), Letters of Recommendation (LOR), Academic transcripts, Language test scores (IELTS/TOEFL), and sometimes a CV. I can provide templates and guidance for each. What specific document do you need help with?"
    }

    if (input.includes("cost") || input.includes("fee") || input.includes("money")) {
      return "Costs vary by country and program. Generally: US ($20k-60k/year), UK (£15k-40k/year), Canada (CAD 15k-35k/year), Australia (AUD 20k-45k/year). Don't forget living expenses! Would you like information about scholarships and financial aid options?"
    }

    if (input.includes("scholarship") || input.includes("funding")) {
      return "Great question! There are many scholarship opportunities: Merit-based scholarships, Need-based aid, Country-specific scholarships, University scholarships, and external funding. I can help you find scholarships that match your profile. What's your field of study?"
    }

    if (input.includes("test") || input.includes("ielts") || input.includes("toefl") || input.includes("gre")) {
      return "Test preparation is important! For English: IELTS (6.5-7.5) or TOEFL (80-100) are commonly required. For graduate programs: GRE/GMAT may be needed. I can provide study resources and test-taking strategies. Which test are you preparing for?"
    }

    // Page-specific responses
    if (pageContext === "dashboard") {
      return "I can see you're in your dashboard! I can help you track application deadlines, review your profile completion, or answer questions about your shortlisted universities. What would you like to focus on?"
    }

    // Default helpful response
    return `That's a great question! Since you're on the ${pageContext} page, I can provide specific guidance for this area. Could you tell me more about what you'd like to know?`
  }

  // Initialize with contextual welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: getContextualWelcome(),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, currentPage])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Prepare conversation history for API
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: msg.text,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          context: getPageContext(),
          conversationHistory,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      } else {
        // Fallback to local response if API fails
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(currentInput, getPageContext()),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      }
    } catch (error) {
      console.error("Chat API error:", error)
      // Fallback to local response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(currentInput, getPageContext()),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    const chatbotElement = document.querySelector("[data-chatbot]") as any
    if (chatbotElement) {
      chatbotElement.addMessage = (text: string, sender: "user" | "bot") => {
        const newMessage: Message = {
          id: Date.now().toString(),
          text,
          sender,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, newMessage])
      }
      chatbotElement.openChat = () => setIsOpen(true)
    }
  }, [])

  return (
    <div data-chatbot>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div
          id="chatbot-button"
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative">
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 animate-pulse">
              {/* Electric glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 animate-ping"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-40"></div>

              {/* Thunder/Lightning border effect */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-60 animate-pulse"></div>

              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner z-10">
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600 animate-bounce" />
                  <div className="text-base ml-1">🎓</div>
                </div>
              </div>

              {/* Electric sparks animation */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
              <div
                className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping opacity-60"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-4 left-1 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-50"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Enhanced notification badge */}
            {!hasShownWelcome && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center notification-pulse shadow-lg">
                <Zap className="w-3 h-3 text-white animate-pulse" />
              </div>
            )}

            {/* Enhanced tooltip */}
            <div className="absolute bottom-full right-0 mb-4 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap max-w-xs shadow-2xl border border-gray-700">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>
                  {getPageContext() === "dashboard"
                    ? "Hi! I'm MeritCap Bot ⚡ Need help with your applications?"
                    : getPageContext() === "test-prep"
                      ? "Hi! I'm MeritCap Bot ⚡ Questions about test prep?"
                      : "Hi! I'm MeritCap Bot ⚡ Ready to spark your study journey?"}
                </span>
              </div>
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-3xl shadow-2xl border-2 border-blue-100 transition-all duration-500 backdrop-blur-sm ${
            isMinimized ? "w-96 h-20" : "w-96 h-[520px]"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b-2 border-blue-100 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-t-3xl relative overflow-hidden">
            {/* Background electric effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>

            <div className="flex items-center space-x-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <div className="text-sm ml-1">🎓</div>
                </div>
                {/* Electric glow around avatar */}
                <div className="absolute inset-0 rounded-full bg-blue-300 opacity-30 animate-ping"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  MeritCap Bot
                  <Zap className="w-4 h-4 ml-2 text-yellow-300 animate-pulse" />
                </h3>
                <p className="text-sm opacity-90 font-medium">Your Career Assistant ⚡</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 relative z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-2 h-10 w-10 rounded-full transition-all duration-300 hover:scale-110"
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 h-10 w-10 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-6 h-80 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md transform hover:scale-105"
                            : "bg-white text-gray-800 rounded-bl-md border border-gray-100 transform hover:scale-105"
                        }`}
                      >
                        {message.sender === "bot" && (
                          <div className="flex items-center mb-2">
                            <Zap className="w-3 h-3 text-blue-500 mr-1" />
                            <span className="text-xs font-semibold text-blue-600">MeritCap Bot</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.sender === "user" ? "opacity-70" : "opacity-50"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-3 h-3 text-blue-500 animate-pulse" />
                          <span className="text-xs font-semibold text-blue-600">MeritCap Bot is thinking...</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <div className="p-6 border-t-2 border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex space-x-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about studying abroad... ⚡"
                    className="flex-1 rounded-2xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 text-sm font-medium placeholder:text-gray-500 transition-all duration-300"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-3 h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center justify-center mt-3 space-x-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-gray-600 font-medium">
                    Powered by AI • Available 24/7 • Lightning Fast ⚡
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

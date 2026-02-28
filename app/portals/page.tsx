import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, UserCheck, GraduationCap, Handshake, User, ArrowRight, Key, Globe } from "lucide-react"

export default function PortalsPage() {
  const portals = [
    {
      id: "admin",
      title: "Admin Portal",
      description: "Complete system administration and management",
      icon: Shield,
      color: "red",
      bgGradient: "from-red-500 to-orange-500",
      hoverBg: "hover:bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200",
      loginUrl: "/login",
      dashboardUrl: "/admin/dashboard",
      features: ["User Management", "System Analytics", "Content Management", "Security Settings"],
      credentials: {
        email: "admin@meritcap.com",
        password: "admin123",
      },
    },
    {
      id: "counselor",
      title: "Counselor Portal",
      description: "Student guidance and counseling management",
      icon: UserCheck,
      color: "green",
      bgGradient: "from-green-500 to-teal-500",
      hoverBg: "hover:bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      loginUrl: "/login",
      dashboardUrl: "/counselor/dashboard",
      features: ["Student Sessions", "Appointment Management", "Progress Tracking", "Reports"],
      credentials: {
        email: "counselor@meritcap.com",
        password: "counselor123",
      },
    },
    {
      id: "college",
      title: "College Portal",
      description: "University and institution management",
      icon: GraduationCap,
      color: "purple",
      bgGradient: "from-purple-500 to-indigo-500",
      hoverBg: "hover:bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      loginUrl: "/login",
      dashboardUrl: "/college/dashboard",
      features: ["Course Management", "Application Review", "Student Enrollment", "Analytics"],
      credentials: {
        email: "college@meritcap.com",
        password: "college123",
      },
    },
    {
      id: "agent",
      title: "Agent Portal",
      description: "Partner and agent collaboration platform",
      icon: Handshake,
      color: "yellow",
      bgGradient: "from-yellow-500 to-amber-500",
      hoverBg: "hover:bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      loginUrl: "/login",
      dashboardUrl: "/agent/dashboard",
      features: ["Lead Management", "Commission Tracking", "Partner Resources", "Performance"],
      credentials: {
        email: "agent@meritcap.com",
        password: "agent123",
      },
    },
    {
      id: "student",
      title: "Student Portal",
      description: "Student dashboard and learning platform",
      icon: User,
      color: "blue",
      bgGradient: "from-blue-500 to-cyan-500",
      hoverBg: "hover:bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      loginUrl: "/login",
      dashboardUrl: "/dashboard",
      features: ["Course Progress", "Applications", "Documents", "Community"],
      credentials: {
        email: "demo@meritcap.com",
        password: "demo123",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">MeritCap Portal Access</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access different portals based on your role. Each portal is designed for specific user types with tailored
              features and functionality.
            </p>
          </div>
        </div>
      </div>

      {/* Portals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portals.map((portal) => {
            const IconComponent = portal.icon
            return (
              <Card
                key={portal.id}
                className={`border-2 ${portal.borderColor} ${portal.hoverBg} transition-all duration-300 hover:shadow-xl hover:scale-105`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${portal.bgGradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className={`text-2xl font-bold ${portal.textColor}`}>{portal.title}</CardTitle>
                  <CardDescription className="text-gray-600">{portal.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {portal.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Demo Credentials */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Key className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="font-semibold text-gray-700">Demo Credentials:</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <strong>Email:</strong> {portal.credentials.email}
                      </div>
                      <div>
                        <strong>Password:</strong> {portal.credentials.password}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link href={portal.loginUrl} className="block">
                      <Button
                        className={`w-full bg-gradient-to-r ${portal.bgGradient} hover:opacity-90 text-white font-semibold`}
                      >
                        Access {portal.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    <Link href={portal.dashboardUrl} className="block">
                      <Button
                        variant="outline"
                        className={`w-full ${portal.textColor} border-current hover:bg-gray-50`}
                      >
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Access Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access Links</h2>
            <p className="text-gray-600">Direct links to access each portal quickly</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {portals.map((portal) => {
              const IconComponent = portal.icon
              return (
                <Link key={portal.id} href={portal.loginUrl}>
                  <div
                    className={`p-4 rounded-lg border-2 ${portal.borderColor} ${portal.hoverBg} transition-all duration-300 hover:shadow-md text-center`}
                  >
                    <IconComponent className={`w-8 h-8 ${portal.textColor} mx-auto mb-2`} />
                    <div className={`font-semibold ${portal.textColor}`}>{portal.title}</div>
                    <div className="text-xs text-gray-500 mt-1">Click to access</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">How to Access</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600 font-bold text-lg mb-2">1. Choose Portal</div>
                <p className="text-gray-600">Select the portal that matches your role and requirements.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600 font-bold text-lg mb-2">2. Use Demo Credentials</div>
                <p className="text-gray-600">Use the provided demo credentials to login and explore features.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-blue-600 font-bold text-lg mb-2">3. Explore Dashboard</div>
                <p className="text-gray-600">Navigate through the dashboard to see all available features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

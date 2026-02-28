"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TestDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Create a test user for dashboard access
    const testUser = {
      email: "test@example.com",
      name: "Test User",
      phone: "+1234567890",
      studentId: "WC2024001",
      focusArea: "Study Abroad",
      loginTime: new Date().toISOString(),
      signupTime: new Date().toISOString(),
      profileCompletion: 85,
    }

    localStorage.setItem("meritcap_user", JSON.stringify(testUser))

    // Redirect to dashboard
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up test user and redirecting to dashboard...</p>
      </div>
    </div>
  )
}

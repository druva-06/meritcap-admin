"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, User, CheckCircle, Upload, FileText, Clock, Shield, Zap, AlertCircle, Mail } from "lucide-react"
import { validateInvitationToken } from "@/lib/api/invitations"
import { signupStudent, signupWithInvitation } from "@/lib/api/auth"
import type { ValidationResponseDto } from "@/lib/api/invitations"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Invitation-specific state
  const [invitationToken, setInvitationToken] = useState<string | null>(null)
  const [invitationData, setInvitationData] = useState<ValidationResponseDto | null>(null)
  const [isValidatingToken, setIsValidatingToken] = useState(false)
  const [tokenError, setTokenError] = useState<string | null>(null)

  // Check for invitation token on mount
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setInvitationToken(token)
      validateToken(token)
    }
  }, [searchParams])

  const validateToken = async (token: string) => {
    setIsValidatingToken(true)
    setTokenError(null)

    try {
      const validation = await validateInvitationToken(token)

      if (!validation.valid) {
        setTokenError(validation.message)
        setInvitationData(null)
      } else {
        setInvitationData(validation)
        // Pre-fill form with invitation data
        setFormData(prev => ({
          ...prev,
          email: validation.email,
          fullName: `${validation.firstName} ${validation.lastName}`,
          phone: validation.phoneNumber || "",
        }))
      }
    } catch (error) {
      setTokenError(error instanceof Error ? error.message : 'Failed to validate invitation token')
      setInvitationData(null)
    } finally {
      setIsValidatingToken(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      let signupResponse;

      if (invitationToken && invitationData) {
        // Invited user signup
        signupResponse = await signupWithInvitation({
          invitationToken,
          email: formData.email,
          password: formData.password,
        })
      } else {
        // Student signup (direct, no invitation)
        signupResponse = await signupStudent({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
        })
      }

      // Store user session
      localStorage.setItem(
        "meritcap_user",
        JSON.stringify({
          userId: signupResponse.userId,
          email: signupResponse.email,
          name: `${signupResponse.firstName} ${signupResponse.lastName}`,
          username: signupResponse.username,
          role: signupResponse.roleName,
          phone: formData.phone,
          signupTime: new Date().toISOString(),
          documentVaultSetup: false,
        }),
      )

      window.dispatchEvent(new Event("authStateChanged"))

      // Only show document vault encouragement for students
      if (signupResponse.roleName === 'STUDENT') {
        setCurrentStep(2) // Move to document vault encouragement
      } else {
        // For other roles (COLLEGE, COUNSELOR, etc.), redirect to appropriate dashboard
        router.push("/dashboard")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.'
      setErrors({ submit: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkipDocuments = () => {
    router.push("/dashboard")
  }

  const handleSetupDocumentVault = () => {
    router.push("/dashboard?tab=documents&setup=true")
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Account Created Successfully! 🎉
              </h1>
              <p className="text-gray-600">Welcome to MeritCap, {formData.fullName}!</p>
            </div>

            {/* Document Vault Encouragement */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Set Up Your Document Vault</h3>
                  <p className="text-gray-600 mb-4">
                    Upload your documents once and use them for all university applications. Save time and apply faster!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>Save 80% time on applications</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span>Secure document storage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span>One-click document sharing</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Documents you can upload:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>Academic Transcripts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>Degree Certificates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>Test Scores (IELTS, TOEFL)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>Passport Copy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>Work Experience Letters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>Financial Documents</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleSetupDocumentVault}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                Set Up Document Vault (Recommended)
              </Button>
              <Button
                variant="outline"
                onClick={handleSkipDocuments}
                className="flex-1 py-3 font-semibold bg-transparent"
              >
                Skip for Now
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                You can always set up your document vault later from your dashboard
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {invitationToken ? 'Complete Your Registration' : 'Join MeritCap'}
            </h1>
            <p className="text-gray-600 mt-2">
              {invitationToken ? 'You\'ve been invited to join' : 'Create your free account today'}
            </p>
          </div>

          {/* Invitation Token Validation Status */}
          {invitationToken && (
            <div className="mb-6">
              {isValidatingToken && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-blue-700 text-sm">Validating invitation...</span>
                </div>
              )}

              {!isValidatingToken && tokenError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 font-semibold text-sm mb-1">Invalid Invitation</p>
                    <p className="text-red-700 text-sm">{tokenError}</p>
                    <p className="text-red-600 text-xs mt-2">
                      If you believe this is an error, please contact your administrator.
                    </p>
                  </div>
                </div>
              )}

              {!isValidatingToken && invitationData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-green-800 font-semibold text-sm mb-1">Invitation Verified ✓</p>
                    <p className="text-green-700 text-sm">
                      You've been invited to join as <strong>{invitationData.roleName}</strong>
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      Complete the form below to create your account
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                disabled={!!invitationToken}
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.email ? "border-red-500" : ""} ${invitationToken ? "bg-gray-50" : ""}`}
              />
              {invitationToken && (
                <p className="text-xs text-gray-500">Email is pre-filled from your invitation</p>
              )}
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                required
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || (invitationToken && !invitationData) || isValidatingToken}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : invitationToken ? "Complete Registration" : "Create Free Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free forever • No credit card required</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

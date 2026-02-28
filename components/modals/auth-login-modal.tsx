"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Phone, Mail, Sparkles, MessageCircle } from "lucide-react"

interface AuthLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginComplete: (userData: any) => void
}

export function AuthLoginModal({ isOpen, onClose, onLoginComplete }: AuthLoginModalProps) {
  const [step, setStep] = useState<"method" | "phone" | "otp">("method")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handlePhoneLogin = async () => {
    if (!phoneNumber.trim()) {
      alert("Please enter your phone number")
      return
    }

    setLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true)
      setStep("otp")
      setLoading(false)
      alert("OTP sent to your phone number!")
    }, 1500)
  }

  const handleOtpVerify = async () => {
    if (!otp.trim() || otp.length !== 6) {
      alert("Please enter valid 6-digit OTP")
      return
    }

    if (!name.trim()) {
      alert("Please enter your name")
      return
    }

    setLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      const userData = {
        name: name.trim(),
        phone: phoneNumber,
        email: email.trim() || `${phoneNumber}@temp.com`,
        loginMethod: "phone",
        loginTime: new Date().toISOString(),
        isNewUser: true,
      }

      localStorage.setItem("meritcap_user", JSON.stringify(userData))
      onLoginComplete(userData)
      setLoading(false)
    }, 1500)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    // Simulate Google login
    setTimeout(() => {
      const userData = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        phone: "",
        loginMethod: "google",
        loginTime: new Date().toISOString(),
        isNewUser: true,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      }

      localStorage.setItem("meritcap_user", JSON.stringify(userData))
      onLoginComplete(userData)
      setLoading(false)
    }, 2000)
  }

  const resetModal = () => {
    setStep("method")
    setPhoneNumber("")
    setOtp("")
    setName("")
    setEmail("")
    setOtpSent(false)
    setLoading(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-2xl">
        <DialogHeader>
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {step === "method" ? "Login to Continue" : step === "phone" ? "Enter Phone Number" : "Verify OTP"}
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              {step === "method"
                ? "Choose your preferred login method"
                : step === "phone"
                  ? "We'll send you a verification code"
                  : "Enter the 6-digit code sent to your phone"}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === "method" && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <Button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <Button
                  onClick={() => setStep("phone")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Continue with Phone</span>
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "phone" && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Phone Number *
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("method")}
                    className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePhoneLogin}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send OTP
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === "otp" && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Enter 6-digit OTP *</Label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">OTP sent to {phoneNumber}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Full Name *
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    Email (Optional)
                  </Label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("phone")}
                    className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleOtpVerify}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Verify & Continue
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handlePhoneLogin}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Resend OTP
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

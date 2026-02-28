"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  GraduationCap,
  Shield,
  Users,
  TrendingUp,
  Award,
  Building2,
  Globe,
  Zap
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.email || !formData.password) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      const result = await login(formData.email, formData.password, rememberMe)

      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })
        // Redirect based on role from API response
        router.push(result.redirectPath)
      } else {
        toast({
          title: "Login Failed",
          description: result.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { icon: Users, label: "Active Users", value: "10,000+", color: "from-blue-400 to-blue-600" },
    { icon: Building2, label: "Partner Colleges", value: "500+", color: "from-purple-400 to-purple-600" },
    { icon: Globe, label: "Countries", value: "50+", color: "from-green-400 to-green-600" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "from-orange-400 to-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Brand & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full animate-pulse delay-75"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse delay-150"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white rounded-full animate-pulse delay-300"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 w-full">
          {/* Logo & Brand */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-2xl border border-white/30">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">MeritCap</h1>
            <p className="text-base text-blue-100">Your Gateway to Global Education</p>
          </div>

          {/* Feature Highlights */}
          <div className="w-full max-w-md space-y-3 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Secure Access</h3>
                  <p className="text-blue-100 text-xs">Enterprise-grade security for all users</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Real-Time Updates</h3>
                  <p className="text-blue-100 text-xs">Instant notifications and dashboard insights</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Proven Results</h3>
                  <p className="text-blue-100 text-xs">Trusted by thousands worldwide</p>
                </div>
              </div>
            </div>
          </div>          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-1 text-white" />
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MeritCap
            </h1>
            <p className="text-gray-600 text-sm mt-1">Your Gateway to Global Education</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">Welcome Back</CardTitle>
              <p className="text-gray-600 text-sm mt-1">Sign in to access your dashboard</p>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-10 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-10 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <span>Sign In to Dashboard</span>
                  )}
                </Button>
              </form>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Need help?{" "}
                  <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Contact Support
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2025 MeritCap. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

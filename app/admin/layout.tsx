"use client"

import type React from "react"

import { useState, useEffect, Suspense, useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { usePermissions } from "@/lib/permissions-context"
import { buildMenuForUser, type FilteredMenuItem } from "@/lib/menu-builder"
import { UnauthorizedAccess } from "@/components/unauthorized-access"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Menu, X, ChevronRight, LogOut, Search, ChevronDown } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationCenter } from "@/components/notification-center"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
  const [hasUnauthorizedAccess, setHasUnauthorizedAccess] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { user, loading: authLoading, logout } = useAuth()
  const { permissions, loading: permissionsLoading } = usePermissions()

  const isLoginPage = pathname === "/login"

  // Build dynamic menu based on user permissions
  const sidebarItems = useMemo<FilteredMenuItem[]>(() => {
    if (!user || permissionsLoading) return []
    return buildMenuForUser(permissions, user.role || "")
  }, [user, permissions, permissionsLoading])

  useEffect(() => {
    if (isLoginPage) return

    // Wait for auth to finish loading
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    // Check if user has access to admin portal
    // All roles except STUDENT can access (permissions are checked per menu item)
    const userRole = user.role?.toUpperCase()
    const blockedRoles = ["STUDENT"]

    if (blockedRoles.includes(userRole || "")) {
      setHasUnauthorizedAccess(true)
    } else {
      setHasUnauthorizedAccess(false)
    }
  }, [router, isLoginPage, user, authLoading])

  // Auto-expand submenus based on current path
  useEffect(() => {
    const newExpandedMenus: Record<string, boolean> = {}

    sidebarItems.forEach(item => {
      if (item.hasSubmenu && pathname.startsWith(item.href)) {
        newExpandedMenus[item.id] = true
      }
    })

    setExpandedMenus(prev => ({ ...prev, ...newExpandedMenus }))
  }, [pathname, sidebarItems])

  // Toggle submenu expansion
  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }))
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton with Logo */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
                <Skeleton className="h-9 w-20 mb-3" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-12 rounded-full" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-9 w-28 rounded-lg" />
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <Skeleton className="h-6 w-36 mb-4" />
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Show unauthorized access page if user doesn't have admin role
  if (hasUnauthorizedAccess) {
    return (
      <UnauthorizedAccess
        message="Admin Access Required"
        allowedRoles={["Admin", "Manager", "Counselor"]}
        userRole={user.role}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 shadow-2xl`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-500/30">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">MeritCap</h1>
              <p className="text-blue-100 text-xs">Admin Portal</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-blue-500/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto h-[calc(100vh-16rem)] sidebar-scroll">
          {permissionsLoading ? (
            // Show loading skeleton while permissions load
            <ul className="space-y-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className="px-4 py-3">
                  <Skeleton className="h-10 w-full" />
                </li>
              ))}
            </ul>
          ) : sidebarItems.length === 0 ? (
            // Show message if no menu items available
            <div className="text-center text-blue-100 py-8">
              <p className="text-sm">No menu items available</p>
              <p className="text-xs mt-2">Contact administrator for access</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.hasSubmenu && pathname.startsWith(item.href))
                const isExpanded = expandedMenus[item.id] || false

                if (item.hasSubmenu) {
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive
                            ? "bg-white text-blue-600 shadow-lg font-semibold"
                            : "text-blue-100 hover:bg-blue-500/20 hover:text-white"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-blue-200"}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isExpanded && item.submenu && item.submenu.length > 0 && (
                        <ul className="mt-2 ml-8 space-y-1 border-l-2 border-blue-400/30 pl-3">
                          {item.submenu.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            return (
                              <li key={subItem.id}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={`flex items-center px-3 py-2 rounded-lg transition-all text-sm ${isSubActive
                                      ? "bg-blue-500/30 text-white font-medium"
                                      : "text-blue-100 hover:bg-blue-500/20 hover:text-white"
                                    }`}
                                >
                                  <span>{subItem.label}</span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                }

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive
                          ? "bg-white text-blue-600 shadow-lg font-semibold"
                          : "text-blue-100 hover:bg-blue-500/20 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-blue-200"}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-600 flex-shrink-0" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </nav>

        <div className="p-4 border-t border-blue-500/30">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-100 hover:bg-blue-500/20 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      <div className="lg:ml-72">
        <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 lg:left-72 z-30">
          <div className="px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search leads, students, applications..."
                    className="pl-10 bg-gray-50 border-gray-200 w-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <NotificationCenter />

                <Suspense fallback={<div className="w-10 h-10" />}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 p-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{user?.name?.charAt(0) || "A"}</span>
                        </div>
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.role || "Admin"}</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Suspense>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-16 md:pt-20">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}

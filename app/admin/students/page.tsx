"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { Search, Download, UserPlus, Eye, FileText, Upload, CheckCircle, AlertCircle, Calendar, Phone, Mail, GraduationCap, Users, MessageSquare, Briefcase, BookOpen, Target, TrendingUp, ExternalLink, Award, ClipboardCheck, DollarSign, MapPin, Building, Loader2, Trash2 } from 'lucide-react'
import { api } from "@/lib/api-client"
import { deleteUser } from "@/lib/api/users"
import { toast } from "@/hooks/use-toast"

// Types for API response
interface User {
  user_id: number
  first_name: string
  last_name: string
  username: string
  email: string
  phone_number: string
  profile_picture?: string
  role: string
}

interface PagedResponse {
  users: User[]
  current_page: number
  total_pages: number
  total_elements: number
  page_size: number
  first: boolean
  last: boolean
}

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null)
  const [studentToDelete, setStudentToDelete] = useState<User | null>(null)
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [isDeletingUser, setIsDeletingUser] = useState(false)
  const [currentPage, setCurrentPage] = useState(0) // Backend uses 0-indexed pages
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [students, setStudents] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = useCallback(async (page: number = currentPage, size: number = itemsPerPage) => {
    setLoading(true)
    setError(null)

    try {
      const result = await api.get<any>(
        `/api/user/by-role?role=STUDENT&page=${page}&size=${size}`
      )

      if (result.success && result.data) {
        const responseData = result.data?.response || result.data
        const users = Array.isArray(responseData?.users) ? responseData.users : []

        setStudents(users)
        setTotalPages(typeof responseData?.total_pages === "number" ? responseData.total_pages : 0)
        setTotalElements(typeof responseData?.total_elements === "number" ? responseData.total_elements : users.length)
      } else {
        setStudents([])
        setTotalPages(0)
        setTotalElements(0)
        setError(result.message || "Failed to fetch students")
      }
    } catch (err) {
      setStudents([])
      setTotalPages(0)
      setTotalElements(0)
      setError("An error occurred while fetching students")
      console.error("Error fetching students:", err)
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage])

  // Fetch students from API
  useEffect(() => {
    void fetchStudents()
  }, [fetchStudents])

  // Filter students locally by search term
  const filteredStudents = (students || []).filter((student) => {
    if (!student) return false
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    const fullName = `${student.first_name || ''} ${student.last_name || ''}`.toLowerCase()

    return (
      fullName.includes(searchLower) ||
      (student.email || '').toLowerCase().includes(searchLower) ||
      (student.username || '').toLowerCase().includes(searchLower)
    )
  })

  const openDeleteUserDialog = (student: User) => {
    setStudentToDelete(student)
    setDeleteUserDialogOpen(true)
  }

  const handleDeleteUser = async () => {
    if (!studentToDelete) return

    try {
      setIsDeletingUser(true)
      await deleteUser(studentToDelete.user_id)

      toast({
        title: "Success",
        description: "User deleted successfully",
      })

      if (selectedStudent?.user_id === studentToDelete.user_id) {
        setSelectedStudent(null)
      }

      setDeleteUserDialogOpen(false)
      setStudentToDelete(null)

      const nextTotalElements = Math.max(0, totalElements - 1)
      const maxPageAfterDelete = Math.max(0, Math.ceil(nextTotalElements / itemsPerPage) - 1)
      const targetPage = Math.min(currentPage, maxPageAfterDelete)

      if (targetPage !== currentPage) {
        setCurrentPage(targetPage)
      } else {
        await fetchStudents(targetPage, itemsPerPage)
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete user",
        variant: "destructive",
      })
    } finally {
      setIsDeletingUser(false)
    }
  }

  // Generate page numbers for pagination (adjusted for 0-indexed pages)
  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    const displayCurrentPage = currentPage + 1 // Convert to 1-indexed for display

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(0)

      if (displayCurrentPage > 3) {
        pages.push('ellipsis-start')
      }

      // Show pages around current page
      const start = Math.max(1, currentPage - 1)
      const end = Math.min(totalPages - 2, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (displayCurrentPage < totalPages - 2) {
        pages.push('ellipsis-end')
      }

      // Always show last page
      pages.push(totalPages - 1)
    }

    return pages
  }

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student profiles and services</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/admin/students/new">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalElements}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Counseling Clients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {students.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Community Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {currentPage + 1} / {totalPages || 1}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Job Seekers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {itemsPerPage}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Student Info</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Username</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Phone Number</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center">
                          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                          <p className="text-gray-500">Loading students...</p>
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center">
                          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 font-medium">No students found</p>
                          <p className="text-sm text-gray-400 mt-1">
                            {searchTerm ? "Try adjusting your search criteria" : "No students available"}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr
                          key={student.user_id}
                          className="border-b hover:bg-blue-50 cursor-pointer"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {student.first_name} {student.last_name}
                              </p>
                              <p className="text-sm text-gray-600">ID: {student.user_id}</p>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Mail className="w-3 h-3 mr-1" />
                                {student.email}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-gray-900">{student.username}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center text-sm text-gray-900">
                              <Phone className="w-3 h-3 mr-1 text-gray-400" />
                              {student.phone_number}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1">
                              {student.role}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedStudent(student)
                                }}
                                className="hover:bg-blue-100"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openDeleteUserDialog(student)
                                }}
                                className="hover:bg-red-100 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {!loading && totalElements > 0 && (
                <div className="border-t px-6 py-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Items per page selector and info */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Rows per page:</span>
                        <Select
                          value={itemsPerPage.toString()}
                          onValueChange={(value) => {
                            setItemsPerPage(Number(value))
                            setCurrentPage(0) // Reset to first page
                          }}
                        >
                          <SelectTrigger className="w-20 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <span className="text-sm text-gray-600">
                        Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalElements)} of {totalElements}
                      </span>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                              className={currentPage === 0 ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            />
                          </PaginationItem>

                          {generatePageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                              {typeof page === 'number' ? (
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page + 1}
                                </PaginationLink>
                              ) : (
                                <PaginationEllipsis />
                              )}
                            </PaginationItem>
                          ))}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                              className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {selectedStudent ? (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Student Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-right">{selectedStudent.first_name} {selectedStudent.last_name}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Username:</span>
                        <span className="font-medium text-right">{selectedStudent.username}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-xs text-right break-all">{selectedStudent.email}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-right">{selectedStudent.phone_number}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">User ID:</span>
                        <span className="font-medium text-right">{selectedStudent.user_id}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-600">Role:</span>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-3 py-1">{selectedStudent.role}</Badge>
                      </div>
                      {selectedStudent.profile_picture && (
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600">Profile:</span>
                          <img
                            src={selectedStudent.profile_picture}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={`/admin/students/${selectedStudent.user_id}`}>
                          View Full Profile
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        variant="outline"
                        onClick={() => openDeleteUserDialog(selectedStudent)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-24">
              <CardContent className="p-12 text-center">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a student to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AlertDialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
              {studentToDelete ? (
                <>
                  <br />
                  <span className="font-medium text-red-700">
                    {studentToDelete.first_name} {studentToDelete.last_name} ({studentToDelete.email})
                  </span>
                </>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeletingUser}
              onClick={() => setStudentToDelete(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isDeletingUser}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeletingUser ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

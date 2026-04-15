"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Search, Download, UserPlus, Eye, FileText, Phone, Mail, GraduationCap, Users, ExternalLink, Loader2, Trash2 } from 'lucide-react'
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
    <div className="p-4 sm:p-6 space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-500">Manage student profiles and services</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shrink-0" asChild>
          <Link href="/admin/students/new">
            <UserPlus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl font-bold text-gray-900">{totalElements}</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">This Page</p>
                <p className="text-xl font-bold text-gray-900">{filteredStudents.length}</p>
              </div>
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Page</p>
                <p className="text-xl font-bold text-gray-900">
                  {currentPage + 1}<span className="text-xs font-normal text-gray-400">/{totalPages || 1}</span>
                </p>
              </div>
              <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Main content: list + detail panel */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5">

        {/* Student list — card on mobile, table on desktop */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">All Students ({filteredStudents.length})</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Rows:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(0)
                }}
              >
                <SelectTrigger className="w-16 h-7 text-xs">
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
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-12 flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-sm text-gray-500">Loading students...</p>
              </CardContent>
            </Card>
          ) : filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="p-12 flex flex-col items-center gap-2 text-center">
                <Users className="w-12 h-12 text-gray-300" />
                <p className="text-gray-500 font-medium">No students found</p>
                <p className="text-sm text-gray-400">
                  {searchTerm ? "Try adjusting your search" : "No students available"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Desktop table */}
              <Card className="hidden md:block overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Student</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Username</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.map((student) => (
                        <tr
                          key={student.user_id}
                          className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedStudent?.user_id === student.user_id ? "bg-blue-50" : ""}`}
                          onClick={() => setSelectedStudent(student)}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs shrink-0">
                                {(student.first_name?.[0] ?? "").toUpperCase()}{(student.last_name?.[0] ?? "").toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate">
                                  {student.first_name} {student.last_name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{student.username}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{student.phone_number}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-blue-100"
                                onClick={(e) => { e.stopPropagation(); setSelectedStudent(student) }}
                                title="Quick view"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-red-100 text-red-600"
                                onClick={(e) => { e.stopPropagation(); openDeleteUserDialog(student) }}
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Mobile cards */}
              <div className="md:hidden space-y-2">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.user_id}
                    className={`cursor-pointer transition-colors hover:border-blue-300 ${selectedStudent?.user_id === student.user_id ? "border-blue-400 bg-blue-50/40" : ""}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
                            {(student.first_name?.[0] ?? "").toUpperCase()}{(student.last_name?.[0] ?? "").toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-gray-900">
                              {student.first_name} {student.last_name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <Mail className="w-3 h-3 shrink-0" />
                              <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                              <Phone className="w-3 h-3 shrink-0" />
                              <span>{student.phone_number}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-100 text-red-500"
                            onClick={(e) => { e.stopPropagation(); openDeleteUserDialog(student) }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Link
                          href={`/admin/students/${student.user_id}`}
                          className="flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" /> View Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {!loading && totalElements > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <p className="text-xs text-gray-500 order-2 sm:order-1">
                Showing {Math.min(currentPage * itemsPerPage + 1, totalElements)}–{Math.min((currentPage + 1) * itemsPerPage, totalElements)} of {totalElements}
              </p>
              {totalPages > 1 && (
                <Pagination className="order-1 sm:order-2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                        className={currentPage === 0 ? "pointer-events-none opacity-40 cursor-not-allowed" : "cursor-pointer"}
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
                        className={currentPage >= totalPages - 1 ? "pointer-events-none opacity-40 cursor-not-allowed" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </div>

        {/* Detail panel — sticky on desktop, inline on mobile */}
        <div className="lg:col-span-1">
          {selectedStudent ? (
            <Card className="lg:sticky lg:top-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Student Details</span>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedStudent(null)}>
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-base shrink-0">
                    {(selectedStudent.first_name?.[0] ?? "").toUpperCase()}{(selectedStudent.last_name?.[0] ?? "").toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{selectedStudent.first_name} {selectedStudent.last_name}</p>
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-2 py-0.5 mt-0.5">
                      {selectedStudent.role}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: "Email", value: selectedStudent.email },
                    { label: "Phone", value: selectedStudent.phone_number },
                    { label: "Username", value: selectedStudent.username },
                    { label: "ID", value: `#${selectedStudent.user_id}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-2">
                      <span className="text-gray-500 shrink-0">{label}</span>
                      <span className="font-medium text-right text-xs break-all">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 border-t space-y-2">
                  <Button className="w-full" variant="outline" size="sm" asChild>
                    <Link href={`/admin/students/${selectedStudent.user_id}`}>
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Full Profile
                    </Link>
                  </Button>
                  <Button
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteUserDialog(selectedStudent)}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete Student
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="lg:sticky lg:top-6 hidden lg:block">
              <CardContent className="p-10 flex flex-col items-center gap-3 text-center">
                <GraduationCap className="w-12 h-12 text-gray-200" />
                <p className="text-sm text-gray-400">Select a student to view details</p>
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

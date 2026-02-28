"use client"

import { useState, useEffect } from 'react'
import Link from "next/link"
import {
    Shield,
    Plus,
    Edit2,
    Trash2,
    Search,
    Users,
    Key,
    Check,
    X,
    MoreVertical,
    UserCog,
    AlertCircle,
    CheckCircle2,
    Lock,
    Unlock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getAllRoles, createRole, updateRole, deleteRole, RoleResponseDto, RoleRequestDto } from "@/lib/api/roles"
import {
    getAllPermissions,
    getPermissionsByRoleId,
    assignPermissionsToRole,
    revokePermissionsFromRole,
    PermissionResponseDto,
    getAllDashboards,
    getSubmenusByDashboard,
    getFeaturesByDashboardAndSubmenu,
    getPermissionHierarchy,
    PermissionHierarchyDto,
    FeatureDto
} from "@/lib/api/permissions"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Role {
    id: number
    name: string
    displayName: string
    description: string
    isActive: boolean
    isSystemRole: boolean
    userCount?: number
    createdAt: string
    updatedAt: string
}

const categoryColors: Record<string, string> = {
    LEADS: "bg-blue-500",
    USERS: "bg-purple-500",
    STUDENTS: "bg-green-500",
    APPLICATIONS: "bg-orange-500",
    COLLEGES: "bg-pink-500",
    COURSES: "bg-indigo-500",
    REPORTS: "bg-yellow-500",
    COMMUNICATION: "bg-cyan-500",
    DOCUMENTS: "bg-teal-500",
    SETTINGS: "bg-gray-500",
    ROLES: "bg-red-500",
    PERMISSIONS: "bg-violet-500"
}

export default function RolesManagementPage() {
    const { user } = useAuth()
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all") // all, active, inactive
    const [addRoleOpen, setAddRoleOpen] = useState(false)
    const [editRoleOpen, setEditRoleOpen] = useState(false)
    const [deleteRoleOpen, setDeleteRoleOpen] = useState(false)
    const [managePermissionsOpen, setManagePermissionsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)

    // Permission management state
    const [allPermissions, setAllPermissions] = useState<PermissionResponseDto[]>([])
    const [rolePermissions, setRolePermissions] = useState<PermissionResponseDto[]>([])
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
    const [permissionsLoading, setPermissionsLoading] = useState(false)
    const [permissionSearchQuery, setPermissionSearchQuery] = useState("")
    const [permissionFilterCategory, setPermissionFilterCategory] = useState("all")

    // Hierarchical permission selector state
    const [hierarchyMode, setHierarchyMode] = useState(true) // Toggle between hierarchy and flat view
    const [dashboards, setDashboards] = useState<string[]>([])
    const [selectedDashboard, setSelectedDashboard] = useState<string>("")
    const [submenus, setSubmenus] = useState<string[]>([])
    const [selectedSubmenu, setSelectedSubmenu] = useState<string>("")
    const [availableFeatures, setAvailableFeatures] = useState<FeatureDto[]>([])
    const [selectedFeatureIds, setSelectedFeatureIds] = useState<number[]>([])
    const [hierarchyData, setHierarchyData] = useState<PermissionHierarchyDto[]>([])

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        displayName: "",
        description: "",
        isActive: true,
    })

    // Fetch roles from API
    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        setLoading(true)
        try {
            const rolesData = await getAllRoles()
            setRoles(rolesData)
        } catch (error) {
            console.error("Error fetching roles:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch roles",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleAddRole = async () => {
        try {
            const roleData: RoleRequestDto = {
                name: formData.name,
                displayName: formData.displayName,
                description: formData.description,
                isActive: formData.isActive,
            }

            await createRole(roleData)

            toast({
                title: "Success",
                description: "Role created successfully",
            })
            setAddRoleOpen(false)
            resetForm()
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create role",
                variant: "destructive",
            })
        }
    }

    const handleEditRole = async () => {
        if (!selectedRole) return

        try {
            const roleData: RoleRequestDto = {
                name: formData.name,
                displayName: formData.displayName,
                description: formData.description,
                isActive: formData.isActive,
            }

            await updateRole(selectedRole.id, roleData)

            toast({
                title: "Success",
                description: "Role updated successfully",
            })
            setEditRoleOpen(false)
            resetForm()
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update role",
                variant: "destructive",
            })
        }
    }

    const handleDeleteRole = async () => {
        if (!selectedRole) return

        try {
            await deleteRole(selectedRole.id)

            toast({
                title: "Success",
                description: "Role deleted successfully",
            })
            setDeleteRoleOpen(false)
            setSelectedRole(null)
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete role",
                variant: "destructive",
            })
        }
    }

    const handleToggleRoleStatus = async (role: Role) => {
        try {
            const updatedData: RoleRequestDto = {
                name: role.name,
                displayName: role.displayName,
                description: role.description,
                isActive: !role.isActive,
            }

            await updateRole(role.id, updatedData)

            toast({
                title: "Success",
                description: `Role ${role.isActive ? 'deactivated' : 'activated'} successfully`,
            })
            fetchRoles()
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update role status",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({
            name: "",
            displayName: "",
            description: "",
            isActive: true,
        })
        setSelectedRole(null)
    }

    const openEditDialog = (role: Role) => {
        setSelectedRole(role)
        setFormData({
            name: role.name,
            displayName: role.displayName,
            description: role.description,
            isActive: role.isActive,
        })
        setEditRoleOpen(true)
    }

    const openDeleteDialog = (role: Role) => {
        setSelectedRole(role)
        setDeleteRoleOpen(true)
    }

    const openManagePermissionsDialog = async (role: Role) => {
        setSelectedRole(role)
        setPermissionsLoading(true)
        setManagePermissionsOpen(true)

        try {
            // Fetch all permissions, role's current permissions, and hierarchy in parallel
            const [allPerms, rolePerms, hierarchy, dashboardList] = await Promise.all([
                getAllPermissions(),
                getPermissionsByRoleId(role.id),
                getPermissionHierarchy(),
                getAllDashboards()
            ])

            setAllPermissions(allPerms)
            setRolePermissions(rolePerms)
            setHierarchyData(hierarchy)
            setDashboards(dashboardList)
        } catch (error) {
            console.error("Error fetching permissions:", error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to fetch permissions",
                variant: "destructive",
            })
        } finally {
            setPermissionsLoading(false)
        }
    }

    const handleAssignPermissions = async () => {
        if (!selectedRole) return

        const permissionsToAssign = hierarchyMode ? selectedFeatureIds : selectedPermissions
        if (permissionsToAssign.length === 0) return

        try {
            await assignPermissionsToRole(selectedRole.id, permissionsToAssign)
            toast({
                title: "Success",
                description: "Permissions assigned successfully",
            })

            // Clear selections
            setSelectedPermissions([])
            setSelectedFeatureIds([])

            // Refresh role permissions
            const rolePerms = await getPermissionsByRoleId(selectedRole.id)
            setRolePermissions(rolePerms)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to assign permissions",
                variant: "destructive",
            })
        }
    }

    const handleRevokePermissions = async () => {
        if (!selectedRole || selectedPermissions.length === 0) return

        try {
            await revokePermissionsFromRole(selectedRole.id, selectedPermissions)
            toast({
                title: "Success",
                description: "Permissions revoked successfully",
            })
            setSelectedPermissions([])
            // Refresh role permissions
            const rolePerms = await getPermissionsByRoleId(selectedRole.id)
            setRolePermissions(rolePerms)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to revoke permissions",
                variant: "destructive",
            })
        }
    }

    const closeManagePermissionsDialog = () => {
        setManagePermissionsOpen(false)
        setSelectedRole(null)
        setSelectedPermissions([])
        setSelectedFeatureIds([])
        setPermissionSearchQuery("")
        setPermissionFilterCategory("all")
        // Reset hierarchy state
        setSelectedDashboard("")
        setSelectedSubmenu("")
        setSubmenus([])
        setAvailableFeatures([])
    }

    // Handle dashboard selection
    const handleDashboardChange = async (dashboard: string) => {
        setSelectedDashboard(dashboard)
        setSelectedSubmenu("")
        setAvailableFeatures([])
        setSelectedFeatureIds([])

        if (!dashboard) {
            setSubmenus([])
            return
        }

        try {
            const submenuList = await getSubmenusByDashboard(dashboard)
            setSubmenus(submenuList)
        } catch (error) {
            console.error("Error fetching submenus:", error)
            toast({
                title: "Error",
                description: "Failed to load submenus",
                variant: "destructive",
            })
        }
    }

    // Handle submenu selection
    const handleSubmenuChange = async (submenu: string) => {
        setSelectedSubmenu(submenu)
        setAvailableFeatures([])
        setSelectedFeatureIds([])

        if (!selectedDashboard) return

        try {
            // Find features from hierarchy data
            const dashboardData = hierarchyData.find(h => h.dashboard === selectedDashboard)
            if (!dashboardData) return

            const submenuData = dashboardData.submenus.find(s => s.submenu === submenu)
            if (!submenuData) return

            // Filter out already assigned permissions
            const assignedIds = new Set(rolePermissions.map(p => p.id))
            const availableFeats = submenuData.features.filter(f => !assignedIds.has(f.permissionId))

            setAvailableFeatures(availableFeats)
        } catch (error) {
            console.error("Error loading features:", error)
            toast({
                title: "Error",
                description: "Failed to load features",
                variant: "destructive",
            })
        }
    }

    // Add selected features to assignment list
    const handleAddFeatures = () => {
        if (selectedFeatureIds.length === 0) return

        // Show toast with count
        toast({
            title: "Features Selected",
            description: `${selectedFeatureIds.length} permission(s) ready to assign`,
        })

        // Keep the selections to be assigned when user clicks "Assign Selected"
        // selectedFeatureIds already contains the IDs
    }

    // Filter permissions
    const availablePermissions = allPermissions.filter(p =>
        !rolePermissions.some(rp => rp.id === p.id)
    )

    const filteredAvailablePermissions = availablePermissions.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(permissionSearchQuery.toLowerCase()) ||
            p.displayName.toLowerCase().includes(permissionSearchQuery.toLowerCase())
        const matchesCategory = permissionFilterCategory === "all" || p.category === permissionFilterCategory
        return matchesSearch && matchesCategory
    })

    const filteredRolePermissions = rolePermissions.filter(p =>
        p.name.toLowerCase().includes(permissionSearchQuery.toLowerCase()) ||
        p.displayName.toLowerCase().includes(permissionSearchQuery.toLowerCase())
    )

    // Filter roles based on search and status
    const filteredRoles = roles.filter(role => {
        const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.displayName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = filterStatus === "all" ||
            (filterStatus === "active" && role.isActive) ||
            (filterStatus === "inactive" && !role.isActive)
        return matchesSearch && matchesStatus
    })

    const stats = {
        total: roles.length,
        active: roles.filter(r => r.isActive).length,
        inactive: roles.filter(r => !r.isActive).length,
        system: roles.filter(r => r.isSystemRole).length,
        custom: roles.filter(r => !r.isSystemRole).length,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-blue-600" />
                            Role Management
                        </h1>
                        <p className="text-gray-500 mt-1">Manage user roles and their access levels</p>
                    </div>
                    <Button
                        onClick={() => setAddRoleOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Total Roles</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                </div>
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Active</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
                                </div>
                                <div className="bg-green-50 p-2 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Inactive</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inactive}</p>
                                </div>
                                <div className="bg-red-50 p-2 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">System Roles</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.system}</p>
                                </div>
                                <div className="bg-purple-50 p-2 rounded-lg">
                                    <Lock className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Custom Roles</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.custom}</p>
                                </div>
                                <div className="bg-orange-50 p-2 rounded-lg">
                                    <Unlock className="w-5 h-5 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search roles by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filterStatus === "all" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("all")}
                                    size="sm"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={filterStatus === "active" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("active")}
                                    size="sm"
                                >
                                    Active
                                </Button>
                                <Button
                                    variant={filterStatus === "inactive" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("inactive")}
                                    size="sm"
                                >
                                    Inactive
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRoles.map((role) => (
                        <Card key={role.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${role.isSystemRole ? 'bg-purple-100' : 'bg-blue-100'
                                            }`}>
                                            {role.isSystemRole ? (
                                                <Lock className={`w-5 h-5 ${role.isSystemRole ? 'text-purple-600' : 'text-blue-600'}`} />
                                            ) : (
                                                <UserCog className="w-5 h-5 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{role.displayName}</CardTitle>
                                            <p className="text-xs text-gray-500 font-mono mt-1">{role.name}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEditDialog(role)}>
                                                <Edit2 className="w-4 h-4 mr-2" />
                                                Edit Role
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleToggleRoleStatus(role)}>
                                                {role.isActive ? (
                                                    <>
                                                        <X className="w-4 h-4 mr-2" />
                                                        Deactivate
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="w-4 h-4 mr-2" />
                                                        Activate
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => openDeleteDialog(role)}
                                                className="text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete Role
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600">{role.description}</p>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {role.isActive ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            Inactive
                                        </Badge>
                                    )}
                                    {role.isSystemRole && (
                                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                            <Lock className="w-3 h-3 mr-1" />
                                            System
                                        </Badge>
                                    )}
                                </div>

                                <div className="pt-3 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            Users
                                        </span>
                                        <span className="font-semibold text-gray-900">{role.userCount || 0}</span>
                                    </div>
                                </div>

                                <Link href="/admin/permissions" className="block w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            openManagePermissionsDialog(role)
                                        }}
                                    >
                                        <Key className="w-4 h-4 mr-2" />
                                        Manage Permissions
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredRoles.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No roles found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery ? "Try adjusting your search" : "Get started by creating your first role"}
                            </p>
                            {!searchQuery && (
                                <Button onClick={() => setAddRoleOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Role
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Add Role Dialog */}
                <Dialog open={addRoleOpen} onOpenChange={setAddRoleOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Role</DialogTitle>
                            <DialogDescription>
                                Add a new role to the system with custom permissions
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Role Name (Internal)</Label>
                                <Input
                                    id="name"
                                    placeholder="MARKETING_MANAGER"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase().replace(/\s/g, '_') })}
                                />
                                <p className="text-xs text-gray-500">Use uppercase with underscores (e.g., MARKETING_MANAGER)</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    placeholder="Marketing Manager"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Manages marketing campaigns and content"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="isActive">Active Status</Label>
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => { setAddRoleOpen(false); resetForm() }}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddRole}>Create Role</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Role Dialog */}
                <Dialog open={editRoleOpen} onOpenChange={setEditRoleOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Role</DialogTitle>
                            <DialogDescription>
                                Update role details
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Role Name (Internal)</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="MARKETING_MANAGER"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase().replace(/\s/g, '_') })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-displayName">Display Name</Label>
                                <Input
                                    id="edit-displayName"
                                    placeholder="Marketing Manager"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Input
                                    id="edit-description"
                                    placeholder="Manages marketing campaigns and content"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="edit-isActive">Active Status</Label>
                                <Switch
                                    id="edit-isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => { setEditRoleOpen(false); resetForm() }}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditRole}>Update Role</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Role Dialog */}
                <Dialog open={deleteRoleOpen} onOpenChange={setDeleteRoleOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Delete Role</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this role? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            {selectedRole && (
                                <Card className="border-red-200 bg-red-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-8 h-8 text-red-600" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{selectedRole.displayName}</h4>
                                                <p className="text-sm text-gray-600">{selectedRole.userCount} users currently assigned</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                            <p className="text-sm text-gray-500 mt-4">
                                Users with this role will need to be reassigned to a different role before deletion.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => { setDeleteRoleOpen(false); setSelectedRole(null) }}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteRole}>
                                Delete Role
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Manage Role Permissions Dialog */}
                <Dialog open={managePermissionsOpen} onOpenChange={(open) => !open && closeManagePermissionsDialog()}>
                    <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
                        <DialogHeader className="space-y-3 pb-4 border-b">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                    <Key className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        Manage Permissions
                                    </DialogTitle>
                                    <DialogDescription className="text-base mt-1">
                                        Configure access rights for <span className="font-semibold text-indigo-600">{selectedRole?.displayName}</span>
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {permissionsLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <div className="relative">
                                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-100 mx-auto"></div>
                                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-indigo-600 border-r-indigo-600 absolute top-0 left-1/2 -translate-x-1/2"></div>
                                    </div>
                                    <p className="text-gray-600 mt-6 font-medium">Loading permissions...</p>
                                </div>
                            </div>
                        ) : (
                            <ScrollArea className="h-[calc(90vh-200px)] pr-4">
                                <div className="space-y-6 pb-6">
                                    {/* Stats Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white transform hover:scale-[1.02] transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-emerald-100 text-sm font-medium mb-2">Assigned Permissions</p>
                                                        <p className="text-4xl font-bold">{rolePermissions.length}</p>
                                                        <p className="text-emerald-100 text-xs mt-1">Active access rights</p>
                                                    </div>
                                                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                                                        <CheckCircle2 className="w-12 h-12 text-white" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white transform hover:scale-[1.02] transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-blue-100 text-sm font-medium mb-2">Available Permissions</p>
                                                        <p className="text-4xl font-bold">{allPermissions.length - rolePermissions.length}</p>
                                                        <p className="text-blue-100 text-xs mt-1">Ready to assign</p>
                                                    </div>
                                                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                                                        <Key className="w-12 h-12 text-white" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Mode Toggle - Redesigned */}
                                    <Card className="border-2 border-gray-200 shadow-lg overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-600 rounded-lg">
                                                        <Shield className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">Selection Mode</p>
                                                        <p className="text-sm text-gray-600">
                                                            {hierarchyMode ? "🎯 Organized by Dashboard → Submenu → Features" : "📋 View all permissions in a flat list"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                                                    <span className={`text-sm font-semibold transition-colors ${!hierarchyMode ? 'text-gray-900' : 'text-gray-400'}`}>Flat View</span>
                                                    <Switch
                                                        checked={hierarchyMode}
                                                        onCheckedChange={setHierarchyMode}
                                                        className="data-[state=checked]:bg-blue-600"
                                                    />
                                                    <span className={`text-sm font-semibold transition-colors ${hierarchyMode ? 'text-blue-600' : 'text-gray-400'}`}>Hierarchy</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {hierarchyMode ? (
                                        /* Hierarchical Permission Selector - Redesigned */
                                        <Card className="border-2 border-blue-300 shadow-2xl overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                                                <div className="flex items-center gap-3 text-white">
                                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                                        <Plus className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl font-bold text-white">Add Permissions by Hierarchy</CardTitle>
                                                        <CardDescription className="text-blue-100 mt-1">
                                                            Follow the 3-step process below to assign permissions
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </div>
                                            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 space-y-6">
                                                {/* Step 1: Select Dashboard */}
                                                <div className="space-y-3">
                                                    <Label className="flex items-center gap-3 text-base font-semibold">
                                                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg">
                                                            <span className="text-sm">1</span>
                                                        </div>
                                                        <span className="text-gray-900">Select Dashboard</span>
                                                    </Label>
                                                    <Select value={selectedDashboard} onValueChange={handleDashboardChange}>
                                                        <SelectTrigger className="bg-white border-2 border-blue-200 h-12 text-base font-medium hover:border-blue-400 focus:border-blue-600 transition-colors shadow-sm">
                                                            <SelectValue placeholder="🎯 Choose a dashboard to get started..." />
                                                        </SelectTrigger>
                                                        <SelectContent className="max-h-80">
                                                            {dashboards.map(dashboard => (
                                                                <SelectItem
                                                                    key={dashboard}
                                                                    value={dashboard}
                                                                    className="text-base py-3 cursor-pointer hover:bg-blue-50"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <Shield className="w-4 h-4 text-blue-600" />
                                                                        <span>{dashboard}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Step 2: Select Submenu */}
                                                {selectedDashboard && submenus.length > 0 && (
                                                    <div className="space-y-3 animate-in slide-in-from-top-4 duration-300">
                                                        <Label className="flex items-center gap-3 text-base font-semibold">
                                                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-full shadow-lg">
                                                                <span className="text-sm">2</span>
                                                            </div>
                                                            <span className="text-gray-900">Select Submenu</span>
                                                        </Label>
                                                        <Select value={selectedSubmenu} onValueChange={handleSubmenuChange}>
                                                            <SelectTrigger className="bg-white border-2 border-indigo-200 h-12 text-base font-medium hover:border-indigo-400 focus:border-indigo-600 transition-colors shadow-sm">
                                                                <SelectValue placeholder="📂 Choose a submenu..." />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-80">
                                                                {submenus.map(submenu => (
                                                                    <SelectItem
                                                                        key={submenu}
                                                                        value={submenu}
                                                                        className="text-base py-3 cursor-pointer hover:bg-indigo-50"
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <Key className="w-4 h-4 text-indigo-600" />
                                                                            <span>{submenu}</span>
                                                                        </div>
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}

                                                {/* Step 3: Select Features */}
                                                {selectedSubmenu && availableFeatures.length > 0 && (
                                                    <div className="space-y-3 animate-in slide-in-from-top-4 duration-300">
                                                        <Label className="flex items-center gap-3 text-base font-semibold">
                                                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full shadow-lg">
                                                                <span className="text-sm">3</span>
                                                            </div>
                                                            <span className="text-gray-900">Select Features to Assign</span>
                                                        </Label>
                                                        <Card className="bg-white border-2 border-purple-200 shadow-lg">
                                                            <CardContent className="p-4">
                                                                <ScrollArea className="max-h-72">
                                                                    <div className="space-y-2">
                                                                        {availableFeatures.map((feature) => (
                                                                            <div
                                                                                key={feature.permissionId}
                                                                                className={`flex items-start space-x-3 p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${selectedFeatureIds.includes(feature.permissionId)
                                                                                        ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-md transform scale-[1.02]'
                                                                                        : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-sm'
                                                                                    }`}
                                                                                onClick={() => {
                                                                                    if (selectedFeatureIds.includes(feature.permissionId)) {
                                                                                        setSelectedFeatureIds(selectedFeatureIds.filter(id => id !== feature.permissionId))
                                                                                    } else {
                                                                                        setSelectedFeatureIds([...selectedFeatureIds, feature.permissionId])
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Checkbox
                                                                                    checked={selectedFeatureIds.includes(feature.permissionId)}
                                                                                    className="mt-1"
                                                                                />
                                                                                <div className="flex-1">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                        <p className="font-semibold text-gray-900">{feature.displayName}</p>
                                                                                        <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-2 py-1 shadow-sm">
                                                                                            {feature.feature}
                                                                                        </Badge>
                                                                                    </div>
                                                                                    <p className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">{feature.permissionName}</p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </ScrollArea>
                                                                {selectedFeatureIds.length > 0 && (
                                                                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border-2 border-purple-300 animate-in fade-in duration-300">
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                                                                <p className="text-sm font-semibold text-purple-900">
                                                                                    <span className="text-xl">{selectedFeatureIds.length}</span> permission{selectedFeatureIds.length > 1 ? 's' : ''} selected
                                                                                </p>
                                                                            </div>
                                                                            <Badge className="bg-purple-600 text-white px-3 py-1">
                                                                                Ready to assign
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                )}

                                                {selectedSubmenu && availableFeatures.length === 0 && (
                                                    <Card className="border-2 border-dashed border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 animate-in fade-in duration-300">
                                                        <CardContent className="p-8 text-center">
                                                            <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                                                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-gray-900 mb-2">All Set!</h3>
                                                            <p className="text-sm text-gray-600">All features in this submenu are already assigned to this role.</p>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        /* Legacy Flat View */
                                        <Tabs defaultValue="available" className="w-full">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="available">
                                                    Available Permissions ({availablePermissions.length})
                                                </TabsTrigger>
                                                <TabsTrigger value="assigned">
                                                    Assigned Permissions ({rolePermissions.length})
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="available" className="space-y-4">
                                                {/* Search and Filter */}
                                                <div className="flex gap-4">
                                                    <div className="flex-1 relative">
                                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            placeholder="Search available permissions..."
                                                            value={permissionSearchQuery}
                                                            onChange={(e) => setPermissionSearchQuery(e.target.value)}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                    <Select value={permissionFilterCategory} onValueChange={setPermissionFilterCategory}>
                                                        <SelectTrigger className="w-[200px]">
                                                            <SelectValue placeholder="Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="all">All Categories</SelectItem>
                                                            {Object.keys(categoryColors).map(cat => (
                                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Available Permissions List */}
                                                {filteredAvailablePermissions.length === 0 ? (
                                                    <Card>
                                                        <CardContent className="p-12 text-center">
                                                            <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No available permissions</h3>
                                                            <p className="text-gray-500">
                                                                {permissionSearchQuery ? "Try adjusting your search" : "All permissions are already assigned"}
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                ) : (
                                                    <ScrollArea className="h-[400px] border rounded-lg p-4">
                                                        <div className="space-y-2">
                                                            {filteredAvailablePermissions.map((permission) => (
                                                                <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                                                    <Checkbox
                                                                        checked={selectedPermissions.includes(permission.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setSelectedPermissions([...selectedPermissions, permission.id])
                                                                            } else {
                                                                                setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id))
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <p className="font-medium text-sm">{permission.displayName}</p>
                                                                            <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white text-xs`}>
                                                                                {permission.category}
                                                                            </Badge>
                                                                        </div>
                                                                        <p className="text-xs text-gray-500">{permission.description}</p>
                                                                        <p className="text-xs text-gray-400 font-mono mt-1">{permission.name}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                )}
                                            </TabsContent>

                                            <TabsContent value="assigned" className="space-y-4">
                                                {/* Search */}
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                    <Input
                                                        placeholder="Search assigned permissions..."
                                                        value={permissionSearchQuery}
                                                        onChange={(e) => setPermissionSearchQuery(e.target.value)}
                                                        className="pl-10"
                                                    />
                                                </div>

                                                {/* Assigned Permissions List */}
                                                {filteredRolePermissions.length === 0 ? (
                                                    <Card>
                                                        <CardContent className="p-12 text-center">
                                                            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No permissions assigned</h3>
                                                            <p className="text-gray-500">
                                                                {permissionSearchQuery ? "Try adjusting your search" : "This role has no permissions yet"}
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                ) : (
                                                    <ScrollArea className="h-[400px] border rounded-lg p-4">
                                                        <div className="space-y-2">
                                                            {filteredRolePermissions.map((permission) => (
                                                                <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                                                                    <Checkbox
                                                                        checked={selectedPermissions.includes(permission.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setSelectedPermissions([...selectedPermissions, permission.id])
                                                                            } else {
                                                                                setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id))
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <p className="font-medium text-sm">{permission.displayName}</p>
                                                                            <Badge className={`${categoryColors[permission.category || 'SETTINGS']} text-white text-xs`}>
                                                                                {permission.category}
                                                                            </Badge>
                                                                            <Badge className="bg-green-600 text-white text-xs">
                                                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                                                Assigned
                                                                            </Badge>
                                                                        </div>
                                                                        <p className="text-xs text-gray-600">{permission.description}</p>
                                                                        <p className="text-xs text-gray-500 font-mono mt-1">{permission.name}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                )}
                                            </TabsContent>
                                        </Tabs>
                                    )}

                                    {/* Assigned Permissions Display (always shown) - Redesigned */}
                                    <Card className="border-2 border-green-300 shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5">
                                            <div className="flex items-center gap-3 text-white">
                                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl font-bold text-white">
                                                        Currently Assigned Permissions
                                                    </CardTitle>
                                                    <CardDescription className="text-green-100 mt-1">
                                                        {rolePermissions.length} permission{rolePermissions.length !== 1 ? 's' : ''} active for this role - Select any to revoke
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                                            {rolePermissions.length === 0 ? (
                                                <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
                                                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                                                        <Shield className="w-12 h-12 text-gray-400" />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Permissions Yet</h3>
                                                    <p className="text-sm text-gray-600">This role has no permissions assigned. Use the selector above to add permissions.</p>
                                                </div>
                                            ) : (
                                                <ScrollArea className="h-[320px]">
                                                    <div className="space-y-2 pr-4">
                                                        {rolePermissions.map((permission) => (
                                                            <div
                                                                key={permission.id}
                                                                className={`flex items-start space-x-3 p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${selectedPermissions.includes(permission.id)
                                                                        ? 'border-red-400 bg-gradient-to-r from-red-50 to-orange-50 shadow-md transform scale-[1.01]'
                                                                        : 'border-green-200 bg-white hover:border-green-300 hover:shadow-sm'
                                                                    }`}
                                                                onClick={() => {
                                                                    if (selectedPermissions.includes(permission.id)) {
                                                                        setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id))
                                                                    } else {
                                                                        setSelectedPermissions([...selectedPermissions, permission.id])
                                                                    }
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    checked={selectedPermissions.includes(permission.id)}
                                                                    className="mt-1"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <p className="font-semibold text-gray-900">{permission.displayName}</p>
                                                                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 shadow-sm">
                                                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                                                            Active
                                                                        </Badge>
                                                                    </div>
                                                                    <p className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded inline-block">{permission.name}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            )}

                                            {selectedPermissions.length > 0 && (
                                                <div className="mt-4 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl border-2 border-red-300 animate-in fade-in duration-300">
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                                        <p className="text-sm font-semibold text-red-900">
                                                            <span className="text-xl">{selectedPermissions.length}</span> permission{selectedPermissions.length > 1 ? 's' : ''} selected for revocation
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Action Buttons - Redesigned */}
                                    <div className="flex gap-3 justify-end pt-6 border-t-2 border-gray-200">
                                        <Button
                                            onClick={handleAssignPermissions}
                                            disabled={(hierarchyMode ? selectedFeatureIds.length : selectedPermissions.length) === 0}
                                            className="h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            size="lg"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            <span className="font-semibold">
                                                Assign Selected ({hierarchyMode ? selectedFeatureIds.length : selectedPermissions.length})
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={handleRevokePermissions}
                                            disabled={selectedPermissions.length === 0}
                                            variant="outline"
                                            className="h-12 px-6 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            size="lg"
                                        >
                                            <Trash2 className="w-5 h-5 mr-2" />
                                            <span className="font-semibold">
                                                Revoke Selected ({selectedPermissions.length})
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </ScrollArea>
                        )}

                        <DialogFooter className="border-t pt-4 mt-4">
                            <Button
                                variant="outline"
                                onClick={closeManagePermissionsDialog}
                                className="h-11 px-6 font-semibold hover:bg-gray-100"
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

"use client"

import { useState } from 'react'
import { Save, Key, Bell, Users, Zap, Database, Building2, Upload, Download, Trash2, Plus, SearchIcon, Workflow, GripVertical, Edit2, Users2, UserPlus, Shield, Activity } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const mockData = {
  colleges: [
    { id: 'COL-1', name: 'XYZ College', city: 'Mumbai', state: 'Maharashtra', country: 'India', type: 'offline', programs: ['BBA', 'MBA'] },
    { id: 'COL-2', name: 'ABC University', city: 'New York', state: 'New York', country: 'USA', type: 'online', programs: ['PhD', 'MSc'] },
    // ... more colleges
  ]
}

export default function SettingsPage() {
  const [colleges, setColleges] = useState(mockData.colleges)
  const [collegeSearch, setCollegeSearch] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [addCollegeOpen, setAddCollegeOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<any>(null)
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false)

  const [workflows, setWorkflows] = useState([
    {
      id: 'WF-1',
      name: 'Study Abroad (USA)',
      vertical: 'study-abroad',
      country: 'USA',
      stages: [
        { id: 'S1', name: 'Lead Qualification', order: 1 },
        { id: 'S2', name: 'Counseling Session', order: 2 },
        { id: 'S3', name: 'University Application', order: 3 },
        { id: 'S4', name: 'Document Verification', order: 4 },
        { id: 'S5', name: 'Financial Verification', order: 5 },
        { id: 'S6', name: 'Fees Payment', order: 6 },
        { id: 'S7', name: 'Visa Application', order: 7 },
        { id: 'S8', name: 'Visa Interview', order: 8 },
        { id: 'S9', name: 'Visa Approval', order: 9 },
        { id: 'S10', name: 'Pre-departure Training', order: 10 },
        { id: 'S11', name: 'Enrollment', order: 11 },
      ]
    },
    {
      id: 'WF-2',
      name: 'Study Abroad (UK)',
      vertical: 'study-abroad',
      country: 'UK',
      stages: [
        { id: 'S1', name: 'Lead Qualification', order: 1 },
        { id: 'S2', name: 'Counseling Session', order: 2 },
        { id: 'S3', name: 'University Application', order: 3 },
        { id: 'S4', name: 'Document Verification', order: 4 },
        { id: 'S5', name: 'Financial Verification', order: 5 },
        { id: 'S6', name: 'Fees Payment', order: 6 },
        { id: 'S7', name: 'Visa Application', order: 7 },
        { id: 'S8', name: 'Visa Approval', order: 8 },
        { id: 'S9', name: 'Enrollment', order: 9 },
      ]
    },
    {
      id: 'WF-3',
      name: 'Study India (Offline)',
      vertical: 'study-india',
      country: 'India',
      stages: [
        { id: 'S1', name: 'Lead Qualification', order: 1 },
        { id: 'S2', name: 'Counseling Session', order: 2 },
        { id: 'S3', name: 'College Application', order: 3 },
        { id: 'S4', name: 'Entrance Exam Preparation', order: 4 },
        { id: 'S5', name: 'Document Verification', order: 5 },
        { id: 'S6', name: 'Fees Payment', order: 6 },
        { id: 'S7', name: 'Enrollment', order: 7 },
      ]
    },
    {
      id: 'WF-4',
      name: 'Study Online',
      vertical: 'study-online',
      country: 'All',
      stages: [
        { id: 'S1', name: 'Lead Qualification', order: 1 },
        { id: 'S2', name: 'Counseling Session', order: 2 },
        { id: 'S3', name: 'Program Selection', order: 3 },
        { id: 'S4', name: 'Document Verification', order: 4 },
        { id: 'S5', name: 'Fees Payment', order: 5 },
        { id: 'S6', name: 'Enrollment', order: 6 },
      ]
    },
  ])
  const [editWorkflowOpen, setEditWorkflowOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [newStageName, setNewStageName] = useState('')

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "TM-001",
      name: "Vinayak Kumar",
      email: "vinayak@meritcap.com",
      phone: "+91 98765 43211",
      status: "active",
      joinDate: "2023-01-15",
      branch: "Mumbai",
      department: "Counseling",
      permissions: {
        leads: { viewAll: true, viewAssigned: true, create: true, edit: true, delete: false, transfer: true, bulkAssign: false, export: true },
        students: { viewAll: true, viewAssigned: true, create: true, edit: true, delete: false, export: true },
        applications: { viewAll: true, viewAssigned: true, create: true, edit: true, delete: false, approve: false, export: true },
        community: { view: true, moderate: false, delete: false, feature: false, manageTeam: false },
        finance: { viewReports: true, createInvoices: false, approveExpenses: false, viewPayments: true, export: false },
        hr: { viewAttendance: true, approveLeave: false, manageTraining: false, viewPerformance: true },
        settings: { accessSettings: false, manageRoles: false, manageIntegrations: false, systemConfig: false },
        reports: { viewAllReports: true, exportData: true, viewAnalytics: true },
      },
    },
    {
      id: "TM-002",
      name: "Priya Sharma",
      email: "priya@meritcap.com",
      phone: "+91 98765 43212",
      status: "active",
      joinDate: "2023-03-20",
      branch: "Delhi",
      department: "Counseling",
      permissions: {
        leads: { viewAll: false, viewAssigned: true, create: true, edit: true, delete: false, transfer: false, bulkAssign: false, export: false },
        students: { viewAll: false, viewAssigned: true, create: true, edit: true, delete: false, export: false },
        applications: { viewAll: false, viewAssigned: true, create: true, edit: true, delete: false, approve: false, export: false },
        community: { view: true, moderate: true, delete: false, feature: false, manageTeam: false },
        finance: { viewReports: false, createInvoices: false, approveExpenses: false, viewPayments: false, export: false },
        hr: { viewAttendance: true, approveLeave: false, manageTraining: false, viewPerformance: false },
        settings: { accessSettings: false, manageRoles: false, manageIntegrations: false, systemConfig: false },
        reports: { viewAllReports: false, exportData: false, viewAnalytics: true },
      },
    },
  ])
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false)
  const [editPermissionsOpen, setEditPermissionsOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "Mumbai",
    department: "Counseling",
  })

  const handleEditPermissions = (member: any) => {
    setSelectedMember({ ...member })
    setEditPermissionsOpen(true)
  }

  const handleSavePermissions = () => {
    setTeamMembers(teamMembers.map(m => m.id === selectedMember.id ? selectedMember : m))
    setEditPermissionsOpen(false)
    setSelectedMember(null)
  }

  const handlePermissionChange = (module: string, permission: string, value: boolean) => {
    setSelectedMember({
      ...selectedMember,
      permissions: {
        ...selectedMember.permissions,
        [module]: {
          ...selectedMember.permissions[module],
          [permission]: value,
        },
      },
    })
  }

  const handleAddTeamMember = () => {
    const member = {
      id: `TM-${teamMembers.length + 1}`,
      ...newMember,
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
      permissions: {
        leads: { viewAll: false, viewAssigned: true, create: false, edit: false, delete: false, transfer: false, bulkAssign: false, export: false },
        students: { viewAll: false, viewAssigned: true, create: false, edit: false, delete: false, export: false },
        applications: { viewAll: false, viewAssigned: true, create: false, edit: false, delete: false, approve: false, export: false },
        community: { view: false, moderate: false, delete: false, feature: false, manageTeam: false },
        finance: { viewReports: false, createInvoices: false, approveExpenses: false, viewPayments: false, export: false },
        hr: { viewAttendance: false, approveLeave: false, manageTraining: false, viewPerformance: false },
        settings: { accessSettings: false, manageRoles: false, manageIntegrations: false, systemConfig: false },
        reports: { viewAllReports: false, exportData: false, viewAnalytics: false },
      },
    }
    setTeamMembers([...teamMembers, member])
    setAddTeamMemberOpen(false)
    setNewMember({
      name: "",
      email: "",
      phone: "",
      branch: "Mumbai",
      department: "Counseling",
    })
  }

  const handleToggleMemberStatus = (id: string) => {
    setTeamMembers(teamMembers.map(m =>
      m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m
    ))
  }


  const handleEditWorkflow = (workflow: any) => {
    setSelectedWorkflow({ ...workflow })
    setEditWorkflowOpen(true)
  }

  const handleAddStage = () => {
    if (!newStageName.trim()) return
    const newStage = {
      id: `S${selectedWorkflow.stages.length + 1}`,
      name: newStageName,
      order: selectedWorkflow.stages.length + 1
    }
    setSelectedWorkflow({
      ...selectedWorkflow,
      stages: [...selectedWorkflow.stages, newStage]
    })
    setNewStageName('')
  }

  const handleDeleteStage = (stageId: string) => {
    setSelectedWorkflow({
      ...selectedWorkflow,
      stages: selectedWorkflow.stages.filter((s: any) => s.id !== stageId).map((s: any, idx: number) => ({
        ...s,
        order: idx + 1
      }))
    })
  }

  const handleMoveStage = (stageId: string, direction: 'up' | 'down') => {
    const stages = [...selectedWorkflow.stages]
    const index = stages.findIndex(s => s.id === stageId)
    if (direction === 'up' && index > 0) {
      [stages[index], stages[index - 1]] = [stages[index - 1], stages[index]]
    } else if (direction === 'down' && index < stages.length - 1) {
      [stages[index], stages[index + 1]] = [stages[index + 1], stages[index]]
    }
    setSelectedWorkflow({
      ...selectedWorkflow,
      stages: stages.map((s, idx) => ({ ...s, order: idx + 1 }))
    })
  }

  const handleSaveWorkflow = () => {
    setWorkflows(workflows.map(w => w.id === selectedWorkflow.id ? selectedWorkflow : w))
    setEditWorkflowOpen(false)
    setSelectedWorkflow(null)
  }

  const [newCollege, setNewCollege] = useState({
    name: "",
    city: "",
    state: "",
    country: "India",
    type: "offline",
    programs: [],
  })

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      collegeSearch === "" ||
      college.name.toLowerCase().includes(collegeSearch.toLowerCase()) ||
      college.city.toLowerCase().includes(collegeSearch.toLowerCase())

    const matchesFilter =
      collegeFilter === "all" ||
      (collegeFilter === "offline" && college.type === "offline") ||
      (collegeFilter === "online" && college.type === "online") ||
      (collegeFilter === "india" && college.country === "India") ||
      (collegeFilter === "abroad" && college.country !== "India")

    return matchesSearch && matchesFilter
  })

  const handleAddCollege = () => {
    const college = {
      id: `COL-${colleges.length + 1}`,
      ...newCollege,
    }
    setColleges([...colleges, college])
    setAddCollegeOpen(false)
    setNewCollege({
      name: "",
      city: "",
      state: "",
      country: "India",
      type: "offline",
      programs: [],
    })
  }

  const handleDeleteCollege = (id: string) => {
    setColleges(colleges.filter((c) => c.id !== id))
  }

  const handleBulkDelete = () => {
    if (confirm("Are you sure you want to delete all colleges? This action cannot be undone.")) {
      setColleges([])
      setBulkUploadOpen(false)
    }
  }

  const handleExportExcel = () => {
    console.log("[v0] Exporting colleges to Excel...")
    // Excel export logic here
  }

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("[v0] Uploading colleges from Excel:", file.name)
      // Excel import logic here
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences and integrations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="partners">Partner Management</TabsTrigger>
          <TabsTrigger value="commission">Commission Templates</TabsTrigger>
          <TabsTrigger value="college-master">College Master</TabsTrigger>
          <TabsTrigger value="workflow">Workflow Management</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="MeritCap Education" />
                </div>
                <div>
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input id="company-email" type="email" defaultValue="info@meritcap.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input id="company-phone" defaultValue="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" defaultValue="www.meritcap.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lead-response">Lead Response Time (hours)</Label>
                  <Input id="lead-response" type="number" defaultValue="24" />
                </div>
                <div>
                  <Label htmlFor="follow-up">Follow-up Frequency (days)</Label>
                  <Input id="follow-up" type="number" defaultValue="3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Lead Notifications</p>
                  <p className="text-sm text-gray-600">Get notified when a new lead is created</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SLA Breach Alerts</p>
                  <p className="text-sm text-gray-600">Alert when tasks exceed SLA time</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Application Status Updates</p>
                  <p className="text-sm text-gray-600">Notify on application status changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Payment Reminders</p>
                  <p className="text-sm text-gray-600">Send reminders for pending payments</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Super Admin</h4>
                      <p className="text-sm text-gray-600 mt-1">Full system access and control</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">All Permissions</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Branch Manager</h4>
                      <p className="text-sm text-gray-600 mt-1">Manage branch operations and team</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">View All</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Edit Team</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Reports</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Counselor</h4>
                      <p className="text-sm text-gray-600 mt-1">Manage assigned leads and students</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">View Assigned</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Edit Assigned</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys & Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">WhatsApp Business API</h4>
                    <p className="text-sm text-gray-600 mt-1">Send automated messages to leads and students</p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Connected</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Google Ads</h4>
                    <p className="text-sm text-gray-600 mt-1">Track campaign performance and lead sources</p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Connected</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Facebook Leads</h4>
                    <p className="text-sm text-gray-600 mt-1">Auto-import leads from Facebook campaigns</p>
                    <div className="mt-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Not Connected</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Workflow Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">New Lead Auto-Response</h4>
                    <p className="text-sm text-gray-600 mt-1">When: Lead status changes to "New"</p>
                    <p className="text-sm text-gray-600">Then: Send welcome WhatsApp message</p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Follow-up Task Creation</h4>
                    <p className="text-sm text-gray-600 mt-1">When: Lead status changes to "Interested"</p>
                    <p className="text-sm text-gray-600">Then: Create follow-up task for counselor</p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Create New Automation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Last Backup</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <Button variant="outline">Download Backup</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-Backup Schedule</p>
                  <p className="text-sm text-gray-600">Daily at 2:00 AM</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Partner Approval Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-approve College Partners</p>
                  <p className="text-sm text-gray-600">Automatically approve new college partner registrations</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-approve Sub-Agents</p>
                  <p className="text-sm text-gray-600">Automatically approve new sub-agent registrations</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Require Document Verification</p>
                  <p className="text-sm text-gray-600">Partners must upload and verify documents before approval</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partner Portal Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="partner-session">Session Timeout (minutes)</Label>
                <Input id="partner-session" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Allow Partner Self-Registration</p>
                  <p className="text-sm text-gray-600">Enable partners to register without admin invitation</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Partner Dashboard Access</p>
                  <p className="text-sm text-gray-600">Allow partners to view their performance dashboard</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partner Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Lead Assignment Notifications</p>
                  <p className="text-sm text-gray-600">Notify partners when leads are assigned to them</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Commission Payment Alerts</p>
                  <p className="text-sm text-gray-600">Send alerts when commission payments are processed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Monthly Performance Reports</p>
                  <p className="text-sm text-gray-600">Send monthly performance summary to partners</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Commission Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Standard College Partner</h4>
                      <p className="text-sm text-gray-600 mt-1">Default commission structure for college partners</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Commission: 15%</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Service Charge: ₹5,000
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium College Partner</h4>
                      <p className="text-sm text-gray-600 mt-1">Higher commission for premium partnerships</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Commission: 20%</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Service Charge: ₹8,000
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Sub-Agent Standard</h4>
                      <p className="text-sm text-gray-600 mt-1">Default commission for sub-agents</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Commission: 10%</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Per Lead: ₹500</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Sub-Agent Premium</h4>
                      <p className="text-sm text-gray-600 mt-1">Higher commission for top-performing sub-agents</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Commission: 12%</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Per Lead: ₹750</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">Service Charge Only</h4>
                      <p className="text-sm text-gray-600 mt-1">Fixed service charge without commission</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Service Charge: ₹10,000
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">No Commission</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create New Template</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission Calculation Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="commission-base">Commission Base</Label>
                <select id="commission-base" className="w-full mt-1 p-2 border rounded-md">
                  <option>Tuition Fee Only</option>
                  <option>Total Application Fee</option>
                  <option>First Year Fee</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Include Service Charge in Commission</p>
                  <p className="text-sm text-gray-600">Calculate commission on total including service charge</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Tiered Commission Structure</p>
                  <p className="text-sm text-gray-600">Enable volume-based commission tiers</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="college-master" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  College Master Database
                </CardTitle>
                <div className="flex gap-2">
                  <Dialog open={bulkUploadOpen} onOpenChange={setBulkUploadOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <Upload className="h-4 w-4" />
                        Bulk Upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bulk Upload Colleges</DialogTitle>
                        <DialogDescription>
                          Upload an Excel file with college data. Download the template to see the required format.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Button variant="outline" className="w-full bg-transparent" onClick={() => {
                          console.log("[v0] Downloading Excel template...")
                        }}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Excel Template
                        </Button>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleBulkUpload}
                            className="hidden"
                            id="bulk-upload"
                          />
                          <label htmlFor="bulk-upload" className="cursor-pointer">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload Excel file</p>
                            <p className="text-xs text-gray-500 mt-1">Supports .xlsx and .xls files</p>
                          </label>
                        </div>
                        <Button variant="destructive" onClick={handleBulkDelete} className="w-full">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete All Colleges (Yearly Cleanup)
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={handleExportExcel}>
                    <Download className="h-4 w-4" />
                    Export Excel
                  </Button>
                  <Dialog open={addCollegeOpen} onOpenChange={setAddCollegeOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Plus className="h-4 w-4" />
                        Add College
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New College</DialogTitle>
                        <DialogDescription>Add a new college to the master database</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="college-name">College Name</Label>
                          <Input
                            id="college-name"
                            value={newCollege.name}
                            onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
                            placeholder="Enter college name"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={newCollege.city}
                              onChange={(e) => setNewCollege({ ...newCollege, city: e.target.value })}
                              placeholder="Enter city"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={newCollege.state}
                              onChange={(e) => setNewCollege({ ...newCollege, state: e.target.value })}
                              placeholder="Enter state"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select value={newCollege.country} onValueChange={(value) => setNewCollege({ ...newCollege, country: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="India">India</SelectItem>
                              <SelectItem value="USA">USA</SelectItem>
                              <SelectItem value="UK">UK</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select value={newCollege.type} onValueChange={(value) => setNewCollege({ ...newCollege, type: value as "offline" | "online" })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="offline">Offline</SelectItem>
                              <SelectItem value="online">Online</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setAddCollegeOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddCollege} className="bg-blue-600 hover:bg-blue-700">Add College</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search colleges by name or city..."
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colleges</SelectItem>
                    <SelectItem value="offline">Offline Only</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="abroad">Abroad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">College Name</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Location</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Country</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Type</th>
                      <th className="text-right p-3 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.map((college) => (
                      <tr key={college.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm font-medium text-gray-900">{college.name}</td>
                        <td className="p-3 text-sm text-gray-600">{college.city}, {college.state}</td>
                        <td className="p-3 text-sm text-gray-600">{college.country}</td>
                        <td className="p-3">
                          <Badge className={college.type === "offline" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}>
                            {college.type}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent" onClick={() => handleDeleteCollege(college.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-blue-600" />
                  Application Workflow Templates
                </CardTitle>
                <p className="text-sm text-gray-600">Configure workflow stages for different study verticals</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {workflow.country} • {workflow.stages.length} stages
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent gap-2"
                      onClick={() => handleEditWorkflow(workflow)}
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit Workflow
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workflow.stages.map((stage: any, index: number) => (
                      <div key={stage.id} className="flex items-center gap-1">
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          {index + 1}. {stage.name}
                        </Badge>
                        {index < workflow.stages.length - 1 && (
                          <span className="text-gray-400">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Edit Workflow Dialog */}
          <Dialog open={editWorkflowOpen} onOpenChange={setEditWorkflowOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Workflow: {selectedWorkflow?.name}</DialogTitle>
                <DialogDescription>
                  Add, remove, or reorder workflow stages. Drag stages to reorder them.
                </DialogDescription>
              </DialogHeader>
              {selectedWorkflow && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedWorkflow.stages.map((stage: any, index: number) => (
                      <div key={stage.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-700">Stage {stage.order}</Badge>
                            <span className="font-medium text-gray-900">{stage.name}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMoveStage(stage.id, 'up')}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMoveStage(stage.id, 'down')}
                            disabled={index === selectedWorkflow.stages.length - 1}
                          >
                            ↓
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteStage(stage.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Input
                      placeholder="Enter new stage name..."
                      value={newStageName}
                      onChange={(e) => setNewStageName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddStage()}
                    />
                    <Button onClick={handleAddStage} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Stage
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditWorkflowOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveWorkflow} className="bg-blue-600 hover:bg-blue-700">
                  Save Workflow
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-blue-600" />
                  Team Members
                </CardTitle>
                <Dialog open={addTeamMemberOpen} onOpenChange={setAddTeamMemberOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team Member</DialogTitle>
                      <DialogDescription>Add a new team member and configure their access permissions</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="member-name">Full Name</Label>
                        <Input
                          id="member-name"
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="member-email">Email</Label>
                        <Input
                          id="member-email"
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="member-phone">Phone</Label>
                        <Input
                          id="member-phone"
                          value={newMember.phone}
                          onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="member-branch">Branch</Label>
                          <Select value={newMember.branch} onValueChange={(value) => setNewMember({ ...newMember, branch: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mumbai">Mumbai</SelectItem>
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Bangalore">Bangalore</SelectItem>
                              <SelectItem value="Pune">Pune</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="member-department">Department</Label>
                          <Select value={newMember.department} onValueChange={(value) => setNewMember({ ...newMember, department: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Counseling">Counseling</SelectItem>
                              <SelectItem value="Telecalling">Telecalling</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setAddTeamMemberOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddTeamMember} className="bg-blue-600 hover:bg-blue-700">
                        Add Member
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Name</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Email</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Branch</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Department</th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-900">Status</th>
                      <th className="text-right p-3 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm font-medium text-gray-900">{member.name}</td>
                        <td className="p-3 text-sm text-gray-600">{member.email}</td>
                        <td className="p-3 text-sm text-gray-600">{member.branch}</td>
                        <td className="p-3 text-sm text-gray-600">{member.department}</td>
                        <td className="p-3">
                          <Badge className={member.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent gap-1"
                              onClick={() => handleEditPermissions(member)}
                            >
                              <Shield className="h-4 w-4" />
                              Permissions
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => handleToggleMemberStatus(member.id)}
                            >
                              {member.status === "active" ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Dialog */}
          <Dialog open={editPermissionsOpen} onOpenChange={setEditPermissionsOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Edit Permissions: {selectedMember?.name}
                </DialogTitle>
                <DialogDescription>
                  Select the permissions based on job role and skills. You can choose multiple permissions across different modules.
                </DialogDescription>
              </DialogHeader>
              {selectedMember && (
                <div className="space-y-6 py-4">
                  {/* Leads Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      Leads Management
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-viewAll"
                          checked={selectedMember.permissions.leads.viewAll}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'viewAll', checked as boolean)}
                        />
                        <label htmlFor="leads-viewAll" className="text-sm text-gray-700 cursor-pointer">
                          View All Leads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-viewAssigned"
                          checked={selectedMember.permissions.leads.viewAssigned}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'viewAssigned', checked as boolean)}
                        />
                        <label htmlFor="leads-viewAssigned" className="text-sm text-gray-700 cursor-pointer">
                          View Assigned Only
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-create"
                          checked={selectedMember.permissions.leads.create}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'create', checked as boolean)}
                        />
                        <label htmlFor="leads-create" className="text-sm text-gray-700 cursor-pointer">
                          Create New Leads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-edit"
                          checked={selectedMember.permissions.leads.edit}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'edit', checked as boolean)}
                        />
                        <label htmlFor="leads-edit" className="text-sm text-gray-700 cursor-pointer">
                          Edit Leads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-delete"
                          checked={selectedMember.permissions.leads.delete}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'delete', checked as boolean)}
                        />
                        <label htmlFor="leads-delete" className="text-sm text-gray-700 cursor-pointer">
                          Delete Leads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-transfer"
                          checked={selectedMember.permissions.leads.transfer}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'transfer', checked as boolean)}
                        />
                        <label htmlFor="leads-transfer" className="text-sm text-gray-700 cursor-pointer">
                          Transfer Leads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-bulkAssign"
                          checked={selectedMember.permissions.leads.bulkAssign}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'bulkAssign', checked as boolean)}
                        />
                        <label htmlFor="leads-bulkAssign" className="text-sm text-gray-700 cursor-pointer">
                          Bulk Assign Leads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leads-export"
                          checked={selectedMember.permissions.leads.export}
                          onCheckedChange={(checked) => handlePermissionChange('leads', 'export', checked as boolean)}
                        />
                        <label htmlFor="leads-export" className="text-sm text-gray-700 cursor-pointer">
                          Export Data
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Students Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Students Management</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="students-viewAll"
                          checked={selectedMember.permissions.students.viewAll}
                          onCheckedChange={(checked) => handlePermissionChange('students', 'viewAll', checked as boolean)}
                        />
                        <label htmlFor="students-viewAll" className="text-sm text-gray-700 cursor-pointer">
                          View All Students
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="students-viewAssigned"
                          checked={selectedMember.permissions.students.viewAssigned}
                          onCheckedChange={(checked) => handlePermissionChange('students', 'viewAssigned', checked as boolean)}
                        />
                        <label htmlFor="students-viewAssigned" className="text-sm text-gray-700 cursor-pointer">
                          View Assigned Only
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="students-create"
                          checked={selectedMember.permissions.students.create}
                          onCheckedChange={(checked) => handlePermissionChange('students', 'create', checked as boolean)}
                        />
                        <label htmlFor="students-create" className="text-sm text-gray-700 cursor-pointer">
                          Create Students
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="students-edit"
                          checked={selectedMember.permissions.students.edit}
                          onCheckedChange={(checked) => handlePermissionChange('students', 'edit', checked as boolean)}
                        />
                        <label htmlFor="students-edit" className="text-sm text-gray-700 cursor-pointer">
                          Edit Students
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="students-delete"
                          checked={selectedMember.permissions.students.delete}
                          onCheckedChange={(checked) => handlePermissionChange('students', 'delete', checked as boolean)}
                        />
                        <label htmlFor="students-delete" className="text-sm text-gray-700 cursor-pointer">
                          Delete Students
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="students-export"
                          checked={selectedMember.permissions.students.export}
                          onCheckedChange={(checked) => handlePermissionChange('students', 'export', checked as boolean)}
                        />
                        <label htmlFor="students-export" className="text-sm text-gray-700 cursor-pointer">
                          Export Data
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Applications Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Applications & Visa Processing</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-viewAll"
                          checked={selectedMember.permissions.applications.viewAll}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'viewAll', checked as boolean)}
                        />
                        <label htmlFor="applications-viewAll" className="text-sm text-gray-700 cursor-pointer">
                          View All Applications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-viewAssigned"
                          checked={selectedMember.permissions.applications.viewAssigned}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'viewAssigned', checked as boolean)}
                        />
                        <label htmlFor="applications-viewAssigned" className="text-sm text-gray-700 cursor-pointer">
                          View Assigned Only
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-create"
                          checked={selectedMember.permissions.applications.create}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'create', checked as boolean)}
                        />
                        <label htmlFor="applications-create" className="text-sm text-gray-700 cursor-pointer">
                          Create Applications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-edit"
                          checked={selectedMember.permissions.applications.edit}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'edit', checked as boolean)}
                        />
                        <label htmlFor="applications-edit" className="text-sm text-gray-700 cursor-pointer">
                          Edit Applications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-delete"
                          checked={selectedMember.permissions.applications.delete}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'delete', checked as boolean)}
                        />
                        <label htmlFor="applications-delete" className="text-sm text-gray-700 cursor-pointer">
                          Delete Applications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-approve"
                          checked={selectedMember.permissions.applications.approve}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'approve', checked as boolean)}
                        />
                        <label htmlFor="applications-approve" className="text-sm text-gray-700 cursor-pointer">
                          Approve Applications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="applications-export"
                          checked={selectedMember.permissions.applications.export}
                          onCheckedChange={(checked) => handlePermissionChange('applications', 'export', checked as boolean)}
                        />
                        <label htmlFor="applications-export" className="text-sm text-gray-700 cursor-pointer">
                          Export Data
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Community Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Community Management</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="community-view"
                          checked={selectedMember.permissions.community.view}
                          onCheckedChange={(checked) => handlePermissionChange('community', 'view', checked as boolean)}
                        />
                        <label htmlFor="community-view" className="text-sm text-gray-700 cursor-pointer">
                          View Community
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="community-moderate"
                          checked={selectedMember.permissions.community.moderate}
                          onCheckedChange={(checked) => handlePermissionChange('community', 'moderate', checked as boolean)}
                        />
                        <label htmlFor="community-moderate" className="text-sm text-gray-700 cursor-pointer">
                          Moderate Posts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="community-delete"
                          checked={selectedMember.permissions.community.delete}
                          onCheckedChange={(checked) => handlePermissionChange('community', 'delete', checked as boolean)}
                        />
                        <label htmlFor="community-delete" className="text-sm text-gray-700 cursor-pointer">
                          Delete Posts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="community-feature"
                          checked={selectedMember.permissions.community.feature}
                          onCheckedChange={(checked) => handlePermissionChange('community', 'feature', checked as boolean)}
                        />
                        <label htmlFor="community-feature" className="text-sm text-gray-700 cursor-pointer">
                          Feature Posts
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="community-manageTeam"
                          checked={selectedMember.permissions.community.manageTeam}
                          onCheckedChange={(checked) => handlePermissionChange('community', 'manageTeam', checked as boolean)}
                        />
                        <label htmlFor="community-manageTeam" className="text-sm text-gray-700 cursor-pointer">
                          Manage Team
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Finance Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Finance Management</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finance-viewReports"
                          checked={selectedMember.permissions.finance.viewReports}
                          onCheckedChange={(checked) => handlePermissionChange('finance', 'viewReports', checked as boolean)}
                        />
                        <label htmlFor="finance-viewReports" className="text-sm text-gray-700 cursor-pointer">
                          View Reports
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finance-createInvoices"
                          checked={selectedMember.permissions.finance.createInvoices}
                          onCheckedChange={(checked) => handlePermissionChange('finance', 'createInvoices', checked as boolean)}
                        />
                        <label htmlFor="finance-createInvoices" className="text-sm text-gray-700 cursor-pointer">
                          Create Invoices
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finance-approveExpenses"
                          checked={selectedMember.permissions.finance.approveExpenses}
                          onCheckedChange={(checked) => handlePermissionChange('finance', 'approveExpenses', checked as boolean)}
                        />
                        <label htmlFor="finance-approveExpenses" className="text-sm text-gray-700 cursor-pointer">
                          Approve Expenses
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finance-viewPayments"
                          checked={selectedMember.permissions.finance.viewPayments}
                          onCheckedChange={(checked) => handlePermissionChange('finance', 'viewPayments', checked as boolean)}
                        />
                        <label htmlFor="finance-viewPayments" className="text-sm text-gray-700 cursor-pointer">
                          View Payments
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finance-export"
                          checked={selectedMember.permissions.finance.export}
                          onCheckedChange={(checked) => handlePermissionChange('finance', 'export', checked as boolean)}
                        />
                        <label htmlFor="finance-export" className="text-sm text-gray-700 cursor-pointer">
                          Export Data
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* HR Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">HR Management</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hr-viewAttendance"
                          checked={selectedMember.permissions.hr.viewAttendance}
                          onCheckedChange={(checked) => handlePermissionChange('hr', 'viewAttendance', checked as boolean)}
                        />
                        <label htmlFor="hr-viewAttendance" className="text-sm text-gray-700 cursor-pointer">
                          View Attendance
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hr-approveLeave"
                          checked={selectedMember.permissions.hr.approveLeave}
                          onCheckedChange={(checked) => handlePermissionChange('hr', 'approveLeave', checked as boolean)}
                        />
                        <label htmlFor="hr-approveLeave" className="text-sm text-gray-700 cursor-pointer">
                          Approve Leave
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hr-manageTraining"
                          checked={selectedMember.permissions.hr.manageTraining}
                          onCheckedChange={(checked) => handlePermissionChange('hr', 'manageTraining', checked as boolean)}
                        />
                        <label htmlFor="hr-manageTraining" className="text-sm text-gray-700 cursor-pointer">
                          Manage Training
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hr-viewPerformance"
                          checked={selectedMember.permissions.hr.viewPerformance}
                          onCheckedChange={(checked) => handlePermissionChange('hr', 'viewPerformance', checked as boolean)}
                        />
                        <label htmlFor="hr-viewPerformance" className="text-sm text-gray-700 cursor-pointer">
                          View Performance
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Settings Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Settings & Configuration</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="settings-accessSettings"
                          checked={selectedMember.permissions.settings.accessSettings}
                          onCheckedChange={(checked) => handlePermissionChange('settings', 'accessSettings', checked as boolean)}
                        />
                        <label htmlFor="settings-accessSettings" className="text-sm text-gray-700 cursor-pointer">
                          Access Settings
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="settings-manageRoles"
                          checked={selectedMember.permissions.settings.manageRoles}
                          onCheckedChange={(checked) => handlePermissionChange('settings', 'manageRoles', checked as boolean)}
                        />
                        <label htmlFor="settings-manageRoles" className="text-sm text-gray-700 cursor-pointer">
                          Manage Roles
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="settings-manageIntegrations"
                          checked={selectedMember.permissions.settings.manageIntegrations}
                          onCheckedChange={(checked) => handlePermissionChange('settings', 'manageIntegrations', checked as boolean)}
                        />
                        <label htmlFor="settings-manageIntegrations" className="text-sm text-gray-700 cursor-pointer">
                          Manage Integrations
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="settings-systemConfig"
                          checked={selectedMember.permissions.settings.systemConfig}
                          onCheckedChange={(checked) => handlePermissionChange('settings', 'systemConfig', checked as boolean)}
                        />
                        <label htmlFor="settings-systemConfig" className="text-sm text-gray-700 cursor-pointer">
                          System Configuration
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Reports Module */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Reports & Analytics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reports-viewAllReports"
                          checked={selectedMember.permissions.reports.viewAllReports}
                          onCheckedChange={(checked) => handlePermissionChange('reports', 'viewAllReports', checked as boolean)}
                        />
                        <label htmlFor="reports-viewAllReports" className="text-sm text-gray-700 cursor-pointer">
                          View All Reports
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reports-exportData"
                          checked={selectedMember.permissions.reports.exportData}
                          onCheckedChange={(checked) => handlePermissionChange('reports', 'exportData', checked as boolean)}
                        />
                        <label htmlFor="reports-exportData" className="text-sm text-gray-700 cursor-pointer">
                          Export Data
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="reports-viewAnalytics"
                          checked={selectedMember.permissions.reports.viewAnalytics}
                          onCheckedChange={(checked) => handlePermissionChange('reports', 'viewAnalytics', checked as boolean)}
                        />
                        <label htmlFor="reports-viewAnalytics" className="text-sm text-gray-700 cursor-pointer">
                          View Analytics
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setEditPermissionsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePermissions} className="bg-blue-600 hover:bg-blue-700">
                  Save Permissions
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* ... existing tab contents ... */}
      </Tabs>
    </div>
  )
}

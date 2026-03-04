/**
 * Permission and Menu Configuration
 * Maps permissions to menu items and features
 */

import type { LucideIcon } from "lucide-react"
import {
  Home,
  Users,
  GraduationCap,
  FileText,
  Building2,
  Megaphone,
  DollarSign,
  UserCog,
  Laptop,
  BarChart3,
  Settings,
  UserCheck,
  Phone,
  MessageSquare,
  Shield,
} from "lucide-react"

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
  color?: string
  permissions: string[] // Required permissions (OR logic - needs ANY of these)
  roleSpecific?: {
    [role: string]: {
      href?: string
      view?: string
      label?: string
    }
  }
  hasSubmenu?: boolean
  submenu?: SubMenuItem[]
}

export interface SubMenuItem {
  id: string
  label: string
  href: string
  permissions: string[]
}

/**
 * Complete menu configuration with permission requirements
 */
export const MENU_CONFIG: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/admin/dashboard",
    color: "text-blue-600",
    permissions: ["DASHBOARD_VIEW_ADMIN", "DASHBOARD_VIEW_COLLEGE", "DASHBOARD_VIEW_COUNSELOR", "DASHBOARD_VIEW_SUBAGENT"],
    roleSpecific: {
      ADMIN: { view: "admin" },
      COLLEGE: { view: "college" },
      COUNSELOR: { view: "counselor" },
      COUNSELLOR: { view: "counselor" },
      SUB_AGENT: { view: "subagent" },
      SUBAGENT: { view: "subagent" },
    },
  },
  {
    id: "leads",
    label: "Leads",
    icon: Users,
    href: "/admin/leads",
    permissions: ["MENU_LEADS", "LEAD_VIEW_ALL", "LEAD_VIEW_ASSIGNED", "LEAD_VIEW_OWN"],
  },
  {
    id: "ai-calling",
    label: "AI Calling",
    icon: Phone,
    href: "/admin/ai-calling",
    permissions: ["MENU_AI_CALLING"],
  },
  {
    id: "students",
    label: "Students",
    icon: GraduationCap,
    href: "/admin/students",
    permissions: ["STUDENT_VIEW_ALL", "STUDENT_VIEW_ASSIGNED", "STUDENT_VIEW_REFERRED"],
  },
  {
    id: "applications",
    label: "Applications",
    icon: FileText,
    href: "/admin/applications",
    permissions: ["APPLICATION_VIEW_ALL", "APPLICATION_VIEW_ASSIGNED", "APPLICATION_VIEW_REFERRED", "APPLICATION_VIEW_OWN"],
  },
  {
    id: "community",
    label: "Community",
    icon: MessageSquare,
    href: "/admin/community",
    permissions: ["MENU_COMMUNITY"],
  },
  {
    id: "colleges",
    label: "Colleges",
    icon: Building2,
    href: "/admin/colleges",
    permissions: ["MENU_COLLEGES", "COLLEGE_VIEW_ALL", "COLLEGE_VIEW_OWN_PROFILE"],
    hasSubmenu: true,
    submenu: [
      {
        id: "all-colleges",
        label: "All Colleges",
        href: "/admin/colleges",
        permissions: ["COLLEGE_VIEW_ALL"],
      },
      {
        id: "partner-colleges",
        label: "Partner Colleges",
        href: "/admin/colleges/partners",
        permissions: ["COLLEGE_VIEW_ALL", "PARTNER_VIEW_ALL"],
      },
      {
        id: "partnership-performance",
        label: "Partnership Performance",
        href: "/admin/colleges/performance",
        permissions: ["COLLEGE_VIEW_ANALYTICS", "PARTNER_VIEW_PERFORMANCE"],
      },
      {
        id: "commission-structure",
        label: "Commission Structure",
        href: "/admin/colleges/commission",
        permissions: ["COLLEGE_VIEW_COMMISSION", "PARTNER_MANAGE_COMMISSION"],
      },
      {
        id: "course-catalog",
        label: "Course Catalog",
        href: "/admin/colleges/courses",
        permissions: ["COURSE_VIEW_ALL", "COLLEGE_MANAGE_COURSES"],
      },
      {
        id: "intake-calendar",
        label: "Intake Calendar",
        href: "/admin/colleges/intakes",
        permissions: ["COLLEGE_VIEW_INTAKES", "COLLEGE_MANAGE_INTAKES"],
      },
      {
        id: "college-accounts",
        label: "College Accounts",
        href: "/admin/colleges/accounts",
        permissions: ["COLLEGE_VIEW_ALL", "COLLEGE_VIEW_OWN_PROFILE"],
      },
      {
        id: "bulk-upload",
        label: "Bulk Upload",
        href: "/admin/colleges/bulk-upload",
        permissions: ["COLLEGE_VIEW_ALL", "COLLEGE_MANAGE_COURSES"],
      },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    icon: UserCheck,
    href: "/admin/partners",
    permissions: ["MENU_PARTNERS"],
    hasSubmenu: true,
    submenu: [
      {
        id: "partners-overview",
        label: "Overview",
        href: "/admin/partners",
        permissions: ["MENU_PARTNERS"],
      },
      {
        id: "college-partners",
        label: "College Partners",
        href: "/admin/partners/colleges",
        permissions: ["MENU_PARTNERS"],
      },
      {
        id: "subagent-partners",
        label: "Sub-Agent Partners",
        href: "/admin/partners/subagents",
        permissions: ["MENU_PARTNERS"],
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    href: "/admin/marketing",
    permissions: ["MENU_MARKETING"],
    hasSubmenu: true,
    submenu: [
      {
        id: "marketing-overview",
        label: "Overview",
        href: "/admin/marketing",
        permissions: ["MENU_MARKETING"],
      },
      {
        id: "offline-marketing",
        label: "Offline Marketing",
        href: "/admin/marketing/offline",
        permissions: ["MENU_MARKETING"],
      },
      {
        id: "webinars",
        label: "Webinars",
        href: "/admin/marketing/webinars",
        permissions: ["MENU_MARKETING"],
      },
      {
        id: "social-media",
        label: "Social Media",
        href: "/admin/marketing/social",
        permissions: ["MENU_MARKETING"],
      },
      {
        id: "digital-campaigns",
        label: "Digital Campaigns",
        href: "/admin/marketing/digital",
        permissions: ["MENU_MARKETING"],
      },
      {
        id: "content-marketing",
        label: "Content Marketing",
        href: "/admin/marketing/content",
        permissions: ["MENU_MARKETING"],
      },
      {
        id: "partner-marketing",
        label: "Partner Marketing",
        href: "/admin/marketing/partner",
        permissions: ["MENU_MARKETING"],
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: DollarSign,
    href: "/admin/finance",
    permissions: ["MENU_FINANCE", "FINANCE_VIEW_ALL", "FINANCE_VIEW_OWN_COMMISSIONS", "FINANCE_VIEW_OWN_INVOICES"],
    hasSubmenu: true,
    submenu: [
      {
        id: "finance-overview",
        label: "Overview",
        href: "/admin/finance",
        permissions: ["MENU_FINANCE", "FINANCE_VIEW_ALL"],
      },
      {
        id: "invoices",
        label: "Invoice Generation",
        href: "/admin/finance/invoices",
        permissions: ["FINANCE_CREATE_INVOICE", "FINANCE_VIEW_ALL", "FINANCE_VIEW_OWN_INVOICES"],
      },
      {
        id: "expenses",
        label: "Expense Management",
        href: "/admin/finance/expenses",
        permissions: ["FINANCE_MANAGE_EXPENSES", "FINANCE_VIEW_ALL"],
      },
      {
        id: "commissions",
        label: "Commissions",
        href: "/admin/finance/commissions",
        permissions: ["FINANCE_VIEW_ALL", "FINANCE_VIEW_OWN_COMMISSIONS"],
      },
    ],
  },
  {
    id: "hr",
    label: "HR",
    icon: UserCog,
    href: "/admin/hr",
    permissions: ["MENU_HR"],
    hasSubmenu: true,
    submenu: [
      {
        id: "hr-overview",
        label: "Overview",
        href: "/admin/hr",
        permissions: ["MENU_HR"],
      },
      {
        id: "leave-management",
        label: "Leave Management",
        href: "/admin/hr/leave",
        permissions: ["MENU_HR"],
      },
      {
        id: "attendance",
        label: "Attendance",
        href: "/admin/hr/attendance",
        permissions: ["MENU_HR"],
      },
      {
        id: "training",
        label: "Training Records",
        href: "/admin/hr/training",
        permissions: ["MENU_HR"],
      },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    icon: Laptop,
    href: "/admin/assets",
    permissions: ["MENU_ASSETS"],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    href: "/admin/reports",
    permissions: ["MENU_REPORTS", "REPORT_VIEW_ALL", "REPORT_VIEW_COLLEGE", "REPORT_VIEW_COUNSELOR", "REPORT_VIEW_SUBAGENT"],
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    icon: Shield,
    href: "/admin/roles",
    permissions: ["MENU_ROLES_PERMISSIONS", "USER_MANAGE_ROLES"],
    hasSubmenu: true,
    submenu: [
      {
        id: "roles-management",
        label: "Roles Management",
        href: "/admin/roles",
        permissions: ["USER_MANAGE_ROLES"],
      },
      {
        id: "permissions-management",
        label: "Permissions",
        href: "/admin/permissions",
        permissions: ["USER_MANAGE_PERMISSIONS"],
      },
      {
        id: "user-permissions",
        label: "User Permissions",
        href: "/admin/user-permissions",
        permissions: ["USER_MANAGE_PERMISSIONS"],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    permissions: [],
  },
]

/**
 * Feature-level permissions
 * Maps specific UI features to required permissions
 */
export const FEATURE_PERMISSIONS = {
  // Dashboard features
  DASHBOARD_VIEW: ["DASHBOARD_VIEW_ADMIN", "DASHBOARD_VIEW_COLLEGE", "DASHBOARD_VIEW_COUNSELOR", "DASHBOARD_VIEW_SUBAGENT", "DASHBOARD_VIEW_STUDENT"],

  // Lead features
  LEAD_VIEW: ["LEAD_VIEW_ALL", "LEAD_VIEW_ASSIGNED", "LEAD_VIEW_OWN"],
  LEAD_CREATE: ["LEAD_CREATE"],
  LEAD_EDIT: ["LEAD_EDIT", "LEAD_EDIT_OWN"],
  LEAD_DELETE: ["LEAD_DELETE"],
  LEAD_ASSIGN: ["LEAD_ASSIGN"],
  LEAD_TRANSFER: ["LEAD_TRANSFER"],
  LEAD_BULK_ASSIGN: ["LEAD_BULK_ASSIGN"],
  LEAD_BULK_EDIT: ["LEAD_BULK_EDIT"],
  LEAD_BULK_DELETE: ["LEAD_BULK_DELETE"],
  LEAD_EXPORT: ["LEAD_EXPORT"],
  LEAD_IMPORT: ["LEAD_IMPORT"],
  LEAD_CALL: ["LEAD_CALL"],
  LEAD_SEND_EMAIL: ["LEAD_SEND_EMAIL"],
  LEAD_SEND_SMS: ["LEAD_SEND_SMS"],
  LEAD_VIEW_DETAILS: ["LEAD_VIEW_DETAILS"],
  LEAD_CONVERT: ["LEAD_CONVERT"],
  LEAD_FOLLOW_UP: ["LEAD_FOLLOW_UP"],
  LEAD_MERGE: ["LEAD_MERGE"],

  // AI Calling features
  AI_CALLING: ["AI_CALLING_MAKE_CALL", "AI_CALLING_VIEW_HISTORY", "AI_CALLING_VIEW_ANALYTICS"],

  // Student features
  STUDENT_VIEW: ["STUDENT_VIEW_ALL", "STUDENT_VIEW_ASSIGNED", "STUDENT_VIEW_REFERRED"],
  STUDENT_CREATE: ["STUDENT_CREATE"],
  STUDENT_EDIT: ["STUDENT_EDIT"],
  STUDENT_DELETE: ["STUDENT_DELETE"],
  STUDENT_EXPORT: ["STUDENT_EXPORT"],
  STUDENT_VIEW_DETAILS: ["STUDENT_VIEW_DETAILS"],
  STUDENT_VIEW_DOCUMENTS: ["STUDENT_VIEW_DOCUMENTS"],
  STUDENT_UPLOAD_DOCUMENTS: ["STUDENT_UPLOAD_DOCUMENTS"],
  STUDENT_ASSIGN: ["STUDENT_ASSIGN"],
  STUDENT_TRANSFER: ["STUDENT_TRANSFER"],
  STUDENT_BULK_OPERATIONS: ["STUDENT_BULK_ASSIGN", "STUDENT_BULK_EDIT"],
  STUDENT_MANAGE_PROFILE: ["STUDENT_MANAGE_PROFILE"],

  // Application features
  APPLICATION_VIEW: ["APPLICATION_VIEW_ALL", "APPLICATION_VIEW_ASSIGNED", "APPLICATION_VIEW_REFERRED", "APPLICATION_VIEW_OWN"],
  APPLICATION_CREATE: ["APPLICATION_CREATE"],
  APPLICATION_EDIT: ["APPLICATION_EDIT"],
  APPLICATION_DELETE: ["APPLICATION_DELETE"],
  APPLICATION_SUBMIT: ["APPLICATION_SUBMIT"],
  APPLICATION_REVIEW: ["APPLICATION_REVIEW", "APPLICATION_APPROVE", "COLLEGE_REVIEW_APPLICATIONS"],
  APPLICATION_APPROVE: ["APPLICATION_APPROVE", "COLLEGE_APPROVE_APPLICATIONS"],
  APPLICATION_UPDATE_STATUS: ["APPLICATION_UPDATE_STATUS"],
  APPLICATION_TRACK: ["APPLICATION_TRACK"],
  APPLICATION_EXPORT: ["APPLICATION_EXPORT"],
  APPLICATION_VIEW_DOCUMENTS: ["APPLICATION_VIEW_DOCUMENTS"],
  APPLICATION_UPLOAD_DOCUMENTS: ["APPLICATION_UPLOAD_DOCUMENTS"],
  APPLICATION_WITHDRAW: ["APPLICATION_WITHDRAW"],
  APPLICATION_BULK_UPDATE: ["APPLICATION_BULK_UPDATE"],
  APPLICATION_ASSIGN: ["APPLICATION_ASSIGN"],

  // Community features
  COMMUNITY_ACCESS: ["MENU_COMMUNITY"],
  COMMUNITY_VIEW: ["COMMUNITY_VIEW"],
  COMMUNITY_POST: ["COMMUNITY_CREATE_POST"],
  COMMUNITY_COMMENT: ["COMMUNITY_COMMENT"],
  COMMUNITY_MODERATE: ["COMMUNITY_MODERATE"],

  // College features
  COLLEGE_VIEW: ["COLLEGE_VIEW_ALL", "COLLEGE_VIEW_OWN_PROFILE"],
  COLLEGE_CREATE: ["COLLEGE_CREATE"],
  COLLEGE_EDIT: ["COLLEGE_EDIT", "COLLEGE_EDIT_OWN_PROFILE"],
  COLLEGE_DELETE: ["COLLEGE_DELETE"],
  COLLEGE_MANAGE_COURSES: ["COLLEGE_MANAGE_COURSES"],
  COLLEGE_MANAGE_INTAKES: ["COLLEGE_MANAGE_INTAKES"],
  COLLEGE_VIEW_ANALYTICS: ["COLLEGE_VIEW_ANALYTICS"],
  COLLEGE_VIEW_COMMISSION: ["COLLEGE_VIEW_COMMISSION"],
  COLLEGE_MANAGE_DOCUMENTS: ["COLLEGE_MANAGE_DOCUMENTS"],
  COLLEGE_REVIEW_APPLICATIONS: ["COLLEGE_REVIEW_APPLICATIONS"],
  COLLEGE_MANAGE_STAFF: ["COLLEGE_MANAGE_STAFF"],
  COLLEGE_SEARCH: ["COLLEGE_SEARCH"],
  COLLEGE_COMPARE: ["COLLEGE_COMPARE"],

  // Course features
  COURSE_VIEW: ["COURSE_VIEW_ALL"],
  COURSE_CREATE: ["COURSE_CREATE"],
  COURSE_EDIT: ["COURSE_EDIT"],
  COURSE_DELETE: ["COURSE_DELETE"],
  COURSE_SEARCH: ["COURSE_SEARCH"],
  COURSE_COMPARE: ["COURSE_COMPARE"],

  // Partner features
  PARTNER_VIEW: ["PARTNER_VIEW_ALL"],
  PARTNER_CREATE: ["PARTNER_CREATE"],
  PARTNER_EDIT: ["PARTNER_EDIT"],
  PARTNER_DELETE: ["PARTNER_DELETE"],
  PARTNER_VIEW_PERFORMANCE: ["PARTNER_VIEW_PERFORMANCE"],
  PARTNER_MANAGE_COMMISSION: ["PARTNER_MANAGE_COMMISSION"],

  // Marketing features
  MARKETING_VIEW: ["MARKETING_VIEW"],
  MARKETING_CREATE: ["MARKETING_CREATE"],
  MARKETING_EDIT: ["MARKETING_EDIT"],
  MARKETING_DELETE: ["MARKETING_DELETE"],
  MARKETING_VIEW_ANALYTICS: ["MARKETING_VIEW_ANALYTICS"],
  MARKETING_MANAGE_WEBINARS: ["MARKETING_MANAGE_WEBINARS"],
  MARKETING_MANAGE_EVENTS: ["MARKETING_MANAGE_EVENTS"],

  // Finance features
  FINANCE_VIEW: ["FINANCE_VIEW_ALL", "FINANCE_VIEW_OWN_COMMISSIONS", "FINANCE_VIEW_OWN_INVOICES"],
  FINANCE_CREATE_INVOICE: ["FINANCE_CREATE_INVOICE"],
  FINANCE_APPROVE_INVOICE: ["FINANCE_APPROVE_INVOICE"],
  FINANCE_MANAGE_EXPENSES: ["FINANCE_MANAGE_EXPENSES"],
  FINANCE_VIEW_REPORTS: ["FINANCE_VIEW_REPORTS"],
  FINANCE_MANAGE_PAYMENTS: ["FINANCE_MANAGE_PAYMENTS"],

  // HR features
  HR_VIEW: ["HR_VIEW_ALL"],
  HR_MANAGE_LEAVE: ["HR_MANAGE_LEAVE"],
  HR_MANAGE_ATTENDANCE: ["HR_MANAGE_ATTENDANCE", "HR_VIEW_ATTENDANCE"],
  HR_MANAGE_TRAINING: ["HR_MANAGE_TRAINING"],
  HR_VIEW_PAYROLL: ["HR_VIEW_PAYROLL"],

  // Asset features
  ASSET_VIEW: ["ASSET_VIEW"],
  ASSET_CREATE: ["ASSET_CREATE"],
  ASSET_EDIT: ["ASSET_EDIT"],
  ASSET_DELETE: ["ASSET_DELETE"],
  ASSET_ASSIGN: ["ASSET_ASSIGN"],

  // Report features
  REPORT_VIEW: ["REPORT_VIEW_ALL", "REPORT_VIEW_COLLEGE", "REPORT_VIEW_COUNSELOR", "REPORT_VIEW_SUBAGENT"],
  REPORT_EXPORT: ["REPORT_EXPORT_ALL", "REPORT_EXPORT_COLLEGE", "REPORT_EXPORT_COUNSELOR", "REPORT_EXPORT_SUBAGENT"],
  REPORT_VIEW_FINANCIAL: ["REPORT_VIEW_FINANCIAL"],
  REPORT_SCHEDULE: ["REPORT_SCHEDULE"],

  // User management features
  USER_VIEW: ["USER_VIEW_ALL"],
  USER_CREATE: ["USER_CREATE"],
  USER_EDIT: ["USER_EDIT"],
  USER_DELETE: ["USER_DELETE"],
  USER_MANAGE_ROLES: ["USER_MANAGE_ROLES"],
  USER_MANAGE_PERMISSIONS: ["USER_MANAGE_PERMISSIONS", "USER_ASSIGN_PERMISSIONS", "USER_REVOKE_PERMISSIONS"],
  USER_RESET_PASSWORD: ["USER_RESET_PASSWORD"],
  USER_LOCK_UNLOCK: ["USER_LOCK_UNLOCK"],

  // Role & Permission management
  ROLE_VIEW: ["ROLE_VIEW_ALL"],
  ROLE_CREATE: ["ROLE_CREATE"],
  ROLE_EDIT: ["ROLE_EDIT"],
  ROLE_DELETE: ["ROLE_DELETE"],
  ROLE_ASSIGN_PERMISSIONS: ["ROLE_ASSIGN_PERMISSIONS"],
  PERMISSION_VIEW: ["PERMISSION_VIEW_ALL"],
  PERMISSION_CREATE: ["PERMISSION_CREATE"],
  PERMISSION_EDIT: ["PERMISSION_EDIT"],

  // Communication features
  SEND_EMAIL: ["COMMUNICATION_SEND_EMAIL"],
  SEND_SMS: ["COMMUNICATION_SEND_SMS"],
  SEND_BULK: ["COMMUNICATION_SEND_BULK"],
  COMMUNICATION_VIEW_HISTORY: ["COMMUNICATION_VIEW_HISTORY"],
  COMMUNICATION_MANAGE_TEMPLATES: ["COMMUNICATION_MANAGE_TEMPLATES"],
  COMMUNICATION_SCHEDULE: ["COMMUNICATION_SCHEDULE"],

  // Settings features
  SETTINGS_VIEW: ["SETTINGS_VIEW_ALL", "SETTINGS_VIEW_OWN"],
  SETTINGS_UPDATE: ["SETTINGS_UPDATE_ALL", "SETTINGS_UPDATE_OWN"],
  SETTINGS_MANAGE_INTEGRATIONS: ["SETTINGS_MANAGE_INTEGRATIONS"],

  // Profile features
  PROFILE_VIEW: ["PROFILE_VIEW_OWN"],
  PROFILE_EDIT: ["PROFILE_EDIT_OWN"],
  PROFILE_UPLOAD_DOCUMENTS: ["PROFILE_UPLOAD_DOCUMENTS"],
  PROFILE_CHANGE_PASSWORD: ["PROFILE_CHANGE_PASSWORD"],

  // Document features
  DOCUMENT_VIEW: ["DOCUMENT_VIEW_ALL"],
  DOCUMENT_UPLOAD: ["DOCUMENT_UPLOAD"],
  DOCUMENT_DELETE: ["DOCUMENT_DELETE"],
  DOCUMENT_DOWNLOAD: ["DOCUMENT_DOWNLOAD"],
}

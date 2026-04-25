# Graph Report - meritcap-admin  (2026-04-25)

## Corpus Check
- 385 files · ~4,401,943 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 919 nodes · 929 edges · 27 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 152 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin Core Pages & API Clients|Admin Core Pages & API Clients]]
- [[_COMMUNITY_Lead Management Admin|Lead Management Admin]]
- [[_COMMUNITY_Document Config Pages|Document Config Pages]]
- [[_COMMUNITY_Skeleton Loading States|Skeleton Loading States]]
- [[_COMMUNITY_Admin Dashboard & Calendar|Admin Dashboard & Calendar]]
- [[_COMMUNITY_Study India Pages|Study India Pages]]
- [[_COMMUNITY_Study Programs & Universities|Study Programs & Universities]]
- [[_COMMUNITY_API Client Layer|API Client Layer]]
- [[_COMMUNITY_Permissions & Role Gate|Permissions & Role Gate]]
- [[_COMMUNITY_Student & Applications Admin|Student & Applications Admin]]
- [[_COMMUNITY_Signup & Invitations|Signup & Invitations]]
- [[_COMMUNITY_Study Abroad Country Pages|Study Abroad Country Pages]]
- [[_COMMUNITY_Student Community & Whiteboard|Student Community & Whiteboard]]
- [[_COMMUNITY_QR Code & Lead Sources|QR Code & Lead Sources]]
- [[_COMMUNITY_Search Filter Components|Search Filter Components]]
- [[_COMMUNITY_AI Chatbot|AI Chatbot]]
- [[_COMMUNITY_Online Study Pages|Online Study Pages]]
- [[_COMMUNITY_Users API Client|Users API Client]]
- [[_COMMUNITY_Menu API Client|Menu API Client]]
- [[_COMMUNITY_Post Search Filter Modal|Post Search Filter Modal]]
- [[_COMMUNITY_Auth Login Modal|Auth Login Modal]]
- [[_COMMUNITY_Study Online Modal|Study Online Modal]]
- [[_COMMUNITY_College & University Detail|College & University Detail]]
- [[_COMMUNITY_Search Result Card|Search Result Card]]
- [[_COMMUNITY_Theme Selector|Theme Selector]]
- [[_COMMUNITY_Mobile Detection Hook|Mobile Detection Hook]]
- [[_COMMUNITY_API Utilities|API Utilities]]

## God Nodes (most connected - your core abstractions)
1. `toast()` - 67 edges
2. `Loading()` - 37 edges
3. `nextLogos()` - 17 edges
4. `prevLogos()` - 17 edges
5. `handleSubmit()` - 15 edges
6. `getStatusColor()` - 15 edges
7. `POST()` - 13 edges
8. `handleDelete()` - 12 edges
9. `handleSave()` - 11 edges
10. `fetchRoles()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `fetchCounselors()` --calls--> `toast()`  [INFERRED]
  /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/app/admin/leads/new/page.tsx → /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/hooks/use-toast.ts
- `handleCopyUrl()` --calls--> `toast()`  [INFERRED]
  /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/app/admin/leads/data-sources/page.tsx → /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/hooks/use-toast.ts
- `fetchLeadDetails()` --calls--> `toast()`  [INFERRED]
  /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/app/admin/leads/[id]/page.tsx → /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/hooks/use-toast.ts
- `handleSubmenuChange()` --calls--> `toast()`  [INFERRED]
  /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/app/admin/roles/page.tsx → /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/hooks/use-toast.ts
- `handleAddFeatures()` --calls--> `toast()`  [INFERRED]
  /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/app/admin/roles/page.tsx → /Users/druva/Documents/Personal/wowcap/website/meritcap-admin/hooks/use-toast.ts

## Communities

### Community 0 - "Admin Core Pages & API Clients"
Cohesion: 0.06
Nodes (47): fetchAllPermissions(), fetchPermissions(), fetchRoles(), fetchUserPermissions(), fetchUsers(), handleAddFeatures(), handleAddPermission(), handleAddRole() (+39 more)

### Community 1 - "Lead Management Admin"
Cohesion: 0.06
Nodes (33): canEditLead(), fetchLeads(), getUserAccessLevel(), handleAddExpense(), handleAddNote(), handleApprove(), handleBulkAssign(), handleCall() (+25 more)

### Community 2 - "Document Config Pages"
Cohesion: 0.1
Nodes (31): bulkSaveCountryRequirements(), createCountry(), createCountryRequirement(), createDocumentType(), createProfileRequirement(), deleteCountry(), deleteCountryRequirement(), deleteDocumentType() (+23 more)

### Community 3 - "Skeleton Loading States"
Cohesion: 0.05
Nodes (1): Loading()

### Community 4 - "Admin Dashboard & Calendar"
Cohesion: 0.06
Nodes (9): Avatar(), checkAppointmentConflict(), fetchLeadDetails(), getActionIcon(), getStatusColor(), handleBookAppointment(), handleLogout(), if() (+1 more)

### Community 5 - "Study India Pages"
Cohesion: 0.08
Nodes (11): fetchCounselors(), handleBack(), handleCollegeSelect(), handleCourseSelect(), handleInputChange(), handleNext(), handlePrevious(), handleSaveDraft() (+3 more)

### Community 6 - "Study Programs & Universities"
Cohesion: 0.08
Nodes (16): applyFilters(), createSlug(), findUniversityAndCourse(), formatFee(), getAllCourses(), handleAdvancedFiltersClick(), handleApplyNow(), handleClearAllFilters() (+8 more)

### Community 7 - "API Client Layer"
Cohesion: 0.09
Nodes (12): apiRequest(), getAccessToken(), handleSubmit(), assignLeadsRoundRobin(), createCampaignApi(), directAssignLeads(), getCampaigns(), getCounselorWorkload() (+4 more)

### Community 8 - "Permissions & Role Gate"
Cohesion: 0.1
Nodes (12): useAuth(), FeatureGate(), buildMenuForUser(), canAccessFeature(), hasAnyPermission(), AdminDashboard(), EditLeadPage(), getLeadStatusIcon() (+4 more)

### Community 9 - "Student & Applications Admin"
Cohesion: 0.1
Nodes (5): formatDate(), handleStatusUpdate(), openFile(), getDocumentPresignedUrl(), updateDocumentStatus()

### Community 10 - "Signup & Invitations"
Cohesion: 0.11
Nodes (12): signupStudent(), signupWithInvitation(), getAllInvitations(), resendInvitation(), revokeInvitation(), validateInvitationToken(), fetchInvitations(), handleResendInvitation() (+4 more)

### Community 11 - "Study Abroad Country Pages"
Cohesion: 0.2
Nodes (2): nextLogos(), prevLogos()

### Community 12 - "Student Community & Whiteboard"
Cohesion: 0.15
Nodes (2): draw(), startDrawing()

### Community 13 - "QR Code & Lead Sources"
Cohesion: 0.18
Nodes (7): handleCopyUrl(), handleCreateSource(), handleDownloadQR(), handleSourceTypeChange(), downloadQRCode(), generateQRCode(), handleDownload()

### Community 14 - "Search Filter Components"
Cohesion: 0.18
Nodes (4): getFilterOptions(), removeFilter(), toggleArrayFilter(), HorizontalFilters()

### Community 15 - "AI Chatbot"
Cohesion: 0.33
Nodes (7): generateAIResponse(), getContextualWelcome(), getPageContext(), handleKeyPress(), handlePopState(), handleSendMessage(), triggerProactiveHelp()

### Community 16 - "Online Study Pages"
Cohesion: 0.39
Nodes (7): handleDownloadGuide(), handleGetCounseling(), handleStartApplication(), nextCourses(), nextPartnerPage(), prevCourses(), prevPartnerPage()

### Community 17 - "Users API Client"
Cohesion: 0.36
Nodes (7): getAllUsers(), getUserById(), getUsersByRole(), mapPagedUserApiResponseToDto(), mapUserApiResponseToDto(), updateUser(), updateUserRole()

### Community 19 - "Menu API Client"
Cohesion: 0.22
Nodes (1): addMenuPermissions()

### Community 20 - "Post Search Filter Modal"
Cohesion: 0.38
Nodes (4): handleComplete(), handleCountryToggle(), handleInputChange(), handleNext()

### Community 25 - "Auth Login Modal"
Cohesion: 0.4
Nodes (2): handleClose(), resetModal()

### Community 26 - "Study Online Modal"
Cohesion: 0.4
Nodes (2): handleClose(), resetForm()

### Community 27 - "College & University Detail"
Cohesion: 0.6
Nodes (3): getIconForStat(), nextImage(), prevImage()

### Community 36 - "Search Result Card"
Cohesion: 0.5
Nodes (2): getApplyUrl(), getCourseUrl()

### Community 47 - "Theme Selector"
Cohesion: 1.0
Nodes (2): applyTheme(), handleThemeChange()

### Community 48 - "Mobile Detection Hook"
Cohesion: 0.67
Nodes (1): useIsMobile()

### Community 53 - "API Utilities"
Cohesion: 1.0
Nodes (2): delay(), processCSV()

## Knowledge Gaps
- **Thin community `Skeleton Loading States`** (38 nodes): `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `loading.tsx`, `Loading()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Study Abroad Country Pages`** (19 nodes): `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `page.tsx`, `nextLogos()`, `prevLogos()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Student Community & Whiteboard`** (14 nodes): `page.tsx`, `clearWhiteboard()`, `draw()`, `handleCreateRoom()`, `handleJoinRoom()`, `handleNextCategories()`, `handleNextStep()`, `handlePrevCategories()`, `handlePrevStep()`, `handleRejoinSession()`, `handleSendInvites()`, `handleSendMessage()`, `startDrawing()`, `stopDrawing()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Menu API Client`** (9 nodes): `menu.ts`, `addMenuPermissions()`, `getAllMenuStructure()`, `getMenuConfig()`, `getMenuConfigForUser()`, `getMenuPermissionMappings()`, `removeAllMenuPermissions()`, `removeMenuPermission()`, `updateMenuPermissions()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Login Modal`** (6 nodes): `handleClose()`, `handleGoogleLogin()`, `handleOtpVerify()`, `handlePhoneLogin()`, `resetModal()`, `auth-login-modal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Study Online Modal`** (6 nodes): `study-online-modal.tsx`, `handleClose()`, `handleFilterComplete()`, `handleInputChange()`, `handleSubmit()`, `resetForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Search Result Card`** (5 nodes): `enhanced-result-card.tsx`, `formatFee()`, `getApplyUrl()`, `getCourseUrl()`, `handleFavorite()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme Selector`** (3 nodes): `theme-selector.tsx`, `applyTheme()`, `handleThemeChange()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mobile Detection Hook`** (3 nodes): `use-mobile.tsx`, `use-mobile.tsx`, `useIsMobile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `API Utilities`** (3 nodes): `delay()`, `processCSV()`, `api-utils.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `toast()` connect `Lead Management Admin` to `Admin Core Pages & API Clients`, `Document Config Pages`, `Admin Dashboard & Calendar`, `Study India Pages`, `Study Programs & Universities`, `API Client Layer`, `Student & Applications Admin`, `Signup & Invitations`, `QR Code & Lead Sources`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `handleSubmit()` connect `Study India Pages` to `Lead Management Admin`, `Document Config Pages`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `handleDelete()` connect `Document Config Pages` to `Admin Core Pages & API Clients`, `Student & Applications Admin`, `Admin Dashboard & Calendar`, `Lead Management Admin`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 63 inferred relationships involving `toast()` (e.g. with `handleApplyNow()` and `handleLeadFormSubmit()`) actually correct?**
  _`toast()` has 63 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `handleSubmit()` (e.g. with `POST()` and `toast()`) actually correct?**
  _`handleSubmit()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Admin Core Pages & API Clients` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Lead Management Admin` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
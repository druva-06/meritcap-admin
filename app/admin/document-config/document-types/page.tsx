"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
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
import { usePermissions } from "@/lib/permissions-context"
import {
  DocumentType,
  DocumentCategory,
  DOCUMENT_CATEGORIES,
  getDocumentTypes,
  createDocumentType,
  updateDocumentType,
  deleteDocumentType,
} from "@/lib/api/document-config"

export default function DocumentTypesPage() {
  const { hasPermission } = usePermissions()
  const canCreate = hasPermission("DOCUMENT_TYPE_CREATE")
  const canEdit = hasPermission("DOCUMENT_TYPE_EDIT")
  const canDelete = hasPermission("DOCUMENT_TYPE_DELETE")

  const [types, setTypes] = useState<DocumentType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<DocumentType | null>(null)
  const [formName, setFormName] = useState("")
  const [formCode, setFormCode] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formCategory, setFormCategory] = useState<DocumentCategory | "">("")
  const [formMultiple, setFormMultiple] = useState(false)
  const [formActive, setFormActive] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchTypes()
  }, [])

  async function fetchTypes() {
    setLoading(true)
    const res = await getDocumentTypes()
    if (res.success && res.data) setTypes(res.data)
    setLoading(false)
  }

  function codeFromName(name: string) {
    return name.trim().toUpperCase().replace(/\s+/g, "_").replace(/[^A-Z0-9_]/g, "")
  }

  function openCreate() {
    setEditing(null)
    setFormName("")
    setFormCode("")
    setFormDesc("")
    setFormCategory("")
    setFormMultiple(false)
    setFormActive(true)
    setDialogOpen(true)
  }

  function openEdit(dt: DocumentType) {
    setEditing(dt)
    setFormName(dt.name)
    setFormCode(dt.code)
    setFormDesc(dt.description || "")
    setFormCategory(dt.category || "")
    setFormMultiple(dt.allowMultiple)
    setFormActive(dt.isActive)
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!formName.trim() || !formCode.trim()) {
      toast.error("Name and code are required")
      return
    }
    setSaving(true)
    const data = {
      name: formName.trim(),
      code: formCode.trim().toUpperCase(),
      description: formDesc.trim() || undefined,
      category: (formCategory as DocumentCategory) || undefined,
      allowMultiple: formMultiple,
      isActive: formActive,
    }
    const res = editing
      ? await updateDocumentType(editing.id, data)
      : await createDocumentType(data)

    if (res.success) {
      toast.success(editing ? "Document type updated" : "Document type created")
      setDialogOpen(false)
      fetchTypes()
    } else {
      toast.error(res.message || "Failed to save")
    }
    setSaving(false)
  }

  async function handleDelete(id: number) {
    const res = await deleteDocumentType(id)
    if (res.success) {
      toast.success("Document type deleted")
      setTypes((prev) => prev.filter((t) => t.id !== id))
    } else {
      toast.error(res.message || "Failed to delete")
    }
    setDeleteId(null)
  }

  const filtered = types.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Document Types</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the master list of document types. The code must match the value used when uploading documents.
          </p>
        </div>
        {canCreate && (
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Document Type
          </Button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search document types..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-muted-foreground text-sm">Loading...</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Code</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Multiple</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    No document types found
                  </td>
                </tr>
              ) : (
                filtered.map((dt) => (
                  <tr key={dt.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium">{dt.name}</div>
                      {dt.description && (
                        <div className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate">
                          {dt.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="font-mono text-xs">
                        {dt.code}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {dt.category ? (
                        <Badge variant="secondary" className="text-xs capitalize">
                          {dt.category.charAt(0) + dt.category.slice(1).toLowerCase()}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={dt.allowMultiple ? "default" : "secondary"}>
                        {dt.allowMultiple ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={dt.isActive ? "default" : "secondary"}>
                        {dt.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {canEdit && (
                        <Button variant="ghost" size="sm" onClick={() => openEdit(dt)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(dt.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Document Type" : "Add Document Type"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                placeholder="e.g. Statement of Purpose"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value)
                  if (!editing) setFormCode(codeFromName(e.target.value))
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Code</Label>
              <Input
                placeholder="e.g. SOP"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Must match the document_type string used during upload (e.g. PASSPORT, SOP, LOR)
              </p>
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                placeholder="Brief description of this document type"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as DocumentCategory | "")}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select category</option>
                {DOCUMENT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={formMultiple} onCheckedChange={setFormMultiple} id="allow-multiple" />
                <Label htmlFor="allow-multiple">Allow Multiple Uploads</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={formActive} onCheckedChange={setFormActive} id="doc-type-active" />
                <Label htmlFor="doc-type-active">Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document Type?</AlertDialogTitle>
            <AlertDialogDescription>
              This will soft-delete the document type. Existing requirements referencing it may be
              affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId !== null && handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

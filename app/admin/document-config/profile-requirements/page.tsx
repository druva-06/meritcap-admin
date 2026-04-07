"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePermissions } from "@/lib/permissions-context"
import {
  ProfileDocumentRequirement,
  DocumentType,
  getProfileRequirements,
  getDocumentTypes,
  createProfileRequirement,
  updateProfileRequirement,
  deleteProfileRequirement,
} from "@/lib/api/document-config"

export default function ProfileRequirementsPage() {
  const { hasPermission } = usePermissions()
  const canCreate = hasPermission("DOCUMENT_CONFIG_CREATE")
  const canEdit = hasPermission("DOCUMENT_CONFIG_EDIT")
  const canDelete = hasPermission("DOCUMENT_CONFIG_DELETE")

  const [requirements, setRequirements] = useState<ProfileDocumentRequirement[]>([])
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([])
  const [loading, setLoading] = useState(true)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formDocTypeId, setFormDocTypeId] = useState("")
  const [formRequired, setFormRequired] = useState(true)
  const [formMinCount, setFormMinCount] = useState(1)
  const [formOrder, setFormOrder] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    Promise.all([fetchRequirements(), fetchDocumentTypes()])
  }, [])

  async function fetchRequirements() {
    setLoading(true)
    const res = await getProfileRequirements()
    if (res.success && res.data) setRequirements(res.data)
    setLoading(false)
  }

  async function fetchDocumentTypes() {
    const res = await getDocumentTypes()
    if (res.success && res.data) setDocumentTypes(res.data.filter((t) => t.isActive))
  }

  const usedTypeIds = new Set(requirements.map((r) => r.documentTypeId))
  const availableTypes = documentTypes.filter((t) => !usedTypeIds.has(t.id))

  function openCreate() {
    setFormDocTypeId("")
    setFormRequired(true)
    setFormMinCount(1)
    setFormOrder(requirements.length)
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!formDocTypeId) {
      toast.error("Please select a document type")
      return
    }
    setSaving(true)
    const res = await createProfileRequirement({
      documentTypeId: Number(formDocTypeId),
      isRequired: formRequired,
      minCount: formMinCount,
      displayOrder: formOrder,
    })
    if (res.success) {
      toast.success("Profile requirement added")
      setDialogOpen(false)
      fetchRequirements()
    } else {
      toast.error(res.message || "Failed to save")
    }
    setSaving(false)
  }

  async function handleToggleRequired(req: ProfileDocumentRequirement) {
    const res = await updateProfileRequirement(req.id, { isRequired: !req.isRequired })
    if (res.success) {
      setRequirements((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, isRequired: !r.isRequired } : r))
      )
    } else {
      toast.error("Failed to update")
    }
  }

  async function handleMinCountChange(req: ProfileDocumentRequirement, value: number) {
    if (value < 1) return
    const res = await updateProfileRequirement(req.id, { minCount: value })
    if (res.success) {
      setRequirements((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, minCount: value } : r))
      )
    } else {
      toast.error("Failed to update")
    }
  }

  async function handleDelete(id: number) {
    const res = await deleteProfileRequirement(id)
    if (res.success) {
      toast.success("Requirement removed")
      setRequirements((prev) => prev.filter((r) => r.id !== id))
    } else {
      toast.error(res.message || "Failed to delete")
    }
    setDeleteId(null)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Profile Requirements</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Documents every student must upload globally to complete their profile (regardless of
            country)
          </p>
        </div>
        {canCreate && (
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Requirement
          </Button>
        )}
      </div>

      {requirements.length > 0 && (
        <div className="mb-4 p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
          <strong className="text-foreground">Profile completion requires:</strong>{" "}
          {requirements
            .filter((r) => r.isRequired)
            .map((r) => `${r.documentTypeName} (×${r.minCount})`)
            .join(", ")}
        </div>
      )}

      {loading ? (
        <div className="text-muted-foreground text-sm">Loading...</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Document Type</th>
                <th className="text-left px-4 py-3 font-medium">Code</th>
                <th className="text-left px-4 py-3 font-medium">Multiple</th>
                <th className="text-left px-4 py-3 font-medium">Required</th>
                <th className="text-left px-4 py-3 font-medium">Min Count</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requirements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    No profile requirements configured
                  </td>
                </tr>
              ) : (
                requirements.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{req.documentTypeName}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="font-mono text-xs">
                        {req.documentTypeCode}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={req.allowMultiple ? "default" : "secondary"}>
                        {req.allowMultiple ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {canEdit ? (
                        <Switch
                          checked={req.isRequired}
                          onCheckedChange={() => handleToggleRequired(req)}
                        />
                      ) : (
                        <Badge variant={req.isRequired ? "default" : "secondary"}>
                          {req.isRequired ? "Yes" : "No"}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {canEdit ? (
                        <Input
                          type="number"
                          min={1}
                          className="w-20 h-8"
                          value={req.minCount}
                          onChange={(e) =>
                            handleMinCountChange(req, parseInt(e.target.value) || 1)
                          }
                        />
                      ) : (
                        req.minCount
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(req.id)}
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

      {/* Add Requirement Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Profile Requirement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select value={formDocTypeId} onValueChange={setFormDocTypeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {availableTypes.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name} <span className="text-muted-foreground ml-1 text-xs">({t.code})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={formRequired} onCheckedChange={setFormRequired} id="req-required" />
              <Label htmlFor="req-required">Required for profile completion</Label>
            </div>
            <div className="space-y-2">
              <Label>Minimum Count</Label>
              <Input
                type="number"
                min={1}
                value={formMinCount}
                onChange={(e) => setFormMinCount(parseInt(e.target.value) || 1)}
                className="w-24"
              />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                min={0}
                value={formOrder}
                onChange={(e) => setFormOrder(parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Adding..." : "Add Requirement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Profile Requirement?</AlertDialogTitle>
            <AlertDialogDescription>
              This document type will no longer be required for profile completion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId !== null && handleDelete(deleteId)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

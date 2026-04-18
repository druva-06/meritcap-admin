"use client"

import { useEffect, useState } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
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
  Country,
  DocumentType,
  CountryDocumentRequirement,
  getCountries,
  getDocumentTypes,
  getCountryRequirements,
  createCountryRequirement,
  updateCountryRequirement,
  deleteCountryRequirement,
} from "@/lib/api/document-config"

export default function CountryRequirementsPage() {
  const { hasPermission } = usePermissions()
  const canCreate = hasPermission("COUNTRY_REQ_CREATE")
  const canEdit = hasPermission("COUNTRY_REQ_EDIT")
  const canDelete = hasPermission("COUNTRY_REQ_DELETE")

  const [countries, setCountries] = useState<Country[]>([])
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([])
  const [selectedCountryId, setSelectedCountryId] = useState<string>("")
  const [requirements, setRequirements] = useState<CountryDocumentRequirement[]>([])
  const [loadingReqs, setLoadingReqs] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formDocTypeId, setFormDocTypeId] = useState("")
  const [formRequired, setFormRequired] = useState(true)
  const [formMinCount, setFormMinCount] = useState(1)
  const [formOrder, setFormOrder] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    Promise.all([
      getCountries().then((res) => res.success && res.data && setCountries(res.data)),
      getDocumentTypes().then(
        (res) => res.success && res.data && setDocumentTypes(res.data.filter((t) => t.isActive))
      ),
    ])
  }, [])

  useEffect(() => {
    if (selectedCountryId) {
      fetchRequirements(Number(selectedCountryId))
    } else {
      setRequirements([])
    }
  }, [selectedCountryId])

  async function fetchRequirements(countryId: number) {
    setLoadingReqs(true)
    const res = await getCountryRequirements(countryId)
    if (res.success && res.data) setRequirements(res.data)
    setLoadingReqs(false)
  }

  const usedTypeIds = new Set(requirements.map((r) => r.documentTypeId))
  const availableTypes = documentTypes.filter((t) => !usedTypeIds.has(t.id))

  function openAddDialog() {
    setFormDocTypeId("")
    setFormRequired(true)
    setFormMinCount(1)
    setFormOrder(requirements.length)
    setDialogOpen(true)
  }

  async function handleAdd() {
    if (!formDocTypeId || !selectedCountryId) return
    setSaving(true)
    const res = await createCountryRequirement({
      countryId: Number(selectedCountryId),
      documentTypeId: Number(formDocTypeId),
      isRequired: formRequired,
      minCount: formMinCount,
      displayOrder: formOrder,
    })
    if (res.success) {
      toast.success("Requirement added")
      setDialogOpen(false)
      fetchRequirements(Number(selectedCountryId))
    } else {
      toast.error(res.message || "Failed to add")
    }
    setSaving(false)
  }

  async function handleToggleRequired(req: CountryDocumentRequirement) {
    const res = await updateCountryRequirement(req.id, { isRequired: !req.isRequired })
    if (res.success) {
      setRequirements((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, isRequired: !r.isRequired } : r))
      )
    } else {
      toast.error("Failed to update")
    }
  }

  async function handleMinCountChange(req: CountryDocumentRequirement, value: number) {
    if (value < 1) return
    const res = await updateCountryRequirement(req.id, { minCount: value })
    if (res.success) {
      setRequirements((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, minCount: value } : r))
      )
    } else {
      toast.error("Failed to update")
    }
  }

  async function handleDelete(id: number) {
    const res = await deleteCountryRequirement(id)
    if (res.success) {
      toast.success("Requirement removed")
      setRequirements((prev) => prev.filter((r) => r.id !== id))
    } else {
      toast.error(res.message || "Failed to delete")
    }
    setDeleteId(null)
  }

  const selectedCountry = countries.find((c) => String(c.id) === selectedCountryId)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Country Requirements</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure which documents students must upload before applying to colleges in each country
          </p>
        </div>
      </div>

      {/* Country Selector */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-72">
          <Select value={selectedCountryId} onValueChange={setSelectedCountryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country..." />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                  <span className="text-muted-foreground ml-1 text-xs">({c.code})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedCountryId && canCreate && (
          <Button onClick={openAddDialog} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Requirement
          </Button>
        )}
      </div>

      {!selectedCountryId ? (
        <div className="text-center py-16 text-muted-foreground border rounded-lg border-dashed">
          Select a country to view and configure its document requirements
        </div>
      ) : loadingReqs ? (
        <div className="text-muted-foreground text-sm">Loading requirements...</div>
      ) : (
        <>
          {requirements.length > 0 && (
            <div className="mb-4 p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
              <strong className="text-foreground">
                To apply to a college in {selectedCountry?.name}:
              </strong>{" "}
              {requirements
                .filter((r) => r.isRequired)
                .map((r) => `${r.documentTypeName} (×${r.minCount})`)
                .join(", ") || "No required documents configured yet"}
            </div>
          )}

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
                      No requirements configured for {selectedCountry?.name}
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
        </>
      )}

      {/* Add Requirement Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Requirement for {selectedCountry?.name}</DialogTitle>
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
                      {t.name}{" "}
                      <span className="text-muted-foreground ml-1 text-xs">({t.code})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={formRequired} onCheckedChange={setFormRequired} id="req-required" />
              <Label htmlFor="req-required">Required (mandatory to apply)</Label>
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
              <p className="text-xs text-muted-foreground">
                e.g. set 3 for LOR if the country requires 3 letters of recommendation
              </p>
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
            <Button onClick={handleAdd} disabled={saving || !formDocTypeId}>
              {saving ? "Adding..." : "Add Requirement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Requirement?</AlertDialogTitle>
            <AlertDialogDescription>
              Students will no longer be required to upload this document for{" "}
              {selectedCountry?.name} colleges.
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

"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Country,
  getAllCountriesAdmin,
  createCountry,
  updateCountry,
  deleteCountry,
} from "@/lib/api/document-config"

export default function CountriesPage() {
  const { hasPermission } = usePermissions()
  const canCreate = hasPermission("COUNTRY_CONFIG_CREATE")
  const canEdit = hasPermission("COUNTRY_CONFIG_EDIT")
  const canDelete = hasPermission("COUNTRY_CONFIG_DELETE")

  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [formName, setFormName] = useState("")
  const [formCode, setFormCode] = useState("")
  const [formActive, setFormActive] = useState(true)
  const [saving, setSaving] = useState(false)

  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchCountries()
  }, [])

  async function fetchCountries() {
    setLoading(true)
    const res = await getAllCountriesAdmin()
    if (res.success && res.data) setCountries(res.data)
    setLoading(false)
  }

  function openCreate() {
    setEditingCountry(null)
    setFormName("")
    setFormCode("")
    setFormActive(true)
    setDialogOpen(true)
  }

  function openEdit(country: Country) {
    setEditingCountry(country)
    setFormName(country.name)
    setFormCode(country.code)
    setFormActive(country.isActive)
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!formName.trim() || !formCode.trim()) {
      toast.error("Name and code are required")
      return
    }
    setSaving(true)
    const data = { name: formName.trim(), code: formCode.trim().toUpperCase(), isActive: formActive }
    const res = editingCountry
      ? await updateCountry(editingCountry.id, data)
      : await createCountry(data)

    if (res.success) {
      toast.success(editingCountry ? "Country updated" : "Country created")
      setDialogOpen(false)
      fetchCountries()
    } else {
      toast.error(res.message || "Failed to save")
    }
    setSaving(false)
  }

  async function handleDelete(id: number) {
    const res = await deleteCountry(id)
    if (res.success) {
      toast.success("Country deleted")
      setCountries((prev) => prev.filter((c) => c.id !== id))
    } else {
      toast.error(res.message || "Failed to delete")
    }
    setDeleteId(null)
  }

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Countries</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage countries used for document requirement configuration
          </p>
        </div>
        {canCreate && (
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Country
          </Button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search countries..."
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
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-muted-foreground">
                    No countries found
                  </td>
                </tr>
              ) : (
                filtered.map((country) => (
                  <tr key={country.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{country.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{country.code}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={country.isActive ? "default" : "secondary"}>
                        {country.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {canEdit && (
                        <Button variant="ghost" size="sm" onClick={() => openEdit(country)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(country.id)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCountry ? "Edit Country" : "Add Country"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Country Name</Label>
              <Input
                placeholder="e.g. United States"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Country Code (ISO)</Label>
              <Input
                placeholder="e.g. US"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                maxLength={10}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={formActive} onCheckedChange={setFormActive} id="country-active" />
              <Label htmlFor="country-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingCountry ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Country?</AlertDialogTitle>
            <AlertDialogDescription>
              This will soft-delete the country. Existing document requirements linked to it will be
              affected. This action can be reversed by database admin.
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

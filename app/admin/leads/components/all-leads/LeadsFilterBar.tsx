"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

const STATUS_OPTIONS = ["HOT", "IMMEDIATE_HOT", "WARM", "COLD", "FEATURE_LEAD", "CONTACTED"]
const TAG_OPTIONS = ["MBA", "Engineering", "USA", "UK", "Canada", "High-Budget"]

interface LeadsFilterBarProps {
  searchTerm: string
  onSearchTermChange: (value: string) => void
  selectedCampaignFilter: string
  onCampaignFilterChange: (value: string) => void
  showAdvancedFilters: boolean
  onToggleAdvancedFilters: () => void
  dateFrom: string
  onDateFromChange: (value: string) => void
  dateTo: string
  onDateToChange: (value: string) => void
  scoreFrom: string
  onScoreFromChange: (value: string) => void
  scoreTo: string
  onScoreToChange: (value: string) => void
  selectedStatuses: string[]
  onSelectedStatusesChange: (value: string[]) => void
  selectedTags: string[]
  onSelectedTagsChange: (value: string[]) => void
}

export function LeadsFilterBar({
  searchTerm,
  onSearchTermChange,
  selectedCampaignFilter,
  onCampaignFilterChange,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  scoreFrom,
  onScoreFromChange,
  scoreTo,
  onScoreToChange,
  selectedStatuses,
  onSelectedStatusesChange,
  selectedTags,
  onSelectedTagsChange,
}: LeadsFilterBarProps) {
  const toggleStatus = (status: string, checked: boolean) => {
    if (checked) onSelectedStatusesChange([...selectedStatuses, status])
    else onSelectedStatusesChange(selectedStatuses.filter((s) => s !== status))
  }

  const toggleTag = (tag: string, checked: boolean) => {
    if (checked) onSelectedTagsChange([...selectedTags, tag])
    else onSelectedTagsChange(selectedTags.filter((t) => t !== tag))
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCampaignFilter} onValueChange={onCampaignFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
              <SelectItem value="Google Ads">Google Ads</SelectItem>
              <SelectItem value="Offline Event">Offline Event</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={onToggleAdvancedFilters}
            className="border-blue-600 text-blue-600"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvancedFilters ? "Hide" : "Advanced"} Filters
          </Button>
        </div>

        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <Label className="text-xs text-gray-600">Date From</Label>
              <Input type="date" value={dateFrom} onChange={(e) => onDateFromChange(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-gray-600">Date To</Label>
              <Input type="date" value={dateTo} onChange={(e) => onDateToChange(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-gray-600">Score From</Label>
              <Input
                type="number"
                placeholder="0"
                value={scoreFrom}
                onChange={(e) => onScoreFromChange(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-600">Score To</Label>
              <Input
                type="number"
                placeholder="100"
                value={scoreTo}
                onChange={(e) => onScoreToChange(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs text-gray-600">Status</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {STATUS_OPTIONS.map((status) => (
                  <label key={status} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked) => toggleStatus(status, !!checked)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs text-gray-600">Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {TAG_OPTIONS.map((tag) => (
                  <label key={tag} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => toggleTag(tag, !!checked)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { api } from "@/lib/api-client"

// ---- Types ----

export interface Country {
  id: number
  name: string
  code: string
  isActive: boolean
}

export type DocumentCategory = "PERSONAL" | "ACADEMIC" | "FINANCIAL" | "IMMIGRATION" | "OTHER"

export const DOCUMENT_CATEGORIES: { value: DocumentCategory; label: string }[] = [
  { value: "PERSONAL",    label: "Personal" },
  { value: "ACADEMIC",    label: "Academic" },
  { value: "FINANCIAL",   label: "Financial" },
  { value: "IMMIGRATION", label: "Immigration" },
  { value: "OTHER",       label: "Other" },
]

export interface DocumentType {
  id: number
  name: string
  code: string
  description?: string
  category?: DocumentCategory
  allowMultiple: boolean
  isActive: boolean
}

export interface ProfileDocumentRequirement {
  id: number
  documentTypeId: number
  documentTypeName: string
  documentTypeCode: string
  allowMultiple: boolean
  isRequired: boolean
  minCount: number
  displayOrder: number
}

export interface CountryDocumentRequirement {
  id: number
  countryId: number
  countryName: string
  documentTypeId: number
  documentTypeName: string
  documentTypeCode: string
  allowMultiple: boolean
  isRequired: boolean
  minCount: number
  displayOrder: number
}

export interface BulkRequirementItem {
  documentTypeId: number
  isRequired: boolean
  minCount: number
  displayOrder: number
}

// ---- Countries ----

export const getCountries = () =>
  api.get<Country[]>("/api/countries")

export const getAllCountriesAdmin = () =>
  api.get<Country[]>("/api/countries/all")

export const createCountry = (data: { name: string; code: string; isActive?: boolean }) =>
  api.post<Country>("/api/countries", data)

export const updateCountry = (id: number, data: { name: string; code: string; isActive?: boolean }) =>
  api.put<Country>(`/api/countries/${id}`, data)

export const deleteCountry = (id: number) =>
  api.delete<void>(`/api/countries/${id}`)

// ---- Document Types ----

export const getDocumentTypes = () =>
  api.get<DocumentType[]>("/api/document-config/document-types")

export const createDocumentType = (data: {
  name: string
  code: string
  description?: string
  category?: DocumentCategory
  allowMultiple?: boolean
  isActive?: boolean
}) => api.post<DocumentType>("/api/document-config/document-types", data)

export const updateDocumentType = (
  id: number,
  data: { name: string; code: string; description?: string; category?: DocumentCategory; allowMultiple?: boolean; isActive?: boolean }
) => api.put<DocumentType>(`/api/document-config/document-types/${id}`, data)

export const deleteDocumentType = (id: number) =>
  api.delete<void>(`/api/document-config/document-types/${id}`)

// ---- Profile Document Requirements ----

export const getProfileRequirements = () =>
  api.get<ProfileDocumentRequirement[]>("/api/document-config/profile-requirements")

export const createProfileRequirement = (data: {
  documentTypeId: number
  isRequired?: boolean
  minCount?: number
  displayOrder?: number
}) => api.post<ProfileDocumentRequirement>("/api/document-config/profile-requirements", data)

export const updateProfileRequirement = (
  id: number,
  data: { documentTypeId?: number; isRequired?: boolean; minCount?: number; displayOrder?: number }
) => api.put<ProfileDocumentRequirement>(`/api/document-config/profile-requirements/${id}`, data)

export const deleteProfileRequirement = (id: number) =>
  api.delete<void>(`/api/document-config/profile-requirements/${id}`)

// ---- Country Document Requirements ----

export const getCountryRequirements = (countryId: number) =>
  api.get<CountryDocumentRequirement[]>(`/api/document-config/country-requirements/${countryId}`)

export const createCountryRequirement = (data: {
  countryId: number
  documentTypeId: number
  isRequired?: boolean
  minCount?: number
  displayOrder?: number
}) => api.post<CountryDocumentRequirement>("/api/document-config/country-requirements", data)

export const updateCountryRequirement = (
  id: number,
  data: { isRequired?: boolean; minCount?: number; displayOrder?: number }
) => api.put<CountryDocumentRequirement>(`/api/document-config/country-requirements/${id}`, data)

export const deleteCountryRequirement = (id: number) =>
  api.delete<void>(`/api/document-config/country-requirements/${id}`)

export const bulkSaveCountryRequirements = (data: {
  countryId: number
  requirements: BulkRequirementItem[]
}) => api.post<CountryDocumentRequirement[]>("/api/document-config/country-requirements/bulk", data)

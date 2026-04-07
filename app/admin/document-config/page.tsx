"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DocumentConfigPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/document-config/document-types")
  }, [router])

  return null
}

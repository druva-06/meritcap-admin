"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Download, Check, QrCode } from "lucide-react"
import { downloadQRCode } from "@/lib/qr-code-utils"
import type { Campaign } from "../../types"

interface Props {
  campaign: Campaign | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

function buildQRImageUrl(targetUrl: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(targetUrl)}`
}

export function QRCodeDialog({ campaign, open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false)

  if (!campaign) return null

  const qrImageUrl = campaign.qrCode ? buildQRImageUrl(campaign.qrCode) : ""

  const handleCopy = async () => {
    if (!campaign.qrCode) return
    await navigator.clipboard.writeText(campaign.qrCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!qrImageUrl) return
    downloadQRCode(qrImageUrl, `${campaign.name}-qr-code.png`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-purple-600" />
            {campaign.name} — QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {qrImageUrl ? (
            <>
              <div className="flex justify-center">
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${campaign.name}`}
                  className="w-64 h-64 border rounded-lg shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-600">Lead capture link</p>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={campaign.qrCode || ""}
                    className="font-mono text-xs bg-gray-50"
                  />
                  <Button size="sm" variant="outline" onClick={handleCopy} className="shrink-0">
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Share at events — leads who scan will be automatically tagged to this campaign.
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">
              QR code not yet generated for this campaign.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

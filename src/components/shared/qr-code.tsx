"use client"

import { QRCodeSVG } from "qrcode.react"

type QrCodeProps = {
  value: string
  size?: number
  className?: string
}

const QrCode = ({ value, size = 96, className }: QrCodeProps) => {
  return (
    <div className={className} aria-label="QR code">
      <QRCodeSVG value={value} size={size} bgColor="transparent" fgColor="currentColor" includeMargin />
    </div>
  )
}

export { QrCode }

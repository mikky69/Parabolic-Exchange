"use client"

import { useState } from "react"
import Image from "next/image"

export default function ImageWithFallback({ src, fallbackSrc, alt, symbol, ...props }) {
  const [imgSrc, setImgSrc] = useState(src)

  // Generate CoinCap API URL as a fallback if symbol is provided
  const coinCapFallback = symbol ? `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png` : null

  // Use provided fallback, or CoinCap fallback, or default placeholder
  const finalFallback = fallbackSrc || coinCapFallback || "/placeholder.svg?height=100&width=100"

  return (
    <Image
      {...props}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        setImgSrc(finalFallback)
      }}
      unoptimized
    />
  )
}


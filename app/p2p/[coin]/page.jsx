"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { availableCoins } from "@/app/utils/p2p-data"

export default function CoinP2PPage({ params }) {
  const { coin } = params
  const router = useRouter()

  useEffect(() => {
    // Find the selected coin
    const coinInfo = availableCoins.find((c) => c.symbol.toLowerCase() === coin.toLowerCase())
    if (coinInfo) {
      // Redirect to the main P2P page, which will handle displaying the correct coin
      router.push("/p2p")
    } else {
      // Redirect to the main P2P page if coin not found
      router.push("/p2p")
    }
  }, [coin, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="text-white">Loading {coin} P2P marketplace...</div>
    </div>
  )
}


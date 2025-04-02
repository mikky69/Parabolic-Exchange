"use client"

import Image from "next/image"
import CryptoChart from "./crypto-chart"
import { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function CryptoCard({ name, symbol, icon, value, amount, color, chartData, change }) {
  const isPositive = Number.parseFloat(change) >= 0
  const changeColor = isPositive ? "text-green-400" : "text-red-400"
  const changePrefix = isPositive ? "+" : ""
  const [imageError, setImageError] = useState(false)

  // Ensure chartData is valid
  const validChartData = Array.isArray(chartData) && chartData.length > 0 ? chartData : generateDummyChartData()

  // Generate fallback image URL from CoinCap API
  const fallbackIconUrl = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`

  // Use the provided icon or fallback to the CoinCap API URL
  const iconToUse = imageError ? fallbackIconUrl : icon

  return (
    <div
      className={`group ${color} rounded-xl p-4 flex flex-col hover:bg-purple-600 transition-colors duration-300 shadow-md`}
    >
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
          <Image
            src={iconToUse || "/placeholder.svg"}
            alt={name}
            width={32}
            height={32}
            className="object-contain"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <p className="text-cyan-400 font-medium">{name}</p>
              <p className="text-gray-300 text-xs">{symbol}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <p className="text-white font-medium mr-1 transition-all duration-300 group-hover:scale-110">{value}</p>
                <span className={`text-xs ${changeColor} flex items-center ${isPositive ? "animate-pulse" : ""}`}>
                  {isPositive ? (
                    <TrendingUp size={14} className="mr-0.5" />
                  ) : (
                    <TrendingDown size={14} className="mr-0.5" />
                  )}
                  {changePrefix}
                  {change}%
                </span>
              </div>
              <p className="text-gray-300 text-xs">{amount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-14 mt-1">
        <CryptoChart data={validChartData} color={isPositive ? "#10b981" : "#ef4444"} height={40} />
      </div>
    </div>
  )
}

// Helper function to generate dummy chart data if needed
function generateDummyChartData() {
  const data = []
  const now = Date.now()
  const hourInMs = 3600000
  const basePrice = 100

  for (let i = 0; i < 24; i++) {
    const hourOffset = 24 - i
    const trendFactor = 1 + Math.sin(hourOffset / 8) * 0.02
    const randomFactor = 0.99 + Math.random() * 0.02
    const price = basePrice * trendFactor * randomFactor
    const timestamp = new Date(now - i * hourInMs)

    data.push({
      timestamp: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: price,
    })
  }

  return data.reverse()
}


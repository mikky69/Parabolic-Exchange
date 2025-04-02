"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getCryptoData, formatCryptoData, updatePriceData } from "@/app/utils/crypto-api"

export default function MarketPage() {
  const [cryptoData, setCryptoData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCurrency, setSelectedCurrency] = useState("USDT")
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getCryptoData()
        const formatted = formatCryptoData(data)
        setCryptoData(formatted)
      } catch (error) {
        console.error("Error fetching crypto data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(() => {
      setRefreshing(true)

      // Every 5th update, fetch new data from API, otherwise just update existing data
      if (updateCount % 5 === 0) {
        getCryptoData()
          .then((data) => {
            const formatted = formatCryptoData(data)
            setCryptoData(formatted)
            setRefreshing(false)
          })
          .catch((error) => {
            console.error("Error refreshing crypto data", error)
            setRefreshing(false)
          })
      } else {
        // Just update existing data with simulated changes
        const updatedData = updatePriceData(cryptoData)
        setCryptoData(updatedData)
        setRefreshing(false)
      }

      setUpdateCount((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency)
    setShowCurrencyDropdown(false)
  }

  // Format price with appropriate decimal places
  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toFixed(1)
    } else if (price >= 1) {
      return price.toFixed(2)
    } else {
      return price.toFixed(4)
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-800">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className="text-white">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-white text-xl font-medium">
          Market
          {refreshing && <span className="ml-2 inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>}
        </h1>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src="/avatar.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Currency Selector */}
      <div className="px-4 mb-4 relative">
        <button
          className="flex items-center gap-1 bg-transparent text-white py-1 px-2 hover:bg-purple-800/30 rounded-md transition-colors duration-200"
          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span className="font-medium">{selectedCurrency}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${showCurrencyDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {showCurrencyDropdown && (
          <div className="absolute top-full left-4 mt-1 bg-white rounded-xl shadow-lg z-20 w-40 animate-fadeIn">
            {["USDT", "BTC", "ETH"].map((currency) => (
              <button
                key={currency}
                className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 text-left transition-colors duration-150"
                onClick={() => handleCurrencySelect(currency)}
              >
                <span className="text-gray-800">{currency}</span>
                {selectedCurrency === currency && (
                  <svg
                    className="w-5 h-5 ml-auto text-purple-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5 9-9"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Market List */}
      <div className="px-4 space-y-2">
        {isLoading
          ? // Loading skeletons
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="animate-pulse flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 mr-3"></div>
                    <div>
                      <div className="h-4 bg-white/20 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-white/20 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-white/20 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-white/20 rounded w-10"></div>
                  </div>
                  <div className="w-16 h-8 bg-white/20 rounded-full"></div>
                </div>
              ))
          : cryptoData.map((coin) => <MarketItem key={coin.id} coin={coin} baseCurrency={selectedCurrency} />)}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto">
        <div className="fixed bottom-0 w-full bg-purple-950 border-t border-purple-800">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <Link href="/" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="text-xs text-gray-400">Home</span>
            </Link>
            <Link href="/market" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-cyan-400"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span className="text-xs text-cyan-400">Market</span>
            </Link>
            <Link href="/p2p" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-xs text-gray-400">P2P</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center py-2 px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="text-xs text-gray-400">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function MarketItem({ coin, baseCurrency }) {
  const isPositive = Number.parseFloat(coin.change) >= 0
  const changeColor = isPositive ? "bg-cyan-400" : "bg-red-500"
  const changePrefix = isPositive ? "+" : ""

  // Generate random volume (in millions or thousands)
  const volume = (Math.random() * 100).toFixed(2)
  const volumeUnit = Math.random() > 0.5 ? "M" : "K"

  return (
    <div className="flex items-center justify-between py-3 border-b border-purple-800/30 hover:bg-purple-800/10 transition-colors duration-200 group">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
          <Image
            src={coin.icon || "/placeholder.svg"}
            alt={coin.name}
            width={24}
            height={24}
            className="object-contain"
            unoptimized
          />
        </div>
        <div>
          <p className="text-white font-medium">
            {coin.symbol}/{baseCurrency}
          </p>
          <p className="text-gray-300 text-xs flex items-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M12 20V10"></path>
              <path d="M18 14l-6-6-6 6"></path>
            </svg>
            {volume}
            {volumeUnit}
            {coin.lastUpdated && (
              <span className="ml-2 text-gray-400 text-xs">
                {coin.lastUpdated && coin.lastUpdated.split(":")[0] + ":" + coin.lastUpdated.split(":")[1]}
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium group-hover:scale-110 transition-transform duration-200">
          {coin.price.toFixed(1)}
        </p>
        <p className="text-gray-300 text-xs">{coin.price.toFixed(1)}</p>
      </div>
      <div
        className={`${changeColor} text-black text-xs font-medium px-3 py-1 rounded-full flex items-center transform group-hover:scale-105 transition-transform duration-200`}
      >
        {isPositive ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
            <polyline points="17 18 23 18 23 12"></polyline>
          </svg>
        )}
        {changePrefix}
        {coin.change}%
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, RefreshCw, ChevronDown, X, Loader } from "lucide-react"
import { getCryptoData, formatCryptoData } from "@/app/utils/crypto-api"

export default function Convert() {
  const [cryptoData, setCryptoData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)
  const [fromCoin, setFromCoin] = useState(null)
  const [toCoin, setToCoin] = useState(null)
  const [amount, setAmount] = useState("")
  const [convertedAmount, setConvertedAmount] = useState("")

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getCryptoData()
        const formatted = formatCryptoData(data)
        setCryptoData(formatted)

        // Set default coins
        if (formatted.length >= 2) {
          setFromCoin(formatted[0])
          setToCoin(formatted[1])
        }
      } catch (error) {
        console.error("Error fetching crypto data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Calculate conversion when amount, fromCoin or toCoin changes
    if (fromCoin && toCoin && amount) {
      const fromPrice = fromCoin.price
      const toPrice = toCoin.price
      const converted = ((Number.parseFloat(amount) * fromPrice) / toPrice).toFixed(8)
      setConvertedAmount(converted)
    } else {
      setConvertedAmount("")
    }
  }, [amount, fromCoin, toCoin])

  const swapCoins = () => {
    const temp = fromCoin
    setFromCoin(toCoin)
    setToCoin(temp)
  }

  const selectFromCoin = (coin) => {
    setFromCoin(coin)
    setShowFromDropdown(false)

    // If same coin selected for both, swap them
    if (coin.id === toCoin?.id) {
      setToCoin(fromCoin)
    }
  }

  const selectToCoin = (coin) => {
    setToCoin(coin)
    setShowToDropdown(false)

    // If same coin selected for both, swap them
    if (coin.id === fromCoin?.id) {
      setFromCoin(toCoin)
    }
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Only allow numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleMaxAmount = () => {
    if (fromCoin) {
      setAmount(fromCoin.amount)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFromDropdown || showToDropdown) {
        // Check if the click is outside the dropdown
        if (!event.target.closest(".dropdown-container")) {
          setShowFromDropdown(false)
          setShowToDropdown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFromDropdown, showToDropdown])

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="w-full max-w-md px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-white text-xl font-medium">Convert</h1>
          <div className="w-6 h-6"></div> {/* Empty div for flex alignment */}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size={30} className="animate-spin text-cyan-400" />
          </div>
        ) : (
          <div className="space-y-6 w-full">
            {/* From Coin */}
            <div className="bg-purple-800/60 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300 text-sm">From</label>
                <button className="text-cyan-400 text-sm font-medium" onClick={handleMaxAmount}>
                  MAX
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="bg-transparent text-white text-xl font-medium focus:outline-none w-full"
                />

                <div className="relative dropdown-container">
                  <button
                    className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 transition-colors rounded-full py-2 px-3"
                    onClick={() => {
                      setShowFromDropdown(!showFromDropdown)
                      setShowToDropdown(false)
                    }}
                  >
                    {fromCoin && (
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Image
                          src={fromCoin.icon || "/placeholder.svg"}
                          alt={fromCoin.name}
                          width={20}
                          height={20}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <span className="text-white font-medium">{fromCoin?.symbol || "Select"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-300 transition-transform duration-200 ${showFromDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showFromDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-30 animate-fadeIn">
                      <div className="flex justify-between items-center p-3 border-b">
                        <h3 className="text-gray-800 font-medium">Select a coin</h3>
                        <button
                          onClick={() => setShowFromDropdown(false)}
                          className="text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {cryptoData.map((coin) => (
                          <button
                            key={coin.id}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors"
                            onClick={() => selectFromCoin(coin)}
                          >
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                              <Image
                                src={coin.icon || "/placeholder.svg"}
                                alt={coin.name}
                                width={24}
                                height={24}
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <div className="text-left">
                              <p className="text-gray-800 font-medium">{coin.name}</p>
                              <p className="text-gray-500 text-xs">{coin.symbol}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {fromCoin && (
                <div className="mt-2 text-gray-300 text-sm">
                  Balance: {fromCoin.amount} {fromCoin.symbol}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={swapCoins}
                className="w-10 h-10 rounded-full bg-purple-700 border-4 border-purple-950 flex items-center justify-center hover:bg-purple-600 transition-colors active:scale-95 transform duration-150"
              >
                <RefreshCw size={18} className="text-white" />
              </button>
            </div>

            {/* To Coin */}
            <div className="bg-purple-800/60 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300 text-sm">To</label>
                <div className="text-gray-300 text-sm">
                  {toCoin &&
                    `1 ${fromCoin?.symbol} ≈ ${(fromCoin?.price / toCoin?.price).toFixed(6)} ${toCoin?.symbol}`}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  placeholder="0.00"
                  className="bg-transparent text-white text-xl font-medium focus:outline-none w-full"
                />

                <div className="relative dropdown-container">
                  <button
                    className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 transition-colors rounded-full py-2 px-3"
                    onClick={() => {
                      setShowToDropdown(!showToDropdown)
                      setShowFromDropdown(false)
                    }}
                  >
                    {toCoin && (
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Image
                          src={toCoin.icon || "/placeholder.svg"}
                          alt={toCoin.name}
                          width={20}
                          height={20}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <span className="text-white font-medium">{toCoin?.symbol || "Select"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-300 transition-transform duration-200 ${showToDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showToDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-30 animate-fadeIn">
                      <div className="flex justify-between items-center p-3 border-b">
                        <h3 className="text-gray-800 font-medium">Select a coin</h3>
                        <button
                          onClick={() => setShowToDropdown(false)}
                          className="text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {cryptoData.map((coin) => (
                          <button
                            key={coin.id}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors"
                            onClick={() => selectToCoin(coin)}
                          >
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                              <Image
                                src={coin.icon || "/placeholder.svg"}
                                alt={coin.name}
                                width={24}
                                height={24}
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <div className="text-left">
                              <p className="text-gray-800 font-medium">{coin.name}</p>
                              <p className="text-gray-500 text-xs">{coin.symbol}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {toCoin && (
                <div className="mt-2 text-gray-300 text-sm">
                  Balance: {toCoin.amount} {toCoin.symbol}
                </div>
              )}
            </div>

            {/* Fee Information */}
            <div className="bg-purple-800/30 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Fee</span>
                <span className="text-white text-sm">0.1%</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-300 text-sm">Rate</span>
                <span className="text-white text-sm">
                  {fromCoin && toCoin
                    ? `1 ${fromCoin.symbol} = ${(fromCoin.price / toCoin.price).toFixed(6)} ${toCoin.symbol}`
                    : "-"}
                </span>
              </div>
            </div>

            {/* Convert Button */}
            <button
              className={`w-full py-3 rounded-full font-medium transition-colors ${
                amount && fromCoin && toCoin
                  ? "bg-white text-purple-900 hover:bg-gray-100 active:scale-98 transform duration-150"
                  : "bg-white/50 text-purple-900 cursor-not-allowed"
              }`}
              disabled={!amount || !fromCoin || !toCoin}
            >
              Convert
            </button>
          </div>
        )}
      </div>
    </main>
  )
}


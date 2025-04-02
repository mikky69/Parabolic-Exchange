"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Filter, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { availableCoins, generateListings } from "@/app/utils/p2p-data"
import P2PListing from "@/app/components/p2p-listing"
import { useRouter } from "next/navigation"
import P2PFilterModal from "@/app/components/p2p-filter-modal"

export default function P2PPage() {
  const [mode, setMode] = useState("buy") // buy or sell
  const [selectedCoin, setSelectedCoin] = useState(availableCoins[0])
  const [showCoinDropdown, setShowCoinDropdown] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [showAmountDropdown, setShowAmountDropdown] = useState(false)
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false)
  const [listings, setListings] = useState([])
  const [currency, setCurrency] = useState("NGN")
  const router = useRouter()
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  // Refs for dropdown containers
  const coinDropdownRef = useRef(null)
  const currencyDropdownRef = useRef(null)
  const amountDropdownRef = useRef(null)
  const paymentDropdownRef = useRef(null)

  // Generate listings when the selected coin or mode changes
  useEffect(() => {
    const newListings = generateListings(selectedCoin.symbol)
    setListings(newListings)
  }, [selectedCoin, mode])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (coinDropdownRef.current && !coinDropdownRef.current.contains(event.target)) {
        setShowCoinDropdown(false)
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target)) {
        setShowCurrencyDropdown(false)
      }
      if (amountDropdownRef.current && !amountDropdownRef.current.contains(event.target)) {
        setShowAmountDropdown(false)
      }
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target)) {
        setShowPaymentDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin)
    setShowCoinDropdown(false)
  }

  const handleCurrencySelect = (curr) => {
    setCurrency(curr)
    setShowCurrencyDropdown(false)
  }

  const handleAction = (listing) => {
    if (mode === "buy") {
      router.push(`/p2p/buy/${selectedCoin.symbol.toLowerCase()}/${listing.id}`)
    } else {
      router.push(`/p2p/sell/${selectedCoin.symbol.toLowerCase()}/${listing.id}`)
    }
  }

  const handleSellPi = () => {
    router.push("/p2p/sell-pi")
  }

  // Close all other dropdowns when opening a new one
  const toggleDropdown = (dropdown) => {
    if (dropdown === "coin") {
      setShowCoinDropdown(!showCoinDropdown)
      setShowCurrencyDropdown(false)
      setShowAmountDropdown(false)
      setShowPaymentDropdown(false)
    } else if (dropdown === "currency") {
      setShowCurrencyDropdown(!showCurrencyDropdown)
      setShowCoinDropdown(false)
      setShowAmountDropdown(false)
      setShowPaymentDropdown(false)
    } else if (dropdown === "amount") {
      setShowAmountDropdown(!showAmountDropdown)
      setShowCoinDropdown(false)
      setShowCurrencyDropdown(false)
      setShowPaymentDropdown(false)
    } else if (dropdown === "payment") {
      setShowPaymentDropdown(!showPaymentDropdown)
      setShowCoinDropdown(false)
      setShowCurrencyDropdown(false)
      setShowAmountDropdown(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-900 to-purple-800">
      <div className="w-full max-w-md">
        {/* Header with purple background - Matching the image */}
        <div className="bg-purple-900 p-4 w-full">
          {/* Buy/Sell Toggle */}
          <div className="flex w-full rounded-full overflow-hidden mb-4 bg-purple-800/50">
            <button
              className={`flex-1 py-2 px-6 text-sm font-medium transition-colors ${
                mode === "buy" ? "bg-cyan-400 text-black" : "bg-transparent text-white"
              }`}
              onClick={() => setMode("buy")}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 px-6 text-sm font-medium transition-colors ${
                mode === "sell" ? "bg-cyan-400 text-black" : "bg-transparent text-white"
              }`}
              onClick={() => setMode("sell")}
            >
              Sell
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search traders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-purple-800/50 text-white placeholder-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={16} />
          </div>

          {/* Filter Row - Fixed layout */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {/* Coin Selection */}
            <div className="relative" ref={coinDropdownRef}>
              <button
                className="flex items-center justify-center gap-1 bg-purple-800/50 text-white py-2 px-2 rounded-lg w-full"
                onClick={() => toggleDropdown("coin")}
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mr-1 overflow-hidden">
                  <Image
                    src={selectedCoin.icon || "/placeholder.svg"}
                    alt={selectedCoin.symbol}
                    width={16}
                    height={16}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="truncate text-sm">{selectedCoin.symbol}</span>
                <ChevronDown size={14} />
              </button>

              {/* Coin Dropdown */}
              {showCoinDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg w-56 animate-fadeIn"
                  style={{ zIndex: 1000 }}
                >
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {availableCoins.map((coin) => (
                      <button
                        key={coin.id}
                        className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 text-left rounded-lg"
                        onClick={() => handleCoinSelect(coin)}
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={coin.icon || "/placeholder.svg"}
                            alt={coin.name}
                            width={20}
                            height={20}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <span className="text-gray-800">{coin.symbol}</span>
                        {selectedCoin.id === coin.id && (
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
                </div>
              )}
            </div>

            {/* Amount Filter */}
            <div className="relative" ref={amountDropdownRef}>
              <button
                className="flex items-center justify-center gap-1 bg-purple-800/50 text-white py-2 px-2 rounded-lg w-full"
                onClick={() => toggleDropdown("amount")}
              >
                <span className="truncate text-sm">Amount</span>
                <ChevronDown size={14} />
              </button>

              {showAmountDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg w-56 animate-fadeIn"
                  style={{ zIndex: 1000 }}
                >
                  <div className="p-4">
                    <h3 className="text-gray-800 font-medium mb-2">Amount Range</h3>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm">Apply</button>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Filter */}
            <div className="relative" ref={paymentDropdownRef}>
              <button
                className="flex items-center justify-center gap-1 bg-purple-800/50 text-white py-2 px-2 rounded-lg w-full"
                onClick={() => toggleDropdown("payment")}
              >
                <span className="truncate text-sm">Payment</span>
                <ChevronDown size={14} />
              </button>

              {showPaymentDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg w-56 animate-fadeIn"
                  style={{ zIndex: 1000 }}
                >
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {["Bank transfer", "Mobile money", "Cash deposit", "PayPal", "Wise"].map((method) => (
                      <button
                        key={method}
                        className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 text-left rounded-lg"
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
                        >
                          {method === "Bank transfer" && (
                            <>
                              <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                              <line x1="2" y1="10" x2="22" y2="10"></line>
                            </>
                          )}
                          {method === "Mobile money" && (
                            <>
                              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                              <line x1="12" y1="18" x2="12" y2="18.01"></line>
                            </>
                          )}
                          {method === "Cash deposit" && (
                            <>
                              <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                              <path d="M12 12h.01"></path>
                            </>
                          )}
                          {method === "PayPal" && (
                            <>
                              <path d="M7 11l5-5 5 5"></path>
                              <path d="M12 6v12"></path>
                            </>
                          )}
                          {method === "Wise" && (
                            <>
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                              <line x1="9" y1="9" x2="9.01" y2="9"></line>
                              <line x1="15" y1="9" x2="15.01" y2="9"></line>
                            </>
                          )}
                        </svg>
                        <span className="text-gray-800">{method}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Button */}
            <button
              className={`flex items-center justify-center gap-1 ${
                showFilterModal ? "bg-cyan-400 text-black" : "bg-purple-800/50 text-white"
              } py-2 px-2 rounded-lg w-full`}
              onClick={() => {
                setShowFilterModal(!showFilterModal)
                setShowCoinDropdown(false)
                setShowCurrencyDropdown(false)
                setShowAmountDropdown(false)
                setShowPaymentDropdown(false)
              }}
            >
              <Filter size={14} />
              <span className="truncate text-sm">Filter</span>
            </button>
          </div>

          {/* Currency Badge */}
          <div className="flex justify-end mb-2" ref={currencyDropdownRef}>
            <div
              className="bg-purple-800/50 text-white text-sm cursor-pointer flex items-center px-3 py-1 rounded-lg"
              onClick={() => toggleDropdown("currency")}
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
              {currency} <ChevronDown size={14} className="ml-1" />
            </div>

            {/* Currency Dropdown */}
            {showCurrencyDropdown && (
              <div
                className="absolute mt-8 right-4 bg-white rounded-xl shadow-lg w-32 animate-fadeIn"
                style={{ zIndex: 1000 }}
              >
                <div className="p-2">
                  {["NGN", "USD", "EUR", "GBP"].map((curr) => (
                    <button
                      key={curr}
                      className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 text-left rounded-lg"
                      onClick={() => handleCurrencySelect(curr)}
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
                      >
                        {curr === "NGN" && <path d="M4 10h16M4 14h16M7 4v16M17 4v16"></path>}
                        {curr === "USD" && (
                          <>
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                          </>
                        )}
                        {curr === "EUR" && (
                          <>
                            <path d="M4 12h16"></path>
                            <path d="M4 6h12"></path>
                            <path d="M4 18h12"></path>
                          </>
                        )}
                        {curr === "GBP" && (
                          <>
                            <path d="M4 12h16"></path>
                            <path d="M4 6h12"></path>
                            <path d="M4 18h16"></path>
                          </>
                        )}
                      </svg>
                      <span className="text-gray-800">{curr}</span>
                      {currency === curr && (
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
              </div>
            )}
          </div>
        </div>

        <P2PFilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currency={currency}
          onApplyFilters={(filters) => {
            console.log("Applied filters:", filters)
            // In a real app, we would filter the listings here
            // For now, we'll just close the modal
          }}
        />

        {/* Listings */}
        <div className="p-4 space-y-3">
          {/* Special Pi button if in sell mode */}
          {mode === "sell" && selectedCoin.symbol === "PI" && (
            <button
              onClick={handleSellPi}
              className="w-full bg-gradient-to-r from-purple-900 to-purple-800 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center"
            >
              <Image src="/pi-network.png" alt="Pi Network" width={20} height={20} className="mr-2" unoptimized />
              Sell Pi
            </button>
          )}

          <div className="space-y-3">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <P2PListing
                  key={listing.id}
                  listing={{ ...listing, symbol: selectedCoin.symbol }}
                  mode={mode}
                  onAction={handleAction}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-purple-900/50 rounded-xl">
                <div className="w-16 h-16 bg-purple-800 rounded-full mb-4 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-300"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <p className="text-white">No listings found</p>
                <p className="text-gray-300 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Matching the landing page colors */}
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
              className="text-gray-400"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span className="text-xs text-gray-400">Market</span>
          </Link>
          <Link href="/p2p" className="flex flex-col items-center py-2 px-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-cyan-400"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-xs text-cyan-400">P2P</span>
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
    </main>
  )
}


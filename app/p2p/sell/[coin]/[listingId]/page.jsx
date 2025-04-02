"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { availableCoins, generateListings } from "@/app/utils/p2p-data"

export default function SellCoinPage({ params }) {
  const { coin, listingId } = params
  const [listing, setListing] = useState(null)
  const [amount, setAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [stage, setStage] = useState("order") // order, confirm, waiting, success
  const [selectedCoin, setSelectedCoin] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Find the selected coin
    const coinInfo = availableCoins.find((c) => c.symbol.toLowerCase() === coin.toLowerCase())
    if (coinInfo) {
      setSelectedCoin(coinInfo)

      // Generate mock listings and find the requested one
      const mockListings = generateListings(coinInfo.symbol)
      const foundListing = mockListings.find((l) => l.id === listingId)

      if (foundListing) {
        setListing(foundListing)
      } else {
        // Redirect to P2P page if listing not found
        router.push("/p2p")
      }
    } else {
      // Redirect to P2P page if coin not found
      router.push("/p2p")
    }
  }, [coin, listingId, router])

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value.replace(/[^0-9.]/g, "")
    setSellAmount(inputAmount)

    if (inputAmount && listing) {
      const price = Number.parseFloat(listing.price)
      const fiatAmount = (Number.parseFloat(inputAmount) * price).toFixed(2)
      setAmount(fiatAmount)
    } else {
      setAmount("")
    }
  }

  const handleSell = () => {
    if (amount && sellAmount) {
      setStage("confirm")

      // Mock successful transaction after 3 seconds in confirm stage
      setTimeout(() => {
        setStage("success")
      }, 3000)
    }
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleCancel = () => {
    router.push("/p2p")
  }

  if (!listing || !selectedCoin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Order screen
  if (stage === "order") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/p2p" className="text-white">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-white text-xl font-medium">Sell {selectedCoin.symbol}</h1>
            <div className="w-6 h-6"></div> {/* Spacer */}
          </div>

          <div className="bg-purple-800/50 rounded-lg p-4 mb-4">
            <div className="text-white mb-2">
              Price <span className="float-right">₦{listing.price}</span>
            </div>
            <div className="text-white text-sm mb-2">
              Limit{" "}
              <span className="float-right">
                {listing.limits.min}-{listing.limits.max} {listing.limits.currency}
              </span>
            </div>
            <div className="text-white text-sm mb-2">
              Payment Method <span className="float-right">{listing.paymentMethod}</span>
            </div>
            <div className="text-white text-sm">
              Payment Duration <span className="float-right">{listing.responseTime}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <input
                type="text"
                value={sellAmount}
                onChange={handleAmountChange}
                placeholder="0.0000"
                className="w-full text-2xl font-medium bg-transparent text-black outline-none"
              />
              <span className="text-black font-medium">{selectedCoin.symbol}</span>
            </div>

            <hr className="my-3 border-gray-200" />

            <div className="flex items-center justify-between">
              <div className="text-gray-500 text-sm">I will receive</div>
              <div className="text-black font-medium">
                ₦{amount ? Number.parseFloat(amount).toLocaleString() : "0.00"}
              </div>
            </div>
          </div>

          <button
            className="w-full bg-purple-800 text-white font-medium py-3 rounded-lg mb-4"
            onClick={handleSell}
            disabled={!amount || !sellAmount}
          >
            Sell {selectedCoin.symbol}
          </button>
        </div>
      </main>
    )
  }

  // Confirm screen (simplified for the example)
  if (stage === "confirm") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="bg-cyan-400 text-black text-sm px-4 py-1 rounded-full absolute top-4 right-4">Chat</div>

          <div className="bg-white rounded-lg p-8 w-full max-w-sm flex flex-col items-center mb-4">
            <div className="w-40 h-40 mb-6 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-purple-800 border-t-transparent animate-spin"></div>
            </div>

            <p className="text-center text-gray-800 mb-6">
              Processing your sell order for {sellAmount} {selectedCoin.symbol}. Please wait...
            </p>
          </div>

          <button className="bg-purple-900 text-white px-6 py-2 rounded-full mt-6" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </main>
    )
  }

  // Success screen
  if (stage === "success") {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-900 to-purple-950">
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-sm flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>

            <div className="text-2xl font-bold text-black mb-1">₦{Number.parseFloat(amount).toLocaleString()}</div>

            <div className="text-lg font-medium text-purple-800 mb-4">Transaction Successful</div>
          </div>

          <button className="bg-purple-900 text-white px-6 py-2 rounded-full" onClick={handleBackToHome}>
            Back To Home
          </button>
        </div>
      </main>
    )
  }

  return null
}

